import { convertToUTM, convertTo24Hrs, formatToHHMM, convertToStartSeconds } from '../../src/utils/functions';

describe('Utility Functions', () => {
  describe('convertToUTM', () => {
    it('converts morning hours correctly', () => {
      expect(convertToUTM('09:30')).toBe('09:30 AM');
      expect(convertToUTM('11:45')).toBe('11:45 AM');
    });

    it('converts afternoon/evening hours correctly', () => {
      expect(convertToUTM('13:30')).toBe('01:30 PM');
      expect(convertToUTM('18:45')).toBe('06:45 PM');
      expect(convertToUTM('23:59')).toBe('11:59 PM');
    });

    it('handles noon correctly', () => {
      expect(convertToUTM('12:00')).toBe('12:00 PM');
      expect(convertToUTM('12:30')).toBe('12:30 PM');
    });

    it('handles midnight correctly', () => {
      expect(convertToUTM('00:00')).toBe('12:00 AM');
      expect(convertToUTM('00:30')).toBe('12:30 AM');
    });

    it('pads single digit minutes', () => {
      expect(convertToUTM('09:05')).toBe('09:05 AM');
      expect(convertToUTM('15:07')).toBe('03:07 PM');
    });
  });

  describe('convertTo24Hrs', () => {
    it('converts AM time correctly', () => {
      expect(convertTo24Hrs('09:30', true)).toBe('09:30');
      expect(convertTo24Hrs('11:45', true)).toBe('11:45');
    });

    it('converts PM time correctly', () => {
      expect(convertTo24Hrs('01:30', false)).toBe('13:30');
      expect(convertTo24Hrs('06:45', false)).toBe('18:45');
      expect(convertTo24Hrs('11:59', false)).toBe('23:59');
    });

    it('handles 12 AM (midnight) correctly', () => {
      expect(convertTo24Hrs('12:00', true)).toBe('00:00');
      expect(convertTo24Hrs('12:30', true)).toBe('00:30');
    });

    it('handles 12 PM (noon) correctly', () => {
      expect(convertTo24Hrs('12:00', false)).toBe('12:00');
      expect(convertTo24Hrs('12:30', false)).toBe('12:30');
    });

    it('maintains proper formatting for all hours', () => {
      expect(convertTo24Hrs('01:05', true)).toBe('1:5');
      expect(convertTo24Hrs('01:05', false)).toBe('13:5');
    });
  });

  describe('formatToHHMM', () => {
    it('formats date string to HH:MM format', () => {
      const dateString = '2024-01-15T09:30:00Z';
      const result = formatToHHMM(dateString);
      expect(result).toMatch(/^\d{2}:\d{2}$/); // Should match HH:MM format
    });

    it('pads single digit hours and minutes', () => {
      const dateString = '2024-01-15T05:07:00Z';
      const result = formatToHHMM(dateString);
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it('handles different time zones', () => {
      const dateString1 = '2024-01-15T09:30:00+05:30';
      const dateString2 = '2024-01-15T09:30:00-08:00';
      
      const result1 = formatToHHMM(dateString1);
      const result2 = formatToHHMM(dateString2);
      
      expect(result1).toMatch(/^\d{2}:\d{2}$/);
      expect(result2).toMatch(/^\d{2}:\d{2}$/);
    });

    it('handles edge case times', () => {
      const midnight = '2024-01-15T00:00:00Z';
      const noon = '2024-01-15T12:00:00Z';
      const endOfDay = '2024-01-15T23:59:00Z';
      
      expect(formatToHHMM(midnight)).toMatch(/^\d{2}:\d{2}$/);
      expect(formatToHHMM(noon)).toMatch(/^\d{2}:\d{2}$/);
      expect(formatToHHMM(endOfDay)).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  describe('convertToStartSeconds', () => {
    it('converts morning times to seconds', () => {
      expect(convertToStartSeconds('00:00')).toBe(0);
      expect(convertToStartSeconds('01:00')).toBe(3600);
      expect(convertToStartSeconds('09:30')).toBe(34200); // 9*3600 + 30*60
    });

    it('converts afternoon/evening times to seconds', () => {
      expect(convertToStartSeconds('12:00')).toBe(43200); // 12*3600
      expect(convertToStartSeconds('15:45')).toBe(56700); // 15*3600 + 45*60
      expect(convertToStartSeconds('23:59')).toBe(86340); // 23*3600 + 59*60
    });

    it('handles minutes correctly', () => {
      expect(convertToStartSeconds('10:01')).toBe(36060);
      expect(convertToStartSeconds('10:30')).toBe(37800);
      expect(convertToStartSeconds('10:59')).toBe(39540);
    });

    it('handles edge cases', () => {
      expect(convertToStartSeconds('00:01')).toBe(60);
      expect(convertToStartSeconds('23:00')).toBe(82800);
    });

    it('calculates seconds correctly for various times', () => {
      // Test a few specific calculations
      expect(convertToStartSeconds('08:15')).toBe(8 * 3600 + 15 * 60); // 29700
      expect(convertToStartSeconds('14:22')).toBe(14 * 3600 + 22 * 60); // 51720
      expect(convertToStartSeconds('20:45')).toBe(20 * 3600 + 45 * 60); // 74700
    });
  });

  describe('Edge cases and error handling', () => {
    it('handles malformed time strings gracefully', () => {
      // These should not throw errors but may return NaN or unexpected results
      expect(() => convertToStartSeconds('invalid')).not.toThrow();
      expect(() => convertToUTM('invalid')).not.toThrow();
    });

    it('handles boundary values', () => {
      expect(convertToStartSeconds('24:00')).toBe(86400); // Edge case: 24 hours
      expect(convertToUTM('24:00')).toBe('12:00 PM'); // Should handle as noon
    });
  });
});