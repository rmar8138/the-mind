<template>
  <form @submit.prevent="onFormSubmit">
    <h2>Join Game</h2>
    <span class="error" v-if="room.error">{{ room.error }}</span>
    <div class="button-group">
      <input
        type="text"
        v-model="roomId"
        v-bind:class="{'has-value': roomId}"
        placeholder="Enter Room ID"
      />
      <input
        type="text"
        v-model="username"
        v-bind:class="{'has-value': username}"
        placeholder="Enter Username"
      />
    </div>
    <button class="button">Join Game</button>
    <router-link to="/">Back</router-link>
  </form>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "JoinGame",
  computed: {
    ...mapState(["room"])
  },
  data() {
    return {
      roomId: "",
      username: ""
    };
  },
  methods: {
    onFormSubmit() {
      if (!this.roomId || !this.username) {
        return;
      }
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
  // created() {
  //   this.errorMessage = this.$route.params.errorMessage;
  // },
  beforeDestroy() {
    // this.errorMessage = null;
    this.$store.commit("clearError");
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

.error {
  color: $color-danger;
}
</style>