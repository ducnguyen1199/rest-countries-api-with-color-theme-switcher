<template>
  <b-card
    :title="data.name"
    :img-src="data.flag && data.flags.png"
    :img-alt="`Image ${data.name}`"
    @click="() => this.$router.push(`detail/${data.name}`)"
    img-top
    tag="article"
    class="mb-4 country-card cursor-pointer"
  >
    <b-card-text>
      <p><b>Pobulation: </b>{{ data.population }}</p>
      <p><b>Region: </b>{{ data.region }}</p>
      <p><b>Capital: </b>{{ data.capital }}</p>
    </b-card-text>
  </b-card>
</template>
<script>
export default {
  props: ['data'],
  name: 'CountryCard',
};
</script>
<style lang="scss" scoped>
.country-card {
  @include theme() {
    box-shadow: 0 0 10px theme-get('color-blur');
    background-color: theme-get('bg-primary');
    color: theme-get('text-secondary');
  }

  border: 0;
  img {
    height: 150px;
  }
  .card-title {
    font-size: 20px;
  }
  p {
    margin-bottom: 0;
  }
}
</style>
