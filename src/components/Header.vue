<template>
   <div class="is-flex has-text-white icon--navigation">
      <div class="is-flex content--buttons">
         <div class="back--user" v-show="$route.name == 'detail'" @click="backUser()">
            <b-icon icon="arrow-alt-circle-left"></b-icon>
         </div>
         <div class="back--detail" v-show="$route.name == 'map'" @click="backDetail()">
            <b-icon icon="arrow-alt-circle-left"></b-icon>
         </div>
         <b-icon icon="truck" v-show="$route.name == 'home'"></b-icon> 
         <span class="has-text-weight-bold title--header">{{ title }}</span>
      </div>
      <button @click="logout()" class="has-text-white btn--logout" v-show="$route.name != 'home'">
         <b-icon class="logout" icon="power-off"></b-icon>
      </button>
   </div>
</template>

<script>
export default {
   props: [ 'title' ],
   name: 'Header',
   methods: {
      backUser() {
         var vm = this;
         vm.$router.push({ name: 'user' });
      },
      backDetail() {
         var vm = this;
         vm.$router.push({ name: 'detail' });
      },
      logout() {
         var vm = this;
         vm.$router.push({ name: 'home' });
         localStorage.removeItem( 'login' );
      }
   },
   
}
</script>

<style>

.icon--navigation {
   height: 10vh;
   padding: .5rem;
   justify-content: space-between;
   align-items: center;
   background-color: #c0392b;
}
.content--buttons {
   align-items: center;
}
.icon--bar {
   height: 100%;
}
.title--header {
   margin-left: 1rem;
}
.logout {
   margin-right: 1rem;
}
.btn--logout {
   background-color: transparent;
   border: none;
}
</style>