CREATE TABLE `family`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `birthday` DATE NOT NULL,
  `biography` TEXT,
  `is_connected` TINYINT(1),
   PRIMARY KEY (`id`)
  );

INSERT INTO family (firstname, lastname, birthday, biography, is_connected)
VALUES ('John', 'Smith', '1965-11-15','isoeml lsjfdsjl',true),
('Jane', 'Smith', '1965-11-25','isoeml lsjfdsjl',true),
('Sarah', 'Smith', '1985-06-15','isoeml lsjfdsjl',false),
('Tristan', 'Smith', '1987-06-17','isoeml lsjfdsjl',false);

INSERT INTO family (firstname, lastname, birthday, )
VALUES ('Lucas', 'Smith','1990-05-05');



