
exports.seed = async function(knex) {
  await knex('students').truncate()
  await knex('students').insert([
    { first_name: "Don", last_name: "Dimmer", hobbies: "golfing" },
    { first_name: "Rat", last_name: "Rapper", hobbies: "rapping" },
    { first_name: "Tim", last_name: "Timmy", hobbies: "cooking" },
    { first_name: "Duck", last_name: "Goose", hobbies: "swimming" },
  ])
};
