<template>
  <form @submit.prevent="onFormSubmit">
    <h2>Join Game</h2>
    <span v-if="errorMessage">{{ errorMessage }}</span>
    <div class="button-group">
      <input type="text" v-model="roomId" placeholder="Enter Room ID" />
      <input type="text" v-model="username" placeholder="Enter Username" />
    </div>
    <button class="button">Join Game</button>
    <router-link to="/">Back</router-link>
  </form>
</template>

<script>
export default {
  name: "JoinGame",
  data() {
    return {
      roomId: "",
      username: "",
      errorMessage: null
    };
  },
  methods: {
    onFormSubmit() {
      const player = {
        id: this.$socket.client.id,
        username: this.username,
        isReady: false
      };
      // emit socket event to create room and add player
      this.$socket.client.emit("join_room", {
        roomId: this.roomId,
        player
      });
      this.$store.commit("setPlayer", player);
      this.$router.push("lobby");
    }
  },
  created() {
    this.errorMessage = this.$route.params.errorMessage;
  },
  beforeDestroy() {
    this.errorMessage = null;
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