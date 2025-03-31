import { createAction } from '@reduxjs/toolkit';
import { Event } from '../types/types';


export const fetchEventsRequest = createAction('events/fetchEventsRequest');


export const fetchEventsSuccess = createAction<Event[]>('events/fetchEventsSuccess');


export const fetchEventsFailure = createAction<string>('events/fetchEventsFailure');


export const updateTimestamp = createAction<number>('events/updateTimestamp');
