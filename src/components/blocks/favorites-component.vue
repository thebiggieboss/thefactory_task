<script>
import ImageCardsComponent from "@/components/cards/image-cards-component.vue";
import { ref, onMounted } from 'vue';

export default {
  components: {ImageCardsComponent},
  setup() {
    const favorites = ref([]);

    onMounted(() => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
      if (storedFavorites) {
        favorites.value = storedFavorites;
      }
    });
    return {
      favorites
    }
  }
}
</script>

<template>
  <div class="favorites-component">
    <div class="favorites-component__content wrapper">
      <h2 class="favorites-component__head-text">Избранное</h2>
      <div class="favorites-component__blocks">
        <div
            v-for="(item, index) in favorites"
            :key="index"
        >
          <image-cards-component :card-data="item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.favorites-component {
  padding: 64px 0;
  &__head-text {
    text-align: center;
    padding-bottom: 24px;
  }
  &__blocks {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  @media screen and (max-width: 1144px) {
    &__blocks {
      column-gap: 20px;
    }
  }
  @media screen and (max-width: 960px) {
    &__blocks {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media screen and (max-width: 768px) {
    &__blocks {
      grid-template-columns: 1fr;
    }
  }
}
</style>