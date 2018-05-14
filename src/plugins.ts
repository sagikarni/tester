import Vue from 'vue';
import {locale, isRTL} from '@/locale';

// export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
export function LocalePlugin(Vue1: typeof Vue, options?: any): void {
    Vue1.prototype.$locale = locale;
}


// export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
export function DirectionPlugin(Vue1: typeof Vue, options?: any): void {
    Vue1.prototype.$isRTL = isRTL;
}
