import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onPost('/users').reply(200, {
  user: { name: 'John Smith' }
});

mock.onPost('/users/login').reply(200, {
  user: { name: 'John Smith' }
});

Vue.use(VueAxios, axios);
