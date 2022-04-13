import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import SideBar from './Sidebar'
import 'react-infinite-calendar/styles.css';
import './Firebase init'
import './Quincena.css'
import Loading from "./Loading";
import SidebarPro from "./SidebarResponsive";



const Pruebas = (pruebas) => {



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
    
    const [generalData,setGeneralData] = useState([]);


    const [justificaciones,setJustificaciones] = useState([]);

    console.log("Justi////",justificaciones)

    const [reasig,setReasig] = useState([]);
    

   const [operadores,setOperadores] = useState([])

   console.log("Operadores",operadores)

    const [fechaD,setFechaD] = useState([]);



    const [show,setShow] = useState([]);

    function mostrarReporte () {
        setShow(false)
    }

    function mostrarCalendario() {
        setShow(true)
    }


    const [datos,setDatos] = useState([]);



    const [personal,setPersonal] = useState([]);


    const dbRef = ref(getDatabase());

    
    const [diaSemanaArray,setDiaSemanaArray] = useState([]);
  
    function obtener () {

        setLoading(true)
       
        for (let index = +dateOne.substring(8,10); index <= +dateTwo.substring(8,10); index++) {
            arrayD.push(index);
              
          }


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

        //test
    
        fechaD.forEach(fecha=>{

            diaSemanaArray.push(diasSemana(fecha) + "/" +fecha.substring(8,10))

        })


        get(child(dbRef,'Operador/')).then((snapshot)=>{
            if(snapshot.exists()){
                snapshot.forEach((childSnapshot)=>{
                    var nombre = childSnapshot.child("Nombre").val()
                    var cl = childSnapshot.child("Cliente").val()
                    var ubic = childSnapshot.child("Ubicacion").val()
                    var pos = childSnapshot.child("Posicion").val()
                    var baja = childSnapshot.child("Fecha_Baja").val()


                    if (pos != null && pos!= ""){
                        operadores.push({Nombre:nombre,Cliente:cl,Ubicacion:ubic,Posicion:pos,Baja:baja})
                    }

                })
            }
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
                })

                


            }
        })

        get(child(dbRef,'Posiciones/')).then((snapshot)=>{
            if (snapshot.exists()){
                snapshot.forEach((childSnapshot)=>{

                   childSnapshot.forEach((n)=>{
                       var dias = n.child("Dias").val()
                       var cl = n.child("Cliente").val()
                       var hr = n.child("Horario").val()
                       var puesto = n.child("Puesto").val()
                       var ubic = n.child("Ubicacion").val()
                       var pos = n.key
                       datos.push({Nombre:"a",Cliente:cl,Ubicacion:ubic,Horario:hr,Puesto:puesto,Descanso:dias,days:getDays(),Posicion:pos})

                       

                   })

                   

                    datos.sort((a,b) => {
                        if (a.Cliente < b.Cliente) return -1;
                        if (a.Cliente > b.Cliente) return 1
            
                        return 0;
                      })


                    })

                      get(child(dbRef,'Justificaciones/')).then((jsnapshot)=>{
                        if (jsnapshot.exists()) {

                            const diass = [
                                "Domingo",
                                "Lunes",
                                "Martes",
                                "Miércoles",
                                "Jueves",
                                "Viernes",
                                "Sábado"
                                
                            ]

                            var tangamandapio = new Date()

                            jsnapshot.forEach((jchildSnapshot)=>{
            
            
                                var state = jchildSnapshot.child("estado").val()
                                var key = jchildSnapshot.key;
            
                       
                                // console.log("KEY$$Fecha::",key)
            
                        
                
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
                                                var ubic = cccSnapshot.child("Ubicacion").val()
                                                var state = cccSnapshot.child("estado").val()
                
                                                if (obser == null) {
                                                    obser = ""
                                                }

                                                if (just == null) {
                                                    just = ""
                                                }

                                                fechaC.forEach((c)=>{

                
                                                                  // SI QUITAS EL STATE APARECEN LAS JUSTIFICACIONES FALTANTES

                                                if ((validateOne.split("%")[0]) == validateTwo  && key == c) {
                                                    // date.push(key)
                                                    justificaciones.push({
                                                        Fecha:key,
                                                        Cliente:validateTwo,
                                                        Nombre:nombr,
                                                        Turno:turn,
                                                        Estado:incidenci,
                                                        Justificacion:just,
                                                        Suplencia:sup,
                                                        Observaciones:obser,
                                                        Ubicacion:ubic})
                                                }
                                            })
                
                                            })

                                            datos.forEach((item)=>{


                                                item.days.forEach((dialokobydiego,index)=>{

                                                    item.days[index] = {[Object.keys(dialokobydiego)[0]]:item.Nombre}
                                                    tangamandapio=(new Date(fechaD[index])).getDay()
                                                    justificaciones.forEach((iter)=>{

                                                        

                                                        operadores.forEach((nyx)=>{

                                                            // datos.push({Nombre:"a",Cliente:cl,Ubicacion:ubic,Horario:hr,Puesto:puesto,Descanso:dias,days:getDays(),Posicion:pos})
                                                            // operadores.push({Nombre:nombre,Cliente:cl,Ubicacion:ubic,Posicion:pos})

                                                        //     justificaciones.push({
                                                        //         Fecha:key,
                                                        //         Cliente:validateTwo,
                                                        //         Nombre:nombr,
                                                        //         Turno:turn,
                                                        //         Estado:incidenci,
                                                        //         Justificacion:just,
                                                        //         Suplencia:sup,
                                                        //         Observaciones:obser,
                                                        //         Ubicacion:ubic})
                                                        // }

                                                            if (item.Cliente == nyx.Cliente && item.Ubicacion == nyx.Ubicacion && item.Posicion == nyx.Posicion) {
                                                                item.Nombre = nyx.Nombre
                                                            }

                                                            else if (iter.Nombre == item.Nombre 
                                                                && iter.Cliente == item.Cliente 
                                                                && iter.Ubicacion == item.Ubicacion
                                                                && iter.Turno == item.Horario
                                                                && item.Posicion == nyx.Posicion
                                                                && +iter.Fecha.substring(0,2) == +Object.keys(dialokobydiego)[0]) {
                                                                item.days[index] = {[Object.keys(dialokobydiego)[0]]:iter.Suplencia}
                                                            }

                                                             if (iter.Cliente == item.Cliente 
                                                                && iter.Ubicacion == item.Ubicacion
                                                                && iter.Turno == item.Horario
                                                                
                                                                && item.Posicion == nyx.Posicion && nyx.Baja != null && nyx.Baja != "" && nyx.Baja.substring(8,10) < +Object.keys(dialokobydiego)[0]){
                                                                                    item.days[index] = {[Object.keys(dialokobydiego)[0]]:""}
                                                                                }

                                                            // else if (!item.Descanso.includes(diass[tangamandapio])){
                                                            //             item.days[index]= {[Object.keys(dialokobydiego)[0]]:""}
                                                            //             }

                                                        })

                                                    })
                                                })
                                            })

                                            
                                            // datos.forEach((item)=>{
                                                

                                            //        item.dias.forEach((dialokobydiego, index)=>{
                                            //         item.dias[index] = {[Object.keys(dialokobydiego)[0]]:item.Nombre}
                                                    
                                            //         justificaciones.forEach((iter)=>{
                                                     
                                                 

                                            //         // console.log(""+iter.Fecha.substring(0,2) +"=="+ Object.keys(dialokobydiego)[0]  );
                                            //         // console.log(dialokobydiego)
                                            //         // console.log(item.Nombre+"=="+iter.Nombre);

                                            //             // console.log("dialokobyDiego",item.Baja.substring(8,10))

                                            //             // if (item.Nombre == iter.Nombre && +iter.Fecha.substring(0,2) == +Object.keys(dialokobydiego)[0] )
                                                        

                                            //             tangamandapio=(new Date(fechaD[index])).getDay()

                                                        
                                                       
                                                      
                                                       
                                                         
                                            //              if (item.Nombre == iter.Nombre && item.Horario == iter.Turno && item.Cliente == iter.Cliente && +iter.Fecha.substring(0,2) == +Object.keys(dialokobydiego)[0] ) {
                                            //                 // console.log("Aqui se encontro algo :",{[Object.keys(dialokobydiego)[0]]:iter.Estado},"En el index:: ", index)
                                            //                 item.dias[index] = {[Object.keys(dialokobydiego)[0]]:iter.Suplencia}
                                                            
                                            //             }
        
                                                            

                                            //                 else if (item.Baja != null && item.Baja != "" && item.Baja.substring(8,10) < +Object.keys(dialokobydiego)[0]){
                                            //                     item.dias[index] = {[Object.keys(dialokobydiego)[0]]:""}
                                            //                 }

                                            //                 else if(item.Ingreso != null && item.Ingreso != "" && item.Ingreso.substring(8,10) > +Object.keys(dialokobydiego)[0]) {
                                            //                     item.dias[index] = {[Object.keys(dialokobydiego)[0]]:""}
                                            //                 } 
                                                            
                                            //                 else if (!item.descanso.includes(diass[tangamandapio])){
                                            //                     item.dias[index]= {[Object.keys(dialokobydiego)[0]]:""}
                                            //                 } 

                                                            

                                                            
                                                            

                                            //                 // else if (iter.Suplencia == "no se cubrio"){
                                            //                 //     iter.Suplencia = "F"
                                            //                 // }

                                            //                 // else if (iter.Suplencia == "F" & iter.Estado == "Vacaciones") {
                                            //                 //     iter.Suplencia = "V"
                                            //                 // }

                                            //                 // else if(item.Nombre == iter.Nombre) {
                                            //                 //     item.dias[index] = {[Object.keys(dialokobydiego)[0]]:item.Nombre}    
                                            //                 // }

                                            //                 // else if (item.Nombre == iter.Nombre 
                                            //                 //             && item.Horario == iter.Turno  
                                            //                 //             && item.Cliente == iter.Cliente 
                                            //                 //             && +iter.Fecha.substring(0,2) == +Object.keys(dialokobydiego)[0]
                                            //                 //             ){
                                            //                 //                 item.dias[index] = {[Object.keys(dialokobydiego)[0]]:item.Nombre}
                                            //                 //             }

                                                            

                                                            
                                                                
                                                            
                                                            

                                            //                 // else if(item.week != null && item.week != "" && item.week.substring(0,1) !=  nyx.substring(0,1)){
                                            //                 //     item.dias[index] = {[Object.keys(dialokobydiego)[0]]:""}
                                            //                 // }

                                  

                                            //         })
                                                   

                                            //     })
                                            


                                            // })

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



                
                        datos.forEach((iter)=>{
                            if (iter.Ingreso != null && iter.Ingreso != "" && iter.Ingreso < fffBaja  ) {
                                    iter.Ingreso = ""
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
            mostrarReporte();
         
            
        },1000)


    }

    if(loading){
        return(<Loading/>)
    }

    
    function getDays(){
        var days = [];
        for (let index = +dateOne.substring(8,10); index <= +dateTwo.substring(8,10); index++) {
            days.push({[index.toString()]:"/"});

        }


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

        <div className="cgHeader">    <h1>Reporte Mensual</h1> </div>

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
         <h1>Reporte </h1> 
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
                        
                       {diaSemanaArray.map((item)=>{ return (<th scope="col">{item}</th>)})} 

                    </tr>
                </thead>

                <tbody>
                    {

                        
                        datos.map((item)=>{
                            // var x = document.getElementById("generate").textContent
                            // if (x == "no se cubrio") {
                            //     document.getElementById("testColor").style.backgroundColor("#df2828a8");
                            // }
                            

                            return(

                                <tr>
                                    <td>
                                        {item.Cliente}
                                    </td>

                                    <td>
                                        {item.Ubicacion}
                                    </td>
                                        
                                   
                                    
                                    {
                                        item.days.map((d, inx)=>{
                                            
                                       

                                            // return(<td>{d[arrayD[inx.toString()]]}</td>)
                                            return (<td id="testColor">{d[arrayD[inx.toString()]]}</td>)
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

export default Pruebas