<template>
  <div id="overview">
    <v-content>
      <v-container>
        <v-layout align-center justify-center row fill-height class="mb-4">
          <v-btn
            round
            color="primary"
            dark
            :flat="monthlySelected"
            @click="packageType = 'yearly'"
          >Yearly</v-btn>
          <v-btn
            round
            color="primary"
            dark
            :flat="!monthlySelected"
            @click="packageType = 'monthly'"
          >Monthly</v-btn>
        </v-layout>
        <v-layout align-center justify-center row fill-height wrap>
          <package class="ma-2" v-for="packgr in packages" :package="packgr" :key="packgr.type"></package>
        </v-layout>
      </v-container>
    </v-content>
  </div>
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
    return this.Packages.filter((p) => p.frequency === this.packageType);
  }

  Packages = [
    {
      recommended: false,
      title: 'Free',
      type: 'free',
      method: 'Start',
      frequency: 'monthly',
      description: '',
      price: {
        currency: '$',
        figure: 0,
      },
      features: ['+ 200 free activities', 'video & photo activities'],
    },
    {
      recommended: true,
      title: 'Personal',
      type: 'personal',
      method: 'Buy',
      frequency: 'monthly',
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
      recommended: false,
      title: 'Business',
      type: 'business',
      method: 'Buy',
      frequency: 'monthly',
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
      recommended: false,
      title: 'Enterprice',
      type: 'enterprice',
      method: 'Concat Us',
      price: null,
      frequency: 'monthly',
      description: 'Contact us',
      features: ['All Business Features', 'Affect Content', 'Primier support'],
    },
    {
      recommended: false,
      title: 'Free',
      type: 'free',
      method: 'Start',
      frequency: 'yearly',
      description: '',
      price: {
        currency: '$',
        figure: 10,
      },
      features: ['+ 200 free activities', 'video & photo activities'],
    },
    {
      recommended: false,
      title: 'Personal',
      type: 'personal',
      method: 'Buy',
      frequency: 'yearly',
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
      recommended: false,
      title: 'Business',
      type: 'business',
      method: 'Buy',
      frequency: 'yearly',
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
      recommended: true,
      title: 'Enterprice',
      type: 'enterprice',
      method: 'Concat Us',
      price: null,
      frequency: 'yearly',
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
