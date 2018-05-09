import { AsyncStorage } from 'react-native';

const saveToken = async (saveToken) => {
    await AsyncStorage.setItem('@token',saveToken)
};
export default saveToken;