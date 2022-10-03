import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
//import { toast } from "react-toastify";
//import { validateEmail } from "../../../utils/Firebase";
import firebase from "../../../utils/Firebase";
import "firebase/auth";



import "./LoginForm.scss";

export default function LoginForm(props) {
  const { setSelectedForm } = props;

  const onSubmit = () => {
    console.log("Login...");
  };

  return (
    <div className="login-form">
        <h1>Ahora si te podras relajar</h1>

        <Form onSubmit={onSubmit}>
          <Form.Field>
            <Input
              type="text"
              className="email"
              placeholder= "Correo electronico"
              icon="mail outline"
              // error={}
            />
          </Form.Field>
          <Form.Field>
            <Input
              type="password"
              className="password"
              placeholder= "Contraseña"
              icon="eye"
              // error={}
            />
          </Form.Field>
          <Button type="submit">Iniciar Sesion</Button>
        </Form>

        <div className="login-form__options"> 
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>¿No tienes cuenta?
          <span onClick={() => setSelectedForm("register")}>Registrarse</span>
        </p>

        </div>
        
    </div>
  );
}
