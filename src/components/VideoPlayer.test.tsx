import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

describe('VideoPlayer', () => {
  it('calls onTimeUpdate on video time update', () => {
    const store = mockStore({
      events: { currentTimestamp: 0 },
    });

    const mockTimeUpdate = jest.fn();

    const videoRef = {
      current: {
        currentTime: 0,
        paused: true,
        play: jest.fn(),
        pause: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };

    const { container } = render(
      <Provider store={store}>
        <VideoPlayer videoRef={videoRef as any} onTimeUpdate={mockTimeUpdate} />
      </Provider>
    );

    const video = container.querySelector('video')!;
    fireEvent.timeUpdate(video);
    expect(mockTimeUpdate).toHaveBeenCalled();
  });
});
