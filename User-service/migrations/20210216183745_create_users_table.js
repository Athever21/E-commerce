exports.up = function(knex) {
  return knex.schema.createTable('users', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid()'));
    t.string('username',16).unique();
    t.string('email', 64);
    t.text('password');
    t.string('img',36);
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
