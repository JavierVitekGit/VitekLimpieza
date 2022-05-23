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

    const [posSelect,setPosSelect] = useState('')
    


    const keId = [];

    console.log("keId",keId)


  var today = new Date();
  var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  var minInp = lastWeek.toISOString().split('T')[0]

  var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  var maxInp = nextWeek.toISOString().split('T')[0]
  
  var bornDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1 );
  var bornInp = bornDate.toISOString().split('T')[0]

  var minDate = new Date(today.getFullYear() - 70, today.getMonth(), today.getDate());
  var minDateInp = minDate.toISOString().split('T')[0]

  console.log("MinDateInp",minDateInp)

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


  const [genero,setGenero] = useState('')

  const [datosCl,setDatosCl] = useState([])



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
    datosCl.forEach((x)=>{

      if (item.Nombre == x.Cliente) {
        if (!clientesUnicos.includes(item.Nombre)){
          clientesUnicos.push(item.Nombre)
        }
      }

      
    })

  })


  // U B I C A C I O N    D E L   C L I E N T E


 const ubc = [];

 ubc.push("")

 clientUbic.forEach((item)=>{
   if (item.Nombre == clientSelect){
    ubc.push(item.Ubicacion)
   }
 })


const ubcUnic = []

ubcUnic.push('')

ubc.forEach((x)=>{
  if (!ubcUnic.includes(x)){
    ubcUnic.push(x)
  }
})
 

console.log("SELECTCLIENTE:",clientSelect)
console.log("UBC::",ubc)


// P U E S T O  V A C A N T E

 const pv = [];

 pv.push('')

 opUbic.forEach((item)=>{
   if (item.Cliente == clientSelect && item.Ubicacion == ubicSelect){
      if(!pv.includes(item.Puesto)){
        pv.push(item.Puesto)
      }
   }
 })

 const ps = []

 ps.push('')

clientUbic.forEach((x)=>{
  if(x.Nombre == clientSelect && x.Ubicacion == ubicSelect && x.Puesto == puestSelect && x.Horario == turnSelect){
    if(!ps.includes(x.Posicion)){
      ps.push(x.Posicion)
    }
  }
})

ps.sort()

//  const [pvUnic,setPvUnic] = useState([]);

//  pv.forEach((item)=>{
//    if (!pvUnic.includes(item)) {
//       pvUnic.push(item);

//       pvUnic.sort()
//    }
//  })

 // K  E  Y


 opUbic.forEach((item)=>{
   if (item.Cliente == clientSelect && item.Ubicacion == ubicSelect && item.Puesto == puestSelect && item.Horario == turnSelect){
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

  const turnUnic = [];

  turnArray.forEach((item)=>{
    if (!turnUnic.includes(item)) {
        turnUnic.push(item)
    }
  })







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
      Dias: arrayc,
      Posicion: posSelect
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
          var pos = childSnapshot.child("Posicion").val()

          if (ubic != null && nm == "Vacante") {
            opUbic.push({Cliente:client,Ubicacion:ubic,Puesto:pt,Horario:hr,Key:id})
          }

          if (nm == "Vacante") {
            clientUbic.push({Nombre:client,Ubicacion:ubic,Horario:hr,Posicion:pos,Puesto:pt})
          }

        })
      }
    })

    get(child(dbRef,'ClienteUbicacion')).then((snapshot)=>{
      if(snapshot.exists()) {
        snapshot.forEach((x)=>{
          var nameCl = x.child("Nombre").val()
          var ubicacionCl = x.child("Ubicacion").val()
          var stateCl = x.child("Estatus").val()

          if (stateCl != 0) {
            datosCl.push({Cliente:nameCl,Ubicacion:ubicacionCl,Estatus:stateCl})
          }
        })
      }
    })


    // get(child(dbRef,'ClienteUbicacion')).then((snapshot)=>{
    //   if (snapshot.exists()){
    //     snapshot.forEach((childSnapshot)=>{
    //       var nombre = childSnapshot.child("Nombre").val()
    //       var ubic = childSnapshot.child("Ubicacion").val()
    //       var sup = childSnapshot.child("Supervisor").val()
    //       var estate = childSnapshot.child("Estatus").val()


    //       if (ubic != null && estate != 0 ){
    //         clientUbic.push({Nombre:nombre,Ubicacion:ubic})
    //       }
          

    //       clientCl.push(nombre)



    //     })
    //   }
    // })




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


  const [modP,setModP] = useState(false)
  const showPersonal = () => setModP(true)
  const closePersonal = () => setModP(false)


  const [confir,setConfir] = useState(false)
  const showConfir = () => setConfir(true)
  const closeConfir = () => setConfir(false)
  
  function comprobarTwo () {
    if (clientSelect == ""  && ubicSelect == "" || puestSelect == "" || turnSelect == ""){
      showPersonal()
    } else {
      mostrarPersonal()
    }
  }
  

  function comprobar (event) {
    event.preventDefault()
  


  if ( nombre == "" || fechaN =="" || fechaI == "") {
    handleShow(event);
    
  } else{
    show(event)


  }

}

function refreshPage() {
  window.location.reload(false);
}

function modalWrite(event) {
  event.preventDefault()

  showConfir(event)
  removeOperadorData(event);
  writeOperadorData(event);


}

function finish () {
  closeConfir()
  refreshPage()
}

// function backs() {
//   ID = (''),
//   nombre = (''),
//   apellidoP = (''),
//   apellidoM = (''),
//   fechaI = (''),
//   fechaB = (''),
//   clientSelect = (''),
//   puestSelect = (''),
//   ubicSelect = (''),
//   turnSelect = (''),
//   arrayc = [],
//   mostrarClientes();
// }

function back () {
  onChange1('');
  onChange2('');
  setApellidoP('');
  setApellidoM('');
  onChange3('');
  onChange4('');
  setClientSelect('')
  setPuestSelect('');
  setUbicSelect('');
  setTurnSelect('');
  setFecha('')
  arrayc = [];
  mostrarClientes();
  setGenero('')
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
<select onClick={forceUpdate} value={clientSelect} onChange={v=>{setClientSelect(v.target.value)}} >


{clientesUnicos.map((item)=>{ 

return(

<option>{item}</option>
)
})}
</select>
<br/>

<label class="form-outline-label">Ubicacion del Cliente</label>

<br/>


<select onClick={forceUpdate} value={ubicSelect} onChange={v=>{setUbicSelect(v.target.value)}} >
{ubcUnic.map((item)=>{ 

return(

<option>{item}</option>

)

})}

</select>



<br/>

<label class="form-outline-label">Puesto</label>

<br/>

<select onClick={forceUpdate} value={puestSelect} onChange={v=>{setPuestSelect(v.target.value)}}>
{pv.map((item)=>{
  return(
    <option>{item}</option>
  )
})}


</select>

<br/>

<label class="form-outline-label">Turno</label>

<br/>

<select onClick={forceUpdate} onChange ={v=>{setTurnSelect(v.target.value)}} >
{turnUnic.map((item)=>{
  return (
    <option>{item}</option>
  )
})}
</select>

<br/>


<label class="form-outline-label">Posición</label>

<br/>

<select onClick={forceUpdate} value={posSelect} onChange={v=>{setPosSelect(v.target.value)}}>
  {ps.map((x)=>{return(<option>{x}</option>)})}
</select>

<br/>



<input class="btn btn-primary" type="submit" onClick={comprobarTwo} value="Siguiente" ></input>


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
                <input type="Date" id="inputdis" class="form-control" value={fechaN} onChange={v=>setFecha(v.target.value)} min={minDateInp} max={bornInp}  />

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
                <input type="Date" id="inputdis" class="form-control" value={fechaI} onChange={v=>onChange3(v.target.value)} min={minInp} max={maxInp} />




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

                <table>

                  <tr>
                  <th><input type="checkbox" id="LTC" onClick={checkboxval}  onChange={v=> setLun(v.target.value)} /></th>
                  <th><input type="checkbox" id="MTC" onClick={checkboxval} onChange={v=>setMar(v.target.value)} /></th>
                  <th><input type="checkbox" id="MITC" onClick={checkboxval} onChange={v=>setMier(v.target.value)} /></th>
                  <th><input type="checkbox" id="JTC" onClick={checkboxval} onChange={v=>setJuev(v.target.value)} /></th>
                  <th><input type="checkbox" id="VTC" onClick={checkboxval} onChange={v=>setVier(v.target.value)} /></th>
                  <th><input type="checkbox" id="STC" onClick={checkboxval} onChange={v=>setSab(v.target.value)} /></th>
                  <th><input type="checkbox" id="DTC" onClick={checkboxval} onChange={v=>setDom(v.target.value)} /></th>  
                  </tr>

                  <tr>
                    <td>L</td>
                    <td>M</td>
                    <td>Mi</td>
                    <td>J</td>
                    <td>V</td>
                    <td>S</td>
                    <td>D</td>
                  </tr>


                </table>

        
              
           

              </div>

                </div>


              <br></br>

                <div className="btnPersonalGroup"> 

          <input id="guardarP" class="btn btn-success" type="submit" value="Guardar" onClick={comprobar}></input>
        
          <input type="submit" class="btn btn-primary" id="idk" value="Regresar" onClick={back} />
          
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


<Modal.Title>¿Está Seguro?</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>Está seguro que desea continuar con la alta del operador {nombre + ' ' +apellidoP + " " +apellidoM} con el cliente {clientSelect+"-"+ubicSelect}</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="success" onClick={modalWrite}>


Si


  </Button>

  <Button variant="danger" onClick={close}>
    No
  </Button>


</Modal.Footer>


</Modal>



<Modal className="modal-confir" 
      show={confir}  
      onHide={closeConfir} 
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


<p>El registro se ha realizado de manera exitosa</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="success" onClick={finish}>


Ok


  </Button>


</Modal.Footer>


</Modal>



<Modal className="registroP" 
      show={modP}  
      onHide={closePersonal } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...personal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Campos Incompletos</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>Falta completar algunos campos </p>


</Modal.Body>


<Modal.Footer>


  <Button variant="success" onClick={closePersonal}>


Ok


  </Button>


</Modal.Footer>


</Modal>


      </div>

    )

}







export default Personal