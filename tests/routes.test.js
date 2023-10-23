const request = require('supertest')
const app = require('../server')

describe('Server test', () => {
    test('Test selecting user', async () => {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const res = await request(app)
            .post('/select_user')
            .send({
                selected_user: 1,
            })
        expect(res.statusCode).toEqual(200)
        //expect(res.body).toHaveProperty('post')
    })

    test('Test updating list', async () => {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        const response = await request(app).get('/update');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();

    });

    test('Try to get wrong path', async () => {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        const response = await request(app).get('/abracadabra');
        expect(response.statusCode).toBe(404);
    });

    afterAll(() => {
        app.close()
    })
})