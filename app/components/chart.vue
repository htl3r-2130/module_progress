<script setup>
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  labels: { type: Array, required: true },            // z.B. ['Core', 'ADV']
  values: { type: Array, required: true },            // z.B. [5, 8]
  colors: { type: Array, default: () => ['#4fbcff', '#b58fff'] },
  title: { type: String, default: '' },
  size: { type: Number, default: 150 },               // pixel width/height
  cutout: { type: String, default: "60%" }            // donut thickness
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.values,
      backgroundColor: props.colors,
      borderWidth: 0
    }
  ]
}))

const chartOptions = computed(() => ({
  cutout: props.cutout,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    tooltip: { enabled: true }
  }
}))
</script>

<template>
  <div class="donut-wrapper" :style="`width:${size}px;height:${size}px`">
    <h3 v-if="title">{{ title }}</h3>
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.donut-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
</style>