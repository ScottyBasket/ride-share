create table "Ride"
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

create unique index ride_id_uindex
    on "Ride" (id);

