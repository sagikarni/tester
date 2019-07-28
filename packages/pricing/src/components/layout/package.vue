<template>
  <v-card width="300" :class="{ 'recommended-highlight': recommended }" class="elevation-6">
    <section class="recommended">
      <span v-if="recommended">Recommended</span>
    </section>
    <header>
      <h2>{{name}}</h2>
      <hr />
    </header>
    <section class="price">
      <span v-if="price">
        <sup class="currency">{{codes[price.currency]}}</sup>
        <span class="figure">{{price.figure}}</span>
        <sup class="frequency">/month</sup>
        <div class="description">{{description}}</div>
      </span>
      <span v-else>
        <div class="message description">{{description}}</div>
      </span>
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
    <v-btn
      v-if="!hasPackage"
      :to="url"
      class="round"
      color="blue darken-4"
      dark
      :outline="method === 'Start'"
    >{{method}}</v-btn>
    <div v-else>Already signed up</div>
  </v-card>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from 'vue-property-decorator';
import { AuthModule } from 'tera-core/src/store/auth-tera.module';

@Component({})
export default class Package extends Vue {
  @Prop() package;

  codes = { usd: '$' };

  get hasPackage() {
    if (!AuthModule.user) return false;

    const user = AuthModule.user === null ? -1 : (AuthModule.user.plan || 0) ;

    if (this.level <= user) {
      return true;
    }

    return false; // !!AuthModule.user;
  }

  get id() {
    return this.package._id;
  }

  get level() {
    return this.package.level;
  }
  get recommended() {
    return this.package.recommended;
  }
  get name() {
    return this.package.name;
  }

  get price() {
    return this.package.price;
  }

  get description() {
    return this.package.description;
  }

  get method() {
    return this.$t(`Vuetify.Plans.${this.category}.${this.name}_Button`);
  }

  get category() {
    return this.package.category;
  }

  get url() {
    return (
      this.package.defaultUrl || `/pricing/${this.id}`
    );
  }

  get features() {
    return this.$t(`Vuetify.Plans.${this.category}.${this.name}`);
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  min-width: 300px;

  &.recommended-highlight {
    border: 1px solid darkblue;
    transform: scale(1.05);
    z-index: 1;
  }

  .recommended {
    height: 30px;

    span {
      background: forestgreen;
      color: #fff;
      text-align: center;
      padding: 5px 10px;
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

    sup {
      color: #888;
    }
    sup.currency {
      top: -16px;
    }

    sup.frequency {
      top: 0;
    }
    .figure {
      font-size: 40px;
      margin: 0 5px;
    }

    .description {
      color: darkblue;
      font-weight: bold;
      font-size: 13px;
    }

    .message {
      margin-top: 30px;
      font-size: 18px;
    }
  }

  .features {
    height: 130px;
    margin-bottom: 10px;

    .fa-ul {
      font-size: 16px;
      color: #777;
      height: 150px;
      margin-bottom: 20px;

      li {
        margin: 2px 0 15px 10px;
      }
      .fa-li {
        color: darkblue;
        .fas.fa-check {
          margin-right: 20px;
        }
      }
    }
  }

  .round {
    border-radius: 5px;
  }
}
</style>
