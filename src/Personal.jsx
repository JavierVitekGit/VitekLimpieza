import { React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Personal.css'
import 'react-infinite-calendar/styles.css';
import { initializeApp } from 'firebase/app';
import {child, get, getDatabase,ref,update} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const Personal = ({personal}) => {

  var today = new Date();
  var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  var minInp = lastWeek.toISOString().split('T')[0]
  
    console.log(lastWeek.toISOString().split('T'[0]))


  const [ID,onChange1] = useState('')
  const [nombre,onChange2] = useState('')
  const [fechaI,onChange3] = useState('')
  const [fechaB,onChange4] = useState('')
  const [cliente,onChange5] = useState('')
  const [hr,setHr] = useState('')


  const [rfc,setRfc] = useState('')


  const [datos,setDatos] = useState ([])

  const[sel,setSel] = useState([])

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);  

  const unicos = [];

  datos.forEach((item)=>{
    if (!unicos.includes(item.cl)){
      unicos.push(item.cl)
    }
  });

  console.log(unicos.sort())




  const firebaseConfig = {
    apiKey: "AIzaSyBmZRACI4lPavlz-2N0NyIvTIW9j2DOJhY",
    authDomain: "androidbrinsk.firebaseapp.com",
    databaseURL: "https://androidbrinsk-default-rtdb.firebaseio.com",
    projectId: "androidbrinsk",
    storageBucket: "androidbrinsk.appspot.com",
    messagingSenderId: "1038423598895",
    appId: "1:1038423598895:web:ddfe2d9c575506d192a3da"
  };



  var id = ID


  const app = initializeApp(firebaseConfig);
  console.log(app)

  const db = getDatabase();
  
  function writeOperadorData(event) {
    
    event.preventDefault()
    update(ref(db,'Operador/' + rfc),{
      ID: ID, 
      Nombre: nombre,
      Fecha_Ingreso:fechaI,
      Fecha_Baja:fechaB,
      Cliente:cliente,
      Estatus: 1,
      Horario: hr
    });
  
  }



  function writeClienteData(event) {
    event.preventDefault()

    update(ref(db,'ClienteUbicacion/'))

  }


  useLayoutEffect(()=>{
    
    datos.push({nombres:"Seleccionar Cliente",cl:"Seleccionar Cliente"})

    const dbRef = ref(getDatabase());
    get(child(dbRef,'shift')).then((snapshot)=> {
      if(snapshot.exists()){
        snapshot.forEach((childSnapshot)=>{
          
          var namae = childSnapshot.child("Nombre").val()
          var id = childSnapshot.child("cliente").val();
          var key = childSnapshot.key
          var hora = childSnapshot.child("horaInicio").val()
          datos.push({nombres:namae,cl:id,hr:hora})
          
         
      



        
        })

        datos.forEach(iter =>{
          if (iter.id == nombre){
            sel.push(iter.hr)

            console.log(sel)
          }
        })
      }
    })

  },[])

  /* 
      datos.forEach(iter=> {
        if (iter.id == nombre) {
          sel.push(iter.hr)

          console.log(sel)
        }
      })
  */ 

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

/*
  function comprobar (event) {
    event.preventDefault()

    if (nombre =="" || domicilio ==""){
      handleShow(event);
    } else {
      show(event)
      writeClienteData(event);
      writeShiftData(event);
    }
  }
*/


    return(
           
        <div className="Usuario">
          <div>
   
          </div>

        <div className="App-header">
            

        <div className="altaCH">
            <h1 className="dt"> 
            <i id="celI" class="bi bi-telephone-plus"></i>
              Alta del Operador
            </h1>
         </div>    

            
          <div className="Datoss"> 

              <div className="oneAP">

              <label class="form-outline-label" for="form1">R.F.C</label>
              <br/>
                <input type="text" id="inp1" class="form-control" value={rfc} onChange={v=>setRfc(v.target.value)} minLength="13" maxLength="13" placeholder="R.F.C del Operador" />

                <br/>

              <label class="form-outline-label" for="form1">Teléfono</label>
              <br/>
                <input type="tel" id="inp1" class="form-control" value={ID} onChange={v=>onChange1(v.target.value)}  maxLength={10} placeholder="Teléfono del Operador" />

                <br/>
        
              <label class="form-outline-label" for="form1">Nombre Completo</label>
              <br/>
                <input type="text" id="inp2" class="form-control" value={nombre} onChange={v=>onChange2(v.target.value)} placeholder="Nombre del Operador" />

            
                </div>


                <div className="secondAP">

                <br/>

              <label class="form-outline-label"  id="dej">Fecha de Ingreso</label>
              <br/>
                <input type="Date" id="inputdis" class="form-control" value={fechaI} onChange={v=>onChange3(v.target.value)} min={minInp} />
                <br/>



              {/* <label class="form-outline-label" for="form1">Fecha de baja</label>
                <input type="Date" id="inp4" class="form-control" value={fechaB} onChange={v=>onChange4(v.target.value)} /> */}

            

              <label class="form-outline-label" for="form1">Cliente</label>

                <br/>

                <select id="slc" onClick={forceUpdate} value={cliente} onChange={v=>onChange5(v.target.value)}>
                {unicos.map((item) => <option>{item}</option> )} 

                </select>

                <br/>
              
              <label class="form-outline-label" for="form3">Horario</label> 

                    <br></br>

                <select name="Horas" value={hr} onChange={v=> setHr(v.target.value)}>

                

                

                  {/* {sel.map((item)=><option>{item}</option>)} */}

                    
                    <option>Seleccionar Horario</option>
                    <option>07:00</option>
                    <option>08:00</option>
                    <option>09:00</option>
                    <option>10:00</option>
                    <option>11:00</option>
                    <option>12:00</option>
                    <option>13:00</option>
                    <option>14:00</option>


                </select> 

                </div>


              <br></br>


              <br></br>


          <input id="guardarP" class="btn btn-success" type="submit" value="Guardar" onClick={comprobar}></input>


          
          
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


Ok


  </Button>


</Modal.Footer>


</Modal>



      </div>

    )

}







export default Personal;