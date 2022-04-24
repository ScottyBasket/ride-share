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
            Driveres: {
                relation: Model.HasManyRelation,
                modelClass: Drivers,
                join: {
                    from: 'Ride.id',
                    to: 'Drivers.rideId'
                }
            }
        };
    }
    static get relationMappings() {
        return {
            Passengeres: {
                relation: Model.HasManyRelation,
                modelClass: Passenger,
                join: {
                    from: 'Ride.id',
                    to: 'Passenger.rideId'
                }
            }
        };
    }
    static get relationMappings() {
        return {
            vehicles: {
                relation: Model.BelongsToOneRelation,
                modelClass: Vehicle,
                join: {
                    from: 'Ride.vehicleId',
                    to: 'Vehicle.id'
                }
            }
        }
    }
    static get relationMappings() {
        return {
            Locationes: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'Ride.fromLocation',
                    to: 'Location.id'
                }
            }
        }
    }
    static get relationMappings() {
        return {
            Locationess: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'Ride.toLocationId',
                    to: 'Location.id'
                }
            }
        }
    }
}
/*
Ride.query()
    .withGraphFetched('Driveres')
    .where('id', 1)
    .first()
    .then(Drivers => console.log(Drivers))
    .catch(error => console.log(error.message));


Ride.query()
    .withGraphFetched('Passengeres')
    .where('id', 1)
    .first()
    .then(Passenger => console.log(Passenger))
    .catch(error => console.log(error.message));


Ride.query()
    .withGraphFetched('vehicles')
    .where('id', 1)
    .first()
    .then(Vehicle => console.log(Vehicle))
    .catch(error => console.log(error.message));

Ride.query()
    .withGraphFetched('Locationes')
    .where('id', 1)
    .first()
    .then(Location => console.log(Location))
    .catch(error => console.log(error.message));
*/
Ride.query()
    .withGraphFetched('Locationess')
    .where('id', 1)
    .first()
    .then(Location => console.log(Location))
    .catch(error => console.log(error.message));