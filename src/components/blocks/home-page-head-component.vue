<script>
import {searchPhotos} from "@/service/unsplash";
import {Debounce} from "@/modules/debounce";
import {ref, watch, computed} from "vue";

// export default {
//   setup() {
//
//   }
// };
</script>

<template>
  <div class="home-page-head-component">
    <div class="home-page-head-component__content wrapper">
      <div class="home-page-head-component__search">
        <input
            @input="$emit('searchElement', $event.target.value)"
            type="text"
            placeholder="Поиск"
        >
        <img class="home-page-head-component__search--button" src="@/assets/icons/search-icon.svg" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page-head-component {
  background-image: url("@/assets/images/main-image.png");
  background-repeat: no-repeat;
  padding: 102px 0;
  &__search {
    max-width: 860px;
    margin: 0 auto;
    display: flex;
    background-color:  #FFFFFF;
    &--button {
      padding-right: 16px;
    }
    ::placeholder {
      color: #000000;
    }
  }
  @media screen and (max-width: 768px) {
      padding: 86px 0;
  }
}
</style>