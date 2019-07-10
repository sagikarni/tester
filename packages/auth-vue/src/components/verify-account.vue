<template>
  <core-layout>
    <v-content>
      <div style="max-width:340px;margin:auto;" class="pa-3">verify...</div>
    </v-content>
  </core-layout>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';
import { AuthModule } from 'tera-core/src/store/auth-tera.module';

@Component({})
export default class VerifyAccountPage extends Vue {
  public submitted = false;

  get isAuthenticated() {
    return !!AuthModule.token;
  }

  @Watch('isAuthenticated', { immediate: true, deep: true })
  onisAuthenticatedChanged(val: string, oldVal: string) {
    if (val && this.submitted) {
      this.$router.push('/');
    }
  }

  get error() {
    return AuthModule.error;
  }

  constructor() {
    super();
  }

  public mounted() {
    this.submitted = true;
    AuthModule.verifyAccount({ token: this.$route.query.t });
  }

  destroyed() {
    AuthModule.clearErrors();
  }
}
</script>
