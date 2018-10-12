import device from 'current-device';
import { DeviceOrientation } from '@/modules/store/typeEnums';

export default class OrientationUtil {

    private device?: any;
    private orientation?: number;
    private isMobile?: boolean;

    constructor() {
        this.device = device.noConflict();

        this.device.onChangeOrientation((cb: string) => {
            // cb is a landscape or portrait
            this.checkOrientation(cb);
        });
        this.checkOrientation(this.device.orientation);
        this.isMobile = this.isMobileDevice();
    }

    public getOrientation() {
        this.checkOrientation(this.device.orientation);
        return this.orientation;
    }

    public isMobileDevice() {
        if (this.device && this.device.type !== 'desktop') {
            return true;
        } else {
            return false;
        }
    }

    private checkOrientation(orientation: string) {
        if (orientation === 'landscape') {
            this.orientation = DeviceOrientation.Landscape;
        } else {
            this.orientation = DeviceOrientation.Portrait;
        }
    }
}
