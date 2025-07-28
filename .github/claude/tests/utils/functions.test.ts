import {convertToUTM, convertTo24Hrs, formatToHHMM, convertToStartSeconds} from '../../src/utils/functions';

describe('Time Utility Functions', () => {
  describe('convertToUTM', () => {
    it('converts morning hours correctly', () => {
      expect(convertToUTM('09:30')).toBe('09:30 AM');
      expect(convertToUTM('11:45')).toBe('11:45 AM');
    });

    it('converts afternoon hours correctly', () => {
      expect(convertToUTM('13:30')).toBe('01:30 PM');
      expect(convertToUTM('15:45')).toBe('03:45 PM');
    });

    it('converts midnight correctly', () => {
      expect(convertToUTM('00:00')).toBe('12:00 AM');
      expect(convertToUTM('00:30')).toBe('12:30 AM');
    });

    it('converts noon correctly', () => {
      expect(convertToUTM('12:00')).toBe('12:00 PM');
      expect(convertToUTM('12:30')).toBe('12:30 PM');
    });

    it('converts evening hours correctly', () => {
      expect(convertToUTM('20:15')).toBe('08:15 PM');
      expect(convertToUTM('23:59')).toBe('11:59 PM');
    });

    it('pads single digit minutes', () => {
      expect(convertToUTM('09:05')).toBe('09:05 AM');
      expect(convertToUTM('15:07')).toBe('03:07 PM');
    });
  });

  describe('convertTo24Hrs', () => {
    it('converts AM hours correctly', () => {
      expect(convertTo24Hrs('09:30', true)).toBe('9:30');
      expect(convertTo24Hrs('11:45', true)).toBe('11:45');
    });

    it('converts PM hours correctly', () => {
      expect(convertTo24Hrs('01:30', false)).toBe('13:30');
      expect(convertTo24Hrs('03:45', false)).toBe('15:45');
    });

    it('converts 12 AM to 00', () => {
      expect(convertTo24Hrs('12:00', true)).toBe('00:00');
      expect(convertTo24Hrs('12:30', true)).toBe('00:30');
    });

    it('converts 12 PM correctly', () => {
      expect(convertTo24Hrs('12:00', false)).toBe('12:00');
      expect(convertTo24Hrs('12:30', false)).toBe('12:30');
    });

    it('handles edge cases', () => {
      expect(convertTo24Hrs('01:00', true)).toBe('1:00');
      expect(convertTo24Hrs('11:59', false)).toBe('23:59');
    });
  });

  describe('formatToHHMM', () => {
    it('formats date string to HH:MM', () => {
      const dateString = '2024-01-15T09:30:00.000Z';
      const result = formatToHHMM(dateString);
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it('pads single digit hours and minutes', () => {
      const date = new Date(2024, 0, 15, 9, 5);
      const result = formatToHHMM(date.toISOString());
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it('handles midnight', () => {
      const date = new Date(2024, 0, 15, 0, 0);
      const result = formatToHHMM(date.toISOString());
      expect(result).toMatch(/^00:00$/);
    });

    it('handles noon', () => {
      const date = new Date(2024, 0, 15, 12, 0);
      const result = formatToHHMM(date.toISOString());
      expect(result).toMatch(/^12:00$/);
    });

    it('handles late evening', () => {
      const date = new Date(2024, 0, 15, 23, 59);
      const result = formatToHHMM(date.toISOString());
      expect(result).toMatch(/^23:59$/);
    });
  });

  describe('convertToStartSeconds', () => {
    it('converts hours and minutes to seconds', () => {
      expect(convertToStartSeconds('01:00')).toBe(3600); // 1 hour
      expect(convertToStartSeconds('00:30')).toBe(1800); // 30 minutes
      expect(convertToStartSeconds('00:01')).toBe(60); // 1 minute
    });

    it('handles midnight', () => {
      expect(convertToStartSeconds('00:00')).toBe(0);
    });

    it('handles complex times', () => {
      expect(convertToStartSeconds('01:30')).toBe(5400); // 1 hour 30 minutes
      expect(convertToStartSeconds('12:45')).toBe(45900); // 12 hours 45 minutes
    });

    it('handles maximum time', () => {
      expect(convertToStartSeconds('23:59')).toBe(86340); // 23 hours 59 minutes
    });

    it('handles double digit hours', () => {
      expect(convertToStartSeconds('10:15')).toBe(36900); // 10 hours 15 minutes
      expect(convertToStartSeconds('15:30')).toBe(55800); // 15 hours 30 minutes
    });
  });

  describe('Edge Cases', () => {
    it('handles invalid input gracefully', () => {
      expect(() => convertToUTM('invalid')).not.toThrow();
      expect(() => convertTo24Hrs('invalid', true)).not.toThrow();
      expect(() => convertToStartSeconds('invalid')).not.toThrow();
    });

    it('handles empty strings', () => {
      expect(() => convertToUTM('')).not.toThrow();
      expect(() => convertTo24Hrs('', true)).not.toThrow();
      expect(() => convertToStartSeconds('')).not.toThrow();
    });
  });
});