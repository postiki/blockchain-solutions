<template>
  <div class="converter">
    <div class="charts">
      <BTCChart :chart-data="chartBTC"></BTCChart>
      <div class="convert">
        <select @change="convert" v-model="selectOf">
          <option v-bind:value="0">of USD</option>
          <option v-bind:value="1">of BTC</option>
          <option v-bind:value="2">of ETH</option>
        </select>
        <input @change="convert" v-model="convertOf"/>
        <hr/>
        <select @change="convert" v-model="selectTo">
          <option v-bind:value="0">to USD</option>
          <option v-bind:value="1">to BTC</option>
          <option v-bind:value="2">to ETH</option>
        </select>
        <input @change="convert" v-model="convertTo"/>
      </div>
      <ETHChart :chart-data="chartETH"></ETHChart>
    </div>
  </div>
</template>

<script>
import BTCChart from '../components/Charts/BTCChart'
import ETHChart from '../components/Charts/ETHChart'
import axios from 'axios'

export default {
  name: 'Converter',
  components: {
    BTCChart,
    ETHChart,
  },
  data: () => ({
    dateRate: [],

    btc: null,
    chartBTC: null,
    lastPriceBTC: null,

    eth: null,
    chartETH: null,
    lastPriceETH: null,

    selectOf: 0,
    selectTo: 2,

    convertOf: 1,
    convertTo: null,

    convertRate: []
  }),
  beforeMount: async function () {
    this.calcDate()
  },
  mounted: async function () {
    await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14&interval=daily')
        .then(r => {
          let value = r.data.prices.map(i => i.splice(1, 1)).join(' ').split(' ')
          this.btc = value.map(i => Math.round(Number(i)))
        })
        .then(() => this.lastPriceBTC = this.btc[this.btc.length - 1])
        .finally(() => this.setUpBTC())
    await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=14&interval=daily')
        .then(r => {
          let value = r.data.prices.map(i => i.splice(1, 1)).join(' ').split(' ')
          this.eth = value.map(i => Math.round(Number(i)))
        })
        .then(() => this.lastPriceETH = this.eth[this.eth.length - 1])
        .finally(() => this.setUpETH())
    this.setUp()
    this.setUpRate()
    this.convert()
  },
  methods: {
    setUp() {
      this.convertRate.push(1)
      this.convertRate.push(this.btc[this.btc.length - 1])
      this.convertRate.push(this.eth[this.eth.length - 1])

    },
    setUpRate() {
      this.convertRate.push(1)
      this.convertRate.push(this.lastPriceBTC / 1)
      this.convertRate.push(this.lastPriceETH / 1)
    },
    setUpBTC() {
      this.chartBTC = {
        labels: this.dateRate.reverse(),
        datasets: [{
          label: ['BTC to USD'],
          data: this.btc,
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.5
        }]
      }
    },
    setUpETH() {
      this.chartETH = {
        labels: this.dateRate.reverse(),
        datasets: [{
          label: ['ETH to USD'],
          data: this.eth,
          fill: false,
          borderColor: 'rgb(99,125,255)',
          tension: 0.5
        }]
      }
    },
    calcDate() {
      let i = 0;
      while (i < 14) {
        this.dateRate.push(`${i} day ago`)
        i++
      }
    },
    convert() {
      this.convertTo = (this.convertRate[this.selectOf] * this.convertOf) / this.convertRate[this.selectTo]
    }
  }
}
</script>
<style>
.converter {

}

.charts {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.convert {

}
@media (min-width: 320px) and (max-width: 428px){
  .charts{
    flex-direction: column;
  }
}
</style>
