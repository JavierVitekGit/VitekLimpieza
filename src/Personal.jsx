import { React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Personal.css'
import 'react-infinite-calendar/styles.css';
import { initializeApp } from 'firebase/app';
import {child, get, getDatabase,ref,update} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {BrowserRouter,Link,useNavigate} from "react-router-dom";
import SideBar from "./Sidebar";

const Personal = ({personal}) => {

    const [inactive,setInactive] = useState(true)

    const history = useNavigate();
    
    const clientee = () => {
        history("Alta del Cliente");
    }
    
    const bajaCliente = () => {
        history("/Baja del Cliente");
    }
    
    const turno = () => {
        history("/Añadir Turno");
    }
    
    const Operador = () => {
        history("/Alta del Operador");
    }
    
    const bajaOperador = () => {
        history("/Baja del Operador");
    }
    
    const Reasignacion = () => {
        history("/Reasignacion");
    }
    
    const Numero = () => {
        history("/Cambio de Numero");
    }
    
    const Registro = () => {
        history("/Calendario");
    }
    
    const Inasistencia = () => {
        history("/Inasistencia");
    }
    
    
    // document.addEventListener('click', function(event) {
    //     if(event.target.id != 'botonQueMuestraMenu' && event.target.id != 'menu'){
    //       document.getElementById('menu').style.display = 'none';
    //     }
    //   });
    
    

    


  var today = new Date();
  var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  var minInp = lastWeek.toISOString().split('T')[0]
  
    console.log(lastWeek.toISOString().split('T'[0]))


  const [ID,onChange1] = useState('')
  const [nombre,onChange2] = useState('')
  const [apellidoP,setApellidoP] = useState('')
  const [apellidoM,setApellidoM] = useState('')
  const [fechaI,onChange3] = useState('')
  const [fechaB,onChange4] = useState('')
  const [fechaN,setFecha] = useState('')
  const [cliente,onChange5] = useState('')
  const [hr,setHr] = useState('')

  const [supervisor,setSupervisor] = useState('')


  const [genero,setGenero] = useState()


  const [horarioOne,setHorarioOne] = useState('')
  const [horarioTwo,setHorarioTwo] = useState('')
 

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


  const [clientCl,setClientCl] = useState([]);


  clientCl.push("Seleccionar Cliente")


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

  console.log("Fecha",fechaN)

  console.log("Género:",genero)
  
  function writeOperadorData(event) {


    var curp = (apellidoP.toUpperCase().substring(0,2) + apellidoM.toUpperCase().substring(0,1) + nombre.toUpperCase().substring(0,1) + fechaN.substring(2,4) + 
    fechaN.substring(5,7) + fechaN.substring(8,10) + genero.substring(0,1))
    
    event.preventDefault()
    update(ref(db,'Operador/' + curp),{
      ID: ID, 
      Nombre: nombre + " " + apellidoP + " " + apellidoM,
      Fecha_Ingreso:fechaI,
      Fecha_Baja:fechaB,
      Cliente:cliente,
      Estatus: 1,
      Horario: horarioOne + ":" + horarioTwo,
    });
  
  }



  function writeClienteData(event) {
    event.preventDefault()

    update(ref(db,'ClienteUbicacion/'))

  }


  useLayoutEffect(()=>{
    
    datos.push({nombres:"Seleccionar Cliente",cl:"Seleccionar Cliente"})



    const dbRef = ref(getDatabase());

    get(child(dbRef,'ClienteUbicacion')).then((snapshot)=>{
      if (snapshot.exists()){
        snapshot.forEach((childSnapshot)=>{
          var nombre = childSnapshot.child("Nombre").val()

          clientCl.push(nombre)
        })
      }
    })




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
  


  if ( nombre == "" || cliente == "") {
    handleShow(event);
    
  } else{
    show(event)
    writeOperadorData(event);


    setTimeout(()=>{
      nombre == (""),
      apellidoP == (""),
      apellidoM == (""),
      fechaN == (""),
      fechaI == (""),
      horarioOne == (""),
      horarioTwo == (""),
      ID == ("")
    },200);
  
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

        <div className="adminSide">
            <SideBar/>
            
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

              <label class="form-outline-label" for="form1">Nombre</label>
              <br/>
                <input type="text" id="inp1" class="form-control" value={nombre} onChange={v=>onChange2(v.target.value)}  placeholder="Nombre del Operador" />
                <br/>
              <label class="form-outline-label" for="form1">Apellido Paterno</label>
              <br/>
                <input type="text" id="inp1" class="form-control" value={apellidoP} onChange={v=>setApellidoP(v.target.value)}  placeholder="Apellido paterno del Operador" />
                <br/>
              <label class="form-outline-label" for="form1">Apellido Materno</label>
              <br/>
                <input type="text" id="inp1" class="form-control" value={apellidoM} onChange={v=>setApellidoM(v.target.value)}  placeholder="Apellido materno del Operador" />  

                <br/>

                <label class="form-outline-label"  >Fecha de Nacimiento</label>
                <br/>
                <input type="Date" id="inputdis" class="form-control" value={fechaN} onChange={v=>setFecha(v.target.value)}  />

                <br/>

                <select id="gen" value={genero} onChange={v=>setGenero(v.target.value)}>

                <option>Selecc. género</option>
                <option>Hombre</option>
                <option>Mujer</option>

                </select>

              
        
             

            
                </div>


                <div className="secondAP">
                <br/>

                {/* <label class="form-outline-label" for="form1">Teléfono</label>
                <input type="tel" id="inp2" class="form-control" value={ID} onChange={v=>onChange1(v.target.value)} placeholder="Teléfono del Operador" maxLength={"10"} />     */}

              <label class="form-outline-label"  id="dej">Fecha de Ingreso</label>
              <br/>
                <input type="Date" id="inputdis" class="form-control" value={fechaI} onChange={v=>onChange3(v.target.value)} min={minInp} />




              {/* <label class="form-outline-label" for="form1">Fecha de baja</label>
                <input type="Date" id="inp4" class="form-control" value={fechaB} onChange={v=>onChange4(v.target.value)} /> */}

<br/>

              <label class="form-outline-label" for="form1">Cliente</label>

                <br/>

                <select id="slc" onClick={forceUpdate} value={cliente} onChange={v=>onChange5(v.target.value)}>
                {clientCl.map((item)=> <option>{item}</option>)}


                </select>

                <br/>

              

                <br/>
              
              <label class="form-outline-label" for="form3">Horario</label> 

                    <br></br>


                
              
                

                  {/* {sel.map((item)=><option>{item}</option>)} */}

                    
                  <div className="horInput">

                    <input type="number" value={horarioOne} onChange={v=>setHorarioOne(v.target.value)}></input>:<input type="number" value={horarioTwo} onChange={v=>setHorarioTwo(v.target.value)}></input>

                  </div>
                    


          
                <br/>


                <label class="form-outline-label" for="form3">Teléfono</label>

              <br/>

              <input type="number" onChange={v=>onChange1(v.target.value)}></input>

                </div>


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


  <Button variant="success" onClick={close}>


Ok


  </Button>


</Modal.Footer>


</Modal>



      </div>

    )

}







export default Personal