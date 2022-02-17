import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import "./BajaOperador.css"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SideBar from './Sidebar.jsx'



const BajaOperador = (baja) => {


  

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);  

    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    var minInp = lastWeek.toISOString().split('T')[0]

    var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    var maxInp = nextWeek.toISOString().split('T')[0]

    const [datos,setDatos] = useState ([])
    const [tel,setTel] = useState ('')
    const [nombre,setNombre] = useState ('')
    const [fechaI,setFechaI] = useState ('')
    const [fechaB,setFechaB] = useState ('')
    const [cliente,setCliente] = useState ('')


    const [bajaOp,setBajaOp] = useState('')


    const nombrecitos = [];

    datos.forEach((item)=>{
      if (!nombrecitos.includes(item.name)){
          nombrecitos.push(item)
      }
    })
    
    nombrecitos.sort()

    const handlerNombres = function (e) {
        const opcion = e.target.value
        setTel(e.target.value)
        console.log("### "+ tel)
        console.log("$$$" + opcion)
  
        
  
         datos.forEach (v=>{
           if (v.name == opcion) {
             console.log(v.tel,opcion)
             setNombre(v.key) 
             setFechaI(v.fi)
             setFechaB(v.fb)    
             setCliente(v.cl)
           }
         })
  
      }


      function writeBajaData(event) {
        event.preventDefault()

        update(ref(db,'Operador/' + tel),{
          Estatus:0,
          Fecha_Baja:bajaOp
        })

        close();
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
      
      
      console.log(firebaseConfig)


      useLayoutEffect(()=>{

        datos.push({tel:"Seleccionar Teléfono",name:"",fi:"",fb:"",cl:""})

        const dbRef = ref(getDatabase());
        get(child(dbRef,'Operador')).then((snapshot) => {
          if(snapshot.exists()){
            snapshot.forEach((childSnapshot)=>{
              var telefono= childSnapshot.child("ID").val()
              var nombre = childSnapshot.child("Nombre").val()
              var fechaIngreso = childSnapshot.child("Fecha_Ingreso").val()
              var cliente = childSnapshot.child("Cliente").val()
              var id = childSnapshot.key;
              
             datos.push({tel:telefono,name:nombre,fi:fechaIngreso,key:id,cl:cliente}) 
              
             datos.sort()
              
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
      


    if (tel == "" || bajaOp == "" ) {
      handleShow(event);
      
    } else{
      show(event)
      
    
    }

  }




return(



<div className="Baja">

<div className="adminSide">
            <SideBar></SideBar>
            
            </div>    

  <div className="boH">

    <h1 className="bajaOH">
    <i id="cellBO" class="bi bi-telephone-x"></i>
      Baja del Operador
    
    </h1>

    </div>
<div className="Bodyy">




<label id="rfcT" class="form-outline-label" for="form1">Nombre del Operador</label>

<br></br>





<select  onClick={forceUpdate} value={tel} onChange={handlerNombres} > 
{nombrecitos.map((item) => <option value={item.id}>{item}</option> )}
</select> 

<br></br>




<label class="form-outline-label" for="form1">CURP del Operador</label>
  <br/>
<input type="text"  class="form-control" value={nombre} ></input>


<div className="fechaIngresoOp">


<label class="form-outline-label" for="form1">Fecha de Ingreso</label>
  <br/>
<input type="text"  class="form-control" value={fechaI} ></input>

</div>

<div className="fechaBajaOp">

<label class="form-outline-label" id="fbO" for="form1">Fecha de Baja</label>
<br/>
<input type="Date" id="inputdis" class="form-control" value={bajaOp} onChange={v=>setBajaOp(v.target.value)} min={minInp} max={maxInp} />

</div>


<br/>




<label class="form-outline-label" for="form1">Cliente</label>
<br/>
<input type="text" class="form-control" value={cliente} />

<br></br>


        <div class="btn-group">

        <input id="bajaOP" class="btn btn-danger" type="submit" value="Dar de Baja" onClick={comprobar} ></input>
        

        </div>

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


<p>¿Está seguro que desea continuar con la baja del operador "{nombre}"?</p>


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
