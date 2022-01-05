import {React,useState,useEffect,useCallback} from "react";
import {get, getDatabase,ref,child,update, push} from "firebase/database";
import { initializeApp } from "@firebase/app";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './Numero.css'
import useTranslation from 'next-translate/useTranslation'
import { array } from "i/lib/util";



const Numero = (numero) => {



    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []); 


    const [datnum,setDatnum] = useState([])

    

    const [arrayRfc,setArrayRfc] = useState([]);

    const arrayP = [];


    arrayRfc.filter((item)=> {
      if (item.rfc.length == 13) {
        arrayP.push(item.rfc)
      }
    })
    


    console.log("RESULT",arrayP)


    const [rfc,setRfc] = useState('')
    const [nombre,setNombre] = useState('')
    const [num,setNum] = useState('')
    const [nuevo,setNuevo] = useState('')



    const[modal,setModal] =useState(false)

    const handleShow = () => setModal(true)
  
    const handleClose = () => setModal(false)



    const [mod,setMod] = useState(false)
    const show = () => setMod(true)
    const close = () => setMod(false)


    const [repeatMod,setRepeatMod] = useState(false)
    const showRepeat = () => setRepeatMod(true)
    const closeRepeat = () => setRepeatMod(false)


    
    const handlerRfc = function (e) {
        const opcion = e.target.value
        setRfc(e.target.value)
        console.log("### "+ rfc)
        console.log("$$$" + opcion)
  
        
  
         datnum.forEach (v=>{
           if (v.rfc == opcion) {
             console.log(v.rfc,opcion)
             setNombre(v.nombre) 
             setNum(v.numero)
           }
         })
  
      }
      const db = getDatabase();

      function writeNewData(event){
          event.preventDefault()
          update(ref(db,'Operador/' + rfc),{
          ID:nuevo
          });
      }

      function comprobar(event) {
        event.preventDefault()

       


        if (rfc == "" ||  nuevo == ""){
          show(event);
        } else {
          writeNewData(event);
          handleShow(event);
        }
        
      }

        
          // datnum.forEach(num => {
          //   if (num.numero == nuevo) {
          //     showRepeat()
          //   }
          // })
        

      // datnum.forEach(num => {
      //   if (num.numero == nuevo) {
      //       showRepeat();
      //   }
      // })


    useEffect(()=> {


      const firebaseConfig = {
        apiKey: "AIzaSyBmZRACI4lPavlz-2N0NyIvTIW9j2DOJhY",
        authDomain: "androidbrinsk.firebaseapp.com",
        databaseURL: "https://androidbrinsk-default-rtdb.firebaseio.com",
        projectId: "androidbrinsk",
        storageBucket: "androidbrinsk.appspot.com",
        messagingSenderId: "1038423598895",
        appId: "1:1038423598895:web:ddfe2d9c575506d192a3da"
      };
  
  
  
  
      const app = initializeApp(firebaseConfig);
  
      console.log(app)
  
  
      
  
      const dbRef = ref(getDatabase());
  


      get(child(dbRef,'Operador')).then((snapshot)=>{
          if(snapshot.exists()){
              snapshot.forEach((childSnapshot)=>{
                  var rf = childSnapshot.key
                  var nombre = childSnapshot.child("Nombre").val()
                  var num = childSnapshot.child("ID").val()

                  datnum.push({rfc:rf,nombre:nombre,numero:num})
                  arrayRfc.push({rfc:rf})
                  console.log(datnum)
                  console.log("RFC",arrayRfc)


                
              })

              
      


          }
      })

    },[])
 



return(





    <div className="Numero">

    <div className="NHeader">
          <h1 id="cnH">
          <i id="cnI" class="bi bi-arrow-repeat"></i>
          Cambio de Número
          </h1>
    </div>

    <div className="NBody">

    <label class="form-outline-label">RFC</label>

    <br/>

  

    <select onClick={forceUpdate} onChange={handlerRfc} >
    {arrayP.map((item)=><option>{item}</option>)}




    </select>
    <br/>

      {/* <input type="text" class="form-control" /> */}


      
      <label class="form-outline-label">Nombre del Operador</label>

      <input type="text" class="form-control" value={nombre}></input>




      <label class="form-outline-label">Número Anterior</label>

      <input type="text" class="form-control" value={num}></input>


      
      <label class="form-outline-label">Número Nuevo</label>

      <input type="number" class="form-control" value={nuevo} onChange={v=>setNuevo(v.target.value)}></input>


      <br/>

      <input class="btn btn-success" type="submit" value="Actualizar" onClick={comprobar} id="cnB"></input>

    
    </div>
    
    <Modal className="modal-container" 
      show={modal}  
      onHide={handleClose } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...numero}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Cambio Exitoso</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>El cambio de numero ha sido realizado exitosamente</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="success" onClick={handleClose}>


Ok


  </Button>


</Modal.Footer>


</Modal>


<Modal className="modal-c" 
      show={mod}  
      onHide={close } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...numero}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Cambio Fallido</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>No se han completado los datos necesarios</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={close}>


  Ok


  </Button>


</Modal.Footer>


</Modal>




<Modal className="modal-nr" 
      show={repeatMod}  
      onHide={closeRepeat } 
      animation={true} 
      backdrop="static" 
      keyboard={false}   
      {...numero}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>


<Modal.Header>


<Modal.Title>Número incorrecto</Modal.Title>


</Modal.Header>


<Modal.Body>


<p>El número ingresado ya ha sido registrado anteriormente</p>


</Modal.Body>


<Modal.Footer>


  <Button variant="danger" onClick={closeRepeat}>


Ok


  </Button>


</Modal.Footer>


</Modal>




    </div>

)


}

export default Numero;