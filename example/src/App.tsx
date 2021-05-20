import * as React from 'react';

import { Button, StyleSheet, View } from 'react-native';
import {
  OrientationHandler,
  setOrientationUpdateInterval,
  useOrientation,
} from 'react-native-sensible';

export default function App() {
  const [interval, setInterval] = React.useState(100);
  const [pause, setPause] = React.useState(true);
  const ref = React.useRef<View>(null);

  const handler: OrientationHandler = React.useCallback(({ yaw }) => {
    ref?.current?.setNativeProps({
      style: {
        transform: [{ rotateZ: yaw }],
      },
    });
  }, []);
  useOrientation(handler, { pause });

  return (
    <View style={styles.container}>
      <Button
        title="Increase interval"
        onPress={() => {
          setInterval((val) => val * 2);
          setOrientationUpdateInterval(interval);
        }}
      />
      <Button
        title={pause ? 'Start' : 'Pause'}
        onPress={() => setPause((v) => !v)}
      />
      <View
        ref={ref}
        style={{ width: 200, height: 200, backgroundColor: 'red' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
