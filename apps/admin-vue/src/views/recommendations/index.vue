<template>
  <div class="dashboard-container" style="position:relative;padding:20px;">
    <el-card class="box-card" v-for="collection in collections" :key="collection.name">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Collection name">
          <el-input v-model="collection.name"></el-input>
        </el-form-item>

        <el-form-item v-for="item in collection.items" :key="item.name">
          <el-form-item label="List name">
            <el-input v-model="item.name"></el-input>
          </el-form-item>

          <el-form-item label="Activities">
            <el-tag
              :key="tag"
              v-for="tag in item.activities"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag.ref}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="mini"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Add Activity</el-button>
          </el-form-item>
        </el-form-item>

        <el-button @click="addList(collection.items)" type="text">Add List</el-button>
      </el-form>
    </el-card>

    <el-button @click="addCollection" type="text">Add Collection</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { UserModule } from '@/store/modules/user';
import request from '../../utils/request';
import { ActivitiesModule } from '../../store/modules/activities';
import { flatten } from 'lodash';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  filters: {
    limitArray: (arr, form) => {
      let f = arr;

      if (form.domain) {
        f = f.filter((a) => a.type.domain.name === form.domain);
      }
      if (form.type) {
        f = f.filter((a) => a.type.name === form.type);
      }
      if (form.mediaType) {
        f = f.filter((a) => a.mediaType === form.mediaType);
      }
      if (form.category) {
        f = f.filter((a) => a.category.name === form.category);
      }
      if (form.subcategory) {
        f = f.filter((a) => a.subCategory.name === form.subcategory);
      }
      if (form.level && form.level.length > 0) {
        f = f.filter((a) => form.level.includes(a.level));
      }
      if (form.audience) {
        f = f.filter((a) => a.audience === form.audience);
      }
      if (form.status) {
        f = f.filter((a) => a.status === form.status);
      }
      if (form.printable != null) {
        f = f.filter((a) => a.printable === form.printable);
      }
      if (form.free != null) {
        f = f.filter((a) => a.free === form.free);
      }
      if (form.editorial != null) {
        f = f.filter((a) => a.editorial === form.editorial);
      }
      if (form.text) {
        f = f.filter((obj) =>
          Object.keys(obj).some(
            (key) =>
              typeof obj[key] === 'string' &&
              obj[key]
                .toString()
                .toLowerCase()
                .includes(form.text.toString().toLowerCase())
          )
        );
      }
      return f;
    },
  },
})
export default class Recommendations extends Vue {
  form = { name: '' };

  collections = [
    {
      name: 'homepage',
      items: [
        {
          name: 'most-popular',
          activities: [{ name: 'Animals 1', ref: '5c6c0170b6ecb4637383af20' }],
        },
      ],
    },
  ];

  addList(items) {
    items.push({ name: '', activities: [] });
  }

  addCollection() {
    this.collections.push({
      name: '',
      items: [{ name: '', activities: [] }],
    });
  }

  dynamicTags = ['Tag 1', 'Tag 2', 'Tag 3'];
  inputVisible = false;
  inputValue = '';

  handleClose(tag) {
    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
  }

  showInput() {
    this.inputVisible = true;
    this.$nextTick(() => {
      this.$refs.saveTagInput.$refs.input.focus();
    });
  }

  handleInputConfirm() {
    let inputValue = this.inputValue;
    if (inputValue) {
      this.dynamicTags.push(inputValue);
    }
    this.inputVisible = false;
    this.inputValue = '';
  }

  get categories() {
    return ActivitiesModule.categories;
  }

  get subcategories() {
    return ActivitiesModule.subcategories;
  }

  get domainNames() {
    return Object.keys(ActivitiesModule.domains);
  }

  get types() {
    return ActivitiesModule.types;
  }

  get items() {
    return ActivitiesModule.activities;
  }

  async beforeRouteEnter(to, from, next) {
    await Promise.all([
      ActivitiesModule.LoadActivities(),
      ActivitiesModule.LoadCategories(),
      ActivitiesModule.LoadDomains(),
    ]);

    next();
  }

  constructor() {
    super();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
