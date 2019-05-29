<template>
  <div class="dashboard-container" style="position:relative">
    <el-row>
      <el-col :span="6">
        <el-row style>
          <el-col :span="24">
            <div
              style="font-size:13px;background:khaki;color:#444;font-weight:bold;padding:10px"
            >{{ items.length }} Activities Founds</div>
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
              <!-- -- as ! <div style="height:calc(100vh-50px);overflow-y:auto;display:inline-block;width:50%;">-- >
              -- as ! <div style="height:3000px;background:red;">bla</div>-->
              <router-link
                style="display:block;"
                :to="`/dashboard/articulations/${item._id}`"
                v-for="item in items"
                :key="item._id"
                class="activity-item"
              >
                <div class="name">{{ item.name }}</div>

                <div class="tags">
                  <span>{{ item.name }}</span>
                  <span>{{ item._id }}</span>
                </div>
              </router-link>

              <!--</div> -->
            </el-scrollbar>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="18">
        <el-scrollbar wrap-class="list" view-class="view-box" :native="false" class="colscrol">
          <!-- -- as ! < divstyle="height:2000px;background:blue;">lllbla</div> -->
          <div
            style="background:white;display:flex;justify-content:center;align-items:center;min-height:100%;padding:20px"
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
// import { UserModule } from '@/store/modules/user';
import request from '../../utils/request';
import { ActivitiesModule } from '../../store/activities.module';
import { DomainsModule } from '../../store/domains.module';
import { CategoriesModule } from '../../store/categories.module';
import { StripsModule } from '../../store/strips.module';
import { ArticulationsModule } from '../../store/articulations.module';
import { AppModule } from '../../store/app';
import { flatten } from 'lodash';

@Component({})
export default class Dashboard extends Vue {
  get items() {
    throw 'TODO items';
    // return ActivitiesModule.articulations;
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
  height: calc(100vh - 68px);

  &-first {
    height: calc(100vh - 108px);
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
