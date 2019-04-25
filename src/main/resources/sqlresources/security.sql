create table authorities (
                           username varchar(50) not null,
                           authority varchar(50) not null,
                           constraint fk_authorities_users foreign key(username) references users(username));

insert into authorities(username,authority)
values('jnowak','ROLE_ADMIN');