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
    static get relationMappings() {
        return {
            ride: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/Ride",
                join: {
                    from: 'Vehicle.id',
                    to: 'Ride.vehicleId'
                }
            },
            driver: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + "/Driver",
                join: {
                  from: 'Vehicle.id',
                  through: {
                    from: 'Authorization.driverId',
                    to: 'Authorization.vehicleId'
                  },
                  to: 'Driver.id'
              }
            },
            vehicleTypes: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/VehicleType",
                join: {
                    from: 'Vehicle.vehicleTypeId',
                    to: 'VehicleType.id'
                }
            },
            state: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + "/State",
                join: {
                    from: 'Vehicle.licenseState',
                    to: 'State.abbreviation'
                }
            }
        }
    }

}


module.exports = Vehicle;
