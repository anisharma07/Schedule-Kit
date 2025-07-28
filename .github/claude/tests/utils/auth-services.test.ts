import {signUp, signIn, signOut, importData, exportData} from '../../src/utils/auth-services';
import {auth, firestore} from '../../src/firebaseConfig';

// Mock Firebase
jest.mock('../../src/firebaseConfig', () => ({
  auth: jest.fn(),
  firestore: jest.fn(),
}));

describe('auth-services', () => {
  const mockAuth = {
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  };

  const mockFirestore = {
    collection: jest.fn(),
    batch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (auth as jest.Mock).mockReturnValue(mockAuth);
    (firestore as jest.Mock).mockReturnValue(mockFirestore);
  });

  describe('signUp', () => {
    it('creates user successfully', async () => {
      const mockUser = {uid: '123', email: 'test@example.com'};
      mockAuth.createUserWithEmailAndPassword.mockResolvedValue({user: mockUser});

      const result = await signUp('test@example.com', 'password123');

      expect(mockAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      );
      expect(result).toEqual(mockUser);
    });

    it('throws error on failure', async () => {
      const error = new Error('Sign up failed');
      mockAuth.createUserWithEmailAndPassword.mockRejectedValue(error);

      await expect(signUp('test@example.com', 'weak')).rejects.toThrow('Sign up failed');
    });
  });

  describe('signIn', () => {
    it('signs in user successfully', async () => {
      const mockUser = {uid: '123', email: 'test@example.com'};
      mockAuth.signInWithEmailAndPassword.mockResolvedValue({user: mockUser});

      const result = await signIn('test@example.com', 'password123');

      expect(mockAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      );
      expect(result).toEqual(mockUser);
    });

    it('throws error on failure', async () => {
      const error = new Error('Sign in failed');
      mockAuth.signInWithEmailAndPassword.mockRejectedValue(error);

      await expect(signIn('test@example.com', 'wrong')).rejects.toThrow('Sign in failed');
    });
  });

  describe('signOut', () => {
    it('signs out user successfully', async () => {
      mockAuth.signOut.mockResolvedValue(undefined);

      await signOut();

      expect(mockAuth.signOut).toHaveBeenCalled();
    });

    it('throws error on failure', async () => {
      const error = new Error('Sign out failed');
      mockAuth.signOut.mockRejectedValue(error);

      await expect(signOut()).rejects.toThrow('Sign out failed');
    });
  });

  describe('importData', () => {
    it('imports data successfully', async () => {
      const mockBatch = {
        set: jest.fn(),
        commit: jest.fn().mockResolvedValue(undefined),
      };
      const mockDocRef = {id: 'doc1'};
      const mockCollection = {
        doc: jest.fn().mockReturnValue(mockDocRef),
      };

      mockFirestore.batch.mockReturnValue(mockBatch);
      mockFirestore.collection.mockReturnValue(mockCollection);

      const testData = [{name: 'Test 1'}, {name: 'Test 2'}];
      
      await importData('test-collection', testData);

      expect(mockFirestore.collection).toHaveBeenCalledWith('test-collection');
      expect(mockBatch.set).toHaveBeenCalledTimes(2);
      expect(mockBatch.commit).toHaveBeenCalled();
    });

    it('handles import error', async () => {
      const error = new Error('Import failed');
      mockFirestore.batch.mockImplementation(() => {
        throw error;
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await importData('test-collection', []);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error importing data:', error);
      
      consoleErrorSpy.mockRestore();
    });
  });

  describe('exportData', () => {
    it('exports data successfully', async () => {
      const mockDocs = [
        {id: 'doc1', data: () => ({name: 'Test 1'})},
        {id: 'doc2', data: () => ({name: 'Test 2'})},
      ];
      const mockSnapshot = {docs: mockDocs};
      const mockCollection = {
        get: jest.fn().mockResolvedValue(mockSnapshot),
      };

      mockFirestore.collection.mockReturnValue(mockCollection);

      const result = await exportData('test-collection');

      expect(mockFirestore.collection).toHaveBeenCalledWith('test-collection');
      expect(result).toEqual([
        {id: 'doc1', name: 'Test 1'},
        {id: 'doc2', name: 'Test 2'},
      ]);
    });

    it('handles export error', async () => {
      const error = new Error('Export failed');
      const mockCollection = {
        get: jest.fn().mockRejectedValue(error),
      };

      mockFirestore.collection.mockReturnValue(mockCollection);

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await exportData('test-collection');

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error exporting data:', error);
      expect(result).toBeUndefined();
      
      consoleErrorSpy.mockRestore();
    });
  });
});