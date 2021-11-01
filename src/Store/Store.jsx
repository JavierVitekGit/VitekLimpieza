import {createStore} from 'redux';

const initialState = {
    clientes: [{
        nombre: "Pablo",
    }],
    personal: [{
        nombre: "Esteban"
    }],
    Reporte: [{
        
    }],
    firebase: [{
        nombre:"Alonso"
    }]
}

const reducer = (state = initialState, action) => {
    return state    
}



export default createStore(reducer)
