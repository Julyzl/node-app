<template>
  <div id="app">
<NavBar/>
<keep-alive>
<router-view></router-view>
</keep-alive>
<Footer/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import Landing from './components/Landing'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
   NavBar,
   Landing,
   Footer
  }
}
</script>

<style>

</style>
