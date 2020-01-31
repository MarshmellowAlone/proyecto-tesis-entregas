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
           navigator.geolocation.getCurrentPosition( this.displayPosition, this.onError, { enableHighAccuracy:true })
        }
    },

    onError(error){
        alert('Código de error: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
     },

    displayPosition( location ) {
        const longitude = location.coords.longitude;
        const latitude = location.coords.latitude;
        window.localStorage.setItem('latitude', latitude);
        window.localStorage.setItem('longitude', longitude);
        axios.post(`http://smpcourier.com/WS_SMPCOURIER/smp.php?paquete_id=${window.localStorage.getItem('pkgID')}&fecha_inicio=${Position.getDateNow()}&latitud_inicio=${window.localStorage.getItem('latitude')}&longitud_inicio=${window.localStorage.getItem('longitude')}`)
        .then( response => {
            console.log("respuesta", response.data);
        });
    },
    existDataLocalSotare() {
        const pkgID = window.localStorage.getItem('pkgID');
        if( pkgID ) {
            Position.sendPosition();
        } else {
            Position.stopPosition();
        }
    }
}

export default Position