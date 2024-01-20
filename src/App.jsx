// console.log(import.meta.env.VITE_API_KEY);

import { useState } from "react";
import { TextField, Alert, Typography, Container } from "@mui/material";
import Button from "@mui/material/Button";

export const App = () => {
    const [ciudad, setCiudad] = useState("");
    const [datos, setDatos] = useState({});
    const [estado, setEstado] = useState(false);

    const [msg, setMsg] = useState({
        mensaje: "",
        estadoMsg: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (ciudad.trim() === "") {
            setMsg({
                mensaje: "Campo no puede quedar vacio",
                estadoMsg: true,
            });

            setTimeout(() => {
                setMsg({
                    mensaje: "",
                    estadoMsg: false,
                });
            }, 3000);
            return;
        }
        llamarApi();
    };
    
    const llamarApi = async () => {
      try {
        const resp = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${
            import.meta.env.VITE_API_KEY
          }&q=${ciudad}&lang=es`
        );
        const data = await resp.json();
        const datosApi = {
          pais: data.location.country,
          ciudad: data.location.name,
          temperatura: data.current.temp_c,
          icono: data.current.condition.icon,
          texto: data.current.condition.text,
        };
        setDatos(datosApi);
        setEstado(true);
      } catch (error) {
        setMsg({
          mensaje: "Ciudad NO encontrada",
          estadoMsg: true,
        });
        setTimeout(() => {
          setMsg({
            mensaje: "",
            estadoMsg: false,
          });
        }, 3000);
      }
    };

    return (
        <Container maxWidth="sm" className="app1">
            <Typography className="center" variant="h2" gutterBottom>
                Clima App
            </Typography>
            {msg.estadoMsg === true ? (
                <Alert variant="outlined" severity="error">
                    {msg.mensaje}
                </Alert>
            ) : (
                <div></div>
            )}
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Ciudad"
                    autoFocus
                    onChange={(e) => setCiudad(e.target.value)}
                />
                <Button variant="contained" disableElevation fullWidth onClick={handleSubmit}>
                    Buscar
                </Button>
            </form>
            {estado === false ? (
                <div></div>
            ) : (
                <div className="card">
                    <div className="card-header">
                        <h2>
                            {datos.ciudad}, {datos.pais}
                        </h2>
                    </div>
                    <div className="card-body">
                        <img src={datos.icono} alt="" />
                    </div>
                    <div className="card-footer center">
                        <strong>{datos.temperatura}°C</strong>
                        <br />
                        <strong>{datos.texto}</strong>
                    </div>
                </div>
            )}
        </Container>
    );
};
