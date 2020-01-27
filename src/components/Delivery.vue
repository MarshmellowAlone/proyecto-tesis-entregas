<template>
  <div>
     Estado: 
      <b-field label="Simple">
         <b-select placeholder="Seleccionar estado">
            <option
               v-for="(option, index ) in stateOptions"
               :value="option.description"
               :key="index">
               {{ option.description }}
            </option>
         </b-select>
      </b-field>
  </div>
</template>

<script>

export default {
   name: 'Delivery',
   data() {
      return {
         stateOptions: [
            { id: 1, description: 'Entregado' },
            { id: 2, description: 'Sin entregar' },
            { id: 1, description: 'Rechazado' }
         ]
      }
   },
}
</script>

<style>

</style>