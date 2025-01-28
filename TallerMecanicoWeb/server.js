import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const db = new sqlite3.Database('./src/DB/TallerMecanico.db'); // Base de datos SQLite

app.use(cors());
app.use(express.json());

// Rutas para obtener todos los vehículos
app.get('/api/vehiculos', (req, res) => {
    db.all('SELECT v.placa, v.correo_cliente, m.nombre AS marca, v.modelo, v.id_vehiculo FROM  vehiculos v JOIN marcas m ON v.id_marca = m.id_marca', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


// Rutas para obtener todos los vehículos
app.get('/api/vehiculos/completa', (req, res) => {
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


//facturas en facturar
app.get("/api/Facturas", (req, res) => {
    db.all(
      "SELECT r.id_reparacion, r.id_vehiculo, v.placa as placa, v.correo_cliente as cliente, m.nombre AS mecanico, r.fecha_reparacion, r.descripcion " +
        "FROM reparaciones r " +
        "JOIN mecanicos m ON r.id_mecanico = m.cedula " +
        "JOIN vehiculos v ON r.id_vehiculo = v.id_vehiculo " +
        "WHERE r.estado = 'Facturar'",
      (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows); // Retorna todas las filas obtenidas
      }
    );
  });
  //repuestos
  app.get("/api/RepuestosR/:id", (req, res) => {
    const { id } = req.params;
    console.log("ID recibido en el servidor:", id);
  
    db.all(
      "SELECT repuestos.descripcion AS descripcion, repuestos_reparacion.cantidad_utilizada, repuestos.precio, repuestos_reparacion.id_reparacion, (repuestos.precio * repuestos_reparacion.cantidad_utilizada) AS total " +
        "FROM repuestos_reparacion " +
        "JOIN repuestos ON repuestos_reparacion.id_repuesto = repuestos.id_repuesto " +
        "WHERE repuestos_reparacion.id_reparacion = ?",
      [id],
      (err, rows) => {
        if (err) {
          console.error("Error en la consulta SQL:", err.message);
          res.status(500).json({ error: err.message });
          return;
        }
        console.log("Datos obtenidos:", rows);
        res.json(rows);
      }
    );
  });
  
  app.post("/api/reparacionesU", (req, res) => {
    const { id_reparacion, estado } = req.body;
  
    // Validar que los campos requeridos no sean nulos
    if (!id_reparacion || !estado) {
      return res
        .status(400)
        .json({ error: "ID de reparación y estado son campos obligatorios." });
    }
  
    // Actualizar el estado de la reparación especificada por id_reparacion
    db.run(
      "UPDATE reparaciones SET estado = ? WHERE id_reparacion = ?",
      [estado, id_reparacion],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        // Verificar si se modificó alguna fila
        if (this.changes === 0) {
          return res.status(404).json({ error: "Reparación no encontrada." });
        }
        res
          .status(200)
          .json({ message: "Estado de reparación actualizado correctamente." });
      }
    );
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
app.post("/api/repuestos", (req, res) => {
   
    const { selectedMarca, precio, foto, descripcion } = req.body;
  
   
  
   
    if (!selectedMarca || !precio || !foto || !descripcion) {
      console.log("Faltan datos"); // Agrega una advertencia si faltan datos
      return res.status(400).json({ error: "Faltan datos PUTASAAA3" });
    }
  
    // Asegúrate de que el precio es un número válido
    if (isNaN(precio)) {
      return res.status(400).json({ error: "Precio debe ser un número válido" });
    }
  
    const insertQuery = `
        INSERT INTO repuestos (id_marca, precio, foto, descripcion)
        VALUES (?, ?, ?, ?)`;
  
    db.run(
      insertQuery,
      [selectedMarca, precio, foto, descripcion],
      function (err) {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Error en la base de datos: " + err.message });
        }
        res.status(201).json({ id_repuesto: this.lastID });
      }
    );
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
    if (!id_vehiculo || !id_mecanico) {
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
    db.run('DELETE FROM reparaciones WHERE id_reparacion = ?', [id], function (err) {
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

app.post('/api/repuestos_reparacion/delete', (req, res) => {
    const { id } = req.body;
    db.run('DELETE FROM repuestos_reparacion WHERE id_reparacion = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: 'Reparación no encontrada.' });
            return;
        }
        res.status(200).json({ message: 'Repuestos de reparacion eliminados exitosamente.' });
    });
});

// Obtener todos los diagnósticos
app.get('/api/diagnostico', (req, res) => {
    db.all('SELECT * FROM diagnostico_vehiculo', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(rows);
    });
});

// Agregar un nuevo diagnóstico
app.post('/api/diagnostico', (req, res) => {
    const { id_vehiculo, fecha_diagnostico, diagnostico_tecnico, descripcion_cliente, foto } = req.body;
    db.run('INSERT INTO diagnostico_vehiculo ( id_vehiculo, fecha_diagnostico, diagnostico_tecnico, descripcion_cliente, foto ) VALUES (?, ?, ?,?,?)', [id_vehiculo, fecha_diagnostico, diagnostico_tecnico, descripcion_cliente, foto], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Obtener reparaciones por estado
app.get('/api/reparaciones/estado/:estado', (req, res) => {
    const { estado } = req.params;
    db.all('SELECT * FROM reparaciones WHERE estado = ?', [estado], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(rows);
    });
});

// Actualizar el estado de una reparación por ID
app.put('/api/reparaciones/id/estado', (req, res) => {
    const { id } = req.body;
    const { estado } = req.body;

    // Verificar que el estado es uno de los permitidos
    const estadosPermitidos = ['Pendiente', 'En espera', 'Denegado', 'En curso', 'Facturar', 'Finalizado'];
    if (!estadosPermitidos.includes(estado)) {
        return res.status(400).json({ error: 'Estado no permitido' });
    }

    db.run('UPDATE reparaciones SET estado = ? WHERE id_reparacion = ?', [estado, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Reparación no encontrada' });
            return;
        }
        res.status(200).json({ message: 'Estado actualizado correctamente' });
    });
});

app.listen(3001, () => {
    console.log('Backend corriendo en http://localhost:3001');
});



