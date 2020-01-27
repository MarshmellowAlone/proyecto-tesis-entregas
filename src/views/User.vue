<template>
   <div>
      <div class="content" v-if="!$route.params.pkg">
         <Header title="Paquetes Pendientes" />
         <div class="is-flex content--info">
               <div class="has-text-black detail">
                  <div class="is-flex content--distributor">
                     <b-icon class="has-text-white" icon="user-tie"></b-icon>
                     <span class="is-size-6 detail--distributor">Repartidor: {{ getDistributor }}</span>
                  </div>   
                  <div class="list--item" v-for="(item, index) in pkgs" :key="index">
                     <router-link :to="{ name: 'detail', params: { pkg: item.code } }">
                        <Item :code="item.code" :address="item.address" />
                     </router-link>
                  </div>
               </div>
               <button class="is-size-7 btn send--position">Enviar Posición</button>
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
export default {
   name: 'user',
   data() {
      return {
         distributor: null,
         stateNotification: true,
         pkgs: [
            {
               code: 'abc',
               address: 'Calle Ramon Castilla #478'
            },
         ]
      }
   },
   computed: {
      getDistributor() {
         return this.distributor.toUpperCase();
      },
      generateRamdon() {
         return Math.floor( Math.random() * 10 ) ;
      }
   },
   components: {
      Header,
      Item
   },
   created() {
      this.distributor = this.$route.params.user;
      setTimeout( () => {
         this.stateNotification = false;
      }, 3000 )
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