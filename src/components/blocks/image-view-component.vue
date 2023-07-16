<script>
import { useRoute } from 'vue-router';
import {onMounted, ref, reactive} from 'vue';
import {getPhotosById} from "@/service/unsplash";
export default {
  setup() {
    const route = useRoute();
    const params = ref(route.params);
    const photoData = ref(undefined)
    const state = reactive({
      isFavorite: false,
    });
    const GetPhotosById = async () => {
      try {
        const res = await getPhotosById(params.value.id)
        console.log(res.data)
        photoData.value = res.data
      } catch (e) {
        console.log(e)
      }
    }
    const saveIdToLocalStorage = () => {
      state.isFavorite = !state.isFavorite;

      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (state.isFavorite) {
        favorites.push(photoData.value);
      } else {
        const index = favorites.findIndex((item) => item.id === params.value.id);
        if (index !== -1) {
          favorites.splice(index, 1);
        }
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
    };
    onMounted(() => {
      GetPhotosById();
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      state.isFavorite = favorites.some((item) => item.id === params.value.id);
    })
    console.log(state.isFavorite)
    return {
      photoData,
      saveIdToLocalStorage,
      state
    }
  }
}
</script>

<template>
  <div class="image-view-component" :style="{ backgroundImage: 'url(' + photoData?.urls?.regular + ')' }">
    <div class="image-view-component__blur"></div>
    <div class="image-view-component__content wrapper">
      <div class="image-view-component__head">
        <div class="image-view-component__head--user">
          <img :src="photoData?.user?.profile_image?.medium" alt="">
          <div class="image-view-component__head--user-info">
            <h3 class="image-view-component__head--user-info__text">{{photoData?.user?.name}} {{photoData?.user?.first_name}}</h3>
            <p class="image-view-component__head--user-info__des">@{{photoData?.user?.username}}</p>
          </div>
        </div>
        <div class="image-view-component__head--actions">
          <button class="button__heart" @click="saveIdToLocalStorage">
            <img src="@/assets/icons/heart-icon.svg" alt="" :class="{'image-view-component__head--actions__current': state.isFavorite}">
          </button>
          <a :href="photoData?.links?.download" target="_blank">
            <button class="button__primary image-view-component__button">
              <img src="@/assets/icons/download-icon.svg" alt="">
              Downloand
            </button>
          </a>
        </div>
      </div>
      <img :src="photoData?.urls?.regular" alt="" class="image-view-component__main-img">
    </div>
  </div>
</template>

<style scoped lang="scss">
.image-view-component {
  background-size: cover;
  height: 720px;
  background-repeat: no-repeat;
  background-position: bottom;
  margin-bottom: 64px;
  position: relative;
  z-index: 0;
  &__blur {
    position: absolute;
    z-index: -1;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.50);
    backdrop-filter: blur(4px);
    height: 720px;
  }
  &__content {
    padding: 48px 8px;
  }
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 36px;
    gap: 12px;
    &--user {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      img {
        border-radius: $border-radius-primary;
        border: 1px solid #FFF;
      }
    }
    &--user-info {
      &__text, &__des {
        color: #FFFFFF;
      }
    }
    &--actions {
      display: flex;
      gap: 12px;
      a {
        text-decoration: none;
      }
      &__current {
        filter: invert(26%) sepia(100%) saturate(7049%) hue-rotate(357deg) brightness(102%) contrast(120%);
      }
    }
  }
  &__button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  &__main-img {
    width: 100%;
    box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.50);
    border-radius: $border-radius-primary;
    max-height: 740px;
    object-fit: cover;
  }
  @media screen and (max-width: 768px) {
    background-image: none !important;
    margin-bottom: 0;
    height: auto;
    &__blur {
      display: none;
    }
    &__main-img {
      box-shadow: none;
      min-width: 200px;
    }
    &__head {
      &--user-info {
        &__text {
          color: black;
        }
        &__des {
          color: $grey-color;
        }
      }
    }
    &__button {
      font-size: 0;
      gap: 0;
    }
  }
  @media screen and (max-width: 500px) {
    &__head {
      flex-direction: column;
    }
  }
}
</style>