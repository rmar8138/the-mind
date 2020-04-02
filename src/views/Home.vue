<template>
  <div>
    <div>
      <h2>Create Game</h2>
      <router-link to="/create">Create</router-link>
    </div>
    <div>
      <h2>Join Game</h2>
      <router-link to="/join">join</router-link>
    </div>
    <router-link to="/about">How to play</router-link>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>
