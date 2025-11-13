<template>
  <div id="app">
    
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>UserID</th>
            <th>UserName</th>
            <th>UserLastName</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.UserID">
            <td>{{ task.UserID }}</td>
            <td>{{ task.UserName }}</td>
            <td>{{ task.UserLastName }}</td>
            <td>
              <button @click="deleteTask(task.UserID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

    <!-- Отладочная панель -->
    <div class="debug-panel">
      <h3>Debug Info</h3>
      <pre>Loading: {{ loading }}</pre>
      <pre>Error: {{ error }}</pre>
      <pre>Tasks Data: {{ JSON.stringify(tasks, null, 2) }}</pre>
    </div>
</template>



<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const tasks = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        tasks.value = response.data;
        error.value = null;
      } catch (err) {
        error.value = 'Failed to fetch tasks';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    const deleteTask = async (userID) => {
      try {
        await axios.delete(`/api/tasks/${userID}`);
        tasks.value = tasks.value.filter(t => t.UserID !== userID);
      } catch (err) {
        error.value = 'Failed to delete task';
        console.error(err);
      }
    };

    onMounted(() => {
      fetchTasks();
    });

    return { tasks, loading, error, deleteTask };
  }
};
</script>


