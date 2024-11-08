package android.hardware.invcase;

import android.os.IBinder;

interface IInvcase {
    String getChars();
    void putChars(in String msg);
}
