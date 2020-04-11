<template>
  <div class="help-drawer">
    <span class="close" @click="toggleHelpDrawer">&times;</span>
    <div class="copy">
      <h3>Help</h3>
      <p>Your goal is for your whole team to play all cards in ascending order.</p>
      <p>On the bottom of the screen you can find all cards you hold, as well as the next card to be played (the lowest card). Whenever you think your card is next to be played, tap the number.</p>
      <p>At the top of the screen you'll find all of your team mates as well as how many cards they each have left. This information can be very useful, especially in higher rounds.</p>
      <p>Good luck!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelpDrawer",
  methods: {
    toggleHelpDrawer() {
      this.$store.commit("toggleHelpDrawer");
    }
  }
};
</script>

<style lang="scss" scoped>
.help-drawer {
  background-color: $color-dark-grey;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  padding: $space-md;
}

.close {
  position: absolute;
  top: $space-sm;
  right: $space-sm;
  font-size: $text-xl;
  color: $color-primary;
}

.copy {
  margin-top: $space-lg;

  h3 {
    text-align: center;
  }

  & > *:not(:last-child) {
    margin-bottom: $space-md;
  }
}
</style>