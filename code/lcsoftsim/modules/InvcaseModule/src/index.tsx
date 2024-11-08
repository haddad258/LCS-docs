import { NativeModules, Platform } from 'react-native';

interface InvcaseModuleInterface {
  sendStringAndGetMajString(arg: string): Promise<string>;
}

const LINKING_ERROR =
  `The package 'com.invcase' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const InvcaseModule: InvcaseModuleInterface = NativeModules.InvcaseModule
  ? NativeModules.InvcaseModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function PutcharsINVCASE(a: string): Promise<number> {
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
