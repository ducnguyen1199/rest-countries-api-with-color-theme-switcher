import Vue from 'vue';
import Vuex from 'vuex';
import { getAll, getDetail } from '@/services/api.service';
import { getResponseErrorMessage } from '@/services/utils';
import _ from 'lodash';

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

        const regions = _.uniqBy(
          _.compact(
            _.map(coutries, (item) => ({
              value: item.region,
              text: item.region,
            }))
          ),
          'value'
        );

        commit('mutationCountries', { coutries, regions });
      } catch (error) {
        alert(getResponseErrorMessage(error));
      }
    },
    async fetchDetailCountry({ commit }, { name }) {
      try {
        const rs = await getDetail(name);
        const { data } = rs;

        if (!data.length) {
          throw new Error('Data is Empty!');
        }

        commit('mutationDetailCountry', { detailContry: _.head(data) });
      } catch (error) {
        alert(getResponseErrorMessage(error));
      }
    },
  },
});
