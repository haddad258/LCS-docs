/*
 * This file is auto-generated.  DO NOT MODIFY.
 */
package android.hardware.invcase;
public interface IInvcase extends android.os.IInterface
{
  /** Default implementation for IInvcase. */
  public static class Default implements android.hardware.invcase.IInvcase
  {
    @Override public java.lang.String getChars() throws android.os.RemoteException
    {
      return null;
    }
    @Override public void putChars(java.lang.String msg) throws android.os.RemoteException
    {
    }
    @Override
    public android.os.IBinder asBinder() {
      return null;
    }
  }
  /** Local-side IPC implementation stub class. */
  public static abstract class Stub extends android.os.Binder implements android.hardware.invcase.IInvcase
  {
    /** Construct the stub at attach it to the interface. */
    public Stub()
    {
      this.attachInterface(this, DESCRIPTOR);
    }
    /**
     * Cast an IBinder object into an android.hardware.invcase.IInvcase interface,
     * generating a proxy if needed.
     */
    public static android.hardware.invcase.IInvcase asInterface(android.os.IBinder obj)
    {
      if ((obj==null)) {
        return null;
      }
      android.os.IInterface iin = obj.queryLocalInterface(DESCRIPTOR);
      if (((iin!=null)&&(iin instanceof android.hardware.invcase.IInvcase))) {
        return ((android.hardware.invcase.IInvcase)iin);
      }
      return new android.hardware.invcase.IInvcase.Stub.Proxy(obj);
    }
    @Override public android.os.IBinder asBinder()
    {
      return this;
    }
    @Override public boolean onTransact(int code, android.os.Parcel data, android.os.Parcel reply, int flags) throws android.os.RemoteException
    {
      java.lang.String descriptor = DESCRIPTOR;
      if (code >= android.os.IBinder.FIRST_CALL_TRANSACTION && code <= android.os.IBinder.LAST_CALL_TRANSACTION) {
        data.enforceInterface(descriptor);
      }
      switch (code)
      {
        case INTERFACE_TRANSACTION:
        {
          reply.writeString(descriptor);
          return true;
        }
      }
      switch (code)
      {
        case TRANSACTION_getChars:
        {
          java.lang.String _result = this.getChars();
          reply.writeNoException();
          reply.writeString(_result);
          break;
        }
        case TRANSACTION_putChars:
        {
          java.lang.String _arg0;
          _arg0 = data.readString();
          this.putChars(_arg0);
          reply.writeNoException();
          break;
        }
        default:
        {
          return super.onTransact(code, data, reply, flags);
        }
      }
      return true;
    }
    private static class Proxy implements android.hardware.invcase.IInvcase
    {
      private android.os.IBinder mRemote;
      Proxy(android.os.IBinder remote)
      {
        mRemote = remote;
      }
      @Override public android.os.IBinder asBinder()
      {
        return mRemote;
      }
      public java.lang.String getInterfaceDescriptor()
      {
        return DESCRIPTOR;
      }
      @Override public java.lang.String getChars() throws android.os.RemoteException
      {
        android.os.Parcel _data = android.os.Parcel.obtain();
        android.os.Parcel _reply = android.os.Parcel.obtain();
        java.lang.String _result;
        try {
          _data.writeInterfaceToken(DESCRIPTOR);
          boolean _status = mRemote.transact(Stub.TRANSACTION_getChars, _data, _reply, 0);
          _reply.readException();
          _result = _reply.readString();
        }
        finally {
          _reply.recycle();
          _data.recycle();
        }
        return _result;
      }
      @Override public void putChars(java.lang.String msg) throws android.os.RemoteException
      {
        android.os.Parcel _data = android.os.Parcel.obtain();
        android.os.Parcel _reply = android.os.Parcel.obtain();
        try {
          _data.writeInterfaceToken(DESCRIPTOR);
          _data.writeString(msg);
          boolean _status = mRemote.transact(Stub.TRANSACTION_putChars, _data, _reply, 0);
          _reply.readException();
        }
        finally {
          _reply.recycle();
          _data.recycle();
        }
      }
    }
    static final int TRANSACTION_getChars = (android.os.IBinder.FIRST_CALL_TRANSACTION + 0);
    static final int TRANSACTION_putChars = (android.os.IBinder.FIRST_CALL_TRANSACTION + 1);
  }
  public static final java.lang.String DESCRIPTOR = "android.hardware.invcase.IInvcase";
  public java.lang.String getChars() throws android.os.RemoteException;
  public void putChars(java.lang.String msg) throws android.os.RemoteException;
}
