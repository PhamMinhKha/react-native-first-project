import { AsyncStorage } from 'react-native';

const getToken = async () =>{
    try {
        const value = await AsyncStorage.getItem('@token');
        console.log('0000000000000000000000000000000');
        console.log(value);
        console.log('0000000000000000000000000000000');
        return value;
        // if (value !== null){
        //   return value;
        // }
        // else return [];
      } catch (error) {
          console.log('====================================');
          console.log('error token');
          console.log('====================================');
        // Error retrieving data
      }      
};
export default getToken;