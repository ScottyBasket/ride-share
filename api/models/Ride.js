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

class Location extends Model {
    static get tableName() {
        return 'Location';
    }
}

class Vehicle extends Model {
    static get tableName() {
        return 'Vehicle';
    }
}

class Drivers extends Model {
    static get tableName() {
        return 'Drivers';
    }
}

class Passenger extends Model {
    static get tableName() {
        return 'Passenger';
    }
}

class Ride extends Model {
    static get tableName() {
        return 'Ride';
    }

    static get relationMappings() {
        return {
            rides: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'Vehicle.id',
                    to: 'Ride.vehicleId'
                }
            }
        };
    }
}