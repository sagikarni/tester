<template>
    <div>
       <v-flex>
            <v-switch
            :label="`Highest Quality`" v-model="quality"></v-switch>
        <v-btn @click="$router.push('activity-details/1')">Premium - single photo</v-btn>
          <v-btn @click="$router.push('activity-details/2')">Premium - 2 horizontal photos</v-btn>
            <v-btn @click="$router.push('activity-details/3')">Premium - 2 vertical photo</v-btn>
              <v-btn @click="$router.push('activity-details/4')">Premium - Four photos</v-btn>
              <v-btn @click="$router.push('activity-details/10')">Premium - Video</v-btn>
               <v-btn @click="$router.push('activity-details/11')">Meaning - Photo</v-btn>
               <v-btn @click="$router.push('activity-details/12')">What in The Picture</v-btn>
               <v-btn @click="$router.push('activity-details/100')">Premium - Server Error</v-btn>
               <v-btn @click="$router.push('activity-details/101')">Premium - Not Found</v-btn>


       </v-flex>

    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class Home extends Vue {
    @Action('changeMediaQuality') public changeMediaQuality?: any;

    public quality?: boolean = false;

    @Watch('quality')
    public onPropertyChanged(value: boolean, oldValue: boolean) {
        this.changeMediaQuality({isHDMedia: value});
    }
}
</script>
