import { React} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Personal.css'
import 'react-infinite-calendar/styles.css';
import { connect } from "react-redux";




const Personal = (props) => {

    function Todos (){
        getInp1();
        getInp2();
        getInp3();
        getInp4();
        getInp5();
      }
  
    
      const getInp1 = () => {
        let inp1 =document.getElementById("inp1").value;
        document.getElementById("txt1").innerHTML = inp1;
      }
    
      const getInp2 = () => {
        let inp2 = document.getElementById("inp2").value;
        document.getElementById("txt2").innerHTML = inp2;
      }
    
      const getInp3 = () => {
        let inp3 = document.getElementById("inp3").value;
        document.getElementById("txt3").innerHTML = inp3;
      }
    
      const getInp4 = () => {
        let inp4 = document.getElementById("inp4").value;
        document.getElementById("txt4").innerHTML = inp4;
      }
    
       const getInp5 = () => {
        let inp5 = document.getElementById("inp5").value;
        document.getElementById("txt5").innerHTML = inp5;
      }

    return(
           
        <div className="Usuario">

        <div className="App-header">
            
            <h1 className="dt"> 
              Datos del Personal
            </h1>


            
          <div className="Datos"> 
              <label class="form-outline-label" for="form1">ID</label>
                <input type="text" id="inp1" class="form-control" />

                <p id="txt1"></p>
        
              <label class="form-outline-label" for="form1">Nombre Completo</label>
                <input type="text" id="inp2" class="form-control" />

                <p id="txt2"></p>
          

              <label class="form-outline-label" for="form1" >Fecha de Ingreso</label>
                <input type="Date" id="inp3" class="form-control" />

                <p id="txt3"></p>
    

              <label class="form-outline-label" for="form1">Fecha de baja</label>
                <input type="Date" id="inp4" class="form-control" />

                <p id="txt4"></p>

              <label class="form-outline-label" for="form1">Cliente</label>
                <input type="text" id="inp5" class="form-control" />
                
                <p id="txt5"></p>


              <br></br>
              <br></br>


          <input class="btn btn-success" type="submit" value="Guardar" onClick={Todos}></input>

          <input class="btn btn-primary" type="submit" value="Siguiente" id="btn2"></input>

 
          
          </div>
          
        </div>
      </div>

    )

}
export default Personal;