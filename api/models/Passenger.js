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

class User extends Model {
  static get tableName() {
    return 'User';
  }
}

class Ride extends Model {
  static get tableName() {
    return 'Ride';
  }
}

class Passenger extends Model {
  static get tableName() {
    return 'Passenger';
  }
  /*
  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'Passenger.userId',
          to: 'User.id'
        }
      }
    }
  }
  */
  static get relationMappings() {
    return {
      rides: {
        relation: Model.BelongsToOneRelation,
        modelClass: Ride,
        join: {
          from: 'Passenger.rideId',
          to: 'Ride.id'
        }
      }
    }
  }
}

Passenger.query()
  .withGraphFetched('users')
  .where('userId', 2)
  .first()
  .then(user => console.log(user))
  .catch(error => console.log(error.message));

Passenger.query()
  .withGraphFetched('rides')
  .where('rideId', 1)
  .first()
  .then(user => console.log(user))
  .catch(error => console.log(error.message));
