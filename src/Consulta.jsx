import {React,useState,useLayoutEffect,useCallback,updateState} from "react";
import {get, getDatabase,ref,child,update} from "firebase/database";
import './Firebase init'
import Loading from "./Loading";
import SidebarPro from "./SidebarResponsive";
import './Consulta.css'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';


const Consulta = (consulta) => {

    const [show,setShow] = useState([])

    function showPage2 () {
        setShow(false)
    }

    function showPage1 () {
        setShow(true)
    }





    const [loading,setLoading] = useState(false)


    const forceUpdate = useCallback(() => updateState({}), []);  

    const [operador,setOperador] = useState([])
    const [datos,setDatos] = useState([])

    console.log("Datos:",datos)

    const [nombre,setNombre] = useState('')
    const [cliente,setCliente] = useState('')
    const [ubicacion,setUbicacion] = useState('')
    const [dias,setDias] = useState('')
    const [ingreso,setIngreso] = useState('')
    const [baja,setBaja] = useState('')
    const [puesto,setPuesto] = useState('')
    const [telefono,setTelefono] = useState('')
    const [motivo,setMotivo] = useState('')
    const [reasig,setReasig] = useState([])



    const [selClient,setSelCliente] = useState('')

    const dbRef = ref(getDatabase());

    const unicName = []

    operador.forEach((x)=>{
        if(!unicName.includes(x)){
            unicName.push(x)
        }
    })

    unicName.sort((a,b)=>{
        if (a < b) return -1;
        if (a > b) return 1

        return 0;
    })


    function eventChange() {
        datos.forEach((x)=>{
            if (x.Nombre == selClient) {
                setNombre(x.Nombre)
                setCliente(x.Cliente)
                setUbicacion(x.Ubicacion)
                setPuesto(x.Puesto)
                setDias(x.Dias)
                setIngreso(x.Ingreso)
                setBaja(x.Baja)
                setTelefono(x.Telefono)
                setMotivo(x.MBaja)
                reasig.push(x.Reasignaciones)

                
            }
        })
    }

        

   




    get(child(dbRef,'Operador')).then((snapshot)=>{
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot)=>{

                var cl = childSnapshot.child("Cliente").val()
                var ubic = childSnapshot.child("Ubicacion").val()
                var name = childSnapshot.child("Nombre").val()
                var days = childSnapshot.child("Dias").val()
                var state = childSnapshot.child("Estatus").val()
                var fb = childSnapshot.child("Fecha_Baja").val()
                var fi = childSnapshot.child("Fecha_Ingreso").val()
                var hr = childSnapshot.child("Horario").val()
                var puesto = childSnapshot.child("Puesto").val()
                var id = childSnapshot.child("ID").val()
                var MBaja = childSnapshot.child("Motivo_Baja").val()
                var reasignaciones = childSnapshot.child("Reasignaciones").val()
                
                datos.push({Cliente:cl,
                    Ubicacion:ubic,
                    Nombre:name,
                    Dias:days,
                    Estado:state,
                    Baja:fb,
                    Ingreso:fi,
                    Horario:hr,
                    Puesto:puesto,
                    Telefono:id,
                    MBaja:MBaja,
                    Reasignaciones:reasignaciones})
                
                    if (name != "Vacante") {
                        operador.push(name)
                    }

                    
             

            })
        }
    })

    setTimeout(()=>{
        setLoading(false)
        
    },500)

    if (loading) {
        return(<Loading/>)
    }


    

    function change () {

        if (selClient == "") {
            console.log("Te la pelaste")
        }
        else {
            setLoading(true)
            eventChange()
            showPage2()
        }
        
    }

    
    function back() {
        showPage1()
    }



    return (


        <div className="fullConsult">
            {
                show?
                

                <div id="consultPage1">

            <SidebarPro>

            </SidebarPro>

            <h1 id="headerConsult"> Consulta de datos</h1>
            
            <div id="containerConsult1">
                
                

                <br/>

                <Autocomplete
                
                options={unicName}
                sx={{width:300}} 
                renderInput={(params) => <TextField {...params} label="Nombre" />}
                value={selClient}
                onChange={(_event,value)=>{setSelCliente(value)}}
                
                // onChange={v=>item.suplencia = v.target.value}
                autoSelect={true}
                id="autocompleteCl"
                noOptionsText="Sin coincidencias"
                />

                <br/>
                
                <input class="btn btn-success" type="submit" value="Siguiente" onClick={change}></input>


            </div>

           
                </div>

:


           

            <div id="consultPage2">

                <SidebarPro></SidebarPro>

               <h1 id="headerConsult2">Datos de {selClient}</h1>

               <div id="containerConsult2"> 

                

                <table id="tableConsult">
                    <tr>
                        <th>

                <label class="form-outline-label">Nombre</label>
                <br/>
                <input class="form-control" type="text" value={nombre}></input>
                <br/>

                <label class="form-outline-label">Número</label>
                <br/>
                <input class="form-control" type="text" value={telefono}></input>
                <br/>

               <label class="form-outline-label">Cliente</label>
               <br/>
               <input class="form-control" type="text" value={cliente}></input>
                <br/>

               <label class="form-outline-label">Ubicación</label>
               <br/>
               <input class="form-control" type="text" value={ubicacion}></input>

               </th>
                        <th>
                        <label class="form-outline-label">Puesto</label>
               <br/>
                <input class="form-control" type="text" value={puesto}></input>
                <br/>

               <label class="form-outline-label">Días</label>
               <br/>
               <input class="form-control" type="text" value={dias}></input>
                <br/>

               <label class="form-outline-label">Fecha de Ingreso</label>
               <br/>
               <input class="form-control" type="text" value={ingreso}></input>
                <br/>

               <label class="form-outline-label">Fecha de Baja</label>
               <br/>         
               <input class="form-control" type="text" value={baja}></input>
                <br/>
                        </th>
                    </tr>
                </table>
         
               
                <br/>

                <label class="form-outline-label">Reasignaciones</label>
                <br/>
                <textarea value={reasig}></textarea>

                <br/>

              
                <label class="form-outline-label">Motivo de la baja</label>
                <br/>
                <textarea class="form-control" type="text" value={motivo} id="mBajaConsult" />

                <br/>
                <br/>

                

           

               <input type="submit" class="btn btn-primary" id="btnConsult2" value="Regresar" onClick={back}></input>

               <br/>
                   
               </div>


            </div>

    }
        </div>

    )


}

export default Consulta;