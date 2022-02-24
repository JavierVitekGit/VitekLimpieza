import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SideBar from './Sidebar.jsx'
import InfiniteCalendar, {withRange,Calendar} from 'react-infinite-calendar';
// import InfiniteCalendar, {
//     Calendar,
//     defaultMultipleDateInterpolation,
//     withMultipleDates,
//   } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { formatRelative, subDays} from 'date-fns'
import {es} from 'date-fns/locale'
import './Firebase init'
import './Quincena.css'


import { CSVLink, CSVDownload } from "react-csv";



const Quincena = (quincena) => {


    const [show,setShow] = useState([])

    function mostrarReporte () {
        setShow(false)
    }

    function mostrarCalendario() {
        setShow(true)
    }


// I N F I N I T E   C A L E N D A R

const [infinite,setInfinite] = useState ([])


console.log("Infinite:::",infinite)

var today = new Date();


var nextWeek = new Date(today.getFullYear(),today.getMonth(),today.getDate() + 15);

// A R R A Y S
    const trySnapshot = [];

    const ccSnapshotArr = [];

    const cccSnapshotArr = [];

    const stateArray = [];

    const [justificaciones,setJustificaciones] = useState ([]);


    const [fechas,setFechas] = useState([]);


    const [fechaT,setFechaT] = useState([]);


    console.log("FechaTable",fechaT)


    const [keyName,setKeyName] = useState ([]);


    const [date,setDate] = useState([]);




    console.log("BAJA && INGRESO:::", fechas)

    // F I R E B A S E

    const dbRef = ref(getDatabase());



    function checking () {






        get(child(dbRef,'Justificaciones/')).then((snapshot)=>{
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot)=>{


                    var state = childSnapshot.child("estado").val()
                    var key = childSnapshot.key;

           


                    var childName = childSnapshot.val()

    
                    var snap = snapshot.child("estado").val()
    
                    if (trySnapshot.length < 1) {
    
                    trySnapshot.push(snapshot.val())
    
                } 
    
                    childSnapshot.forEach((cSnapshot)=>{

                        var nameKey = cSnapshot.key

                        keyName.push(nameKey)
    
                    
    
                        var validateOne = cSnapshot.key
    
                


                        cSnapshot.forEach((ccSnapshot)=>{


    
                                ccSnapshot.forEach((cccSnapshot)=>{
                                    
    
    
                                    cccSnapshotArr.push(cccSnapshot.val())

                                    var validateTwo = cccSnapshot.child("clienteC").val()
                                    var nombr = cccSnapshot.child("name").val()
                                    var turn = cccSnapshot.child("hr").val()
                                    var incidenci = cccSnapshot.child("estado").val()
                                    var just = cccSnapshot.child("justi").val()
                                    var sup = cccSnapshot.child("suplencia").val()

    
                                    var state = cccSnapshot.child("estado").val()
    
    
                                    if (validateOne == validateTwo && state != null) {
                                        // date.push(key)
                                        justificaciones.push({
                                            Fecha:key,
                                            Cliente:validateTwo,
                                            Nombre:nombr,
                                            Turno:turn,
                                            Estado:incidenci,
                                            Justificacion:just,
                                            Suplencia:sup})
                                    }

                                    // if (state != null) {
                                    //     justificaciones.push(cccSnapshot.val())
    
                                    // }
    
                                    stateArray.push(state)
    
                                })
    
                                
    
                            var state = ccSnapshot.child("estado").val()
    
                            ccSnapshotArr.push(ccSnapshot.val())
    
            
    
                            
    
                        })
    
                    })
    
                   
    
                })
            }
        })
        
    
        get(child(dbRef,'Operador/')).then((snapshot)=>{
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot)=>{
                    var name = childSnapshot.child("Nombre").val()
                    var fechaI = childSnapshot.child("Fecha_Ingreso").val()
                    var fechaB = childSnapshot.child("Fecha_Baja").val()

                    fechas.push({Ingreso:fechaI,Baja:fechaB,Nombre:name})

                })


                justificaciones.forEach((item)=>{

                    fechas.forEach((iter)=>{

                        if(item.Nombre == iter.Nombre) {
                            fechaT.push({Ingreso:iter.Ingreso,Baja:iter.Baja})
                        }

                    })

                })



            }
        })




        // justificaciones.forEach((item)=>{
        //     justificaciones.push({fecha:date})
        // })



        console.log("Justificaciones",justificaciones)
        console.log("Fecha",date)


     

        setTimeout(()=>{
            mostrarReporte();
        },1500);



    }


    return(

        

        <div className="bodyReport">

        { show?

        <div classname="white">

            <div className="calQuincenaHeader">
                <h1>Calendario de Reporte Quincenal</h1>
            </div>
            
            <div className="divCalQuin"> 

            <InfiniteCalendar
            Component={withRange(Calendar)}
            selected={false}
            // selected={{
            //     start: new Date(2022, 2, 25),
            //     end: new Date(2022, 3, 12)
            // }}
            displayOptions={{
                showHeader: false
            }}
            />

            {/* <InfiniteCalendar
            Component={withMultipleDates(Calendar)}
            interpolateSelection={defaultMultipleDateInterpolation}
            selected={false}
            displayOptions={{
                showHeader: false
            }}
            /> */}

            

            </div>
            <br/>

            <input type="button" value="Obtener" onClick={checking}></input>
        </div>

        :

        <div className="reportShow">


    
            
            <div className="reportHeader"><h1>Reporte Quincenal</h1></div>
            
            
        

        <div classname="scrollTab">
            <table class="table table-striped" id="justTable">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Cliente/Ubicación</th>
                        <th scope="col">Nombre del Operador</th>
                        <th scope="col">Turno</th>
                        <th scope="col">Incidencia</th>
                        <th scope="col">Justificacion</th>
                        <th scope="col">Suplencia</th>
                        <th scope="col">Fecha Ingreso</th>
                        <th scope="col">Fecha de Baja</th>


                    </tr>
                </thead>

            <tbody>

                {justificaciones.map((item)=>
                {

                    return (

                        <tr>
                            <td>
                                {item.Fecha}
                            </td>

                            <td>
                                {item.Cliente}
                            </td>
                            <td>
                                {item.Nombre}
                            </td>
                            <td>
                                {item.Turno}
                            </td>
                            <td>
                                {item.Estado}
                            </td>
                            <td>
                                {item.Justificacion}
                            </td>
                            <td>{item.Suplencia}</td>
                            <td>
                                {fechaT.map((item)=>{item.Ingreso})}
                            </td>
                            <td>
                                {fechaT.map((item)=>{item.Baja})}
                            </td>
                        </tr>

                    )

                })}

            </tbody>


            </table>


        </div>

        <br/>

        <div classname="btnQuincena">

        <CSVLink data={justificaciones} filename={"Reporte Quincenal.csv"} className="btn btn-success" target="_blank">
            Generar Reporte
        </CSVLink>

        <input class="btn btn-primary" type="submit" value="Regresar al Calendario" onClick={mostrarCalendario}></input>

        </div>


        
        {/* <input class="btn btn-success" type="button" value="Generar Reporte" onClick={<CSVDownload data={justificaciones} target="ReporteQuincenal" />}></input> */}

        </div>
       


}


        </div>



        
    )





}

export default Quincena;