<template>
   <div class="is-flex has-text-white icon--navigation">
      <div class="back--user" v-show="$route.name == 'detail'" @click="backUser()">
         <b-icon icon="arrow-alt-circle-left"></b-icon>
      </div>
      <div class="back--detail" v-show="$route.name == 'map'" @click="backDetail()">
         <b-icon icon="arrow-alt-circle-left"></b-icon>
      </div>
      
      <b-icon icon="truck" v-show="$route.name == 'home'"></b-icon> <span class="has-text-weight-bold title--header">{{ title }}</span>
   </div>
</template>

<script>
export default {
   props: [ 'title' ],
   name: 'Header',
   methods: {
      backUser() {
         var vm = this
         vm.$router.push({ name: 'user' })
      },
      backDetail() {
         var vm = this
         vm.$router.push({ name: 'detail' })
      }
   },
   
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