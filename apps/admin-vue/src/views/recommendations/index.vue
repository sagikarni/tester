<template>
  <el-scrollbar wrap-class="list" view-class="view-box" :native="false" class="colscrol">
    <div class="dashboard-container" style="position:relative;padding:20px;">
      <div class="box-card" v-for="collection in collections" :key="collection._id">
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item label="Collection name">
            <el-input :disabled="!collection.new" v-model="collection.name"></el-input>
          </el-form-item>

          <el-form-item v-for="item in collection.items" :key="item._id">
            <el-form-item label="List name" style="border:1px solid #ddd;padding:20px">
              <el-input v-model="item.name"></el-input>

              <el-form-item label="Activities">
                <ActivityTags v-model="item.activities"/>
              </el-form-item>
              <el-button
                @click="removeList(collection.items, item)"
                type="text"
              >Delete {{ item.name }} list</el-button>
            </el-form-item>
          </el-form-item>

          <el-form-item>
            <el-button
              @click="addList(collection.items)"
              type="text"
            >Add new {{ collection.name }} list</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-button @click="addCollection" type="text">Add New Collection</el-button>
      <br>
      <el-button @click="save" type="primary">Save All</el-button>
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { UserModule } from '@/store/modules/user';
import { ActivitiesModule } from '../../store/modules/activities';
import { ActivityCollectionModule } from '../../store/modules/activities-collection';
import { CategoryModule } from '../../store/modules/category';
import { DomainModule } from '../../store/modules/domains';
import { Message, MessageBox } from 'element-ui';
import ActivityTags from './activity-tags.vue';

@Component({
  components: { ActivityTags },
})
export default class Recommendations extends Vue {
  get collections() {
    return ActivityCollectionModule.collection;
  }

  public form = { name: '' };

  constructor() {
    super();
  }

  public async save() {
    console.log('submit!', this.collections);

    const collections = this.collections.map((c) => ({
      ...c,
      new: c.new ? false : true,
    }));

    await ActivityCollectionModule.save(collections);

    Message({
      message: 'saved',
      type: 'success',
      duration: 5 * 1000,
    });
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
</style>
