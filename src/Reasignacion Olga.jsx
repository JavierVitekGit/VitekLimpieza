import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './Reasignacion.css'
import SideBarO from "./SideBarO";



const ReasignacionOlga = (reasignacion) => {


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

    const [horario,setHorario] = useState('')



    const [arrayClientCl,setArrayClientCl] = useState([]);

    const [arrayNamae,setArrayNamae] = useState([]);


    const unicos = [];

    shift.forEach((item)=>{
      if (!unicos.includes(item.cli)){
        unicos.push(item.cli)
      }
    });

    console.log(unicos.sort())


    const unicName = [];
    arrayNamae.forEach((item)=>{
      if(!unicName.includes(item)){
        unicName.push(item)
      }
    })

    unicName.sort()

    const unicClient = [];
    arrayClientCl.forEach(item=>{
      if(!unicClient.includes(item)){
        unicClient.push(item)
      }
    })

    unicClient.sort()


    const handlerNombres = function (e) {
      const opcion = e.target.value
      setTel(e.target.value)
      console.log("### "+ tel)
      console.log("$$$" + opcion)

      

       datos.forEach (v=>{
         if (v.nm == opcion) {

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

        update(ref(db,'Operador/' + tel),{
            Cliente:cliente,
            Horario:horario
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
        datos.push({tel:"Seleccionar Tel??fono"  })
        const dbRef = ref(getDatabase());


        
        get(child(dbRef,'Operador')).then((snapshot)=>{
          if(snapshot.exists()){
            snapshot.forEach((childSnapshot)=>{
              var sup = childSnapshot.child("Supervisor").val()
              var name = childSnapshot.child("Nombre").val()
              var client = childSnapshot.child("Cliente").val()
              if(sup=="Olga") {
                arrayClientCl.push(client)
                arrayNamae.push(name)
              }
            })
          }
        })

        arrayClientCl.sort()
        arrayNamae.sort()



        
        get(child(dbRef,'Operador')).then((snapshot) => {
          if(snapshot.exists()){
            snapshot.forEach((childSnapshot)=>{
              var telefono= childSnapshot.child("ID").val()
              var nombre = childSnapshot.child("Nombre").val()
              var cliente = childSnapshot.child("Cliente").val()
              var id = childSnapshot.key;
              
              
              arrayNamae.push(nombre)

              clean.push({id:id})
              

             datos.push({tel:telefono,cl:cliente,nm:nombre,id:id}) 
              
             
            })

          //   arrayClientCl.forEach((other => {
          //     datos.forEach(iter => {
          //       if (iter.cl == other){
          //           arrayNamae.push(iter.nm)

          //           console.log("Lourdes:",arrayNamae)
          //           arrayNamae.sort();
          //       }
          //   })
          // }))

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

<div className="SideOlgaBb">
            <SideBarO/>
            
            </div>

      <div className="roH">

        <h1 id="roHT" >
        <i id="ri" class="bi bi-arrow-down-up"></i>
          Reasignaci??n del Operador
        
          </h1>

        </div>

        <div className="divR"></div>

    <div className="container">


        <label id="rfcL" class="form-outline-label">Nombre del Operador</label>

        <br />

        <select onClick={forceUpdate} value={tel} onChange={v=> setTel(v.target.value),handlerNombres}>
        {unicName.map((item)=> <option value={item}>{item}</option>)}    
        </select>
          <br/>
        <input type="text"class="form-control" id="number" value={nombre} />

        <br />
       


        <label class="form-outline-label">Cliente a reasignar</label>
        <br></br>
        <select onClick={forceUpdate} value={cliente} onChange={v=>{setCliente(v.target.value)}}>

            {unicClient.map((item,i)=> <option>{item}</option>)}

        </select>

        <br/>
        <br/>

        <label class="form-outline-label" >Nuevo horario</label>
        <br/>
        <select onClick={forceUpdate} id="select" onChange={v=>{setHorario(v.target.value)}}>

          {/* {shift.map((item)=><option>{item.hora}</option>)} */}
          

          <option></option>
          <option >Matutino </option>
          <option >Vespertino </option>
 
        </select>

            <br></br>
            <br></br>


        <input class="btn btn-success" type="submit" value="Completar Reasignaci??n" onClick={comprobar}></input>


        


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


<Modal.Title>??Est?? Seguro?</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>??Est?? seguro que desea continuar con la baja del operador "{nombre}"?</p>


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

export default ReasignacionOlga