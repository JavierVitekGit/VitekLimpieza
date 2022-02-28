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


    const [justificaciones,setJustificaciones] = useState([]);

    console.log("Justificaciones", justificaciones)

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





    const dbRef = ref(getDatabase());


    function obtener () {

        for (let index = +dateOne.substring(8,10); index <= +dateTwo.substring(8,10); index++) {
          arrayD.push(index);
            
        }

        generalData.push({Dias:arrayD})
    

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

                                                   var index =0;     

                                                   item.dias.forEach((dialokobydiego)=>{

                                                    // console.log(""+iter.Fecha.substring(0,2) +"=="+ Object.keys(dialokobydiego)[0]  );
                                                    // console.log(dialokobydiego)
                                                    // console.log(item.Nombre+"=="+iter.Nombre);
                                                        if (item.Nombre == iter.Nombre && +iter.Fecha.substring(0,2) == +Object.keys(dialokobydiego)[0] ) {
                                                            // console.log("Aqui se encontro algo :",{[Object.keys(dialokobydiego)[0]]:iter.Estado},"En el index:: ", index)
                                                            item.dias[index] = {[Object.keys(dialokobydiego)[0]]:iter.Estado+" "+iter.Justificacion+" "+iter.Suplencia}
                                                        }
                                                        index++;
                                                       
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

    datos.forEach((item)=>{
        item.dias.forEach((it)=>{

        })
    })

    
    function getDays(){
        var days = [];
        for (let index = +dateOne.substring(8,10); index <= +dateTwo.substring(8,10); index++) {
            days.push({[index.toString()]:"/"});
            
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


    
    
    //    var datosReporte=[];

    //     datos.map((fila)=>{
    //         var dataFila = [];
            
    //         dataFila.push({"Nombre":fila.Nombre});
              
    //         var cnt = 0
    //         fila.dias.map((v)=>{
    //            dataFila.push({[arrayD[cnt]]:v[+arrayD[cnt]]})
    //            cnt ++;
    //         })
            
    //        datosReporte.push(dataFila);     
    //     })

    //     var final = Object.values(datosReporte)


  
    //     var datosTest = Object.values(datos)

    // E N C O D E


        // function encodeUtf8(text) {
        //     const code = encodeURIComponent(text);
        //     const bytes = [];
        //     for (var i = 0; i < code.length; i++) {
        //         const c = code.charAt(i);
        //         if (c === '%') {
        //             const hex = code.charAt(i + 1) + code.charAt(i + 2);
        //             const hexVal = parseInt(hex, 16);
        //             bytes.push(hexVal);
        //             i += 2;
        //         } else bytes.push(c.charCodeAt(0));
        //     }
        //     return bytes;
        // }



        function Utf8ArrayToStr(array) {
            var out, i, len, c;
            var char2, char3;
        
            out = "";
            len = array.length;
            i = 0;
            while(i < len) {
            c = array[i++];
            switch(c >> 4)
            { 
              case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
              case 12: case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
              case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                               ((char2 & 0x3F) << 6) |
                               ((char3 & 0x3F) << 0));
                break;
            }
            }
        
            return out;
        }




    function fnExcelReport()
{
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById('generate');
    // var tableHTML = encodeUtf8(tableSelect.outerHTML)
    var tableHTML = Utf8ArrayToStr(tableSelect.outerHTML)
    // var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    

    
    // Specify file name
    var filename = 'report.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
}

}





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

        <input type="button" class="btn btn-primary" value="Regresar" onClick={mostrarCalendario} />


        <input type="button" class="btn btn-success" value="Segundo intento" onClick={fnExcelReport} />


        </div>



}

    </div>
)





}

export default ReporteG;