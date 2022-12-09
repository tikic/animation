import { StyleSheet, View , Text} from 'react-native'
import React, {useEffect} from 'react'
import Animated, {useSharedValue, useAnimatedStyle, withSpring, withRepeat, 
    useDerivedValue,
withTiming, Easing} from 'react-native-reanimated';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';

const N = 12;
const SQUARE_SIZE = 12


interface SquereProps {
    index : number
    progress: Animated.SharedValue<number>
}


const Square: React.FC<SquereProps> = ({index, progress}) => {
        const offsetAngle = (2 * Math.PI) / N;
        const finalAngle = offsetAngle * (N - 1 - index);

        const rotate = useDerivedValue(() => {
            if (progress.value <= 2 * Math.PI) {
              return Math.min(finalAngle, progress.value);
            }
            if (progress.value - 2 * Math.PI < finalAngle) {
              return finalAngle;
            }
        
            return progress.value;
          }, []);
        
          const translateY = useDerivedValue(() => {
            if (rotate.value === finalAngle) {
              return withSpring(-N * SQUARE_SIZE);
            }
        
            if (progress.value > 2 * Math.PI) {
              return withTiming((index - N) * SQUARE_SIZE);
            }
        
            return withTiming(-index * SQUARE_SIZE);
          });
        
          const rStyle = useAnimatedStyle(() => {
            return {
              transform: [
                { rotate: `${rotate.value}rad` },
                { translateY: translateY.value },
              ],
            };
          });

        return(
            <Animated.View
            style={[
              {
                height: SQUARE_SIZE,
                aspectRatio: 1,
                backgroundColor: 'white',
                //   opacity: (index + 1) / N,
                position: 'absolute',
              },
              rStyle,
            ]}
          />
                )
}


const Animation_14 = () => {
    const progress = useSharedValue(0);

    useEffect(() => {
      progress.value = withRepeat(
        withTiming(4 * Math.PI, {
          duration: 8000,
          easing: Easing.linear,
        }),
        -1
      );
    }, []);

  return (
    <View style={styles.container}>
       {new Array(N).fill(0).map((_, index) => {
        return <Square key={index} progress={progress} index={index} />
      })}
    </View>
  )
}

export default Animation_14

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
})