

-- Tabla de Vehículos

CREATE TABLE vehiculos (
    id_vehiculo INTEGER PRIMARY KEY AUTOINCREMENT,
    id_marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    anio INTEGER NOT NULL,
    correo_cliente TEXT NOT NULL,
    placa TEXT,
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca)
);

INSERT INTO vehiculos (id_marca, modelo, anio, correo_cliente, placa) 
VALUES 
(1, 'Corolla', 2020, 'cliente1@example.com', 'ABC123'),
(2, 'Civic', 2022, 'cliente2@example.com', 'DEF456'),
(3, 'Focus', 2019, 'cliente3@example.com', 'GHI789'),
(4, 'Cruze', 2021, 'cliente4@example.com', 'JKL012');


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
    foto BLOB,
    descripcion TEXT,
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca)
);


INSERT INTO repuestos (id_marca, precio, foto, descripcion) 
VALUES 
(1, 150.75, NULL, 'Filtro de aire'),
(2, 200.50, NULL, 'Bujías'),
(3, 300.00, NULL, 'Amortiguadores'),
(4, 120.00, NULL, 'Aceite de motor'),
(1, 50.25, NULL, 'Filtro de aceite'),
(2, 80.00, NULL, 'Pastillas de freno'),
(3, 400.00, NULL, 'Llantas'),
(4, 150.00,  NULL, 'Batería'),
(1, 100.00,  NULL, 'Lámparas'),
(2, 75.00,  NULL, 'Limpiaparabrisas');




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
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo),
    FOREIGN KEY (id_mecanico) REFERENCES mecanicos(cedula),
    CHECK (estado IN ('Pendiente', 'En espera', 'Denegado', 'En curso', 'Facturar', 'Finalizado'))
);

-- Tabla que asocia los repuestos con cada reparacion

CREATE TABLE repuestos_reparacion (
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



INSERT INTO reparaciones (id_vehiculo, id_mecanico, fecha_reparacion, estado, descripcion) 
VALUES 
(1, 101, '2025-01-25', 'Finalizado', 'Cambio de filtro de aire y aceite');

INSERT INTO repuestos_reparacion (id_reparacion, id_repuesto, cantidad_utilizada) 
VALUES 
(2, 1, 1), 
(2, 4, 1); 

CREATE TABLE diagnostico_vehiculo(
    id_diagnostico INTEGER PRIMARY KEY AUTOINCREMENT,
    id_vehiculo INTEGER NOT NULL,
    fecha_diagnostico TEXT NOT NULL,
    diagnostico_tecnico TEXT NOT NULL,
    descripcion_cliente TEXT NOT NULL,
    foto BLOB,
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo)
);




SELECT * FROM vehiculos