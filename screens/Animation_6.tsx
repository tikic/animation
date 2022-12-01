import { StyleSheet, View, Text, Image, Dimensions,ImageBackground } from 'react-native'
import React, {useRef, useCallback} from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler'

const image = 'https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
const AnimatedImage = Animated.createAnimatedComponent(Image);

const Animation_6 = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);
  const doubleRef = useRef();

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value ,0) }],
  }));

  const rTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const singleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1));
      }
    });
  }, []);

  
  const doubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
    
      scale.value = withDelay(500, withSpring(0))
    })
  }, [])

  return (
    <View style={styles.container}>
  <TapGestureHandler 
      waitFor={doubleRef}
      onActivated={singleTap}>
      <TapGestureHandler 
        maxDelayMs={250}
        ref={doubleRef}
        numberOfTaps={2}
        onActivated={doubleTap}>
           <Animated.View>
            <ImageBackground
              source={{uri: image}}
              style={styles.image}
            >
              <AnimatedImage
                source={require('../assets/heart.png')}
                style={[
                  rStyle,
                  styles.image,
                  {
                    shadowOffset: { width: 0, height: 20 },
                    shadowOpacity: 0.35,
                    shadowRadius: 35,
                  },
                ]}
                resizeMode={'center'}
              />
            </ImageBackground>
            <Animated.Text style={[styles.turtles, rTextStyle]}>
              🐢🐢🐢🐢
            </Animated.Text>
          </Animated.View>
      </TapGestureHandler>
    </TapGestureHandler>
    </View>
  )
}

export default Animation_6


const { width: SIZE } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  turtles: { fontSize: 40, textAlign: 'center', marginTop: 30 },
})