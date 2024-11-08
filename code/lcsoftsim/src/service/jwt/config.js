import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function GetConfig() {
    try {
        let result = await AsyncStorage.getItem('@Token_jwt')
        if (result.errors) {
            return null;
        }
        return {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "x-access-token",
                "x-access-token": result,
                'Authorization': 'Bearer ' + result
            },
        };
    } catch (error) {
        return null;
    }
};
