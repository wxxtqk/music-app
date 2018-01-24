<template>
  <div id="app">
    <my-header></my-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import myHeader from 'components/myHeader/my-header'
import Tab from 'components/Tab/tab'
export default {
  name: 'app',
  components: {
    myHeader, Tab
  }
}
</script>

