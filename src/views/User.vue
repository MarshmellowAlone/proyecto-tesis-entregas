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
                     <router-link 
                        :to="{ name: 'detail', 
                           params: { pkg: item.id, user: $route.params.user  } 
                        }">
                        <Item :code="item.descripcion" :address="item.direccion_entrega" />
                     </router-link>
                  </div>
               </div>
               <div class="is-flex btn--position">
                  <button v-show="getStateActiveSendPosition" class="has-background-success has-text-white is-size-7 btn send--position" @click="sendPosition(); isActiveGPS();">Enviar Posición</button>
                  <button v-show="getStateActiveStopPosition" class="has-background-info has-text-white is-size-7 stop--position" @click="stopPosition()">No Enviar Posición</button>
               </div>
            <b-notification v-show="stateNotification" auto-close :duration="2000" class="has-background-danger has-text-white has-text-weight-bold welcome"   :closable="false">
               Bienvenido gracias {{ distributor }} por preferirnos
            </b-notification>
            <b-notification v-show="stateGPS" auto-close :duration="1000" class="has-background-danger has-text-white has-text-weight-bold activeGPS" :closable="false">
               Activando GPS ...
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
         isActiveSendPosition: true,
         isActiveStopPosition: false,
         dataPkg: [],
         intervalTimer: null,
         stateGPS: false,
         latitude: 0,
         longitude: 0,
         packageId: 0
      }
   },
   created() {
      console.log('user');
      if( window.localStorage.getItem('pkgID') ) {
         this.isActiveSendPosition = false;
         this.isActiveStopPosition = true;
      }
      this.distributor = this.$route.params.user;
      setTimeout( () => {
         this.stateNotification = false;
      }, 2000 );
      this.$axios.get( `smp.php?login=${this.$route.params.user}` )
      .then( response => {
         this.dataPkg = response.data;
         this.packageId = response.data[0].id;
      })
   },
   computed: {
      getStateActiveSendPosition() {
         return this.isActiveSendPosition && !window.localStorage.getItem('pkgID');
      },
      getStateActiveStopPosition() {
         return ( this.isActiveStopPosition || window.localStorage.getItem('pkgID') );
      },
      getDistributor() {
         return this.distributor.toUpperCase();
      },
      generateRamdon() {
         return Math.floor( Math.random() * 10 ) ;
      }
   },
   methods: {
      isActiveGPS() {
         this.stateGPS = true;
         setTimeout( () => {
            this.stateGPS = false
         }, 1000 );
      },
      sendPosition( packageId ) {
         this.isActiveSendPosition = !this.isActiveSendPosition;
         this.isActiveStopPosition = !this.isActiveStopPosition;
         window.localStorage.setItem('pkgID', this.packageId);
         this.$position.sendPosition();
      },
      stopPosition() {
         this.$position.stopPosition();
         window.localStorage.removeItem( 'pkgID' )
         this.isActiveSendPosition = !this.isActiveSendPosition;
         this.isActiveStopPosition = !this.isActiveStopPosition;
      },
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
.activeGPS {
   position: absolute;
   top: 50%;
   width: 90%;
   left: 5%;
}
.activeGPS .media-content {
   text-align: center;
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
.btn--position {
   justify-content: flex-end;
}
.send--position,
.stop--position {
   width: 150px;
   padding: .5rem;
}
.stop--position {
   margin-left: .5rem;
}
</style>