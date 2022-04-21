create table "Vehicle"
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

