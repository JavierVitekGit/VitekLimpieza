import {React,useState,useCallback,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import { initializeApp } from "@firebase/app";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './Turno.css'
import SideBarO from "./SideBarO";
import Autocomplete from "./Autocomplete";


const TurnoOlga = (turno) =>{


  const [autocomplete,setAutocomplete] = useState('')

  console.log("AutoComplete::::",autocomplete)

  // D I A S  C H E C K B O X

  const [lun,setLun] = useState ('')
  const [mar,setMar] = useState('')
  const [mier,setMier] = useState('')
  const [juev,setJuev] = useState('')
  const [vier,setVier] = useState('')
  const [sab,setSab] = useState('')
  const [dom,setDom] = useState('')


  var today = new Date()

  var substr = today.toISOString()

  var sub = substr.substring(0,10)



  var arrayd = [];


  const [arrayR,setArrayR] = useState([]);

  const rfcN = [];

  arrayR.filter((item)=>{
    if (item.rfc.length == 13) {
      rfcN.push(item.rfc)
    }
  })

  console.log("NHYIX",rfcN)
 

  arrayd.push(lun,mar,mier,juev,vier,sab,dom)

  var arrayc = arrayd.filter(Boolean);

  console.log(arrayc)

    var arrayM = [];

    arrayM.push(lun + "," ,mar + ",",mier + ",",juev + ",",vier + ",",sab + ",",dom)


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




    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []); 




    
    const[modal,setModal] =useState(false)

    const handleShow = () => setModal(true)
  
    const handleClose = () => setModal(false)


    const [mod,setMod] = useState(false)
    const show = () => setMod(true)
    const close = () => setMod(false)

 const unicos = [];

    
    function comprobar (event) {
        event.preventDefault()

        if (name == "" || client == "" || name =="Seleccionar Operador" || client== "Seleccionar Cliente"){
            show(event)
        } else {
           
            handleShow(event);
        }
        
    }


// A R R A Y

    const [arrayClientCl,setArrayClientCl] = useState([]);
    const [arrayNamae,setArrayNamae] = useState([]);
    

    const [shift,setShift] = useState([])



    const [operador,setOperador] = useState([])
    const [name,setName] = useState('')
    const [client,setClient] = useState('')
    const [hr,setHr] = useState('')

    

    const [namee,setNamee] = useState('')

    const db = getDatabase();


    function writeTurnoData(event){
        event.preventDefault()

        update(ref(db,'shift/' + client.substr(0,2) + name.substr(0,2)),{
            cliente:client,
            horaFin:"00:00",
            horaInicio:hr
        });
    }


    function writeOperadorData(event){
        event.preventDefault()

        update(ref(db,'Operador/' + name.substr(0,5) + client.substr(0,5) + hr.substr(0,2)),{
            Cliente:client,
            Nombre: namee,
            Horario:hr,
            Estatus:1,
            Días: arrayc,
            Fecha_Ingreso: sub
        })

    }


 

    const handlerEvent = function (e) {
        const opcion = e.target.value
        setName(e.target.value)
    


    operador.forEach(v=>{
        if (v.nm == opcion) {
            setNamee(v.key)
        }
    })
}


  const nombrecitos = [];

  arrayClientCl.forEach((item)=>{
    if (!nombrecitos.includes(item)){
      nombrecitos.push(item)
    }
  })

  nombrecitos.sort()

    shift.forEach((item)=>{
        if (!unicos.includes(item.key)){
          unicos.push(item.key)
        }

      });
  
      

      

    useEffect(()=>{

      arrayNamae.push("");



        

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

      const dbRef = ref(getDatabase());

    
      get(child(dbRef,'Operador')).then((snapshot)=>{
        operador.push({key:"Seleccionar Operador",nm:"",cl:""})

          if(snapshot.exists()){
              snapshot.forEach((childSnapshot)=>{
                  var sup = childSnapshot.child("Supervisor").val()
                  var nombre = childSnapshot.child("Nombre").val()
                  var cliente = childSnapshot.child("Cliente").val()
                  var rfc = childSnapshot.key
                  operador.push({nm:nombre,cl:cliente,key:rfc})

                  if(sup=="Olga") {
                    arrayClientCl.push(cliente)
                    arrayNamae.push(nombre)
                  }

        
                  arrayNamae.sort()

                  arrayR.push({rfc:rfc})

                console.log(rfc)

              })


            //   arrayClientCl.forEach((other => {
            //     operador.forEach(iter => {
            //       if (iter.cl == other){
            //           arrayNamae.push(iter.nm)
  
            //           console.log("Lourdes:",arrayNamae)  

            //           arrayNamae.sort()
            //       }
            //   })
            // }))


          }
      })

       

  console.log("ARRAY R",arrayR)


      get(child(dbRef,'shift')).then((snapshot)=>{
          shift.push({key:"Seleccionar Cliente"})
          if(snapshot.exists()){
              snapshot.forEach((childSnapshot)=>{
                  var cliente = childSnapshot.child("cliente").val()

                  shift.push({key:cliente})
              })
          }
      })


    },[])

    function validate (event) {
      event.preventDefault()

      handleClose(event);
      writeTurnoData(event);
      writeOperadorData(event);
    }




return(




<div className="turn">

<div className="SideOlgaB">
            <SideBarO/>
            
            </div>

<div className="header-turn"> 

<h1 id="añadir">Añadir nuevo turno</h1>

</div>




    <div className="container-turn">
        <label class="form-outline-label">Nombre del Operador</label>
        <br/>
        <select onClick={forceUpdate} value={name} onChange={v=> setName(v.target.value),handlerEvent}> 
         {arrayNamae.map((item)=> <option>{item}</option>)}
        </select>

        <br/>


        <input type="text" class="form-comtrol" value={namee} placeholder="CURP del Operador" ></input>

        <br/>

        <label class="form-outline-label">Nombre del Cliente</label>
        <br></br>
        <select onClick={forceUpdate} value={client} onChange={v=> setClient(v.target.value)} id="sLTCas">
        {nombrecitos.map((item,i)=> <option>{item}</option>)}
        </select>


        <br/>

        {

        <Autocomplete userInput={autocomplete} suggestions={nombrecitos}>
          
        </Autocomplete>
}

<br/>


        <label class="form-outline-label">Días a laborar </label>

        <br/>

       
        <br/>   


        <div className="dias">

        
        <input type="checkbox" id="LTC" onClick={checkboxval}  onChange={v=> setLun(v.target.value)} /> <h1 id="luntcheck">Lunes</h1> 

        <div className="martt">
        <input type="checkbox" id="MTC" onClick={checkboxval} onChange={v=>setMar(v.target.value)} /> <h1 id="martcheck">Martes</h1> 
        </div>

        <div className="mierct">
        <input type="checkbox" id="MITC" onClick={checkboxval} onChange={v=>setMier(v.target.value)} /> <h1 id="miertcheck">Miércoles</h1> 
        </div>

        <div className="juevt">
        <input type="checkbox" id="JTC" onClick={checkboxval} onChange={v=>setJuev(v.target.value)} /> <h1 id="juevtcheck">Jueves</h1> 
        </div>

        <div className="viert">
        <input type="checkbox" id="VTC" onClick={checkboxval} onChange={v=>setVier(v.target.value)} /> <h1 id="viertcheck">Viernes</h1>
        </div>

        <div className="sabt">
        <input type="checkbox" id="STC" onClick={checkboxval} onChange={v=>setSab(v.target.value)} /> <h1 id="sabtcheck">Sábado</h1>
        </div>

        <div className="domt">
        <input type="checkbox" id="DTC" onClick={checkboxval} onChange={v=>setDom(v.target.value)} /> <h1 id="domtcheck">Domingo</h1>
        </div>

        </div>



        <div className="horarioSec">

        

        <br />

        <label id="hrL" class="form-outline-label">Horario</label>



      

        <br />


        <br/>
        <select value={hr} onChange={v=> setHr(v.target.value)}> 
            <option>Matutino</option>
            <option>Vespertino</option>
        </select>

        
        </div>

        
        <br></br>
       

   <input class="btn btn-success" type="submit" value="Añadir turno" onClick={comprobar} ></input>


        
    </div>

    <Modal className="modal-container" 
      show={modal}  
      onHide={handleClose } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...turno}
      size="lg"
      aria-labelledby="contained-modal-title-VTCenter"
      centered>


<Modal.Header>


<Modal.Title>¿Está Seguro?</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>¿Está seguro que desea añadir un nuevo turno a "{namee}"" con el cliente "{client}" los dias "{arrayM}" en un horario de "{hr}"</p>


</Modal.Body>


<Modal.Footer>

{/* handleClose,writeTurnoData,writeOperadorData */}

    <Button variant="success" onClick={validate}>
    Si
    </Button>


  <Button variant="danger" onClick={handleClose}>


    No


  </Button>


</Modal.Footer>


</Modal>



<Modal className="modal-container" 
      show={mod}  
      onHide={close } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...turno}
      size="lg"
      aria-labelledby="contained-modal-title-VTCenter"
      centered>


<Modal.Header>


<Modal.Title>Los datos son incorrectos</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>No se han seleccionado todos los datos necesarios</p>


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


export default TurnoOlga;