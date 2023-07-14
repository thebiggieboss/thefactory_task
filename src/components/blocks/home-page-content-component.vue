<script>
import {getListPhotos} from "@/service/unsplash";
import { ref, onMounted, onUnmounted } from 'vue';
import ScrollUpComponent from "@/components/elements/scroll-up-component.vue";
import ObserverComponent from "@/components/elements/observer-component.vue";

export default {
  components: {ObserverComponent, ScrollUpComponent},
  setup() {
    const photoList = ref(null);
    const scrollComponent = ref(null)
    const moreList = ref(10)
    const fetchData = async () => {
      try {
        const res = await getListPhotos(moreList.value)
        photoList.value = res.data;
        moreList.value = moreList.value + 10
        return res
      } catch (e) {
        console.error('Ошибка при выполнении запроса:', e);
      }
    };


    onMounted(fetchData);

    return {
      photoList,
      scrollComponent,
      fetchData
    }
  }
}
</script>

<template>
  <div class="home-page-content-component">
    <div class="home-page-content-component__content wrapper">
      <div class="home-page-content-component__blocks" ref="scrollComponent">
        <img
            v-for="(item, index) in photoList"
            :key="index"
            :src="item.urls.small"
            class="home-page-content-component__img"
        >
      </div>
      <scroll-up-component />
      <observer-component @intersect="fetchData"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page-content-component {
  padding: 64px 0;
  &__content {
    position: relative;
  }
  &__blocks {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  &__img {
    width: 100%;
    max-width: 380px;
    max-height: 350px;
    border-radius: $border-radius-primary;
    margin: 0 auto;
  }
  @media screen and (max-width: 1144px) {
    &__blocks {
      column-gap: 20px;
    }
    &__img {
      //max-width: 340px;
      height: 320px;
      object-fit: cover;
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
    &__img {
      max-width: 340px;
    }
  }
}
</style>