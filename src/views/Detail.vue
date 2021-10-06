<template>
  <div class="detail-page">
    <div class="container">
      <button @click="$router.go(-1)" class="btn-border my-5 d-inline-block">
        ← Back
      </button>
      <div v-if="!isLoading">
        <div class="row align-items-center">
          <div class="col-12 col-lg-6">
            <img
              :src="detailContry.flag && detailContry.flags.png"
              alt="flag image"
              width="100%"
            />
          </div>
          <div class="col-12 col-lg-6">
            <h1 class="my-4">{{ detailContry.name }}</h1>
            <div class="row">
              <div class="col-12 col-lg-6 mb-5 mb-lg-0">
                <p><b>Native Name: </b>{{ detailContry.nativeName }}</p>
                <p><b>Population: </b>{{ detailContry.population }}</p>
                <p><b>Region: </b>{{ detailContry.region }}</p>
                <p><b>Sub Region: </b>{{ detailContry.subregion }}</p>
                <p><b>Capital: </b>{{ detailContry.capital }}</p>
              </div>
              <div class="col-12 col-lg-6 mb-5 mb-lg-0">
                <p>
                  <b>Top Level Domain: </b
                  >{{ detailContry.topLevelDomain | arrtoString }}
                </p>
                <p>
                  <b>Currencies: </b
                  >{{ detailContry.currencies | arrObjToString }}
                </p>
                <p>
                  <b>Languages: </b
                  >{{ detailContry.languages | arrObjToString }}
                </p>
              </div>
            </div>
            <div>
              <b>Border Countries: </b>
              <span v-if="!isLoadingBorders">
                <span v-if="!bordersFormat.length">0</span>
                <router-link
                  :to="`/detail/${item}`"
                  class="btn-border m-1 d-inline-block"
                  v-for="(item, index) in bordersFormat"
                  :key="index"
                >
                  {{ item }}
                </router-link>
              </span>
              <div class="d-inline-block" v-else>
                <b-spinner label="Loading..."></b-spinner>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="loading" v-else>
        <b-spinner type="grow" label="Loading..."></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  data() {
    return {
      borders: [],
      isLoading: false,
      isLoadingBorders: false,
    };
  },
  async mounted() {
    this.isLoading = true;
    this.isLoadingBorders = true;

    this.$store.dispatch('fetchDetailCountry', {
      name: this.$router.currentRoute.params.name,
    });

    if (_.isEmpty(this.$store.state.coutries)) {
      this.$store.dispatch('fetchCountries');
    }
  },
  computed: {
    detailContry() {
      return this.$store.state.detailContry;
    },
    bordersFormat() {
      const { coutries, detailContry } = this.$store.state;
      const borders = _.filter(coutries, (country) =>
        _.some(detailContry.borders, (border) => border === country.alpha3Code)
      );

      return _.map(borders, (item) => item.name);
    },
  },
  watch: {
    $route() {
      this.isLoading = true;
      this.isLoadingBorders = true;

      this.$store.dispatch('fetchDetailCountry', {
        name: this.$router.currentRoute.params.name,
      });

      if (!this.$store.state.coutries.length) {
        this.$store.dispatch('fetchCountries');
      }
    },
    detailContry() {
      this.isLoading = false;
    },
    bordersFormat() {
      this.isLoadingBorders = false;
    },
  },
  filters: {
    arrtoString(value) {
      return _.toString(value);
    },
    arrObjToString(value) {
      return _.toString(_.map(value, (item) => item.name));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/global.scss';
.detail-page {
  @include theme() {
    background-color: theme-get('bg-secondary');
  }
  font-family: 'Nunito Sans', sans-serif;
  min-height: 100vh;
  * {
    font-size: 16px;
    @include theme() {
      color: theme-get('text-secondary');
    }
  }
  h1 {
    font-size: 30px;
  }
  .btn-border {
    border: 0;
    padding: 3px 20px;
    border-radius: 3px;
    text-decoration: none;
    @include theme() {
      box-shadow: 0 0 10px theme-get('color-blur');
      background-color: theme-get('bg-primary');
      color: theme-get('text-primary');
    }
  }
}
</style>
