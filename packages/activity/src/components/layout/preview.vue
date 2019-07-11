<template>
  <v-card class="card card-preview" :to="url">
    <v-img
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2), rgba(0,0,0,.3)"
      :src="picture"
      :aspect-ratio="1.6"
      class="white--text"
    >
      <v-card-title class="fill-height" style="position:relative;">
        <div style="position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);">
          <div class="play" :class="`play-btn-${$vuetify.breakpoint.name}`">
            <svg
              class="SVGInline-svg css-1pqru7x-svg"
              style="width: 100%;height: 100%;"
              viewBox="0 0 72 72"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Play</title>
              <g fill="none" fill-rule="evenodd">
                <circle fill="#FFF" cx="36" cy="36" r="36" />
                <path fill="#111" d="M28 47V25l22 11z" />
              </g>
            </svg>
            <div class="play-pulse"></div>
          </div>
        </div>
        <!-- <div
          style="  position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);"
        >
          
          <router-link  class="play-btn" :class="`play-btn-${$vuetify.breakpoint.name}`"></router-link>
        </div>-->

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
.play {
  width: 81px;
  height: 81px;
}

// .play-btn-xs,
// .play-btn-sm {
//   width: 70px;
//   height: 70px;
// }
</style>
