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

//Many to One Relation
class User extends Model {
  static get tableName() {
    return 'User';
  }
}

class State extends Model {
  static get tableName() {
    return 'State';
  }
}

//One to Many Relation
class Authorization extends Model {
  static get tableName() {
    return 'Authorization';
  }
}

class Drivers extends Model {
  static get tableName() {
    return 'Drivers';
  }
}

//-----------------------------------------------------------------------------/
class Driver extends Model {
  static get tableName() {
    return 'Driver';
  }
  /*
  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'Driver.userId',
          to: 'User.id'
        }
      }
    }
  }
  *//*
  static get relationMappings() {
    return {
      states: {
        relation: Model.BelongsToOneRelation,
        modelClass: State,
        join: {
          from: 'Driver.licenseState',
          to: 'State.abbreviation'
        }
      }
    }
  }

  static get relationMappings() {
    return {
      authorizations: {
        relation: Model.HasManyRelation,
        modelClass: Authorization,
        join: {
          from: 'Driver.id',
          to: 'Authorization.driverId'
        }
      }
    }
  }
  */
  static get relationMappings() {
    return {
      driverS: {
        relation: Model.HasManyRelation,
        modelClass: Drivers,
        join: {
          from: 'Driver.id',
          to: 'Drivers.driverId'
        }
      }
    }
  }
}

/*
Driver.query()
  .withGraphFetched('users')
  .where('userId', 1)
  .first()
  .then(user => console.log(user))
  .catch(error => console.log(error.message));
*/
/*
Driver.query()
  .withGraphFetched('states')
  .where('licenseState', 'NY')
  .first()
  .then(user => console.log(user))
  .catch(error => console.log(error.message));
*/
/*
Driver.query()
  .withGraphFetched('authorizations')
  .where('id', 1)
  .first()
  .then(user => console.log(user))
  .catch(error => console.log(error.message));
*/
Driver.query()
  .withGraphFetched('driverS')
  .where('id', 1)
  .first()
  .then(user => console.log(user))
  .catch(error => console.log(error.message));
