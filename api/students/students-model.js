const db = require('../../data/db-config')

module.exports = {
    getAll,
    getById,
    make
}

function getAll() {
    return db('students')
}

function getById(id){
    return db('students')
        .where('student_id', id)
        .first()
}

async function make(student) {
    return db('students')
        .insert(student)
        .then(id => {
            return getById(id)
        })
}