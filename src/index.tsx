import { NativeModules } from 'react-native';

type SensibleType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Sensible } = NativeModules;

export default Sensible as SensibleType;
