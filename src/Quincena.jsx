import {React,useState,useLayoutEffect,useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {get, getDatabase,ref,child,update} from "firebase/database";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SideBar from './Sidebar.jsx'
import './Firebase init'
import './Quincena.css'

const Quincena = (quincena) => {



    // F I R E B A S E

    const dbRef = ref(getDatabase());

    get(child(dbRef,'Justificaciones/15-02-2022/')).then((snapshot)=>{
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot)=>{
                var state = childSnapshot.child("estado").val()
                var key = childSnapshot.key;
                console.log("State::::",state)
                console.log("Key::::",key)
                console.log("snapshot::",snapshot.val())
                console.log("All$$$",childSnapshot.val())

            })
        }
    })


    return(

        <div className="bodyReport">
            <div className="reportHeader"><h1>Reporte Quincenal</h1></div>
            

        </div>


    )





}

export default Quincena;