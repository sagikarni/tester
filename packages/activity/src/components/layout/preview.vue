<template>
  <v-card class="card" :to="url">
    <v-img 
    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2), rgba(0,0,0,.3)"
    :src="picture" :aspect-ratio="1.6" class="white--text">
      <v-card-title class="fill-height">
        <div
          style="  position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);"
        >
          <v-icon color="white" size="13vh">play_circle_outline</v-icon>
        </div>
        <div style="display:flex;flex:1;">
          <div :class="domain" style="width:10px;"></div>
          <div
            style="background: rgba(0,0,0,.5);display:flex;flex-direction:row;flex:1;text-align:left;padding:10px 20px;position:relative;justify-content:space-between;"
          >
            <div style="display:flex;margin-bottom:3px;flex-direction:column;">
              <div class="headline">{{type}}</div>
              <div class="display-1 font-weight-bold">{{name}}</div>
            </div>
            <div style="display:flex;align-items:center;flex-direction:column;">
              <v-icon color="white" large style="margin-bottom:4px;">{{mediaType}}</v-icon>
              <div class="headline">{{audience}}</div>
            </div>
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
export default class Preview extends Vue {
  @Prop() activity;

  @Prop() height;
  @Prop() width;
  @Prop({ default: true }) clickable;

  get picture() {
    return `/storage/${this.activity.type.domain.name}/${this.activity.type.name}/${this.activity._id}/cover-l.jpg`;
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
    return `/${this.domain}/${dasherize(this.type)}/${this.activity._id}/start`;
  }
}
</script>


<style lang="scss" scoped>
.card {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.15);
}

.v-card__title {
  padding: 0;
  box-sizing: border-box;
  align-items: flex-end;
}
</style>
