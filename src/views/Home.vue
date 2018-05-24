<template>
    <activity-details></activity-details>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActivityDetails from '@/modules/activities/components/activityDetails.vue';

@Component({
  components: {
      ActivityDetails,
  },
})
export default class Home extends Vue {}
</script>
