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
         start: null,
         end: null,
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
      geolocate () {
         navigator.geolocation.getCurrentPosition( position => {
            this.center = {
               lat: position.coords.latitude,
               lng: position.coords.longitude
            };
         });
      },
      async addMarkers(e) {
          var markerOrigin = Object
          markerOrigin = {
            lat:  e.coords.latitude,
            lng:  e.coords.longitude
            };
           
         const markerDestination = {
            lat: parseFloat(this.$route.params.latitud),
            lng: parseFloat(this.$route.params.longitud)
         }
         // console.log('Origen', markerOrigin);
         // console.log( 'Destino', markerDestination );
         this.markers.push( { position: markerOrigin }, { position: markerDestination } );
         this.center = markerOrigin;
        
      },
   },
   mounted() {
      this.geolocate();
   },
   created() { 
       navigator.geolocation.getCurrentPosition( this.addMarkers );
   },
}
</script>

<style>
#map {
   width: 400px;
   height: 400px;
}
</style>