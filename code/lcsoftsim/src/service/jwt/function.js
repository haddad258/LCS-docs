
import AsyncStorage from '@react-native-async-storage/async-storage';

// export function setToken(name, value, minute) {
//     var expires = "";
//     if (minute) {
//       var date = new Date();
//       expires =
//         "; expires=" +
//         new Date(date.setMinutes(date.getMinutes() + minute)).toUTCString();
//     }
//     document.storage = name + "=" + (value || "") + expires + "; path=/";
//   }
  
//   export function getstorage(name) {
//     var nameEQ = name + "=";
//     var ca = document.storage.split(";");
//     for (var i = 0; i < ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) === " ") c = c.substring(1, c.length);
//       if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//     }
//     return null;
//   }
  
//   export function erasestorage(name) {
//     document.storage = name + "=; Path=/; Expires=Thu, 01 Jan 2025 00:00:01 GMT;";
//   }
  export   function  gettoken (){
     var token =  AsyncStorage.getItem('@Token_jwt')
    return token
  }