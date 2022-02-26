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
import { CSVLink, CSVDownload } from "react-csv";

const ReporteG = (reporte) => {


    const [dateOne,setDateOne] = useState(new Date().toISOString())
    const [dateTwo,setDateTwo] = useState(new Date().toISOString())

    console.log("Date One", dateOne)
    console.log("Date Two", dateTwo)

    console.log("Sub Date One",dateOne.substring(8,10))
    console.log("Sub Date Two",dateTwo.substring(8,10))

    console.log("Dif String:::", dateTwo.substring(8,10) - dateOne.substring(8,10))

    var diasC = dateTwo.substring(8,10) - dateOne.substring(8,10)

    

    const [arrayD,setArrayD] = useState([])
    
    const [generalData,setGeneralData] = useState([]);


    function Columnsx() {
        
        return (
            
                <React.Fragment>
                  {arrayD.map((day) => {
                    return <td> / </td>;
                  })}
                </React.Fragment>
        
        );
      }


    

    console.log(arrayD)






    const [show,setShow] = useState([]);

    function mostrarReporte () {
        setShow(false)
    }

    function mostrarCalendario() {
        setShow(true)
    }

    console.log("ArrayD::",arrayD)

    const [datos,setDatos] = useState([]);


    console.log("DATOS:::",datos)


    const dbRef = ref(getDatabase());


    function obtener () {

        for (let index = +dateOne.substring(8,10); index < +dateTwo.substring(8,10); index++) {
          arrayD.push(index);
            
        }
    

        get(child(dbRef,'Operador/')).then((snapshot)=>{
            if (snapshot.exists()){
                snapshot.forEach((childSnapshot)=>{


                    


                    var nm = childSnapshot.child("Nombre").val()
                    var cl = childSnapshot.child("Cliente").val()
                    var fechaI = childSnapshot.child("Fecha_Ingreso").val()
                    var fechaB = childSnapshot.child("Fecha_Baja").val()

                    datos.push({Cliente:cl,Nombre:nm,Ingreso:fechaI,Baja:fechaB, dias:getDays()})
                    
                    datos.sort((a,b) => {
                        if (a.Cliente < b.Cliente) return -1;
                        if (a.Cliente > b.Cliente) return 1
            
                        return 0;
                      })



                      get(child(dbRef,'Justificaciones/')).then((jsnapshot)=>{
                        if (jsnapshot.exists()) {
                            jsnapshot.forEach((jchildSnapshot)=>{
            
            
                                var state = jchildSnapshot.child("estado").val()
                                var key = jchildSnapshot.key;
            
                       
            
            
                        
                
                                jchildSnapshot.forEach((cSnapshot)=>{
            
                                    var nameKey = cSnapshot.key
            
                               
                
                                
                
                                    var validateOne = cSnapshot.key
                
                            
            
            
                                    cSnapshot.forEach((ccSnapshot)=>{
            
            
                
                                            ccSnapshot.forEach((cccSnapshot)=>{
                                                
                
                
                                              
            
                                                var validateTwo = cccSnapshot.child("clienteC").val()
                                                var nombr = cccSnapshot.child("name").val()
                                                var turn = cccSnapshot.child("hr").val()
                                                var incidenci = cccSnapshot.child("estado").val()
                                                var just = cccSnapshot.child("justi").val()
                                                var sup = cccSnapshot.child("suplencia").val()
            
                
                                                var state = cccSnapshot.child("estado").val()
                
                
                                                // if (cl == validateTwo && nm == nombr && state != null) {
                                                //     // date.push(key)
                                                //     datos.push({
                                                //         Cliente:cl,
                                                //         Nombre:nm,
                                                //         Ingreso:fechaI,
                                                //         Baja:fechaB,
                                                //         Razon:incidenci,
                                                //         Justificacion:just,
                                                //         Suplencia:sup})
                                                // }
            
                                                // if (state != null) {
                                                //     justificaciones.push(cccSnapshot.val())
                
                                                // }
                
                                            
                
                                            })
                
                                            
                
                                        var state = ccSnapshot.child("estado").val()
                
                   
                
                        
                
                                        
                
                                    })
                
                                })
                
                               
                
                            })
                        }
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

    
    function getDays(){
        var days = [];
        for (let index = +dateOne.substring(8,10); index <= +dateTwo.substring(8,10); index++) {
            days.push(index);
            
        }
        return days;

    }

    datos.forEach((item)=> {
        

        
        generalData.push({
            Cliente:item.Cliente,
            Nombre:item.Nombre,
            Ingreso:item.Ingreso,
            Baja:item.Baja,
           })

    })


    generalData.push({Dias:arrayD})

    console.log("General Data::",generalData)


return (


    <div className="bodyReportGB">

       {show? 
       
        <div className="reportGB">

    

        <div>    <h1>Calendario General</h1> </div>

        <input type="date" value={dateOne} onChange={v=>setDateOne(v.target.value)}></input>
        <input type="date" value={dateTwo} onChange={v=>setDateTwo(v.target.value)}></input>

       
        <input type="button" class="btn btn-success" value="Change" onClick={obtener} />



        </div>

: 

        <div className="tabReportGB">

         <div className="reporteGH"> <h1>Reporte General</h1> </div>

        <div className="scrollR">
            <table class="table table-striped" id="generate">
                <thead>
                    
                    <tr>
                        <th scope="col">Cliente/Ubicación</th>
                        <th scope="col">Nombre del Operador</th>
                        <th scope="col">Ingreso</th>
                        <th scope="col">Baja</th>
                       {arrayD.map((item)=>{ return (<th scope="col">{item}</th>)})} 
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
                                    
                                    {
                                        item.dias.map((d)=>{
                                            return (<td> / </td>)
                                        })
                                    }

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

        <input type="button" class="btn btn-primary" value="Regresar" onClick={mostrarCalendario} />


        <CSVLink data={datos} filename={"Reporte Quincenal.csv"} className="btn btn-success" target="_blank">
            Generar Reporte
        </CSVLink>


        </div>



}

    </div>
)





}

export default ReporteG;