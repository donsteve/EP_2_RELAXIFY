import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/Validations";
import firebase from "../../../utils/Firebase";
import "firebase/auth";



import "./LoginForm.scss";


export default function LoginForm(props) {
  const { setSelectedForm } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };





  const onSubmit = () => {
    
    console.log("formData");
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!validateEmail(formData.email)){
      errors.email = true;
      formOk = false;
    }
    if(formData.password.length < 6){
      errors.password = true;
      formOk = false;
    }
    setFormError(errors);

    if(formOk){
      setIsLoading(true);
      firebase
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(response => {
        setUser(response.user);
        setUserActive(response.user.emailVerified);
        if(!response.user.emailVerified) {
          toast.warning("Para poder ingresar, debes verificar tu cuenta antes");
        }
      })
      .catch(err => {
        handlerErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
      })
    }
  };




  return (
    <div className="login-form">
        <h1>Ahora si te podras relajar</h1>

        <Form onSubmit={onSubmit} onChange={onChange}>
          <Form.Field>
            <Input
              type="text"
              className="email"
              placeholder= "Correo electronico"
              icon="mail outline"
              error={formError.email}
            />
            {formError.email && (
              <span className="error-text">
                Ingresa un Email Valido
              </span>
            )}
          </Form.Field>
          <Form.Field>
            <Input
              type={showPassword ? "text" : "password"}
              className="password"
              placeholder= "Contraseña"
              error={formError.password}
              icon={
                showPassword ? (
                  <Icon 
                  name="eye slash outline" link onClick={handlerShowPassword}/>
                ) : (
                  <Icon 
                  name="eye" link onClick={handlerShowPassword}/>
                )
              }  
            />
            {formError.password && (
              <span className="error-text">
                Ingresa una contraseña valida
              </span>
            )}
          </Form.Field>
          <Button type="submit" loading={isLoading}>
            Iniciar Sesion
          </Button>
        </Form>

        {! userActive && (
          <ButtonResetSendEmailVerification
          user={user}
          setIsLoading={setIsLoading}
          setUserActive={setUserActive}
          />
        )}

        <div className="login-form__options"> 
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>¿No tienes cuenta?
          <span onClick={() => setSelectedForm("register")}>Registrarse</span>
        </p>

        </div>
        
    </div>
  );
}


function ButtonResetSendEmailVerification(props) {
  const {user, setIsLoading, setUserActive} = props;

  const resendVerficationEmail = () => {
    user
    .sendEmailVerification()
    .then(() => {
      toast.success("Se ha actualizado el mail de verificacion")
    })
    .catch(err => {
      handlerErrors(err.code);
    })
    .finally(() =>{
      setIsLoading(false);
      setUserActive(true);
    })
  }

  return (
    <div className="resend-verification-email">
      <p>
        Si no recibiste el mail de verificacion, puedes volver a enviarlo
        haciendo click <span onClick ={resendVerficationEmail}>aqui.</span>
      </p>
    </div>
  );
}


function handlerErrors(code) {
  switch (code) {
    case "auth/wrong-password":
      toast.warning("El usuario o la contraseña son incorrectos");
      break;
    case "auth/too-many-requests":
      toast.warning("Has enviado muchas solicitudes, intentalo mas tarde");
        break;
    case "auth/user-not-found": 
      toast.warning("El usuario o la contraseña son incorrectos");  
        break; 
      default:
        break;
  }
}


function defaultValueForm() {
  return{
    email: "",
    password: ""
  };
}