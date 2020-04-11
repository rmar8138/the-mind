<template>
  <div class="leave-room">
    <h3>Are you sure?</h3>
    <p>Leaving the room will end the game for the rest of the team.</p>
    <div class="buttons">
      <button class="button" @click.prevent="toggleLeaveRoomModal">Stay</button>
      <button class="button button-danger" @click.prevent="handleLeaveRoom">Leave</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LeaveRoomModal",
  computed: {
    ...mapState(["room"])
  },
  methods: {
    toggleLeaveRoomModal() {
      this.$store.commit("toggleLeaveRoomModal");
    },
    handleLeaveRoom() {
      this.$socket.client.emit("leave_room", {
        roomId: this.room.roomId
      });
      this.$store.commit("resetState");
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  background-color: $color-dark-grey;
}

.leave-room {
  text-align: center;
  width: 80vw;
  padding: $space-sm;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $color-dark-grey;
  border-radius: 5px;

  & > *:not(:last-child) {
    margin-bottom: $space-sm;
  }
}

.buttons {
  font-size: $text-xs;
  display: flex;
}
</style>
