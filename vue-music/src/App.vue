<template>
  <div id="app">
    <my-header></my-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import myHeader from 'components/myHeader/my-header'
import Tab from 'components/Tab/tab'
import player from 'components/player/player'
export default {
  name: 'app',
  components: {
    myHeader, Tab, player
  }
}
</script>

