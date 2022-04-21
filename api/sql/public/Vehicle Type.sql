create table "Vehicle Type"
(
    id   integer     not null
        constraint "vehicle type_pk"
            primary key,
    type varchar(10) not null
);

alter table "Vehicle Type"
    owner to eli_bassett;

