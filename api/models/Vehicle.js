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

class Authorization extends Model {
    static get tableName() {
        return 'Authorization';
    }
}

class State extends Model {
    static get tableName() {
        return 'State';
    }
}

class Ride extends Model {
    static get tableName() {
        return 'Ride';
    }
}

class Vehicle extends Model {
    static get tableName() {
        return 'Vehicle';
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

    static get relationMappings() {
        return {
            Authorizations: {
                relation: Model.HasManyRelation,
                modelClass: Authorization,
                join: {
                    from: 'Vehicle.id',
                    to: 'Authorization.vehicleId'
                }
            }
        };
    }
    static get relationMappings() {
        return {
            VehicleTypes: {
                relation: Model.BelongsToOneRelation,
                modelClass: VehicleType,
                join: {
                    from: 'Vehicle.vehicleTypeId',
                    to: 'VehicleType.id'
                }
            }
        }
    }

    static get relationMappings() {
        return {
            States: {
                relation: Model.BelongsToOneRelation,
                modelClass: State,
                join: {
                    from: 'Vehicle.licenseState',
                    to: 'State.abbreviation'
                }
            }
        }
    }

}
/*
Vehicle.query()
    .withGraphFetched('rides')
    .where('id', 1)
    .first()
    .then(Ride => console.log(Ride))
    .catch(error => console.log(error.message));

Vehicle.query()
    .withGraphFetched('Authorizations')
    .where('id', 1)
    .first()
    .then(Authorization => console.log(Authorization))
    .catch(error => console.log(error.message));


Vehicle.query()
    .withGraphFetched('VehicleTypes')
    .where('id', 1)
    .first()
    .then(user => console.log(user))
    .catch(error => console.log(error.message));
    */
Vehicle.query()
    .withGraphFetched('States')
    .where('licenseState', 'NY')
    .first()
    .then(State => console.log(State))
    .catch(error => console.log(error.message));
