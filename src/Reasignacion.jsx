import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update,remove} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SideBar from "./Sidebar";
import './Reasignacion.css'




const Reasignacion = (reasignacion) => {


    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);  

    const [ubicArray,setUbicArray] = useState([])

    const [ubic,setUbic] = useState('')



    const [shift,setShift] = useState([])

    const [filt,setFilt] = useState([])

    var clean = [];
    let newClean = clean.filter(w => w.length ==13)
    
    // const arrayc =  filt.filter((element) => {
    //   return element.length = 13;
    // });


    var today = new Date().toISOString()

    var fecha = today.substring(8,10) + "-" +  today.substring(5,7) + "-" + today.substring(0,4)

    // console.log("today",today)

    // console.log("Fecha",fecha)

    // console.log(filt)

    // const arrayC = filt.filter(w => w.length <= 13 );
     
    // console.log(arrayC)

   


    const [tel,setTel] = useState();
    const [cliente,setCliente] = useState ('')
    const [nombre,setNombre] = useState('')
    const [datos,setDatos] = useState([])
    const [horario,setHorario] = useState('')
    const [posicion,setPosicion] = useState('')



    const oldClient = [];

    // console.log("oldClient",oldClient)

    datos.forEach((item)=>{
      if (item.id == nombre){
        oldClient.push(item.cl)
      }
    })

    const oldUbic = [];

    datos.forEach((x)=>{
      if (x.id == nombre){
        oldUbic.push(x.Ubicacion)
      }
    })

    const oldHr = []
    datos.forEach((y)=>{
      if(y.id == nombre){
        oldHr.push(y.Horario)
      }
    })

    const oldP = []

    datos.forEach((n)=>{
      if(n.id == nombre){
        oldP.push(n.Puesto)
      }
    })

    const oldPosicion = []
    datos.forEach((x)=>{
      if(x.id == nombre){
        oldPosicion.push(x.Posicion)
      }
    })

    console.log("oldPosicion",oldPosicion)

    const horarioV = []

    horarioV.push('')

    shift.forEach((x)=>{
      if(x.Cliente == cliente && x.Ubicacion == ubic){
        if(!horarioV.includes(x.Horario)){
          horarioV.push(x.Horario)
        }
      }
    })

    const posicionV = []

    posicionV.push('')

    shift.forEach((x)=>{
      if(x.Cliente == cliente && x.Ubicacion == ubic && x.Horario == horario){
        if(!posicionV.includes(x.Posicion)){
          posicionV.push(x.Posicion)
        }
      }
    })


    const [nombrecitos,setNombrecitos] = useState([]);
    
   
      if (!nombrecitos.includes("")){
        nombrecitos.push("")
      }
  


   



    const unicos = [];

    unicos.push('')
  
    shift.forEach((item)=>{
      if (!unicos.includes(item.Cliente)){
        unicos.push(item.Cliente)
      }
    });

    const vacanteName = []

    shift.forEach((x)=>{
      if(x.Cliente == cliente && x.Ubicacion == ubic && x.Horario == horario && x.Posicion == posicion){
        vacanteName.push(x.key)
      }
    })

    console.log("VacanteName",vacanteName)

    // console.log(unicos.sort())


    const handlerNombres = function (e) {
      const opcion = e.target.value
      setTel(e.target.value)
      // console.log("### "+ tel)
      // console.log("$$$" + opcion)

      

       datos.forEach (v=>{
         if (v.nm == opcion) {
          //  console.log(v.id,opcion)
           setNombre(v.id)
         }
       })

    }




    const [cl,setCl] = useState ([])


    const[modal,setModal] =useState(false)

    const handleShow = () => setModal(true)
  
    const handleClose = () => setModal(false)




    const[mod,setMod] =useState(false)

    const Show = () => setMod(true)
  
    const Close = () => setMod(false)

    

    function comprobar(event){
        event.preventDefault()


        if (tel == "" || cliente==""){
            handleShow(event);
        } else{
            Show(event);
            
        }

    }

    function finish (event){
      event.preventDefault()

      writeReasignacionData(event);
      writeReasignacionOpData(event);
      newVacant(event)
      removeData(event)
      Close();
    }


    function removeData(event){
      event.preventDefault()

      remove(ref(db,'Operador' + vacanteName[0].toString()))
    }

    function writeReasignacionData(event) {
        event.preventDefault()

        update(ref(db,'Reasignacion/' + fecha + tel.substring(0,2) + cliente.substring(0,2)),{
            Nombre: tel,
            Cliente:cliente,
            Horario:horario, 
            ClienteA:oldClient[0],
            UbicacionA:oldUbic[0],
            PosicionA:oldPosicion[0]
        })

        Close();
    }

    function writeReasignacionOpData(event){
      event.preventDefault()

        update(ref(db,'Operador/' + nombre),{
          Cliente:cliente,
          Horario:horario,
          Ubicacion:ubic,
          Posicion:posicion
        })
    }

    function newVacant(event){
      event.preventDefault()

      update(ref(db,'Operador/' + "Vacante" + nombre + oldClient[0]),{
        Cliente:oldClient[0],
        Estatus: 1,
        Fecha_Baja:"",
        Fecha_Ingreso:"",
        Horario:oldHr[0],
        Nombre: "Vacante",
        Puesto: oldP[0],
        Ubicacion: oldUbic[0],
        Posicion: oldPosicion[0]
      })
    }




    let config = {
        apiKey: "AIzaSyDnedHTB9yMEPhZTQDzI08rA7yDXAJq84I",
        authDomain: "vitek-c65e5.firebaseapp.com",
        databaseURL: "https:vitek-c65e5-default-rtdb.firebaseio.com",
        projectId: "vitek-c65e5",
        storageBucket: "vitek-c65e5.appspot.com",
        messagingSenderId: "1:180537252076:web:278e4849024501aaa52dc9",
        appId: "1:180537252076:web:278e4849024501aaa52dc9",
      };

  
      

      useLayoutEffect(()=>{
        datos.push({tel:"Seleccionar Teléfono"  })

        const dbRef = ref(getDatabase());
        get(child(dbRef,'Operador')).then((snapshot) => {
          if(snapshot.exists()){
            snapshot.forEach((childSnapshot)=>{
              var telefono= childSnapshot.child("ID").val()
              var nombre = childSnapshot.child("Nombre").val()
              var cliente = childSnapshot.child("Cliente").val()
              var ubic = childSnapshot.child("Ubicacion").val()
              var hr = childSnapshot.child("Horario").val()
              var puest = childSnapshot.child("Puesto").val()
              var posicion = childSnapshot.child("Posicion").val()
              var id = childSnapshot.key;
              
              

              if (nombre != "Vacante"){
               
                  nombrecitos.push(nombre)
              
                
              }

              if (nombre == "Vacante") {
                shift.push({Cliente:cliente,Ubicacion:ubic,Horario:hr,key:id,Posicion:posicion})
              }
              

              nombrecitos.sort()

              clean.push({id:id})
              

             datos.push({tel:telefono,cl:cliente,nm:nombre,id:id,Ubicacion:ubic,Horario:hr,Puesto:puest,Posicion:posicion}) 
              
             datos.sort()
             
            })
            
          }
        })


        // get(child(dbRef,'ClienteUbicacion')).then((snapshot)=>{
        //   if(snapshot.exists()){
        //     snapshot.forEach((childSnapshot)=>{
        //      var name = childSnapshot.child("Nombre").val()
        //      var ubic = childSnapshot.child("Ubicacion").val()


        //      shift.push(name)


          
        //       ubicArray.push({Ubicacion:ubic,Nombre:name})
         
             
        //     })

        //   }
        // })

      




      },[])
      const db = getDatabase();

      const ubicA = []

      ubicA.push('')

      shift.forEach((item)=>{
        if (item.Cliente == cliente){
            ubicA.push(item.Ubicacion)
        }
      })

      const ubicUnic = []

      ubicA.forEach((x)=>{
        if (!ubicUnic.includes(x)){
            ubicUnic.push(x)
        }
      })


      // shift.forEach((item)=>{
      //   if (!unicos.includes(item.Cliente)){
      //     unicos.push(item.Cliente)
      //   }
      // });

return(

    <div className="reasignacion">

<div className="adminSide">
            <SideBar></SideBar>
            
            </div>    

      <div className="roH">

        <h1 id="roHT" >
        <i id="ri" class="bi bi-arrow-down-up"></i>
          Reasignación del Operador
          </h1>

        </div>

        <div className="divR"></div>

    <div className="container">


        <label id="rfcL" class="form-outline-label">Nombre del Operador</label>

        <br />

        <select onClick={forceUpdate} value={tel} onChange={handlerNombres}>
        {nombrecitos.map((item)=> <option value={item}>{item}</option>)}    
        </select>
          <br/>
        <input type="text"class="form-control" id="number" value={nombre} />

        <br />
       


        <label class="form-outline-label">Cliente a reasignar</label>
        <br></br>
        <select onClick={forceUpdate} value={cliente} onChange={v=>{setCliente(v.target.value)}}>
            {/* {datos.map((item)=><option>{item.cl}</option>)} */}
            {/* <option>{unicos}</option> */}
            {unicos.map((item,i)=> <option>{item}</option>)}

        </select>

        <br/>

        <label class="form-otline-label">Ubicación a reasignar</label>
        <br/>
        <select onClick={forceUpdate} value={ubic} onChange={v=>{setUbic(v.target.value)}} >
            {ubicUnic.map((item)=><option>{item}</option>)}
        </select>

        <br/>

        <label class="form-outline-label" >Horario</label>
        <br/>

        <div className="horInputTurn">
        {/* <input type="number" id="select" onChange={v=>{setHorario(v.target.value)}}>
        </input>
            :

        <input type="number" onChange={v=>{setHorario2(v.target.value)}}></input> */}

        <select onClick={forceUpdate} value={horario} onChange={v=>{setHorario(v.target.value)}}>
        {horarioV.map((x)=><option>{x}</option>)}
        </select>

        <br/>

        <label class="form-outline-label">Posicion</label>

        <br/>

        <select onClick={forceUpdate} value={posicion} onChange={v=>{setPosicion(v.target.value)}}>
        {posicionV.map((x)=><option>{x}</option>)}
        </select>


        </div>
            <br></br>
            <br></br>


        <input class="btn btn-success" type="submit" value="Completar Reasignación" onClick={comprobar}></input>


        


    </div>

    <Modal className="modal-container" 
      show={modal}  
      onHide={handleClose } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...reasignacion}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Faltan datos</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>No se han proporcionado todo los datos</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={handleClose}>


Ok


  </Button>


</Modal.Footer>


</Modal>










<Modal className="modal-container" 
      show={mod}  
      onHide={Close } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...reasignacion}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>¿Está Seguro?</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>¿Está seguro que desea continuar con la reasignacion del operador "{tel}" a "{cliente}"?</p>


</Modal.Body>


<Modal.Footer>

<Button variant="success" onClick={finish}>
Si
  </Button>


  <Button variant="danger" onClick={Close}>


No


  </Button>


</Modal.Footer>


</Modal>









    
    </div>






)





}

export default Reasignacion