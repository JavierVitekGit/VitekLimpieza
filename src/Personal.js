import { React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Personal.css'
import 'react-infinite-calendar/styles.css';
import { initializeApp } from 'firebase/app';
import {child, get, getDatabase,ref,update} from "firebase/database";
import Cliente from "./Cliente";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'



const Personal = ({personal}) => {

  const [ID,onChange1] = useState('')
  const [nombre,onChange2] = useState('')
  const [fechaI,onChange3] = useState('')
  const [fechaB,onChange4] = useState('')
  const [cliente,onChange5] = useState('')

  const [datos,setDatos] = useState ([])



  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);  

  



  let config = {
    apiKey: "AIzaSyDnedHTB9yMEPhZTQDzI08rA7yDXAJq84I",
    authDomain: "vitek-c65e5.firebaseapp.com",
    databaseURL: "https://vitek-c65e5-default-rtdb.firebaseio.com",
    projectId: "vitek-c65e5",
    storageBucket: "vitek-c65e5.appspot.com",
    messagingSenderId: "1:180537252076:web:278e4849024501aaa52dc9",
    appId: "1:180537252076:web:278e4849024501aaa52dc9",
  };



  var id = ID


  const app = initializeApp(config);
  console.log(app)


  
  function writeOperadorData(event) {
    const db = getDatabase();
    event.preventDefault()
    update(ref(db,'Operador/' + id),{
      ID: ID, 
      Nombre: nombre,
      Fecha_Ingreso:fechaI,
      Fecha_Baja:fechaB,
      Cliente:cliente,
      Estatus: 1
    });
  
  }



  useLayoutEffect(()=>{

    datos.push({nombres:"Seleccionar Cliente"})

    const dbRef = ref(getDatabase());
    get(child(dbRef,'Clientes')).then((snapshot)=> {
      if(snapshot.exists()){
        snapshot.forEach((childSnapshot)=>{
          
          var namae = childSnapshot.child("Nombre").val()
          var id = childSnapshot.key;
          
          datos.push({nombres:namae})
          
          console.log(namae)
        
        })
      }
    })

  },[])

  

  const[modal,setModal] =useState(false)

  const handleShow = () => setModal(true)

  const handleClose = () => setModal(false)


  const [mod,setMod] = useState(false)
  const show = () => setMod(true)
  const close = () => setMod(false)
  

  function comprobar (event) {
    event.preventDefault()
  


  if (ID == "" || nombre == "" || cliente == "") {
    handleShow(event);
    
  } else{
    show(event)
    writeOperadorData(event);
  
  }

}


    


    return(
           
        <div className="Usuario">

        <div className="App-header">
            
            <h1 className="dt"> 
              Datos del Operador
            </h1>


            
          <div className="Datos"> 
              <label class="form-outline-label" for="form1">Teléfono</label>
                <input type="number" id="inp1" class="form-control" value={ID} onChange={v=>onChange1(v.target.value)} />

              
        
              <label class="form-outline-label" for="form1">Nombre Completo</label>
                <input type="text" id="inp2" class="form-control" value={nombre} onChange={v=>onChange2(v.target.value)} />

            
          

              <label class="form-outline-label" for="form1" >Fecha de Ingreso</label>
                <input type="Date" id="inp3" class="form-control" value={fechaI} onChange={v=>onChange3(v.target.value)} />

             
    

              <label class="form-outline-label" for="form1">Fecha de baja</label>
                <input type="Date" id="inp4" class="form-control" value={fechaB} onChange={v=>onChange4(v.target.value)} />

            

              <label class="form-outline-label" for="form1">Cliente</label>

                <br/>

                <select id="slc" onClick={forceUpdate} value={cliente} onChange={v=>onChange5(v.target.value)}>
                {datos.map((item) => <option>{item.nombres}</option> )} 

                </select>
              
                 
             


              <br></br>


              <br></br>


          <input class="btn btn-success" type="submit" value="Guardar" onClick={comprobar}></input>


          
          
          </div>
          
        </div>

        <Modal className="modal-container" 
      show={modal}  
      onHide={handleClose } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...personal}
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
      {...personal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Registro Exitoso</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>Los datos del operador han sido guardados correctamente</p>


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





export default Personal;