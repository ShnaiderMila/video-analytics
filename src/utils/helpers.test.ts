import { formatTime } from './helpers'

describe('formatTime', () => {
  it('formats timestamp correctly', () => {
    expect(formatTime(0)).toBe('00:00:000');
    expect(formatTime(3.012)).toBe('00:03:012');
    expect(formatTime(65.123)).toBe('01:05:123');
    expect(formatTime(206.1)).toBe('03:26:100');
  });
});
