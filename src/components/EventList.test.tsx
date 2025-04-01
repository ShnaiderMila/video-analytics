import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EventList from './EventList';
import { updateTimestamp } from '../store/actions';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

const events = [
  {
    id: 1,
    timestamp: 3.012,
    duration: 1.5,
    zone: { left: 100, top: 100, width: 50, height: 50 },
  },
  {
    id: 2,
    timestamp: 65.123,
    duration: 2,
    zone: { left: 200, top: 200, width: 80, height: 80 },
  },
];

describe('EventList', () => {
  it('renders event list and handles clicks', () => {
    const store = mockStore({
      events: { events, currentTimestamp: 0 },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <EventList />
      </Provider>
    );

    expect(screen.getByText(/00:03:012/i)).toBeInTheDocument();
    expect(screen.getByText(/01:05:123/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/00:03:012/i));
    expect(store.dispatch).toHaveBeenCalledWith(updateTimestamp(3012));
  });
});
