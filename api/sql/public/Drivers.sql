create table "Drivers"
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

