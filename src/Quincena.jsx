import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SideBar from './Sidebar.jsx'
import './Firebase init'
import './Quincena.css'

const Quincena = (quincena) => {


    const trySnapshot = [];

    const filtSnapshot = [];

    // F I R E B A S E

    const dbRef = ref(getDatabase());

    get(child(dbRef,'Justificaciones/')).then((snapshot)=>{
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot)=>{
                var state = childSnapshot.child("estado").val()
                var key = childSnapshot.key;

                var snap = snapshot.child("estado").val()

                if (trySnapshot.length() < 1) {

                trySnapshot.push(snapshot.val())

            } 

            })
        }
    })


    function checking () {
        console.log("Array",trySnapshot)
        
        // trySnapshot.forEach((item)=>{
        //     filtSnapshot.push(item.length(0))
        // })
        
        console.log("Filter")
    }


    return(

        <div className="bodyReport">
            <div className="reportHeader"><h1>Reporte Quincenal</h1></div>
            
            <input type="button" value="Obtener" onClick={checking}></input>

        </div>


    )





}

export default Quincena;