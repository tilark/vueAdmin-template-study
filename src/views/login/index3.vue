<template>

</template>
<script>
import Oidc from 'oidc-client'
import { setToken } from '@/utils/auth'

export default {
  name: 'login',
  data() {
    return {
      user: null,
      signedIn: false,
      mgr: new Oidc.UserManager({
        userStore: new Oidc.WebStorageStateStore(),
        authority: 'http://localhost:5000',
        client_id: 'js2',
        redirect_uri: 'http://localhost:8080/static/callback.html',
        response_type: 'id_token token',
        scope: 'openid profile api1',
        post_logout_redirect_uri: 'http://localhost:8080/index.html',
        loadUserInfo: true
      })
    }
  },
  methods: {
    signIn() {
      this.mgr.signinRedirect().catch(function(err) {
        console.log(err)
      })
    },
    signOut() {
      var self = this
      this.mgr.signoutRedirect().then(function(resp) {
        self.signedIn = false
        console.log('signed out', resp)
      }).catch(function(err) {
        console.log(err)
      })
    },
    getUser() {
      const self = this
      console.log('enter login getUser')
      this.mgr.getUser().then(function(user) {
        // console.log(user)
        if (user == null) {
          console.log('enter login mgr getUser user is null')
          self.signIn()
        } else {
          console.log('enter login mgr getUser user is not null')
          console.log(user)
          //  设置vuex, cookies
          setToken(user.access_token)
          self.$store.commit('SET_TOKEN', user.access_token)
          self.$store.commit('SET_ROLES', user.profile)
          self.$store.commit('SET_NAME', user.profile.name)
          self.user = user
          self.signedIn = true
          self.$router.push({ path: '/' })
        }
      }).catch(function(err) {
        console.log(err)
      })
    }
  },
  mounted() {
    console.log('enter login mounted')
    this.getUser()
  }
}

</script>
