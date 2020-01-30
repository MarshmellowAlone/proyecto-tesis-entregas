import axios from 'axios';

const Position = {
    intervalTimer: null,
    getDateNow() {
        const today = new Date();
        return `${ today.getFullYear() }-${ ( today.getMonth() + 1 ) }-${ today.getDate() } 
                 ${ today.getHours() }:${ today.getMinutes() }:${ today.getSeconds() }`; 
    },
    sendPosition() {
        this.intervalTimer = setInterval( this.getPosition, 2000 )
    },
    stopPosition() {
        clearInterval( this.intervalTimer );
    },
    getPosition() {
        if ( "geolocation" in navigator ) {
           navigator.geolocation.getCurrentPosition( Position.displayPosition )
        }
    },
    displayPosition( location ) {
        const longitude = location.coords.longitude;
        const latitude = location.coords.latitude;
        localStorage.setItem('latitude', latitude);
        localStorage.setItem('longitude', longitude);
        axios.post(`http://smpcourier.com/WS_SMPCOURIER/smp.php?paquete_id=${localStorage.getItem('pkgID')}&fecha_inicio=${Position.getDateNow()}&latitud_inicio=${localStorage.getItem('latitude')}&longitud_inicio=${localStorage.getItem('longitude')}`)
        .then( response => {
            console.log("respuesta", response.data);
        });
    },
    existDataLocalSotare() {
        const pkgID = localStorage.getItem('pkgID');
        if( pkgID ) {
            Position.sendPosition();
        } else {
            Position.stopPosition();
        }
    }
}

export default Position