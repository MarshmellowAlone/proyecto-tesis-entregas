<template>
  <div class="is-flex login">
    <picture class="logo">
      <img src="@/assets/images/logo.png" alt />
    </picture>
    <section>
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
      <b-button class="btn--login" @click="openLoading()">
        Acceder
        <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
      </b-button>
    </section>
  </div>
</template>

<script>
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
      user: 'aldo',
      password: '123456'
    }
  },
  methods: {
    openLoading() {
     
      this.isLoading = true
      setTimeout( () => {
        this.isLoading = false
        this.$router.push({ name: 'user', params: { user: this.getUser } })
      }, 3 * 1000 )
    }
  },
  created() {
    // eslint-disable-next-line no-console
    () => console.log( this.user );
  },
};
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
.btn--login a {
  color: aliceblue !important;
}
</style>