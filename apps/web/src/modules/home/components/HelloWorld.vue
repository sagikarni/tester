<template>
  <div class="hello">
  <h1 ref="mymsg1" >$locale.home.name</h1>
  <h1  >is rtl: {{$isRTL}}</h1>
<br>
<router-link to="/search">   Go to Search Page</router-link>
<br>

 <div class="tr-container">
    A title 
   
  </div>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {State, Action, Getter} from 'vuex-class';


@Component
export default class HelloWorld extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
