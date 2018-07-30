<template>

</template>
<script>
export default {
  name: 'login',
  methods: {
    handleLogin() {
      this.$store.dispatch('Login2').then(() => {
        this.$router.push({ path: '/' })
      }).catch(() => {
        console.log('enter handleLogin error!')
      })
    }
  },
  mounted() {
    this.handleLogin()
  }
}

</script>
