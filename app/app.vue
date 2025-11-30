<template>
  <main>
    <nav>
      <h1>Module Progress</h1>
      <div class="links">
        <p>List</p>
        <p>Chart</p>
      </div>
    </nav>

    <section>
      <div v-for="m in modules" :key="m.name" class="module">
        <h2>{{ m.name }}</h2>
        <div class="tasks">
          <div v-for="t in m.tasks" :key="t.id">
            <div class="info">
              <p>{{ t.type }}</p>
              <p>{{ t.number }}</p>
              <p>{{ t.title }}</p>
            </div>
            <div class="inputs">
              <input type="checkbox" :checked="t.code" @change="toggleField(m, t,'code')">
              <input type="checkbox" :checked="t.interview" @change="toggleField(m, t,'interview')">
              <input type="checkbox" :checked="t.quiz" @change="toggleField(m, t,'quiz')">
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
//Lädt Daten als json in modules
const { data: modules, refresh } = await useFetch("/api/modules");

function evaluateTask(task) {
  task.completed = task.code && task.interview && task.quiz;
}

function updateModuleCompletion(module) {
  module.coreCompleted = module.tasks.filter(
    (t) => t.type === "CORE" && t.completed
  ).length;
  module.advCompleted = module.tasks.filter(
    (t) => t.type === "ADV" && t.completed
  ).length;
}

async function toggleField(module, task, field) {
  task[field] = !task[field];
  evaluateTask(task);
  updateModuleCompletion(module);

  await $fetch("/api/modules", {
    method: "POST",
    body: modules.value,
  });

  refresh();
}
</script>

<style scoped>

section {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

/* === CARD === */
.module {
  flex: 1;
  background: #2b2b2b;
  border: 1px solid #3a3a3a;
  padding: 18px;
  border-radius: 10px;
}

.module h2 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 21px;
  font-weight: 600;
}

/* === TASK ROWS === */
.tasks > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #3c3c3c;
}

.tasks > div:last-child {
  border-bottom: none;
}

/* TEXT PART */
.info {
  display: flex;
  gap: 12px;
  flex: 1;
  align-items: center;
}

.info p:first-child {
  font-weight: 600;
  color: #e46b09;
}

/* CHECKBOXES */
.inputs {
  display: flex;
  gap: 14px;
}

.inputs input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #e46b09;  /* nice cyan highlight */
  cursor: pointer;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  section {
    flex-direction: column;
  }
}
</style>
