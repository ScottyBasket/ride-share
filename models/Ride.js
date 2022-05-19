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

class Ride extends Model {
    static get tableName() {
        return 'Ride';
    }

    static get relationMappings() {
        return {
            driver: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + "/Driver",
                join: {
                  from: 'Ride.id',
                  through: {
                    from: 'Drivers.driverId',
                    to: 'Drivers.rideId'
                  },
                  to: 'Driver.id'
              }
            },
            user: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + "/User",
                join: {
                  from: 'Ride.id',
                  through: {
                    from: 'Passenger.rideId',
                    to: 'Passenger.userId'
                  },
                  to: 'User.id'
              }
            },
            vehicle: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/Vehicle",
                join: {
                    from: 'Ride.vehicleId',
                    to: 'Vehicle.id'
                }
            },
            locations: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/Location",
                join: {
                    from: 'Ride.fromLocationId',
                    to: 'Location.id'
                }
            },
            tolocations: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/Location",
                join: {
                    from: 'Ride.toLocationId',
                    to: 'Location.id'
                }
            }
        }
    }
}

// Ride.query()
//     .withGraphFetched('Driveres')
//     .where('id', 1)
//     .first()
//     .then(Drivers => console.log(Drivers))
//     .catch(error => console.log(error.message));
//
//
// Ride.query()
//     .withGraphFetched('Passengeres')
//     .where('id', 1)
//     .first()
//     .then(Passenger => console.log(Passenger))
//     .catch(error => console.log(error.message));
//
//
// Ride.query()
//     .withGraphFetched('vehicles')
//     .where('id', 1)
//     .first()
//     .then(Vehicle => console.log(Vehicle))
//     .catch(error => console.log(error.message));
//
// Ride.query()
//     .withGraphFetched('Locations')
//     .where('id', 1)
//     .first()
//     .then(Location => console.log(Location))
//     .catch(error => console.log(error.message));
//
// Ride.query()
//     .withGraphFetched('driver')
//     .where('id', 1)
//     .first()
//     .then(Location => console.log(Location))
//     .catch(error => console.log(error.message));

// Ride.query()
//   .withGraphFetched('user')
//   .first()
//   .then(Ride => console.log(Ride))
//   .catch(error => console.log(error.message));

Ride.query()
  .withGraphFetched('driver')
  .first()
  .then(Ride => console.log(Ride))
  .catch(error => console.log(error.message));

module.exports = Ride;
