import React, {useState,useCallback } from 'react'
import {BrowserRouter,Link,useNavigate} from "react-router-dom";
const SideBar = (sideBar) => {

const [inactive,setInactive] = useState(true)




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
        <div className="b"> <i class="bi bi-newspaper" onClick={()=>setInactive(!inactive)} title="Datos del Cliente"></i>
         <Link to="/Alta del Cliente" >   <p className="alta" >Alta del Cliente</p></Link> 
         {/* history("/Alta del Cliente") */}
        </div>

                <div className="baja"> 
        <Link to= "/Baja del Cliente">   <p className="baja" >Baja del Cliente</p></Link> 
                 </div>


                 <div className="turno">
        <Link to="/Anadir Turno">        <p className="turno" >Añadir Turno</p></Link>
                 </div>


                 </div>


                 <div className="section2">
    

        <div className="a"> <i class="bi bi-phone-fill" onClick={()=>setInactive(!inactive)} title="Datos del Operador"></i>
        <Link to ="/Alta del Operador">   <p className="alta-op" >Alta del Operador</p></Link>
        </div>

                <div className="baja-op">
        <Link to="/Baja del Operador">    <p className="baja-op" >Baja del Operador</p></Link>           
                </div>



                <div className="reasignacionn">
        <Link to="/Reasignacion"> <p className="reasignacion-op" >Reasignación</p></Link>
                </div>

                <div className="cambio">
        <Link to="/Cambio de Numero"> <p className="cambioN" >Cambio de Número</p></Link>
                </div>


                </div>


                <div className="section3">


                {/* <div className="Inasistencias"> <i class="bi bi-calendar-check" onClick={()=>setInactive(!inactive)} title="Registro de Justificaciones"></i> 
        <Link to="/Inasistencia"> <p className="registroIn" >Inasistencias</p> </Link>    


                </div> */}


        <div className="calendario"> 
        <Link to="/Calendario"> <p className="registro" >Justificaciones</p> </Link>    


                </div>
        
        </div>               

    </div>
<div className="Container">


</div>

   {/* </BrowserRouter> */}


</div>


)

}


export default SideBar;