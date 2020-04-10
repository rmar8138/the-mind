<template>
  <div class="home">
    <h1>The Mind</h1>
    <div class="button-group">
      <router-link class="button" to="/create">Create Game</router-link>
      <router-link class="button" to="/join">Join Game</router-link>
    </div>
    <router-link class="link" to="/about">How to play</router-link>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style lang="scss" scoped>
.home {
  padding: $space-md;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>