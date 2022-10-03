import React, { useState } from "react";
import {Button, Icon, Form, Input} from "semantic-ui-react";
import firebase from "../../../utils/Firebase";
import "firebase/auth";

import "./RegisterForm.scss";


export default function RegisterForm(props) {
  const { setSelectedForm } = props;
  const [formData, setFormData] = useState(defaultValueForm());
  const [showPassword, setShowPassword] = useState(false);

  const handlerShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const onChange = e => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value
    });
  };
 

  const onSubmit = () =>{
    console.log("Formulario enviado");
    console.log(formData);
  };

  return (
    <div className="register-form">
      <h1>Comienza a relajarte con Relaxify</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
          type="text"
          name="email"
          placeholder="correo electronico"
          icon="mail outline"
          //onChange{}
          //error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Contraseña"
          icon={
            showPassword ? (
              <Icon name="eye slash outline" link onClick={handlerShowPassword}/>
            ) : (
              <Icon name="eye" link onClick={handlerShowPassword}/>
            )
          }
          //onChange{}
          //error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
          type="text"
          name="username"
          placeholder="Cual es tu nombre"
          icon="circle outline"
          //onChange{}
          //error={}
          />
        </Form.Field>
        <Button type="submit">Continuar</Button>
      </Form>  
        <div className="register-form_options">
          <p onClick={() => setSelectedForm(null)}>Volver</p>
          <p>
            ¿Ya estas Registrado? <span onClick={() => setSelectedForm("login")}>Iniciar Sesion</span>
            
          </p>

        </div>


    </div>
  );
}

function defaultValueForm() {
  return {
    email: "",
    password: "",
    username: ""
  };
}