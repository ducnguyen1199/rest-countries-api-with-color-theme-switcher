<template>
  <div class="detail-page">
    <div class="container">
      <router-link to="/" class="btn-border my-5 d-inline-block"
        >← Back</router-link
      >
      <div v-if="!isLoading">
        <div class="row align-items-center">
          <div class="col-12 col-lg-6">
            <img :src="detailContry.flag" alt="flag image" width="100%" />
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
    this.$store.dispatch("fetchDetailCountry", {
      name: this.$router.currentRoute.params.name,
    });
    if (this.$store.state.coutries.length === 0)
      this.$store.dispatch("fetchCountries");
  },
  computed: {
    detailContry() {
      return this.$store.state.detailContry;
    },
    bordersFormat() {
      const borders = this.$store.state.coutries.filter((country) =>
        this.$store.state.borders?.some(
          (border) => border === country.alpha3Code
        )
      );
      return borders.map((item) => item.name);
    },
  },
  watch: {
    $route() {
      this.isLoading = true;
      this.isLoadingBorders = true;
      this.$store.dispatch("fetchDetailCountry", {
        name: this.$router.currentRoute.params.name,
      });
      if (this.$store.state.coutries.length === 0)
        this.$store.dispatch("fetchCountries");
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
      return value?.toString();
    },
    arrObjToString(value) {
      return value?.map((item) => item.name).toString();
    },
  },
};
</script>

<style scoped>
.detail-page {
  font-size: 16px;
  color: var(--text-secondary);
}
.detail-page .btn-border {
  border: 0;
  padding: 3px 20px;
  border-radius: 3px;
  text-decoration: none;
  box-shadow: 0px 0px 10px var(--color-blur);
  background-color: var(--background-primary);
  color: var(--text-primary);
}
</style>