<template>
   <div>
      <Header :title="getPaquete"></Header>
      <div class="detail--pkg">
         <h2 class="is-block detail--title">Datos Paquete</h2>
         <span class="is-block is-size-7 detail--text">Paquete: {{ detailPkg.description }}</span>
         <span class="is-flex detail--group">
            <span class="is-size-7">Peso Kg: {{ setIntPeso }}</span>
            <span class="is-size-7">Precio S/: {{ detailPkg.price }}</span>
         </span>
         <span class="is-flex detail--group">
            <span class="is-size-7 detail--text">Paquete: {{ detailPkg.typePackage }}</span>
            <span class="is-size-7 detail--text">Pago: {{ detailPkg.typePay }}</span>
         </span>
         
         <h2 class="detail--title">Datos Remitente</h2>
         <span class="is-size-7 is-block detail--text">{{ detailPkg.documentRemit }}</span>
         <span class="is-size-7 is-block detail--text">Nombre: {{ detailPkg.nameRemit }}</span>
         <span class="is-flex detail--group">
            <span class="is-size-7">Telf: {{ detailPkg.phoneRemit }}</span>
            <span class="is-size-7">Celular: {{ detailPkg.celRemit }}</span>
         </span>
         <span class="is-size-7 is-block detail--text">Email: {{ detailPkg.emailRemit }}</span>

         <h2 class="is-block detail--title">Datos Destinatario</h2>
         <span class="is-size-7 is-block detail--text">{{ detailPkg.documentAddressee }}</span>
         <span class="is-size-7 is-block detail--text">Nombre: {{ detailPkg.nameAddressee }}</span>
         <span class="is-flex detail--group">
            <span class="is-size-7">Telf: {{ detailPkg.phoneAddressee }}</span>   
            <span class="is-size-7">Celular: {{ detailPkg.celAddressee }}</span>
         </span>
         <span class="is-size-7 is-block detail--text">Email: {{ detailPkg.emailAddressee }}</span>

         <h2 class="detail--title">Datos Entrega</h2>
         <span class="is-size-7 is-block detail--text">Dirección: {{ detailPkg.deliveryAddress }}</span>
         <span class="is-size-7 is-block detail--text">Ubigeo: {{ detailPkg.ubigeo }}</span>
         <span class="is-flex detail--group">
            <span class="is-size-7 is-block detail--text">Latitud: {{ detailPkg.addressLatitude }}</span>
            <span class="is-size-7 is-block detail--text">Longitud: {{ detailPkg.addressLongitude }}</span>
         </span>
         <div class="is-flex btn--container">
            <b-button type="is-success" class="button is-fullwidth is-outlined btn--show--map" @click="back()">Listado</b-button>
            <b-button type="is-success" class="button is-fullwidth is-outlined btn--show--map">Ver Mapa</b-button>
         </div>
         <button v-show="isActiveBtnStartDelivery" class="button is-fullwidth is-outlined btn--start--delivery" @click="startDelivery()">Iniciar Entrega</button>
         <button v-show="isActiveBtnEndDelivery" class="button is-fullwidth is-outlined btn--end--delivery" @click="endDelivery()">Terminar Entrega</button>
      </div>
      <b-modal :active.sync="isComponentModalActive"
         has-modal-card
         trap-focus
         aria-role="dialog"
         aria-modal
      >
         <form action="">
            <div class="modal-card" style="width: auto">
               <header class="modal-card-head">
                  <p class="modal-card-title">Estado Paquete</p>
               </header>
               <section class="modal-card-body">
                  <Delivery />
               </section>
               <footer class="is-flex modal-card-foot footer--modal">
                  <button class="button is-primary">Enviar</button>
               </footer>
            </div>
         </form>
      </b-modal>
   </div>
</template>

<script>
import Header from '../components/Header';
import Delivery from '@/components/Delivery.vue'
export default {
   name: 'detail',
   data() {
      return {
         pkg: 0,
         isActiveBtnEndDelivery: false,
         isActiveBtnStartDelivery: true,
         isComponentModalActive: false,
         detailPkg: {
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
      }
   },
   created() {
      this.pkg = this.$route.params.pkg;
      this.$axios.get( `smp.php?paquete_id=${this.$route.params.pkg}` )
      .then( response => {
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
         console.log( 'detailPkg', this.detailPkg );
      })
   },
   computed: {
      getPaquete() {
         return `Detalle del paquete ${this.pkg}`
      },
      setIntPeso() {
         return parseInt( this.detailPkg.peso );
      }
   },
   methods: {
      back() {
         var vm = this
         vm.$router.push({ name: 'user' })
      },
      startDelivery() {
         this.isActiveBtnStartDelivery = false;
         this.isActiveBtnEndDelivery = true;
      },
      endDelivery() {
         this.isComponentModalActive = true
      }
   },
   components: {
      Header,
      Delivery
   },
}
</script>

<style>
.detail--pkg {
   padding: 1rem;
}
.detail--group {
   justify-content: space-between;
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