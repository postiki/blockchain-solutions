<template>
  <div class="balance">
    <h1>BALANCE</h1>
    <canvas ref="canvas"></canvas>
    <button v-on:click="addBTC">+1 BTC</button>
    <button v-on:click="addETH">+1 ETH</button>
  </div>
</template>

<script>
import {Doughnut} from 'vue-chartjs'

export default {
  name: 'Balance',
  extends: Doughnut,
  data: () => ({
    ETH: 20,
    BTC: 30,
  }),
  mounted() {
    this.renderChart({
      labels: [
        'BTC',
        'ETH',
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [this.BTC, this.ETH],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }]

    })
  },
  methods: {
    addBTC() {
      this.BTC++
    }
    ,
    addETH() {
      this.ETH++
    }
  },
  watch: {
    BTC: function (val, oldVal) {
      console.log(val, oldVal)
      this.renderChart({
        labels: [
          'BTC',
          'ETH',
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [this.BTC, this.ETH],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 4
        }]
      })
    },
    ETH: function (val, oldVal) {
  console.log(val, oldVal)
  this.renderChart({
    labels: [
      'BTC',
      'ETH',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [this.BTC, this.ETH],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
      hoverOffset: 4
    }]
  })
}
  }
}
</script>

<style>

</style>