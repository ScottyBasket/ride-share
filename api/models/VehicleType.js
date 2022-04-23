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

class VehicleType extends Model {
    static get tableName() {
        return 'VehicleType';
    }
    static get relationMappings() {
        return {
            vehicles: {
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
    .withGraphFetched('vehicles')
    .where('id', 1)
    .first()
    .then(VehicleType => console.log(VehicleType)).catch(error => console.log(error.message));