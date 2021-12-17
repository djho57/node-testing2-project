const request = require('supertest')
const server = require('../server')
const db = require('../../data/db-config')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db.seed.run()
})
afterAll(async() => {
    await db.destroy()
})

it('is the correct env', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})
describe('student router', () => {
    describe('[GET] /students', () => {
        let res
        beforeEach(async() => {
            res = await request(server).get('/students')
        })
        it('responds with 200', async () => {
            expect(res.status).toBe(200)
        })
        it('responds with all students', async () => {
            expect(res.body).toHaveLength(4)
        })
    })
    describe('[GET] /students/1', () => {
        let res
        beforeEach(async() => {
            res = await request(server).get('/students/1')
        })
        it('responds with 200', async () => {
            expect(res.status).toBe(200)
        })
        it('responds with one student', async () => {
            expect(res.body).toMatchObject({"student_id": 1, "first_name": "Johnny", "last_name": "Jimbo", "hobbies": "eating" })
        })
        it('responds with the correct student', async () => {
            expect(res.body.student_id).toBe(1)
        })
    })
    describe('[POST] /students with full info', () => {
            const fullStudent = {
                first_name: "Jimmy",
                last_name: "John",
                hobbies: "games"
            }
            let res
            beforeEach(async () => {
                res = await request(server).post('/students').send(fullStudent)
            })
            it('responds with 201', async() => {
                expect(res.status).toBe(201)
            })
            it('resolves to new student', async () => {
                expect(res.body).toMatchObject(fullStudent)
            })
        })
    describe('[POST] /students with no hobbies', () => {
            const nonStudent = {
                first_name: "Jimmy",
                last_name: "John",
            }
            let res
            beforeEach(async () => {
                res = await request(server).post('/students').send(nonStudent)
            })
            it('responds with 201', async() => {
                expect(res.status).toBe(201)
            })
            it('resolves to new student', async () => {
                expect(res.body).toMatchObject(nonStudent)
            })
        })
    describe('[POST] /students with no last name', () => {
            const firstStudent = {
                first_name: "Jimmy",
            }
            let res
            beforeEach(async () => {
                res = await request(server).post('/students').send(firstStudent)
            })
            it('responds with 500', async() => {
                expect(res.status).toBe(500)
            })
        })
})