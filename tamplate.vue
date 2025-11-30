<template>
      <section v-for="m in modules" :key="m.name"">
      <h2>{{ m.name }}</h2>

      <p>CORE: {{ m.coreCompleted }} / {{ m.tasks.filter(t => t.type === 'CORE').length }}</p>
      <p>ADV: {{ m.advCompleted }} / {{ m.tasks.filter(t => t.type === 'ADV').length }}</p>

      <table border="1" cellpadding="6" style="margin-top: 10px">
        <thead>
          <tr>
            <th>#</th>
            <th>Typ</th>
            <th>Titel</th>
            <th>Done</th>
            <th>Abgabegespräch</th>
            <th>Quiz</th>
            <th>Completed</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="t in m.tasks" :key="t.id">
            <td>{{ t.number }}</td>
            <td>{{ t.type }}</td>
            <td>{{ t.title }}</td>

            <td><input type="checkbox" :checked="t.done"              @change="toggleField(m, t,'done')" /></td>
            <td><input type="checkbox" :checked="t.abgabegespraech"  @change="toggleField(m, t,'abgabegespraech')" /></td>
            <td><input type="checkbox" :checked="t.quiz"             @change="toggleField(m, t,'quiz')" /></td>

            <td>{{ t.completed ? "✔" : "✘" }}</td>
          </tr>
        </tbody>
      </table>
    </section>
</template>