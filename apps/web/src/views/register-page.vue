<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>

        <v-container>
          <register-form-component :error="error" @submit="submit"></register-form-component>

        </v-container>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
// import BaseComponent from '@/modules/common/components/baseComponent.vue';
import { RegisterFormComponent, Auth, REGISTER } from '@libs/vue-auth';

@Component({
  components: { RegisterFormComponent }
})
export default class RegisterPage extends Vue {
  submitted = false;

  @Auth.Action(REGISTER)
  register: any;

  @Auth.Getter('error')
  error: any;

  @Auth.Getter('isAuthenticated')
  public isAuthenticated: any;

  @Watch('isAuthenticated', { immediate: true, deep: true })
  onisAuthenticatedChanged(val: string, oldVal: string) {
    if (val && this.submitted) this.$router.push('/');
  }

  constructor() {
    super();
  }

  public submit(form: any) {
    this.submitted = true;
    this.register(form);
  }
}
</script>

