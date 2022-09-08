CREATE SCHEMA mibase;
USE mibase;
CREATE TABLE usuarios (nombre VARCHAR(255) NOT NULL, 
	apellido VARCHAR(255) NOT NULL, 
	edad INT, 
    email VARCHAR(255) NOT NULL, 
    id INT AUTO_INCREMENT,
    PRIMARY KEY(id)
);

INSERT INTO usuarios (nombre, edad, email) 
	VALUES ('Juan Perez', 23, 'jp@gmail.com');
INSERT INTO usuarios (nombre, edad, email) 
	VALUES ('Pedro Mei', 21, 'pm@gmail.com');
INSERT INTO usuarios (nombre, edad, email) 
	VALUES ('Juana Suarez', 25, 'js@gmail.com');

SELECT * FROM usuarios;

DELETE FROM usuarios
	WHERE id = 2;
SELECT * FROM usuarios;

UPDATE usuarios
	SET edad = 24
    WHERE id = 1;
SELECT * FROM usuarios;