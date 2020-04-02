<template>
  <form @submit.prevent="onFormSubmit">
    <h2>Join Game</h2>
    <input type="text" v-model="roomId" placeholder="Enter Room ID" />
    <input type="text" v-model="username" placeholder="Enter Username" />
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
      username: ""
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
  sockets: {
    error_message(payload) {
      console.log(payload);
    }
  }
};
</script>
