import {convertToUTM, convertTo24Hrs, formatToHHMM, convertToStartSeconds} from '../../src/utils/functions';

describe('Utility Functions', () => {
  describe('convertToUTM', () => {
    it('converts 24-hour format to 12-hour AM format', () => {
      expect(convertToUTM('09:30')).toBe('09:30 AM');
      expect(convertToUTM('00:00')).toBe('12:00 AM');
      expect(convertToUTM('01:15')).toBe('01:15 AM');
    });

    it('converts 24-hour format to 12-hour PM format', () => {
      expect(convertToUTM('13:30')).toBe('01:30 PM');
      expect(convertToUTM('23:59')).toBe('11:59 PM');
      expect(convertToUTM('12:00')).toBe('12:00 PM');
    });

    it('handles edge cases', () => {
      expect(convertToUTM('12:30')).toBe('12:30 PM');
      expect(convertToUTM('00:30')).toBe('12:30 AM');
    });

    it('pads single digit minutes', () => {
      expect(convertToUTM('09:05')).toBe('09:05 AM');
      expect(convertToUTM('15:07')).toBe('03:07 PM');
    });
  });

  describe('convertTo24Hrs', () => {
    it('converts AM times correctly', () => {
      expect(convertTo24Hrs('09:30', true)).toBe('9:30');
      expect(convertTo24Hrs('12:00', true)).toBe('00:30'); // 12 AM = 00
      expect(convertTo24Hrs('01:15', true)).toBe('1:15');
    });

    it('converts PM times correctly', () => {
      expect(convertTo24Hrs('01:30', false)).toBe('13:30');
      expect(convertTo24Hrs('11:59', false)).toBe('23:59');
      expect(convertTo24Hrs('12:00', false)).toBe('12:0'); // 12 PM = 12
    });

    it('handles edge cases', () => {
      expect(convertTo24Hrs('12:30', true)).toBe('00:30'); // 12:30 AM
      expect(convertTo24Hrs('12:30', false)).toBe('12:30'); // 12:30 PM
    });
  });

  describe('formatToHHMM', () => {
    it('formats date string to HH:MM', () => {
      const date = '2023-12-25T14:30:00Z';
      const result = formatToHHMM(date);
      // Result depends on timezone, but should be in HH:MM format
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it('pads single digit hours and minutes', () => {
      // Mock Date constructor for consistent testing
      const originalDate = global.Date;
      global.Date = jest.fn(() => ({
        getHours: () => 9,
        getMinutes: () => 5,
      })) as any;

      const result = formatToHHMM('2023-12-25T09:05:00Z');
      expect(result).toBe('09:05');

      global.Date = originalDate;
    });
  });

  describe('convertToStartSeconds', () => {
    it('converts time to seconds from start of day', () => {
      expect(convertToStartSeconds('00:00')).toBe(0);
      expect(convertToStartSeconds('01:00')).toBe(3600); // 1 hour = 3600 seconds
      expect(convertToStartSeconds('00:30')).toBe(1800); // 30 minutes = 1800 seconds
      expect(convertToStartSeconds('12:30')).toBe(45000); // 12.5 hours = 45000 seconds
    });

    it('handles complex times', () => {
      expect(convertToStartSeconds('23:59')).toBe(86340); // 23:59 = 86340 seconds
      expect(convertToStartSeconds('02:15')).toBe(8100); // 2:15 = 8100 seconds
    });

    it('handles edge cases', () => {
      expect(convertToStartSeconds('24:00')).toBe(86400); // 24 hours = 86400 seconds
      expect(convertToStartSeconds('00:01')).toBe(60); // 1 minute = 60 seconds
    });
  });
});