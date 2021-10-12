<template>
  <div class="balance">
    <h1>BALANCE {{ETH * lastPriceETH + BTC * lastPriceBTC + '$'}}</h1>
    <canvas ref="canvas"></canvas>
    <div class="btn">
      <button v-on:click="addBTC">+1 BTC</button>
      <button v-on:click="addETH">+1 ETH</button>
    </div>
  </div>
</template>

<script>
import {Doughnut} from 'vue-chartjs'
import axios from "axios";

export default {
  name: 'Balance',
  extends: Doughnut,
  data: () => ({
    ETH: 20,
    BTC: 30,
    total: null,
    lastPriceBTC: null,
    lastPriceETH: null,
  }),
  beforeMount: async function () {
    await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14&interval=daily')
        .then(r => {
          let value = r.data.prices.map(i => i.splice(1, 1)).join(' ').split(' ')
          let btc = value.map(i => Math.round(Number(i)))
          this.lastPriceBTC = btc[btc.length - 1]
        })
    await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=14&interval=daily')
        .then(r => {
          let value = r.data.prices.map(i => i.splice(1, 1)).join(' ').split(' ')
          let eth = value.map(i => Math.round(Number(i)))
          this.lastPriceETH = eth[eth.length - 1]
        })
  },
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
    this.totalCash()
  },
  methods: {
    addBTC() {
      this.BTC++
    }
    ,
    addETH() {
      this.ETH++
    },
    totalCash() {

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
          label: 'Balance',
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
.balance{
  max-width: 600px;
}
</style>