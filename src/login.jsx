import {React,useState} from "react";
import Modal from 'react-bootstrap/Modal'
import './login.css'
import {useNavigate,Link} from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { render } from "react-dom";
import CalendarioO from './Calendario Olga'


const Login = (login) => {

const [usuario,setUsuario] = useState ('')
const [password,setPassword] = useState('')

const history = useNavigate();


const[modalLogin,setModalLogin] =useState(false)

  const showLogin = () => setModalLogin(true)

  const closeLogin= () => setModalLogin(false)


  


 const onKeyDown = e => {

    if (e.keyCode === 13) {
      comprobar();
    }

  }






function comprobar() {

    if (usuario=="nyx" && password == "7620859") {
      history("/Test")
    } else {
      showLogin()
    }

    if(usuario=="test" && password =="7620859") {
      history("/Test")
    } else {
      showLogin()
    }

    if (usuario == "rg" && password == "1234") {
      history("/ReporteG")
    } else {
      showLogin()
    }

    if (usuario == "rm" && password == "1234"){
      history("/ReporteM")
    } else {
      showLogin()
    }

  
    if(usuario=="Admin" && password=="asdq23" ) {
      //                   ||
      //  usuario=="Lourdes" && password =="lili1234") {
        history("/Alta del Cliente")
        console.log("Pasale")
    }

    else {
        showLogin()
    }

    // O L G A 

    if (usuario =="auxinfonavit" && password=="infoabc4")
     {

      //  {<Link to="/Calendario O"></Link>}
        history("/Calendario O");
    }  else {
      showLogin()
    }

    // L O U R D E S

    if (usuario =="suplimpieza2" && password=="ventana")
     {
          history("/Calendario L")
    }  else {
      showLogin()
    }


    // M A R I O

    if (usuario =="Mario" && password=="mario1234")
     {
          history("/Calendario M")
    }  else {
      showLogin()
    }

    // F A T I M A

    if (usuario =="suplimpieza1" && password=="calendario")
    {
         history("/Calendario F")
   }  else {
     showLogin()
   }

   if (usuario=="felipeazpeitia18@gmail.com" && password == "ultraverde"){
     history("/Calendario Fe")
   } else {
     showLogin()
   }

   if (usuario == "rb" && password == "123") {
     history('/Reporte Bajas')
   } else {
     showLogin()
   }


    //

}


return(


<div className="bodyLogin"   >

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
    <input type="password" placeholder="Contraseña" value={password} onChange={v=>setPassword(v.target.value)} onKeyDown={onKeyDown}></input>


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