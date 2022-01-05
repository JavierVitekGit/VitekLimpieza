import {React,useState,useEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./Inasistencias.css"
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
import Calendar from 'react-calendar';



const Inasistencia = (inasistencia) => {

    const [datos,setDatos] = useState ([])


    const [comp,setComp] = useState ([])

    const [array,setArray] = useState ([])


    

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);  


      // C A L E N D A R I O


      


      // function reset () {
      //   array = []
      //   setInfinite()
      // }


      var ahora = new Date();
var milisegundos = ahora.getMilliseconds();
    
    
      const [mostrar,setMostrar] = useState([])

      const [infinite,setInfinite] = useState(new Date())

      var dia = infinite.toISOString().substring(8,10)

      var mes = infinite.toISOString().substring(5,7)

      var año = infinite.toISOString().substring(0,4)

      console.log("Fecha:",dia + "-" + mes + "-" + año)

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


      // F I R E B A S E






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

      function abcd () {
        obtener();
        
      }

      function regresar () {
        setArray([]);
        mostrarCalendario();
      }


      function obtener () {

     


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

              console.log("Operador:",datos)

            //   var aux = [];

            //   console.log("Validación:",aux)

              
              console.log("New Array",array,milisegundos)

              // setArray([])

              if (datos.length == 0) {
                handleShow();
              
              } else {

              for (var i = 0; i < comp.length; i++) {
                  var igual=false;
                   for (var j = 0; j < datos.length & !igual; j++) {
                       if(comp[i]['name'] == datos[j]['nombre']) 
                               igual=true;
                   }
                  if(!igual)array.push(comp[i]);
                  
              
                  setTimeout(() => {
                    mostrarRegistro();
                  }, 100);
              }
            }
          


          }
      })


      

}


// M O D A L

const[modal,setModal] =useState(false)

const handleShow = () => setModal(true)

const handleClose = () => setModal(false)




return(


    <div id="all2">

        {
            mostrar?

            <div className="Calendario" id="inf">

  <div className="calH">

<h1 id="he">
<i class="bi bi-calendar-x"></i>
  Inasistencias
</h1>

</div>
<div className="divCale"></div>

  <div className="containerCal">

<InfiniteCalendar className="Cal"  

width={1200}
height={500}
selected={infinite}
minDate={lastWeek}
maxDate={today}
onSelect={setInfinite}
locale={{
  locale:require('date-fns/locale/es'),
  headerFormat: 'dddd, D, MMM',
  weekdays:["Dom","Lun","Mar","Mier","Juev","Vier","Sab"],
  months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
  blank: 'Seleccione una fecha',
  todayLabel: {
    long:'Hoy',
    short:'Hoy'
  },
  weekdays: ["Lun","Mar","Mierc","Juev","Vier","Sab","Dom"]
}}
displayOptions={{
    showHeader:false}}

// theme={{
//   weekdayColor:"black",
//   }
//   }    
/>



<p id="txtcal"></p>
<p id="infiniteV"></p>

<br></br>



<input class="btn btn-success" type="submit" value="Ir al Registro" onClick={abcd} id="calbt"></input>

</div>


</div>





            :



            

<div> 

<div className="inasistenciaHeader">
  <h1 className="inasistenciaTitle">Lista de Inasistencias</h1>
</div>

<table class="table table-striped" id="tablaRegistro">
<thead class="table-dark">
<tr id="headertab">
  <th scope="col">Cliente/Ubicación</th>
  <th scope="col">Nombre Operador</th>
  <th scope="col">Turno</th>
 

</tr>
</thead>
<tbody className="testst" >


{array.map((item)=>


{

    if(hora >= item.hr.substr(0,2))

    { return (

    <tr>

    <td >
      
      {item.clienteC}
      
    </td>
    <td>
        {item.name}
    </td> 
    <td>
        {item.hr}
    </td> 
   

    

   
   
   
   
    </tr>
    )

} else {
  
}

}

    )}
<input class="btn btn-secondary" type="submit" value="Regresar al Calendario" onClick={regresar} id="btnRegistroIn"></input>
 
</tbody>

</table>





</div>






        }
        
        <Modal className="modal-container" 
      show={modal}  
      onHide={handleClose } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...inasistencia}
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


  <Button variant="danger" onClick={handleClose}>


Ok


  </Button>


</Modal.Footer>


</Modal>

 
    </div>





)

}


export default Inasistencia