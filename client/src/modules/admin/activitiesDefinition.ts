import {ActivityType} from '@/modules/activities/store/types';
import {ActivityDefinition, SlideBaseActivityDefinition} from '@/modules/admin/activityDefinitions';
import * as Collections from 'typescript-collections';

// Meaning
export const activitiesDefinition  = new Collections.Dictionary<ActivityType, SlideBaseActivityDefinition>();
activitiesDefinition.setValue(ActivityType.Meaning, {
    isSlidebased: true,
    numberOfMediaInSlide: 1,
});

// WhatInThePicture
activitiesDefinition.setValue(ActivityType.WhatInThePicture, {
    isSlidebased: true,
    numberOfMediaInSlide: 1,
});

// SpotTheDifference
activitiesDefinition.setValue(ActivityType.SpotTheDifference, {
    isSlidebased: true,
    numberOfMediaInSlide: 4,
});
