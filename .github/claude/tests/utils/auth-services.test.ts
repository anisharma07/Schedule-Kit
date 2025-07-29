import { signUp, signIn, signOut, importData, exportData } from '../../src/utils/auth-services';
import { auth, firestore } from '../../src/firebaseConfig';

// Mock Firebase
jest.mock('../../src/firebaseConfig', () => ({
  auth: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  })),
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({})),
      get: jest.fn(),
    })),
    batch: jest.fn(() => ({
      set: jest.fn(),
      commit: jest.fn(),
    })),
  })),
}));

const mockAuth = auth as jest.MockedFunction<typeof auth>;
const mockFirestore = firestore as jest.MockedFunction<typeof firestore>;

describe('Auth Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('creates a new user successfully', async () => {
      const mockUser = { uid: 'test-uid', email: 'test@example.com' };
      const mockCreateUser = jest.fn().mockResolvedValue({ user: mockUser });
      
      mockAuth.mockReturnValue({
        createUserWithEmailAndPassword: mockCreateUser,
      } as any);

      const result = await signUp('test@example.com', 'password123');
      
      expect(mockCreateUser).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(result).toEqual(mockUser);
    });

    it('throws error when signup fails', async () => {
      const mockError = new Error('Signup failed');
      const mockCreateUser = jest.fn().mockRejectedValue(mockError);
      
      mockAuth.mockReturnValue({
        createUserWithEmailAndPassword: mockCreateUser,
      } as any);

      await expect(signUp('test@example.com', 'password123')).rejects.toThrow('Signup failed');
    });
  });

  describe('signIn', () => {
    it('signs in user successfully', async () => {
      const mockUser = { uid: 'test-uid', email: 'test@example.com' };
      const mockSignIn = jest.fn().mockResolvedValue({ user: mockUser });
      
      mockAuth.mockReturnValue({
        signInWithEmailAndPassword: mockSignIn,
      } as any);

      const result = await signIn('test@example.com', 'password123');
      
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(result).toEqual(mockUser);
    });

    it('throws error when signin fails', async () => {
      const mockError = new Error('Invalid credentials');
      const mockSignIn = jest.fn().mockRejectedValue(mockError);
      
      mockAuth.mockReturnValue({
        signInWithEmailAndPassword: mockSignIn,
      } as any);

      await expect(signIn('test@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
    });
  });

  describe('signOut', () => {
    it('signs out user successfully', async () => {
      const mockSignOut = jest.fn().mockResolvedValue(undefined);
      
      mockAuth.mockReturnValue({
        signOut: mockSignOut,
      } as any);

      await signOut();
      
      expect(mockSignOut).toHaveBeenCalled();
    });

    it('throws error when signout fails', async () => {
      const mockError = new Error('Signout failed');
      const mockSignOut = jest.fn().mockRejectedValue(mockError);
      
      mockAuth.mockReturnValue({
        signOut: mockSignOut,
      } as any);

      await expect(signOut()).rejects.toThrow('Signout failed');
    });
  });

  describe('importData', () => {
    it('imports data successfully', async () => {
      const mockBatch = {
        set: jest.fn(),
        commit: jest.fn().mockResolvedValue(undefined),
      };
      const mockDoc = jest.fn().mockReturnValue({});
      const mockCollection = jest.fn().mockReturnValue({ doc: mockDoc });
      
      mockFirestore.mockReturnValue({
        collection: mockCollection,
        batch: jest.fn().mockReturnValue(mockBatch),
      } as any);

      const testData = [
        { name: 'Test 1', value: 'Value 1' },
        { name: 'Test 2', value: 'Value 2' },
      ];

      console.log = jest.fn(); // Mock console.log

      await importData('testCollection', testData);
      
      expect(mockCollection).toHaveBeenCalledWith('testCollection');
      expect(mockBatch.set).toHaveBeenCalledTimes(2);
      expect(mockBatch.commit).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Data imported successfully!');
    });

    it('handles import errors', async () => {
      const mockError = new Error('Import failed');
      const mockBatch = {
        set: jest.fn(),
        commit: jest.fn().mockRejectedValue(mockError),
      };
      
      mockFirestore.mockReturnValue({
        collection: jest.fn().mockReturnValue({ doc: jest.fn() }),
        batch: jest.fn().mockReturnValue(mockBatch),
      } as any);

      console.error = jest.fn(); // Mock console.error

      await importData('testCollection', [{ test: 'data' }]);
      
      expect(console.error).toHaveBeenCalledWith('Error importing data:', mockError);
    });
  });

  describe('exportData', () => {
    it('exports data successfully', async () => {
      const mockData = [
        { id: 'doc1', name: 'Test 1' },
        { id: 'doc2', name: 'Test 2' },
      ];
      
      const mockDocs = [
        { id: 'doc1', data: () => ({ name: 'Test 1' }) },
        { id: 'doc2', data: () => ({ name: 'Test 2' }) },
      ];
      
      const mockGet = jest.fn().mockResolvedValue({ docs: mockDocs });
      const mockCollection = jest.fn().mockReturnValue({ get: mockGet });
      
      mockFirestore.mockReturnValue({
        collection: mockCollection,
      } as any);

      console.log = jest.fn(); // Mock console.log

      const result = await exportData('testCollection');
      
      expect(mockCollection).toHaveBeenCalledWith('testCollection');
      expect(mockGet).toHaveBeenCalled();
      expect(result).toEqual(mockData);
      expect(console.log).toHaveBeenCalledWith('Data exported successfully:', mockData);
    });

    it('handles export errors', async () => {
      const mockError = new Error('Export failed');
      const mockGet = jest.fn().mockRejectedValue(mockError);
      
      mockFirestore.mockReturnValue({
        collection: jest.fn().mockReturnValue({ get: mockGet }),
      } as any);

      console.error = jest.fn(); // Mock console.error

      const result = await exportData('testCollection');
      
      expect(result).toBeUndefined();
      expect(console.error).toHaveBeenCalledWith('Error exporting data:', mockError);
    });
  });
});