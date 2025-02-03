DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS repuestos_reparacion;
DROP TABLE IF EXISTS reparaciones;
DROP TABLE IF EXISTS mecanicos;
DROP TABLE IF EXISTS repuestos;
DROP TABLE IF EXISTS marcas;
DROP TABLE IF EXISTS vehiculos;
DROP TABLE IF EXISTS diagnostico_vehiculo;
DROP TABLE IF EXISTS Login;

-- Tabla de Clientes
CREATE table clientes (
    cedula INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellido1 TEXT NOT NULL,
    apellido2 TEXT NOT NULL,
    correo TEXT NOT NULL,
    contraseña TEXT NOT NULL
); 


CREATE TABLE vehiculos (
    id_vehiculo INTEGER PRIMARY KEY AUTOINCREMENT,
    id_marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    anio INTEGER NOT NULL,
    cedula INTEGER NOT NULL,
    placa TEXT,
    foto BLOB,
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca),
    FOREIGN KEY (cedula) REFERENCES clientes(cedula)
);




-- Tabla de Marcas

CREATE TABLE marcas (
    id_marca INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
);

-- Tabla de Repuestos

CREATE TABLE repuestos (
    id_repuesto INTEGER PRIMARY KEY AUTOINCREMENT,
    id_marca INTEGER NOT NULL,
    precio REAL NOT NULL,
    foto BLOB,
    descripcion TEXT,
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca)
);

-- Tabla de Mecanicos

CREATE TABLE mecanicos (
    cedula INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    edad INTEGER NOT NULL,
    foto BLOB
);

-- Tabla de Reparaciones

CREATE TABLE reparaciones (
    id_reparacion INTEGER PRIMARY KEY AUTOINCREMENT,
    id_diagnostico INTEGER NOT NULL,
    id_vehiculo INTEGER NOT NULL,
    id_mecanico INTEGER NOT NULL,
    fecha_reparacion TEXT NOT NULL,
    estado TEXT NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo),
    FOREIGN KEY (id_mecanico) REFERENCES mecanicos(cedula),
    FOREIGN KEY (id_diagnostico) REFERENCES diagnostico_vehiculo(id_diagnostico),
    CHECK (estado IN ('Pendiente', 'En espera', 'Denegado', 'En curso', 'Facturar', 'Finalizado'))
);

CREATE TABLE repuestos_reparacion (
 idrepuestos_reparacion INTEGER PRIMARY KEY AUTOINCREMENT,
    id_reparacion INTEGER NOT NULL,
    id_repuesto INTEGER NOT NULL,
    cantidad_utilizada INTEGER NOT NULL,
    FOREIGN KEY (id_reparacion) REFERENCES reparaciones(id_reparacion),
    FOREIGN KEY (id_repuesto) REFERENCES repuestos(id_repuesto)
);

Create table Login(
    usuario TEXT PRIMARY KEY NOT NULL,
    contraseña TEXT NOT NULL
);

CREATE TABLE diagnostico_vehiculo(
    id_diagnostico INTEGER PRIMARY KEY AUTOINCREMENT,
    id_vehiculo INTEGER NOT NULL,
    fecha_diagnostico TEXT NOT NULL,
    diagnostico_tecnico TEXT NOT NULL,
    descripcion_cliente TEXT NOT NULL,
    foto BLOB,
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo)
);



INSERT INTO clientes (cedula, nombre, apellido1, apellido2, correo, contraseña) 
VALUES 
(100000001, 'Elder', 'Leon', 'Perez', 'x', '1234'),
(100000002, 'Jimena', 'Mendez', 'Apellido2', 'cliente2@example.com', '1234'),
(100000003, 'Brasly', 'Villarebia', 'Morales', 'cliente3@example.com', '1'),
(100000004, 'Ana', 'Gomez', 'Lopez', 'cliente4@example.com', 'abcd1234'),
(100000005, 'Carlos', 'Ramirez', 'Martinez', 'cliente5@example.com', 'qwerty'),
(100000006, 'Lucia', 'Torres', 'Garcia', 'cliente6@example.com', 'password123'),
(100000007, 'Julio', 'Castillo', 'Fernandez', 'cliente7@example.com', '123abc'),
(100000008, 'Marta', 'Hernandez', 'Perez', 'cliente8@example.com', 'pass1234'),
(100000009, 'Pedro', 'Sanchez', 'Rodriguez', 'cliente9@example.com', 'mypassword'),
(100000010, 'Sofia', 'Diaz', 'Martinez', 'cliente10@example.com', 'abcd123'),
(100000011, 'Miguel', 'Alvarez', 'Jimenez', 'cliente11@example.com', '12345678'),
(100000012, 'Elena', 'Moreno', 'Garcia', 'cliente12@example.com', 'hola1234'),
(100000013, 'Ruben', 'Gonzalez', 'Diaz', 'cliente13@example.com', 'letmein'),
(100000014, 'Andrea', 'Perez', 'Vazquez', 'cliente14@example.com', 'password1'),
(100000015, 'Luis', 'Martinez', 'Cortes', 'cliente15@example.com', 'abc1234'),
(100000016, 'Ricardo', 'Lopez', 'Castro', 'cliente16@example.com', 'secreto123'),
(100000017, 'Carmen', 'Fernandez', 'Jimenez', 'cliente17@example.com', 'qwert1234');

INSERT INTO marcas (nombre) 
VALUES 
('Toyota'),
('Honda'),
('Ford'),
('Chevrolet'),
('BMW'),
('Mercedes-Benz'),
('Audi'),
('Nissan'),
('Volkswagen'),
('Hyundai'),
('Kia'),
('Mazda'),
('Subaru'),
('Renault'),
('Peugeot');

INSERT INTO repuestos (id_marca, precio, foto, descripcion) 
VALUES 
(1, 150.75, NULL, 'Filtro de aire'),
(2, 200.50, NULL, 'Bujías'),
(3, 300.00, NULL, 'Amortiguadores'),
(4, 120.00, NULL, 'Aceite de motor'),
(1, 50.25, NULL, 'Filtro de aceite'),
(2, 80.00, NULL, 'Pastillas de freno'),
(3, 400.00, NULL, 'Llantas'),
(4, 150.00, NULL, 'Batería'),
(1, 100.00, NULL, 'Lámparas'),
(2, 75.00, NULL, 'Limpiaparabrisas'),
(1, 120.00, NULL, 'Correa de distribución'),
(3, 180.00, NULL, 'Frenos de disco'),
(4, 250.00, NULL, 'Radiador'),
(1, 220.00, NULL, 'Amortiguadores delanteros'),
(2, 90.00, NULL, 'Aceite hidráulico');