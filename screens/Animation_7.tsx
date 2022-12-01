import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import React, {useRef, useCallback} from 'react'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useAnimatedGestureHandler, useSharedValue, useDerivedValue, cancelAnimation, withTiming, withDecay } from 'react-native-reanimated';

const titles = ["What's", 'up', 'mobile', 'devs?'];
const {width : PAGE_WIDTH} = Dimensions.get('window')

interface PageProps {
    index : number;
    title: string;
    translateX: Animated.SharedValue<number>
}

type Context = {
    x: number
}

const Page: React.FC<PageProps> = ({title, index, translateX}) => {

    const pageOffset = PAGE_WIDTH * index

    const rStyle = useAnimatedStyle(() => {
            return{
                transform: [
                    {translateX: translateX.value + pageOffset}
                ]
            }
    })


    return(
        <Animated.View key={index} style={[
            {...StyleSheet.absoluteFillObject, 
             backgroundColor: `rgba(0, 0, 256, 0.${index + 2})`,
            alignItems: 'center',
            justifyContent: 'center'
            }, 
             rStyle]}>
            <Text style={{
                fontSize: 70,
                fontWeight: '700',
                letterSpacing: .3,
                textTransform: 'uppercase',
                color: 'white'
            }}>{title}</Text>
        </Animated.View>
    )
}


const Animation_7 = () => {
    const translateX = useSharedValue(0);

    const clampedTranslateX = useDerivedValue(() => {

        const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1)    
        return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X)
 })

    const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, Context>({
        onStart: (_ , context) => {
            context.x = clampedTranslateX.value 
        },
        onActive: (event, context) => {
            translateX.value = event.translationX +  context.x;
            cancelAnimation(translateX)
        },
        onEnd: (event) => {
            translateX.value = withDecay({velocity: event.velocityX})
        },
    })

  

  return (
    <View style={styles.container}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
            <Animated.View style={{flex: 1, flexDirection: 'row'}}>
                 {titles.map((item, index) => <Page 
                 key={index}
                 title={item} 
                 translateX={clampedTranslateX}
                 index={index} />)}
            </Animated.View>
        </PanGestureHandler>
   
    </View>
  )
}

export default Animation_7

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})