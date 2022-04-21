create table "State"
(
    abbreviation varchar(2)  not null
        constraint state_pk
            primary key,
    name         varchar(15) not null
);

alter table "State"
    owner to eli_bassett;

