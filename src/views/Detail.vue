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

         <button class="button is-fullwidth is-outlined btn--start--delivery">Iniciar Entrega</button>
      </div>
   </div>
</template>

<script>
import Header from '../components/Header';
export default {
   name: 'detail',
   computed: {
      getPaquete() {
         return `Detalle del paquete ${this.pkg}`
      }
   },
   data() {
      return {
         pkg: 0
      }
   },
   components: {
      Header
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
</style>