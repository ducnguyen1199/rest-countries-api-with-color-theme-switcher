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
      <div v-else-if="lodash.isEmpty(dataFilter)">
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
            :per-page="numberCardPerPage"
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
import { NUMBER_CARD_PER_PAGE } from '@/core/configs';
import _ from 'lodash';
export default {
  name: 'Home',
  components: { CountryCard, FilterCountries },
  data() {
    return {
      lodash: _,
      dataRegion: [],
      keyword: null,
      selected: null,
      currentPage: 1,
      totalRrows: 0,
      isLoading: true,
      numberCardPerPage: NUMBER_CARD_PER_PAGE,
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
      const filterByKw = _.filter(this.$store.state.coutries, (item) =>
        _.includes(_.toLower(item.name), _.toLower(this.keyword))
      );

      const filterByRegion =
        !this.selected || this.selected === 'All'
          ? filterByKw
          : _.filter(filterByKw, { region: this.selected });

      return filterByRegion;
    },
    dataRender() {
      return _.slice(
        this.dataFilter,
        (this.currentPage - 1) * NUMBER_CARD_PER_PAGE,
        this.currentPage * NUMBER_CARD_PER_PAGE
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
      this.totalRrows = Math.round(
        this.dataFilter.length / NUMBER_CARD_PER_PAGE
      );
    },
    currentPage() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
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
    @include theme() {
      color: theme-get('text-info');
    }
  }
}
</style>
