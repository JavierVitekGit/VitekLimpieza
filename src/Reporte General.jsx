import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SideBar from './Sidebar.jsx'
import InfiniteCalendar, {withRange,Calendar} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { formatRelative, subDays} from 'date-fns'
import {es} from 'date-fns/locale'
import './Firebase init'
import './Reporte General.css'

const ReporteG = (reporte) => {


    const [show,setShow] = useState([]);

    function mostrarReporte () {
        setShow(false)
    }

    function mostrarCalendario() {
        setShow(true)
    }


    const [datos,setDatos] = useState([]);


    


    const dbRef = ref(getDatabase());


    function obtener () {

        get(child(dbRef,'Operador/')).then((snapshot)=>{
            if (snapshot.exists()){
                snapshot.forEach((childSnapshot)=>{

                    var nm = childSnapshot.child("Nombre").val()
                    var cl = childSnapshot.child("Cliente").val()
                    var fechaI = childSnapshot.child("Fecha_Ingreso").val()
                    var fechaB = childSnapshot.child("Fecha_Baja").val()

                    datos.push({Cliente:cl,Nombre:nm,Ingreso:fechaI,Baja:fechaB})
                    
                    datos.sort((a,b) => {
                        if (a.Cliente < b.Cliente) return -1;
                        if (a.Cliente > b.Cliente) return 1
            
                        return 0;
                      })

                })
            }
        })


        var alpha =  datos.sort((a,b) => {
            if (a.Cliente < b.Cliente) return -1;
            if (a.Cliente > b.Cliente) return 1

            return 0;
          })





        // var mapped = datos.map(function(el,i){
        //     return {index:i,value: el.toLowerCase()};

        // })

        // mapped.sort(function(a,b){
        //     if (a.value > b.value) {
        //         return 1;
        //     }

        //     if (a.value < b.value) {
        //         return -1;
        //     }

        //     return 0;


        // })


        setTimeout(()=>{
            mostrarReporte();
        },1000)


    }





return (


    <div className="bodyReportGB">

       {show? 
       
        <div className="reportGB">

    

        <div>    <h1>Calendario General</h1> </div>


       
        <input type="button" value="Change" onClick={obtener} />



        </div>

: 

        <div className="tabReportGB">

         <div className="reporteGH"> <h1>Reporte General</h1> </div>

        <div className="scrollR">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Cliente/Ubicación</th>
                        <th scope="col">Nombre del Operador</th>
                        <th scope="col">Ingreso</th>
                        <th scope="col">Baja</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        datos.map((item)=>{
                            return(
                                <tr>
                                    <td>
                                        {item.Cliente}
                                    </td>

                                    <td>
                                        {item.Nombre}
                                    </td>

                                    <td>
                                        {item.Ingreso}
                                    </td>

                                    <td>
                                        {item.Baja}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

        <input type="button" value="Regresar" onClick={mostrarCalendario} />


        </div>



}

    </div>
)





}

export default ReporteG;