<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">Balance</router-link>
      <router-link to="/converter">Converter</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {},
  data: () => ({}),
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
  padding: 0;
  font-weight: normal;

  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
}

.nav {
  display: flex;
  gap: 50px;
  justify-content: center;
}
</style>
