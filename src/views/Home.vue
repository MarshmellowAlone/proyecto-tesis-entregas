<template>
   <div>
      <Header title="SMP" />
      <Login />
   </div>
</template>
<script>
import Header from '../components/Header';
import Login from '../components/Login';
export default {
   name: 'Home',
   components: {
      Header,
      Login
   }
}
</script>

<style>

</style>