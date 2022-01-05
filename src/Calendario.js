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
import {getDatabase,ref,child,get,update} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'




const Calendario = (calendario) => {


// C A L E N D A R I O





  const [mostrar,setMostrar] = useState([])

  const [infinite,setInfinite] = useState(new Date())

  // var infiniteF = infinite.getDate

  // console.log(infiniteF)
  
  
    var today = new Date();
    var hora = today.getHours() 

    console.log(today)

    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    formatRelative(subDays(new Date(), 3), new Date(), { locale: es })


    var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15);
    formatRelative(subDays(new Date(), 3), new Date(), { locale: es })
  
    const cal = () => {
      let calendario = infinite
      document.getElementById("dia").innerHTML = calendario;

    }


    
    console.log(infinite.toISOString())

    console.log("ISO STRING",infinite.toISOString().substr(0,10))


    
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



// A L F A B E T I C A M E N T E 


    tabla.forEach((item)=>{
      if (!alfabeticamente.includes(item.cliente)){
        alfabeticamente.push(item.cliente)
      }
    })
  
    
  
    console.log(tabla.sort())


    const [domicilio,setDomicilio] = useState('')
    const [nombre,setNombre] = useState('')
    const [turno,setTurno] = useState('')
    const [asis,setAsis] = useState('')
    const [just,setJust] = useState('')

    const [val,setVal] = useState('')
    
    
    const [map2,setOperador] = useState([ ])
  
  
    const [hr,setHr] = useState([])
    const [cliu,setCliu] = useState([])

  
  
    const [name2,setN] = useState('')
  
  
    const db = getDatabase();

  
 
    
  //Jala Normal
  
    // function writeAsistenciaData(event) {
    //   event.preventDefault()  
      
    //   update(ref(db,'Asistencia/' + infinite),{
    //     Ubicación_Cliente: tabla,
    //     Nombre: nombre,
    //     Turno: turno,  
    //     Fecha: infinite,
    //     Asistencia: asis,
    //     Justificación: just
    //   })    
  
  
  
    // };


    // Prueba

    function writeAsistenciaData(event) {
      event.preventDefault()
      
      var aux = [];
      tabla.forEach(iter => {
        if (iter.asis == 'Asistencia') {
          aux.push(iter);
        }
      });


    
      
      // guarda alv
      update(ref(db,'Justificaciones/' + infinite.toISOString().substr(0,10)),{
        Datos : aux
      })    
  
    };

 

    function writePersonalData(event){
      event.preventDefault()

      update(ref(db,'ClienteUbicacion/'),{

      })
    };
    
    
 
  
    useEffect(()=> {
  
      
  
      tabla.forEach(v=>{
        setDomicilio (v.dom)
        setNombre(v.nom)
        setTurno(v.turn)
        setAsis(v.asis)
        setJust(v.justi)
        setN(v.nameOp)
        setHr(v.sh)
        setCliu(v.clienteU)
        setVal(v.val)
      })

      


     
  
  
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
  
  
  
  // R E F E R E N C I A   BD   "C L I E N T E S"
    
    const dbRef = ref(getDatabase());
    get(child(dbRef,'Clientes')).then((snapshot) => {
      if(snapshot.exists()){
        snapshot.forEach((childSnapshot)=>{
  
          var domicilio = childSnapshot.child("Domicilio").val()
          var nombreC = childSnapshot.child("Nombre").val()
          var turnoC =  childSnapshot.child("Horario").val()
          var cl = childSnapshot.child("Nombre").val()
          var id = childSnapshot.key;
  


          // tabla.push({dom:domicilio,nom:nombreC,turn:turnoC,nombre:cl,parent:id})
          console.log(tabla)
          console.log(id)
          
        })
      }
    })
  

  
  // R E F E R E N C I A  BD   "O P E R A D O R"


  
    get(child(dbRef,'Operador')).then((snapshot)=>{
      if(snapshot.exists()){
        snapshot.forEach((childSnapshot)=>{
          var operador = childSnapshot.child("Nombre").val()
          var cliente = childSnapshot.child("Cliente").val()
          var hr = childSnapshot.child("Horario").val()
          var estus = childSnapshot.child("Estatus").val()
          var fecha = childSnapshot.child("Fecha_Ingreso").val()
          tabla.push({cliente:cliente,nameOp:operador,hor:hr,estatus:estus,fi:fecha,asis:null, justi:null })
          console.log(fecha)
        })
       
      }
    })




// R E F E R E N C I A   BD  "T U R N O S"    

get(child(dbRef,'shift')).then((snapshot)=>{
  if(snapshot.exists()){
    snapshot.forEach((childSnapshot)=>{
      var shift = childSnapshot.child("horaInicio").val()
      var scliente = childSnapshot.child("cliente").val()
      var hrf = childSnapshot.child("horaFin").val()

      hr.push({sh:shift,scl:scliente,hf:hrf,asis: null, justi: null})

   

      
    })

    
    // tabla.forEach(iter => {
    //   hr.forEach(other => {
    //     if (iter.cliente == other.scl || other.sh == iter.hora) {
    //       other.hf = iter.nameOp
    //     }

    //   })
    // })

    // tabla.forEach(iter =>{
    //   hr.forEach(other =>{
    //     if (iter.cliente == other.scl || other.sh == iter.hora){
    //       other.hf = iter.nameOp
    //     }
    //   })
    // })



  }
})  


// R E F E R E N C I A   BD  "U B I C A C I Ó N  C L I E N T E"


// get(child(dbRef,'ClienteUbicacion')).then((snapshot)=>{
//   if(snapshot.exists()){
//     snapshot.forEach((childSnapshot)=>{
//       var cu = childSnapshot.key;
//       var p = childSnapshot.child("personal").val()
//       tabla.push({clienteU:cu,per:p})
      

//     })

//   }
// })




get(child(dbRef,'Operador')).then((snapshot)=>{
  if(snapshot.exists()){
    snapshot.forEach((childSnapshot)=>{
      var baja = childSnapshot.child("Fecha_Baja").val()
     
    })
  }
})

   
    
  },[])


//   M O D A L  





  const[modal,setModal] =useState(false)

  const handleShow = () => setModal(true)

  const handleClose = () => setModal(false)




  const [mod,setMod] = useState(false)
  const show = () => setMod(true)
  const close = () => setMod(false)


  function comprobar (event) {
    event.preventDefault()


// for each





    // "Funciona bien"


    tabla.forEach(com => {
      if (com.asis == "Asistencia") {
        if (com.justi == null) {
          handleShow(event);
        } else {
          show(event);
          writeAsistenciaData(event)
        }
      }
    })





    

  }



    
//     R  E  N  D  E  R  
  







    return(



      <div id="all">
{

mostrar?






// P R I M E R    D I V 







<div className="Calendario" id="inf">

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


</div>









// F I N    D E L     P R I M E R    D I V





:  





// S E G U N D O   D I V





<div className="Background" id="Registro"  >

  <div className="regIH">

<h1 id="head">
  <i id="calendarX" class="bi bi-calendar-x"></i>
  Justificaciones
  </h1>
</div>
<div className="tab">
<div className="scroll">
<table class="table table-striped" id="Tabla">
<thead class="table-dark">
<tr id="headertab">
  <th scope="col">Cliente/Ubicación</th>
  <th scope="col">Nombre Operador</th>
  <th scope="col">Turno</th>
  <th scope="col"> {infinite.toISOString().substr(0,10)}</th>

</tr>
</thead>
<tbody className="test" >



{ tabla.map((item)=> 




{
  
  if (hora >= item.hor.substr(0,2) && item.estatus == 1  && item.fi <= infinite.toISOString().substr(0,10)  ) {
    
    

    return (

    <tr>

    <td onChange={setNombre} >
      
       {item.cliente}
      
    </td>
    <td>{item.nameOp}</td> 
    <td>{item.hor}</td> 
   

   
    <td>
      <select  onChange={v=> item.asis = v.target.value}  >
      <option>Inasistencia</option>
      <option>Asistencia</option>


      
      </select>
      <br/>
      <textarea placeholder="Motivo de la asistencia"  onChange={v=>item.justi = v.target.value}></textarea> 
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

</div>
</div>



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



<input class="btn btn-success" type="submit" value="Guardar" onClick={comprobar} id="btt"></input>

<input class="btn btn-secondary" type="submit" value="Regresar al Calendario" onClick={mostrarCalendario} id="bt2"></input>


</div>    

</div>     



// F I N    D E L    S E G U N D O    D I V



}


</div>


    )
    

}


export default Calendario
