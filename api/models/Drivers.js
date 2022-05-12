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

class Ride extends Model {
  static get tableName() {
    return 'Ride';
  }
}

class Drivers extends Model {
  static get tableName() {
    return 'Drivers';
  }

  static get relationMappings() {
    return {
      driverS: {
        relation: Model.BelongsToOneRelation,
        modelClass: Driver,
        join: {
          from: 'Drivers.driverId',
          to: 'Driver.id'
        }
      },
      rides: {
        relation: Model.BelongsToOneRelation,
        modelClass: Ride,
        join: {
          from: 'Drivers.rideId',
          to: 'Ride.id'
        }
      }
    }
  }
}

Drivers.query()
  .withGraphFetched('driverS')
  .where('driverId', 1)
  .first()
  .then(user => console.log(user))
  .catch(error => console.log(error.message));

Drivers.query()
  .withGraphFetched('rides')
  .where('rideId', 1)
  .first()
  .then(user => console.log(user))
  .catch(error => console.log(error.message));
