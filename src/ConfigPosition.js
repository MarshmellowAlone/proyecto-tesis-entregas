import axiosApi from 'axios';

const Position = {
    intervalTimer: null,
    sendPosition() {
        this.intervalTimer = setInterval( this.getPosition, 2000 );
    },
    stopPosition() {
        clearInterval( this.intervalTimer );
    },
    getPosition() {
        if ("geolocation" in navigator) {
           navigator.geolocation.getCurrentPosition( this.displayPosition )
        }
    },
    displayPosition( location ) {
        this.longitude = location.coords.longitude;
        this.latitude = location.coords.latitude;
        console.log(`Longitud: ${this.longitude} - Latitud: ${this.latitude}`);
    }
}

export default Position