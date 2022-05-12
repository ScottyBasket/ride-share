const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'pg.cse.taylor.edu',
        user: 'eli_bassett',
        password: 'kecoseli',
        database: 'eli_bassett'
    }
});

objection = require('objection');
const Model = objection.Model;
Model.knex(knex);

class Driver extends Model {
  static get tableName() {
    return 'Driver';
  }
}

class Passenger extends Model {
  static get tableName() {
    return 'Passenger';
  }
}

class User extends Model {
  static get tableName() {
    return 'User';
  }
  static get relationMappings() {
    return {
      drivers: {
        relation: Model.HasManyRelation,
        modelClass: Driver,
        join: {
          from: 'User.id',
          to: 'Driver.userId'
        }
      },
      passengers: {
        relation: Model.HasManyRelation,
        modelClass: Passenger,
        join: {
          from: 'User.id',
          to: 'Passenger.userId'
        }
      }
    }
  }
}

User.query()
  .withGraphFetched('drivers')
  .where('id', 1)
  .first()
  .then(user => console.log(user))
  .catch(error => console.log(error.message));

User.query()
  .withGraphFetched('passengers')
  .where('id', 2)
  .first()
  .then(user => console.log(user))
  .catch(error => console.log(error.message));
  
