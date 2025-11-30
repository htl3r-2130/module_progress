<script setup>
import DonutChart from "~/components/chart.vue";
const { data: modules } = await useFetch("/api/modules");
</script>

<template>
  <div class="chart-grid">
    <div v-for="m in modules" :key="m.name" class="subject-card">
      <h2>{{ m.name }}</h2>
      <div class="core-charts">
        <div class="chart">
          <DonutChart
            :values="[
              m.coreCompleted,
              Math.max(0, m.coreRequiredSemester - m.coreCompleted),
            ]"
            :colors="['#e46b09', '#3a3a3a']"
            :size="150"
            cutout="65%"
          />
          <p>Core Semester {{ m.coreCompleted }}/{{ m.coreRequiredSemester }}</p>
        </div>
        <div class="chart">
          <DonutChart
            :values="[
              m.coreCompleted,
              Math.max(0, m.coreRequiredYear - m.coreCompleted),
            ]"
            :colors="['#e46b09', '#3a3a3a']"
            :size="150"
            cutout="65%"
          />
          <p>Core Year {{ m.coreCompleted }}/{{ m.coreRequiredYear }}</p>
        </div>
      </div>
      <div class="core-charts">
        <div class="chart">
          <DonutChart
            :values="[
              m.advCompleted,
              Math.max(0, m.advRequiredSemester - m.advCompleted),
            ]"
            :colors="['#e46b09', '#3a3a3a']"
            :size="150"
            cutout="65%"
          />
          <p>ADV Semester {{ m.advCompleted }}/{{ m.advRequiredSemester }}</p>
        </div>
        <div class="chart">
          <DonutChart
            :values="[
              m.advCompleted,
              Math.max(0, m.advRequiredYear - m.advCompleted),
            ]"
            :colors="['#e46b09', '#3a3a3a']"
            :size="150"
            cutout="65%"
          />
          <p>ADV Year {{ m.advCompleted }}/{{ m.advRequiredYear }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}
.subject-card {
  padding: 20px;
  background: #2b2b2b;
  border: 1px solid #3a3a3a;
  border-radius: 10px;
}

.chart {
  padding: 10px;
}

.core-charts {
  display: flex;
  text-align: center;
}

h2 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 21px;
  font-weight: 600;
}
</style>
