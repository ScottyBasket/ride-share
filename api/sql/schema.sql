create table if not exists "User"
(
    id         serial
        constraint user_pk
            primary key,
    first_name varchar(40) not null,
    last_name  varchar(40) not null,
    email      varchar(80) not null,
    password   varchar(20) not null,
    phone      integer     not null,
    "isAdmin"  boolean     not null
);

alter table "User"
    owner to eli_bassett;

create table if not exists "Vehicle Type"
(
    id   integer     not null
        constraint "vehicle type_pk"
            primary key,
    type varchar(10) not null
);

alter table "Vehicle Type"
    owner to eli_bassett;

create table if not exists "State"
(
    abbreviation varchar(2)  not null
        constraint state_pk
            primary key,
    name         varchar(15) not null
);

alter table "State"
    owner to eli_bassett;

create table if not exists "Driver"
(
    id              integer     not null
        constraint driver_pk
            primary key,
    "licenseNumber" varchar(7)  not null,
    "userId"        integer     not null
        constraint "userId"
            references "User",
    "licenseState"  varchar(20) not null
        constraint "licenseState"
            references "State"
);

alter table "Driver"
    owner to eli_bassett;

create table if not exists "Vehicle"
(
    id              serial
        constraint vehicle_pk
            primary key,
    make            varchar(20) not null,
    model           varchar(20) not null,
    color           varchar(20) not null,
    capacity        integer     not null,
    mpg             double precision,
    "licensePlate"  varchar(10) not null,
    "vehicleTypeId" integer     not null
        constraint "vehicleTypeId"
            references "Vehicle Type",
    "licenseState"  varchar(10) not null
        constraint "licenseState"
            references "State"
);

alter table "Vehicle"
    owner to eli_bassett;

create table if not exists "Authorization"
(
    "driverId"  integer not null
        constraint "driverId"
            references "Driver"
        constraint "vehicleId"
            references "Vehicle",
    "vehicleId" integer not null
        constraint authorization_pk
            primary key
);

alter table "Authorization"
    owner to eli_bassett;

create table if not exists "Location"
(
    id        integer     not null
        constraint location_pk
            primary key,
    name      varchar(20) not null,
    address   varchar(50) not null,
    city      varchar(20) not null,
    "zipCode" integer     not null,
    state     varchar(40) not null
        constraint state
            references "State"
);

alter table "Location"
    owner to eli_bassett;

create table if not exists "Ride"
(
    id             serial
        constraint ride_pk
            primary key,
    date           date             not null,
    time           timestamp        not null,
    distance       double precision not null,
    "fuelPrice"    double precision not null,
    fee            double precision not null,
    "vehicleId"    integer          not null
        constraint "vehicleId"
            references "Vehicle",
    "fromLocation" integer          not null
        constraint "fromLocation"
            references "Location",
    "toLocationId" integer          not null
        constraint "toLocationId"
            references "Location"
);

alter table "Ride"
    owner to eli_bassett;

create table if not exists "Passenger"
(
    "userId" integer not null
        constraint "userId"
            references "User",
    "rideId" integer not null
        constraint passenger_pk
            primary key
        constraint "rideId"
            references "Ride"
);

alter table "Passenger"
    owner to eli_bassett;

create table if not exists "Drivers"
(
    "driverId" integer not null
        constraint "driverId"
            references "Driver",
    "rideId"   integer not null
        constraint drivers_pk
            primary key
        constraint "rideId"
            references "Ride"
);

alter table "Drivers"
    owner to eli_bassett;

create unique index if not exists ride_id_uindex
    on "Ride" (id);

create unique index if not exists location_id_uindex
    on "Location" (id);

