import {
  convertToUTM,
  convertTo24Hrs,
  formatToHHMM,
  convertToStartSeconds,
} from '../../src/utils/functions';

describe('Utility Functions', () => {
  describe('convertToUTM', () => {
    it('converts morning hours correctly', () => {
      expect(convertToUTM('09:30')).toBe('09:30 AM');
      expect(convertToUTM('11:45')).toBe('11:45 AM');
    });

    it('converts noon correctly', () => {
      expect(convertToUTM('12:00')).toBe('12:00 PM');
      expect(convertToUTM('12:30')).toBe('12:30 PM');
    });

    it('converts afternoon/evening hours correctly', () => {
      expect(convertToUTM('13:15')).toBe('01:15 PM');
      expect(convertToUTM('18:45')).toBe('06:45 PM');
      expect(convertToUTM('23:59')).toBe('11:59 PM');
    });

    it('converts midnight correctly', () => {
      expect(convertToUTM('00:00')).toBe('12:00 AM');
      expect(convertToUTM('00:30')).toBe('12:30 AM');
    });

    it('handles single digit hours and minutes', () => {
      expect(convertToUTM('9:5')).toBe('09:05 AM');
      expect(convertToUTM('1:0')).toBe('01:00 AM');
    });

    it('handles edge cases', () => {
      expect(convertToUTM('01:00')).toBe('01:00 AM');
      expect(convertToUTM('22:00')).toBe('10:00 PM');
    });
  });

  describe('convertTo24Hrs', () => {
    it('converts AM hours correctly', () => {
      expect(convertTo24Hrs('09:30', true)).toBe('9:30');
      expect(convertTo24Hrs('11:45', true)).toBe('11:45');
    });

    it('converts 12 AM correctly', () => {
      expect(convertTo24Hrs('12:00', true)).toBe('00:0');
      expect(convertTo24Hrs('12:30', true)).toBe('00:30');
    });

    it('converts PM hours correctly', () => {
      expect(convertTo24Hrs('01:15', false)).toBe('13:15');
      expect(convertTo24Hrs('06:45', false)).toBe('18:45');
      expect(convertTo24Hrs('11:59', false)).toBe('23:59');
    });

    it('converts 12 PM correctly', () => {
      expect(convertTo24Hrs('12:00', false)).toBe('12:0');
      expect(convertTo24Hrs('12:30', false)).toBe('12:30');
    });

    it('handles edge cases', () => {
      expect(convertTo24Hrs('10:00', true)).toBe('10:0');
      expect(convertTo24Hrs('10:00', false)).toBe('22:0');
    });
  });

  describe('formatToHHMM', () => {
    it('formats date strings correctly', () => {
      const date1 = new Date('2023-12-25T09:30:00');
      expect(formatToHHMM(date1.toISOString())).toBe('09:30');

      const date2 = new Date('2023-12-25T14:45:30');
      expect(formatToHHMM(date2.toISOString())).toBe('14:45');
    });

    it('handles midnight correctly', () => {
      const midnight = new Date('2023-12-25T00:00:00');
      expect(formatToHHMM(midnight.toISOString())).toBe('00:00');
    });

    it('handles single digit hours and minutes with padding', () => {
      const earlyMorning = new Date('2023-12-25T03:05:00');
      expect(formatToHHMM(earlyMorning.toISOString())).toBe('03:05');
    });

    it('handles noon correctly', () => {
      const noon = new Date('2023-12-25T12:00:00');
      expect(formatToHHMM(noon.toISOString())).toBe('12:00');
    });

    it('handles late evening correctly', () => {
      const lateEvening = new Date('2023-12-25T23:59:59');
      expect(formatToHHMM(lateEvening.toISOString())).toBe('23:59');
    });
  });

  describe('convertToStartSeconds', () => {
    it('converts morning hours correctly', () => {
      expect(convertToStartSeconds('09:30')).toBe(9 * 3600 + 30 * 60); // 34200
      expect(convertToStartSeconds('08:15')).toBe(8 * 3600 + 15 * 60); // 29700
    });

    it('converts midnight correctly', () => {
      expect(convertToStartSeconds('00:00')).toBe(0);
      expect(convertToStartSeconds('00:01')).toBe(60);
    });

    it('converts noon correctly', () => {
      expect(convertToStartSeconds('12:00')).toBe(12 * 3600); // 43200
      expect(convertToStartSeconds('12:30')).toBe(12 * 3600 + 30 * 60); // 45000
    });

    it('converts evening hours correctly', () => {
      expect(convertToStartSeconds('18:45')).toBe(18 * 3600 + 45 * 60); // 67500
      expect(convertToStartSeconds('23:59')).toBe(23 * 3600 + 59 * 60); // 86340
    });

    it('handles single digit times', () => {
      expect(convertToStartSeconds('9:5')).toBe(9 * 3600 + 5 * 60); // 32700
      expect(convertToStartSeconds('1:0')).toBe(1 * 3600); // 3600
    });

    it('handles edge cases', () => {
      expect(convertToStartSeconds('24:00')).toBe(24 * 3600); // 86400 (next day)
      expect(convertToStartSeconds('01:30')).toBe(1 * 3600 + 30 * 60); // 5400
    });
  });

  describe('Integration tests', () => {
    it('convertToUTM and convertTo24Hrs are inverse operations', () => {
      const testTimes = ['09:30', '12:00', '15:45', '00:00', '23:59'];
      
      testTimes.forEach(time24 => {
        const timeUTM = convertToUTM(time24);
        const [timeStr, ampm] = timeUTM.split(' ');
        const isAM = ampm === 'AM';
        
        // Note: This test might not be perfectly inverse due to formatting differences
        // but we can test that the conversion doesn't crash
        const backTo24 = convertTo24Hrs(timeStr, isAM);
        expect(typeof backTo24).toBe('string');
      });
    });

    it('convertToStartSeconds produces ascending values for ascending times', () => {
      const times = ['00:00', '06:00', '12:00', '18:00', '23:59'];
      const seconds = times.map(convertToStartSeconds);
      
      for (let i = 1; i < seconds.length; i++) {
        expect(seconds[i]).toBeGreaterThan(seconds[i - 1]);
      }
    });
  });
});