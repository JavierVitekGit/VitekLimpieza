import React, { useEffect, useState,useCallback } from 'react'
import {BrowserRouter,Switch,Route,Link,Redirect,Router} from "react-router-dom";
const SideBar = (sideBar) => {

const [inactive,setInactive] = useState(true)

const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);  

return (
    


<div className={`side-menu ${inactive ? "inactive" : ""}` } /*onClick={()=>setInactive(!inactive)}*/>

    <div className="top-section">
        <div className="toggle-btn" onClick={()=>setInactive(!inactive)}>
        <i class="bi bi-text-left"></i>
        </div>
    </div>


    <div className="menu-section">
        <div className="Icon"> <i class="bi bi-diamond-half" onClick={()=>setInactive(!inactive)}></i> </div>
        <p className="men">ABC</p>
    </div>

    <div className="divider"></div>

    <BrowserRouter>

    <div className="lista">
        <div className="b"> <i class="bi bi-newspaper" onClick={()=>setInactive(!inactive)} title="Datos del Cliente"></i>
         <Link to="/Alta del Cliente" >   <p className="alta" onClick="location.reload">Alta del Cliente</p></Link> 
    
        </div>

                <div className="baja"> 
        <Link to= "/Baja del Cliente">   <p className="baja" onClick="location.reload">Baja del Cliente</p></Link> 
                 </div>
    

        <div className="a"> <i class="bi bi-phone-fill" onClick={()=>setInactive(!inactive)} title="Datos del Operador"></i>
        <Link to ="/Alta del Operador">   <p className="alta-op" onClick="location.reload">Alta del Operador</p></Link>
        </div>

                <div className="baja-op">
        <Link to="/Baja del Operador">    <p className="baja-op" onClick="location.reload">Baja del Operador</p></Link>           
                </div>



                {/* <div className="reasignacionn">
        <Link to="/Reasignacion"> <p className="reasignacion-op" onClick="location.reload">Reasignación</p></Link>
                </div> */}



        <div className="calendario"> <i class="bi bi-calendar-check" onClick={()=>setInactive(!inactive)} title="Registro de Inasistencia"></i>
        <Link to="/Calendario"> <p className="registro" onClick="location.reload">Registro de Asistencia</p> </Link>    
        
        </div>               

    </div>
<div className="Container">


</div>

    
    </BrowserRouter>


</div>


)

}


export default SideBar;