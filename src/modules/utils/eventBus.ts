import Vue from 'vue';

export const bus = new Vue();

export const busConstants = {
    ENTER_FULL_SCREEN : "ENTER_FULL_SCREEN",
    EXIT_FULL_SCREEN : "EXIT_FULL_SCREEN",
};
