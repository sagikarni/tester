<template>
  <div class="dashboard-container" style="position:relative">
    <el-card shadow="always" style="margin-bottom:10px;">
      <el-row>
        <el-col :span="3">
          <h1>Activities</h1>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="$router.push('/dashboard/add')">New Activity</el-button>
        </el-col>
        <el-col :span="18" style="display:flex;">
          <el-select placeholder="All Domain" v-model="form.domain">
            <el-option label="All Domains" :value="null"/>
            <el-option v-for="domain in domains" :label="domain" :value="domain" :key="domain"/>
          </el-select>

          <el-select placeholder="Activity Type" v-model="form.type">
            <el-option label="All Types" :value="null"/>
            <el-option v-for="type in types" :label="type" :value="type" :key="type"/>
          </el-select>

          <el-select placeholder="Media" v-model="form.mediaType">
            <el-option label="All Media" :value="null"/>
            <el-option label="Video" value="Video"/>
            <el-option label="Photo" value="Photo"/>
          </el-select>

          <el-select placeholder="Category" v-model="form.category">
            <el-option label="All Categories" :value="null"/>
            <el-option
              :key="category.name"
              :label="category.name"
              :value="category.name"
              v-for="category in categories"
            ></el-option>
          </el-select>
          <el-select placeholder="Sub Category" v-model="form.subcategory">
            <el-option label="All Sub Categories" :value="null"/>
            <el-option
              :key="category._id"
              :label="category.name"
              :value="category.name"
              v-for="category in subcategories"
            ></el-option>
          </el-select>

          <el-select placeholder="Level" v-model="form.level">
            <el-option label="All Level" :value="null"/>
            <el-option label="Basic" value="Basic"/>
            <el-option label="Intermediate" value="Intermediate"/>
            <el-option label="Advanced" value="Advanced"/>
          </el-select>

          <el-select placeholder="Audience" v-model="form.audience">
            <el-option label="All Audience" :value="null"/>
            <el-option label="Kids" value="Kids"/>
            <el-option label="Elderly" value="Elderly"/>
          </el-select>

          <el-select placeholder="Status" v-model="form.status">
            <el-option label="All Status" :value="null"/>
            <el-option label="Not Started" value="NotStarted"/>
            <el-option label="Just Started" value="JustStarted"/>
            <el-option label="Almost Done" value="AlmostDone"/>
            <el-option label="Waiting Pronunciation" value="WaitingPronunciation"/>
            <el-option label="Reviewed" value="Reviewed"/>
            <el-option label="Ready" value="Ready"/>
            <el-option label="Published" value="Published"/>
          </el-select>

          <el-select placeholder="Printable" v-model="form.printable">
            <el-option label="All Printable" :value="null"/>
            <el-option label="Yes" :value="true"/>
            <el-option label="No" :value="false"/>
          </el-select>

          <el-select placeholder="License" v-model="form.free">
            <el-option label="All License" :value="null"/>
            <el-option label="Free" :value="true"/>
            <el-option label="Paid" :value="false"/>
          </el-select>

          <el-select placeholder="Editorial" v-model="form.editorial">
            <el-option label="All Editorial" :value="null"/>
            <el-option label="Yes" :value="true"/>
            <el-option label="No" :value="false"/>
          </el-select>
        </el-col>
      </el-row>
    </el-card>

    <div style="padding:5px 20px;">
      <div style>
        <el-row>
          <el-col :span="8">
            <div>
              <el-row style="box-shadow:-1px -1px 5px #ccc;">
                <el-col :span="24" style="padding:10px 20px;background:#F7F7F7">
                  <el-input
                    placeholder="Search by Name, Description, Image ID or Activity ID"
                    prefix-icon="el-icon-search"
                    v-model="form.text"
                    clearable
                  ></el-input>
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
                      <h5>{{item.name}}</h5>
                      <div>
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
          <el-col :span="16">
            <el-scrollbar wrap-class="list" view-class="view-box" :native="false" class="colscrol">
              <!-- <div style="height:2000px;background:blue;">lllbla</div> -->
              <div
                style="background:white;display:flex;justify-content:center;align-items:center;min-height:100%;"
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
      if (form.level) {
        f = f.filter((a) => a.level === form.level);
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
        f = f.filter(
          (a) => a._id.startsWith(form.text) || a.name.startsWith(form.text)
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
    level: null,
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
    background: #e7e8ec;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
.activity-item {
  padding: 10px 50px 10px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background: #eee;
}

.activity-item.router-link-active {
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.05), 0 -5px 5px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
}
.colscrol {
  height: calc(100vh - (160px));
  // width: 60%;
  // display: inline-block;

  &-first {
    height: calc(100vh - (220px));
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

h5 {
  color: #54626d;
  font-size: 17px;
  font-weight: 600;
  margin: 10px 0 20px;
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
