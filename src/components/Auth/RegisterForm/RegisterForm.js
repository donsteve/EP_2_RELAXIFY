import React, { useState } from "react";
import {Button, Icon, Form, Input} from "semantic-ui-react";
import { toast } from "react-toastify"
import {validateEmail} from "../../../utils/Validations";
import firebase from "../../../utils/Firebase";
import "firebase/auth";

import "./RegisterForm.scss";
//import { ErrorResponse } from "@remix-run/router";
//import { Toast } from "react-toastify/dist/components";


export default function RegisterForm(props) {
  const { setSelectedForm } = props;
  const [formData, setFormData] = useState(defaultValueForm());
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    toast.success("Registrado correctamente.");

    setFormError({});
    let errors = {};
    let formOk = true;

    if(!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if(formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }
    if(!formData.username) {
      errors.username = true;
      formOk = false;
    }
    setFormError(errors)

    if(formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          changeUserName();
          sendVerificationEmail();
      })
      .catch(() => {
        toast.error("Error al registrar"); 
      })
      .finally(() => {
        setIsLoading(false);
        setSelectedForm(null);
      });
    }
  };


const changeUserName = () => {
  firebase
    .auth()
    .currentUser.updateProfile({
      displayName: formData.username
    })
    .catch(() => {
      toast.error("Error al asignar el nombre de usuario.");
  });
};


const sendVerificationEmail = () => {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() =>{
      toast.success("Se ha enviado el mail de verificacion");
  })
  .catch(() => {
    toast.error("Error al enviar el mail de verificacion");
  });
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
          error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Introduce un correo electronico valido.
            </span>
          )} 
        </Form.Field>
        <Form.Field>
          <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Contraseña"
          error={formError.password}
          icon={
            showPassword ? (
              <Icon name="eye slash outline" link onClick={handlerShowPassword}/>
            ) : (
              <Icon name="eye" link onClick={handlerShowPassword}/>
            )
          }
          />
          {formError.password && (
            <span className="error-text">
              Introduce una contraseña de mas de 5 caracteres.
            </span>
          )} 

        </Form.Field>
        <Form.Field>
          <Input
          type="text"
          name="username"
          placeholder="Cual es tu nombre"
          icon="circle outline"
          error={formError.username}
          />
          {formError.username && (
            <span className="error-text">
              Debes introducir un nombre.
            </span>
          )} 
        </Form.Field>
        <Button type="submit" loading={isLoading} >Continuar</Button>
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