<template>
  <v-card class="card" >
    <v-img
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2), rgba(0,0,0,.3)"
      :src="picture"
      :aspect-ratio="1.6"
      class="white--text"
    >
      <v-card-title class="fill-height">
        <div
          style="  position: absolute;  top: 0%;  left: 0%;"
        >
          <v-btn small flat dark icon large color="black" @click="goBack">
            <v-icon dark>keyboard_backspace</v-icon>
          </v-btn>
        </div>
        <div
          style="  position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);"
        >
          <router-link :to="url" class="play-btn" :class="`play-btn-${$vuetify.breakpoint.name}`"></router-link>
        </div>

        <div
          class="preview-overlay"
          :class="`${domain}-border border-left`"
          style="background: rgba(0,0,0,.5);flex:1;padding:6px 10px;"
        >
          <div class="caption">
            <div
              :class="{ 'subheading': $vuetify.breakpoint.smAndDown, 'headline':  $vuetify.breakpoint.mdAndUp }"
            >{{type}}</div>
            <v-icon :size="size" color="white">{{mediaType}}</v-icon>
            <div
              :class="{ 'headline': $vuetify.breakpoint.smAndDown, 'display-1':  $vuetify.breakpoint.mdAndUp }"
              style="font-weight:bold;"
            >{{name}}</div>
            <div
              :class="{ 'subheading': $vuetify.breakpoint.smAndDown, 'headline':  $vuetify.breakpoint.mdAndUp }"
              style="text-align:center;margin-top:5px;"
            >{{audience}}</div>
          </div>
        </div>

        <!-- <div style="display:flex;flex:1;">
          
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
        </div>-->
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

  get size() {
    if (this.$vuetify.breakpoint.smAndDown) {
      return 24;
    }

    return 36;
  }
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

  goBack() {
    window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
  }
}
</script>


<style lang="scss" scoped>
.card {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.15);
  border-radius: 0;
}

.v-card__title {
  padding: 0;
  box-sizing: border-box;
  align-items: flex-end;
}

.caption {
  display: grid;
  grid-template-columns: 1fr auto;
}

.border-left {
  border-left: 7px solid;
}

.play-btn-xs, .play-btn-sm  {
 width:70px;
 height:70px;
}
</style>
