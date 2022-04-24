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

class Driver extends Model {
    static get tableName() {
        return 'Driver';
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
                modelClass: Location,
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
                modelClass: Vehicle,
                join: {
                    from: 'State.abbreviation',
                    to: 'Vehicle.licenseState'
                }
            }
        };
    }

    static get relationMappings() {
        return {
            Driver: {
                relation: Model.HasManyRelation,
                modelClass: Driver,
                join: {
                    from: 'State.abbreviation',
                    to: 'Driver.licenseState'
                }
            }
        };
    }

}

/*
State.query()
    .where('abbreviation', 'NY')
    .first()
    .then(State => {
        console.log(State);
        return State.$relatedQuery('Location');
    })

.then(Location => console.log(Location))
    .catch(error => console.log(error.message));
*/

State.query()
    .withGraphFetched('Vehicle')
    .where('abbreviation', 'NY')
    .first()
    .then(State => {
        console.log(State);
        return State.$relatedQuery('Vehicle');
    })

.then(Vechicle => console.log(Vehicle))
    .catch(error => console.log(error.message));

/*
State.query()
    .withGraphFetched('Driver')
    .where('abbreviation', 'NY')
    .first()
    .then(State => {
        console.log(State);
        return State.$relatedQuery('Driver');
    })

.then(Driver => console.log(Driver))
    .catch(error => console.log(error.message));
    */