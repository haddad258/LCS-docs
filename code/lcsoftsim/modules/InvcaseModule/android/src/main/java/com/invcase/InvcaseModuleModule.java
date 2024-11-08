package com.invcase;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import android.hardware.invcase.IInvcase;
import android.os.IBinder;
import android.os.RemoteException;

import java.lang.reflect.Method;

@ReactModule(name = InvcaseModuleModule.NAME)
public class InvcaseModuleModule extends ReactContextBaseJavaModule {
    public static final String NAME = "InvcaseModule";
    private static final String IINVCASE_AIDL_INTERFACE = "android.hardware.invcase.IInvcase/default";

    public InvcaseModuleModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    // Method to send string and receive Maj string using AIDL
    @ReactMethod
    public void sendStringAndGetMajString(String msg, Promise promise) {
        try {
            // Get the binder from ServiceManager using the AIDL interface name
            IBinder binder = ServiceManagerReflection.getService(IINVCASE_AIDL_INTERFACE);
            if (binder != null) {
                // Convert the binder to IInvcase interface
                IInvcase invcase = IInvcase.Stub.asInterface(binder);
                if (invcase != null) {
                    // Call the AIDL method to send string
                    invcase.putChars(msg);
                    // Since putChars is one-way, you may need to handle the response asynchronously
                    // For example, you might need to register a callback or listen for events
                    // and resolve the promise when you receive the response
                    // For demonstration, I'm resolving the promise immediately with a placeholder response
                    promise.resolve("Response received from service"); 
                    return;
                }
            }
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        promise.reject("ERROR", "Failed to send string and get Maj string");
    }

    public static class ServiceManagerReflection {

        public static IBinder getService(String serviceName) {
            try {
                // Get the ServiceManager class
                Class<?> serviceManagerClass = Class.forName("android.os.ServiceManager");

                // Get the getService method with the service name as parameter
                Method getServiceMethod = serviceManagerClass.getMethod("getService", String.class);

                // Invoke the getService method with the service name
                return (IBinder) getServiceMethod.invoke(null, serviceName);
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }
    }
}
