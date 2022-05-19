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
  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/User",
        join: {
          from: 'Driver.userId',
          to: 'User.id'
        }
      },
      states: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/State",
        join: {
          from: 'Driver.licenseState',
          to: 'State.abbreviation'
        }
      },
      vehicles: {
          relation: Model.ManyToManyRelation,
          modelClass: __dirname + "/Vehicle",
          join: {
            from: 'Driver.id',
            through: {
              from: 'Authorization.driverId',
              to: 'Authorization.vehicleId'
            },
            to: 'Vehicle.id'
        }
      },
      ride: {
          relation: Model.ManyToManyRelation,
          modelClass: __dirname + "/Ride",
          join: {
            from: 'Driver.id',
            through: {
              from: 'Drivers.driverId',
              to: 'Drivers.rideId'
            },
            to: 'Ride.id'
        }
      },
    }
  }
}

// Driver.query()
//   .withGraphFetched('users')
//   .where('userId', 1)
//   .first()
//   .then(user => console.log(user))
//   .catch(error => console.log(error.message));
//
// Driver.query()
//   .withGraphFetched('states')
//   .where('licenseState', 'NY')
//   .first()
//   .then(user => console.log(user))
//   .catch(error => console.log(error.message));
//
// Driver.query()
//   .withGraphFetched('authorizations')
//   .where('id', 1)
//   .first()
//   .then(user => console.log(user))
//   .catch(error => console.log(error.message));
//
// Driver.query()
//   .withGraphFetched('driverS')
//   .where('id', 1)
//   .first()
//   .then(user => console.log(user))
//   .catch(error => console.log(error.message));

module.exports = Driver;
