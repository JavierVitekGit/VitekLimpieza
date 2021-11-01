
import { initializeApp } from 'firebase/app';
import {getDatabase, ref, set} from "firebase/database";
import { render } from 'react-dom';
import {connect} from 'react-redux'



let config = {
  apiKey: "AIzaSyDnedHTB9yMEPhZTQDzI08rA7yDXAJq84I",
  authDomain: "vitek-c65e5.firebaseapp.com",
  databaseURL: "https://vitek-c65e5-default-rtdb.firebaseio.com",
  projectId: "vitek-c65e5",
  storageBucket: "vitek-c65e5.appspot.com",
  messagingSenderId: "1:180537252076:web:278e4849024501aaa52dc9",
  appId: "1:180537252076:web:278e4849024501aaa52dc9",
};

const app = initializeApp(config)

const database = getDatabase();

console.log(database)
console.log(app)    

{/*let num = 0; 
num < 999; num++;
*/}

var num = 0;  
num++;

var ID= new Date().getUTCMilliseconds();

var iD = new Date().valueOf();



writeEmployerData(num,"Juan","Leonesa #405","9.00 a.m - 6:00 pm")


function writeEmployerData(userId, name, Dm,Hr) {
  const db = getDatabase();
  set(ref(db, 'Clientes/' + userId), {
    Nombre: name,
    Domicilio: Dm,
    Horario: Hr
  });
}

writePersonalData(ID,"Carlos","10/10/2021","24/2/2023","Juan")

function writePersonalData(ID,name,fi,fb,cl) {
  const db = getDatabase();
  set(ref(db,'Personal/' + ID),{
    ID: ID, 
    Nombre: name,
    Fecha_Ingreso:fi,
    Fecha_Baja:fb,
    Cliente:cl
  });

}

writeReporteData(iD,"10/07/2021,26/11/2021","02-10-2021","Suplencia debido a enfermedad del personal")

function writeReporteData(ID,Ft,Sp,Cm) {
  const db = getDatabase();
  set(ref(db,'Reportes/' + ID),{
     Faltas: Ft,
     Suplencias: Sp,
     Comentarios: Cm
  });
}

WriteTurnosData("1","Blvd. La Luz/Diego Esteban","Jorge","Matutino","True","True","True","False","True")

function WriteTurnosData(IDD,UC,Nm,Tn,T1,T2,T3,T4,T5) {
  const db = getDatabase();
  set(ref(db,'Turnos/' + IDD),{
    Ubicación_Cliente: UC,
    Nombre: Nm,
    Turno: Tn,
    t1:T1,
    t2:T2,
    t3:T3,
    t4:T4,
    t5:T5
    
  })
  
};

