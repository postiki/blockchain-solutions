<template>
  <div class="converter">
    <div class="charts">
      <BTCChart :chart-data="chartBTC"></BTCChart>
      <ETHChart :chart-data="chartETH"></ETHChart>
    </div>
    <div class="convert">
      <select @change="convert" v-model="selectOf">
        <option>of USD</option>
        <option>of BTC</option>
        <option>of ETH</option>
      </select>
      <p>{{ convertOf }}</p>
      <select  @change="convert" v-model="selectTo">
        <option>to USD</option>
        <option>to BTC</option>
        <option>to ETH</option>
      </select>
      <p>{{ convertTo }}</p>
    </div>
    <Balance/>
  </div>
</template>

<script>
import BTCChart from '../components/Charts/BTCChart'
import ETHChart from '../components/Charts/ETHChart'
import Balance from "@/components/Balance";
import axios from "axios";

export default {
  name: 'Converter',
  components: {
    BTCChart,
    ETHChart,
    Balance
  },
  data: () => ({
    dateRate: [],
    btc: [],
    chartBTC: null,
    lastPriceBTC: null,
    eth: [],
    chartETH: null,
    lastPriceETH: null,
    lasPriceUSD: 1,
    selectOf: 'USD',
    selectTo: 'BTC',
    convertOf: 1,
    convertTo: null,
    test: null
  }),
  beforeMount: function () {
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
    this.setUpRate()
  },
  methods: {
    setUpRate() {
      this.convertTo = (this.lastPriceBTC * this.convertOf) / this.lasPriceUSD
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
          borderColor: 'rgb(255, 99, 132)',
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
      if (this.selectOf === 'to BTC')  {
        this.convertTo =
      }
    },
  }
}
</script>
<style>
.converter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
