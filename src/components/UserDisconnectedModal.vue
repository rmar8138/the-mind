<template>
  <div>
    <h3>A user disconnected</h3>
    <button @click.prevent="handleButtonClick">Leave Room</button>
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

<style lang="scss" scoped></style>
