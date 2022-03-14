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


    const [lun,setLun] = useState ('')
    const [mar,setMar] = useState('')
    const [mier,setMier] = useState('')
    const [juev,setJuev] = useState('')
    const [vier,setVier] = useState('')
    const [sab,setSab] = useState('')
    const [dom,setDom] = useState('')


    function checkboxval () {
      if (document.getElementById("LTC").checked ==true) {
        document.getElementById("LTC").value = "Lunes";
        document.getElementById("LTC").value = document.getElementById("LTC").value;
      } else {
        document.getElementById("LTC").value = ""
        document.getElementById("LTC").value = document.getElementById("LTC").value;
      }

      if (document.getElementById("MTC").checked==true) {
        document.getElementById("MTC").value = "Martes";
        document.getElementById("MTC").value = document.getElementById("MTC").value
      } else {
        document.getElementById("MTC"). value =""
        document.getElementById("MTC").value = document.getElementById("MTC").value
      }

      if (document.getElementById("MITC").checked==true) {
        document.getElementById("MITC").value = "Miércoles";
        document.getElementById("MITC").value = document.getElementById("MITC").value
      } else {
        document.getElementById("MITC"). value =""
        document.getElementById("MITC").value = document.getElementById("MITC").value
      }

      if (document.getElementById("JTC").checked==true) {
        document.getElementById("JTC").value = "Jueves";
        document.getElementById("JTC").value = document.getElementById("JTC").value
      } else {
        document.getElementById("JTC"). value =""
        document.getElementById("JTC").value = document.getElementById("JTC").value
      }

      if (document.getElementById("VTC").checked==true) {
        document.getElementById("VTC").value = "Viernes";
        document.getElementById("VTC").value = document.getElementById("VTC").value
      } else {
        document.getElementById("VTC"). value =""
        document.getElementById("VTC").value = document.getElementById("VTC").value
      }

      if (document.getElementById("STC").checked==true) {
        document.getElementById("STC").value = "Sábado";
        document.getElementById("STC").value = document.getElementById("STC").value
      } else {
        document.getElementById("STC"). value =""
        document.getElementById("STC").value = document.getElementById("STC").value
      }

      if (document.getElementById("DTC").checked==true) {
        document.getElementById("DTC").value = "Domingo";
        document.getElementById("DTC").value = document.getElementById("DTC").value
      } else {
        document.getElementById("DTC"). value =""
        document.getElementById("DTC").value = document.getElementById("DTC").value
      }

    }

    var arrayd = [];

    arrayd.push(lun,mar,mier,juev,vier,sab,dom)

    var arrayc = arrayd.filter(Boolean);

    console.log("ArrayC::",arrayc)


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

    const [turnSelect,setTurnSelect] = useState('')


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
  // const [cliente,onChange5] = useState('')
  // const [hr,setHr] = useState('')

  // const [supervisor,setSupervisor] = useState('')


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


  // U B I C A C I O N    D E L   C L I E N T E


 const ubc = [];

 ubc.push("")

 clientUbic.forEach((item)=>{
   if (item.Nombre == clientSelect){
    ubc.push(item.Ubicacion)
   }
 })

console.log("SELECTCLIENTE:",clientSelect)
console.log("UBC::",ubc)


// P U E S T O  V A C A N T E

 const pv = [];

 pv.push('')

 opUbic.forEach((item)=>{
   if (item.Cliente == clientSelect && item.Ubicacion == ubicSelect){
      pv.push(item.Puesto)
   }
 })

 const [pvUnic,setPvUnic] = useState([]);

 pv.forEach((item)=>{
   if (!pvUnic.includes(item)) {
      pvUnic.push(item);

      pvUnic.sort()
   }
 })

 // K  E  Y


 opUbic.forEach((item)=>{
   if (item.Cliente == clientSelect && item.Ubicacion == ubicSelect && item.Puesto == puestSelect){
      keId.push(item.Key)
   }
 })
 console.log("OpUbic:$&/",opUbic)


// H O R A R I O 

 const turnArray = [];

 turnArray.push('')

opUbic.forEach((item)=>{
  if (item.Cliente == clientSelect && item.Ubicacion == ubicSelect && item.Puesto == puestSelect){
    turnArray.push(item.Horario)
  }
})




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
      Horario: turnSelect,
      Dias: arrayc
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
          var hr = childSnapshot.child("Horario").val()
          var id = childSnapshot.key

          if (ubic != null && nm == "Vacante") {
            opUbic.push({Cliente:client,Ubicacion:ubic,Puesto:pt,Horario:hr,Key:id})
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

            <div className="altaOpCl">
              <h1>Asignacion del Operador</h1>
            </div>
        
            <div className="datosOperadorAlta">
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
{pvUnic.map((item)=>{
  return(
    <option>{item}</option>
  )
})}
</select>

<br/>

<label class="form-outline-label">Turno</label>

<br/>

<select onClick={forceUpdate} onChange ={v=>{setTurnSelect(v.target.value)}} >
{turnArray.map((item)=>{
  return (
    <option>{item}</option>
  )
})}
</select>

<br/>

<input class="btn btn-primary" type="submit" onClick={mostrarPersonal} value="Siguiente" ></input>


            </div>

           

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

              <input type="number" id="telInpP" onChange={v=>onChange1(v.target.value)}></input>

              <br/>

              <div className="diasPersonal">

        
              <input type="checkbox" id="LTC" onClick={checkboxval}  onChange={v=> setLun(v.target.value)} /> <h1 id="luntcheck">Lunes</h1> 

              <div className="marttP">
              <input type="checkbox" id="MTC" onClick={checkboxval} onChange={v=>setMar(v.target.value)} /> <h1 id="martcheck">Martes</h1> 
              </div>

              <div className="mierctP">
              <input type="checkbox" id="MITC" onClick={checkboxval} onChange={v=>setMier(v.target.value)} /> <h1 id="miertcheck">Miércoles</h1> 
              </div>

              <div className="juevtP">
              <input type="checkbox" id="JTC" onClick={checkboxval} onChange={v=>setJuev(v.target.value)} /> <h1 id="juevtcheck">Jueves</h1> 
              </div>

              <div className="viertP">
              <input type="checkbox" id="VTC" onClick={checkboxval} onChange={v=>setVier(v.target.value)} /> <h1 id="viertcheck">Viernes</h1>
              </div>

              <div className="sabtP">
              <input type="checkbox" id="STC" onClick={checkboxval} onChange={v=>setSab(v.target.value)} /> <h1 id="sabtcheck">Sábado</h1>
              </div>

              <div className="domtP">
              <input type="checkbox" id="DTC" onClick={checkboxval} onChange={v=>setDom(v.target.value)} /> <h1 id="domtcheck">Domingo</h1>
              </div>

              </div>

                </div>


              <br></br>

                <div className="btnPersonalGroup"> 

          <input id="guardarP" class="btn btn-success" type="submit" value="Guardar" onClick={comprobar}></input>
        
          <input type="submit" class="btn btn-primary" value="Regresar" onClick={mostrarClientes} />
          
          </div>

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