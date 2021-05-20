import CoreMotion;

/**
 Orientation Module
 */
@objc(RNSensibleOrientation)
class RNSensibleOrientation: RCTEventEmitter {
	private let motionManager = CMMotionManager()

	@objc
	override static func requiresMainQueueSetup() -> Bool {
		return true
	}
  
  /**
   Events that we can dispatch
   */
  override func supportedEvents() -> [String]! {
    return ["onData"]
  }
  
  override init() {
    motionManager.deviceMotionUpdateInterval = 0.1;
  }
  
  /**
   Export availablitiy of device motion as Orientation.isAvailable
   */
  override func constantsToExport() -> [AnyHashable : Any]! {
    return ["isAvailable": motionManager.isDeviceMotionAvailable]
  }
  
  /**
   Expose ability to update interval
   */
  @objc
  func setUpdateInterval(_ interval: Double) {
    motionManager.deviceMotionUpdateInterval = interval / 1000;
  }
  
  /**
   Once we start observing this emitter (e.g., first listener is registered), start motion updates.
   */
  override func startObserving() {
    super.startObserving()
    
    if (!motionManager.isDeviceMotionAvailable || motionManager.isDeviceMotionActive) { return }
    
    motionManager.startDeviceMotionUpdates(to: OperationQueue.main) { [weak self] (motion, error) in
      if let sSelf = self, let attitude = motion?.attitude {
        let qx = attitude.quaternion.x,
            qy = attitude.quaternion.y,
            qz = attitude.quaternion.z,
            qw = attitude.quaternion.w,
            pitch = attitude.pitch,
            roll = attitude.roll,
            yaw = attitude.yaw;
        
        sSelf.sendEvent(withName: "onData", body: ["qx": qx, "qy": qy, "qz": qz, "qw": qw, "pitch": pitch, "roll": roll, "yaw": yaw]);
      }
    }
  }
  
  /**
   Once last event listener is removed, stop motion updates.
   */
  override func stopObserving() {
    super.stopObserving()
    
    if motionManager.isDeviceMotionActive {
      motionManager.stopDeviceMotionUpdates();
    }
  }
}
