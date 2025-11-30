<template>
  <main>
    <nav>
      <h1>Module Tracker</h1>
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
nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
