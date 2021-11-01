import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update, set} from "firebase/database";
import { initializeApp } from "@firebase/app";

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './Reasignacion.css'




const Reasignacion = (reasignacion) => {


    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);  



    const [tel,setTel] = useState();
    const [cliente,setCliente] = useState ('')
    const [datos,setDatos] = useState([])



    const[modal,setModal] =useState(false)

    const handleShow = () => setModal(true)
  
    const handleClose = () => setModal(false)




    const[mod,setMod] =useState(false)

    const Show = () => setMod(true)
  
    const Close = () => setMod(false)



    function comprobar(event){
        event.preventDefault()


        if (tel == "" || cliente==""){
            handleShow(event);
        } else{
            Show(event);
            writeReasignacionData(event);
        }

    }




    function writeReasignacionData(event) {
        event.preventDefault()

        update(ref(db,'Reasignaciones/' + tel),{
            operador:tel,
            cliente:cliente
        })
    }




    let config = {
        apiKey: "AIzaSyDnedHTB9yMEPhZTQDzI08rA7yDXAJq84I",
        authDomain: "vitek-c65e5.firebaseapp.com",
        databaseURL: "https:vitek-c65e5-default-rtdb.firebaseio.com",
        projectId: "vitek-c65e5",
        storageBucket: "vitek-c65e5.appspot.com",
        messagingSenderId: "1:180537252076:web:278e4849024501aaa52dc9",
        appId: "1:180537252076:web:278e4849024501aaa52dc9",
      };


      useLayoutEffect(()=>{
        datos.push({tel:"Seleccionar Teléfono",cl:"Seleccione el Cliente"})

        const dbRef = ref(getDatabase());
        get(child(dbRef,'Operador')).then((snapshot) => {
          if(snapshot.exists()){
            snapshot.forEach((childSnapshot)=>{
              var telefono= childSnapshot.child("ID").val()

              var cliente = childSnapshot.child("Cliente").val()
              var id = childSnapshot.key;
              
             datos.push({tel:telefono,cl:cliente}) 
              console.log(datos)
              console.log(id)
              
            })
            
          }
        })
      },[])
      const db = getDatabase();




return(

    <div className="reasignacion">

        <h1 className="h">Reasignación del Operador</h1>


    <div className="container">


        <label class="form-outline-label">Teléfono del Operador</label>

        <br />

        <select onClick={forceUpdate} value={tel} onChange={v=> setTel(v.target.value)}>
        {datos.map((item)=><option value={item.id}>{item.tel}</option>)}    
        </select>

        <br />
        <br />


        <label class="form-outline-label">Cliente a reasignar</label>
        <br></br>
        <select onClick={forceUpdate} value={cliente} onChange={v=>{setCliente(v.target.value)}}>
            {datos.map((item)=><option>{item.cl}</option>)}
        </select>

            <br></br>
            <br></br>

        <input class="btn btn-success" type="submit" value="Completar Reasignación" onClick={comprobar}></input>

    </div>

    <Modal className="modal-container" 
      show={modal}  
      onHide={handleClose } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...reasignacion}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Faltan datos</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>No se han proporcionado todo los datos</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={handleClose}>


X


  </Button>


</Modal.Footer>


</Modal>










<Modal className="modal-container" 
      show={mod}  
      onHide={Close } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...reasignacion}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>La reasignacion ha sido realizada de forma exitosa</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>Los datos han sido guardados correctamente</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={Close}>


Ok


  </Button>


</Modal.Footer>


</Modal>









    
    </div>






)





}

export default Reasignacion