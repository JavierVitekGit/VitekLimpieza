import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
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
import Loading from "./Loading";
import { Spinner } from "reactstrap";

import SideBar from "./Sidebar";
import { render } from "@testing-library/react";
import SidebarPro from "./SidebarResponsive";




const BajaReporte = (quincena) => {


    const [fechaC,setFechaC] = useState([]);

    const [loading,setLoading] = useState(false)



    const [dateOne,setDateOne] = useState(new Date().toISOString())
    const [dateTwo,setDateTwo] = useState(new Date().toISOString())

    
   

    const today = new Date()

    const min = new Date(2022, 1,15);
    const minInput = min.toISOString().split('T')[0]

  

    var diaOne = dateOne.substring(8,10)
    var mesOne = dateOne.substring(5,7)
    var anioOne = dateOne.substring(0,4)
    

    var diaTwo = dateTwo.substring(8,10)
    var mesTwo = dateTwo.substring(5,7)
    var anioTwo = dateTwo.substring(0,4)


    const fechaUno = diaOne + "-" + mesOne + "-" + anioOne

    const fechaDos = diaTwo + "-" + mesTwo + "-" + anioTwo

    const fffBaja = anioOne + "-" + mesOne + "-" + diaOne
    const fffTwo= anioTwo + "-" + mesTwo + "-" + diaTwo

    

    const [arrayD,setArrayD] = useState([])

   


    const [reasig,setReasig] = useState([]);
    

   


    const [fechaD,setFechaD] = useState([]);

   

    const [show,setShow] = useState([]);

    function mostrarReporte () {
        setShow(false)
    }

    function mostrarCalendario() {
        setShow(true)
    }


    const [datos,setDatos] = useState([]);

    const [dataI,setDataI] = useState([]);

    const [dataB,setDataB] = useState([])


    const [personal,setPersonal] = useState([]);


    const dbRef = ref(getDatabase());

    
    const [diaSemanaArray,setDiaSemanaArray] = useState([]);

   

    


  
    function obtener () {

        
     setLoading(true)
       
        for (let index = +dateOne.substring(8,10); index <= +dateTwo.substring(8,10); index++) {
            arrayD.push(index);
              
          }

        // for (let index = +diaOne; index <= +diaTwo; index++) {
        //   arrayD.push(index + "-" + mesOne + "-" + anioOne);
            
        // }

        for (let index = diaOne; index <= +diaTwo; index++) {
            fechaD.push(anioOne+ "-"+mesOne+"-"+index+' 12:00:00')
        }


        const fBaja = [];

        for (let index = diaOne; index <= +diaTwo; index++) {
            fBaja.push(anioOne + "-" + mesOne + "-" + index)
        }
        

        for (let i = +diaOne; i <= diaTwo; i++){
            fechaC.push( ((i<10)? "0"+i : i) + "-" + mesOne + "-" + anioOne)
        }

 

        // fechaD.push(index + "-" + mesOne + "-" + anioOne +"11:00:00")



        const diasSemana = fecha => [
            "D",
            "L",
            "Mar",
            "Mier",
            "J",
            "V",
            "S"
        ][new Date(fecha).getDay()];

        
    
        fechaD.forEach(fecha=>{
            // console.log(`En ${fecha} fue ${diasSemana(fecha)}`)
            diaSemanaArray.push(diasSemana(fecha) + "/" +fecha.substring(8,10))
            // console.log("Guachate esta",diasSemana(fecha) + "/" +fecha.substring(8,10))
        })
    


        // arrayD.forEach((item)=>{
        //     diaSemanaArray.forEach((iter)=>{
        //         if(!semanaArray.includes(iter + "/" + item))
        //         semanaArray.push(iter + "/" + item)
        //     })
        // })

        // console.log("FinalFecha",semanaArray)



        get(child(dbRef,'ClienteUbicacion/')).then((snapshot)=>{
            if (snapshot.exists()){
                snapshot.forEach((childSnapshot)=>{
                    var nombreC = childSnapshot.child("Nombre").val()
                    var personalC = childSnapshot.child("Personal").val()

                    personal.push({nombreC:nombreC,Personal:personalC})

                })
            }
        })
        
    
        get(child(dbRef,'Reasignacion/')).then((snapshot)=>{
            if (snapshot.exists()){
                snapshot.forEach((childSnapshot)=>{
                    var cliente = childSnapshot.child("Cliente").val()
                    var nombre = childSnapshot.child("Nombre").val()
                    var fecha = childSnapshot.key
                    
                    reasig.push({Cliente:cliente,Nombre:nombre,Fecha:fecha})

                    console.log("Reasginaciones&/&%$%",reasig)

                })

                


            }
        })

        get(child(dbRef,'Operador/')).then((snapshot)=>{
            if (snapshot.exists()){
                snapshot.forEach((childSnapshot)=>{


                    var nm = childSnapshot.child("Nombre").val()
                    var cl = childSnapshot.child("Cliente").val()
                    var fechaI = childSnapshot.child("Fecha_Ingreso").val()
                    var fechaB = childSnapshot.child("Fecha_Baja").val()
                    var ubic = childSnapshot.child("Ubicacion").val()
                    var hr = childSnapshot.child("Horario").val()
                    var puest = childSnapshot.child("Puesto").val()
                    var reasig = childSnapshot.child("Reasignacion").val()
                    var est = childSnapshot.child("Estatus").val()
                    var dias = childSnapshot.child("Dias").val()


                    // console.log("FechaBComp",fechaB.split("-"))0
                               

                                if (fechaB != "" && fechaB < fffBaja ){
                                    fechaB = null
                                }

                                if (fechaI != "" && fechaI < fffBaja){
                                    fechaI = null
                                }

                                if (fechaI != null && fechaI != "" && fechaI <= fffTwo) {
                                    datos.push({Cliente:cl,Nombre:nm,Ingreso:fechaI,Baja:fechaB,Ubicacion:ubic,Horario:hr,Puesto:puest})
                                    
                                }
                               
                                if (fechaB != null && fechaB != "" && fechaB <= fffTwo ){ 
                                    datos.push({Cliente:cl,Nombre:nm,Ingreso:fechaI,Baja:fechaB,Ubicacion:ubic,Horario:hr,Puesto:puest})
                                }



                        //  if (Date(fechaB) <= Date(fBaja[0]).getTime()){
                        //     datos.push({Cliente:cl,Nombre:nm,Ingreso:fechaI,Baja:fechaB,Ubicacion:ubic,Horario:hr,Reasignacion:reasig,Puesto:puest, dias:getDays(),week:dias})
                        //  }----
             
                    datos.sort((a,b) => {
                        if (a.Cliente < b.Cliente) return -1;
                        if (a.Cliente > b.Cliente) return 1
            
                        return 0;
                      })


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
            
                                        var state = ccSnapshot.child("estado").val()
                
                                    })
                
                                })
                
                            })
                        }
                    })

                   

            }
        })


        var alpha =  datos.sort((a,b) => {
            if (a.Cliente < b.Cliente) return -1;
            if (a.Cliente > b.Cliente) return 1

            return 0;
          })

        
         
 
          
 
          

        setTimeout(()=>{
            
            setLoading(false)
         
        //   setLoading(false)
           
            mostrarReporte()
        
      
               

        },1000)

    

    }

    if(loading){
        return(<Loading/>)
    }
     else {

     }

    
    function getDays(){
        var days = [];
        for (let index = +dateOne.substring(8,10); index <= +dateTwo.substring(8,10); index++) {
            days.push({[index.toString()]:"/"});

        }

        // for (let i = diaOne; i <= diaTwo; i++ ){
        //     days.push({[i.toString() + "-" + mesOne.toString() + "-" + anioOne.toString()]:"/"})
        // }

 

        return days;


        

    }


 

    // F U N C I O N   P E R R O N A
    
    
    // function funcionPerrona(){
    //     var datosReporte=[];
 
    //      datos.map((fila)=>{
    //          var dataFila = [];
 
    //          dataFila.push({"Nombre":fila.Nombre});
 
    //          var cnt = 0
    //          fila.dias.map((v)=>{
    //             dataFila.push({[arrayD[cnt]]:v[""+arrayD[cnt]]})
    //             cnt ++;
    //          })
 
    //         datosReporte.push(dataFila);     
    //      })
 
    //      return datosReporte;
 
 
    //  }
 

    // E N C O D E


      



    function fnExcelReport()
{
    // var downloadLink;
    // var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById('generate');
    // var tableHTML = encodeUtf8(tableSelect.outerHTML)
    // var tableHTML = utf8.encode(tableSelect.outerHTML)
    // var tableHTML = tableSelect.innerHTML.toString()
    // var tableHTML = btoa(tableSelect.outerHTML)

    var tableHTML =  tableSelect.outerHTML.replace(/ñ/g, '&ntilde;')
                     .replace(/Ñ/g, '&Ntilde;')
                     .replace(/á/g, '&aacute;')
                     .replace(/Á/g, '&Aacute;')
                     .replace(/é/g, '&eacute;')
                     .replace(/É/g, '&Eacute;')
                     .replace(/í/g, '&iacute;')
                     .replace(/Í/g, '&Iacute;')
                     .replace(/ó/g, '&oacute;')
                     .replace(/Ó/g, '&Oacute;')
                     .replace(/ú/g, '&uacute;')
                     .replace(/Ú/g, '&Uacute;')
                     .replace(/º/g, '&ordm;')
                     .replace(/null/g, '')
                     

    
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tableHTML));


}

function regresar () {
    setDatos([]);
    setArrayD([]);
    mostrarCalendario();
    setDiaSemanaArray([]);
    setFechaD([]);
}





return (


    <div className="bodyReportGB">

       {show? 
       
        <div className="reportGB">
            

            <div className="adminSide">
            <SidebarPro></SidebarPro>
            
            </div>

        <div className="cgHeader">    <h1>Reporte de Bajas</h1> </div>

        <br/>
       
        <br/>

        <input type="date" value={dateOne} onChange={v=>setDateOne(v.target.value)} min={minInput}></input>
    
        <input type="date" value={dateTwo} onChange={v=>setDateTwo(v.target.value)} min={minInput} ></input>


        <br/>
        <br/>
       
        <input type="button" class="btn btn-success" value="Ver reporte" onClick={obtener} />

            <br/>
            <br/>

       
          
    
            
      


        </div>

: 

        <div className="tabReportGB">

         <div className="reporteGH"> 
         <h1>Reporte General </h1> 
         <h1>{fechaUno + "/" + fechaDos}</h1>
         
         </div>

        <div className="scrollR">

        <input type="button" class="btn btn-primary" value="Regresar" onClick={regresar} />


        <input type="button" id="quincenaBtn" class="btn btn-success" value="Generar Reporte" onClick={fnExcelReport} />

            <table class="table table-striped" id="generate">
                <thead>
                    
                    <tr>
                        <th scope="col">Cliente</th>
                        <th scope="col">Ubicación</th>
                        <th scope="col">Nombre del Operador</th>
                        <th scope="col">Turno</th>
                        <th scope="col">Puesto</th>
                       
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
                                        {item.Ubicacion}
                                    </td>

                                    <td>
                                        {item.Nombre}
                                    </td>

                                    <td>
                                        {item.Horario}
                                    </td>

                                    <td>
                                        {item.Puesto}
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

        


        </div>



}

    </div>
)



 }

 export default BajaReporte