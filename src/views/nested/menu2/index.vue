<template>
  <div style="padding:30px;">
    <el-alert title="menu 2" :closable="false" />
    <el-button @click="handleReadapi">读取Identity Api数</el-button>
    <div class="dashboard-text">roles: <span> {{userClaims}} </span></div>
  </div>
</template>
<script>
  import { getIdentity } from '@/api/identity'
  export default {
    data() {
      return {
        userClaims: ''
      }
    },
    methods: {
      handleReadapi() {
        getIdentity().then(response => {
          console.log('enter handleReadapi response', response)
          this.userClaims = response.userClaims
        })
      }
    }
  }
</script>
