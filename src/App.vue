<template>
  <div id="container">
    <h1>User Search</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="number">Number:</label>
        <input type="text" v-model="number" @input="formatNumber" />
      </div>
      <button type="submit">Submit</button>
    </form>
    <div v-if="loading">Loading...</div>
    <div v-if="results.length">
      <h2>Results</h2>
      <ul>
        <li v-for="(result, index) in results" :key="index">
          {{ result.email }} - {{ result.number }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      number: '',
      results: [],
      loading: false,
      cancelTokenSource: null,
    };
  },
  methods: {
    formatNumber() {
      let num = this.number.replace(/[^0-9]/g, '');
      this.number = num.replace(/(\d{2})(?=\d)/g, '$1-');
    },
    async handleSubmit() {
      if (this.cancelTokenSource) {
        this.cancelTokenSource.cancel('Operation canceled due to new request.');
      }
      this.cancelTokenSource = axios.CancelToken.source();
      
      this.loading = true;
      this.results = [];

      try {
        const response = await axios.post(
          'http://localhost:3001/search',
          { email: this.email, number: this.number.replace(/-/g, '') },
          { cancelToken: this.cancelTokenSource.token }
        );

        this.results = response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Error occurred:', error);
        }
      } finally {
        this.loading = false;
        this.cancelTokenSource = null;
      }
    },
  },
};
</script>

<style>
#container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin:60px auto;
}
form {
  margin-bottom: 20px;
}

form div{
  display:flex;
  align-items: center;
  gap: 15px;
}
label {
  display: block;
  margin-bottom: 8px;
}
input {
  margin-bottom: 10px;
}
button {
  display: block;
  cursor: pointer;
}
</style>
