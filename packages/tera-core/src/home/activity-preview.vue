<template>
  <v-card :width="width" :height="height" class="card" :to="url">
    <v-img
      :src="picture"
      class="white--text"
      :aspect-ratio="1.5"
      height="100%"
    >
    <!-- gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3), rgba(0,0,0,.7)" -->
      <v-card-title class="fill-height">
        <div class="preview-overlay" :class="`${domain}-border border-left`">
          <div class="caption" >
            <div style="font-size:13px;">{{type}}</div>
            <v-icon size="18" color="white">{{mediaType}}</v-icon>
            <div style="font-size:15px;font-weight:bold;">{{name}}</div>
            <div style="font-size:13px;text-align:center;">{{audience}}</div>
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
    return `/storage/${this.activity.type.domain.name}/${this.activity.type.name}/${this.activity._id}/cover-s.jpg`;
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
  transition: all 3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition: background 0.5s ease;
  border-radius: 0;

  &:hover {
    .preview-overlay {
      // transform: scale(1.01);

      background: rgba(0, 0, 0, 0.5);
    }
  }
}

.v-card__title {
  padding: 0;
  box-sizing: border-box;
  align-items: flex-end;
}

.preview-overlay {
  background: rgba(0, 0, 0, 0.3);
  flex: 1;
  text-align: left;
  padding: 2px 7px 1px 8px;
  position: relative;
  // transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition: background 0.5s ease;
}

.caption {
  display: grid;
  grid-template-columns: 1fr auto;
}

.border-left {border-left:7px solid;}
</style>
