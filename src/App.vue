<template>
  <div id="app" >
    <Converter />
    <Balance />
  </div>
</template>

<script>
import Converter from './components/Converter.vue'
import Balance from "@/components/Balance";

export default {
  name: 'App',
  components: {
    Balance,
    Converter
  },
  data: () => ({

  }),
  mounted() {

  },
  methods: {}

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
