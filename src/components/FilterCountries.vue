<template>
  <div class="filer-country">
    <div class="row justify-content-between py-5">
      <div class="col-12 col-sm-6 mb-1">
        <b-input-group class="filter-form">
          <div class="form-control prepend">
            <i class="fa fa-search"></i>
          </div>
          <b-form-input
            class="filter-input"
            v-model="keyword"
            placeholder="Search for a country..."
            @input="$emit('onSearch', keyword)"
          />
        </b-input-group>
      </div>

      <div class="col-12 col-sm-5 col-lg-3">
        <b-form-select
          v-model="selected"
          :options="regions"
          @change="$emit('onSelected', selected)"
          class="form-control filter-selected"
        >
          <template #first>
            <b-form-select-option value="null" disabled hidden
              >Filter by Region</b-form-select-option
            >
          </template>
        </b-form-select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FilterCountries',
  props: {
    regions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      keyword: null,
      selected: null,
    };
  },
};
</script>
<style lang="scss" scoped>
.filer-country {
  .filter-input,
  .filter-input:focus,
  .filter-input:focus-visible,
  .prepend,
  .filter-selected,
  .filter-selected:focus,
  .filter-selected:focus-visible {
    @include theme() {
      background-color: theme-get('bg-primary');
      color: theme-get('text-secondary');
      border-color: theme-get('bg-primary');
    }
    outline: none;
    box-shadow: none;
  }
  .filter-selected {
    cursor: pointer;
    @include theme() {
      box-shadow: 0 0 10px theme-get('color-blur');
    }
  }
  .prepend {
    flex: 0;
    width: initial;
    min-width: initial;
    z-index: 9;
  }
  .filter-form {
    @include theme() {
      box-shadow: 0 0 10px theme-get('color-blur');
    }
  }
}
</style>
