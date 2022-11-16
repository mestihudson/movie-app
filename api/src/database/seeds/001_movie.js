exports.seed = async function(knex) {
  await knex('movie').del()
  await knex('movie').insert([
    {id: 1, title: 'Black Panther'},
    {id: 2, title: 'Top Gun'},
  ])
}
