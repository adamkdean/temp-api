create table temperature (
    id serial primary key,
    datetime timestamp default current_timestamp,
    t1 real NOT NULL,
    t2 real NOT NULL
);
