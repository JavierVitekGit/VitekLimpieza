import { React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Personal.css'
import 'react-infinite-calendar/styles.css';
import { initializeApp } from 'firebase/app';
import {child, get, getDatabase,ref,remove,update} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {BrowserRouter,Link,useNavigate} from "react-router-dom";
import SideBar from "./Sidebar";

const Personal = ({personal}) => {


    const [showw,setShow] = useState([]);

    function mostrarPersonal () {
      setShow(false)
    }

    function mostrarClientes () {
      setShow(true)
    }

    
    const [clientUbic,setClientUbic] = useState([]);

    const [opUbic,setOpUbic] = useState([]);

    console.log("ClientUbic:::",clientUbic)

    const [clientSelect,setClientSelect] = useState('')

    const [ubicSelect,setUbicSelect] = useState('')

    const [puestSelect,setPuestSelect] = useState('')

    const keId = [];

    console.log("keId",keId)


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


  const clientesUnicos = [];
  clientesUnicos.push("")
  clientUbic.forEach((item)=>{
    if (!clientesUnicos.includes(item.Nombre)){
      clientesUnicos.push(item.Nombre)
    }

   
  })


 const ubc = [];

 ubc.push("")

 clientUbic.forEach((item)=>{
   if (item.Nombre == clientSelect){
    ubc.push(item.Ubicacion)
   }
 })

console.log("SELECTCLIENTE:",clientSelect)
console.log("UBC::",ubc)


 const pv = [];

 pv.push('')

 opUbic.forEach((item)=>{
   if (item.Cliente == clientSelect && item.Ubicacion == ubicSelect){
      pv.push(item.Puesto)
   }
 })


 opUbic.forEach((item)=>{
   if (item.Cliente == clientSelect && item.Ubicacion == ubicSelect && item.Puesto == puestSelect){
      keId.push(item.Key)
   }
 })
 console.log("OpUbic:$&/",opUbic)


  const [clientCl,setClientCl] = useState([]);




  const supervisores = [];


 

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


  function removeOperadorData (event) {
    event.preventDefault()
    remove(ref(db, 'Operador/' + keId[0].toString()))
  }
  
  
  function writeOperadorData(event) {


    var curp = (apellidoP.toUpperCase().substring(0,2) + apellidoM.toUpperCase().substring(0,1) + nombre.toUpperCase().substring(0,1) + fechaN.substring(2,4) + 
    fechaN.substring(5,7) + fechaN.substring(8,10) + genero.substring(0,1))
    
    event.preventDefault()
    update(ref(db,'Operador/' + curp),{
      ID: ID, 
      Nombre: nombre + " " + apellidoP + " " + apellidoM,
      Fecha_Ingreso:fechaI,
      Fecha_Baja:fechaB,
      Cliente:clientSelect,
      Puesto:puestSelect,
      Ubicacion:ubicSelect,
      Estatus: 1,
      Horario: horarioOne + ":" + horarioTwo,
    });
  
  }






  useLayoutEffect(()=>{
    
    datos.push({nombres:"Seleccionar Cliente",cl:"Seleccionar Cliente"})



    const dbRef = ref(getDatabase());


    get(child(dbRef,'Operador')).then((snapshot)=>{
      if (snapshot.exists()){
        snapshot.forEach((childSnapshot)=>{

          var client = childSnapshot.child("Cliente").val()
          var ubic = childSnapshot.child("Ubicacion").val()
          var pt = childSnapshot.child("Puesto").val()
          var nm = childSnapshot.child("Nombre").val()
          var id = childSnapshot.key

          if (ubic != null && nm == "Vacante") {
            opUbic.push({Cliente:client,Ubicacion:ubic,Puesto:pt,Key:id})
          }

        })
      }
    })



    get(child(dbRef,'ClienteUbicacion')).then((snapshot)=>{
      if (snapshot.exists()){
        snapshot.forEach((childSnapshot)=>{
          var nombre = childSnapshot.child("Nombre").val()
          var ubic = childSnapshot.child("Ubicacion").val()
          var sup = childSnapshot.child("Supervisor").val()
        


          if (ubic != null){
            clientUbic.push({Nombre:nombre,Ubicacion:ubic})
          }
          

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
  


  if ( nombre == "") {
    handleShow(event);
    
  } else{
    show(event)
    removeOperadorData(event);
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

          {showw?


            

        <div className="listClient">
          
          <div className="adminSide">
            <SideBar/>
            
            </div>
        
            <label class="form-outline-label">Cliente</label>

            <br/>
            <select onClick={forceUpdate} onChange={v=>{setClientSelect(v.target.value)}} >


          {clientesUnicos.map((item)=>{ 

            return(
          
            <option>{item}</option>
            )
          })}
            </select>
          <br/>

          <label class="form-outline-label">Ubicacion del Cliente</label>

          <br/>


          <select onClick={forceUpdate} onChange={v=>{setUbicSelect(v.target.value)}} >
          {ubc.map((item)=>{ 

            return(
         
            <option>{item}</option>

            )
         
          })}

            </select>



          <br/>

          <label class="form-outline-label">Puesto</label>

          <br/>

          <select onClick={forceUpdate} onChange={v=>{setPuestSelect(v.target.value)}}>
            {pv.map((item)=>{
              return(
                <option>{item}</option>
              )
            })}
          </select>

          <br/>

          <input class="btn btn-primary" type="submit" onClick={mostrarPersonal} value="Siguiente" ></input>

         

        </div>


            :

        <div className="App-header">

          
        <div className="adminSide">
            <SideBar/>
            
            </div>
            

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

              {/* <label class="form-outline-label" for="form1">Cliente</label>

                <br/>

                <select id="slc" onClick={forceUpdate} value={cliente} onChange={v=>onChange5(v.target.value)}>
                {clientCl.map((item)=> <option>{item}</option>)}


                </select> */}

                <br/>

              

         


                <label class="form-outline-label" for="form3">Teléfono</label>

              <br/>

              <input type="number" onChange={v=>onChange1(v.target.value)}></input>

                </div>


              <br></br>



          <input id="guardarP" class="btn btn-success" type="submit" value="Guardar" onClick={comprobar}></input>
                <br/>
          <input type="submit" class="btn btn-primary" value="Regresar" onClick={mostrarClientes} />
          
          
          </div>
          
        </div>

}

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