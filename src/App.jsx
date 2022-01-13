import {React,useEffect} from "react"
import {BrowserRouter,Switch,Route,Link,Redirect} from "react-router-dom";
import './Firebase'
import 'bootstrap/dist/css/bootstrap.css';
import './Sidebar.css'
import SideBar from "./Sidebar";
import './Cliente.css'
import Cliente from './Cliente.jsx'
import Personal from './Personal.jsx'
import Reporte from './Reporte'
import Calendario from './Calendario'
import BajaCliente from "./Bajas del Cliente";
import BajaOperador from "./Baja Operador";
import Reasignacion from "./Reasignacion";
import Turno from "./Turno";
import Numero from "./Numero";
import Login from "./login"
import Inasistencia from "./Inasistencias";
import './App.css'


function useOutsideAlerter(ref) {
    useEffect(()=> {
        function handleClickOutside(event){
            if(ref.current && !ref.current.contains(event.target)){

            }
        }
    })
}



//  document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             // Unbind the event listener on clean up
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//      [ref];



function App(props) {

    
  
    return(

        

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

        <Redirect
        from exact="/"
        to="/login">
        </Redirect>

        
        
            
            <div>
            <SideBar></SideBar>
            
            </div>
            
            <div className="appTest">
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

               <li>
                   <Link to="/Añadir Turno"></Link>
               </li>
              
               <li>
                   <Link to="/Cambio de Numero"></Link>
               </li>

               <li>
                   <Link to="/login"></Link>
               </li>

               <li>
                   <Link to="/Inasistencia"></Link>
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
                <Route path='/Añadir Turno' render={()=><Turno/>}></Route>
                <Route path='/Cambio de Numero' render={()=><Numero/>}></Route>
                <Route path='/login' render={()=> <Login></Login>}></Route>
                <Route path="/Inasistencia" render={()=> <Inasistencia></Inasistencia>}></Route>
                {/* <Route path='/Registro de Inasistencia' render={() => <Asistencia/>}></Route> */}
               
                
            </Switch>
            
        </BrowserRouter>






        );
    }

export default App;