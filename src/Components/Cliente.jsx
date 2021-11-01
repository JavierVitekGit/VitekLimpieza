import {React,useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Cliente.css'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import InfiniteCalendar,{Calendar,defaultMultipleDateInterpolation,withMultipleDates} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { connect, Connect } from "react-redux";
import { Provider } from "react-redux";
import store from "./Store/Store";


const Cliente = (props) =>   { 

    

    
 
  

    const [value, onChange ] = useState([new Date(), new Date()]);
    const [value2,onChange2] = useState(['9:00', '6:00']);


  
    function Todos(){

        getInput2();
        getInput3();
        getInput4();

      }
      


      const getInput1 = (id) =>{
      let inputValue = document.getElementById("d1").value;   
      
      }
      
      const getInput2 = () => {
        let input = document.getElementById("d2").value;
        document.getElementById("valueI").innerHTML = input;
      }
      
      const getInput3 = () =>{ 
        let fecha = value;
        document.getElementById("value3").innerHTML = fecha;
      }
      
      const getInput4 = () => {
        let hora = value2;
        document.getElementById("value4").innerHTML = hora;
      }



        return(


    <div className="Usuario">

          


   
   <div className="App-header">
     <h1 className="dth"> 
       Datos del Cliente
     </h1>

          

   <div className="Datos"> 


       <label class="form-outline-label" for="form1">Nombre</label>
         <input type="text" id="d1" class="form-control" />



      <p id="valueInput"></p>

       <label class="form-outline-label" for="form1">Domicilio</label>


         <input type="text" id="d2" class="form-control" />


      <p id="valueI"></p>


       <label class="form-outline-label" for="form3">Horario</label>


       <br></br>


       <DateRangePicker
       onChange={onChange}
       value={value}
       id="date1"/>

       <p id="value3"></p>

       <br></br>
       <br></br>

       <TimeRangePicker id="reloj"
       onChange={onChange2}
       value={value2}
       ampmAriaLabel="Select AM/PM"
       
       disableClock="true"
       />

       <p id="value4"> </p>

       <br></br>
        
       <label class="form-outline-label" for="form1">Descansos</label>

  
      <InfiniteCalendar

      Component={withMultipleDates(Calendar)}
      selected={[]}
      width={370}
      height={170}
      interpolateSelection={defaultMultipleDateInterpolation}
      displayOptions={{showHeader:false}}
      id="InfCal"
      />



       <br></br>
       <br></br>

   <input class="btn btn-success" type="submit" value="Guardar" onClick={Todos}></input>
   <input class="btn btn-primary" type="submit" value="Siguiente" id="btn1" ></input>

    </div>


   </div>

  
    </div>

    
    


        )
  
}

export default Cliente;
