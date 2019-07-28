<template>
  <ul>
    <li v-for="item in items" :key="item.name" :class="{ active: item === value }">
      <span v-if="item.children" @click="open(item)">{{item.name}}</span>
      <span v-else @click="select(item);currentOpen=null">{{item.name}}</span>
      <transition name="fade">
        <template v-if="currentOpen === item">
          <ul>
            <li
              v-for="child in item.children"
              :key="child.name"
              :class="{ active: child === value }"
            >
              <span @click="select(child)">{{child.name}}</span>
            </li>
          </ul>
        </template>
      </transition>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class FilterList extends Vue {
  @Prop() value;

  @Prop() items;

  currentOpen = null;

  select(item) {
    this.$emit('input', item);
  }

  open(item) {
    if (this.currentOpen === item) {
      this.currentOpen = null;
    } else {
      this.currentOpen = item;
      if (item.children) {
        this.select(item.children[0]);
      }
    }
  }
}
</script>


<style lang="scss" scoped>
ul,
li {
  list-style: none;
  color: #ddd;
  margin: 10px 0;
  &:hover > span {
    color: #fff;
    font-weight: bold;
  }

  &.active {
    color: #fff;
    font-weight: bold;
  }
}

ul {
  margin: 0;
  padding: 0;

  li {
    span {
      cursor: pointer;
    }
    ul {
      padding-left: 10px;
    }
  }
}
</style>


