CREATE TABLE users (
     id MEDIUMINT NOT NULL AUTO_INCREMENT,
     name CHAR(30) NOT NULL,
     user_email VARCHAR(320) NOT NULL,
     password VARCHAR(255) NOT NULL,
     address VARCHAR(255),
     contact_no VARCHAR(20),
     PRIMARY KEY (id)
);


CREATE TABLE cycles (
     cycle_id MEDIUMINT NOT NULL AUTO_INCREMENT,
     cycle_name CHAR(30) NOT NULL,
     from_user VARCHAR(320) NOT NULL,
     pickup_address VARCHAR(255) NOT NULL,
     from_time datetime  NOT NULL default '0000-00-00 00:00:00',
     to_time datetime NOT NULL default '0000-00-00 00:00:00',
     booking_status TINYINT(1) default 0,
     PRIMARY KEY (cycle_id)
);