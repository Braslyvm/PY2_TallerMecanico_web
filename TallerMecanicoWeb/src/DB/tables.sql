
-- Tabla de Vehículos

CREATE TABLE vehiculos (
    id_vehiculo INTEGER PRIMARY KEY AUTOINCREMENT,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    anio INTEGER NOT NULL,
    correo_cliente TEXT NOT NULL,
    placa TEXT
);

INSERT INTO vehiculos (marca, modelo, anio, correo_cliente, placa) 
VALUES 
('Toyota', 'Corolla', 2020, 'cliente1@example.com', 'ABC123'),
('Honda', 'Civic', 2022, 'cliente2@example.com', 'DEF456'),
('Ford', 'Focus', 2019, 'cliente3@example.com', 'GHI789'),
('Chevrolet', 'Cruze', 2021, 'cliente4@example.com', 'JKL012');


-- Tabla de Marcas

CREATE TABLE marcas (
    id_marca INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
);

INSERT INTO marcas (nombre) 
VALUES 
('Toyota'),
('Honda'),
('Ford'),
('Chevrolet');



-- Tabla de Repuestos

CREATE TABLE repuestos (
    id_repuesto INTEGER PRIMARY KEY AUTOINCREMENT,
    id_marca INTEGER NOT NULL,
    precio REAL NOT NULL,
    cantidad INTEGER NOT NULL,-- Puedes almacenar los IDs de vehículos compatibles separados por coma
    foto BLOB,
    descripcion TEXT,
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca)
);

INSERT INTO repuestos (id_marca, precio, cantidad, vehiculos_compatibles, foto, descripcion) 
VALUES 
(1, 150.75, 10, '1,2', NULL, 'Filtro de aire para vehículos Toyota y Honda'),
(2, 200.50, 5, '2,3', NULL, 'Bujías para vehículos Honda y Ford'),
(3, 300.00, 2, '3,4', NULL, 'Amortiguadores para vehículos Ford y Chevrolet'),
(4, 120.00, 8, '1,4', NULL, 'Aceite para vehículos Toyota y Chevrolet');


-- Tabla de Mecanicos

CREATE TABLE mecanicos (
    cedula INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    edad INTEGER NOT NULL,
    foto BLOB
);

INSERT INTO mecanicos (cedula, nombre, edad, foto) 
VALUES 
(101, 'Juan Pérez', 35, NULL),
(102, 'Ana López', 28, NULL),
(103, 'Carlos Ramírez', 40, NULL),
(104, 'Marta Jiménez', 30, NULL),
(105, 'Luis Torres', 45, NULL),
(106, 'Sofía Castillo', 33, NULL),
(107, 'Fernando Gómez', 38, NULL),
(108, 'Gabriela Fernández', 25, NULL),
(109, 'Mario Vargas', 50, NULL),
(110, 'Paola Herrera', 29, NULL);



-- Tabla de Reparaciones

CREATE TABLE reparaciones (
    id_reparacion INTEGER PRIMARY KEY AUTOINCREMENT,
    id_vehiculo INTEGER NOT NULL,
    id_mecanico INTEGER NOT NULL,
    fecha_reparacion TEXT NOT NULL,
    estado TEXT NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(placa),
    FOREIGN KEY (id_mecanico) REFERENCES mecanicos(cedula)
);


-- Tabla que asocia los repuestos con cada reparacion

CREATE TABLE repuestos_reparacion (
    id_reparacion INTEGER NOT NULL,
    id_repuesto INTEGER NOT NULL,
    cantidad_utilizada INTEGER NOT NULL,
    PRIMARY KEY (id_reparacion, id_repuesto),
    FOREIGN KEY (id_reparacion) REFERENCES reparaciones(id_reparacion),
    FOREIGN KEY (id_repuesto) REFERENCES repuestos(id_repuesto)
);



Create table Login(
    usuario TEXT PRIMARY KEY NOT NULL,
    contraseña TEXT NOT NULL
);



