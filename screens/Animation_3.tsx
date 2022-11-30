import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Animated, {useSharedValue, 
    useAnimatedStyle, 
    useAnimatedScrollHandler, 
    interpolate, 
    Extrapolate} from 'react-native-reanimated';

const WORDS = ["What's", 'up', 'mobile', 'devs?'];
const { height, width } = Dimensions.get('window');
const SIZE = width * 0.7;

interface PageProps {
    index: number;
    title: string;
    translateX: Animated.SharedValue<number>;

}

const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
    const inputRange = [(-index - 1) * width, index * width, (index + 1) * width];

    const rStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            translateX.value,
            inputRange,
            [0, 1, 0],
            Extrapolate.CLAMP
          );

          const borderRadius = interpolate(
            translateX.value,
            inputRange,
            [0, SIZE / 2, 0],
            Extrapolate.CLAMP
          );

        return {
            borderRadius,
            transform: [
                {scale}
            ]
        }
    })

    const tStyle = useAnimatedStyle(() => {
        const translateY = interpolate(translateX.value, inputRange, [height / 2, 0, -height / 2], Extrapolate.CLAMP)
        const opacity = interpolate(translateX.value, inputRange, [-2,1,-2], Extrapolate.CLAMP)

        return {
            opacity,
            transform: [
                {
                    translateY
                }
            ],
            
        }
    })


    return (
      <View
        style={[
          styles.pageContainer,
          { backgroundColor: `rgba(0,0,256, 0.${index + 2})` },
        ]}
      >
        <Animated.View style={[styles.square, rStyle]} />
        <Animated.View style={[styles.textContainer, tStyle]}>
          <Text style={styles.text}>{title}</Text>
        </Animated.View>
      </View>
    );
  };


const Animation_3 = () => {
    const translateX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x
    })



  return (
    <Animated.ScrollView
        onScroll={scrollHandler}
        pagingEnabled
        scrollEventThrottle={16}
        horizontal
        style={styles.container}
  >
    {WORDS.map((title, index) => {
      return (
        <Page
          key={index.toString()}
          title={title}
          index={index}
          translateX={translateX}
        />
      );
    })}
  </Animated.ScrollView>
  )
}

export default Animation_3

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
  pageContainer: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.4)',
  },
  text: {
    fontSize: 60,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  textContainer: { position: 'absolute' },
})