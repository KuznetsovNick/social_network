const request = require('supertest')
const app = require('../server')
describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        const res = await request(app)
            .post('/select_user')
            .send({
                selected_user: 1,
            })
        expect(res.statusCode).toEqual(201)
        //expect(res.body).toHaveProperty('post')
    })
})