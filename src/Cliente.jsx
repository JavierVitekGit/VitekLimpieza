import {React,useState,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Cliente.css'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import 'react-infinite-calendar/styles.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import { initializeApp } from "@firebase/app";
import {Link,Switch,BrowserRouter,Route} from "react-router-dom"
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import BajaCliente from "./Bajas del Cliente";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

/* eslint-disable no-unused-expressions */

const Cliente = (clientes) => {

    
    const [nombre,onChange3] = useState('')
    const [domicilio,onChange4] = useState('')
    const [value2,onChange2] = useState('7:00 a.m - 4:00 p.m')
    const [Fecha,onChange5] = useState('Lunes-Viernes')


    const [lunc,setLunc] = useState('')
    const [marc,setMarc] = useState('')
    const [mierc,setMierc] = useState('')
    const [juevc,setJuevc] = useState('')
    const [vierc,setVierc] = useState('')
    const [sabc,setSabc] = useState('')
    const [domc,setDomc] = useState('')

    var arraydc = [];

    arraydc.push(lunc,marc,mierc,juevc,vierc,sabc,domc)

    var arr = arraydc.filter(Boolean);

    console.log(arraydc)


  var arraycM = [];

  arraycM.push(lunc, + ",",marc, + ",",mierc, + ",",juevc, + ",",vierc, + ",",sabc, + ",",domc)


      function checkboxval () {
        if (document.getElementById("LC").checked ==true) {
          document.getElementById("LC").value = "Lunes";
          document.getElementById("LC").value = document.getElementById("LC").value;
        } else {
          document.getElementById("LC").value = ""
          document.getElementById("LC").value = document.getElementById("LC").value;
        }

        if (document.getElementById("MC").checked==true) {
          document.getElementById("MC").value = "Martes";
          document.getElementById("MC").value = document.getElementById("MC").value
        } else {
          document.getElementById("MC"). value =""
          document.getElementById("MC").value = document.getElementById("MC").value
        }

        if (document.getElementById("MIC").checked==true) {
          document.getElementById("MIC").value = "Miércoles";
          document.getElementById("MIC").value = document.getElementById("MIC").value
        } else {
          document.getElementById("MIC"). value =""
          document.getElementById("MIC").value = document.getElementById("MIC").value
        }

        if (document.getElementById("JC").checked==true) {
          document.getElementById("JC").value = "Jueves";
          document.getElementById("JC").value = document.getElementById("JC").value
        } else {
          document.getElementById("JC"). value =""
          document.getElementById("JC").value = document.getElementById("JC").value
        }

        if (document.getElementById("VC").checked==true) {
          document.getElementById("VC").value = "Viernes";
          document.getElementById("VC").value = document.getElementById("VC").value
        } else {
          document.getElementById("VC"). value =""
          document.getElementById("VC").value = document.getElementById("VC").value
        }

        if (document.getElementById("SC").checked==true) {
          document.getElementById("SC").value = "Sábado";
          document.getElementById("SC").value = document.getElementById("SC").value
        } else {
          document.getElementById("SC"). value =""
          document.getElementById("SC").value = document.getElementById("SC").value
        }

        if (document.getElementById("DOC").checked==true) {
          document.getElementById("DOC").value = "Domingo";
          document.getElementById("DOC").value = document.getElementById("DOC").value
        } else {
          document.getElementById("DOC"). value =""
          document.getElementById("DOC").value = document.getElementById("DOC").value
        }

      }





      const firebaseConfig = {
        apiKey: "AIzaSyBmZRACI4lPavlz-2N0NyIvTIW9j2DOJhY",
        authDomain: "androidbrinsk.firebaseapp.com",
        databaseURL: "https://androidbrinsk-default-rtdb.firebaseio.com",
        projectId: "androidbrinsk",
        storageBucket: "androidbrinsk.appspot.com",
        messagingSenderId: "1038423598895",
        appId: "1:1038423598895:web:ddfe2d9c575506d192a3da"
      };




    const app = initializeApp(firebaseConfig);

    console.log(app)


    const db = getDatabase();

    const dbRef = ref(getDatabase());


  

    function writeClienteData(event) { 
      event.preventDefault()


    update(ref(db, 'ClienteUbicacion/' + (nombre + domicilio.substr(0,10))), {
    Nombre: nombre,
    Domicilio: domicilio,
    Días: arr,
    Horario: value2,
    Estatus: 1
    });
    }


    function writeShiftData(event) {
      event.preventDefault()

      update(ref(db,'shift/' + nombre.substr(0,3) + domicilio.substr(0,3)),{
        cliente:nombre,
        horaFin:"00:00",
        horaInicio: value2
      })
    }
  

    
    // update(ref(db,'shift/' + (nombre.substr(0,3) + domicilio.substr(0,3)))),{
    //   cliente:nombre,
    //   horaFin:"00:00",
    //   horaInicio:value2
    // }

   
    const[modal,setModal] =useState(false)

    const handleShow = () => setModal(true)
  
    const handleClose = () => setModal(false)


    const [mod,setMod] = useState(false)
    const show = () => setMod(true)
    const close = () => setMod(false)
    

    function comprobar (event) {
      event.preventDefault()
    


    if (nombre == "" || domicilio == "") {
      handleShow(event);
      
      
    } else{
      show(event)
      writeClienteData(event);
      writeShiftData(event);
    
    }

  }



   const myStyle = {
    width: '100%',
    height: '100%'
   };


    
        return(



     
     
          // "width: 100%; height: 100%;"
          

    <div className="Usuario" style={myStyle} >




   
   <div className="header-client">

          <div className="altaH">

     <h1 className="dth"> 
     <i id="peopleI" class="bi bi-people"></i>
         Alta del Cliente 
     </h1>


         </div>

          <div className="divi"></div>

   <div className="Datos"> 

   {/* <h1 className="DC">Datos del Cliente</h1> */}



        {/* <h3 className="InP">Información Personal</h3>  */}

        

         <div className="datosHC">


       <label class="form-outline-label" for="form1">Nombre</label>
       <input type="text" id="d1" class="form-control" value={nombre} onChange={v=> onChange3(v.target.value)} placeholder="Nombre del Cliente" />
       
       </div>




       <label class="form-outline-label" for="form1">Domicilio</label>
         <input type="text" id="d2" class="form-control" value={domicilio} onChange={v=>onChange4(v.target.value)} placeholder="Domicilio del Cliente" />

   

         

       <label class="form-outline-label" for="form3" id="dil">Días a Laborar</label>

       <br></br>

       
          
       <div className="diass">

<div className="lun">      
<input type="checkbox" onChange={v=> setLunc(v.target.value)} id="LC" onClick={checkboxval} /> <h1 id="luncheck">Lunes</h1> 
</div>  

<div className="mart">
<input type="checkbox" onChange={v=> setMarc(v.target.value)} id="MC" onClick={checkboxval} /> <h1 id="marcheck">Martes</h1> 
</div>

<div className="mierc">
<input type="checkbox" onChange={v=> setMierc(v.target.value)} id="MIC" onClick={checkboxval}  /> <h1 id="miercheck">Miércoles</h1> 
</div>

<div className="juev">
<input type="checkbox" onChange={v=> setJuevc(v.target.value)} id="JC" onClick={checkboxval} /> <h1 id="juevcheck">Jueves</h1> 
</div>

<div className="vier">
<input type="checkbox" onChange={v=> setVierc(v.target.value)} id="VC" onClick={checkboxval} /> <h1 id="viercheck">Viernes</h1>
</div>

<div className="sab">
<input type="checkbox" onChange={v=> setSabc(v.target.value)} id="SC" onClick={checkboxval} /> <h1 id="sabcheck">Sábado</h1>
</div>

<div className="dom">
<input type="checkbox" onChange={v=> setDomc(v.target.value)} id="DOC" onClick={checkboxval} /> <h1 id="domcheck">Domingo</h1>
</div>

</div>

          <br></br>
         

          <label class="form-outline-label" for="form3">Horario</label>

          <br></br>

       <select name="Horas" value={value2} onChange={v=> onChange2(v.target.value)}>
          <option>07:00</option>
          <option>08:00</option>
          <option>09:00</option>
          <option>10:00</option>
          <option>11:00</option>
          <option>12:00</option>
          <option>13:00</option>
          <option>14:00</option>
       </select>


       {/* O P C I O N  2  H O R A R I O  */}

        {/* <input id="hrta" type="text" maxLength="2"></input>
        :
        <input id="hrtb" type="text" maxLength="2"></input> */}




  

       <br></br>




      

       <br></br>
       <br></br>

   <input id="alta" class="btn btn-success" type="submit" value="Dar de Alta" onClick={comprobar}></input>



    </div>


   </div>

   <Modal className="modal-container" 
      show={modal}  
      onHide={handleClose } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...clientes}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Registro fallido</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>Faltan completar algunos campos</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={handleClose}>


Ok


  </Button>


</Modal.Footer>


</Modal>





<Modal className="modal-c" 
      show={mod}  
      onHide={close } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...clientes}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Registro Exitoso</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>Los datos del cliente han sido guardados correctamente</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={close}>


  Ok


  </Button>


</Modal.Footer>


</Modal>
  
    </div>

        ) 

      }

      


export default Cliente
