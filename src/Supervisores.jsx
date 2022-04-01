import SidebarPro from './SidebarResponsive';

import {React,useState,useLayoutEffect,useCallback} from "react";
import { child, get, getDatabase, ref, update } from 'firebase/database';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const Supervisores = (supervisores) => {



const dbRef = ref(getDatabase())


const [modal,setModal] = useState(false)

const viewModal = () => setModal(true)
const closeModal = () => setModal(false)


const [mod,setMod] = useState(false)

const viewMod = () => setMod(true)
const closeMod = () => setMod(false)


const [, updateState] = useState();
const forceUpdate = useCallback(() => updateState({}), []);  

const [datos,setDatos] = useState([])

const [selSup,setSelSup] = useState ('')


const client = []

client.push('')

const [selClient,setSelClient] = useState('')

const [selUbic,setSelUbic] = useState('')



datos.forEach((item)=>{
    if(!client.includes(item.Cliente)){
        client.push(item.Cliente)
    }
})

const ubicA = []

ubicA.push('')

datos.forEach((item)=>{
    if(item.Cliente == selClient){
        ubicA.push(item.Ubicacion)
    }
})


const [supA,setSupA] = useState([])


const arraySup = []

arraySup.push('')

supA.forEach((item)=>{
    if(!arraySup.includes(item)){
        arraySup.push(item)
    }
})


function finish (event) {
    event.preventDefault()

    write(event)
    closeMod();
}


function comprobar (event){
    event.preventDefault()

    if(selClient == "" || selUbic == "" || selSup == ""){
        viewModal(event);
    } else {
        viewMod(event);
    }

}

function write (event) {
event.preventDefault()

update(ref(db,'ClienteUbicacion/' + selClient + selUbic ),{
    Supervisor: selSup
})

}



useLayoutEffect(()=>{



get(child(dbRef,'ClienteUbicacion')).then((snapshot)=>{
    if(snapshot.exists()){
        snapshot.forEach((childSnapshot)=>{
            var cl = childSnapshot.child("Nombre").val()
            var ubic = childSnapshot.child("Ubicacion").val()
            var sup = childSnapshot.child("Supervisor").val()
            var key = childSnapshot.key
            

            datos.push({Cliente:cl,Ubicacion:ubic})
            supA.push(sup)


        })
    }
})
console.log("SUP",supA)

},[])

const db = getDatabase();
    


return(

    <div className="reasignacion">

<div className="adminSide">
            <SidebarPro></SidebarPro>
            
            </div>    

      <div className="roH">

        <h1 id="roHT" >
        <i id="ri" class="bi bi-arrow-down-up"></i>
          Reasignacion de supervisor
          </h1>

        </div>

        <div className="divR"></div>

    <div className="container">


        <label id="rfcL" class="form-outline-label">Cliente</label>

        <br />

        {/* <Autocomplete
          onClick={forceUpdate}
          options={unicClient}
          sx={{width:300}} 
          renderInput={(params) => <TextField {...params} label="Clientes" />}
          value={selClient}
          onChange={(_event,value)=>{setSelClient(value)}}
          // onChange={v=>item.suplencia = v.target.value}
          autoSelect={true}
          id="autocompleteCl"
          noOptionsText="Sin coincidencias"
          /> */}

          <select onClick={forceUpdate} value={selClient} onChange={v=>setSelClient(v.target.value)}>
              {client.map((item)=> <option>{item}</option>)}
          </select>

          <br/>
     
          <label class="form-otline-label">Ubicación</label>
        <br/>
        <select onClick={forceUpdate} value={selUbic} onChange={v=>setSelUbic(v.target.value)}>
         {ubicA.map((item)=><option>{item}</option>)}
        </select>

        <br/>

       


        <label class="form-outline-label">Supervisor a reasignar</label>
        <br></br>
        <select onClick={forceUpdate} value={selSup} onChange={v=>{setSelSup(v.target.value)}}>
            {arraySup.map((item)=><option>{item}</option>)}
        </select>

        <br/>

       

        <br/>

        <input class="btn btn-success" type="submit" value="Completar Reasignación" onClick={comprobar}></input>


        


    </div>

   

    <Modal className="modal-container" 
      show={modal}  
      onHide={closeModal } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...supervisores}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Faltan datos</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>No se han proporcionado todo los datos</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={closeModal}>


Ok


  </Button>


</Modal.Footer>


</Modal>





<Modal className="modal-container" 
      show={mod}  
      onHide={closeMod} 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...supervisores}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>¿Está Seguro?</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>¿Está seguro que desea continuar con la reasignacion de supervisor del cliente "{selClient + "" + selUbic}" a el supervisor "{selSup}"</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="success" onClick={finish}>
Si
  </Button>

  <Button variant="danger" onClick={closeMod}>
      No
  </Button>

</Modal.Footer>


</Modal>


    
    </div>






)

}

export default Supervisores