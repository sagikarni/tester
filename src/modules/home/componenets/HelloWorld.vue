<template>
  <div class="hello">
<h1 ref="mymsg1" >{{$locale.home.name}}</h1>
l;,f;l,fs;ldf
      dfs
      dfsd
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    HI
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {State, Action, Getter} from 'vuex-class';
import {ISearchState} from "../../search/store/types";

const namespace: string = 'search';
@Component
export default class HelloWorld extends Vue {

   @State(state=>state.search) searchState?: ISearchState;
   @Action('getSearchResults' , {namespace}) public getSearchResults: any;

  @Prop() private msg!: string;

    private mounted() {
             this.getSearchResults({name: 'sagi karni'});
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
