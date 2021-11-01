import {React} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-infinite-calendar/styles.css';
import './Registro.css'


const Asistencia = (props) => { 

    function Todos() {
       /*     getCheck1();
        getCheck2();
        getCheck3();
        getCheck4();
        getCheck5();
      }
    */} 
    
    const getCheck1 =  () =>{
      let inpValue = document.getElementById("check1").value;
      document.getElementById("valueInput").innerHTML = inpValue;
    }
    
    const getCheck2 = () => {
      let inpValue2 = document.getElementById("check2").value;
      document.getElementById("valueInput2").innerHTML = inpValue2;
    }
    
    const getCheck3 = () => {
      let inpValue3 = document.getElementById("check3").value;
      document.getElementById("valueInput3").innerHTML = inpValue3;
    }
    
    const getCheck4 = () => {
      let inpValue4 = document.getElementById("check4").value;
      document.getElementById("valueInput4").innerHTML = inpValue4;
    }
    
    const getCheck5 = () => {
      let inpValue5 = document.getElementById("check5").value;
      document.getElementById("valueInput5").innerHTML = inpValue5;
    }
    
    
    function check1() {
      document.getElementById("check1").value="True";
      }
    
    function check2() {
      document.getElementById("check2").value="True2";
    }
    
    function check3() {
      document.getElementById("check3").value="True3";
    }
    
    function check4() {
      document.getElementById("check4").value="True4";
    }
    
    function check5() {
      document.getElementById("check5").value="True5";
    }
    
    
    
    function iff() {
      if (document.getElementById("check1").value="on") {
        document.getElementById("check1").value="True"
    
      } else  {
        document.getElementById("check1").value="True"  
      }
    
    }
    
    return(


        <div className="Background">

        <h1 id="head">Registro de Asistencia</h1>
  
  
  
      <table class="table table-bordered" id="Tabla">
      <thead class="table-dark">
        <tr>
          <th scope="col">Ubicación/Cliente</th>
          <th scope="col">Nombre</th>
          <th scope="col">Turno</th>
          <th scope="col">1</th>
          <th scope="col">2</th>
          <th scope="col">3</th>
          <th scope="col">4</th>
          <th scope="col">5</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" id="valueI">1</th>
          <td id="name1">Lorem</td>
          <td>Ipsum</td>
          <td>  <input class="form-check-input" type="checkbox" id="check1" onClick={iff}></input>  </td>
          <td>  <input class="form-check-input" type="checkbox" id="check2" onClick={check2}></input>  </td>
          <td>  <input class="form-check-input" type="checkbox" id="check3" onClick={check3}></input>  </td>
          <td>  <input class="form-check-input" type="checkbox" id="check4" onClick={check4}></input>  </td>
          <td>  <input class="form-check-input" type="checkbox" id="check5" onClick={check5}></input>  </td>
        </tr>     
        <tr>
          <th scope="row">2</th>
          <td>Lorem</td>
          <td>Ipsum</td>
          <td>  <input class="form-check-input" type="checkbox" id="check6" ></input>  </td>
          <td>  <input class="form-check-input" type="checkbox" id="check7" ></input>  </td>
          <td>  <input class="form-check-input" type="checkbox" id="check8" ></input>  </td>
          <td>  <input class="form-check-input" type="checkbox" id="check9" ></input>  </td>
          <td>  <input class="form-check-input" type="checkbox" id="check10"></input>  </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Lorem</td>
          <td>Ipsum</td>
          <td>  <input class="form-check-input" type="checkbox" id="check11"></input>  </td>
          <td>  <input class="form-check-input" type="checkbox" id="check12"></input>  </td>
          <td>  <input class="form-check-input" type="checkbox" id="check13"></input>  </td>
          <td>  <input class="form-check-input" type="checkbox" id="check14"></input>  </td>
          <td>  <input class="form-check-input" type="checkbox" id="check15"></input>  </td>
        </tr>
      </tbody>
    </table>
  
  
      <p id="valueInput"></p>
      <p id="valueInput2"></p>
      <p id="valueInput3"></p>
      <p id="valueInput4"></p>
      <p id="valueInput5"></p>
  
      <input class="btn btn-success" type="submit" value="Guardar" id="bt" onClick={Todos}></input>
  
      <input class="btn btn-danger" type="submit" value="Finalizar" id="bt2"></input>
  
    {/*  <input class="btn btn-success" type="submit" value="Agregar Celda" id="bt3"></input> */}
        
    </div>     

    )

}
export default Asistencia;