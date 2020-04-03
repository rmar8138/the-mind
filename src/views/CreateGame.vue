<template>
  <form @submit.prevent="onFormSubmit">
    <h2>Create Game</h2>
    <input type="text" v-model="username" placeholder="Enter Username" />
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
      // emit socket event to create room and add player
      this.$socket.client.emit("create_room", {
        player: {
          id: this.$socket.client.id,
          username: this.username
        }
      });
      this.$store.commit("setUsername", this.username);
      this.$router.push("lobby");
    }
  }
};
</script>
