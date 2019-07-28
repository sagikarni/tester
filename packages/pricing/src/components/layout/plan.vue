<template>
  <core-layout id="checkout" extension="true">
    <core-nav slot="extension" title="Checkout"></core-nav>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex>
            <v-stepper v-model="e1" style="max-width:600px;margin:auto;">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Order Summary</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">Personal Details</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">Payment</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <div class="order-summary">
                    <label>
                      <span>Plan:</span>
                      {{plan}}
                    </label>
                    <label>
                      <span>Licenses:</span>
                      <template v-if="!hasMultiLicenses">{{form.licenses}}</template>
                      <v-text-field
                        v-else
                        style="width:120px;"
                        class="text-num"
                        :rules="[rules.required, rules.min, rules.max]"
                        v-model="licensesValue"
                        type="number"
                        append-outer-icon="add"
                        @click:append-outer="increment"
                        prepend-icon="remove"
                        @click:prepend="decrement"
                      ></v-text-field>
                    </label>
                    <label>
                      <span>Subscription:</span>
                      {{subscription}}
                    </label>
                    <label style="font-size:20px;font-weight:bold">
                      <span>Total:</span>
                      {{total}} {{currency}}/month
                    </label>
                  </div>
                  <!-- <div>
                    Plan: 
                    License: {{form.licenses}}
                    <v-text-field
                      :rules="[rules.required, rules.min, rules.max]"
                      v-model="licensesValue"
                      type="number"
                      label="Number"
                      append-outer-icon="add"
                      @click:append-outer="increment"
                      prepend-icon="remove"
                      @click:prepend="decrement"
                    ></v-text-field>
                    subscription: {{subscription}}
                    total: {{ total }}/month
                  </div>-->
                  <!-- <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card> -->

                  <div style="display:flex;justify-content:space-between;">
                    <v-btn color="primary" @click="e1 = 2">Continue</v-btn>

                    <v-btn flat>Cancel</v-btn>
                  </div>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>

                  <v-btn color="primary" @click="e1 = 3">Continue</v-btn>

                  <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <div style="margin:auto auto 10px auto;width:370px;">Secure payment using credit card:</div>

                  <iframe style="margin:auto;display:block;" :src="url" width="370px" height="370px" frameborder="0"></iframe>

                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </core-layout>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import dasherize from 'dasherize';
import { PlansModule } from 'tera-core/src/store/plans.module';
import { startCase } from 'lodash';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  components: {
    package: () => import('./package.vue'),
  },
})
export default class Checkout extends Vue {
  e1 = 0;
  //   $query_parameters['currency'] = '1'; //Type of currency 1 NIS, 2 USD, 978 EUR, 826 GBP, 392 JPY

  codes = { usd: ['$', 2] };

  get hasMultiLicenses() {
    return (this.form.max > 1);
  }

  get url() {
    const total = this.price.figure * this.form.licenses;
    const currency = this.codes[this.price.currency][1];
    return `https://direct.tranzila.com/cognishin/iframenew.php?sum=${total}&currency=${currency}&cred_type=1&nologo=1`;
  }

  get subscription() {
    return this.package.category === 'yearly' ? '1 Year' : ' Month';
  }

  get currency() {
    return this.codes[this.price.currency][0];
  }

  get total() {
    return this.price.figure * this.form.licenses;
  }

  get price() {
    return this.package.price;
  }

  onInput(e) {
    console.log({ e });
    debugger;
  }

  rules = {
    required: (value) => !!value || 'Required.',
    min: (v) => v >= this.form.min || `Min ${this.form.min} license`,
    max: (v) => v <= this.form.max || `Max ${this.form.max} license`,
  };

  get licensesValue() {
    return this.form.licenses;
  }

  set licensesValue(val) {
    if (val >= this.form.min && val <= this.form.max) {
      this.form.licenses = val;
    }
  }

  form: any = {
    licenses: 1,
    min: 1,
    max: 1,
  };

  mounted() {
    this.form.licenses = this.license.value;
    this.form.min = this.license.min;
    this.form.max = this.license.max;
  }

  increment() {
    if (this.form.licenses < this.license.max) {
      this.form.licenses = parseInt(this.form.licenses, 10) + 1;
    }
  }

  decrement() {
    if (this.form.licenses > this.license.min) {
      this.form.licenses = parseInt(this.form.licenses, 10) - 1;
    }
  }

  get plan() {
    return this.package.name;
  }

  get license() {
    return this.package.licenses && this.package.licenses;
  }

  get package(): any {
    console.log({ p: this.$route.params.plan });
    return PlansModule.plan
      .query()
      .where('_id', this.$route.params.plan)
      .first();
  }

  constructor() {
    super();
  }

  public async beforeRouteEnter(to, from, next) {
    await Promise.all([PlansModule.load()]);

    next();
  }
}
</script>

<style lang="scss" scoped>
.order-summary {
  label {
    display: flex;
    align-items: center;

    margin: 0 0 20px 0;
    span {
      width: 100px;
      display: inline-block;
    }
  }
}
</style>

<style lang="scss" >
.text-num {
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
}
.text-num input {
  text-align: center;
}
</style>