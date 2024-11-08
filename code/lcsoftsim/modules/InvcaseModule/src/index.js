const { NativeModules, Platform } = require('react-native');

const LINKING_ERROR =
  `The package 'com.invcase' doesn't seem to be linked. Make sure: \n\n` +
  (Platform.OS === 'ios' ? "- You have run 'pod install'\n" : '') +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const InvcaseModule = NativeModules.InvcaseModule
  ? NativeModules.InvcaseModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

function PutcharsINVCASE(a) {
  return InvcaseModule.sendStringAndGetMajString(a)
    .then(majString => {
      console.log('Received major string PutcharsINVCASE:', majString);
      // Assuming you want to return the length of the major string
      return majString.length;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error; // Re-throwing error to propagate it further
    });
}

module.exports = {
  PutcharsINVCASE
};
