import {React} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Calendario.css';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { formatRelative, subDays} from 'date-fns'
import {es} from 'date-fns/locale'

const Calendario = (props) => {

    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    formatRelative(subDays(new Date(), 3), new Date(), { locale: es })
  
  
    const cal = () => {
      let calendario = document.getElementById("Cal").value;
      document.getElementById("txtcal").innerHTML = calendario;
    }


    return(

        <div className="Calendario">

      <h1 id="he">
        Calendario
      </h1>


 <InfiniteCalendar id="Cal"
    width={1500}
    height={600}
    selected={today}
    minDate={lastWeek}
    locale={{locale:es}}  

  />

    <p id="txtcal"></p>

  <br></br>

  <input class="btn btn-succes" type="submit" value="Guardar" onClick={cal}></input>
    

</div>

    )

}
export default Calendario;
