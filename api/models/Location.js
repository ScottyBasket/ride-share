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


class Location extends Model {
    static get tableName() {
        return 'Location';
    }
    static get relationMappings() {
        return {
            States: {
                relation: Model.BelongsToOneRelation,
                modelClass: State,
                join: {
                    from: 'Location.state',
                    to: 'State.abbreviation'
                }
            }
        };
    }
    static get relationMappings() {
        return {
            Rides: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'Location.id',
                    to: 'Ride.fromLocation'
                }
            }
        };
    }
    static get relationMappings() {
        return {
            Ridess: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'Location.id',
                    to: 'Ride.toLocationId'
                }
            }
        };
    }
}
/*
Location.query()
    .withGraphFetched('States')
    .where('state', 'NY')
    .first()
    .then(State => console.log(State))
    .catch(error => console.log(error.message));

Location.query()
    .withGraphFetched('Rides')
    .where('id', 2)
    .first()
    .then(Ride => console.log(Ride))
    .catch(error => console.log(error.message));
*/
Location.query()
    .withGraphFetched('Ridess')
    .where('id', 1)
    .first()
    .then(Ride => console.log(Ride))
    .catch(error => console.log(error.message));