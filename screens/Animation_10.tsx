import { StyleSheet, View, Text, SafeAreaView, Dimensions } from 'react-native'
import React, {useEffect, useState, useCallback, useRef} from 'react'
import Animated, {useSharedValue, 
    useAnimatedStyle, 
    withSpring, 
    runOnJS,
    withRepeat, 
    useAnimatedGestureHandler, withTiming} from 'react-native-reanimated';
import { PanGestureHandler, 
    PanGestureHandlerProps,
    PanGestureHandlerGestureEvent, ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const BACKGROUND_COLOR = '#FAFBFF';
const LIST_ITEM_HEIGHT = 70;

const TITLES = [
    'Record the dismissible tutorial 🎥',
    'Leave 👍🏼 to the video',
    'Check YouTube comments',
    'Subscribe to the channel 🚀',
    'Leave a ⭐️ on the GitHub Repo'
  ];

interface TaskInterface {
    title: string;
    index: number;
  }

interface ListItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  task: TaskInterface;
  onDismiss?: (task: TaskInterface) => void;
}


interface ListItem {
    task: TaskInterface;
    key: number;
 
}
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;
const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));


const ListItem: React.FC<ListItemProps> = ({
    task,
    onDismiss,
    simultaneousHandlers,
  }) => {
    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
    const marginVertical = useSharedValue(10);
    const opacity = useSharedValue(1);
  
    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: (event) => {
        translateX.value = event.translationX;
      },
      onEnd: () => {
        const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
        if (shouldBeDismissed) {
          translateX.value = withTiming(-SCREEN_WIDTH);
          itemHeight.value = withTiming(0);
          marginVertical.value = withTiming(0);
          opacity.value = withTiming(0, undefined, (isFinished) => {
            if (isFinished && onDismiss) {
              runOnJS(onDismiss)(task);
            }
          });
        } else {
          translateX.value = withTiming(0);
        }
      },
    });
  
    const rStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    }));
  
    const rIconContainerStyle = useAnimatedStyle(() => {
      const opacity = withTiming(
        translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
      );
      return { opacity };
    });
  
    const rTaskContainerStyle = useAnimatedStyle(() => {
      return {
        height: itemHeight.value,
        marginVertical: marginVertical.value,
        opacity: opacity.value,
      };
    });
  
    return (
      <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
        <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
          <FontAwesome5
            name={'trash-alt'}
            size={LIST_ITEM_HEIGHT * 0.4}
            color={'red'}
          />
        </Animated.View>
        <PanGestureHandler
          simultaneousHandlers={simultaneousHandlers}
          onGestureEvent={panGesture}
        >
          <Animated.View style={[styles.task, rStyle]}>
            <Text style={styles.taskTitle}>{task.title}</Text>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    );
  };
  





const Animation_10 = () => {

    const [tasks, setTasks] = useState(TASKS);

    const onDismiss = useCallback((task: TaskInterface) => {
      setTasks((tasks) => tasks.filter((item) => item.index !== task.index));
    }, []);
  
    const scrollRef = useRef(null);
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Tasks</Text>
        <ScrollView ref={scrollRef} style={{ flex: 1 }}>
          {tasks.map((task) => (
            <ListItem
              simultaneousHandlers={scrollRef}
              key={task.index}
              task={task}
              onDismiss={onDismiss}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
}

export default Animation_10

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: '5%',
  },
  taskContainer: {
    width: '100%',
    alignItems: 'center',
  },
  task: {
    width: '90%',
    height: LIST_ITEM_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})