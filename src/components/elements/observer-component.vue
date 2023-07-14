<script>
import { onMounted, onUnmounted, ref } from 'vue';

export default {
  props: ['options'],
  setup(props, { emit }) {
    const element = ref(null);
    let observer = null;

    onMounted(() => {
      const options = props.options || {};
      observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
          emit("intersect");
        }
      }, options);

      observer.observe(element.value);
    });

    onUnmounted(() => {
      observer.disconnect();
    });

    return {
      element,
    };
  },
};
</script>

<template>
  <div class="observer" ref="element"></div>
</template>

<style scoped>

</style>