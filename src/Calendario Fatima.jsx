import {React,useState,useEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Calendario.css';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { formatRelative, subDays} from 'date-fns'
import {es} from 'date-fns/locale'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-infinite-calendar/styles.css';
import { initializeApp } from 'firebase/app';
import {getDatabase,ref,child,get,update, set} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SideBarO from "./SideBarO";
import Login from "./login";



const CalendarioO = (calendario) => {


  const [datos,setDatos] = useState ([])


  const [comp,setComp] = useState ([])

  const [array,setArray] = useState ([])

  const [select,setSelect] = useState([])

  const [client,setClient] = useState('')

  //Datos Olga

  const [arrayClientCl,setArrayClientCl] = useState([]);

  const [arrayJusti,setArrayJusti] = useState([]);

  arrayClientCl.push(
    "TodoAcero",
        "Syscom",
        "FabricaAndrea",
        "BajioHidalgo",
        "BajioLosParaisos",
        "BajioSanJuanBosco",
        "BajioCarranza",
        "BajioTorresLanda",
        "BajioLeonModerno",
        "BajioDelta",
        "BajioSanFranciscoCentro",
        "BajioSanFranciscodelRincon",
        "BajioPurisimadelRincon",
        "CACLeonVIIILosMurales",
        "CACLeonIVLaPiscina",
        "BajioSalamanca",
        "CACLeonIICentroMax",
        "CVTLeonIIPortalAldama",
        "CVTLeonIMarianoEscobedo",
        "CCTLeonStadium",
        "TelcelPenjamo",
        "TelcelGuanajuatoII",
        "RBSLeonVillaInsurgentes",
        "CentralManzanares",
        "RBEcologicaSalamanca",
        "TelcelLeonIXViaAlta"
  )

      arrayClientCl.sort()


  const [namae,setNamae] = useState([]);


  const unicos = [];

  namae.forEach((item)=>{
    if (!unicos.includes(item)){
      unicos.push(item)
    }
  });

  console.log(unicos.sort())







// F I L T E R 

  const [search,setNewSearch] = useState("");

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  const filtered = !search
  ?array
  :array.filter((client) =>
  client.clienteC.toLowerCase().includes(search.toLowerCase()) || client.name.toLowerCase().includes(search.toLowerCase())
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






// C A L E N D A R I O





  const [mostrar,setMostrar] = useState([])

  const [infinite,setInfinite] = useState(new Date())

  // var infiniteF = infinite.getDate

  // console.log(infiniteF)

  var dia = infinite.toISOString().substring(8,10)

  var mes = infinite.toISOString().substring(5,7)

  var año = infinite.toISOString().substring(0,4)
  
  
    var today = new Date();
    var hora = today.getHours() 


    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
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
    
useEffect(() => {


 
  
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
      console.log(app)
    
      const db = getDatabase();






     


      const dbRef = ref(getDatabase());

      get(child(dbRef,'Asistencia/' + dia + "-" + mes + "-" + año)).then((snapshot)=> {



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
                  var clienteOp = childSnapshot.child("Cliente").val()
                  var nombreOp = childSnapshot.child("Nombre").val()
                  var hora = childSnapshot.child("Horario").val()
                  comp.push({clienteC:clienteOp,name:nombreOp,hr:hora})
              })

              arrayClientCl.forEach((other => {
                comp.forEach(iter => {
                  if (iter.clienteC == other){
                      arrayJusti.push({clienteC:iter.clienteC,name:iter.name,hr:iter.hr})
                      console.log("Olga:",arrayJusti)
                      arrayJusti.sort();
                  }
              })
            }))
            
              arrayClientCl.forEach((other) => {
                comp.forEach(iter => {
                  if (iter.clienteC == other) {
                    namae.push(iter.name)
                    namae.sort();
                  }
                })
              })


          }
      })



      // filtered.forEach(iter => {
      //   comp.forEach(other => {
      //     if (iter.clienteC == other.clienteC) {
      //         select.push(other.name)
      //     }
      //   })
      // })



      console.log("Select:", select)




// var isChecked = document.getElementById("suplenciaCheck").checked
// if (isChecked) {
//   alert("Checkbox Seleccionado")
// } else {
//   alert("Checkbox")
// }



// H I D D E N

function showContent() {
var element = document.getElementById("hidden")
var check = document.getElementById("suplenciaCheck")

  if(check.checked) {
    element.style.display='block';
  }
    else {
      element.style.display='none';
    }

};

//   M O D A L  





 


    
//     R  E  N  D  E  R  
  



},[])



    return(



      <div id="all">
{

mostrar?






// P R I M E R    D I V 







<div className="Calendario" id="inf">
  
<div className="SideOlgaBb">
            <SideBarO/>
            
            </div>

  <div className="calH">

<h1 id="he">
<i id="calendarI" class="bi bi-calendar-week-fill"></i>
  Calendario
</h1>

</div>
<div className="divCale"></div>

  <div className="containerCal">

<InfiniteCalendar className="Cal"  
width={1200}
height={500}
selected={false}
minDate={lastWeek}
maxDate={nextWeek}
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



<p id="txtcal"></p>
<p id="infiniteV"></p>

<br></br>



<input class="btn btn-success" type="submit" value="Ir al Registro" onClick={mostrarRegistro} id="calbt"></input>

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


</div>









// F I N    D E L     P R I M E R    D I V





:  





// S E G U N D O   D I V





<div className="Background" id="Registro"  >


  <div className="regIH">

<h1 id="head">
  <i id="calendarX" class="bi bi-calendar-x"></i>
  Justificaciones Fatima
  <h1 className="dateCa">{dia + "-" + mes + "-" + año}</h1>
  </h1>

  


  <div className="SideOlgaB">
            <SideBarO/>
            
            </div>

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
  
  if (hora >= item.hr.substr(0,2)  ) {
    
    

    return (

    <tr>

    <td id="testSelect" onChange={v=>{setClient(v.target.value)}}>
      
       {item.clienteC}
      
    </td>
    <td>{item.name}</td> 
    <td>{item.hr}
    <br/>
    <select className="estados" onChange={v=> item.asis = v.target.value}  >
      <option>Justificada</option>
      <option>Injustificada</option>
      <option>Incapacidad</option>
      <option>Vacaciones</option>


      
      </select>
      <br/>
      <textarea className="txtArea" placeholder="Motivo de la Justificacion"  onChange={v=>item.justi = v.target.value}></textarea> 
    </td> 
   
    <td>
      <input id="suplenciaCheck" type="checkbox"/>
      <div id="hidden">
    

                                                                                       {/* v=>{setSeleitect(v.target.value) */}
        <select className="selectName" onClick={forceUpdate}  onChange={v=>item.asis = v.target.value} >
          {unicos.map((item) => <option>{item}</option>)}

        </select>

      </div>
    </td>

   
   
   
   
   
    </tr>
    )


} 
else {


}

}
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



<p>El registro de la asistencia ha sido realizado con exito</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={close}>


Ok


  </Button>


</Modal.Footer>


</Modal>



  

<p id="dia"></p>

<div class = "btn-groupp">



<input class="btn btn-success" type="submit" value="Guardar" onClick={show}  id="btt"></input>

<input class="btn btn-secondary"  type="submit" value="Regresar al Calendario" onClick={mostrarCalendario} id="bt2"></input>


</div>    

</div>     



// F I N    D E L    S E G U N D O    D I V



}


</div>


    )
    

}


export default CalendarioO;
