import Vue from "vue";
import Vuex from "vuex";
import { getAll, getDetail } from "@/services/api.service";
import { getResponseErrorMessage } from "@/services/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coutries: [],
    regions: [],
    detailContry: {},
    borders: [],
  },
  mutations: {
    mutationCountries(state, { coutries, regions }) {
      state.coutries = coutries;
      state.regions = regions;
    },
    mutationDetailCountry(state, { detailContry, borders }) {
      state.detailContry = detailContry;
      state.borders = borders;
    },
  },
  actions: {
    async fetchCountries({ commit }) {
      try {
        const rs = await getAll();
        const { data: coutries } = rs;
        const regions = [];

        coutries.forEach((item) => {
          if (!regions.some((region) => region.value === item.region)) {
            regions.push({ value: item.region, text: item.region });
          }
        });

        commit("mutationCountries", { coutries, regions });
      } catch (error) {
        alert(getResponseErrorMessage(error));
      }
    },
    async fetchDetailCountry({ commit }, { name }) {
      try {
        const rs = await getDetail(name);
        const { data } = rs;
        const detailContry = data[0];
        const borders = data[0].borders;

        commit("mutationDetailCountry", { detailContry, borders });
      } catch (error) {
        alert(getResponseErrorMessage(error));
      }
    },
  },
});
