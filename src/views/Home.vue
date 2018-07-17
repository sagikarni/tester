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

  <div style="height:400px;width:800px;background-color:green">
              <img style="height: 100%; background-color: white"  src="/media/restricted/collections/photos/collection-1/thumbnails/1.jpg">
  </div>
  
  <div style="height:800px;width:500px;background-color:yellow">
              <img style="width: 50%; background-color: white"  src="/media/restricted/collections/photos/collection-1/thumbnails/1.jpg">
  </div>


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
<style scoped lang="scss">

 .object-fit_contain { object-fit: contain }
    .full-height{
        height:100%;
        background:#F8F8F8;
    }
   
    .table{
        display:table;
        width:100%;
 
        background: transparent!important;
    }
    .cell {
        display: table-cell;
        vertical-align: top;
        width: 100%;
        margin: 0 auto;
         text-align: center;
    }
    </style>