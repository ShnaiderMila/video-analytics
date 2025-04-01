import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchEventsRequest,
  fetchEventsSuccess,
  fetchEventsFailure,
} from './actions';
import { Event } from '../types/types';

function fetchEventsApi(): Promise<any[]> {
  return fetch('/events.json').then((res) => res.json());
}

function* fetchEventsSaga() {
  try {
    const data: any[] = yield call(fetchEventsApi);
    const events: Event[] = data.map((event: any) => ({
      id: Math.random(),
      timestamp: event.timestamp,
      duration: event.duration ?? 0,
      zone: event.zone,
    }));
    yield put(fetchEventsSuccess(events));
  } catch (error: any) {
    yield put(fetchEventsFailure(error.message));
  }
}

export function* rootSaga() {
  yield takeLatest(fetchEventsRequest.type, fetchEventsSaga);
}
