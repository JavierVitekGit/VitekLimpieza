import {React} from "react"
import {BrowserRouter,Switch,Route,Link,Redirect,Router} from "react-router-dom";
import './Firebase'
import 'bootstrap/dist/css/bootstrap.css';
import './Sidebar.css'
import SideBar from "./Sidebar";
import './Cliente.css'
import Cliente from './Cliente.jsx'
import Personal from './Personal'
import Reporte from './Reporte'
import Calendario from './Calendario'
import Asistencia from './Asistencia'
import BajaCliente from "./Bajas del Cliente";
import {Provider} from 'react-redux'
import store from "./Store/Store";
import BajaOperador from "./Baja Operador";
import Reasignacion from "./Reasignacion";







function App(props) {

    
  
    return(

        //comentario para despliegue :)

        // <div className="App">
        //     <BrowserRouter>

        //         <SideBar></SideBar>
        //             <div className="Container">
                    
        //             <Switch>

        //             <Route path={'/'} >
        //             <Dashboard></Dashboard>
        //             </Route>

        //             <Route path={'/Cliente'}>
        //                 <Clientee></Clientee>
        //             </Route>

        //             <Route path={'/BajaCliente'}>
        //                 <BajaC></BajaC>
        //             </Route>

        //             <Route path={'/Operador'}>
        //                 <Operador></Operador>
        //             </Route>

        //             <Route path={'/BajaOperador'}>
        //                 <BajaO></BajaO>
        //             </Route>

        //             <Route path={'/Registro'}>
        //                 <Registro></Registro>


        //             </Route>

        //         </Switch>
        //             </div>
                




        //     </BrowserRouter>

        // </div>

        






        <BrowserRouter>

        {/* <Redirect
        from="/"
        to="/Alta del Cliente">
        </Redirect> */}
        
        
            <div>
            <SideBar></SideBar>
            
            </div>

            <div>
              <ul>
                <li>
                    <Link to="/Alta del Cliente"></Link>
                </li>
                <li>
                    <Link to="/Baja del Cliente"></Link>
                </li>
                <li>
                    <Link to="/Alta del Operador"></Link>
                </li>
               <li>
                   <Link to="/Baja del Operador"></Link>
               </li>
                <li>
                   <Link to="/Registro de Inasistencia"></Link>
               </li>  
                <li>  
                   <Link to="/Calendario"></Link>
               </li>
               <li>
                   <Link to="/Reasignación"></Link>
               </li>
              
              </ul> 
                
            </div>

           

            <Switch>
                <Route path="/Alta del Cliente" render={() => <Cliente/>}></Route>
                <Route path="/Baja del Cliente" render={() => <BajaCliente/>} ></Route>
                <Route path='/Alta del Operador' render={() => <Personal/>}></Route>
                <Route path='/Baja del Operador' render={() => <BajaOperador/>}></Route>
                <Route path='/Reporte' render={() => <Reporte/>}></Route>
                <Route path='/Calendario' render={() => <Calendario/>}></Route>
                <Route path='/Reasignacion' render={()=><Reasignacion/>}></Route>
                {/* <Route path='/Registro de Inasistencia' render={() => <Asistencia/>}></Route> */}
               
                
            </Switch>
            
        </BrowserRouter>






        );
    }

export default App;