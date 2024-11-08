
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNInvcaseModuleSpec.h"

@interface InvcaseModule : NSObject <NativeInvcaseModuleSpec>
#else
#import <React/RCTBridgeModule.h>

@interface InvcaseModule : NSObject <RCTBridgeModule>
#endif

@end
