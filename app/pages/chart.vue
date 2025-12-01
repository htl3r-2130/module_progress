<template>
  <div class="chart-grid">
    <div v-for="m in modules" :key="m.name" class="subject-card">
      <h2>{{ m.name }}</h2>
      <p>Grade Semester: {{ m.semesterGrade }}</p>
      <p>Grade Year: {{ m.yearGrade }}</p>
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
          <p>
            Core Semester {{ m.coreCompleted }}/{{ m.coreRequiredSemester }}
          </p>
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

<script setup>
import DonutChart from "~/components/chart.vue";
const { data: modules } = await useFetch("/api/modules");
modules.value.forEach(m => {
  const [semester, year] = calculateGrades(
    m.name,
    m.coreCompleted,
    m.advCompleted
  );
  m.semesterGrade = semester;
  m.yearGrade = year;
});

function calculateGrades(subject, completedCores, completedAdv) {
  let semesterGrade = 5;
  let yearGrade = 5;

  switch (subject) {
    case "WEBT":
      if (completedCores >= 4) semesterGrade = 4;
      if (completedCores >= 4) {
        if (completedAdv >= 1) semesterGrade = 3;
        if (completedAdv >= 2) semesterGrade = 2;
        if (completedAdv >= 4) semesterGrade = 1;
      }

      if (completedCores >= 8) yearGrade = 4;
      if (completedCores >= 8) {
        if (completedAdv >= 2) yearGrade = 3;
        if (completedAdv >= 4) yearGrade = 2;
        if (completedAdv >= 8) yearGrade = 1;
      }
      break;

    case "SEW":
      if (completedCores >= 5) {
        semesterGrade = 4;
        semesterGrade -= Math.min(completedAdv, 3);
        semesterGrade = Math.max(1, semesterGrade);
      }

      if (completedCores >= 9) {
        yearGrade = 4;
        yearGrade -= Math.floor(completedAdv / 2);
        yearGrade = Math.max(1, yearGrade);
      }
      break;

    case "CMS":
      if (completedCores >= 3) {
        semesterGrade = 4;
        semesterGrade -= Math.min(completedAdv, 3);
        semesterGrade = Math.max(1, semesterGrade);
      }

      if (completedCores >= 5) {
        yearGrade = 4;
        yearGrade -= Math.floor(completedAdv / 2);
        yearGrade = Math.max(1, yearGrade);
      }
      break;

    default:
      throw new Error("Unknown subject type: " + subject);
  }

  return [semesterGrade, yearGrade];
}
</script>

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
