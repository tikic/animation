import { StyleSheet, View } from 'react-native'
import React from 'react'
import Animated, {useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler} from 'react-native-reanimated';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';

const SIZE = 90;
const CIRCLE_RADIUS = SIZE * 2;

type ContextType = {
  translateX: number;
  translateY: number;
};

const Animation_2 = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
        transform: [
          {translateX: translateX.value},
          {translateY: translateY.value}
        ]
    };
  }, []);

  
  const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (event, contex) => {
        contex.translateX = translateX.value;
        contex.translateY = translateY.value;
    },
    onActive: (event, contex) => {
      translateX.value = event.translationX + contex.translateX;
      translateY.value = event.translationY + contex.translateY;
    },
    onEnd: (event) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);


      if(distance < CIRCLE_RADIUS + SIZE / 2){
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  })

  return (
    <View style={styles.container}>
        <View style={styles.circle}>
          <PanGestureHandler onGestureEvent={panGestureHandler}>
            <Animated.View style={[styles.squere, reanimatedStyle]} />
            </PanGestureHandler>
        </View>
    </View>
  )
}

export default Animation_2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squere: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, .5)',
    borderRadius: 20
  }, 
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 256, 0.5)',
  },
})