<script>
import {getListPhotos, searchPhotos} from "@/service/unsplash";
import {ref, onMounted, onUnmounted, computed, watch} from 'vue';
import ScrollUpComponent from "@/components/elements/scroll-up-component.vue";
import ObserverComponent from "@/components/elements/observer-component.vue";
import LoaderComponent from "@/components/elements/loader-component.vue";
import HomePageHeadComponent from "@/components/blocks/home-page-head-component.vue";
import {Debounce} from "@/modules/debounce";
import ImageCardsComponent from "@/components/cards/image-cards-component.vue";

export default {
  components: {ImageCardsComponent, HomePageHeadComponent, LoaderComponent, ObserverComponent, ScrollUpComponent},
  setup() {
    const photoList = ref([]);
    const scrollComponent = ref(null)
    const moreList = ref(null)
    const stopped = ref(false)
    const loader = ref(false)
    const debounce =  new Debounce(searchPhotos, 500); //Debounce for search, so that there is no re-request
    const query = ref("")

    const searchData = computed(() => ({
      query: query.value,
      per_page: moreList.value
    }))

    const intersect = () => {
      if(!!photoList.value.length && !!moreList.value && moreList.value !== photoList.value.length){ //so that there is no re-request
        return
      }
      moreList.value = moreList.value + 10; //Observer counter
      if(!!query.value.length) {
        SearchPhotos()
      } else {
        fetchData()
      }
    } //Observer parent func, so that determine the current api
    const fetchData = async () => {
      loader.value = true
      try {
        const res = await getListPhotos(moreList.value)
        photoList.value = res.data
      } catch (e) {
        console.error('Ошибка при выполнении запроса:', e);
      } finally {
        loader.value = false;
      }
    };
    const SearchPhotos = async () => {
      let debounceRequest;
      loader.value = true

      try {
        debounceRequest = await debounce.run(searchData.value);
        const res = await debounceRequest();
        photoList.value = res.data.results
        debounceRequest = undefined;
        await debounce.reset();
      } catch (e) {
        if(e.response.status === 499) { //for status (canceled)
          return
        } else {
          console.log(e)
        }
      } finally {
        loader.value = false;
      }
    }

    const checkQuery = (newVal) => {
      moreList.value = null;
      stopped.value = false;
      const val = newVal.trim();
      if (!val || val.length === 1) {
        return;
      }
      query.value = newVal
      SearchPhotos()
    }

    return {
      photoList,
      scrollComponent,
      fetchData,
      loader,
      checkQuery,
      intersect,
      searchData
    }
  }
}
</script>

<template>
  <home-page-head-component @searchElement="checkQuery"/>
  <div class="home-page-content-component">
    <div class="home-page-content-component__content wrapper">
      <div class="home-page-content-component__blocks" ref="scrollComponent">
        <div
            v-for="(item, index) in photoList"
            :key="index"
        >
          <image-cards-component :card-data="item"/>
        </div>
      </div>
      <div class="home-page-content-component__load" v-if="loader">
        <!--// its very hard to see)-->
        <loader-component />
      </div>
      <scroll-up-component />
      <observer-component @intersect="intersect"/>
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
  &__load {
    display: flex;
    padding: 16px 0;
    justify-content: center;
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