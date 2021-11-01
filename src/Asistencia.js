import {React,useEffect,useState,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-infinite-calendar/styles.css';
import './Registro.css'
import { initializeApp } from 'firebase/app';
import {getDatabase,ref,child,get,update} from "firebase/database";



const Asistencia = (asistencia) => { 

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);  

  console.log(forceUpdate)


  const [value1,onChange1] = useState('Inasistencia')
  const [value2,onChange2] = useState('Inasistencia')
  const [value3,onChange3] = useState('Inasistencia')


  const [tabla,onChange] = useState([ ])


  const [domicilio,setDomicilio] = useState('')
  const [nombre,setNombre] = useState('')
  const [turno,setTurno] = useState('')

  const [map2,setOperador] = useState([ ])


  const [drop1,setDrop] = useState('')
  const [drop2,setDrop2] = useState('')
  const [drop3,setDrop3] = useState('')


  const [name2,setN] = useState('')


  const db = getDatabase();




  function writeAsistenciaData(event) {
    event.preventDefault()
    
    update(ref(db,'Asistencia/' + "3"),{
      Ubicación_Cliente: domicilio,
      Nombre: nombre,
      Turno: turno,  
      t1:value1,
      comentario:drop1,
      t2:value2,
      comentario2:drop2,
      t3:value3,
      comentario3:drop3
      
    })    

    


  };





  useEffect(()=> {

    map2.forEach(v=>{
      setN(v.nameOp)
    })


    tabla.forEach(v=>{
      setDomicilio (v.dom)
      setNombre(v.nom)
      setTurno(v.turn)
    })
   


  let config = {
    apiKey: "AIzaSyDnedHTB9yMEPhZTQDzI08rA7yDXAJq84I",
    authDomain: "vitek-c65e5.firebaseapp.com",
    databaseURL: "https://vitek-c65e5-default-rtdb.firebaseio.com",
    projectId: "vitek-c65e5",
    storageBucket: "vitek-c65e5.appspot.com",
    messagingSenderId: "1:180537252076:web:278e4849024501aaa52dc9",
    appId: "1:180537252076:web:278e4849024501aaa52dc9",
  };

  const app = initializeApp(config);




  
  const dbRef = ref(getDatabase());
  get(child(dbRef,'Clientes')).then((snapshot) => {
    if(snapshot.exists()){
      snapshot.forEach((childSnapshot)=>{

        var domicilio = childSnapshot.child("Domicilio").val()
        var nombreC = childSnapshot.child("Nombre").val()
        var turnoC =  childSnapshot.child("Horario").val()
        var cl = childSnapshot.child("Nombre").val()

        tabla.push({dom:domicilio,nom:nombreC,turn:turnoC,nombre:cl})
        console.log(tabla)
        
      })


      
    }
  })




  get(child(dbRef,'Operador')).then((snapshot)=>{
    if(snapshot.exists()){
      snapshot.forEach((childSnapshot)=>{
        var operador = childSnapshot.child("Nombre").val()
        var cliente = childSnapshot.child("Cliente").val()
        
        map2.push({nameOp:operador, cliente:cliente })
        console.log(map2)

      })


      tabla.forEach(iter => {
        map2.forEach(other => {
          if (other.cliente == iter.nom) {
            iter.nom = other.nameOp
          }

        })
      })
    }
  })
  
},[])
  


    
    
    
    return(


        <div className="Background">

        <h1 id="head">Registro de Inasistencia</h1>
  
  
  
      <table class="table table-bordered" id="Tabla">
      <thead class="table-dark">
        <tr>
          <th scope="col">Cliente/Ubicación</th>
          <th scope="col">Nombre Operador</th>
          <th scope="col">Turno</th>
          <th scope="col">1</th>
          <th scope="col">2</th>
          <th scope="col">3</th>

        </tr>
      </thead>
      <tbody>


   
       { tabla.map((item)=> 
         <tr>

         <td>
            {item.nombre}
            <br/>
            {item.dom}
         </td>

         <td>{item.nom}</td>
         <td>{item.turn}</td> 


         <td>
           <select onChange={v=>onChange1(v.target.value)} >
           <option>Inasistencia</option>
           <option>Asistencia</option>
           </select>
           <textarea placeholder="Motivo de la asistencia" onChange={v=>setDrop(v.target.value)}></textarea> 
        </td>


         <td>
           <select onChange={v=>onChange2(v.target.value)}>
           <option>Inasistencia</option>
           <option>Asistencia</option>
           </select>
           <textarea placeholder="Motivo de la asistencia" onChange={v=>setDrop2(v.target.value)}></textarea> 
         </td>


         <td>
         <select onChange={v=>onChange3(v.target.value)}>
           <option>Inasistencia</option>
           <option>Asistencia</option>
           </select>
           <textarea placeholder="Motivo de la asistencia" onChange={v=>setDrop3(v.target.value)}></textarea> 
         </td>



         </tr>
         
         )}
         
      </tbody>
      
    </table>



  
      <div class = "btn-group">
  


      <input class="btn btn-success" type="submit" value="Guardar" onClick={writeAsistenciaData} id="bt"></input>

     
  
      </div>    
        
    </div>     

    )

}


export default Asistencia;