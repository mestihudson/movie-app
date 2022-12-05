exports.seed = async function(knex) {
  await knex('movie').del()
  await knex('movie').insert([
    { id: 1, title: 'Black Panther', description: 'bp', director: 'bp', producer: 'bp', banner: 'bp', poster: 'bp', originalId: '1' },
    { id: 2, title: 'Top Gun', description: 'tg', director: 'tg', producer: 'tg', banner: 'tg', poster: 'tg', originalId: '2' },
  ])
}
