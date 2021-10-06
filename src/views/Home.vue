<template>
  <div class="home-page">
    <div class="container">
      <FilterCountries
        @onSearch="onSearch"
        @onSelected="onSelected"
        :regions="regions"
      />
      <div class="loading" v-if="isLoading">
        <b-spinner type="grow" label="Loading..."></b-spinner>
      </div>
      <div v-else-if="dataFilter.length === 0">
        <p class="nodata">No data availble</p>
      </div>
      <div class="row" v-else>
        <div
          class="col-12 col-sm-6 col-lg-3"
          v-for="(item, index) in dataRender"
          :key="index"
        >
          <CountryCard :data="item" />
        </div>
        <div class="d-flex justify-content-center">
          <b-pagination
            v-model="currentPage"
            :total-rows="dataFilter.length"
            :per-page="8"
            aria-controls="cards"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterCountries from '@/components/FilterCountries.vue';
import CountryCard from '@/components/CountryCard.vue';

export default {
  name: 'Home',
  components: { CountryCard, FilterCountries },
  data() {
    return {
      dataRegion: [],
      keyword: null,
      selected: null,
      currentPage: 1,
      totalRrows: 0,
      isLoading: true,
    };
  },
  methods: {
    onSearch(keyword) {
      this.keyword = keyword;
    },
    onSelected(selected) {
      this.selected = selected;
    },
  },
  computed: {
    dataFilter() {
      return this.$store.state.coutries.filter((item) => {
        const foundByKeyword =
          !this.keyword ||
          item.name.toLowerCase().includes(this.keyword?.toLowerCase());

        const foundByRegion = !this.selected || item.region === this.selected;

        return foundByKeyword && foundByRegion;
      });
    },
    dataRender() {
      return this.dataFilter.slice(
        (this.currentPage - 1) * 8,
        this.currentPage * 8
      );
    },
    regions() {
      return this.$store.state.regions;
    },
  },
  watch: {
    regions() {
      this.isLoading = false;
    },
    dataFilter() {
      this.totalRrows = Math.round(this.dataFilter.length / 8);
    },
  },
  async mounted() {
    this.isLoading = true;
    this.$store.dispatch('fetchCountries');
  },
};
</script>

<style lang="scss" scoped>
.home-page {
  @include theme() {
    background-color: theme-get('bg-secondary');
    min-height: 100vh;
  }
  font-family: 'Nunito Sans', sans-serif;
  * {
    font-size: 14px;
  }
  ul {
    box-shadow: 0 0 10px var(--color-blur);
    &::v-deep .page-item {
      .page-link {
        @include theme() {
          background-color: theme-get('bg-primary') !important;
          color: theme-get('text-info');
        }
      }
      &.active .page-link {
        background-color: #0d6efd !important;
      }
    }
  }
  .nodata {
    color: var(--text-info);
  }
}
</style>
