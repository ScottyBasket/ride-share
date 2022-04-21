create table "Location"
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

create unique index location_id_uindex
    on "Location" (id);

