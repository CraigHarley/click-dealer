CREATE TABLE IF NOT EXISTS reservations
(
  id        INT(11)     NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(50) NOT NULL,
  lastname  VARCHAR(30) NOT NULL,
  email     VARCHAR(30) NOT NULL,
  mobile    VARCHAR(11) NOT NULL§,
  CONSTRAINT reservations_pk PRIMARY KEY (id)
);
