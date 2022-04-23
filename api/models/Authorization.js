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

class Vehicle extends Model {
  static get tableName() {
    return 'Vehicle';
  }
}

class Driver extends Model {
  static get tableName() {
    return 'Driver';
  }
}

class Authorization extends Model {
  static get tableName() {
    return 'Authorization';
  }
/*
  static get relationMappings() {
    return {
      vehicles: {
        relation: Model.BelongsToOneRelation,
        modelClass: Vehicle,
        join: {
          from: 'Authorization.vehicleId',
          to: 'Vehicle.id'
        }
      }
    }
  }
*/
  static get relationMappings() {
    return {
      drivers: {
        relation: Model.BelongsToOneRelation,
        modelClass: Driver,
        join: {
          from: 'Authorization.driverId',
          to: 'Driver.id'
        }
      }
    }
  }
}

/*
Authorization.query()
  .withGraphFetched('vehicles')
  .where('vehicleId', 1)
  .first()
  .then(user => console.log(user))
  .catch(error => console.log(error.message));
*/

Authorization.query()
  .withGraphFetched('drivers')
  .where('driverId', 1)
  .first()
  .then(user => console.log(user))
  .catch(error => console.log(error.message));
