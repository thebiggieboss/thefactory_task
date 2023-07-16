<script>
import {ref, onMounted, onBeforeUnmount} from 'vue';

export default {
  setup() {
    const windowWidth = ref(window.innerWidth);

    const handleView = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener('resize', handleView);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleView);
    });
    return {
      windowWidth
    };
  }
};
</script>

<template>
  <div class="header-component">
    <div class="header-component__content wrapper">
      <RouterLink to="/">
        <img src="/factory-logo.ico" alt="" class="header-component__logo">
      </RouterLink>
      <div class="header-component__actions">
        <RouterLink to="/">
          <div class="header-component__actions--block" v-if="$route.path !== '/'">
            <img class="header-component__actions--search-icon" src="@/assets/icons/search-icon.svg" alt="">
            <p v-if="windowWidth >= 768" class="header-component__actions--title">Поиск</p>
          </div>
        </RouterLink>
        <RouterLink to="/favorites">
          <div class="header-component__actions--block">
            <img src="@/assets/icons/heart-icon.svg" alt="">
            <p v-if="windowWidth >= 768" class="header-component__actions--title">Избранное</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-component {
  background-color: $secondary;

  &__content {
    display: flex;
    justify-content: space-between;
    padding: 16px 8px;
  }

  &__logo {
    width: 100%;
    max-width: 112px;
    height: 44px;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 36px;

    &--block {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    &--search-icon {
      filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(36deg) brightness(102%) contrast(103%);
    }

    &--title {
      color: #FFF;
    }
  }

  @media screen and (max-width: 768px) {
    &__logo {
      max-width: 84px;
      height: 32px;
    }
    &__actions {
      gap: 16px;
    }
  }
}
</style>