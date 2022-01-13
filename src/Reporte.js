import {React,useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Reporte.css'
import 'react-infinite-calendar/styles.css';
import { initializeApp } from 'firebase/app';
import {getDatabase,ref,update} from "firebase/database";

const Reporte =(reporte) => {

  const [Faltas,onChange] = useState('')
  const [Suplencias,onChange1] = useState('')
  const [Comentarios,onChange2] = useState('')


  let config = {
    apiKey: "AIzaSyDnedHTB9yMEPhZTQDzI08rA7yDXAJq84I",
    authDomain: "vitek-c65e5.firebaseapp.com",
    databaseURL: "https://vitek-c65e5-default-rtdb.firebaseio.com",
    projectId: "vitek-c65e5",
    storageBucket: "vitek-c65e5.appspot.com",
    messagingSenderId: "1:180537252076:web:278e4849024501aaa52dc9",
    appId: "1:180537252076:web:278e4849024501aaa52dc9",
  };
  
  
  var falta = Faltas
  var sup = Suplencias
  var id = ( Faltas.substr(0,3) + Suplencias.substr(0,3));
  
    const app = initializeApp(config);
    console.log(app);





    

    function writeReporteData(event) {
      event.preventDefault()
      const db = getDatabase();
      update(ref(db,'Reportes/' + id),{
         Faltas: Faltas,
         Suplencias: Suplencias,
         Comentarios: Comentarios
      });
    }


  

    function Todos (){
        getTxtArea();
      }
    
      const getTxtArea = () =>{
      let val = document.getElementById("txtA").value;
      document.getElementById("inpValue").innerHTML = val;
      }

    return(

    <div className="Reporte">
      <h1 id="th">
        Reporte Quincenal
      </h1>

      <br></br>
      

      <p>
        Faltas
      </p>
 

      <input type="date" class="form-control" value={Faltas} onChange={v=>onChange(v.target.value)}/>


     {/* <textarea class="form-control" placeholder="Inconformidades por faltas"></textarea>*/}

     {/* <InfiniteCalendar

      Component={withMultipleDates(Calendar)}
      selected={[]}
      width={370}
      height={170}
      interpolateSelection={defaultMultipleDateInterpolation}
      displayOptions={{showHeader:false}}
      theme={{selectionColor:"#E70909"}}

      /> */}

      <br></br>

      <p>
        Suplencias
      </p>


      <input type="date" class="form-control" value={Suplencias} onChange={v=>onChange1(v.target.value)}/>


      {/* <InfiniteCalendar

      Component={withMultipleDates(Calendar)}
      selected={[]}
      width={370}
      height={170}
      interpolateSelection={defaultMultipleDateInterpolation}
      displayOptions={{showHeader:false}}
      theme={{selectionColor:"#187BE5"}}
      /> */}

    {/*  <textarea class="form-control" placeholder="Suplencias presentadas"></textarea>*/}

      <br></br>

      <p>
        Comentarios
      </p>

      <p id="inpValue"></p>

      <textarea class="form-control" placeholder="Agregar Comentarios" id="txtA" value={Comentarios} onChange={v=>onChange2(v.target.value)}></textarea>
      <br></br>

      <div class="btn-group">

      <input class="btn btn-success" type="submit" value="Guardar" onClick={writeReporteData}></input>
      
      <input class="btn btn-primary" type="submit" value="Siguiente" id="Sig"></input>
      
      </div>

    </div>   

    )

}



export default Reporte