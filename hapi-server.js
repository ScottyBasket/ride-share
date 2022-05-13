// Knex
const knex = require("knex")({
    client: "pg",
    connection: {
        host: 'pg.cse.taylor.edu',
        user: 'eli_bassett',
        password: 'kecoseli',
        database: 'eli_bassett'
    },
});

// Objection
const objection = require("objection");
objection.Model.knex(knex);

// Models
const User = require("./models/User");
const Vehicle = require("./models/Vehicle");
const Location = require("./models/Location");

// Hapi
const Joi = require("@hapi/joi"); // Input validation
const Hapi = require("@hapi/hapi"); // Server

const server = Hapi.server({
    host: "localhost",
    port: 3000,
    routes: {
        cors: true,
    },
});

async function init() {
    // Show routes at startup.
    await server.register(require("blipp"));

    // Output logging information.
    await server.register({
        plugin: require("hapi-pino"),
        options: {
            prettyPrint: true,
        },
    });

    // Configure routes.
    server.route([{
            method: "POST",
            path: "/users",
            config: {
                description: "Sign up to be a user",
                validate: {
                    payload: Joi.object({
                        firstName: Joi.string().required(),
                        lastName: Joi.string().required(),
                        email: Joi.string().email().required(),
                        password: Joi.string().min(8).required(),
                        phoneNumber: Joi.string().required(),
                    }),
                },
            },
            handler: async(request, h) => {
                const existingAccount = await User.query()
                    .where("email", request.payload.email)
                    .first();
                if (existingAccount) {
                    return {
                        ok: false,
                        msge: `User with email '${request.payload.email}' is already in use`,
                    };
                }

                const newAccount = await User.query().insert({
                    first_name: request.payload.firstName,
                    last_name: request.payload.lastName,
                    email: request.payload.email,
                    password: request.payload.password,
                    phone: request.payload.phoneNumber,
                    isAdmin: false,
                });

                if (newAccount) {
                    return {
                        ok: true,
                        msge: `Created user '${request.payload.email}'`,
                    };
                } else {
                    return {
                        ok: false,
                        msge: `Couldn't create user with email '${request.payload.email}'`,
                    };
                }
            },
        },

        {
            method: "GET",
            path: "/accounts",
            config: {
                description: "Retrieve all accounts",
            },
            handler: (request, h) => {
                return User.query();
            },
        },

        {
            method: "GET",
            path: "/vehicles",
            config: {
                description: "Retrieve all vehicles",
            },
            handler: (request, h) => {
                return Vehicle.query();
            },
        },

        {
            method: "GET",
            path: "/locations",
            config: {
                description: "Retrieve all locations",
            },
            handler: (request, h) => {
                return Location.query();
            },
        },

        {
            method: "DELETE",
            path: "/accounts/{id}",
            config: {
                description: "Delete an account",
            },
            handler: (request, h) => {
                return User.query()
                    .deleteById(request.params.id)
                    .then((rowsDeleted) => {
                        if (rowsDeleted === 1) {
                            return {
                                ok: true,
                                msge: `Deleted account with ID '${request.params.id}'`,
                            };
                        } else {
                            return {
                                ok: false,
                                msge: `Couldn't delete account with ID '${request.params.id}'`,
                            };
                        }
                    });
            },
        },

        {
            method: "DELETE",
            path: "/vehicles/{id}",
            config: {
                description: "Delete a vehicle",
            },
            handler: (request, h) => {
                return Vehicle.query()
                    .deleteById(request.params.id)
                    .then((rowsDeleted) => {
                        if (rowsDeleted === 1) {
                            return {
                                ok: true,
                                msge: `Deleted vehicle with ID '${request.params.id}'`,
                            };
                        } else {
                            return {
                                ok: false,
                                msge: `Couldn't delete vehicle with ID '${request.params.id}'`,
                            };
                        }
                    });
            },
        },

        {
            method: "DELETE",
            path: "/locations/{id}",
            config: {
                description: "Delete a location",
            },
            handler: (request, h) => {
                return Location.query()
                    .deleteById(request.params.id)
                    .then((rowsDeleted) => {
                        if (rowsDeleted === 1) {
                            return {
                                ok: true,
                                msge: `Deleted location with ID '${request.params.id}'`,
                            };
                        } else {
                            return {
                                ok: false,
                                msge: `Couldn't delete location with ID '${request.params.id}'`,
                            };
                        }
                    });
            },
        },

        {
            method: "POST",
            path: "/login",
            config: {
                description: "Log in",
                validate: {
                    payload: Joi.object({
                        email: Joi.string().email().required(),
                        password: Joi.string().min(8).required(),
                    }),
                },
            },
            handler: async(request, h) => {
                const account = await User.query()
                    .where("email", request.payload.email)
                    .first();
                if (
                    account &&
                    (await account.verifyPassword(request.payload.password))
                ) {
                    return {
                        ok: true,
                        msge: `Logged in successfully as '${request.payload.email}'`,
                        details: {
                            id: account.id,
                            firstName: account.first_name,
                            lastName: account.last_name,
                            email: account.email,
                        },
                    };
                } else {
                    return {
                        ok: false,
                        msge: "Invalid email or password",
                    };
                }
            },
        },
    ]);

    // Start the server.
    await server.start();
}

// Go!
init();