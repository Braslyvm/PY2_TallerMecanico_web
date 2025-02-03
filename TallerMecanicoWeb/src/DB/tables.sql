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
(110, 'Paola Herrera',29,NULL);


INSERT INTO vehiculos (id_marca, modelo, anio, cedula, placa, foto) 
VALUES 
(1, 'Corolla', 2018, 100000001, 'ABC123', NULL),
(2, 'Civic', 2020, 100000002, 'DEF456', NULL),
(3, 'F-150', 2019, 100000003, 'GHI789', NULL),
(4, 'Cruze', 2021, 100000004, 'JKL012', NULL),
(1, 'RAV4', 2017, 100000005, 'MNO345', NULL),
(2, 'Accord', 2016, 100000006, 'PQR678', NULL),
(3, 'Mustang', 2022, 100000007, 'STU901', NULL),
(4, 'Malibu', 2015, 100000008, 'VWX234', NULL),
(1, 'Camry', 2020, 100000009, 'YZA567', NULL),
(2, 'CR-V', 2018, 100000010, 'BCD890', NULL),
(3, 'Explorer', 2019, 100000011, 'EFG123', NULL),
(4, 'Equinox', 2021, 100000012, 'HIJ456', NULL),
(1, 'Highlander', 2017, 100000013, 'KLM789', NULL),
(2, 'Pilot', 2016, 100000014, 'NOP012', NULL),
(3, 'Escape', 2022, 100000015, 'QRS345', NULL),
(4, 'Traverse', 2015, 100000016, 'TUV678', NULL),
(1, 'Tacoma', 2020, 100000017, 'WXY901', NULL);

INSERT INTO diagnostico_vehiculo (id_vehiculo, fecha_diagnostico, diagnostico_tecnico, descripcion_cliente, foto) 
VALUES 
(1, '2023-10-01', 'Falla en el sistema de frenos', 'El vehículo hace ruidos al frenar', NULL),
(2, '2023-10-02', 'Problema en la transmisión', 'El vehículo no cambia de marcha correctamente', NULL),
(3, '2023-10-03', 'Fuga de aceite', 'Se observan manchas de aceite en el suelo', NULL),
(4, '2023-10-04', 'Problema eléctrico', 'Las luces no encienden correctamente', NULL),
(5, '2023-10-05', 'Desgaste de neumáticos', 'Los neumáticos están muy gastados', NULL),
(6, '2023-10-06', 'Falla en el motor', 'El motor no enciende', NULL),
(7, '2023-10-07', 'Problema en el sistema de refrigeración', 'El vehículo se sobrecalienta', NULL),
(8, '2023-10-08', 'Falla en el alternador', 'La batería no se carga', NULL),
(9, '2023-10-09', 'Problema en la suspensión', 'El vehículo tiene ruidos en la suspensión', NULL),
(10, '2023-10-10', 'Falla en el sistema de escape', 'El vehículo hace ruidos fuertes', NULL),
(11, '2023-10-11', 'Problema en la dirección', 'La dirección está dura', NULL),
(12, '2023-10-12', 'Falla en el aire acondicionado', 'El aire acondicionado no enfría', NULL),
(13, '2023-10-13', 'Problema en el sistema de inyección', 'El vehículo tiene fallos de encendido', NULL),
(14, '2023-10-14', 'Falla en el sistema de frenos ABS', 'El ABS no funciona', NULL),
(15, '2023-10-15', 'Problema en el sistema de escape', 'El vehículo tiene humo negro', NULL),
(16, '2023-10-16', 'Falla en el sistema de transmisión', 'El vehículo no avanza', NULL),
(17, '2023-10-17', 'Problema en el sistema eléctrico', 'Las ventanas no funcionan', NULL);

INSERT INTO reparaciones (id_diagnostico, id_vehiculo, id_mecanico, fecha_reparacion, estado, descripcion) 
VALUES 
(1, 1, 101, '2023-10-05', 'Finalizado', 'Se reemplazaron las pastillas de freno'),
(2, 2, 102, '2023-10-06', 'En curso', 'Se está revisando la transmisión'),
(3, 3, 103, '2023-10-07', 'Pendiente', 'Se necesita reemplazar el sello de aceite'),
(4, 4, 104, '2023-10-08', 'Facturar', 'Se reparó el sistema eléctrico'),
(5, 5, 105, '2023-10-09', 'Finalizado', 'Se reemplazaron los neumáticos'),
(6, 6, 106, '2023-10-10', 'En espera', 'Se necesita diagnóstico adicional'),
(7, 7, 107, '2023-10-11', 'En curso', 'Se está revisando el sistema de refrigeración'),
(8, 8, 108, '2023-10-12', 'Finalizado', 'Se reemplazó el alternador'),
(9, 9, 109, '2023-10-13', 'Pendiente', 'Se necesita reemplazar los amortiguadores'),
(10, 10, 110, '2023-10-14', 'Finalizado', 'Se reparó el sistema de escape'),
(11, 11, 101, '2023-10-15', 'En curso', 'Se está revisando la dirección'),
(12, 12, 102, '2023-10-16', 'Facturar', 'Se reparó el aire acondicionado'),
(13, 13, 103, '2023-10-17', 'Finalizado', 'Se limpiaron los inyectores'),
(14, 14, 104, '2023-10-18', 'En espera', 'Se necesita reemplazar el sensor ABS'),
(15, 15, 105, '2023-10-19', 'Finalizado', 'Se reparó el sistema de escape'),
(16, 16, 106, '2023-10-20', 'Pendiente', 'Se necesita revisar la transmisión'),
(17, 17, 107, '2023-10-21', 'En curso', 'Se está revisando el sistema eléctrico');

INSERT INTO repuestos_reparacion (id_reparacion, id_repuesto, cantidad_utilizada) 
VALUES 
(1, 6, 2),  -- Pastillas de freno para la reparación 1
(2, 12, 1), -- Frenos de disco para la reparación 2
(3, 4, 1),  -- Aceite de motor para la reparación 3
(4, 9, 2),  -- Lámparas para la reparación 4
(5, 7, 4),  -- Llantas para la reparación 5
(8, 8, 1),  -- Batería para la reparación 8
(10, 10, 2), -- Limpiaparabrisas para la reparación 10
(12, 13, 1), -- Radiador para la reparación 12
(13, 5, 1),  -- Filtro de aceite para la reparación 13
(15, 14, 2); -- Amortiguadores delanteros para la reparación 15

INSERT INTO Login (usuario, contraseña) 
VALUES 
('admin', 'admin123'),
('mecanico1', 'mec123'),
('mecanico2', 'mec456'),
('cliente1', 'cliente123'),
('cliente2', 'cliente456');