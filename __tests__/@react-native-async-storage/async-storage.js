import AsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

beforeEach(() => {
    AsyncStorage.clear();
});

it('can read asyncstorage', async () => {

    await AsyncStorage.setItem('username', 'testUser')
    let usernameValue = await AsyncStorage.getItem('username')
    expect(usernameValue).toBe('testUser')
});