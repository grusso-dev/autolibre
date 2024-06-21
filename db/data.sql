CREATE SCHEMA dbzrp;

USE dbzrp;

CREATE TABLE users (
/* 	nombreColumna 		tipoDato 		Restricciones */
    id 					INT 			UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email 				VARCHAR(250) 	UNIQUE NOT NULL,
    nombre 				VARCHAR(250) 	NOT NULL,
    contrasenia 		VARCHAR(250) 	NOT NULL,
    fechaNacimiento		DATETIME 		NOT NULL,
    numeroDocumento 	INT 			NOT NULL,
    foto 				VARCHAR(250) 	NOT NULL,	
    createdAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ,
	updatedAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
    deletedAt 			TIMESTAMP 		NULL
    );

    
CREATE TABLE products (

/*   nombreColumna      tipoDato        Restricciones */
    id                  INT             UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    clienteId           INT             UNSIGNED,
    nombreProduct       VARCHAR(250)    NOT NULL,
    imagenProduct       VARCHAR(250)    NOT NULL,
    descripcionProduct  VARCHAR(250)    NOT NULL,
    createdAt           TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ,
    updatedAt           TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt           TIMESTAMP       NULL,
    FOREIGN KEY (clienteId) REFERENCES users(id)
    );


CREATE TABLE comentarios (

/*  nombreColumna       tipoDato        Restricciones */

    id                  INT             UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    productId           INT             UNSIGNED,
    clienteId           INT             UNSIGNED,
    comentario          VARCHAR(250)    NOT NULL,
    createdAt           TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ,
    updatedAt           TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt           TIMESTAMP       NULL,

    FOREIGN KEY (clienteId) REFERENCES users(id),
    FOREIGN KEY (productId) REFERENCES products(id)
    );

insert into users (id, email, nombre, contrasenia, fechaNacimiento, numeroDocumento, foto)
values (default, 'juanperez@gmail.com', 'juanperez', 'juanito10', '1990/05/25', 87654321, 'angel.avif' );

insert into users (id, email, nombre, contrasenia, fechaNacimiento, numeroDocumento, foto)
values (default, 'mariagomez@gmail.com', 'mariagomez', 'maria123', '1985/12/12', 98765432, 'juanita.jpeg');

insert into users (id, email, nombre, contrasenia, fechaNacimiento, numeroDocumento, foto)
values (default, 'pedroaguilar@gmail.com', 'pedroaguilar', 'pedrito123', '1978/08/18', 76543210, 'rob.png');

insert into users (id, email, nombre, contrasenia, fechaNacimiento, numeroDocumento, foto)
values (default, 'lauratorres@gmail.com', 'lauratorres', 'laura456', '1982/04/30', 65432109, 'julieta.avif');

insert into users (id, email, nombre, contrasenia, fechaNacimiento, numeroDocumento, foto)
values (default, 'carlosrojas@gmail.com', 'carlosrojas', 'carsyslos789', '1975/11/08', 54321098, 'mike.jpeg');


insert into products (id, clienteId, nombreProduct, imagenProduct, descripcionProduct)
values (default, 3, "Lamborghini Veneno", "foto3.png", "Auto de lujo traido directamente de Italia");

insert into products (id, clienteId, nombreProduct, imagenProduct, descripcionProduct)
values (default, 2, "Porsche GT3 RS", "foto4.png", "Auto de lujo traido directamente de Alemania");

insert into products (id, clienteId, nombreProduct, imagenProduct, descripcionProduct)
values (default, 1, "Pagani Zonda", "foto2.jpeg", "Magia italiana");

insert into products (id, clienteId, nombreProduct, imagenProduct, descripcionProduct)
values (default, 4, "Ferrari F90", "foto1.png", "320 caballos de fuerza");

insert into products (id, clienteId, nombreProduct, imagenProduct, descripcionProduct)
values (default, 5, "Ford Mustang GT", "foto6.png", "En este auto anduvo Dominic Toretto en Rapidos y Furiosos");

insert into products (id, clienteId, nombreProduct, imagenProduct, descripcionProduct)
values (default, 2, "Maserati GranTurismo", "foto5.png", "Belleza italiana traida de Roma");

insert into products (id, clienteId, nombreProduct, imagenProduct, descripcionProduct)
values (default, 1, "Rolls-Royce Phantom", "foto7.png", "Maquina imponente del Reino Unido");

insert into products (id, clienteId, nombreProduct, imagenProduct, descripcionProduct)
values (default, 3, "Mercedes Benz AMG GT", "foto8.png", "Joya recien traida de Alemania");

insert into products (id, clienteId, nombreProduct, imagenProduct, descripcionProduct)
values (default, 4, "Audi E-tron GT", "foto9.png", "La bestia de los 4 circulos");

insert into products (id, clienteId, nombreProduct, imagenProduct, descripcionProduct)
values (default, 5, "Aston Martin Vantage", "foto10.png", "El oro movil traido del territorio ingles");


insert into comentarios (id, productId, clienteId, comentario)
values (default, 1, 1, "Buen chasis");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 1, 1, "Buen auto, me encanta el color que tiene");


insert into comentarios (id, productId, clienteId, comentario)
values (default, 1, 3, "¿Hacen descuentos a gente nacida en Italia?");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 1, 2, "¿Se le pone aparte el aleron?");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 2, 1, "Velocidad maxima?");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 2, 5, "A cuanto anda?");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 2, 4, "Muy lindo");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 3, 1, "Expectacular");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 3, 3, "Buenas llantas");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 3, 5, "Hermoso");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 4, 1, "Nafta o gas?");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 4, 3, "A cuanto llega");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 4, 5, "Permutas?");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 5, 1, "Lindo auto");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 5, 4, "Como debe andar ese auto");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 5, 2, "Si no pone el precio por algo sera");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 6, 1, "Precio?");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 6, 5, "Tiene 4 puertas?");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 6, 3, "O como o compro ese auto");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 7, 1, "Avion");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 7, 4, "Como debe andar ese auto");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 7, 2, "Autazo");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 8, 1, "Lindo carro");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 8, 2, "Vuela es maquina");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 8, 4, "Aceptas permutas");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 9, 5, "Lindo carro");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 9, 2, "Terrible");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 9, 4, "Tiene motor?");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 10, 1, "Tenes otro color?");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 10, 3, "Que lindo manejar uno de esos");

insert into comentarios (id, productId, clienteId, comentario)
values (default, 10, 5, "Algun dia me voy a dar el gustito");
