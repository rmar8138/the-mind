<template>
  <form @submit.prevent="onFormSubmit">
    <h2>Create Game</h2>
    <div class="button-group">
      <input
        type="text"
        v-model="username"
        v-bind:class="{'has-value': username}"
        placeholder="Enter Username"
      />
      <button class="button button-empty">Create Game</button>
    </div>
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
      if (!this.username) {
        return;
      }
      const player = {
        id: this.$socket.client.id,
        username: this.username,
        isReady: false
      };
      // emit socket event to create room and add player
      this.$socket.client.emit("create_room", { player });
      this.$store.commit("setPlayer", player);
      this.$router.push("lobby");
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  padding: $space-md;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
