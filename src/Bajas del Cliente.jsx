import {React,useState,Component, useEffect, useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update,set} from "firebase/database";
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


    const [bajaCl,setBajaCl] = useState('')
    
    var today = new Date()
      var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      var minInp = lastWeek.toISOString().split('T')[0]

      var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
      var maxInp = nextWeek.toISOString().split('T')[0]
      
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

      update(ref(db,'ClienteUbicacion/' + id),{
        Estatus:0
      })
        close();
    }
    

    function writeOperadorData(event){
      event.preventDefault()

      update(ref(db,'Operador/' ),{
        
      })
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



    
useLayoutEffect(()=>{

  lista.push({name:"Seleccionar Cliente",dom:"",date:"",hr:"",id:"Seleccionar Cliente"}) 


  const dbRef = ref(getDatabase());
  get(child(dbRef,'ClienteUbicacion')).then((snapshot) => {
    if(snapshot.exists()){
      snapshot.forEach((childSnapshot)=>{
        var nombreC = childSnapshot.child("Nombre").val()
        var domicilio = childSnapshot.child("Domicilio").val()
        var fecha = childSnapshot.child("Fecha").val()
        var hora = childSnapshot.child("Horario").val()
	      var id = childSnapshot.key;
        
       lista.push({name:nombreC,dom:domicilio,date:fecha,hr:hora,id:id}) 
        
        
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
    


    if (value1 == "" ||bajaCl == ""  ) {
      handleShow(event);
      
    } else{
      show(event)
      
    
    }

  }




return( 

     
  
    <div className="Baja-Client">

<div className="bajaH">

<h1 className="bch">
<i id="peopleBI" class="bi bi-person-x"></i>
  Baja del Cliente
</h1>

</div>

<div className="dive"></div>

        <div className="Body">

        <div className="containerB">


        <div className="oneB">

        <label class="form-outline-label" for="form1">Nombre del Cliente</label>

        <br></br>

        
        <select id="selB" onClick={forceUpdate}  value={value1} onChange={ handlerNombres } className="test" > 
        {lista.map((item,i) =>  <option value={item.id} id="list">{item.id}</option> )}
        </select> 

        <br></br>
        <br/>



        <label class="form-outline-label" id="fbO" for="form1">Fecha de Baja</label>
        <br/>
        <input type="Date" id="fechaBInp" class="form-control" value={bajaCl} onChange={v=>setBajaCl(v.target.value)} min={minInp} max={maxInp} />
        </div>

        <br/>
          {/* <label class="form-outline-label" for="form1">Domicilio</label>
            <br/>
          <input type="text"  class="form-control" value={Dom} ></input>
        




          <label class="form-outline-label" for="form1">Dias a Laborar</label>
            <br/>
          <input type="text"  class="form-control" value={Fecha} ></input>
          

          <label class="form-outline-label" for="form1">Horario</label>
          <input type="text"  class="form-control" value={Horario} ></input>
          <br></br> */}




          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>

        

            <br></br>
            <br></br>

        <div class="btn-groupp">

        <input class="btn btn-danger" type="submit" value="Dar de Baja" onClick={comprobar} ></input>
        </div>

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
      {...baja}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>¿Está seguro? </Modal.Title>


</Modal.Header>


<Modal.Body>


<p>¿Está seguro que desea continuar con la baja del cliente "{value1}"? </p>


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


