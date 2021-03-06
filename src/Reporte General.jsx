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

    
    var diaOne = dateOne.substring(8,10)
    var mesOne = dateOne.substring(5,7)
    var anioOne = dateOne.substring(0,4)
    

    var diaTwo = dateTwo.substring(8,10)
    var mesTwo = dateTwo.substring(5,7)
    var anioTwo = dateTwo.substring(0,4)


    const fechaUno = diaOne + "-" + mesOne + "-" + anioOne

    const fechaDos = diaTwo + "-" + mesTwo + "-" + anioTwo

    console.log("FechaUno::",fechaUno)

    const [arrayD,setArrayD] = useState([])
    
    const [generalData,setGeneralData] = useState([]);


    const [justificaciones,setJustificaciones] = useState([]);

    console.log("Justificaciones", justificaciones)



    

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

    console.log("ArrayD::",arrayD)

    const [datos,setDatos] = useState([]);


    const [personal,setPersonal] = useState([]);


    const dbRef = ref(getDatabase());


    function obtener () {


       

        for (let index = +dateOne.substring(8,10); index <= +dateTwo.substring(8,10); index++) {
          arrayD.push(index);
            
        }

        for (let index = +diaOne; index <= +diaTwo; index++) {
            fechaD.push(index + "-" + mesOne + "-" + anioOne)
        }

        console.log("FECHA222$#,", fechaD)


        get(child(dbRef,'ClienteUbicacion/')).then((snapshot)=>{
            if (snapshot.exists()){
                snapshot.forEach((childSnapshot)=>{
                    var nombreC = childSnapshot.child("Nombre").val()
                    var personalC = childSnapshot.child("Personal").val()

                    personal.push({nombreC:nombreC,Personal:personalC})

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

                    datos.push({Cliente:cl,Nombre:nm,Ingreso:fechaI,Baja:fechaB, dias:getDays()})
                    
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
                                            
                
                                            })


                                            datos.forEach((item)=>{
                                                justificaciones.forEach((iter)=>{

                                                    fechaD.forEach((f)=>{

                                                   var index =0;     

                                                   item.dias.forEach((dialokobydiego)=>{
                                                       

                                                    // console.log(""+iter.Fecha.substring(0,2) +"=="+ Object.keys(dialokobydiego)[0]  );
                                                    // console.log(dialokobydiego)
                                                    // console.log(item.Nombre+"=="+iter.Nombre);



                                                        // if (item.Nombre == iter.Nombre && +iter.Fecha.substring(0,2) == +Object.keys(dialokobydiego)[0] )

                                                        if (item.Nombre == iter.Nombre && +iter.Fecha.substring(0,2) == +Object.keys(dialokobydiego)[0] ) {
                                                            // console.log("Aqui se encontro algo :",{[Object.keys(dialokobydiego)[0]]:iter.Estado},"En el index:: ", index)
                                                            item.dias[index] = {[Object.keys(dialokobydiego)[0]]:iter.Estado+" "+iter.Justificacion+" "+iter.Suplencia}
                                                        }
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




            }
        })


        var alpha =  datos.sort((a,b) => {
            if (a.Cliente < b.Cliente) return -1;
            if (a.Cliente > b.Cliente) return 1

            return 0;
          })



        //   personal.forEach((item)=>{
        //       repeat.forEach((iter)=>{
        //           datos.forEach((dat)=>{

        //         if(
        //             item.nombreC == iter.Cliente && iter.Personal < item.Personal
        //         ){
        //             datos.push({Cliente:item.nombreC,Nombre:"Vacante",Ingreso:"",Baja:""})
        //         }
        //     })
        //       })
        //   })


        //   for (var i=0; i<personal;i++){
        //       if (datos[i] == undefined){
        //           datos.push({Cliente:personal,Nombre:"Vacante",Ingreso:"",Baja:""})
        //       }
        //   }


        // var  result = {};

        //   for (i = 0; i< personal.length; i++) {
        //       if (!result[personal[i]])
        //       result[personal[i]] = 0;
        //       ++result[personal[i]]
        //   }

        //   console.log("Resultt::",Object.values(result))
         

        setTimeout(()=>{
            mostrarReporte();
        },1000)


    }

    
    function getDays(){
        var days = [];
        for (let index = +dateOne.substring(8,10); index <= +dateTwo.substring(8,10); index++) {
            days.push({[index.toString()]:"/"});

        }
        return days;


        

    }

    // function getDaysIso() {

    //     var daysIso = [];
    //     for (let index = +fechaUno; index <= +fechaDos; index++){
    //     daysIso.push({[index.toString()]:"/"});


    //     console.log("DaysIso###",daysIso)

    // }
    // return daysIso
        
    // }

    // const repeat = [];

    // datos.forEach((item)=>{
    //     repeat[item.Cliente] = repeat.push({Cliente:item.Cliente + 1 || 1})
    // })
   
    // console.log("Repeat::",repeat)

    //    console.log("Personal::",personal)
    //    console.log("Datos%%",datos)
     



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

    var tableHTML =  tableSelect.outerHTML.replace(/??/g, '&ntilde;')
                     .replace(/??/g, '&Ntilde;')
                     .replace(/??/g, '&aacute;')
                     .replace(/??/g, '&Aacute;')
                     .replace(/??/g, '&eacute;')
                     .replace(/??/g, '&Eacute;')
                     .replace(/??/g, '&iacute;')
                     .replace(/??/g, '&Iacute;')
                     .replace(/??/g, '&oacute;')
                     .replace(/??/g, '&Oacute;')
                     .replace(/??/g, '&uacute;')
                     .replace(/??/g, '&Uacute;')
                     .replace(/??/g, '&ordm;')
                     

    // tableHTML.replace(/'??'/g, '??');
    // tableHTML.replace(/'??'/g, '??');
    // tableHTML.replace(/'??'/g, '??');
    // tableHTML.replace(/'??'/g, '&oacute;');
    // tableHTML.replace(/'??'/g, '&uacute;');
    // tableHTML.replace(/'??'/g, '&ordm;');
    // tableHTML.replace(/ /g, '%20');
    // tableHTML.replace(/'??'/g, '&Aacute;');
    // tableHTML.replace(/'??'/g, '&Eacute;');
    // tableHTML.replace(/'??'/g, '&Iacute;');
    // tableHTML.replace(/'????'/g, '&Oacute;');
    // tableHTML.replace(/'??'/g, '&Uacute;');
    // tableHTML.replace(/'??'/g, '&ntilde;');
    // tableHTML.replace(/'?????'/g, '??');
    // var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    

    
    // // Specify file name
    // var filename = 'Reporte.xls';
    
    // // Create download link element
    // downloadLink = document.createElement("a");
    
    // document.body.appendChild(downloadLink);
    
    // if(navigator.msSaveOrOpenBlob){
    //     var blob = new Blob(['\ufeff', tableHTML], {
    //         type: dataType
    //     });
    //     navigator.msSaveOrOpenBlob( blob, filename);
    // }else{
    //     // Create a link to the file
    //     downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tableHTML));


        // // Setting the file name
        // downloadLink.download = filename;
        
        // //triggering the function
        // downloadLink.click();
// }

}

function regresar () {
    setDatos([]);
    setArrayD([]);
    mostrarCalendario();
}





return (


    <div className="bodyReportGB">

       {show? 
       
        <div className="reportGB">

    

        <div className="cgHeader">    <h1>Calendario General</h1> </div>

        <br/>
        <br/>

        <input type="date" value={dateOne} onChange={v=>setDateOne(v.target.value)}></input>
    
        <input type="date" value={dateTwo} onChange={v=>setDateTwo(v.target.value)}></input>


        <br/>
    

        <br/>
       
        <input type="button" class="btn btn-success" value="Ver reporte" onClick={obtener} />



        </div>

            : 

        <div className="tabReportGB">

         <div className="reporteGH"> <h1>Reporte General</h1> </div>

        <div className="scrollR">

        <input type="button" class="btn btn-primary" value="Regresar" onClick={regresar} />


        <input type="button" class="btn btn-success" value="Generar Reporte" onClick={fnExcelReport} />

            <table class="table table-striped" id="generate">
                <thead>
                    
                    <tr>
                        <th scope="col">Cliente/Ubicaci??n</th>
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
                                        item.dias.map((d, inx)=>{
                                            

                                            return(<td>{d[arrayD[inx.toString()]]}</td>)
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

export default ReporteG;