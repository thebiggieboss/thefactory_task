<script setup>

</script>

<template>
  <div class="loader loader--dark">
    <div class="loader__blade"></div>
    <div class="loader__blade"></div>
    <div class="loader__blade"></div>
    <div class="loader__blade"></div>
    <div class="loader__blade"></div>
    <div class="loader__blade"></div>
    <div class="loader__blade"></div>
    <div class="loader__blade"></div>
    <div class="loader__blade"></div>
    <div class="loader__blade"></div>
    <div class="loader__blade"></div>
    <div class="loader__blade"></div>
  </div>
</template>

<style scoped lang="scss">
.loader {
  display: inline-block;
  font-size: $spinner-size;
  height: $spinner-size;
  position: relative;
  vertical-align: middle;
  width: $spinner-size;

  &__blade {
    animation: loader-fade 1s infinite linear;
    background-color: $spinner-color-light;
    border-radius: .5em;
    bottom: 0;
    height: .2777em;
    left: .4629em;
    position: absolute;
    transform-origin: center -.2222em;
    width: .074em;

  $animation-delay: 0s;
  $blade-rotation: 0deg;

    @for $i from 1 through $spinner-amount {
      &:nth-child(#{$i}) {
        animation-delay: $animation-delay;
        transform: rotate($blade-rotation);
      $blade-rotation: $blade-rotation + (360 / $spinner-amount);
      $animation-delay: $animation-delay + (1 / $spinner-amount);
      }
    }
  }

  &--dark .loader__blade {
    background-color: $spinner-color-dark;
  }
}

@keyframes loader-fade {
  0% {
    opacity: 1;
  }

  100% {
    opacity: .3;
  }
}
</style>