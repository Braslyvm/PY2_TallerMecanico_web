import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const db = new sqlite3.Database('./src/DB/TallerMecanico.db'); // Base de datos SQLite

app.use(cors());
app.use(express.json());

// Rutas para obtener todos los vehículos
app.get('/api/vehiculos', (req, res) => {
    db.all('SELECT * FROM vehiculos', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rutas para obtener todas las marcas
app.get('/api/marcas', (req, res) => {
    db.all('SELECT * FROM marcas', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rutas para obtener todos los repuestos
app.get('/api/repuestos', (req, res) => {
    db.all('SELECT * FROM repuestos', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rutas para obtener todos los mecánicos
app.get('/api/mecanicos', (req, res) => {
    db.all('SELECT * FROM mecanicos', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rutas para obtener todas las reparaciones
app.get('/api/reparaciones', (req, res) => {
    db.all('SELECT * FROM reparaciones', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rutas para obtener los repuestos asociados a una reparación
app.get('/api/repuestos_reparacion', (req, res) => {
    db.all('SELECT * FROM repuestos_reparacion', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Backend corriendo en http://localhost:3000');
});

// Obtener un vehículo por ID
app.get('/api/vehiculos/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM vehiculos WHERE id_vehiculo = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

// Obtener una marca por ID
app.get('/api/marcas/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM marcas WHERE id_marca = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

// Obtener un repuesto por ID
app.get('/api/repuestos/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM repuestos WHERE id_repuesto = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

// Obtener un mecánico por cédula
app.get('/api/mecanicos/:cedula', (req, res) => {
    const { cedula } = req.params;
    db.get('SELECT * FROM mecanicos WHERE cedula = ?', [cedula], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

// Obtener una reparación por ID
app.get('/api/reparaciones/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM reparaciones WHERE id_reparacion = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

// Agregar un vehículo
app.post('/api/vehiculos', (req, res) => {
    const { marca, modelo, anio, correo_cliente } = req.body;
    db.run('INSERT INTO vehiculos (marca, modelo, anio, correo_cliente) VALUES (?, ?, ?, ?)', [marca, modelo, anio, correo_cliente], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id_vehiculo: this.lastID });
    });
});

// Agregar una marca
app.post('/api/marcas', (req, res) => {
    const { nombre } = req.body;
    db.run('INSERT INTO marcas (nombre) VALUES (?)', [nombre], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id_marca: this.lastID });
    });
});

// Agregar un repuesto
app.post('/api/repuestos', (req, res) => {
    const { id_marca, precio, cantidad, vehiculos_compatibles, foto, descripcion } = req.body;
    db.run('INSERT INTO repuestos (id_marca, precio, cantidad, vehiculos_compatibles, foto, descripcion) VALUES (?, ?, ?, ?, ?, ?)', 
    [id_marca, precio, cantidad, vehiculos_compatibles, foto, descripcion], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id_repuesto: this.lastID });
    });
});

// Agregar un mecánico
app.post('/api/mecanicos', (req, res) => {
    const { cedula, nombre, edad, foto } = req.body;
    db.run('INSERT INTO mecanicos (cedula, nombre, edad, foto) VALUES (?, ?, ?, ?)', 
    [cedula, nombre, edad, foto], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ cedula: this.lastID });
    });
});

// Agregar una reparación
app.post('/api/reparaciones', (req, res) => {
    const { id_vehiculo, id_mecanico, fecha_reparacion, descripcion } = req.body;
    db.run('INSERT INTO reparaciones (id_vehiculo, id_mecanico, fecha_reparacion, descripcion) VALUES (?, ?, ?, ?)', 
    [id_vehiculo, id_mecanico, fecha_reparacion, descripcion], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id_reparacion: this.lastID });
    });
});

app.listen(3000, () => {
    console.log('Backend corriendo en http://localhost:3000');
});
