import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SideBar from "./Sidebar";
import './Reasignacion.css'




const Reasignacion = (reasignacion) => {


    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);  


    const [shift,setShift] = useState([])

    const [filt,setFilt] = useState([])

    var clean = [];
    let newClean = clean.filter(w => w.length ==13)
    
    // const arrayc =  filt.filter((element) => {
    //   return element.length = 13;
    // });




    console.log(filt)

    // const arrayC = filt.filter(w => w.length <= 13 );
     
    // console.log(arrayC)



    const [tel,setTel] = useState();
    const [cliente,setCliente] = useState ('')
    const [nombre,setNombre] = useState('')
    const [datos,setDatos] = useState([])

    const [nombrecitos,setNombrecitos] = useState([]);

    const [horario,setHorario] = useState('')
    const [horario2,setHorario2] = useState('')


    const unicos = [];

    shift.forEach((item)=>{
      if (!unicos.includes(item.cli)){
        unicos.push(item.cli)
      }
    });

    console.log(unicos.sort())


    const handlerNombres = function (e) {
      const opcion = e.target.value
      setTel(e.target.value)
      console.log("### "+ tel)
      console.log("$$$" + opcion)

      

       datos.forEach (v=>{
         if (v.nm == opcion) {
           console.log(v.id,opcion)
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




    function writeReasignacionData(event) {
        event.preventDefault()

        update(ref(db,'Operador/' + nombre),{
            Cliente:cliente,
            Horario:horario + ":" + horario2
        })

        Close();
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
              var id = childSnapshot.key;
              
              
              nombrecitos.push(nombre)

              nombrecitos.sort()

              clean.push({id:id})
              

             datos.push({tel:telefono,cl:cliente,nm:nombre,id:id}) 
              
             datos.sort()
             
            })
            
          }
        })


        get(child(dbRef,'ClienteUbicacion')).then((snapshot)=>{
          if(snapshot.exists()){
            snapshot.forEach((childSnapshot)=>{
              var clientes = childSnapshot.key;

              cl.push({clientes:clientes})

            })

          }
        })

        
        get(child(dbRef,'shift/')).then((snapshot)=>{
          if(snapshot.exists()){
            snapshot.forEach((childSnapshot)=>{
              var hora = childSnapshot.child("horaInicio").val()
              var cliente  = childSnapshot.child("cliente").val()

              shift.push({hora:hora,cli:cliente})
              
              

            })

            

          }
        })




      },[])
      const db = getDatabase();




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
        <br/>

        <label class="form-outline-label" >Nuevo horario</label>
        <br/>

        <div className="horInput">
        <input type="number" id="select" onChange={v=>{setHorario(v.target.value)}}>
        </input>
            :

        <input type="number" onChange={v=>{setHorario2(v.target.value)}}></input>

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


<p>¿Está seguro que desea continuar con la baja del operador "{nombre}"?</p>


</Modal.Body>


<Modal.Footer>

<Button variant="success" onClick={writeReasignacionData}>
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