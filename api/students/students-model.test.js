const Students = require('./students-model')
const db = require('../../data/db-config')

beforeAll(async() => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('student model', () => {
    describe('get all students', () => {
        let result
        beforeEach(async () => {
            result = await Students.getAll()
        })
        it('resolves all students in the table', async () => {
            expect(result).toHaveLength(4)
        })
    })
})