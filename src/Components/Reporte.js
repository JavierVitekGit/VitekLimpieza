import {React} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Reporte.css'
import InfiniteCalendar,{Calendar,defaultMultipleDateInterpolation,withMultipleDates} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';


const Reporte =(props) => {

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
 
     {/* <textarea class="form-control" placeholder="Inconformidades por faltas"></textarea>*/}

     <InfiniteCalendar

      Component={withMultipleDates(Calendar)}
      selected={[]}
      width={370}
      height={170}
      interpolateSelection={defaultMultipleDateInterpolation}
      displayOptions={{showHeader:false}}
      theme={{selectionColor:"#E70909"}}

      />

      <p id="inpV"></p>
      <br></br>

      <p>
        Suplencias
      </p>

      <InfiniteCalendar

      Component={withMultipleDates(Calendar)}
      selected={[]}
      width={370}
      height={170}
      interpolateSelection={defaultMultipleDateInterpolation}
      displayOptions={{showHeader:false}}
      theme={{selectionColor:"#187BE5"}}
      />

    {/*  <textarea class="form-control" placeholder="Suplencias presentadas"></textarea>*/}

      <br></br>

      <p>
        Comentarios
      </p>

      <p id="inpValue"></p>

      <textarea class="form-control" placeholder="Agregar Comentarios" id="txtA"></textarea>
      <br></br>

      <input class="btn btn-success" type="submit" value="Guardar" onClick={Todos}></input>
      
      <input class="btn btn-primary" type="submit" value="Siguiente" id="Sig"></input>



    </div>   

    )

}
export default Reporte;