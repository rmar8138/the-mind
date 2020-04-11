<template>
  <div class="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
}

body {
  font-family: $font-primary;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-white;
  font-size: $text-md;
  background-color: $color-black;
}

h1 {
  font-size: $text-xxl;
}

a {
  text-decoration: none;
  color: $color-white;
}

li {
  list-style: none;
}

input {
  font-family: $font-primary;
  padding: $space-sm;
  background-color: $color-black;
  color: $color-primary;
  padding: $space-sm;
  border: 1px solid transparent;
  border-bottom: 1px solid $color-dark-grey;
  font-size: $text-md;
  text-align: center;
  width: 100%;
  transition: all 0.2s ease-out;

  &:focus {
    outline: none;
    border-bottom: 1px solid $color-primary;
  }

  &:focus::-webkit-input-placeholder {
    color: transparent;
  }
}

.has-value {
  // highlight border bottom when value
  border-bottom: 1px solid $color-primary;
}

button {
  font-family: $font-primary;
  border: none;
}

.button {
  text-decoration: none;
  background-color: $color-black;
  color: $color-primary;
  padding: $space-sm;
  border-radius: 5px;
  font-size: $text-md;
  width: 100%;

  &:focus {
    outline: none;
  }
}

/* .button-empty {
  border: 1px solid transparent;
} */

.app {
  height: 100vh;
}

.button-group {
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: $space-sm;
  }
}

// transitions //
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
