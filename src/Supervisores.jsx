import SidebarPro from './SidebarResponsive';

import {React,useState,useLayoutEffect,useCallback} from "react";
import { child, get, getDatabase, ref } from 'firebase/database';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';



const Supervisores = (supervisores) => {



const dbRef = ref(getDatabase())


const [, updateState] = useState();
const forceUpdate = useCallback(() => updateState({}), []);  

const [datos,setDatos] = useState([])

const [client,setClient] = useState([])


const [selClient,setSelClient] = useState('')






const [supA,setSupA] = useState([])

datos.forEach((item)=>{
    if(!client.includes(item.Cliente)){
        client.push(item.Cliente)
    }
})

const ubicA = []

datos.forEach((item)=>{
    if(item.Cliente == selClient){
        ubicA.push(item.Ubicacion)
    }
})






useLayoutEffect(()=>{



get(child(dbRef,'ClienteUbicacion')).then((snapshot)=>{
    if(snapshot.exists()){
        snapshot.forEach((childSnapshot)=>{
            var cl = childSnapshot.child("Nombre").val()
            var ubic = childSnapshot.child("Ubicacion").val()
            var sup = childSnapshot.child("Supervisor").val()

            

            datos.push({Cliente:cl,Ubicacion:ubic,Supervisor:sup})



        })
    }
})


},[])

    


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
        <select onClick={forceUpdate} >
         {ubicA.map((item)=><option>{item}</option>)}
        </select>

        <br/>

       


        <label class="form-outline-label">Supervisor a reasignar</label>
        <br></br>
        <select>


        </select>

        <br/>

       

        <br/>

        <input class="btn btn-success" type="submit" value="Completar Reasignación"></input>


        


    </div>

   







    
    </div>






)

}

export default Supervisores