import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import "./BajaOperador.css"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SideBarF from "./SideBarF";
import { useEffect } from "react";



const BajaOperadorF = (baja) => {
    var a=0

  

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);  

    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    var minInp = lastWeek.toISOString().split('T')[0]

    var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    var maxInp = nextWeek.toISOString().split('T')[0]

    const [datos,setDatos] = useState ([])
    const [tel,setTel] = useState ('')
    const [nombre,setNombre] = useState ('')
    const [fechaI,setFechaI] = useState ('')
    const [fechaB,setFechaB] = useState ('')
    const [cliente,setCliente] = useState ('')
    const [unicos,setUnicos] = useState ([])


    const [arrayClientCl,setArrayClientCl] = useState([]);
    const [arrayNamae,setArrayNamae] = useState([]);
   

    const [bajaOp,setBajaOp] = useState('')


    const handlerNombres = function (e) {
        const opcion = e.target.value
        setTel(e.target.value)
        console.log("### "+ tel)
        console.log("$$$" + opcion)
  
        
  
         datos.forEach (v=>{
           if (v.name == opcion) {
             console.log(v.tel,opcion)
             setNombre(v.key) 
             setFechaI(v.fi)
             setFechaB(v.fb)    
             setCliente(v.cl)
           }
         })
  
      }


      function writeBajaData(event) {
        event.preventDefault()

        update(ref(db,'Operador/' + tel),{
          Estatus:0,
          Fecha_Baja:bajaOp
        })

        close();
      }


      useLayoutEffect(()=>{

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
          "TelcelLeonIXViaAlta")
  
            arrayClientCl.sort();
  

        datos.push({tel:"Seleccionar Teléfono",name:"",fi:"",fb:"",cl:""})

        const dbRef = ref(getDatabase());
        get(child(dbRef,'Operador')).then((snapshot) => {
          if(snapshot.exists()){
            snapshot.forEach((childSnapshot)=>{
              var telefono= childSnapshot.child("ID").val()
              var nombre = childSnapshot.child("Nombre").val()
              var fechaIngreso = childSnapshot.child("Fecha_Ingreso").val()
              var cliente = childSnapshot.child("Cliente").val()
              var id = childSnapshot.key;
              
              
             datos.push({tel:telefono,name:nombre,fi:fechaIngreso,key:id,cl:cliente}) 
              
            })
            
           
            arrayClientCl.forEach((other => {
              datos.forEach(iter => {
                if (iter.cl == other){
                    arrayNamae.push(iter.name)

                    console.log("Lourdes:",arrayNamae)
                    arrayNamae.sort()
                }
            })
          }))

         
          }
        })

       


      },[])

      const db = getDatabase();


      const[modal,setModal] =useState(false)

    const handleShow = () => setModal(true)
  
    const handleClose = () => setModal(false)


    const [mod,setMod] = useState(false)
    const show = () => setMod(true)
    const close = () => setMod(false)
    

    function comprobar (event) {
      event.preventDefault()
      


    if (tel == "" || bajaOp == "" ) {
      handleShow(event);
      
    } else{
      show(event)
      
    
    }

  }








console.log("Datos:", datos)


console.log("Unicos;",unicos)

return(



<div className="Baja">

<div className="SideOlgaBb">
            <SideBarF/>
            
            </div>

  <div className="boH">

    <h1 className="bajaOH">
    <i id="cellBO" class="bi bi-telephone-x"></i>
      Baja del Operador Fatima
    
    </h1>

    </div>
<div className="Bodyy">




<label id="rfcT" class="form-outline-label" for="form1">Nombre</label>

<br></br>



<select  onClick={forceUpdate} value={tel} onChange={handlerNombres}> 
{arrayNamae.map((item) => <option value={item}>{item}</option> )}
</select> 

<br></br>




<label class="form-outline-label" for="form1">R.F.C</label>
  <br/>
<input type="text"  class="form-control" value={nombre} ></input>


<div className="fechaIngresoOp">


<label class="form-outline-label" for="form1">Fecha de Ingreso</label>
  <br/>
<input type="text"  class="form-control" value={fechaI} ></input>

</div>

<div className="fechaBajaOp">

<label class="form-outline-label" id="fbO" for="form1">Fecha de Baja</label>
<br/>
<input type="Date" id="inputdis" class="form-control" value={bajaOp} onChange={v=>setBajaOp(v.target.value)} min={minInp} max={maxInp} />

</div>



<label class="form-outline-label" for="form1">Cliente</label>
<br/>
<input type="text" class="form-control" value={cliente} />

<br></br>





<br></br>
            <br></br>

        <div class="btn-group">

        <input id="bajaOP" class="btn btn-danger" type="submit" value="Dar de Baja" onClick={comprobar} ></input>
        

        </div>

        </div>



        <Modal className="modal-container" 
      show={modal}  
      onHide={handleClose } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...baja}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Registro fallido</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>No se ha seleccionado ningun teléfono  </p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={handleClose}>


X


  </Button>


</Modal.Footer>


</Modal>





<Modal className="modal-c" 
      show={mod}  
      onHide={close } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...baja}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>¿Está seguro?</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>¿Está seguro que desea continuar con la baja del operador "{nombre}"?</p>


</Modal.Body>


<Modal.Footer>

<Button variant="success" onClick={writeBajaData}>
Si
  </Button> 


  <Button variant="danger" onClick={close}>


No


  </Button>


</Modal.Footer>


</Modal>

</div>

)

    
}

export default BajaOperadorF;