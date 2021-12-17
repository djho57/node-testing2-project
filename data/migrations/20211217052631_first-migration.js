
exports.up = async function(knex) {
  await knex.schema.createTable('students', table => {
      table.increments('student_id')
      table.text('first_name').notNullable()
      table.text('last_name').notNullable()
      table.text('hobbies')
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('students')
};
