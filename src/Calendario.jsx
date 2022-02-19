import {React,useState,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Calendario.css';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { formatRelative, subDays} from 'date-fns'
import {es} from 'date-fns/locale'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-infinite-calendar/styles.css';
import { initializeApp } from 'firebase/app';
import {getDatabase,ref,child,get,update} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Login from "./login";
import {BrowserRouter,Link,useNavigate} from "react-router-dom";
import SideBar from "./Sidebar";

const Calendario = (calendario) => {



  const [datos,setDatos] = useState ([])


  const [comp,setComp] = useState ([])

  const [array,setArray] = useState ([])

  const [select,setSelect] = useState([])

  const [client,setClient] = useState('')

  const [arrayPersonal,setArrayPersonal] = useState([]);


  

  //Datos Olga

  const [suplencia,setSuplencia] = useState('No se cubrio')



  const [arrayClientCl,setArrayClientCl] = useState([]);

  const [arrayJusti,setArrayJusti] = useState([]);

 

      arrayClientCl.sort()


  const [namae,setNamae] = useState([]);

  const unicosTable = [];

  const unicos = [];

  unicos.push("")

  namae.forEach((item)=>{
    if (!unicos.includes(item)){
      unicos.push(item)
    }
  });

 


// C L I E N T E

  const unicoss = [];

  unicoss.push("");

  arrayClientCl.forEach((item)=> {
    if (!unicoss.includes(item) && !unicosTable.includes(item)){
      unicoss.push(item)
      unicosTable.push(item)
    }
  })

  unicoss.sort()

  const [selClient,setSelCliente] = useState("")

  console.log("Select",selClient)



// P E R S O N A L

const [arrayp,setArrayP] = useState([]);

arrayJusti.forEach((item)=> {
  if (!arrayp.includes(item)){
    arrayp.push(item)

    arrayp.sort()

  }
})






// F I L T E R 

  const [search,setNewSearch] = useState("");

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  const filtered = !search
  ?unicoss
  :unicoss.filter((client) =>
  client.toLowerCase().includes(search.toLowerCase())
  );

// M O D A L

const[modal,setModal] =useState(false)
const handleShow = () => setModal(true)
const handleClose = () => setModal(false)


const [modd,setModd] = useState(false)
const handleShoww = () => setModd(true)
const handleClosee = () => setModd(false)


const [mod,setMod] = useState(false)
const show = () => setMod(true)
const close = () => setMod(false)


const [modClient,setModClient] = useState(false)
const modOpen = () => setModClient(true)
const modClose = () => setModClient(false)


// C A L E N D A R I O





  const [mostrar,setMostrar] = useState([])

  const [infinite,setInfinite] = useState(new Date())



  var dia = infinite.toISOString().substring(8,10)

  var mes = infinite.toISOString().substring(5,7)

  var anio = infinite.toISOString().substring(0,4)
  
  
    var today = new Date();
    var hora = today.getHours() 


    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    formatRelative(subDays(new Date(), 3), new Date(), { locale: es })


    var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15);
    formatRelative(subDays(new Date(), 3), new Date(), { locale: es })
  
    const cal = () => {
      let calendario = infinite
      document.getElementById("dia").innerHTML = calendario;

    }





    
// C A M B I A R   D E   V I S T A





    function mostrarRegistro () {
      setMostrar(false)

    }

    function mostrarCalendario () {
      setMostrar(true)
    }




//    R E G I S T R O    D E    A S I S T E N C I A


  




    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);  
  
    
  
  
    const [value1,onChange1] = useState('Inasistencia')
    const [value2,onChange2] = useState('Inasistencia')

  
  
    const [tabla,onChange] = useState([ ])

    const alfabeticamente = [];



// F I R E B A S E
    
// useEffect(() => {



  function abcd () {

    if (selClient == "") {
      modOpen()
    } else {
      obtener();
    }

    

  }

  function regresar () {
    setSelCliente("")
    mostrarCalendario();
    setArrayJusti([])
    setNamae([])
  }


  const dbRef = ref(getDatabase());

  get(child(dbRef,'Operador/')).then((snapshot)=>{
    if(snapshot.exists()){
      snapshot.forEach((childSnapshot)=>{
        var sup = childSnapshot.child("Supervisor").val()
        var cliente = childSnapshot.child("Cliente").val()

    
          arrayClientCl.push(cliente)
          
     

      })
    }
  })


function obtener () {


 
  
const firebaseConfig = {
  apiKey: "AIzaSyBmZRACI4lPavlz-2N0NyIvTIW9j2DOJhY",
  authDomain: "androidbrinsk.firebaseapp.com",
  databaseURL: "https://androidbrinsk-default-rtdb.firebaseio.com",
  projectId: "androidbrinsk",
  storageBucket: "androidbrinsk.appspot.com",
  messagingSenderId: "1038423598895",
  appId: "1:1038423598895:web:ddfe2d9c575506d192a3da"
};

    
  
    
      const db = getDatabase();






     


      const dbRef = ref(getDatabase());


      get(child(dbRef,'ClienteUbicacion/' )).then((snapshot) => {
        if(snapshot.exists()) {

          snapshot.forEach((childSnapshot)=> {
            var name = childSnapshot.child("Nombre").val()
            var personal = childSnapshot.child("Personal").val()

            if(name==selClient){
              arrayPersonal.push(personal)
            }

          })

     

         console.log("Razi:",arrayPersonal)
        }
      })


      get(child(dbRef,'Asistencia/' + dia + "-" + mes + "-" + anio)).then((snapshot)=> {
          if (snapshot.exists()){
            setDatos([])
              snapshot.forEach((childSnapshot)=>{
                  var nombre = childSnapshot.child("0").val()
                  var horario = childSnapshot.child("1").val()
                  var cliente = childSnapshot.child("2").val()


                  datos.push({cliente:cliente,nombre:nombre,horario:horario})

                  
                  console.log(datos)
              })
          }
      })
      

      get(child(dbRef,'Operador/')).then((snapshot)=>{
          if (snapshot.exists()){
              setComp([])
              snapshot.forEach((childSnapshot)=>{

                  var sup = childSnapshot.child("Supervisor").val()
                  var clienteOp = childSnapshot.child("Cliente").val()
                  var nombreOp = childSnapshot.child("Nombre").val()
                  var hora = childSnapshot.child("Horario").val()
                  var est = childSnapshot.child("Estatus").val()

                  if( est == 1 ) 
                  comp.push({clienteC:clienteOp,name:nombreOp,hr:hora,estat:est})

                

              })

            comp.forEach((iter)=> {
              if (iter.clienteC == selClient) {
                arrayJusti.push({clienteC:iter.clienteC,name:iter.name,hr:iter.hr,estatus:iter.estat})
                arrayJusti.sort();

                console.log("Justi",arrayJusti.length)

              }
            })

            comp.forEach((iter)=>{
              if (iter.clienteC == selClient) {
                namae.push(iter.name)
                namae.sort()
              }
            } )
            
            

          }
      })

      setTimeout(() => {

        console.log("Personal::: "+arrayPersonal[0])
        for(var i=0; i<arrayPersonal[0]; i++){
          if (arrayJusti[i] == undefined){
            arrayJusti.push({clienteC:selClient,name:"Vacante",hr:"08:00"})
          }else{

          }

        }

        mostrarRegistro();
      }, 500);

      setArrayPersonal([])
      

      console.log("Select:", select)


      


//   M O D A L  




 
}


// console.log("ArrayJusti:",arrayJusti)
// arrayJusti.forEach((item)=>{
//   if(item.suplencia ==""){
//     item.suplencia == "No se cubrio"
//   }
// })


function writeJustiData(event) {
  event.preventDefault()


  arrayJusti.forEach(a =>{
    console.log(a.suplencia)
    a.suplencia = (a.suplencia== undefined || a.suplencia==null || a.suplencia == "")? "no se cubrio":a.suplencia


  })

console.log('Justificaciones/' + dia + "-" + mes + "-" + anio + "/" + selClient)
  update(ref(getDatabase(),'Justificaciones/' + dia + "-" + mes + "-" + anio + "/" + selClient),{
    Datos:arrayJusti
  });

}

// },[])



    return(



      <div id="all">
{

mostrar?






// P R I M E R    D I V 







<div className="Calendario" id="inf">
  
<div className="adminSide">
            <SideBar/>
            
            </div>

  <div className="calH">

<h1 id="he">
<i id="calendarI" class="bi bi-calendar-week-fill"></i>
  Lista de Clientes
</h1>

</div>


  <div className="containerCal">

    <br/>

<InfiniteCalendar className="Cal"  
width={600}
height={250}
selected={false}
minDate={lastWeek}
maxDate={today}
onSelect={setInfinite}
locale={{
  locale:require('date-fns/locale/es'),
  headerFormat: 'dddd, D, MMM',
  weekdays:["Dom","Lun","Mar","Mier","Juev","Vier","Sab"],
  blank: 'Seleccione una fecha',
  todayLabel: {
    long:'Hoy',
    short:'Hoy'
  }
}}
displayOptions={{
    showHeader:false}}
/>




<br></br>



<br/>
<br/>

<select onClick={forceUpdate} id="selClient" onChange={v=>{setSelCliente(v.target.value)}}>
  {unicoss.map((item)=> <option>{item}</option>)}
</select>

<br/>


{/* <table id="estateTable" class="table table-striped" >
<thead class="table-dark">
<tr >
  <th scope="col">Cliente/Ubicación</th>
  <th scope="col">Estado</th>


</tr>
</thead>

<tbody>
{ unicosTable.map((item)=> 




{
  
  // if (hora >= item.hr.substr(0,2)  ) {
    
    

    return (

    <tr>

    <td id="testSelect" onChange={v=>{setClient(v.target.value)}}>
      
       {item}
      
    </td>
    <td>


    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clipboard2-check" viewBox="0 0 16 16" color="green">
  <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
  <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/>
  <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3Z"/>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clipboard2-minus" viewBox="0 0 16 16" color="orange">
  <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
  <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/>
  <path d="M6 8a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6Z"/>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clipboard2-x" viewBox="0 0 16 16" color="red">
  <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
  <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/>
  <path d="M8 8.293 6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293Z"/>
</svg>
    </td>
    <td></td> 

  
   
   

   
    </tr>
    )


// } 
// else {


// }

}
 )}
 
</tbody>
</table> */}


<input class="btn btn-success" type="submit" value="Ir al Registro" onClick={abcd} id="calbt"></input>

</div>
<Modal className="modal-container" 
      show={modd}  
      onHide={handleClosee} 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...calendario}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Sin Registros</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>No Existen registros de inasistencias del día seleccionado</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={handleClosee}>


Ok


  </Button>


</Modal.Footer>


</Modal>



<Modal className="modal-container" 
      show={modClient}  
      onHide={modClose } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...calendario}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>No se ha seleccionado ningun cliente</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>Seleccione un cliente para poder continuar</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={modClose}>


Ok


  </Button>


</Modal.Footer>


</Modal>



</div>









// F I N    D E L     P R I M E R    D I V





:  





// S E G U N D O   D I V





<div className="Background" id="Registro"  >
{/* <div className="SideOlgas">
            <SideBarO/>
            
            </div> */}

<div className="adminSide">
            <SideBar/>
            
            </div>


  <div className="regIH">


<h1 id="head">
  
  <i id="calendarX" class="bi bi-calendar-x"></i>
  Justificaciones
  <h1 className="dateCa">{dia + "-" + mes + "-" + anio}</h1>
  </h1>

  




</div>

<table class="table table-striped" id="Tabla">
  
<thead class="table-dark">
<tr id="headertab">
  <th scope="col">Cliente/Ubicación</th>
  <th scope="col">Nombre Operador</th>
  <th scope="col">Turno</th>
  <th scope="col">Suplencia</th>

</tr>
</thead>
<tbody className="test" >



{ arrayJusti.map((item)=> 




{
  
  // if (hora >= item.hr.substr(0,2)  ) {
    
  

    return (

    <tr>

    <td id="testSelect" onChange={v=>{setClient(v.target.value)}}>
      
       {item.clienteC}
      
    </td>
    <td>{item.name}</td> 
    <td>{item.hr}
    <br/>
    <select className="estados" onChange={v=>item.estado = v.target.value }  >
      <option></option>
      <option>Descanso</option>
      <option>Incapacidad</option>
      <option>Injustificada</option>
      <option>Justificada</option>
      <option>Vacaciones</option>


      
      </select>
      <br/>
      <br/>
      <textarea className="txtArea" placeholder="Motivo de la Justificacion"  onChange={v=>item.justi = v.target.value}></textarea> 
    </td> 
   
    <td>
      <div id="hidden">
    
        <br/>
                                                                                       {/* v=>{setSeleitect(v.target.value) */}
        <select className="selectName" onClick={forceUpdate}  onChange={v=>item.asis = v.target.value} >
          {unicos.map((item) => <option>{item}</option>)}

        </select>

        <p>Otro</p>

        <textarea placeholder="Nombre del suplente"  onChange={v=> item.suplencia = (item.suplencia === undefined)? "no se cubrio" : v.target.value}></textarea>
      </div>
    </td>

   
   
   
   
   
    </tr>
    )


  }




// else {


// }

// }
 )}
 
</tbody>

</table>





<Modal className="modal-container" 
      show={modal}  
      onHide={handleClose } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...calendario}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>La asistencia no ha sido justificada</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>Favor de especificar el motivo de la asistencia</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={handleClose}>


Ok


  </Button>


</Modal.Footer>


</Modal>



<Modal className="modal-container" 
      show={mod}  
      onHide={close } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...calendario}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Registro Exitoso</Modal.Title>


</Modal.Header>


<Modal.Body>



<p>El registro de justificaciones ha sido realizado con exito</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={close}>


Ok


  </Button>


</Modal.Footer>


</Modal>





<p id="dia"></p>

<br/>

<div class = "btn-groupp">



<input class="btn btn-success" type="submit" value="Guardar" onClick={writeJustiData}  id="btt"></input>

<input class="btn btn-secondary"  type="submit" value="Regresar al Calendario" onClick={regresar} id="bt2"></input>

<br/>
<br/>


</div>    

</div>     



// F I N    D E L    S E G U N D O    D I V



}


</div>


    )
    

}


export default Calendario;
