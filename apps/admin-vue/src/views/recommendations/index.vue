<template>
  <div class="dashboard-container" style="position:relative;padding:20px;">
    <div
      class="box-card"
      v-for="collection in collections"
      :key="collection._id"
    >
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="Collection name">
          <el-input
            :disabled="!collection.new"
            v-model="collection.name"
          ></el-input>
        </el-form-item>

        <el-form-item v-for="item in collection.items" :key="item._id">
          <el-form-item
            label="List name"
            style="border:1px solid #ddd;padding:20px"
          >
            <el-input v-model="item.name"></el-input>

            <el-form-item label="Activities">
              <ActivityTags v-model="item.activities" />
            </el-form-item>
            <el-button @click="removeList(collection.items, item)" type="text"
              >Delete {{ item.name }} list</el-button
            >
          </el-form-item>
        </el-form-item>

        <el-form-item>
          <el-button @click="addList(collection.items)" type="text"
            >Add new {{ collection.name }} list</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <el-button @click="addCollection" type="text">Add New Collection</el-button>
    <br />
    <el-button @click="save" type="text">Save All</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { UserModule } from '@/store/modules/user';
import request from '../../utils/request';
import { ActivitiesModule } from '../../store/modules/activities';
import { flatten } from 'lodash';
import { Message, MessageBox } from 'element-ui';
import ActivityTags from './activity-tags.vue';

@Component({
  components: { ActivityTags },
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
  get collections() {
    return ActivitiesModule.collections;
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
  public form = { name: '' };

  public dynamicTags = ['Tag 1', 'Tag 2', 'Tag 3'];
  public inputVisible = false;
  public inputValue = '';

  constructor() {
    super();
  }

  public getActivity(id) {
    return ActivitiesModule.activities.find((a) => a._id === id);
  }

  public async save() {
    console.log('submit!', this.collections);

    const res: any = await request({
      url: `/api/v1/collection`,
      method: 'post',
      baseURL: '',
      data: { collections: this.collections },
    });

    Message({
      message: 'saved',
      type: 'success',
      duration: 5 * 1000,
    });

    // await ActivitiesModule.AddActivity(res.activity);
    // this.collections = this.collections.map(c => ({...c, new: false }));
    this.collections.forEach((c) => {
      if (c.new) {
        c.new = false;
      }
    });
    console.log('done');
  }

  public removeCollection(collection) {
    this.collections.splice(this.collections.indexOf(collection), 1);
  }

  public addList(items) {
    items.push({ name: '', activities: [] });
  }

  public removeList(items, item) {
    items.splice(items.indexOf(item), 1);
  }

  public addCollection() {
    this.collections.push({
      new: true,
      name: '',
      items: [{ name: '', activities: [] }],
    });
  }

  public handleClose(tag) {
    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
  }

  public showInput(item) {
    // // debugger;
    debugger;
    item.edit = true;
    // this.inputVisible = true;
    // this.$nextTick(() => {
    //   debugger;
    //   this.$refs.saveTagInput[index].$refs.input.focus();
    // });
  }

  public handleInputConfirm() {
    const inputValue = this.inputValue;
    if (inputValue) {
      this.dynamicTags.push(inputValue);
    }
    this.inputVisible = false;
    this.inputValue = '';
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

.box-card {
  border-bottom: 3pxdotted#ccc;
  margin-bottom: 30px;
}
</style>
