import {React,useState} from "react";
import Modal from 'react-bootstrap/Modal'
import './login.css'
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button'

const Login = (login) => {

const [usuario,setUsuario] = useState ('')
const [password,setPassword] = useState('')

const history = useNavigate();


const[modalLogin,setModalLogin] =useState(false)

  const showLogin = () => setModalLogin(true)

  const closeLogin= () => setModalLogin(false)



function comprobar() {
    if(usuario=="Admin" && password=="asdq23" 
                        || 
       usuario=="Nhyix" && password == "7620859gasai12") {
        
        history("/Alta del Cliente")

    }

    else {
        showLogin()
    }
}


return(


<div className="bodyLogin">

    <div className="inicioS">
      
      <h1 id="InS">
         <i id="inIcon" class="bi bi-box-arrow-in-right">
           </i>
           Inicio de Sesion
           </h1>
    </div>

    <div className="containerLogin">

    <p id="LogHeader"> LOG IN</p>

    <input type="text" placeholder="Usuario" value={usuario} onChange={v=>setUsuario(v.target.value)} />
    <input type="password" placeholder="Contraseña" value={password} onChange={v=>setPassword(v.target.value)}></input>


    <br/>
    <br/>


    <input type={"button"} value="Ingresar" onClick={comprobar} id="ingresar"></input>
    {/* <input type="text" id="inp1" class="form-control" value={rfc} onChange={v=>setRfc(v.target.value)} minLength="13" maxLength="13" placeholder="R.F.C del Operador" /> */}



    </div>



    <Modal className="modal-login" 
      show={modalLogin}  
      onHide={closeLogin } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...login}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Credenciales Incorrectas</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>El Usuario o contraseña son incorrectos</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={closeLogin}>


Ok


  </Button>


</Modal.Footer>


</Modal>


</div>

)






}

export default Login