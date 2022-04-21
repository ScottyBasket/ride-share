create table "Driver"
(
    id              integer     not null
        constraint driver_pk
            primary key,
    "licenseNumber" varchar(9)  not null,
    "userId"        integer     not null
        constraint "userId"
            references "User",
    "licenseState"  varchar(20) not null
        constraint "licenseState"
            references "State"
);

alter table "Driver"
    owner to eli_bassett;

