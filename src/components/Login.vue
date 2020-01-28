<template>
  <div class="is-flex login">
    <picture class="logo">
      <img src="@/assets/images/logo.png" alt />
    </picture>
    <section>
      <form @submit.prevent="login()">
        <b-field>
          <b-input placeholder="Usuario" 
            v-model="user"
            icon="user" 
            class="username">
          </b-input>
        </b-field>
        <b-field>
          <b-input type="password"
            v-model="password"
            class="has-text-white password"
            placeholder="Password reveal input"
            password-reveal>
          </b-input>
        </b-field>
        <b-button type="submit" class="btn--login" @click="login()">
          Acceder
          <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
        </b-button>
      </form>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  computed: {
    getUser() {
      return this.user;
    }
  },

  data() {
    return {
      isLoading: false,
      isFullPage: true,
      user: '',
      password: '123456',
      error: 1
    }
  },
  methods: {
    login() {
      this.isLoading = true
      setTimeout( () => {
        this.isLoading = false
      }, 600 )  
      var vm = this
      vm.$axios.get( `login.php?login=${vm.user}&clave=${vm.password}` )
      .then( response => {
        console.log( response )
        if ( response.data.error == 0 ) {
            localStorage.setItem( 'login' , true )
            vm.$router.push( { name: 'user' , params: { user: vm.user } } )
        } else {
          localStorage.removeItem( 'login' )
          this.isLoading = false
          vm.$buefy.notification.open( {
            duration: 600,
            message: `Error en el logeo`,
            position: 'is-bottom-right',
            type: 'is-danger',
            hasIcon: true,
            closable: false
          } )
        }
      })
    }
  },
}
</script>

<style>
.login {
  padding: 2rem 1rem;
  height: 90vh;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: #1D4350;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #A43931, #1D4350);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #A43931, #1D4350); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.logo {
  margin-top: 5rem;
  margin-bottom: 1.5rem;
}

.username .input,
.password .input {
  background: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid aliceblue;
  border-radius: 0;
  color: white !important;
}
.username .input:focus,
.password .input:focus {
  border-color: transparent;
  border-bottom: 1px solid aliceblue;
  box-shadow: none;
}
.control.has-icons-left .input:focus ~ .icon,
.control.has-icons-right .input:focus ~ .icon {
  color: white !important;
}
span.has-text-primary {
  color: white !important;
}
.btn--login {
  background-color: #c0392b;
  margin-top: 1rem;
  width: 100%;
}
.btn--login span {
  color: aliceblue !important;
}
.notices {
  bottom: 10px;
  right: 10px;
}
.notification {
  padding: .5rem !important;
}
.notices .notification {
  width: 200px;
  height: 50px !important;
}
</style>