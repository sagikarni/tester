<template>
  <div class="dashboard-container" style="position:relative">
    <div style="padding:10px;background:#F8F8F8;border-bottom:1px solid #F5F5F5;">
      <el-row type="flex" justify="space-between">
        <el-col :span="4">
          <el-button
            style="width:100%;margin-left:10px;"
            type="success"
            @click="$router.push('/dashboard/add')"
            icon="el-icon-plus"
          >New Activity</el-button>
        </el-col>
        <el-col :span="18" style="display:flex;">
          <el-select placeholder="All Domain" v-model="form.domain" clearable>
            <el-option v-for="domain in domains" :label="domain" :value="domain" :key="domain"/>
          </el-select>

          <el-select placeholder="Activity Type" v-model="form.type" clearable>
            <el-option v-for="type in types" :label="type" :value="type" :key="type"/>
          </el-select>

          <el-select placeholder="Media" v-model="form.mediaType" clearable>
            <el-option label="Video" value="Video"/>
            <el-option label="Photo" value="Photo"/>
          </el-select>

          <el-select placeholder="Category" v-model="form.category" clearable>
            <el-option
              :key="category.name"
              :label="category.name"
              :value="category.name"
              v-for="category in categories"
            ></el-option>
          </el-select>
          <el-select placeholder="Sub Category" v-model="form.subcategory" clearable>
            <el-option
              :key="category._id"
              :label="category.name"
              :value="category.name"
              v-for="category in subcategories"
            ></el-option>
          </el-select>

          <el-select placeholder="Audience" v-model="form.audience" clearable>
            <el-option label="Any" value="All"/>
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

    <div style>
      <div style>
        <el-row>
          <el-col :span="6">
            <div>
              <el-row style>
                <el-col :span="24" style="padding:10px 20px;background:#F7F7F7">
                  <el-input
                    placeholder="Search by Name, Description, Image ID or Activity ID"
                    prefix-icon="el-icon-search"
                    v-model="form.text"
                    clearable
                  ></el-input>
                  <div
                    style="font-size:13px;border:1px dotted #ccc;color:#444;font-weight:normal;padding:10px;"
                  >{{ $options.filters.limitArray(items, form).length }} Activities Founds</div>
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
                    <!-- <div style="height:calc(100vh - 50px);overflow-y:auto;display:inline-block;width:50%;"> -->
                    <!-- <div style="height:3000px;background:red;">bla</div> -->
                    <router-link
                      style="display:block;"
                      :to="`/dashboard/${item._id}`"
                      v-for="(item) in $options.filters.limitArray(items, form)"
                      :key="item._id"
                      class="activity-item"
                    >
                      <div class="name">{{item.name}}</div>
                      <div
                        style="min-height:36px;margin-top: 5px;width: 100%;color: #999999; padding: 0px 10px 0px 0px;"
                      >
                        <el-tag color="#f5f5f5" size="mini">{{item.type.name}}</el-tag>
                        <el-tag color="#f5f5f5" size="mini">{{item._id}}</el-tag>
                      </div>
                    </router-link>

                    <!-- </div> -->
                  </el-scrollbar>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="18">
            <el-scrollbar wrap-class="list" view-class="view-box" :native="false" class="colscrol">
              <!-- <div style="height:2000px;background:blue;">lllbla</div> -->
              <div
                style="background:white;display:flex;justify-content:center;align-items:center;min-height:100%;padding:20px;"
              >
                <router-view/>
              </div>
            </el-scrollbar>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { UserModule } from '@/store/modules/user';
import request from '../../utils/request';

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
export default class Dashboard extends Vue {
  categories = [];

  get subcategories() {
    if (!this.categories) return [];
    if (this.categories.length === 0) return [];

    let r = [];

    this.categories.forEach((a) => {
      r = [...r, ...a.subcategory];
    });

    return r;
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

  get domains() {
    const domains = {
      Learning: ['Plain', 'Facts', 'Questions'],
      Cognition: [
        'Categorization',
        'PhotoAssembly',
        'WhatsInThePicture',
        'MemoryCards',
        'WhatIsWrong',
        'Zoom',
        'SpotTheDifference',
        'ISee',
      ],
      Communication: [
        'Meaning',
        'WHQuestions',
        'GoodStory',
        'SoundOfLifePhoto',
      ],
    };
    return Object.keys(domains);
  }

  get types() {
    const domains = {
      Learning: ['Plain', 'Facts', 'Questions'],
      Cognition: [
        'Categorization',
        'PhotoAssembly',
        'WhatsInThePicture',
        'MemoryCards',
        'WhatIsWrong',
        'Zoom',
        'SpotTheDifference',
        'ISee',
      ],
      Communication: [
        'Meaning',
        'WHQuestions',
        'GoodStory',
        'SoundOfLifePhoto',
      ],
    };

    const list = [
      ...domains.Learning,
      ...domains.Cognition,
      ...domains.Communication,
    ];
    return list;
  }

  items = [];
  input21 = '';

  async beforeRouteEnter(to, from, next) {
    const res = await request({
      url: '/api/v1/activities',
      method: 'get',
      baseURL: '',
    });

    const res2 = await request({
      url: `/api/v1/categories`,
      method: 'get',
      baseURL: '',
    });

    next((vm) => {
      // debugger;this.items = r.activities;
      vm.items = (res as any).activities;

      vm.categories = (res2 as any).categories;
    });
  }

  constructor() {
    super();
  }

  // get name() {
  //   return UserModule.name;
  // }

  // get roles() {
  //   return UserModule.roles;
  // }
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
</style>
