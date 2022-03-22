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

import SideBar from "./Sidebar";

import { CSVLink, CSVDownload } from "react-csv";
import Reasignacion from "./Reasignacion.jsx";



const Quincena = (quincena) => {

    const [fechaC,setFechaC] = useState([]);

    console.log("#FECHACC$&%:",fechaC)

    const [dateOne,setDateOne] = useState(new Date().toISOString())
    const [dateTwo,setDateTwo] = useState(new Date().toISOString())

    console.log("Date One", dateOne)
    console.log("Date Two", dateTwo)

    console.log("Dif String:::", dateTwo.substring(8,10) - dateOne.substring(8,10))

    const today = new Date()

    const min = new Date(2022, 1,15);
    const minInput = min.toISOString().split('T')[0]

    console.log("Today",today)

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

    console.log("FechaUno::",fechaUno)

    const [arrayD,setArrayD] = useState([])
    
    const [generalData,setGeneralData] = useState([]);


    const [justificaciones,setJustificaciones] = useState([]);

    console.log("Justificaciones", justificaciones)


    const [reasig,setReasig] = useState([]);
    

    console.log(arrayD)


    const [fechaD,setFechaD] = useState([]);

    console.log("FECHA D%&$#,", fechaD)

    const [show,setShow] = useState([]);

    function mostrarReporte () {
        setShow(false)
    }

    function mostrarCalendario() {
        setShow(true)
    }


    const [datos,setDatos] = useState([]);

console.log("Datossd asda",datos)

    const [personal,setPersonal] = useState([]);


    const dbRef = ref(getDatabase());

    
    const [diaSemanaArray,setDiaSemanaArray] = useState([]);
  
    function obtener () {


       
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
        

        for (let i = diaOne; i <= diaTwo; i++){
            fechaC.push(i + "-" + mesOne + "-" + anioOne)
        }

        console.log("FECHABB::",fBaja)

        // fechaD.push(index + "-" + mesOne + "-" + anioOne +"11:00:00")

        console.log("FECHA222$#,", fechaD)

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

                            if (fechaB != "" && fechaB <= fffBaja){
                                fechaB = null
                            } else if (fechaI != "" && fechaI >= fffTwo) {
                                fechaI = null
                            }
                                if (fechaB != null && fechaI != null){
                                    datos.push({Cliente:cl,Nombre:nm,Ingreso:fechaI,Baja:fechaB,Ubicacion:ubic,Horario:hr,Reasignacion:reasig,Puesto:puest, dias:getDays(),week:dias})
                                }
         
                                
                            
                              
                    
                       
                 


                        //  if (Date(fechaB) <= Date(fBaja[0]).getTime()){
                        //     datos.push({Cliente:cl,Nombre:nm,Ingreso:fechaI,Baja:fechaB,Ubicacion:ubic,Horario:hr,Reasignacion:reasig,Puesto:puest, dias:getDays(),week:dias})
                        //  }

                    
                        
                   
           
     
                   
             
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
            
                       
                                console.log("KEY$$Fecha::",key)
            
                        
                
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
                                                var obser = cccSnapshot.child("observaciones").val()
                
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

                                                fechaC.forEach((c)=>{

                
                                                if (validateOne == validateTwo && state != null && key == c) {
                                                    // date.push(key)
                                                    justificaciones.push({
                                                        Fecha:key,
                                                        Cliente:validateTwo,
                                                        Nombre:nombr,
                                                        Turno:turn,
                                                        Estado:incidenci,
                                                        Justificacion:just,
                                                        Suplencia:sup,
                                                        Observaciones:obser})
                                                }
                                            })
                
                                            })


                                            datos.forEach((item)=>{
                                                justificaciones.forEach((iter)=>{
                                                    diaSemanaArray.forEach((nyx)=>{

                                            
                                                   var index =0;     
                                                  

                                                   
                                                   item.dias.forEach((dialokobydiego)=>{
                                                       

                                                    // console.log(""+iter.Fecha.substring(0,2) +"=="+ Object.keys(dialokobydiego)[0]  );
                                                    // console.log(dialokobydiego)
                                                    // console.log(item.Nombre+"=="+iter.Nombre);

                                                        // console.log("dialokobyDiego",item.Baja.substring(8,10))

                                                        // if (item.Nombre == iter.Nombre && +iter.Fecha.substring(0,2) == +Object.keys(dialokobydiego)[0] )

                                                        
                                                        console.log("try$$%%:",dialokobydiego.slice(-2))

                                                        if (item.Horario == iter.Turno && item.Nombre == iter.Nombre && item.Cliente == iter.Cliente && +iter.Fecha.substring(0,2) == (dialokobydiego[0].toString()).slice(-2) ) {
                                                            // console.log("Aqui se encontro algo :",{[Object.keys(dialokobydiego)[0]]:iter.Estado},"En el index:: ", index)
                                                            item.dias[index] = {[Object.keys(dialokobydiego)[0]]:iter.Estado+" "+iter.Justificacion}
                                                        }
//                                                                item.Nombre == "Vacante" && +iter.Fecha.substring(0,2) != +Object.keys(dialokobydiego)[0]
                                                        else if (item.Nombre == "Vacante"){

                                                             item.dias[index] = {[Object.keys(dialokobydiego)[0]]: ""}
                                                        } 

                                                            else if (item.Baja != null && item.Baja != "" && item.Baja.substring(8,10) < +Object.keys(dialokobydiego)[0]){
                                                                item.dias[index] = {[Object.keys(dialokobydiego)[0]]:""}
                                                            }

                                                            else if(item.Ingreso != null && item.Ingreso != "" && item.Ingreso.substring(8,10) > +Object.keys(dialokobydiego)[0]) {
                                                                item.dias[index] = {[Object.keys(dialokobydiego)[0]]:""}
                                                            }

                                                            else if (item.Nombre == iter.Suplencia && +iter.Fecha.substring(0,2) == +Object.keys(dialokobydiego)[0]){
                                                                item.dias[index] = {[Object.keys(dialokobydiego)[0]]:iter.Observaciones}
                                                            }

                                                            // else if (n.substring(0,1)!= nyx.substring(0,1)){
                                                            //     item.dias[index] = {[Object.keys(dialokobydiego)[0]]:""}
                                                            // }

                                                            // else if(item.week != null && item.week != "" && item.week.substring(0,1) !=  nyx.substring(0,1)){
                                                            //     item.dias[index] = {[Object.keys(dialokobydiego)[0]]:""}
                                                            // }

                                  
                                                        

                                                        index++;

                                                    })
                                                })

                                            

                                                })
                                            })

                                        var state = ccSnapshot.child("estado").val()
                
                                    })
                
                                })
                
                            })
                        }
                    })

                    reasig.forEach((item)=>{
                        datos.forEach((iter)=>{
                        fechaC.forEach((efe)=>{

                        
                            if (item.Nombre == iter.Nombre && efe == item.Fecha){
                                    iter.Reasignacion = item.Fecha.substring(0,2) + "/" + item.Cliente
                            } else {
                                iter.Reasignacion = ""
                            }
                            })
                        })
                    })


//      !item.includes(iter.Ingreso)

                
                        datos.forEach((iter)=>{
                            if (iter.Ingreso != null && iter.Ingreso != "" && iter.Ingreso <= fffBaja  ) {
                                    iter.Ingreso = ""
                            }
                        })
                

                    // diaSemanaArray.forEach((item)=>{
                    //     datos.forEach((iter)=>{
                    //         if (iter.week != null & iter.week != "" && iter.week.substring(0,1) != item.substring(0,1)){
                                
                    //         }
                    //     })
                    // })


            }
        })


        var alpha =  datos.sort((a,b) => {
            if (a.Cliente < b.Cliente) return -1;
            if (a.Cliente > b.Cliente) return 1

            return 0;
          })



        setTimeout(()=>{
            mostrarReporte();
         
        },1000)


    }

    
    function getDays(){
        var days = [];
        // for (let index = +dateOne.substring(8,10); index <= +dateTwo.substring(8,10); index++) {
        //     days.push({[index.toString()]:"/"});

        // }

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
            days.push(diasSemana(fecha) + "/" +fecha.substring(8,10))
            // console.log("Guachate esta",diasSemana(fecha) + "/" +fecha.substring(8,10))
        })

        // for (let i = diaOne; i <= diaTwo; i++ ){
        //     days.push({[i.toString() + "-" + mesOne.toString() + "-" + anioOne.toString()]:"/"})
        // }

        console.log("Dayss",days)

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
            

        <div className="cgHeader">    <h1>Reporte Nomina</h1> </div>

        <br/>
        <br/>

        <input type="date" value={dateOne} onChange={v=>setDateOne(v.target.value)} min={minInput}></input>
    
        <input type="date" value={dateTwo} onChange={v=>setDateTwo(v.target.value)} min={minInput} ></input>


        <br/>
        <br/>
       
        <input type="button" class="btn btn-success" value="Ver reporte" onClick={obtener} />



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
                        <th scope="col">Reasignación</th>
                       {diaSemanaArray.map((item)=>{ return (<th scope="col">{item}</th>)})} 

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

                                    <td>
                                        {item.Reasignacion}
                                    </td>
                                    
                                    {
                                        item.dias.map((d, inx)=>{
                      
                                            return (<td>{d[arrayD[inx.toString()]]}</td>)
                                        })
                                    }

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

export default Quincena;