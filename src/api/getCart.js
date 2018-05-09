import { AsyncStorage } from 'react-native';

const getCart = async () =>{
    try {
        const value = await AsyncStorage.getItem('@cart');
        if (value !== null){
          // We have data!!
          return JSON.parse(value);
        }
        else return [];
      } catch (error) {
        // Error retrieving data
      }      
};
export default getCart;