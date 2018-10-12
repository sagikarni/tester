<template>

    <v-container fill-height>
        <v-layout align-center>
            <v-flex class="text-xs-center">
                <h1 class="display-2 primary--text">
                    Whoops, 404
                </h1>
                <p>
                    The page you were looking for does not exist
                </p>
                <v-btn outline color="primary" :to="`${to}getting-started/quick-start`">Get me out of here!</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class NotFoundPage extends Vue {
  @Prop()
  public to = '/';
}
</script>