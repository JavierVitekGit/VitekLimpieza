import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SideBar from './Sidebar.jsx'
import './Firebase init'
import './Quincena.css'

const Quincena = (quincena) => {


    const [show,setShow] = useState([])

    function mostrarReporte () {
        setShow(false)
    }

// A R R A Y S
    const trySnapshot = [];

    const ccSnapshotArr = [];

    const cccSnapshotArr = [];

    const stateArray = [];

    const [justificaciones,setJustificaciones] = useState ([]);


    // F I R E B A S E

    const dbRef = ref(getDatabase());

  

    function checking () {

        get(child(dbRef,'Justificaciones/')).then((snapshot)=>{
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot)=>{
    
                    childSnapshot.forEach((cSnapshot)=>{
    
                        
    
    
                        cSnapshot.forEach((ccSnapshot)=>{
    
                                ccSnapshot.forEach((cccSnapshot)=>{
                                    
    
    
                                    cccSnapshotArr.push(cccSnapshot.val())
    
                                    var state = cccSnapshot.child("estado").val()
    
    
                                    if (state != null) {
                                        justificaciones.push(cccSnapshot.val())
    
                                    }
    
                                    stateArray.push(state)
    
                                })
    
                                
    
                            var state = ccSnapshot.child("estado").val()
    
                            ccSnapshotArr.push(ccSnapshot.val())
    
            
    
                            
    
                        })
    
                    })
    
                    var state = childSnapshot.child("estado").val()
                    var key = childSnapshot.key;

                    console.log("Key::",key)
    
                    var snap = snapshot.child("estado").val()
    
                    if (trySnapshot.length < 1) {
    
                    trySnapshot.push(snapshot.val())
    
                } 
    
                })
            }
        })
    


        console.log("ccSnapshot::",ccSnapshotArr)
        console.log("cccSnapshot%%",cccSnapshotArr)
        console.log("Estado$%/#:",stateArray)
        console.log("Justificaciones",justificaciones)

        setTimeout(()=>{
            mostrarReporte();
        },1500);



    }


    return(

        

        <div className="bodyReport">

        { show?

        

        <div classname="white">
            <input type="button" value="Obtener" onClick={checking}></input>
        </div>

        :

        <div className="reportShow">


    
            
            <div className="reportHeader"><h1>Reporte Quincenal</h1></div>
            
            
        

        <div>
            <table class="table table-striped" id="justTable">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">Cliente/Ubicación</th>
                        <th scope="col">Nombre del Operador</th>
                        <th scope="col">Turno</th>
                        <th scope="col">Incidencia</th>
                        <th scope="col">Justificacion</th>
                        <th scope="col">Suplencia</th>


                    </tr>
                </thead>

            <tbody>

                {justificaciones.map((item)=>
                {

                    return (

                        <tr>
                            <td>
                                {item.clienteC}
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.hr}
                            </td>
                            <td>
                                {item.estado}
                            </td>
                            <td>
                                {item.justi}
                            </td>
                            <td>{item.suplencia}</td>
                        </tr>

                    )

                })}

            </tbody>


            </table>


        </div>

        </div>
       


}


        </div>



        
    )





}

export default Quincena;