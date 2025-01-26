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

// Rutas para obtener todas las reparaciones 
app.get('/api/reparaciones2/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT r.id_reparacion, r.id_vehiculo, m.nombre AS mecanico, r.fecha_reparacion, r.descripcion FROM reparaciones r JOIN mecanicos m ON r.id_mecanico = m.cedula WHERE r.estado = "Finalizado" AND r.id_vehiculo = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rutas para obtener todas las reparaciones 
app.get('/api/RepuestosR/:id', (req, res) => {
    const { id } = req.params;
    db.all('SELECT repuestos.descripcion AS descripcion, repuestos_reparacion.cantidad_utilizada FROM repuestos_reparacion JOIN repuestos ON repuestos_reparacion.id_repuesto = repuestos.id_repuesto WHERE repuestos_reparacion.id_reparacion = ?', [id], (err, rows) => {
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

// Rutas para obtener los repuestos asociados a una reparación
app.get('/api/repuestos_reparacion/:id', (req, res) => {
    const { id } = req.params;

    db.all('SELECT * FROM repuestos_reparacion WHERE id_reparacion=?', [id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
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

app.post('/api/reparaciones', (req, res) => {
    const { id_vehiculo, id_mecanico, fecha_reparacion, descripcion, estado } = req.body;
    // Validar que los campos requeridos no sean nulos
    if (!id_vehiculo.le || !id_mecanico) {
        return res.status(400).json({ error: "Vehículo y mecánico son campos obligatorios." });
    }

    db.run('INSERT INTO reparaciones (id_vehiculo, id_mecanico, fecha_reparacion, descripcion, estado) VALUES (?, ?, ?, ?, ?)', 
    [id_vehiculo, id_mecanico, fecha_reparacion, descripcion, estado], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id_reparacion: this.lastID });
    });
});

// Agregar un repuesto a una reparación

app.post('/api/repuestos_reparacion', (req, res) => {
    const { id_reparacion, id_repuesto, cantidad_utilizada } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!id_reparacion || !id_repuesto || !cantidad_utilizada) {
        return res.status(400).json({ error: "Todos los campos son obligatorios: id_reparacion, id_repuesto, cantidad_utilizada" });
    }

    const sql = `
        INSERT INTO repuestos_reparacion (id_reparacion, id_repuesto, cantidad_utilizada)
        VALUES (?, ?, ?)
    `;

    const params = [id_reparacion, id_repuesto, cantidad_utilizada];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: "Repuesto asignado a la reparación con éxito",
            id: this.lastID // Retorna el ID generado en caso de ser necesario
        });
    });
});




// Eliminar un mecanico
app.post('/api/mecanico/delete', (req, res) => {
    const { cedula } = req.body;
    db.run('DELETE FROM mecanicos WHERE cedula = ?', [cedula], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Mecánico eliminado exitosamente.' });
    });
});


app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.run('INSERT INTO Login (usuario, contraseña) VALUES (?, ?)', 
    [email, password], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id_reparacion: this.lastID });
    });
});


app.get('/api/login/:usuario', (req, res) => {
    const { usuario } = req.params;
    db.get('SELECT contraseña FROM Login WHERE usuario = ?', [usuario], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json({ contraseña: row.contraseña });
    });
});



app.get('/api/login/:usuario', (req, res) => {
    const { usuario } = req.params;
    db.get('SELECT contraseña FROM Login WHERE usuario = ?', [usuario], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json({ contraseña: row.contraseña });
    });
});


app.post('/api/reparaciones/delete', (req, res) => {
    const { id } = req.body;
    db.run('DELETE FROM reparaciones WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: 'Reparación no encontrada.' });
            return;
        }
        res.status(200).json({ message: 'Reparación eliminada exitosamente.' });
    });
});


app.listen(3001, () => {
    console.log('Backend corriendo en http://localhost:3001');
});



