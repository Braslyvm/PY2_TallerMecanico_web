import React, { useState } from 'react';
import 'firebase/compat/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

export default function Login() {
  const [email, setEmailLocal] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const AlertAviso = (text1) => {
      Swal.fire({
        text: text1,  
        imageUrl: 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-alert-512.png', 
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'aviso',
        confirmButtonText: 'Aceptar'
      });
    };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      AlertAviso("Por favor, completa todos los campos.");
      return;
    }
    const usuario = email;
    const passwordString = String(password);
    axios
      .get(`http://localhost:3001/api/login/${usuario}`)
      .then((response) => {
        const data = response.data; 
        if (!data || data.length === 0) {
          AlertAviso("Usuario no encontrado.");
          return;
        }
        const storedPassword = data.contraseña; 
        if (storedPassword !== passwordString) {
          AlertAviso("Contraseña incorrecta.");
          return;
        }
        navigate('/'); 
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        AlertAviso("Error al iniciar sesión. Verifica tus credenciales.");
      });
  };
  
  

  

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw', 
      backgroundColor: '#ffffff', 
      padding: '0 20px',
    }}>
      <CssBaseline />
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {"Iniciar Sesión"}
      </Typography>
      {error && <Typography color="error" variant="body2" sx={{ mt: 2 }}>{error}</Typography>} 
      <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1, width: '100%', maxWidth: '400px' }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label={"Correo Electrónico"}
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmailLocal(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label={"Contraseña"}
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          {"Iniciar Sesión"}
        </Button>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Link href="/Registro" variant="body2">
              {"¿No tienes una cuenta? Regístrate"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}