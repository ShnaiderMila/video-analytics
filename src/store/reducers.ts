import { createReducer } from '@reduxjs/toolkit';
import { fetchEventsSuccess, updateTimestamp } from './actions';
import { Event } from '../types/types';

interface EventsState {
  events: Event[];
  currentTimestamp: number;
}

const initialState: EventsState = {
  events: [],
  currentTimestamp: 0,
};

const eventsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchEventsSuccess, (state, action) => {
      state.events = action.payload;
    })
    .addCase(updateTimestamp, (state, action) => {
      state.currentTimestamp = action.payload;
    });
});

export default eventsReducer;
