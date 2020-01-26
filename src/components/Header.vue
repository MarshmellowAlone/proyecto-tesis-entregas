<template>
   <div class="is-flex has-text-white icon--navigation">
      <b-icon icon="truck"></b-icon> <span class="has-text-weight-bold title--header">{{ title }}</span>
   </div>
</template>

<script>
export default {
   props: [ 'title' ],
   name: 'Header'
}
</script>

<style>
.icon--navigation {
   height: 10vh;
   padding: .5rem;
   align-items: center;
   background-color: #c0392b;
}

.icon--bar {
   height: 100%;
}

.title--header {
   margin-left: 1rem;
}
</style>