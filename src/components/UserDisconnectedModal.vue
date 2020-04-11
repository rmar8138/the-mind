<template>
  <div class="user-disconnected">
    <h3>A user disconnected</h3>
    <button class="button" @click.prevent="handleButtonClick">Leave Room</button>
  </div>
</template>

<script>
export default {
  name: "UserDisconnectedModal",
  methods: {
    handleButtonClick() {
      this.$store.commit("toggleUserDisconnectedModal");
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

.user-disconnected {
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
</style>
