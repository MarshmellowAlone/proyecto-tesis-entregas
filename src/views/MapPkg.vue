<template>
   <div>
      <Header :title="getTitle"></Header>
      <gmap-map 
         :center="center" :zoom="14" style="width:100%;  height: 400px;" ref="map">
         <gmap-marker v-for="(m,index) in markers" :key="index" :position="m.position"
            @click="center = m.position"
         ></gmap-marker>
      </gmap-map>
   </div>
</template>
<script>
 
import Header from '../components/Header';
export default {
   name: 'MapPkg',
   data() {
      return {
         pkgDescription: null,
         center: { lat: 45.508, lng: -73.587 },
         markers: [],
         pkgId: this.$route.params.pkgId,
         markerOrigin: { lat: 0, lng: 0 },
         markerDestination: { lat: 0, lng: 0 },
         intervalTimer: null
      }
   },
   computed: {
      getTitle() {
         return `Mapa del paquete ${ this.$route.params.pkg}`;    
      },
   },
   components: {
      Header 
   },
   methods: {
      displayMap() {
         this.intervalTimer = setInterval( this.getPosition, 2000);
      },
      stopStartMap() {
         clearInterval( this.intervalTimer );
      },

      onError(error){
         alert('Código de error: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
      },
      getPosition() {
         this.markers = [];
         if ( "geolocation" in navigator ) {
            navigator.geolocation.getCurrentPosition( this.displayPosition, this.onError, { enableHighAccuracy:true })
 
         }
      },
      displayPosition( location ) {
        const longitude = location.coords.longitude;
        const latitude = location.coords.latitude;
        this.markerOrigin = {
           lat: latitude,
           lng: longitude
        },
      //   console.log('punto inicio', this.markerOrigin);
        this.markerDestination = {
           lat: parseFloat( this.$route.params.latitud ),
           lng: parseFloat( this.$route.params.longitud )
        }
        this.markers.push( { position: this.markerOrigin }, { position: this.markerDestination } );
        this.center = this.markerOrigin;
      //   console.log('marcadores', this.markers);
      },
   },
   created() {
      window.localStorage.setItem('map', true);
      if (window.localStorage.getItem('map')) {
         this.displayMap();
      }
   },
   destroyed() {
      window.localStorage.setItem('map', false);
      this.stopStartMap();
   }
}
</script>

<style>
#map {
   width: 400px;
   height: 400px;
}
</style>