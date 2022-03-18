import React, {useState} from 'react'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import './Sidebar.css'
import './App.css';

import Login from './login'
import Cliente from './Cliente'
import BajaCliente from './Bajas del Cliente'
import Personal from './Personal.jsx'
import BajaOperador from './Baja Operador'
import Reporte from './Reporte'
import Calendario from './Calendario'
import Reasignacion from './Reasignacion'
import Turno from './Turno'
import Numero from './Numero'
import Inasistencia from './Inasistencias'


import PersonalOlga from './Alta operador Olga'
import BajaOperadorO from './Baja Operador Olga'
import ReasignacionOlga from './Reasignacion Olga'
import NumeroOlga from './Numero Olga'
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
import Quincena from './Quincena';


import QuincenaTest from './QuincenaPrueba';


import ReporteG from './Reporte General';
import Factura from './Reporte Factura';
import CalendarioFel from './Calendario Felipe';

const App = (app) => {

  



  
  
  return (


    <BrowserRouter>

    <div class="container-fluid" className="App">


    


    </div>

    <div>
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


      <Route path="/Alta%20del%20Operador%20O" element={<PersonalOlga/>} />
      <Route path="/Baja%20del%20Operador%20O" element={<BajaOperadorO/>} />
      <Route path="Reasignacion%20O" element={<ReasignacionOlga/>}/>
      <Route path="/Cambio%20de%20Numero%20O" element={<NumeroOlga/>} />
      <Route path="Inasistencia%20O" element={<InasistenciaOlga/>}/>
      <Route path="/Anadir%20Turno%20O" element={<TurnoOlga/>}/>
      <Route path="/Calendario%20O" element={<CalendarioO/>}/> 


      <Route path="/Alta%20del%20Operador%20L" element={<PersonalL/>} />
      <Route path="/Baja%20del%20Operador%20L" element={<BajaOperadorL/>} />
      <Route path="Reasignacion%20L" element={<ReasignacionL/>}/>
      <Route path="/Cambio%20de%20Numero%20L" element={<NumeroL/>} />
      <Route path="Inasistencia%20L" element={<InasistenciaL/>}/>
      <Route path="/Anadir%20Turno%20L" element={<TurnoL/>}/>
      <Route path="/Calendario%20L" element={<CalendarioL/>}/> 

      <Route path="/Alta%20del%20Operador%20M" element={<PersonalM/>} />
      <Route path="/Baja%20del%20Operador%20M" element={<BajaOperadorM/>} />
      <Route path="Reasignacion%20M" element={<ReasignacionM/>}/>
      <Route path="/Cambio%20de%20Numero%20M" element={<NumeroM/>} />
      <Route path="Inasistencia%20M" element={<InasistenciaM/>}/>
      <Route path="/Anadir%20Turno%20M" element={<TurnoM/>}/>
      <Route path="/Calendario%20M" element={<CalendarioM/>}/> 



      <Route path="/Alta%20del%20Operador%20F" element={<PersonalF/>} />
      <Route path="/Baja%20del%20Operador%20F" element={<BajaOperadorF/>} />
      <Route path="Reasignacion%20F" element={<ReasignacionF/>}/>
      <Route path="/Cambio%20de%20Numero%20F" element={<NumeroF/>} />
      <Route path="Inasistencia%20F" element={<InasistenciaF/>}/>
      <Route path="/Anadir%20Turno%20F" element={<TurnoF/>}/>
      <Route path="/Calendario%20F" element={<CalendarioF/>}/> 

      <Route path ="/Calendario%20Fe" element={<CalendarioFel/>}/>


      <Route path="/Quincena" element={<Quincena/>}/> 

      <Route path="/Test" element={<QuincenaTest/>}/>

      <Route path ="/ReporteG" element={<ReporteG/>} />

      <Route path ="/ReporteM" element={<Factura/>} />

      </Routes>

    </div>


    </BrowserRouter>

  );
}

export default App;
