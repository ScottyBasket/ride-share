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

class State extends Model {
    static get tableName() {
        return 'State';
    }
    static get relationMappings() {
        return {
            Location: {
                relation: Model.HasManyRelation,
                modelClass: State,
                join: {
                    from: 'State.abbreviation',
                    to: 'Location.state'
                }
            }
        };
    }
    static get relationMappings() {
        return {
            Vehicle: {
                relation: Model.HasManyRelation,
                modelClass: State,
                join: {
                    from: 'State.abbreviation',
                    to: 'Vehicle.licenseState'
                }
            }
        };
    }
}