<template>
  <v-card width="300" :class="{ 'recommended-highlight': recommended }">
    <section class="recommended">
      <span v-if="recommended">Recommended</span>
    </section>
    <header>
      <h2>{{title}}</h2>
      <hr>
    </header>
    <section class="price">
      <span v-if="price">
        <sup class="currency">{{price.currency}}</sup>
        <span class="figure">{{price.figure}}</span>
        <sup class="frequency">{{frequency}}</sup>
      </span>
      <div class="description">{{description}}</div>
    </section>
    <section class="features">
      <ul class="fa-ul">
        <li v-for="feature in features" :key="feature">
          <span class="fa-li">
            <i class="fas fa-check"></i>
          </span>
          {{feature}}
        </li>
      </ul>
    </section>
    <v-btn color="blue darken-4" dark>{{method}}</v-btn>
  </v-card>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Package extends Vue {
  @Prop() package;

  get recommended() {
    return this.package.recommended;
  }
  get title() {
    return this.package.title;
  }

  get price() {
    return this.package.price;
  }

  get description() {
      return this.package.description;
  }

  get features() {
      return this.package.features;
  }

  get method() {
      return this.package.method;
  }

  get frequency() {
      return this.package.frequency;
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;

  &.recommended-highlight {
    transform: scale(1.05);
    z-index: 1;
  }

  .recommended {
    height: 30px;

    span {
      background: forestgreen;
      color: #fff;
      text-align: center;
      padding: 5px 20px;
      display: inline-block;
      margin: 0 auto;
      font-weight: bold;
      text-transform: uppercase;
    }
  }

  header {
    padding: 15px 0 15px;
    height: 60px;
    box-sizing: border-box;

    h2 {
      margin-bottom: 5px;
    }

    hr {
      height: 2px;
      background: darkblue;
      width: 40px;
      border: 0;
      margin: auto;
    }
  }

  .price {
    font-size: 20px;
    text-align: center;
    height: 100px;
    margin-bottom: 20px;

    sup.currency {
      top: -23px;
    }

    .figure {
      font-size: 50px;
      margin: 0 5px;
    }

    .description {
      color: darkblue;
      font-weight: bold;
      font-size: 13px;
    }
  }

  .features {
    height: 130px;
    margin-bottom: 10px;

    .fa-ul {
      font-size: 18px;
      color: #555;
      height: 150px;
      margin-bottom: 20px;

      li {
        margin: 2px 0 15px 0;
      }
      .fa-li {
        color: darkblue;
      }
    }
  }
}
</style>
