create table "User"
(
    id         serial
        constraint user_pk
            primary key,
    first_name varchar(40) not null,
    last_name  varchar(40) not null,
    email      varchar(80) not null,
    password   varchar(20) not null,
    phone      varchar(11) not null,
    "isAdmin"  boolean     not null
);

alter table "User"
    owner to eli_bassett;

