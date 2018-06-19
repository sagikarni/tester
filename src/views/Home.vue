<template>
    <div>
       <v-flex>
            <v-switch
            :label="`Highest Quality`"></v-switch>
        <v-btn @click="$router.push('activity-details/1')">Premium - single photo</v-btn>
          <v-btn @click="$router.push('activity-details/2')">Premium - 2 horizontal photos</v-btn>
            <v-btn @click="$router.push('activity-details/3')">Premium - 2 vertical photo</v-btn>
              <v-btn @click="$router.push('activity-details/4')">Premium - Four photos</v-btn>
              <v-btn @click="$router.push('activity-details/10')">Premium - Video</v-btn>
               <v-btn @click="$router.push('activity-details/100')">Premium - Server Error</v-btn>
               <v-btn @click="$router.push('activity-details/100')">Premium - Not Found</v-btn>
               

       </v-flex>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {}
</script>
