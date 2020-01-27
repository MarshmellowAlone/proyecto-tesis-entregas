<template>
   <div>
      <Header :title="getPaquete"></Header>
      <div class="detail--pkg">
         <h2 class="is-block detail--title">Datos Paquete</h2>
         <span class="is-block is-size-7 detail--text">Paquete: dadadad</span>
         <span class="is-flex detail--group">
            <span class="is-size-7">Peso Kg: 10</span>
            <span class="is-size-7">Precio S/: 12.00</span>
         </span>
         <span class="is-flex detail--group">
            <span class="is-size-7 detail--text">Paquete: Normal</span>
            <span class="is-size-7 detail--text">Pago: Adelantado</span>
         </span>
         
         <h2 class="detail--title">Datos Remitente</h2>
         <span class="is-size-7 is-block detail--text">Doc. : 12345678</span>
         <span class="is-size-7 is-block detail--text">Nombre: Juan Pérez</span>
         <span class="is-flex detail--group">
            <span class="is-size-7">Telf. : 123456</span>
            <span class="is-size-7">Celular: 123456789</span>
         </span>
         <span class="is-size-7 is-block detail--text">Email: juanperez@gmail.com</span>

         <h2 class="is-block detail--title">Datos Destinatario</h2>
         <span class="is-size-7 is-block detail--text">Doc. : 12345678</span>
         <span class="is-size-7 is-block detail--text">Nombre: Pepito Lorem</span>
         <span class="is-flex detail--group">
            <span class="is-size-7">Telf. : 123456</span>   
            <span class="is-size-7">Celular: 123456789</span>
         </span>
         <span class="is-size-7 is-block detail--text">Email: pepito@hotmail.com</span>

         <h2 class="detail--title">Datos Entrega</h2>
         <span class="is-size-7 is-block detail--text">Dirección: Av. Ramón Castilla #123</span>
         <span class="is-size-7 is-block detail--text">Ubigeo: Lambayeque-Chiclayo-Chiclayo</span>
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
      }
   },
   computed: {
      getPaquete() {
         return `Detalle del paquete ${this.pkg}`
      },
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
   created() {
      this.pkg = this.$route.params.pkg;
   }
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