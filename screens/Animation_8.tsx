import { StyleSheet, View, Text, Dimensions } from 'react-native'
import React, {useCallback} from 'react';
import {LinearGradient, LinearGradientProps} from 'expo-linear-gradient'
import Animated, {useSharedValue, useAnimatedStyle, useAnimatedGestureHandler,withTiming, withSpring, useDerivedValue, interpolate, interpolateColor} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent, TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { TapGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/tapGesture';

const COLORS = [
    'red',
    'purple',
    'blue',
    'cyan',
    'green',
    'yellow',
    'orange',
    'black',
    'white',
];
  
  const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';
  
  const { width } = Dimensions.get('window');
  
  const CIRCLE_SIZE = width * 0.8;
  const PICKER_WIDTH = width * 0.9;
  const CIRCLE_PICKER_SIZE = 45;
  const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;

  type ContextType = {
    x: number;
  };
  

interface ColorPickerProps extends LinearGradientProps{
    maxWidth: number;
    onColorChanged?: (color: string | number) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({colors, start, end, style, maxWidth, onColorChanged}) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
  
    const adjustedTranslateX = useDerivedValue(() => {
      return Math.min(
        Math.max(translateX.value, 0),
        maxWidth - CIRCLE_PICKER_SIZE
      );
    });
  
    const onEnd = useCallback(() => {
      'worklet';
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    }, []);
  
    const panGestureEvent = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      { x: number }
    >({
      onStart: (_, context) => {
        context.x = adjustedTranslateX.value;
      },
      onActive: (event, context) => {
        translateX.value = event.translationX + context.x;
      },
      onEnd,
    });
  
    const tapGestureEvent =
      useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
        onStart: (event) => {
          translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
          scale.value = withSpring(1.2);
          translateX.value = withTiming(event.absoluteX - CIRCLE_PICKER_SIZE);
        },
        onEnd,
      });
  
    const rStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: adjustedTranslateX.value },
          { scale: scale.value },
          { translateY: translateY.value },
        ],
      };
    });
  
    const rInternalPickerStyle = useAnimatedStyle(() => {
      const inputRange = colors.map(
        (_, index) => (index / colors.length) * maxWidth
      );
  
      const backgroundColor = interpolateColor(
        translateX.value,
        inputRange,
        colors
      );
  
      onColorChanged?.(backgroundColor);
  
      return {
        backgroundColor,
      };
    });
  
    return (
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={{ justifyContent: 'center' }}>
              <LinearGradient
                colors={colors}
                start={start}
                end={end}
                style={style}
              />
              <Animated.View style={[styles.picker, rStyle]}>
                <Animated.View
                  style={[styles.internalPicker, rInternalPickerStyle]}
                />
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    );

} 

/////////// MAIN /////////////////

const Animation_8 = () => {
    const pickedColor = useSharedValue<string | number>(COLORS[0]);

    const onColorChanged = useCallback((color: string | number) => {
        'worklet';
        pickedColor.value = color;
      }, []);

    const rStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: pickedColor.value
        }
    })

  return (
    <>
    <View style={styles.topContainer}>
    <Animated.View style={[styles.circle, rStyle]} />
    </View>
    <View style={styles.bottomContainer}>
        <ColorPicker 
            maxWidth={PICKER_WIDTH}
            colors={COLORS}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}
            onColorChanged={onColorChanged}
        />
        </View>
    </>

  )
}

export default Animation_8

const styles = StyleSheet.create({
    topContainer: {
        flex: 3,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
      },
    bottomContainer:{
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gradient: { height: 40, width: PICKER_WIDTH, borderRadius: 20 },
    picker: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: CIRCLE_PICKER_SIZE,
        height: CIRCLE_PICKER_SIZE,
        borderRadius: CIRCLE_PICKER_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center',
      },
      internalPicker: {
        width: INTERNAL_PICKER_SIZE,
        height: INTERNAL_PICKER_SIZE,
        borderRadius: INTERNAL_PICKER_SIZE / 2,
        borderWidth: 1.0,
        borderColor: 'rgba(0,0,0,0.2)',
      },
      circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
      },
})