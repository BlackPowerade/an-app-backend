exports.seed = function(knex) {
  return knex.schema.dropTableIfExists('calendar')
  .then(function ()
  {
    return knex.schema.createTable('calendar', function (table) 
    {
      table.increments();
      table.string('event');
      table.string('location');
      table.string('time');
    });
  })
  .then(function () 
  {
    return knex('calendar').insert(
    [
      {time: 'July 30th', location: 'Somewhere over the mountains', event:'Snowboarding'},
      {time: 'August 12th', location: 'Launchpad Brewery', event:'Going away party'},
      {time: 'August 13th', location: 'Home', event:'Recover from going away party'}
    ])
  })
}
