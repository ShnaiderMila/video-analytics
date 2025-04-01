import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EventMarker from './EventMarker';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

const events = [
  {
    id: 1,
    timestamp: 1,
    duration: 2,
    zone: { left: 100, top: 100, width: 50, height: 50 },
  },
  {
    id: 2,
    timestamp: 4,
    duration: 2,
    zone: { left: 200, top: 200, width: 60, height: 60 },
  },
];

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('EventMarker', () => {
  it('renders active events as rectangles', () => {
    const store = mockStore({
      events: { currentTimestamp: 1500 },
    });

    const videoRef = {
      current: {
        getBoundingClientRect: () => ({
          width: 1000,
          height: 500,
          top: 0,
          left: 0,
        }),
        videoWidth: 1000,
        videoHeight: 500,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };

    const { container } = render(
      <Provider store={store}>
        <EventMarker videoRef={videoRef as any} events={events} />
      </Provider>
    );

    const rectangles = container.querySelectorAll('div[style*="position: absolute"]');
    expect(rectangles.length).toBeGreaterThan(0);
  });
});
