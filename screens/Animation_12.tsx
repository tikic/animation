import { StyleSheet, View, Text, SafeAreaView, Platform, Dimensions} from 'react-native'
import React, {useCallback} from 'react'
import { Feather } from '@expo/vector-icons';
import Animated, {useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler, withTiming, interpolate, Extrapolate} from 'react-native-reanimated';
import {GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const THRESHOLD = SCREEN_WIDTH / 3;

const Animation_12 = () => {
  const translateX = useSharedValue(0);


  const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {x: number}>({
    onStart: (event, context) => {
      context.x = translateX.value 
    },
    onActive: (event, context) => {
      translateX.value = Math.max(event.translationX + context.x, 0);
    },
    onEnd: () => {
      if(translateX.value <= THRESHOLD){
        translateX.value = withTiming(0)
      }else{
        translateX.value = withTiming(SCREEN_WIDTH / 2)
      }
    }
  })

  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [0, SCREEN_WIDTH / 2], [0, 3], Extrapolate.CLAMP);


    const borderRadius = interpolate(translateX.value, [0, SCREEN_WIDTH / 2], [0, 15], Extrapolate.CLAMP)

    return{
      borderRadius,
      transform: [
        {perspective: 100},
        {translateX: translateX.value},
        {rotateY: `-${rotate}deg`}
      ]
    }
  })


  const onPress = useCallback(() => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withTiming(SCREEN_WIDTH / 2);
    }
  }, []);

  return (
    <GestureHandlerRootView
    style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}
  >
    <SafeAreaView style={[styles.container, styles.safe]}>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={[{ backgroundColor: 'white', flex: 1 }, rStyle]}>
          <Feather
            name="menu"
            size={32}
            color={BACKGROUND_COLOR}
            style={{ margin: 15, position: 'absolute' }}
            onPress={onPress}
          />
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Animation_12



const BACKGROUND_COLOR = '#1e1e23';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  safe: {
    // workaround for the SafeAreaView in Android (use the react-native-safe-area-context package)
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
})