import {signUp, signIn, signOut, importData, exportData} from '../../src/utils/auth-services';
import {auth, firestore} from '../../src/firebaseConfig';

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

const mockAuth = {
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
};

const mockFirestore = {
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({})),
    get: jest.fn(() => Promise.resolve({
      docs: [
        {
          id: '1',
          data: () => ({title: 'Test Data'}),
        },
      ],
    })),
  })),
  batch: jest.fn(() => ({
    set: jest.fn(),
    commit: jest.fn(() => Promise.resolve()),
  })),
};

describe('Auth Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (auth as jest.Mock).mockReturnValue(mockAuth);
    (firestore as jest.Mock).mockReturnValue(mockFirestore);
  });

  describe('signUp', () => {
    it('creates user with email and password', async () => {
      const mockUser = {uid: '123', email: 'test@example.com'};
      mockAuth.createUserWithEmailAndPassword.mockResolvedValue({user: mockUser});

      const result = await signUp('test@example.com', 'password123');

      expect(mockAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      );
      expect(result).toEqual(mockUser);
    });

    it('throws error when signup fails', async () => {
      const error = new Error('Signup failed');
      mockAuth.createUserWithEmailAndPassword.mockRejectedValue(error);

      await expect(signUp('test@example.com', 'password123')).rejects.toThrow('Signup failed');
    });
  });

  describe('signIn', () => {
    it('signs in user with email and password', async () => {
      const mockUser = {uid: '123', email: 'test@example.com'};
      mockAuth.signInWithEmailAndPassword.mockResolvedValue({user: mockUser});

      const result = await signIn('test@example.com', 'password123');

      expect(mockAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      );
      expect(result).toEqual(mockUser);
    });

    it('throws error when signin fails', async () => {
      const error = new Error('Invalid credentials');
      mockAuth.signInWithEmailAndPassword.mockRejectedValue(error);

      await expect(signIn('test@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
    });
  });

  describe('signOut', () => {
    it('signs out user successfully', async () => {
      mockAuth.signOut.mockResolvedValue(undefined);

      await signOut();

      expect(mockAuth.signOut).toHaveBeenCalled();
    });

    it('throws error when signout fails', async () => {
      const error = new Error('Signout failed');
      mockAuth.signOut.mockRejectedValue(error);

      await expect(signOut()).rejects.toThrow('Signout failed');
    });
  });

  describe('importData', () => {
    it('imports data to firestore collection', async () => {
      const testData = [{title: 'Test 1'}, {title: 'Test 2'}];
      const mockBatch = mockFirestore.batch();

      await importData('testCollection', testData);

      expect(mockFirestore.collection).toHaveBeenCalledWith('testCollection');
      expect(mockBatch.commit).toHaveBeenCalled();
    });

    it('handles import errors', async () => {
      const testData = [{title: 'Test 1'}];
      const error = new Error('Import failed');
      mockFirestore.batch().commit.mockRejectedValue(error);

      // Should not throw, but log error
      await importData('testCollection', testData);
    });
  });

  describe('exportData', () => {
    it('exports data from firestore collection', async () => {
      const result = await exportData('testCollection');

      expect(mockFirestore.collection).toHaveBeenCalledWith('testCollection');
      expect(result).toEqual([{id: '1', title: 'Test Data'}]);
    });

    it('handles export errors', async () => {
      const error = new Error('Export failed');
      mockFirestore.collection().get.mockRejectedValue(error);

      const result = await exportData('testCollection');

      expect(result).toBeUndefined();
    });
  });
});