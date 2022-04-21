create table "Authorization"
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

