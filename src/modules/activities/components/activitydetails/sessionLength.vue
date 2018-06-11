<template>

    <div v-if="sessionLengthInfo && sessionLengthInfo.length > 0 ">
        <v-btn large color="primary" :to="`/premium-collection/${activityId}`" class="lets_start">{{ $locale.activities.sessionsInfo.startText }}</v-btn>

        <v-expansion-panel expand v-if="!$vuetify.breakpoint.xsOnly">
            <v-expansion-panel-content>
                <div slot="header">{{ $locale.general.sessionLengthText }}</div>
                <v-card class="ex-session-card">
                    <v-card-text>
                        <v-container fluid>
                            <v-radio-group v-model="sessionLength" mandatory row>
                                <v-radio class="ex-session-radio" v-for="infoItem in sessionLengthInfo" :key="infoItem.id" flat :value="infoItem.description" @change="sessionInfoIdChanged(infoItem)"
                                         :label="`${infoItem.description} Session  ${infoItem.slidesCount}  ${$locale.general.slidesText}`">
                                </v-radio>
                            </v-radio-group>

                        </v-container>

                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>

</template>


<script lang="ts">
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {SessionsInfo } from '../../store/types';

    @Component
    export default class SessionLength extends BaseComponent {

        public sessionLength: string = 'Long';

        @Prop() public sessionLengthInfo?: SessionsInfo[];
        @Prop() public sessionSelectedItem?: string;
        @Prop() public activityId?: string;

        constructor() {
            super();
        }

        @Watch('sessionSelectedItem')
        public onPropertyChanged(value: any, oldValue: any) {
            this.sessionLength = value;
        }

        public sessionInfoIdChanged(sessionInfo: any) {
              this.$emit('sessionInfoIdChanged', sessionInfo);
        }

        public created() {
            if (this.sessionSelectedItem) {
                this.sessionLength = this.sessionSelectedItem;
            }
        }
    }
</script>

<style>
    .ex-session-info .expansion-panel__header{
        justify-content: center;
    }
    .ex-session-info .expansion-panel__header div {
        flex: initial;
    }
    .ex-session-info .expansion-panel__header .header__icon{
        margin-left: unset;
    }
    .ex-session-info .expansion-panel {
        box-shadow: none;
    }
    .ex-session-info  .theme--light .expansion-panel .expansion-panel__container {
        background-color: unset!important;
    }
    .ex-session-info  .ex-session-card.card {
        background-color: unset!important;
    }
    .ex-session-info  .ex-session-card .card__text{
        padding: 0;
    }
    .ex-session-info .expansion-panel__container.expansion-panel__container--active {
        background-color: unset!important;
    }
    .ex-session-info .expansion-panel__container {
        background-color: unset!important;
    }
    .ex-session-info  .theme--light .expansion-panel .expansion-panel__container {
        background-color: unset!important;
    }
    .ex-session-info .expansion-panel__body {
        background-color: unset!important;
    }
    .ex-session-info  .input-group__input label{
        font-size: 14px;
        color:rgba(0,0,0,.80)!important;
        line-height: 24px;
    }
    .ex-session-info .input-group__input {
        flex: 0 1 65%;
    }
    .ex-session-info .input-group.radio-group{
        justify-content: center;
    }
</style>
