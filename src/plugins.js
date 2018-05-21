import { locale, isRTL } from '@/locale';
// export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
export function LocalePlugin(Vue1, options) {
    Vue1.prototype.$locale = locale;
}
// export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
export function DirectionPlugin(Vue1, options) {
    Vue1.prototype.$isRTL = isRTL;
}
//# sourceMappingURL=plugins.js.map