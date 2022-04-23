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


class VehicleType extends Model {
    static get tableName() {
        return 'VehicleType';
    }
}

class Vehicle extends Model {
    static get tableName() {
        return 'Vehicle';
    }
    static get relationMappings() {
        return {
            VehicleType: {
                relation: Model.HasManyRelation,
                modelClass: Vehicle,
                join: {
                    from: 'VehicleType.id',
                    to: 'Vehicle.vehicleTypeId'
                }
            }
        };
    }
}

VehicleType.query()
    .withGraphFetched('Vehicle')
    .where('VehicleType', 1)
    .first()
    .then(VehicleType => console.log(VehicleType)).catch(error => console.log(error.message));