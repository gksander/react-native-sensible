#import <React/RCTBridgeModule.h>
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(RNSensibleOrientation, RCTEventEmitter)
// Set update interval
RCT_EXTERN_METHOD(setUpdateInterval:(double)interval)
@end
