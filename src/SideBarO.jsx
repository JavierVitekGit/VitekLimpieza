import React, {useState,useCallback } from 'react'
import {BrowserRouter,Link,useNavigate} from "react-router-dom";
const SideBarO = (sideBar) => {

const [inactive,setInactive] = useState(true)

const history = useNavigate();

const cliente = () => {
    history("Alta del Cliente");
}

const bajaCliente = () => {
    history("/Baja del Cliente");
}

const turno = () => {
    history("/Añadir Turno");
}

const Operador = () => {
    history("/Alta del Operador");
}

const bajaOperador = () => {
    history("/Baja del Operador O");
}

const Reasignacion = () => {
    history("/Reasignacion");
}

const Numero = () => {
    history("/Cambio de Numero");
}

const Registro = () => {
    history("/Calendario");
}

const Inasistencia = () => {
    history("/Inasistencia");
}


// document.addEventListener('click', function(event) {
//     if(event.target.id != 'botonQueMuestraMenu' && event.target.id != 'menu'){
//       document.getElementById('menu').style.display = 'none';
//     }
//   });



const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);  

return (
    


<div className={`side-menu ${inactive ? "inactive" : ""}` } /*onClick={()=>setInactive(!inactive)}*/>

    <div className="top-section">
        <div className="toggle-btn" id="btn1" onClick={()=>setInactive(!inactive)}>
        <i class="bi bi-text-left"></i>
        </div>
    </div>


    <div className="menu-section">
        <div className="Icon"> <i class="bi bi-diamond-half" onClick={()=>setInactive(!inactive)}></i> </div>
        <p className="men">ABC</p>
    </div>

    {/* <div className="divider"></div> */}

   {/* <BrowserRouter> */}

    <div className="Cliente">
        <p>Cliente</p>
    </div>

    
    <div className="divider2"></div>


    <div className="Operador">
        <p>Operador</p>
    </div>

    <div className="divider3"></div>


    <div className="Registros">
        <p>Registros</p>
    </div>

    <div className="divider4"></div>
    

    <div className="lista">
                <div className="section1">
   


                 <div className="turno">
        <Link to="/Anadir Turno O">        <p className="turno" onClick={turno}>Añadir Turno</p></Link>
                 </div>


                 </div>

                 <div className="a"> 
                 <div className="section2">
    
        <br></br>
        <br></br>
        <br></br>
        

        </div>





                <div className="reasignacionn">
        <Link to="/Reasignacion O"> <p className="reasignacion-op" onClick={Reasignacion}>Reasignación</p></Link>
                </div>

                <div className="cambio">
        <Link to="/Cambio de Numero O"> <p className="cambioN" onClick={Numero}>Cambio de Número</p></Link>
                </div>


                </div>


                <div className="section3">


                {/* <div className="Inasistencias"> <i class="bi bi-calendar-check" onClick={()=>setInactive(!inactive)} title="Registro de Justificaciones"></i> 
        <Link to="/Inasistencia O"> <p className="registroIn" onClick={Inasistencia}>Inasistencias</p> </Link>    


                </div> */}
                <br/>


        <div className="calendario"> 
        <Link to="/Calendario O"> <p className="registro" onClick={Registro}>Justificaciones</p> </Link>    


                </div>
        
        </div>               

    </div>
<div className="Container">


</div>

   {/* </BrowserRouter> */}


</div>


)

}


export default SideBarO;