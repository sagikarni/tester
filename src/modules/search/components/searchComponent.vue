<template>
  <div >
  
  
    
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {State, Action, Getter} from 'vuex-class';
import {ISearchState} from "@/modules/search/store/types";

const namespace: string = 'search';

@Component
export default class SearchComponent extends Vue {

   @State(state => state.search) public searchState?: ISearchState;
   @Action('getSearchResults' , {namespace}) public getSearchResults: any;
   @Action('getFilters' , {namespace}) public getFilters: any;



    public startSearch() {
      this.getSearchResults({name: 'search term'});
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
