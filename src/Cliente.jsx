import {React,useState} from "react";
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


const Cliente = (clientes) => {

    
    const [nombre,onChange3] = useState('')
    const [domicilio,onChange4] = useState('')
    const [value2,onChange2] = useState('7:00 a.m - 4:00 p.m')
    const [Fecha,onChange5] = useState('Lunes-Viernes')



    let config = {
      apiKey: "AIzaSyDnedHTB9yMEPhZTQDzI08rA7yDXAJq84I",
      authDomain: "vitek-c65e5.firebaseapp.com",
      databaseURL: "https://vitek-c65e5-default-rtdb.firebaseio.com",
      projectId: "vitek-c65e5",
      storageBucket: "vitek-c65e5.appspot.com",
      messagingSenderId: "1:180537252076:web:278e4849024501aaa52dc9",
      appId: "1:180537252076:web:278e4849024501aaa52dc9",
    };

    var name = nombre
    var place = domicilio
    var id = ( name.substr(0,3) + place.substr(0,3));


    const app = initializeApp(config);

    console.log(app)


    const db = getDatabase();

    const dbRef = ref(getDatabase());


  

    function writeClienteData(event) {
      event.preventDefault()


    update(ref(db, 'Clientes/' + id), {
    Nombre: nombre,
    Domicilio: domicilio,
    Fecha: Fecha,
    Horario: value2,
    Estatus: 1
    });
    }

  

   
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
    
    }

  }
    
        return(



          

          

    <div className="Usuario">




   
   <div className="header-client">
     <h1 className="dth"> 
          Alta del Cliente
     </h1>

          

   <div className="Datos"> 


       <label class="form-outline-label" for="form1">Nombre</label>
       <input type="text" id="d1" class="form-control" value={nombre} onChange={v=> onChange3(v.target.value)} />





       <label class="form-outline-label" for="form1">Domicilio</label>
         <input type="text" id="d2" class="form-control" value={domicilio} onChange={v=>onChange4(v.target.value)} />





       <label class="form-outline-label" for="form3">Días a Laborar</label>

       <br></br>

       
          
       <select name="Horario" value={Fecha} onChange={v=> onChange5(v.target.value)}>

        <option>Lunes-Viernes</option>
        <option>Lunes-Sabado</option>
        <option>Lunes-Domingo</option>
        <option>Lunes</option>
        <option>Martes</option>
        <option>Miercoles</option>
        <option>Jueves</option>
        <option>Viernes</option>
        <option>Sabado</option>
        <option>Domingo</option>
       </select>

          <br></br>
         

          <label class="form-outline-label" for="form3">Horario</label>

          <br></br>

       <select name="Horas" value={value2} onChange={v=> onChange2(v.target.value)}>
          <option>07:00 a.m - 4:00 p.m</option>
          <option>08:00 a.m - 5:00 p.m</option>
          <option>09:00 a.m - 6:00 p.m</option>
          <option>10:00 a.m - 7:00 p.m</option>
          <option>11:00 a.m - 8:00 p.m</option>
          <option>12:00 p.m - 9:00 p.m</option>
          <option>13:00 p.m - 10:00 p.m</option>
          <option>14:00 p.m - 11:00 p.m</option>


       </select>

  {/* <input type="date" class="form-control" value={Fecha} onChange={v=>onChange5(v.target.value)}/> 


      <DateRangePicker
       onChange={onChange}
       value={date}
       id="date1"/>

       <p id="value3"></p>



        <TimeRangePicker id="reloj"
       onChange={onChange2}
       value={value2}
       ampmAriaLabel="Select AM/PM"
       
       disableClock="true"
       />  */}

  

       <br></br>




        
       {/* <label class="form-outline-label" for="form1">Descansos</label> */}

  
   {/*   <InfiniteCalendar

      Component={withMultipleDates(Calendar)}
      selected={[]}
      width={370}
      height={170}
      interpolateSelection={defaultMultipleDateInterpolation}
      displayOptions={{showHeader:false}}
      id="InfCal"
      />

*/}

       <br></br>
       <br></br>

   <input class="btn btn-success" type="submit" value="Dar de Alta" onClick={comprobar}></input>



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


X


  </Button>


</Modal.Footer>


</Modal>
  
    </div>

        )

      }

      


export default Cliente
