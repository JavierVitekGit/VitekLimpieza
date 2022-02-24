import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SideBar from './Sidebar.jsx'
import InfiniteCalendar, {withRange,Calendar} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { formatRelative, subDays} from 'date-fns'
import {es} from 'date-fns/locale'
import './Firebase init'
import './Reporte General.css'

const ReporteG = (reporte) => {


    const [show,setShow] = useState([]);

    function mostrarReporte () {
        setShow(false)
    }

    function mostrarCalendario() {
        setShow(true)
    }







return (


    <div className="bodyReportGB">

       {show? 
       
        <div className="reportGB">

    

        <h1>Reporte General</h1>


       
        <input type="button" value="Change" onClick={mostrarReporte} />



        </div>

: 

        <div className="tabReportGB">

            <h1>Reporte General</h1>



        <input type="button" value="Regresar" onClick={mostrarCalendario} />


        </div>



}

    </div>
)





}

export default ReporteG;