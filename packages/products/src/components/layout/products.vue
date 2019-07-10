<template>
  <core-layout id="products" extension="true">
    <core-nav slot="extension"></core-nav>
    <v-content>
      <v-container>
        <v-layout row align-center justify-center class="mb-5">
          <v-btn
            class="text-capitalize"
            round
            color="blue darken-4"
            dark
            :flat="monthlySelected"
            @click="packageType = 'yearly'"
          >Yearly</v-btn>
          <v-btn
            class="text-capitalize"
            round
            color="blue darken-4"
            dark
            :flat="!monthlySelected"
            @click="packageType = 'monthly'"
          >Monthly</v-btn>
        </v-layout>

        <v-layout align-center justify-center row fill-height wrap>
          <package
            class="ma-2 mb-4"
            v-for="packgr in packages"
            :package="packgr"
            :key="packgr.type"
          ></package>
        </v-layout>
      </v-container>
    </v-content>
  </core-layout>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import dasherize from 'dasherize';

@Component({
  components: {
    package: () => import('./package.vue'),
  },
})
export default class Products extends Vue {
  packageType = 'monthly';

  get monthlySelected() {
    return this.packageType === 'monthly';
  }

  get packages() {
    return this.Packages.filter((p) => p.plan === this.packageType);
  }

  Packages = [
    {
      url: '/',
      plan: 'monthly',
      recommended: false,
      title: 'Free',
      type: 'free',
      method: 'Start',
      frequency: 'month',
      description: '',
      price: {
        currency: '$',
        figure: 0,
      },
      features: ['+ 200 free activities', 'video & photo activities'],
    },
    {
      url: '/',
      plan: 'monthly',
      recommended: true,
      title: 'Personal',
      type: 'personal',
      method: 'Buy',
      frequency: 'month',
      description: 'per licence (minimum 0)',
      price: {
        currency: '$',
        figure: 9,
      },
      features: [
        'Aceess all activities',
        'Video & Photo activities',
        'Personal Boards',
      ],
    },
    {
      url: '/',
      plan: 'monthly',
      recommended: false,
      title: 'Business',
      type: 'business',
      method: 'Buy',
      frequency: 'month',
      description: 'per licence (minimum 0)',
      price: {
        currency: '$',
        figure: 7,
      },
      features: [
        'All Personal Features',
        'Distribute licenses',
        'Priority support',
      ],
    },
    {
      url: '/contactus?p=ep',
      plan: 'monthly',
      recommended: false,
      title: 'Enterprice',
      type: 'enterprice',
      method: 'Concat Us',
      price: null,
      frequency: 'month',
      description: 'Contact us',
      features: ['All Business Features', 'Affect Content', 'Primier support'],
    },
    {
      url: '/',
      plan: 'yearly',
      recommended: false,
      title: 'Free',
      type: 'free',
      method: 'Start',
      frequency: 'month',
      description: '',
      price: {
        currency: '$',
        figure: 10,
      },
      features: ['+ 200 free activities', 'video & photo activities'],
    },
    {
      url: '/',
      plan: 'yearly',
      recommended: true,
      title: 'Personal',
      type: 'personal',
      method: 'Buy',
      frequency: 'month',
      description: 'per licence (minimum 0)',
      price: {
        currency: '$',
        figure: 19,
      },
      features: [
        'Aceess all activities',
        'Video & Photo activities',
        'Personal Boards',
      ],
    },
    {
      url: '/',
      plan: 'yearly',
      recommended: false,
      title: 'Business',
      type: 'business',
      method: 'Buy',
      frequency: 'month',
      description: 'per licence (minimum 0)',
      price: {
        currency: '$',
        figure: 17,
      },
      features: [
        'All Personal Features',
        'Distribute licenses',
        'Priority support',
      ],
    },
    {
      url: '/contactus?p=ep',
      plan: 'yearly',
      recommended: false,
      title: 'Enterprice',
      type: 'enterprice',
      method: 'Concat Us',
      price: null,
      frequency: 'month',
      description: 'Contact us',
      features: ['All Business Features', 'Affect Content', 'Primier support'],
    },
  ];

  constructor() {
    super();
  }
}
</script>

<style lang="scss" scoped>
</style>
