<template>
  <div class="dashboard-container" style="position:relative;padding:20px;">
    <el-form :inline="true" :model="formCategory" class="demo-form-inline">
      <el-form-item label="Category:">
        <el-input v-model="formCategory.name" placeholder="name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addCategory">Add</el-button>
      </el-form-item>
    </el-form>

    <el-form :inline="true" :model="formSubcategory" class="demo-form-inline">
      <el-form-item label="Subcategory:">
        <el-input v-model="formSubcategory.name" placeholder="name"></el-input>
      </el-form-item>
      <el-form-item label="In Category:">
        <el-select placeholder="Category" v-model="formSubcategory.category" clearable>
          <el-option
            :key="category.name"
            :label="category.name"
            :value="category.name"
            v-for="category in categories"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addSubcategory">Add</el-button>
      </el-form-item>
    </el-form>

    <el-tree
      :data="datab"
      :props="defaultProps"
      @node-click="handleNodeClick"
      node-key="label"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span style="margin:0 20px;">
          <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { UserModule } from '@/store/modules/user';
import request from '../../utils/request';
import { ActivitiesModule } from '../../store/modules/activities';
import { flatten } from 'lodash';
import { Message } from 'element-ui';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({})
export default class Categories extends Vue {
  get categories() {
    return ActivitiesModule.categories;
  }

  get subcategories() {
    return ActivitiesModule.subcategories;
  }

  get datab() {
    if (!this.categories) return;
    return this.categories.map((x) => ({
      id: x.name,
      label: x.name,
      children: x.subcategory.map((v) => ({ label: v.name, id: v.name })),
    }));
  }

  addSubcategory() {
    ActivitiesModule.AddSubCategory({
      name: this.formSubcategory.name,
      category: this.formSubcategory.category,
    });

    Message({
      message: 'sub category saved',
      type: 'success',
      duration: 5 * 1000,
    });
  }

  addCategory() {
    ActivitiesModule.AddCategory({ category: this.formCategory.name });

    Message({
      message: 'category saved!',
      type: 'success',
      duration: 5 * 1000,
    });
  }

  input2 = '';
  formCategory = { name: '' };
  formSubcategory = { name: '', category: null };

  handleNodeClick(data) {
    console.log(data);
  }

  add() {}

  onSubmit() {}

  defaultProps = {
    children: 'children',
    label: 'label',
  };

  remove(node, data) {
    if (node.level === 1) {
      ActivitiesModule.RemoveCategory({
        name: data.label,
      });
    }

    if (node.level === 2) {
      ActivitiesModule.RemoveSubCategory({
        name: data.label,
      });
    }

    Message({
      message: 'removed!',
      type: 'success',
      duration: 5 * 1000,
    });
    // const parent = node.parent;
    // const children = parent.data.children || parent.data;
    // const index = children.findIndex((d) => d.id === data.id);
    // children.splice(index, 1);
  }

  form = {
    domain: null,
    type: null,
    mediaType: null,
    category: null,
    subcategory: null,
    level: [],
    audience: null,
    status: null,
    printable: null,
    free: null,
    editorial: null,
    text: null,
  };

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
.dashboard {
  &-container {
    // margin: 30px;
    background: #fafafa;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.demo-input-label {
  display: inline-block;
  width: 130px;
}
</style>

<style rel="stylesheet/scss" lang="scss">
.activity-item {
  // padding: 10px 50px 10px;
  // border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 10px 0px;
  border-right: 1px solid #f8f8f8;
  background: #fafafa;
  padding-left: 45px;
}

.activity-item.router-link-active {
  // box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.05), 0 -5px 5px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
}
.colscrol {
  height: calc(100vh - (120px));
  // width: 60%;
  // display: inline-block;

  &-first {
    height: calc(100vh - (230px));
    // display: inline-block;
    // width: 40%;
  }
}

.view-box {
  height: 100%;
}

.list {
  overflow-x: hidden;
}

.el-select {
  width: 150px;
  margin: 0 6px 6px;
}

.name {
  // color: #54626d;
  // font-size: 17px;
  // font-weight: 600;
  // margin: 10px 0 20px;
  color: #555555;
  line-height: 20px;
  font-size: 12px;
  font-weight: bold;
  margin: 0;
  padding: 0;
}
.el-tag {
  margin-right: 10px;
  color: #777;
}

// .el-row {
//   margin-bottom: 20px;
//   &:last-child {
//     margin-bottom: 0;
//   }
// }
// .el-col {
//   border-radius: 4px;
// }
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

h1 {
  margin: 0;
  padding: 0;
  font-family: Montserrat;
  font-weight: normal;
}

.tags {
  min-height: 36px;
  margin-top: 5px;
  width: 100%;
  color: #999999;
  padding: 0px 10px 0px 0px;
  span {
    border-radius: 2px;
    border: 1px solid #ddd;
    background: #eee;
    padding: 3px;
    display: inline-block;
    color: #999;
    font-size: 0.7rem;
    margin: 0 7px 0 0;
  }
}
</style>
