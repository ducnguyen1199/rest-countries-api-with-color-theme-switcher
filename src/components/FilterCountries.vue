<template>
  <div class="filer">
    <div class="row justify-content-between py-5">
      <div class="col-6">
        <b-input-group>
          <div class="form-control prepend">
            <i class="fa fa-search"></i>
          </div>
          <b-form-input
            class="filter-input"
            v-model="keyword"
            placeholder="Search for a country..."
            @input="() => this.$emit('onSearch', keyword)"
          />
        </b-input-group>
      </div>

      <div class="col-6 col-sm-5 col-lg-3">
        <b-form-select
          v-model="selected"
          :options="regions"
          @change="() => this.$emit('onSelected', selected)"
          class="form-control filter-selected"
        >
          <template #first>
            <b-form-select-option value="" disabled hidden
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
  name: "FilterCountries",
  props: ["regions"],
  data() {
    return {
      keyword: "",
      selected: "",
    };
  },
};
</script>
<style scoped>
.filter-input,
.filter-input:focus,
.filter-input:focus-visible,
.filer .prepend,
.filter-selected,
.filter-selected:focus,
.filter-selected:focus-visible {
  background-color: var(--background-primary);
  border-color: var(--background-primary);
  outline: none;
  color: var(--text-secondary);
  box-shadow: 0px 0px 10px 0px var(--color-blur);
}
.filter-selected {
  cursor: pointer;
}
.filer .prepend {
  flex: 0;
  width: initial;
  min-width: initial;
}
</style>
