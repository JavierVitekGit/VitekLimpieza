import {React,useEffect} from "react"
import {BrowserRouter,Routes,Route,Link,Navigate} from "react-router-dom";
import './Firebase'
import 'bootstrap/dist/css/bootstrap.css';
import './Sidebar.css'
import SideBar from "./Sidebar";
import SideBarL from "./SideBarL";
import './Cliente.css'
import Cliente from './Cliente.jsx'
import Personal from './Personal.jsx'
import Reporte from './Reporte'
import Calendario from './Calendario'
import BajaCliente from "./Bajas del Cliente";
import BajaOperador from "./Baja Operador";
import Reasignacion from "./Reasignacion";
import Turno from "./Turno.jsx";
import Numero from "./Numero";
import Login from "./login"
import Inasistencia from "./Inasistencias";


import PersonalOlga from "./Alta operador Olga";
import BajaOperadorO from "./Baja Operador Olga";
import ReasignacionOlga from "./Reasignacion Olga";
import NumeroOlga from "./Numero Olga";
import InasistenciaOlga from "./Inasistencias Olga";
import TurnoOlga from "./Turno Olga";
import CalendarioO from "./Calendario Olga";


import PersonalL from "./Alta operador Lourdes";
import BajaOperadorL from "./Baja Operador Lourdes";
import ReasignacionL from "./Reasignacion Lourdes";
import NumeroL from "./Numero Lourdes";
import InasistenciaL from "./Inasistencia Lourdes";
import TurnoL from "./Turno Lourdes";
import CalendarioL from "./Calendario Lourdes";


import PersonalM from "./Alta operador Mario";
import BajaOperadorM from "./Baja Operador Mario";
import ReasignacionM from "./Reasignacion Mario";
import NumeroM from "./Numero Mario";
import InasistenciaM from "./Inasistencia Mario";
import TurnoM from "./Turno Mario";
import CalendarioM from "./Calendario Mario";


import PersonalF from "./Alta operador Fatima";
import BajaOperadorF from "./Baja Operador Fatima";
import ReasignacionF from "./Reasignacion Fatima";
import NumeroF from "./Numero Fatima";
import InasistenciaF from "./Inasistencia Fatima";
import TurnoF from "./Turno Fatima";
import CalendarioF from "./Calendario Fatima";

import './App.css'


function App(props) {


    
  
    return(


        <BrowserRouter>

            

            {/* <div className="sidebarApp">
            <SideBarL></SideBarL>
            
            </div> */}




            
            <div className="appTest">
       
             
            </div>

  

            <Routes>
                


                <Route path="/" element={<Navigate replace to="/login"/>} />

                <Route path="/login" element={<Login/>} />
                
                <Route path="/Alta%20del%20Cliente" element={<Cliente/>}/>
                <Route path="Baja%20del%20Cliente" element={<BajaCliente/>}/>
                <Route path="/Alta%20del%20Operador" element={<Personal/>}/>
                <Route path="/Baja%20del%20Operador" element={<BajaOperador/>}/>
                <Route path="/Reporte" element={<Reporte/>}/>
                <Route path="/Calendario" element={<Calendario/>}/>
                <Route path="/Reasignacion" element={<Reasignacion/>}/>
                <Route path="/Anadir%20Turno" element={<Turno/>}/>
                <Route path="/Cambio%20de%20Numero" element={<Numero/>}/>
                <Route path="Inasistencia" element={<Inasistencia/>}/>

                                            {/* O L G A   */}


                <Route path="/Alta%20del%20Operador%20O" element={<PersonalOlga/>} />
                <Route path="/Baja%20del%20Operador%20O" element={<BajaOperadorO/>} />
                <Route path="Reasignacion%20O" element={<ReasignacionOlga/>}/>
                <Route path="/Cambio%20de%20Numero%20O" element={<NumeroOlga/>} />
                <Route path="Inasistencia%20O" element={<InasistenciaOlga/>}/>
                <Route path="/Anadir%20Turno%20O" element={<TurnoOlga/>}/>
                <Route path="/Calendario-O" element={<CalendarioO/>}/> 

                                    {/* L O U R D E S  */}

                <Route path="/Alta%20del%20Operador%20L" element={<PersonalL/>} />
                <Route path="/Baja%20del%20Operador%20L" element={<BajaOperadorL/>} />
                <Route path="Reasignacion%20L" element={<ReasignacionL/>}/>
                <Route path="/Cambio%20de%20Numero%20L" element={<NumeroL/>} />
                <Route path="Inasistencia%20L" element={<InasistenciaL/>}/>
                <Route path="/Anadir%20Turno%20L" element={<TurnoL/>}/>
                <Route path="/Calendario%20L" element={<CalendarioL/>} /> 
                {/* <Route path="/login" element={<Login/>}/> */}


                                       {/* M A R I O */}

                <Route path="/Alta%20del%20Operador%20M" element={<PersonalM/>} />
                <Route path="/Baja%20del%20Operador%20M" element={<BajaOperadorM/>} />
                <Route path="Reasignacion%20M" element={<ReasignacionM/>}/>
                <Route path="/Cambio%20de%20Numero%20M" element={<NumeroM/>} />
                <Route path="Inasistencia%20M" element={<InasistenciaM/>}/>
                <Route path="/Anadir%20Turno%20M" element={<TurnoM/>}/>
                <Route path="/Calendario%20M" element={<CalendarioM/>}/> 


                                        {/* F A T I M A  */}

                <Route path="/Alta%20del%20Operador%20F" element={<PersonalF/>} />
                <Route path="/Baja%20del%20Operador%20F" element={<BajaOperadorF/>} />
                <Route path="Reasignacion%20F" element={<ReasignacionF/>}/>
                <Route path="/Cambio%20de%20Numero%20F" element={<NumeroF/>} />
                <Route path="Inasistencia%20F" element={<InasistenciaF/>}/>
                <Route path="/Anadir%20Turno%20F" element={<TurnoF/>}/>
                <Route path="/Calendario%20F" element={<CalendarioF/>}/> 
                

                
                {/* <Route path="/Alta del Cliente" render={() => <Cliente/>}/>
                <Route path="/Baja del Cliente" render={() => <BajaCliente/>} />
                <Route path='/Alta del Operador' render={() => <Personal/>}/>
                <Route path='/Baja del Operador' render={() => <BajaOperador/>}/>
                <Route path='/Reporte' render={() => <Reporte/>}/>
                <Route path='/Calendario' render={() => <Calendario/>}/>
                <Route path='/Reasignacion' render={()=><Reasignacion/>}/>
                <Route path='/Añadir Turno' render={()=><Turno/>}/>
                <Route path='/Cambio de Numero' render={()=><Numero/>}/>
                <Route path='/login' render={()=> <Login></Login>}/>
                <Route path="/Inasistencia" render={()=> <Inasistencia></Inasistencia>}/> */}
                {/* <Route path='/Registro de Inasistencia' render={() => <Asistencia/>}/> */}
               
                

            </Routes>
            
        </BrowserRouter>






        );
    }

export default App;