<template>
  <b-card
    :title="data.name"
    :img-src="data.flags.png"
    :img-alt="`Image ${data.name}`"
    @click="() => this.$router.push(`detail/${data.name}`)"
    img-top
    tag="article"
    class="mb-4 country-card"
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
  props: ["data"],
  name: "CountryCard",
};
</script>
<style scoped>
.country-card img {
  height: 150px;
}
.country-card .card-title {
  font-size: 20px;
}
.country-card p {
  margin-bottom: 0;
}
.country-card {
  background: var(--background-primary);
  color: var(--text-secondary);
  box-shadow: 0px 0px 10px 0px var(--color-blur);
  border: 0;
}
</style>