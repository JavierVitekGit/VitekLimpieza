import SidebarPro from './SidebarResponsive';

export {React,useState} from 'react';

const Supervisores = (supervisores) => {




    

return(

    <div className="reasignacion">

<div className="adminSide">
            <SidebarPro></SidebarPro>
            
            </div>    

      <div className="roH">

        <h1 id="roHT" >
        <i id="ri" class="bi bi-arrow-down-up"></i>
          Reasignacion de supervisor
          </h1>

        </div>

        <div className="divR"></div>

    <div className="container">


        <label id="rfcL" class="form-outline-label">Nombre del Cliente</label>

        <br />

        <select >

        </select>
          <br/>
     
          <label class="form-otline-label">Ubicación a reasignar</label>
        <br/>
        <select  >
         
        </select>

        <br/>

       


        <label class="form-outline-label">Supervisor a reasignar</label>
        <br></br>
        <select>


        </select>

        <br/>

       

        <br/>

        <input class="btn btn-success" type="submit" value="Completar Reasignación"></input>


        


    </div>

   







    
    </div>






)

}

export default Supervisores