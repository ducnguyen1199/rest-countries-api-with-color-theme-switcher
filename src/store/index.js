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
  },
  mutations: {
    mutationCountries(state, { coutries, regions }) {
      state.coutries = coutries;
      state.regions = regions;
    },
    mutationDetailCountry(state, { detailContry }) {
      state.detailContry = detailContry;
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

        if (!data.length) {
          throw new Error("Data is Empty!");
        }

        const detailContry = data[0];

        commit("mutationDetailCountry", { detailContry });
      } catch (error) {
        alert(getResponseErrorMessage(error));
      }
    },
  },
});
