create table "Passenger"
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

