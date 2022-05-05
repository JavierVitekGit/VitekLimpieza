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

    // console.log("Justificaciones",justificaciones)

    const [reasig,setReasig] = useState([]);
    

   const [operadores,setOperadores] = useState([])



    const [fechaD,setFechaD] = useState([]);



    const [show,setShow] = useState([]);

    function mostrarReporte () {
        setShow(false)
    }

    function mostrarCalendario() {
        setShow(true)
    }

    const [each,setEach] = useState([]);
    each.push("1")

    const [datos,setDatos] = useState([]);

    // console.log("Datos",datos)

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
                    var ingreso = childSnapshot.child("Fecha_Ingreso").val()
                    var state = childSnapshot.child("Estatus").val()
                    var hr = childSnapshot.child("Horario").val()


                    if (pos != null && pos!= ""){
                        operadores.push({Nombre:nombre,Cliente:cl,Ubicacion:ubic,Posicion:pos,Baja:baja,Ingreso:ingreso,Estado:state,Horario:hr})
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
                       datos.push({Nombre:"ab",Cliente:cl,Ubicacion:ubic,Horario:hr,Puesto:puesto,Descanso:dias,days:getDays(),Posicion:pos})
                    //    datos.push({Nombre:["a"],Cliente:[cl],Ubicacion:[ubic],Horario:[hr],Puesto:[puesto],Descanso:[dias],days:getDays(),Posicion:[pos]})
                    //    datos.push({["Nombre"]:"a"},{["Cliente"]:cl},{["Ubicacion"]:ubic},{["Horario"]:hr},{["Puesto"]:puesto},{["Descanso"]:dias,days:getDays(),["Posicion"]:pos})
                       
                    //    days.push({[index.toString()]:"/"});

                    datos.sort((a,b) => {
                        if (a.Cliente < b.Cliente) return -1;
                        if (a.Cliente > b.Cliente) return 1
            
                        return 0;
                      })
            
                    //  datos.sort((a,b)=>{
                    //     if(a.Ubicacion < b.Ubicacion) return -1;
                    //     if(a.Ubicacion > b.Ubicacion) return 1
            
                    //     return 0;
            
                    // })  
            
                    


                   })

                   

                    datos.sort((a,b) => {
                        if (a.Cliente < b.Cliente) return -1;
                        if (a.Cliente > b.Cliente) return 1
            
                        return 0;
                      })


                    })

                      get(child(dbRef,'Justificaciones/')).then((jsnapshot)=>{

                        const diass = [
                            "Domingo",
                            "Lunes",
                            "Martes",
                            "Miércoles",
                            "Jueves",
                            "Viernes",
                            "Sábado"
                            
                        ]

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

                                                if (incidenci == null) {
                                                    incidenci = "/"
                                                }

                                                if (obser == "" && sup == "no se cubrio"){

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


                                        var state = ccSnapshot.child("estado").val()
                                       
                
                                    })
                
                                })
                                
                                
                            })

                            
                        }

                        

                        datos.some((item)=>{
                           

                            item.days.some((dialokobydiego,index)=>{

                                

                                

                                item.days[index] = {[Object.keys(dialokobydiego)[0]]:"a"}
                                tangamandapio=(new Date(fechaD[index])).getDay()
                                justificaciones.some((iter)=>{

                                    

                                    operadores.some((nyx)=>{

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

                                            // A N T E S
                         
                                            // if (nyx.Cliente == item.Cliente 
                                            //     && nyx.Ubicacion == item.Ubicacion
                                            //     && iter.Turno == item.Horario   
                                            //     && item.Posicion == nyx.Posicion 
                                            //     && nyx.Nombre == item.Nombre
                                            //     && nyx.Baja != null 
                                            //     && nyx.Baja != "" 
                                            //     && nyx.Baja.substring(5,7) >= dateOne.substring(5,7)
                                            //     && nyx.Baja.substring(8,10) >= +Object.keys(dialokobydiego)[0]){
                                            //     item.days[index] = {[Object.keys(dialokobydiego)[0]]:nyx.Nombre}
                                            //                     }
    
                                            // else if (nyx.Cliente == item.Cliente 
                                            //     && nyx.Ubicacion == item.Ubicacion
                                            //     && iter.Turno == item.Horario   
                                            //     && item.Posicion == nyx.Posicion 
                                            //     && nyx.Nombre == item.Nombre
                                            //     && nyx.Baja != null 
                                            //     && nyx.Baja != "" 
                                            //     && nyx.Baja.substring(5,7) > dateOne.substring(5,7)
                                            //     && nyx.Baja.substring(8,10) <= +Object.keys(dialokobydiego)[0]){
                                            //         item.days[index] = {[Object.keys(dialokobydiego)[0]]:nyx.Nombre}
                                            //     }
                                                                
                                            // else if (nyx.Cliente == item.Cliente 
                                            //     && nyx.Ubicacion == item.Ubicacion
                                            //     && iter.Turno == item.Horario   
                                            //     && item.Posicion == nyx.Posicion 
                                            //     && nyx.Nombre == item.Nombre
                                            //     && nyx.Ingreso != null 
                                            //     && nyx.Ingreso != "" 
                                            //     && nyx.Estado == 1
                                            //     && nyx.Ingreso.substring(5,7) <= dateOne.substring(5,7)
                                            //     && nyx.Ingreso.substring(8,10) <= +Object.keys(dialokobydiego)[0]){
                                            //                         item.days[index] = {[Object.keys(dialokobydiego)[0]]:nyx.Nombre}
                                            //                     } 
                                                                
                                          
                                            // else if (nyx.Cliente == item.Cliente 
                                            //     && nyx.Ubicacion == item.Ubicacion
                                            //     && iter.Turno == item.Horario   
                                            //     && item.Posicion == nyx.Posicion 
                                            //     && nyx.Nombre == item.Nombre
                                            //     && nyx.Ingreso != null 
                                            //     && nyx.Ingreso != ""
                                            //     && nyx.Estado == 1 
                                            //     && nyx.Ingreso.substring(5,7) < dateOne.substring(5,7)
                                            //     && nyx.Ingreso.substring(8,10) >= +Object.keys(dialokobydiego)[0]){
                                            //         item.days[index] = {[Object.keys(dialokobydiego)[0]]:nyx.Nombre}
                                            //     }
    
                                            // if(item.days[index][Object.keys(dialokobydiego)[0]]=="a" ){
                                            //     item.days[index]= {[Object.keys(dialokobydiego)[0]]:"No se cubrio"}
                                            // }                    
                                                                
                                                           
                                            // else if (!item.Descanso.includes(diass[tangamandapio])){
                                            //                 item.days[index]= {[Object.keys(dialokobydiego)[0]]:""}
                                            //                 }
    
                                            // if  (iter.Nombre == item.Nombre 
                                            //         && iter.Cliente == item.Cliente 
                                            //         && iter.Ubicacion == item.Ubicacion
                                            //         && iter.Turno == item.Horario
                                            //         && item.Posicion == nyx.Posicion
                                            //         && +iter.Fecha.substring(0,2) == +Object.keys(dialokobydiego)[0]) {
                                            //         item.days[index] = {[Object.keys(dialokobydiego)[0]]:iter.Suplencia}
                                            //     }      


                                        // P R U E B A

                                        // if (iter.Justificacion == "Descanso" || iter.Observaciones == "") {
                                        //     iter.Observaciones = "f"
                                        // }
                                        

                                        if  (iter.Nombre == nyx.Nombre 
                                                && iter.Cliente == nyx.Cliente 
                                                && iter.Ubicacion == item.Ubicacion
                                                && iter.Turno == item.Horario
                                                && item.Posicion == nyx.Posicion
                                                && ( iter.Observaciones != "" || iter.Justificacion != "")
                                                // && (iter.Justificacion == "Descanso" || iter.Observaciones == "")
                                                && +iter.Fecha.substring(3,5) == dateOne.substring(5,7)
                                                && +iter.Fecha.substring(0,2) == +Object.keys(dialokobydiego)[0]) {
                                                item.days[index] = {[Object.keys(dialokobydiego)[0]]:iter.Suplencia}
                                                    
                                            }
                                            
                                            if (nyx.Cliente == item.Cliente 
                                                && nyx.Ubicacion == item.Ubicacion
                                                && nyx.Horario == item.Horario   
                                                && item.Posicion == nyx.Posicion 
                                                && nyx.Nombre == item.Nombre
                                                && nyx.Baja != null 
                                                && nyx.Baja != "" 
                                                && nyx.Baja.substring(5,7) >= dateOne.substring(5,7)
                                                && nyx.Baja.substring(8,10) >= +Object.keys(dialokobydiego)[0]){
                                                item.days[index] = {[Object.keys(dialokobydiego)[0]]:nyx.Nombre}
                                                                }

    
                                            else if (nyx.Cliente == item.Cliente 
                                                && nyx.Ubicacion == item.Ubicacion
                                                && nyx.Horario == item.Horario   
                                                && item.Posicion == nyx.Posicion 
                                                && nyx.Nombre == item.Nombre
                                                && nyx.Baja != null 
                                                && nyx.Baja != "" 
                                                && nyx.Baja.substring(5,7) > dateOne.substring(5,7)
                                                && nyx.Baja.substring(8,10) <= +Object.keys(dialokobydiego)[0]){
                                                    item.days[index] = {[Object.keys(dialokobydiego)[0]]:nyx.Nombre}
                                                }


                                            if (nyx.Cliente == item.Cliente 
                                                && nyx.Ubicacion == item.Ubicacion
                                                && nyx.Horario == item.Horario   
                                                && item.Posicion == nyx.Posicion 
                                                && nyx.Nombre == item.Nombre
                                                && nyx.Ingreso != null 
                                                && nyx.Ingreso != "" 
                                                && nyx.Estado == 1
                                                && item.days[index][Object.keys(dialokobydiego)[0]]=="a"
                                                && nyx.Ingreso.substring(5,7) <= dateOne.substring(5,7)
                                                && nyx.Ingreso.substring(8,10) <= +Object.keys(dialokobydiego)[0]){
                                                item.days[index] = {[Object.keys(dialokobydiego)[0]]:nyx.Nombre}
                                                                } 


                                        else if (nyx.Cliente == item.Cliente 
                                            && nyx.Ubicacion == item.Ubicacion
                                            && nyx.Horario == item.Horario   
                                            && item.Posicion == nyx.Posicion 
                                            && nyx.Nombre == item.Nombre
                                            && nyx.Ingreso != null 
                                            && nyx.Ingreso != ""
                                            && nyx.Estado == 1 
                                            && nyx.Ingreso.substring(5,7) < dateOne.substring(5,7)
                                            && nyx.Ingreso.substring(8,10) >= +Object.keys(dialokobydiego)[0]){
                                                item.days[index] = {[Object.keys(dialokobydiego)[0]]:nyx.Nombre }
                                            }                        


                                            // if(item.days[index][Object.keys(dialokobydiego)[0]]=="a" ){
                                            //     item.days[index]= {[Object.keys(dialokobydiego)[0]]:"No se cubrio"}
                                            // }  

                                            else if (!item.Descanso.includes(diass[tangamandapio]) && item.days[index][Object.keys(dialokobydiego)[0]]!=iter.Suplencia){
                                                item.days[index]= {[Object.keys(dialokobydiego)[0]]:""}
                                                }

                                            
                                                
                                                 

                                            // console.log("item.days",item.days[index])
                                    })

                                })
                                if(item.days[index][Object.keys(dialokobydiego)[0]]=="a" ){
                                    item.days[index]= {[Object.keys(dialokobydiego)[0]]:"no se cubrio"}
                                }      
                            })
                            
                        })
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


        // datos.sort((a,b)=>{
        //     if(a.Nombre < b.Nombre) return -1;
        //     if(a.Nombre > b.Nombre) return 1

        //     return 0;

        // })

          

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
                <thead class="table-dark">
                    
                    <tr>
                        {/* <th scope="col">Nombre</th> */}
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
                                    {/* <td>
                                        {item.Nombre}
                                    </td> */}

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