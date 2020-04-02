<template>
  <form @submit.prevent="onFormSubmit">
    <h2>Join Game</h2>
    <span v-if="errorMessage">{{ errorMessage }}</span>
    <div>
      <input type="text" v-model="roomId" placeholder="Enter Room ID" />
    </div>
    <div>
      <input type="text" v-model="username" placeholder="Enter Username" />
    </div>
    <button>Create Game</button>
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
      // emit socket event to create room and add player
      this.$socket.client.emit("join_room", {
        roomId: this.roomId,
        player: {
          id: this.$socket.client.id,
          username: this.username
        }
      });
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
