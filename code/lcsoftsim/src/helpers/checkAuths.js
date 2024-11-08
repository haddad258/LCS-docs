import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to check user authentication based on local storage
export const checkUserAuthentication = async () => {
  try {
    // Retrieve user authentication information from local storage
    const userToken = await AsyncStorage.getItem('@Token_jwt');
    

    // Check if the userToken exists (you might have other conditions)
    return !!userToken;
  } catch (error) {
    console.error('Error checking user authentication:', error);
    return false; // Assume not authenticated in case of an error
  }
};
