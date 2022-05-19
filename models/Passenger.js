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

class Passenger extends Model {
  static get tableName() {
    return 'Passenger';
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/User",
        join: {
          from: 'Passenger.userId',
          to: 'User.id'
        }
      },
      rides: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/Ride",
        join: {
          from: 'Passenger.rideId',
          to: 'Ride.id'
        }
      }
    }
  }
}

// Passenger.query()
//   .withGraphFetched('users')
//   .where('userId', 2)
//   .first()
//   .then(user => console.log(user))
//   .catch(error => console.log(error.message));
//
// Passenger.query()
//   .withGraphFetched('rides')
//   .where('rideId', 1)
//   .first()
//   .then(user => console.log(user))
//   .catch(error => console.log(error.message));

module.exports = Passenger;
