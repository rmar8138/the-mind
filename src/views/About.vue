<template>
  <div class="about">
    <h1>About</h1>
    <div class="copy">
      <p>The Mind is a very hard game.</p>
      <p>Players work as a team to try and play their cards in ascending order. However, there's a catch: you cannot know anything about what cards your teammates have.</p>
      <p>If everyone plays their card in the correct order, you advance to the next round. However, if someone plays out of order, it's game over.</p>
      <p>The amount of cards dealt to each player is determined by the current round. There are 12 rounds in total.</p>
      <p>This app is based off the original card game designed by Wolfgang Warsch. Powerups and lives from the original game will be added in the future.</p>
    </div>
    <router-link to="/">Back</router-link>
  </div>
</template>

<script>
export default {
  name: "About"
};
</script>

<style lang="scss" scoped>
.about {
  padding: $space-md;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.copy {
  font-size: $text-sm;

  p:not(:last-child) {
    margin-bottom: $space-md;
  }
}
</style>
