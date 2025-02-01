import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();
const db = new sqlite3.Database("./src/DB/TallerMecanico.db"); // Base de datos SQLite

app.use(cors());
app.use(express.json());

// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo
  },
});

const upload = multer({ storage }); // Base de datos SQLite

app.use(cors());
app.use(express.json());

// Rutas para obtener todos los vehículos
app.get("/api/vehiculos", (req, res) => {
  console.log("algo");
  db.all(
    "SELECT v.placa, m.nombre AS marca, v.modelo, v.id_vehiculo FROM  vehiculos v JOIN marcas m ON v.id_marca = m.id_marca",
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
      console.log(rows);
    }
  );
});

// Agregar un vehículo
app.post("/api/vehiculos", (req, res) => {
  const { marca, modelo, anio, correo_cliente } = req.body;
  db.run(
    "INSERT INTO vehiculos (marca, modelo, anio, correo_cliente) VALUES (?, ?, ?, ?)",
    [marca, modelo, anio, correo_cliente],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id_vehiculo: this.lastID });
    }
  );
});

// Agregar un cliente
app.post("/api/cliente", (req, res) => {
  const { cedula, nombre, apellido1, apellido2, correo, contraseña } = req.body;
  db.run(
    "INSERT INTO clientes (cedula, nombre, apellido1, apellido2, correo, contraseña) VALUES (?, ?, ?, ?, ?, ?)",
    [cedula, nombre, apellido1, apellido2, correo, contraseña],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ cedula: this.lastID });
    }
  );
});

app.get("/api/login/Cliente/:correo", (req, res) => {
  const { correo } = req.params;
  db.get(
    "SELECT cedula, contraseña FROM clientes WHERE correo = ?",
    [correo],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!row) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }
      res.json(row);
    }
  );
});

// Rutas para obtener todos los vehículos
app.get("/api/vehiculos/completa", (req, res) => {
  db.all(
    "SELECT v.id_vehiculo, v.id_marca, v.modelo, v.anio, c.nombre || ' ' || c.apellido1 || ' ' || c.apellido2 AS nombre_completo, v.placa FROM vehiculos v JOIN clientes c ON v.cedula = c.cedula",
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

// Rutas para obtener todos los vehículos del cliente 
app.get("/api/vehiculos/completa/Cliente/:cedula", (req, res) => {
  const { cedula } = req.params;
  db.all(
    "SELECT v.id_vehiculo, m.nombre AS marca, v.modelo, v.anio, c.nombre || ' ' || c.apellido1 || ' ' || c.apellido2 AS nombre_completo, v.placa FROM vehiculos v JOIN clientes c ON v.cedula = c.cedula JOIN marcas m ON v.id_marca = m.id_marca WHERE v.cedula = ?",
    [cedula],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

// Rutas para obtener todas las reparaciones
app.get("/api/reparaciones2/:id", (req, res) => {
  const { id } = req.params;
  db.get(
    'SELECT r.id_reparacion, r.id_vehiculo, m.nombre AS mecanico, r.fecha_reparacion, r.descripcion FROM reparaciones r JOIN mecanicos m ON r.id_mecanico = m.cedula WHERE r.estado = "Finalizado" AND r.id_vehiculo = ?',
    [id],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

//facturas en facturar
app.get("/api/Facturas", (req, res) => {
  db.all(
    `SELECT 
      r.id_reparacion, 
      r.id_vehiculo, 
      v.placa AS placa, 
      (c.nombre || ' ' || c.apellido1) AS cliente, 
      m.nombre AS mecanico, 
      r.fecha_reparacion, 
      r.descripcion 
    FROM reparaciones r 
    JOIN mecanicos m ON r.id_mecanico = m.cedula 
    JOIN vehiculos v ON r.id_vehiculo = v.id_vehiculo 
    JOIN clientes c ON c.cedula = v.cedula 
    WHERE r.estado = 'Facturar'`,
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
app.get("/api/marcas", (req, res) => {
  db.all("SELECT * FROM marcas", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rutas para obtener todos los repuestos
app.get("/api/repuestos", (req, res) => {
  db.all("SELECT * FROM repuestos", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rutas para obtener todos los mecánicos
app.get("/api/mecanicos", (req, res) => {
  db.all("SELECT * FROM mecanicos", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rutas para obtener todas las reparaciones
app.get("/api/reparaciones", (req, res) => {
  db.all("SELECT * FROM reparaciones", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rutas para obtener los repuestos asociados a una reparación
app.get("/api/repuestos_reparacion", (req, res) => {
  db.all("SELECT * FROM repuestos_reparacion", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rutas para obtener los repuestos asociados a una reparación
app.get("/api/repuestos_reparacion/:id", (req, res) => {
  const { id } = req.params;

  db.all(
    "SELECT * FROM repuestos_reparacion WHERE id_reparacion=?",
    [id],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

// Obtener un vehículo por ID
app.get("/api/vehiculos/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM vehiculos WHERE id_vehiculo = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Obtener una marca por ID
app.get("/api/marcas/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM marcas WHERE id_marca = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Obtener un repuesto por ID
app.get("/api/repuestos/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM repuestos WHERE id_repuesto = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Obtener un mecánico por cédula
app.get("/api/mecanicos/:cedula", (req, res) => {
  const { cedula } = req.params;
  db.get("SELECT * FROM mecanicos WHERE cedula = ?", [cedula], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Obtener una reparación por ID
app.get("/api/reparaciones/:id", (req, res) => {
  const { id } = req.params;
  db.get(
    "SELECT * FROM reparaciones WHERE id_reparacion = ?",
    [id],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(row);
    }
  );
});

// Agregar un vehículo
app.post("/api/vehiculos", (req, res) => {
  const { marca, modelo, anio, correo_cliente } = req.body;
  db.run(
    "INSERT INTO vehiculos (marca, modelo, anio, correo_cliente) VALUES (?, ?, ?, ?)",
    [marca, modelo, anio, correo_cliente],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id_vehiculo: this.lastID });
    }
  );
});

// Agregar una marca
app.post("/api/marcas", (req, res) => {
  const { nombre } = req.body;
  db.run("INSERT INTO marcas (nombre) VALUES (?)", [nombre], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id_marca: this.lastID });
  });
});

// Agregar un repuesto
app.post("/api/repuestos", upload.single("foto"), (req, res) => {
  const { selectedMarca, precio, descripcion } = req.body;
  const foto = req.file ? req.file.path : null; // Ruta de la imagen guardada
  console.log("Datos recibidos:", req.body); // Imprime los datos del formulario
  console.log("Archivo recibido:", req.file); // Imprime la información del archivo (si existe)

  // Validar que todos los campos estén presentes
  if (!selectedMarca || !precio || !descripcion || !foto) {
    console.log("Faltan datos"); // Agrega una advertencia si faltan datos
    return res.status(400).json({ error: "Faltan datos" });
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
app.post("/api/mecanicos", upload.single("foto"), (req, res) => {
  const { cedula, nombre, edad } = req.body;
  const foto = req.file ? req.file.path : null; // Ruta de la imagen guardada
  // Validar que todos los campos estén presentes
  if (!cedula || !nombre || !edad || !foto) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios." });
  }

  db.run(
    "INSERT INTO mecanicos (cedula, nombre, edad, foto) VALUES (?, ?, ?, ?)",
    [cedula, nombre, edad, foto],
    function (err) {
      if (err) {
        console.error("Error al agregar mecánico:", err.message); // Log del error
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ cedula: this.lastID });
    }
  );
});

app.post("/api/reparaciones", (req, res) => {
  const { id_vehiculo, id_mecanico, fecha_reparacion, descripcion, estado } =
    req.body;
  // Validar que los campos requeridos no sean nulos
  if (!id_vehiculo || !id_mecanico) {
    return res
      .status(400)
      .json({ error: "Vehículo y mecánico son campos obligatorios." });
  }

  db.run(
    "INSERT INTO reparaciones (id_vehiculo, id_mecanico, fecha_reparacion, descripcion, estado) VALUES (?, ?, ?, ?, ?)",
    [id_vehiculo, id_mecanico, fecha_reparacion, descripcion, estado],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id_reparacion: this.lastID });
    }
  );
});

// Agregar un repuesto a una reparación

app.post("/api/repuestos_reparacion", (req, res) => {
  const { id_reparacion, id_repuesto, cantidad_utilizada } = req.body;

  // Validar que los campos requeridos estén presentes
  if (!id_reparacion || !id_repuesto || !cantidad_utilizada) {
    return res.status(400).json({
      error:
        "Todos los campos son obligatorios: id_reparacion, id_repuesto, cantidad_utilizada",
    });
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
      id: this.lastID, // Retorna el ID generado en caso de ser necesario
    });
  });
});

// Eliminar un mecanico
app.post("/api/mecanico/delete", (req, res) => {
  const { cedula } = req.body;
  db.run("DELETE FROM mecanicos WHERE cedula = ?", [cedula], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Mecánico eliminado exitosamente." });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.run(
    "INSERT INTO Login (usuario, contraseña) VALUES (?, ?)",
    [email, password],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id_reparacion: this.lastID });
    }
  );
});

app.get("/api/login/:usuario", (req, res) => {
  const { usuario } = req.params;
  db.get(
    "SELECT contraseña FROM Login WHERE usuario = ?",
    [usuario],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!row) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }
      res.json({ contraseña: row.contraseña });
    }
  );
});

app.post("/api/reparaciones/delete", (req, res) => {
  const { id } = req.body;
  db.run(
    "DELETE FROM reparaciones WHERE id_reparacion = ?",
    [id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ message: "Reparación no encontrada." });
        return;
      }
      res.status(200).json({ message: "Reparación eliminada exitosamente." });
    }
  );
});

app.post("/api/repuestos_reparacion/delete", (req, res) => {
  const { id } = req.body;
  db.run(
    "DELETE FROM repuestos_reparacion WHERE id_reparacion = ?",
    [id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ message: "Reparación no encontrada." });
        return;
      }
      res
        .status(200)
        .json({ message: "Repuestos de reparacion eliminados exitosamente." });
    }
  );
});

// Obtener todos los diagnósticos
app.get("/api/diagnostico", (req, res) => {
  db.all("SELECT * FROM diagnostico_vehiculo", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Agregar un nuevo diagnóstico
app.post("/api/diagnostico", upload.single("foto"), (req, res) => {
  const {
    id_vehiculo,
    fecha_diagnostico,
    diagnostico_tecnico,
    descripcion_cliente,
  } = req.body;
  const foto = req.file ? req.file.path : null; // Cambié a req.file.path para obtener la ruta completa
  // Validar que todos los campos estén presentes
  if (
    !id_vehiculo ||
    !fecha_diagnostico ||
    !diagnostico_tecnico ||
    !descripcion_cliente ||
    !foto
  ) {
    return res
      .status(400)
      .json({ error: "Por favor, completa todos los campos." });
  }

  // Insertar en la base de datos
  db.run(
    "INSERT INTO diagnostico_vehiculo (id_vehiculo, fecha_diagnostico, diagnostico_tecnico, descripcion_cliente, foto) VALUES (?, ?, ?, ?, ?)",
    [
      id_vehiculo,
      fecha_diagnostico,
      diagnostico_tecnico,
      descripcion_cliente,
      foto,
    ],
    function (err) {
      if (err) {
        console.error("Error al insertar diagnóstico:", err.message); // Log del error
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Obtener reparaciones por estado
app.get("/api/reparaciones/estado/:estado", (req, res) => {
  const { estado } = req.params;
  db.all(
    "SELECT * FROM reparaciones WHERE estado = ?",
    [estado],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json(rows);
    }
  );
});

// Actualizar el estado de una reparación por ID
app.put("/api/reparaciones/id/estado", (req, res) => {
  const { id } = req.body;
  const { estado } = req.body;

  // Verificar que el estado es uno de los permitidos
  const estadosPermitidos = [
    "Pendiente",
    "En espera",
    "Denegado",
    "En curso",
    "Facturar",
    "Finalizado",
  ];
  if (!estadosPermitidos.includes(estado)) {
    return res.status(400).json({ error: "Estado no permitido" });
  }

  db.run(
    "UPDATE reparaciones SET estado = ? WHERE id_reparacion = ?",
    [estado, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: "Reparación no encontrada" });
        return;
      }
      res.status(200).json({ message: "Estado actualizado correctamente" });
    }
  );
});
app.delete("/api/repuestos/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log("ID recibido para eliminar:", id); // Añadir un log para verificar el id
  db.run("DELETE FROM repuestos WHERE id_repuesto = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Repuesto no encontrado." });
    }

    res.status(200).json({ message: "Repuesto eliminado exitosamente." });
  });
});
//edicion de repuestos
app.put("/api/repuestos2/:id", upload.single("foto"), (req, res) => {
  const id_repuesto = req.params.id;
  const { selectedMarca, precio, descripcion } = req.body;
  const foto = req.file ? req.file.path : null; // Solo actualizar si se sube una nueva imagen

  console.log("Datos recibidos:", req.body);
  console.log("Archivo recibido:", req.file);

  // Validar que los campos requeridos estén presentes
  if (!selectedMarca || !precio || !descripcion) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  // Asegurarse de que el precio sea un número
  if (isNaN(precio)) {
    return res
      .status(400)
      .json({ error: "El precio debe ser un número válido" });
  }

  // Construir la consulta SQL dinámicamente
  let updateQuery = `UPDATE repuestos SET id_marca = ?, precio = ?, descripcion = ?`;
  let params = [selectedMarca, precio, descripcion];

  if (foto) {
    updateQuery += `, foto = ?`;
    params.push(foto);
  }

  updateQuery += ` WHERE id_repuesto = ?`;
  params.push(id_repuesto);

  // Ejecutar la consulta
  db.run(updateQuery, params, function (err) {
    if (err) {
      console.error("Error al actualizar el repuesto:", err);
      return res
        .status(500)
        .json({ error: "Error en la base de datos: " + err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "No se encontró el repuesto" });
    }

    res.json({ message: "Repuesto actualizado correctamente" });
  });
});
app.listen(3001, () => {
  console.log("Backend corriendo en http://localhost:3001");
});
