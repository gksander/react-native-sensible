import { NativeModules, NativeEventEmitter } from 'react-native';

type SensibleOrientation = {
  isAvailable: boolean;
  startUpdates: () => Promise<boolean>;
  stopUpdates: () => Promise<boolean>;
  getData: () => Promise<{
    qx: number;
    qy: number;
    qz: number;
    qw: number;
    pitch: number;
    roll: number;
    yaw: number;
  }>;
  setUpdateInterval: (interval: number) => void;
};

const { RNSensibleOrientation } = NativeModules;

export const OrientationEventEmitter = new NativeEventEmitter(
  RNSensibleOrientation
);

export const Orientation = RNSensibleOrientation as SensibleOrientation;
