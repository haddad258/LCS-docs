import AsyncStorage from '@react-native-async-storage/async-storage';

class TokenService {
    getLocalRefreshToken() {
      const user = JSON.parse(AsyncStorage.getItem("@Token_jwt"));
      return user;
    }
  async  getLocalAccessToken() {
      const user =  await AsyncStorage.getItem("@Token_jwt");
      
      return user;
    }
    updateLocalAccessToken(token) {
      let user = JSON.parse(AsyncStorage.getItem("@Token_jwt"));
      user.accessToken = token;
      AsyncStorage.setItem("@Token_jwt", JSON.stringify(user));
    }
    getUser() {
      return JSON.parse(AsyncStorage.getItem("@Token_jwt"));
    }
    setUser(user) {
      AsyncStorage.setItem("@Token_jwt", JSON.stringify(user));
    }
    removeUser() {
      AsyncStorage.removeItem("@Token_jwt");
    }
  }
  export default new TokenService();
  