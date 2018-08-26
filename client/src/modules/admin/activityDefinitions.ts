
import {ActivityType} from '@/modules/activities/store/types';

export class ActivityDefinition {
    public isSlidebased: boolean| undefined;

}

export class SlideBaseActivityDefinition extends ActivityDefinition {
    public numberOfMediaInSlide: number| undefined;
}
