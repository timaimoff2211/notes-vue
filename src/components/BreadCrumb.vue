<template>
  <div class="bread-crumb">
    <div 
      class="bread-crumb__item"
      v-for="point, i in points"
      :key="point.label+i"
    >
      <router-link
        v-if="point.isLink"
        :to="{name: point.urlName}"
        class="bread-crumb__item-label"
      >
        {{point.label}}
      </router-link>
      <span v-else class="bread-crumb__item-label">{{point.label}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    points: {type: Array, required: true}
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.bread-crumb {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  &__item {
    font-size: 12px;
    padding: 0 10px;
    border-right: 1px solid $grey-light;
    &:last-child {
      border-right: none;
    }
    &-label {
      color: $grey-light;
    }
  }
}
</style>