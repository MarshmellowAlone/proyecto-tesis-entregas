<template>
   <div>
      <Header :title="getTitle"></Header>
      <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
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
         markers: []
      }
   },
   computed: {
      getTitle() {
         return `Mapa del paquete ${this.pkgDescription}`;    
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
      addMarkers() {
         const markerOrigin = {
            lat: this.$route.params.latitude,
            lng: this.$route.params.longitude
         };
         console.log( 'Origen', markerOrigin )
         const markerDestination = {
            lat: parseFloat(this.$route.params.ltd),
            lng: parseFloat(this.$route.params.lgd)
         }
         console.log( 'Destino', markerDestination );
         this.markers.push( { position: markerOrigin }, { position: markerDestination } );
         this.center = markerOrigin;
         console.log('Marcadores', this.markers);
      },
   },
   mounted() {
      this.geolocate();
   },
   created() {
      this.pkgDescription = this.$route.params.pkgName;
      this.addMarkers();
   },
}
</script>

<style>
#map {
   width: 400px;
   height: 400px;
}
</style>