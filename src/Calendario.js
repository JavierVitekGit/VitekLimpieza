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

  console.log(mostrar)

  const [infinite,setInfinite] = useState(new Date())


  
  
    var today = new Date();
    var hora = today.getHours() 

    console.log(hora)

    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    formatRelative(subDays(new Date(), 3), new Date(), { locale: es })


    var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
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


  
  
    const [domicilio,setDomicilio] = useState('')
    const [nombre,setNombre] = useState('')
    const [turno,setTurno] = useState('')
    const [asis,setAsis] = useState('')
    const [just,setJust] = useState('')

    
    
    console.log(just)
    console.log(nombre)
    console.log(domicilio)
    console.log(turno)
  
    const [map2,setOperador] = useState([ ])
  
  
    const [drop1,setDrop] = useState('')
    const [drop2,setDrop2] = useState('')

  
  
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
      
      update(ref(db,'Asistencia/' + infinite),{
        Datos : tabla
      })    
  
  
  
    };
    
    
  
  
    useEffect(()=> {
  
      map2.forEach(v=>{
        setN(v.nameOp)
      })
  
  
      tabla.forEach(v=>{
        setDomicilio (v.dom)
        setNombre(v.nom)
        setTurno(v.turn)
        setAsis(v.asis)
        setJust(v.justi)
      })
     
  
  
    let config = {
      apiKey: "AIzaSyDnedHTB9yMEPhZTQDzI08rA7yDXAJq84I",
      authDomain: "vitek-c65e5.firebaseapp.com",
      databaseURL: "https://vitek-c65e5-default-rtdb.firebaseio.com",
      projectId: "vitek-c65e5",
      storageBucket: "vitek-c65e5.appspot.com",
      messagingSenderId: "1:180537252076:web:278e4849024501aaa52dc9",
      appId: "1:180537252076:web:278e4849024501aaa52dc9",
    };
  
    const app = initializeApp(config);
  
  
  
  
    
    const dbRef = ref(getDatabase());
    get(child(dbRef,'Clientes')).then((snapshot) => {
      if(snapshot.exists()){
        snapshot.forEach((childSnapshot)=>{
  
          var domicilio = childSnapshot.child("Domicilio").val()
          var nombreC = childSnapshot.child("Nombre").val()
          var turnoC =  childSnapshot.child("Horario").val()
          var cl = childSnapshot.child("Nombre").val()
  
          tabla.push({dom:domicilio,nom:nombreC,turn:turnoC,nombre:cl, asis: null, justi: null})
          console.log(tabla)
          
    


          
        })
  
  
        
      }
    })
  
  
  
  
    get(child(dbRef,'Operador')).then((snapshot)=>{
      if(snapshot.exists()){
        snapshot.forEach((childSnapshot)=>{
          var operador = childSnapshot.child("Nombre").val()
          var cliente = childSnapshot.child("Cliente").val()
          
          map2.push({nameOp:operador, cliente:cliente })
          console.log(map2)
  
        })




        tabla.forEach(iter => {
          map2.forEach(other => {
            if (other.cliente == iter.nom) {
              iter.nom = other.nameOp
            }
  
          })
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


    // tabla.forEach(com => {
    //   if (com.asis == "Asistencia" || com.justi == null) {
    //     handleShow(event); 
    //   } else{
    //     show(event)
    //     writeAsistenciaData(event)
        

    //   }

    // })



    // "El que jala perron"


    tabla.forEach(com => {
      if (com.asis == "Asistencia" && com.justi == null) {
        handleShow(event);
      } else{
        writeAsistenciaData(event)
      }
    })


    // Prueba 

    // tabla.forEach(com => {
    //   if (com.asis == "Asistencia" && com.justi == null) {
    //     handleShow(event);
    //   } else if (){
    //     writeAsistenciaData(event)
    //   }
    // })


    

  }



    
//     R  E  N  D  E  R  
  







    return(



      <div id="all">
{

mostrar?






// P R I M E R    D I V 







<div className="Calendario" id="inf">

<h1 id="he">
  Calendario
</h1>


<InfiniteCalendar id="Cal"  
width={1200}
height={600}
selected={false}
minDate={lastWeek}
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









// F I N    D E L     P R I M E R    D I V





:  





// S E G U N D O   D I V





<div className="Background" id="Registro"  >

<h1 id="head">Registro de Inasistencia</h1>



<table class="table table-bordered" id="Tabla">
<thead class="table-dark">
<tr>
  <th scope="col">Cliente/Ubicación</th>
  <th scope="col">Nombre Operador</th>
  <th scope="col">Turno</th>
  <th scope="col"> {infinite.toDateString().substr(3,12)}</th>

</tr>
</thead>
<tbody>



{ tabla.map((item,i)=> 



{
  if (hora >= item.turn.substr(0,2)) {



    return (

    <tr>

    <td onChange={setNombre} >
      
       {item.nombre}  
       <br/>
       {item.dom}
   
    </td>
    <td>{item.nom}</td>
    <td>{item.turn}</td> 
   

   
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
  
  else{
      
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


X


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


X


  </Button>


</Modal.Footer>


</Modal>

  

<p id="dia"></p>

<div class = "btn-group">



<input class="btn btn-success" type="submit" value="Guardar" onClick={comprobar} id="bt"></input>

<input class="btn btn-secondary" type="submit" value="Regresar al Calendario" onClick={mostrarCalendario} id="bt2"></input>


</div>    

</div>     






// F I N    D E L    S E G U N D O    D I V






}












</div>


    )
    

}



export default Calendario
