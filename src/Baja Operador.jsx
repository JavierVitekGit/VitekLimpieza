import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import { initializeApp } from "@firebase/app";
import "./BajaOperador.css"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'




const BajaOperador = (baja) => {




    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);  


    const [datos,setDatos] = useState ([])
    const [tel,setTel] = useState ('')
    const [nombre,setNombre] = useState ('')
    const [fechaI,setFechaI] = useState ('')
    const [fechaB,setFechaB] = useState ('')
    const [cliente,setCliente] = useState ('')


    const handlerNombres = function (e) {
        const opcion = e.target.value
        setTel(e.target.value)
        console.log("### "+ tel)
        console.log("$$$" + opcion)
  
        
  
         datos.forEach (v=>{
           if (v.tel == opcion) {
             console.log(v.tel,opcion)
             setNombre(v.name) 
             setFechaI(v.fi)
             setFechaB(v.fb)    
             setCliente(v.cl)
           }
         })
  
      }


      function writeBajaData(event) {
        event.preventDefault()

        update(ref(db,'Operador/' + tel),{
          Estatus:0
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

        datos.push({tel:"Seleccionar Teléfono",name:"",fi:"",fb:"",cl:""})

        const dbRef = ref(getDatabase());
        get(child(dbRef,'Operador')).then((snapshot) => {
          if(snapshot.exists()){
            snapshot.forEach((childSnapshot)=>{
              var telefono= childSnapshot.child("ID").val()
              var nombre = childSnapshot.child("Nombre").val()
              var fechaIngreso = childSnapshot.child("Fecha_Ingreso").val()
              var fechaBaja = childSnapshot.child("Fecha_Baja").val()
              var cliente = childSnapshot.child("Cliente").val()
              var id = childSnapshot.key;
              
             datos.push({tel:telefono,name:nombre,fi:fechaIngreso,fb:fechaBaja,cl:cliente}) 
              console.log(datos)
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
    


    if (tel == "" ) {
      handleShow(event);
      
    } else{
      show(event)
      
    
    }

  }






return(



<div className="Baja">

    <h1>Baja del Operador</h1>


<div className="Body">




<label class="form-outline-label" for="form1">Teléfono del Operador</label>

<br></br>





<select  onClick={forceUpdate} value={tel} onChange={handlerNombres} > 
{datos.map((item) => <option value={item.id}>{item.tel}</option> )}
</select> 

<br></br>




<label class="form-outline-label" for="form1">Nombre Completo</label>
  <br/>
<input type="text"  class="form-control" value={nombre} ></input>





<label class="form-outline-label" for="form1">Fecha de Ingreso</label>
  <br/>
<input type="text"  class="form-control" value={fechaI} ></input>


<label class="form-outline-label" for="form1">Fecha de Baja</label>
<input type="text"  class="form-control" value={fechaB} ></input>

<label class="form-outline-label" for="form1">Cliente</label>
<input type="text" class="form-control" value={cliente} />

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


<p>No se ha seleccionado ningun teléfono  </p>


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


<Modal.Title>¿Está seguro?</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>¿Está seguro que desea continuar con la baja del operador?</p>


</Modal.Body>


<Modal.Footer>

<Button variant="success" onClick={writeBajaData}>
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

export default BajaOperador;
