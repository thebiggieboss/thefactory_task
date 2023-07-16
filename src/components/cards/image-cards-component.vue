<script>
import { ref} from 'vue';
export default {
  props: {
    cardData: {
      type: Object,
      required: true,
    },
  },
  // setup(props) {
  //   const myPropValue = ref(props.cardData);
  //
  //   return {
  //     myPropValue
  //   }
  // }
}
</script>

<template>
  <RouterLink :to="`/${cardData.id}`">
    <img
        :src="cardData.urls.small"
        class="image-cards-component"
    >
  </RouterLink>
</template>

<style scoped lang="scss">
.image-cards-component {
  width: 100%;
  max-width: 380px;
  max-height: 350px;
  min-height: 350px;
  border-radius: $border-radius-primary;
  margin: 0 auto;
  object-fit: cover;
  @media screen and (max-width: 1144px) {
    max-height: 320px;
    min-height: 320px;
  }
  @media screen and (max-width: 768px) {
    max-width: 340px;
  }
}
</style>