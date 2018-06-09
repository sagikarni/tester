import device from 'current-device';
import { DeviceOrientation } from '@/modules/store/typeEnums';

export default class OrientationUtil {

    private device?: any;
    private orientation?: number;

    constructor() {
        this.device = device.noConflict();

        this.device.onChangeOrientation((cb: string) => {
            // cb is a landscape or portrait
            this.checkOrientation(cb);
        });
        this.checkOrientation(this.device.orientation);
    }

    public getOrientation() {
        this.checkOrientation(this.device.orientation);
        return this.orientation;
    }

    private checkOrientation(orientation: string) {
        if (orientation === 'landscape') {
            this.orientation = DeviceOrientation.Landscape;
        } else {
            this.orientation = DeviceOrientation.Portrait;
        }
    }
}
