<template>
  <v-card :width="width" class="card" :to="clickable && url">
    <v-img
      :src="picture"
      class="white--text"
      :height="height"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3), rgba(0,0,0,.7)"
    >
      <v-card-title class="fill-height">
        <div
          style="background: rgba(0,0,0,.3);flex:1;text-align:left;padding:5px 8px 5px 15px;position:relative;"
        >
          <div
            class="left-border"
            :class="domain"
            style="position: absolute;height:64px;width:7px;left:0px;top:0;"
          ></div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="font-size:14px;">{{type}}</div>
            <v-icon color="white">{{mediaType}}</v-icon>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="font-size:18px;font-weight:bold;">{{name}}</div>
            <div style="font-size:14px;">{{audience}}</div>
          </div>
        </div>
      </v-card-title>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import dasherize from 'dasherize';

@Component({})
export default class ActivitiyPreview extends Vue {
  @Prop() activity;

  @Prop() height;
  @Prop() width;
  @Prop({ default: true }) clickable;

  get picture() {
    return `/storage/${this.activity.type.domain.name}/${
      this.activity.type.name
    }/${this.activity._id}/cover-l.jpg`;
  }

  get type() {
    return this.activity.type.name;
  }

  get domain() {
    return this.activity.type.domain.name.toLocaleLowerCase();
  }
  
  get name() {
    return this.activity.name;
  }

  get audience() {
    return this.activity.audience;
  }

  get mediaType() {
    return this.activity.mediaType === 'Video' ? 'videocam' : 'photo';
  }

  get url() {
    return `/${this.domain}/${dasherize(this.type)}/${this.activity._id}`;
  }
}
</script>


<style lang="scss" scoped>
.card {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.15);
  // box-shadow:0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  // border-radius: 5px;
  &:hover {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transform: scale(1.01);
    //  box-shadow:0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
  }
}

.v-card__title {
  padding: 0;
  box-sizing: border-box;
  align-items: flex-end;
}
</style>
