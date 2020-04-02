<template>
  <form @submit.prevent="onFormSubmit">
    <h2>Enter Username</h2>
    <input type="text" v-model="username" />
    <button>Create Game</button>
    <router-link to="/">Back</router-link>
  </form>
</template>

<script>
export default {
  name: "CreateGame",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    onFormSubmit() {
      console.log(this.username);
    }
  }
};
</script>
