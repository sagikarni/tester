<template>
  <el-scrollbar wrap-class="list" view-class="view-box" :native="false" class="colscrol">
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

      <div v-for="data in datasource" :key="data.id" style="margin-bottom:20px;">
        <h2>
          {{data.label}}
          <el-button
            @click="removeCategory(data)"
            :disabled="data.used"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </h2>
        <el-tag
          v-for="tag in data.children"
          :key="tag.id"
          :closable="!tag.used"
          @close="handleClose(tag)"
          :type="!tag.used ? 'danger': 'primary'"
        >{{tag.label}}</el-tag>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ActivitiesModule } from '../../store/modules/activities';
import { CategoryModule } from '../../store/modules/category';
import { DomainModule } from '../../store/modules/domains';
import { Message } from 'element-ui';

@Component({})
export default class Categories extends Vue {
  get activities() {
    return ActivitiesModule.activities;
  }

  get categories() {
    return CategoryModule.categories;
  }

  get subcategories() {
    return CategoryModule.subCategories;
  }

  get datasource() {
    const ds = this.categories.map((category) => ({
      id: category._id,
      label: category.name,
      used: this.activities.some((a) => a.category === category._id),
      children: this.subcategories
        .filter((a) => a.category._id === category._id)
        .map((sub) => ({
          label: sub.name,
          id: sub._id,
          used: this.activities.some((a) => a.subCategory === sub._id),
        })),
    }));

    return ds;
  }

  formCategory = { name: '' };
  formSubcategory = { name: '', category: null };

  constructor() {
    super();
  }

  async addSubcategory() {
    const sub = {
      name: this.formSubcategory.name,
      category: this.categories.find(
        (c) => c.name === this.formSubcategory.category
      )._id,
    };

    await CategoryModule.AddSubCategory(sub);

    Message({
      message: 'sub-category saved!',
      type: 'success',
      duration: 5 * 1000,
    });
  }

  addCategory() {
    CategoryModule.AddCategory({ category: this.formCategory.name });

    Message({
      message: 'category saved!',
      type: 'success',
      duration: 5 * 1000,
    });
  }

  handleClose(tag) {
    this.$confirm(
      'This will permanently delete this item. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    ).then(async () => {
      await CategoryModule.RemoveSubCategory({ id: tag.id });

      Message({
        message: `${tag.label} removed!`,
        type: 'success',
        duration: 5 * 1000,
      });
    });
  }

  removeCategory(some) {
    this.$confirm(
      'This will permanently delete this item. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    ).then(async () => {
      await CategoryModule.RemoveCategory({ id: some.id });

      Message({
        message: `${some.label} removed!`,
        type: 'success',
        duration: 5 * 1000,
      });
    });
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
  background-color: lightgoldenrodyellow;
}
.colscrol {
  height: calc(100vh - 66px);
  // width: 60%;
  // display: inline-block;

  &-first {
    height: calc(100vh - 230px);
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
  margin: 10px 10px 10px 0;
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
