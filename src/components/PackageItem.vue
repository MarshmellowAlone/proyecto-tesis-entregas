<template>
   <div class="is-flex pkg--item">
      <span class="is-flex has-text-dark pkg--code"><b-icon icon="box-open" size="is-medium" :style="{ color: '#c23616' }" />
         <span class="is-size-7">Código Paquete: {{ code }}</span></span> 
      <span class="is-flex has-text-dark pkg--address"><b-icon icon="map-marker-alt" size="is-medium" :style="{ color: '#c23616' }" />
         <span class="is-size-7">Dirección: {{ address }}</span>
      </span>
      
   </div>
</template>

<script>
export default {
   name: 'item',
   props: [ 'code', 'address' ]
}
</script>

<style>
.pkg--item {
   flex-direction: column;
   border-bottom: 1px solid gray; 
}
.pkg--code,
.pkg--address {
   justify-content: flex-start;
   align-items: center;
}

</style>