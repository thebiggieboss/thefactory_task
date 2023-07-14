<script>
import { ref, onMounted } from 'vue';
export default {
  setup() {
    const scTimer = ref(0);
    const scY = ref(0);

    const handleScroll = () => {
      if (scTimer.value) return;
      scTimer.value = setTimeout(() => {
        scY.value = window.scrollY;
        clearTimeout(scTimer.value);
        scTimer.value = 0;
      }, 100);
    };

    const toTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    return {
      scY,
      toTop,
    };
  },
}
</script>

<template>
  <div class="scroll-up-component" v-show="scY > 700">
    <div class="scroll-up-component__content">
      <transition name="fade">
        <img
            src="../../assets/icons/button_top.svg"
            alt=""
            @click="toTop"
        >
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scroll-up-component {
  position: absolute;
  left: calc(100% + 22px);
  &__content {
    position: fixed;
    bottom: 10px;
    z-index: 10;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>