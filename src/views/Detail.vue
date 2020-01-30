<template>
   <div>
      <div v-if="$route.name != 'map'">
         <Header :title="getPaquete"></Header>
         <div class="detail--pkg" >
            <div class="detail--item">
               <h2 class="is-block detail--title">Detalle Paquete</h2>
               <span class="is-block is-size-6 detail--text">Paquete: {{ detailPkg.description }}</span>
               <span class="is-flex detail--group">
                  <span class="is-size-6">Peso Kg: {{ setIntPeso }}</span>
                  <span class="is-size-6">Precio S/: {{ detailPkg.price }}</span>
               </span>
               <span class="is-flex detail--group">
                  <span class="is-size-6 detail--text">Paquete: {{ detailPkg.typePackage }}</span>
                  <span class="is-size-6 detail--text">Pago: {{ detailPkg.typePay }}</span>
               </span>
            </div>
            <div class="detail--item">
               <h2 class="detail--title">Detalle Remitente</h2>
               <span class="is-size-6 is-block detail--text">{{ detailPkg.documentRemit }}</span>
               <span class="is-size-6 is-block detail--text">Nombre: {{ detailPkg.nameRemit }}</span>
               <span class="is-flex detail--group">
                  <span class="is-size-6">Teléfono: {{ detailPkg.phoneRemit }}</span>
                  <span class="is-size-6">Celular: {{ detailPkg.celRemit }}</span>
               </span>
               <span class="is-size-6 is-block detail--text">Email: {{ detailPkg.emailRemit }}</span>
            </div>
            <div class="detail--item">
               <h2 class="is-block detail--title">Detalle Destinatario</h2>
               <span class="is-size-6 is-block detail--text">{{ detailPkg.documentAddressee }}</span>
               <span class="is-size-6 is-block detail--text">Nombre: {{ detailPkg.nameAddressee }}</span>
               <span class="is-flex detail--group">
                  <span class="is-size-6">Teléfono: {{ detailPkg.phoneAddressee }}</span>   
                  <span class="is-size-6">Celular: {{ detailPkg.celAddressee }}</span>
               </span>
               <span class="is-size-6 is-block detail--text">Email: {{ detailPkg.emailAddressee }}</span>
            </div>
            <div class="detail--item">
               <h2 class="detail--title">Detalle Entrega</h2>
               <span class="is-size-6 is-block detail--text">Dirección: {{ detailPkg.deliveryAddress }}</span>
               <span class="is-size-6 is-block detail--text">Ubigeo: {{ detailPkg.ubigeo }}</span>
               <span class="is-flex detail--group">
                  <span class="is-size-6 is-block detail--text">Latitud: {{ formatLatitude }}</span>
                  <span class="is-size-6 is-block detail--text">Longitud: {{ formatLongitude }}</span>
               </span>
            </div>
            <div class="is-flex btn--container">
               <b-button type="is-success" class="button is-fullwidth is-outlined btn--show--map" @click="back()">Listado</b-button>
               <b-button type="is-success" class="button is-fullwidth is-outlined btn--show--map" @click="showMap()">Ver Mapa</b-button>
            </div>
            <button v-show="isActiveBtnStartDelivery" class="button is-fullwidth is-outlined btn--start--delivery" @click="startDelivery()">Iniciar Entrega</button>
            <button v-show="isActiveBtnEndDelivery" class="button is-fullwidth is-outlined btn--end--delivery" @click="endDelivery()">Terminar Entrega</button>
         </div>
      </div>
      <b-modal :active.sync="isComponentModalActive"
         has-modal-card
         trap-focus
         aria-role="dialog"
         aria-modal
      >
         <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
               <p class="modal-card-title">Estado Paquete</p>
            </header>
            <section class="modal-card-body">
               <b-select placeholder="Seleccionar estado" v-model="selected">
                  <option 
                     v-for="(option, index ) in stateOptions"
                     :value="option.description"
                     :key="index">
                     {{ option.description }}
                  </option>
               </b-select>
            </section>
            <footer class="is-flex modal-card-foot footer--modal">
               <button class="button is-primary" @click="savedState()">Enviar</button>
            </footer>
         </div>
      </b-modal>
      <router-view></router-view>
   </div>
</template>

<script>
import Header from '../components/Header';
export default {
   name: 'detail',
   data() {
      return {
         pkg: 0,
         isActiveBtnEndDelivery: false,
         isActiveBtnStartDelivery: true,
         isComponentModalActive: false,
         detailPkg: {
            id: null,
            description: null,
            peso: null,
            price: null,
            typePackage: null,
            typePay: null,
            documentRemit: null,
            nameRemit: null,
            phoneRemit: null,
            celRemit: null,
            emailRemit: null,
            documentAddressee: null,
            nameAddressee: null,
            phoneAddressee: null,
            celAddressee: null,
            emailAddressee: null,
            deliveryAddress: null,
            ubigeo: null,
            addressLatitude: null,
            addressLongitude: null
         },
         latitude: 0,
         longitude: 0,
         stateOptions: [
            { id: 1, description: 'Entregado' },
            { id: 2, description: 'Sin entregar' },
            { id: 1, description: 'Rechazado' }
         ],
         selected: 'Sin entregar'
      }
   },
   created() {
      this.latitude = this.$route.params.ltd;
      this.longitude = this.$route.params.lgd;
      this.pkg = this.$route.params.pkg;
      this.$axios.get( `smp.php?paquete_id=${this.$route.params.pkg}` )
      .then( response => {
         this.detailPkg.id = response.data[0].id;
         this.detailPkg.description = response.data[0].descripcion;
         this.detailPkg.peso = response.data[0].peso;
         this.detailPkg.price = response.data[0].precio;
         this.detailPkg.typePackage = response.data[0].tipo_paquete;
         this.detailPkg.typePay = response.data[0].tipo_pago;
         this.detailPkg.documentRemit = response.data[0].doc_remi;
         this.detailPkg.nameRemit = response.data[0].nom_remi;
         this.detailPkg.phoneRemit = response.data[0].tel_remi;
         this.detailPkg.celRemit = response.data[0].cel_remi;
         this.detailPkg.emailRemit = response.data[0].correo_remi;
         this.detailPkg.documentAddressee = response.data[0].doc_des;
         this.detailPkg.nameAddressee = response.data[0].nom_des;
         this.detailPkg.phoneAddressee = response.data[0].tel_des;
         this.detailPkg.celAddressee = response.data[0].cel_des;
         this.detailPkg.emailAddressee = response.data[0].correo_des;
         this.detailPkg.deliveryAddress = response.data[0].direccion_entrega;
         this.detailPkg.ubigeo = response.data[0].ubigeo;
         this.detailPkg.addressLatitude = response.data[0].latitud_direccion;
         this.detailPkg.addressLongitude = response.data[0].longitud_direccion;
      })
   },
   computed: {
      getPaquete() {
         return `Detalle del paquete ${this.pkg}`
      },
      setIntPeso() {
         return parseInt( this.detailPkg.peso );
      },
      formatLatitude() {
         return parseFloat( this.detailPkg.addressLatitude ).toFixed( 5 )
      },
      formatLongitude() {
         return parseFloat( this.detailPkg.addressLongitude ).toFixed( 5 )
      }
   },
   methods: {
      back() {
         var vm = this
         vm.$router.push({ name: 'user' })
      },
      getDateNow() {
         const today = new Date();
         return `${ today.getFullYear() }-${ ( today.getMonth() + 1 ) }-${ today.getDate() } 
                  ${ today.getHours() }:${ today.getMinutes() }:${ today.getSeconds() }`; 
      },
      startDelivery() {
         this.isActiveBtnStartDelivery = false;
         this.isActiveBtnEndDelivery = true;

         this.$axios.post( `smp.php?paquete_id=${this.detailPkg.id}&fecha_inicio=${this.getDateNow()}&latitud_inicio=${this.latitude}&longitud_inicio=${this.longitude}`)
         .then( response => {
            console.log("respuesta", response.data);
         });
      },
      endDelivery() {
         this.isComponentModalActive = true
      },
      showMap() {
         this.$router.push( { name: 'map' , 
            params: { 
               latitud: this.detailPkg.addressLatitude,
               longitud: this.detailPkg.addressLongitude,
            }
         })
      },
      savedState() {
         this.$router.push( { name: 'user', params: { statePkg: this.selected } } );
         console.log( this.selected );
      },
   },
   components: {
      Header,
   },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400i&display=swap');

.detail--pkg {
   padding: 1rem;
}
.detail--item{
   margin-bottom: 1rem;  
}
.detail--group {
   justify-content: space-between;
}
.detail--title {
   font-family: 'Open Sans', sans-serif;
   color: #c0392b;
}
.btn--start--delivery {
   color: aliceblue;
   background-color: #c0392b;
   margin-top: 1rem;
}
.btn--start--delivery:hover {
   color: aliceblue;
}
.btn--end--delivery {
   color: aliceblue;
   background-color: #c0392b;
   margin-top: 1rem;
}
.btn--end--delivery:hover {
   color: aliceblue;
}
.btn--container {
   margin-top: .8rem;
   justify-content: space-between;
}
.btn--show--map {
   width: 80px !important;
}
.footer--modal {
   justify-content: flex-end;
}
</style>