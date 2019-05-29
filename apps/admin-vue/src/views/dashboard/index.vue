<template>
  <div class="dashboard-container" style="position:relative">
    <div style="padding:10px;background:#F8F8F8;border-bottom:1px solid #F5F5F5;">
      <el-row type="flex" justify="space-between">
        <el-col :span="24" style="display:flex;">
          <el-select placeholder="All Domain" v-model="form.type.domain._id" clearable>
            <el-option
              v-for="domain in domains"
              :label="domain.name"
              :value="domain._id"
              :key="domain._id"
            />
          </el-select>

          <el-select placeholder="Activity Type" v-model="form.type._id" clearable>
            <el-option v-for="type in types" :label="type.name" :value="type._id" :key="type._id"/>
          </el-select>

          <el-select placeholder="Media" v-model="form.mediaType" clearable>
            <el-option label="Video" value="Video"/>
            <el-option label="Photo" value="Photo"/>
          </el-select>

          <el-select placeholder="Category" v-model="form.subCategory.category._id" clearable>
            <el-option
              :key="category._id"
              :label="category.name"
              :value="category._id"
              v-for="category in categories"
            ></el-option>
          </el-select>

          <el-select placeholder="Sub Category" v-model="form.subCategory._id" clearable>
            <el-option
              :key="category._id"
              :label="category.name"
              :value="category._id"
              v-for="category in subCategories"
            ></el-option>
          </el-select>

          <el-select placeholder="Audience" v-model="form.audience" clearable>
            <el-option label="All" value="All"/>
            <el-option label="Kids" value="Kids"/>
            <el-option label="Elderly" value="Elderly"/>
          </el-select>

          <el-select placeholder="Status" v-model="form.status" clearable>
            <el-option label="Started" value="Started"></el-option>
            <el-option label="Waiting For Review" value="WaitingForReview"></el-option>
            <el-option label="Technical Writer Pending" value="TechnicalWriterPending"></el-option>
            <el-option label="Technical Writer Approved" value="TechnicalWriterApproved"></el-option>
            <el-option label="Ready" value="Ready"></el-option>
            <el-option label="Published" value="Published"></el-option>
          </el-select>

          <el-select placeholder="Printable" v-model="form.printable" clearable>
            <el-option label="Yes" :value="true"/>
            <el-option label="No" :value="false"/>
          </el-select>

          <el-select placeholder="License" v-model="form.free" clearable>
            <el-option label="Free" :value="true"/>
            <el-option label="Paid" :value="false"/>
          </el-select>

          <el-select placeholder="Editorial" v-model="form.editorial" clearable>
            <el-option label="Yes" :value="true"/>
            <el-option label="No" :value="false"/>
          </el-select>

          <el-select
            placeholder="Level"
            v-model="form.level"
            clearable
            multiple
            collapse-tags
            style="flex-grow: 0;flex-shrink: 0;flex-basis: 13%;"
          >
            <el-option label="Basic" value="Basic"/>
            <el-option label="Intermediate" value="Intermediate"/>
            <el-option label="Advanced" value="Advanced"/>
          </el-select>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="6">
        <el-row style>
          <el-col :span="24">
            <div style="font-size:13px;background:khaki;;color:#444;font-weight:bold;padding:10px;">
              {{ itemsX.length }}
              Activities Founds
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-scrollbar
              wrap-class="list"
              view-class="view-box"
              :native="false"
              class="colscrol-first"
            >
              <router-link
                style="display:block;"
                :to="`/dashboard/activities/${item._id}`"
                v-for="item in itemsX"
                :key="item._id"
                class="activity-item"
              >
                <div class="name">{{ item.name }}</div>

                <div class="tags">
                  <span>{{ item.type.name }}</span>
                  <span>{{ item._id }}</span>
                </div>
              </router-link>
            </el-scrollbar>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="18">
        <el-scrollbar wrap-class="list" view-class="view-box" :native="false" class="colscrol">
          <div
            style="background:white;display:flex;justify-content:center;align-items:center;min-height:100%;padding:20px;"
          >
            <router-view/>
          </div>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { flatten, filter } from 'lodash';

import { ActivitiesModule } from '../../store/activities.module';
import { DomainsModule } from '../../store/domains.module';
import { CategoriesModule } from '../../store/categories.module';
import { StripsModule } from '../../store/strips.module';
import { ArticulationsModule } from '../../store/articulations.module';
import { AppModule } from '../../store/app';

const removeEmpty = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      removeEmpty(obj[key]);
    } else if (obj[key] === null) {
      delete obj[key];
    }
    if (
      obj[key] &&
      typeof obj[key] === 'object' &&
      Object.keys(obj[key]).length === 0
    ) {
      delete obj[key];
    }
  });
  return obj;
};

@Component({
  // filters: {
  //   limitArray: (arr, form) => {
  //     let f = arr;
  //     const types = DomainModule.types;
  //     if (form.domain) {
  //       f = f.filter((a) => types.find(t => t._id === a.type).domain._id === form.domain ); // a.type.domain.name === form.domain);
  //     }
  //     if (form.type) {
  //       f = f.filter((a) => a.type === form.type);
  //     }
  //     if (form.mediaType) {
  //       f = f.filter((a) => a.mediaType === form.mediaType);
  //     }
  //     if (form.category) {
  //       f = f.filter((a) => a.category && a.category === form.category);
  //     }
  //     if (form.subcategory) {
  //       f = f.filter(
  //         (a) => a.subCategory && a.subCategory === form.subcategory
  //       );
  //     }
  //     if (form.level && form.level.length > 0) {
  //       f = f.filter((a) => form.level.includes(a.level));
  //     }
  //     if (form.audience) {
  //       f = f.filter((a) => a.audience === form.audience);
  //     }
  //     if (form.status) {
  //       f = f.filter((a) => a.status === form.status);
  //     }
  //     if (form.printable != null) {
  //       f = f.filter((a) => a.printable === form.printable);
  //     }
  //     if (form.free != null) {
  //       f = f.filter((a) => a.free === form.free);
  //     }
  //     if (form.editorial != null) {
  //       f = f.filter((a) => a.editorial === form.editorial);
  //     }
  //     if (form.text) {
  //       f = f.filter((obj) =>
  //         JSON.stringify(obj)
  //           .toLowerCase()
  //           .includes(form.text.toLowerCase())
  //       );
  //     }
  //     return f;
  //   },
  // },
})
export default class Dashboard extends Vue {
  form = {
    audience: null,
    status: null,
    printable: null,
    free: null,
    editorial: null,
    level: null,
    mediaType: null,
    type: {
      _id: null,
      domain: {
        _id: null,
      },
    },
    subCategory: {
      _id: null,
      category: { _id: null },
    },
  };

  get itemsX() {
    const a = ActivitiesModule.activity
      .query()
      .with(['type.domain', 'category', 'subCategory.category'])
      .all();

    const form = removeEmpty(JSON.parse(JSON.stringify(this.form)));

    console.log({ form });

    const filteredActivities = filter(a, form);

    console.log({ filteredActivities });

    return filteredActivities;
  }

  get categories() {
    return CategoriesModule.category.all();
  }

  get subCategories() {
    return CategoriesModule.subCategory.all();
  }

  get domains() {
    return DomainsModule.domain.all();
  }

  get types() {
    return DomainsModule.types.all();
  }

  get items() {
    throw 'TODO items';
    // return ActivitiesModule.activities;
  }

  @Prop() searchKey;

  constructor() {
    super();
  }

  getType(id) {
    throw 'TODO getType!';
    // return this.types.find((t) => t._id === id);
  }
  @Watch('searchKey') onChangeSearchKey(n, o) {
    console.log({ n });
    // this.form.text = n;
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
  height: calc(100vh - (140px));
  // width: 60%;
  // display: inline-block;
  &-first {
    height: calc(100vh - 180px);
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
