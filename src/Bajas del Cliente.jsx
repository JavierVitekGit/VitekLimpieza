import {React,useState,Component, useEffect, useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import { initializeApp } from "@firebase/app";
import "./BajaCliente.css"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const BajaCliente = (baja) => {



  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);  

  
    const [lista,onChange] = useState ([])
    const [value1,onChange2] = useState ('')
    const [Dom,onChange3] = useState ('')
    const [Horario,onChange4] = useState ('')
    const [Fecha,onChange5] = useState ('')
    const [id,onChange6] = useState ('')
    
    
    const handlerNombres = function (e) {
      const opcion = e.target.value
      onChange2(e.target.value)
      console.log("### "+ value1)
      console.log("$$$" + opcion)

      


      lista.forEach (v=>{
        if (v.id == opcion) {
          console.log(v.id,opcion)
          onChange3(v.dom)
          onChange5(v.date) 
          onChange4(v.hr)
          onChange6(v.id)
        }
      })

    }

  
    function writeClienteData(event) {
      event.preventDefault()

      update(ref(db,'Clientes/' + id),{
        Estatus:0
      })

    }



    

    let config = {
        apiKey: "AIzaSyDnedHTB9yMEPhZTQDzI08rA7yDXAJq84I",
        authDomain: "vitek-c65e5.firebaseapp.com",
        databaseURL: "https://vitek-c65e5-default-rtdb.firebaseio.com",
        projectId: "vitek-c65e5",
        storageBucket: "vitek-c65e5.appspot.com",
        messagingSenderId: "1:180537252076:web:278e4849024501aaa52dc9",
        appId: "1:180537252076:web:278e4849024501aaa52dc9",
      };

      const app = initializeApp(config);



    
useLayoutEffect(()=>{

  lista.push({name:"Seleccionar Cliente",dom:"",date:"",hr:"",id:""}) 


  const dbRef = ref(getDatabase());
  get(child(dbRef,'Clientes')).then((snapshot) => {
    if(snapshot.exists()){
      snapshot.forEach((childSnapshot)=>{
        var nombreC = childSnapshot.child("Nombre").val()
        var domicilio = childSnapshot.child("Domicilio").val()
        var fecha = childSnapshot.child("Fecha").val()
        var hora = childSnapshot.child("Horario").val()
	      var id = childSnapshot.key;
        
       lista.push({name:nombreC,dom:domicilio,date:fecha,hr:hora,id:id}) 
        console.log(lista)
        console.log(id)
        
      })
      
    }
  })

},[])

    const db = getDatabase();

    
  

    const[modal,setModal] =useState(false)

    const handleShow = () => setModal(true)
  
    const handleClose = () => setModal(false)


    
    const [mod,setMod] = useState(false)
    const show = () => setMod(true)
    const close = () => setMod(false)
    

    function comprobar (event) {
      event.preventDefault()
    


    if (value1 == "" ) {
      handleShow(event);
      
    } else{
      show(event)
      
    
    }

  }




return( 

  
    <div className="Baja-Client">
        <h1>Baja del Cliente</h1>

        <div className="Body">





        <label class="form-outline-label" for="form1">Nombre del Cliente</label>

        <br></br>

        
        <select  onClick={forceUpdate}  value={value1} onChange={ handlerNombres } > 
        {lista.map((item,i) =>  <option value={item.id}>{item.name}</option> )}
        </select> 

        <br></br>




        <label class="form-outline-label" for="form1">Domicilio</label>
          <br/>
        <input type="text"  class="form-control" value={Dom} ></input>
      




        <label class="form-outline-label" for="form1">Dias a Laborar</label>
          <br/>
        <input type="text"  class="form-control" value={Fecha} ></input>
        

        <label class="form-outline-label" for="form1">Horario</label>
        <input type="text"  class="form-control" value={Horario} ></input>
        <br></br>




        </div>

            <br></br>
            <br></br>

        <div class="btn-group">

        <input class="btn btn-danger" type="submit" value="Dar de Baja" onClick={comprobar} ></input>
        

        </div>

        <Modal className="modal-container" 
      show={modal}  
      onHide={handleClose } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...baja}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Registro fallido</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>No se ha seleccionado ningun cliente</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={handleClose}>


X


  </Button>


</Modal.Footer>


</Modal>




<Modal className="modal-c" 
      show={mod}  
      onHide={close } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...baja}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>¿Está seguro? </Modal.Title>


</Modal.Header>


<Modal.Body>


<p>¿Está seguro que desea continuar con la baja del cliente? </p>


</Modal.Body>


<Modal.Footer>

  
  <Button variant="success" onClick={writeClienteData}>
Si
  </Button>

  <Button variant="danger" onClick={close}>

  
No


  </Button>

  


</Modal.Footer>


</Modal>




    </div>
)


}


export default BajaCliente


