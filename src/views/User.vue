<template>
   <div>
      <div class="content" v-if="!$route.params.pkg">
         <Header title="Paquetes Pendientes" />
         <div class="is-flex content--info">
               <div class="has-text-black detail">
                  <div class="is-flex content--distributor">
                     <b-icon icon="user-tie"></b-icon>
                     <span class="is-size-6 detail--distributor">Repartidor: {{ getDistributor }}</span>
                  </div>   
                  <div class="list--item" v-for="(item, index) in dataPkg" :key="index">
                     <router-link :to="{ name: 'detail', params: { pkg: item.id } }">
                        <Item :code="item.descripcion" :address="item.direccion_entrega" />
                     </router-link>
                  </div>
               </div>
               <div class="btnPosition">
                  <button class="is-size-7 btn send--position" @click="sendPosition()">Enviar Posición</button>
                  <button class="is-size-7 btn send--position" @click="stopPosition()">No Enviar Posición</button>
               </div>
            <b-notification v-show="stateNotification" auto-close :duration="5000" class="has-background-danger has-text-white has-text-weight-bold welcome"   :closable="false">
               Bienvenido gracias {{ distributor }} por preferirnos
            </b-notification>
         </div>
      </div>
      <router-view></router-view>
   </div>
</template>

<script>
import Header from '../components/Header';
import Item from '../components/PackageItem';
import Axios from 'axios';
export default {
   name: 'user',
   data() {
      return {
         distributor: null,
         stateNotification: true,
         dataPkg: [],
         intervalTimer: null
      }
   },
   created() {
      this.distributor = this.$route.params.user;
      setTimeout( () => {
         this.stateNotification = false;
      }, 3000 );
      this.$axios.get( `smp.php?login=${this.$route.params.user}` )
      .then( response => {
         this.dataPkg = response.data;
         console.log( 'data', this.dataPkg );
      })
   },
   computed: {
      getDistributor() {
         return this.distributor.toUpperCase();
      },
      generateRamdon() {
         return Math.floor( Math.random() * 10 ) ;
      }
   },
   methods: {
      sendPosition() {
         this.intervalTimer = setInterval( this.getPosition, 2000 )
      },
      stopPosition() {
         clearInterval( this.intervalTimer )
      },
      getPosition() {
         if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition( this.displayPosition )
            console.log("aadada");
         } else {
            console.log("no soporta geolocalizión");
         }
      },
      displayPosition( location ) {
         const lng = location.coords.longitude;
         const lat = location.coords.latitude;
         console.log(`Longitud: ${lng} - Latitud: ${lat}`);
      }
   },
   components: {
      Header,
      Item
   },
}
</script>

<style>
.content--info {
   position: relative;
   color: black;
   height: 90vh;
   padding: 1rem;
   flex-direction: column;
   justify-content: space-between;  
}
.welcome {
   position: absolute;
   top: 50%;
   width: 90%;
   left: 5%;
}
.content--distributor {
   align-items: center;
   margin-bottom: 1rem;
}
.detail--distributor {
   margin-left: 1rem;
}
.icon--container {
	width: 40%;
	cursor: pointer;
}
.btn {
   width: 30%;
}
.send--position {
   align-self: flex-end;
   margin: 1rem 0;
}
</style>