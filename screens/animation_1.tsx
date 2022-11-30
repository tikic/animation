import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import Animated, {useSharedValue, useAnimatedStyle, withTiming, withSpring, withRepeat} from 'react-native-reanimated';

const SIZE = 100.0;

const handleRotate = (progress:Animated.SharedValue<number>) => {
  'worklet';

  return `${progress.value * 2 * Math.PI}rad`;
}

const animation_1 = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2)

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [
        { scale: scale.value },
        {rotate: handleRotate(progress)}],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true);
  }, [])

  return (
    <View style={styles.container}>
        <Animated.View style={[
          { height: SIZE, width: SIZE, backgroundColor: 'blue' },
          reanimatedStyle,
        ]} >
        </Animated.View>
    </View>
  )
}

export default animation_1

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})