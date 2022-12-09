import { StyleSheet, Text, View , FlatList, ViewToken} from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const data = new Array(50).fill(0).map((_, index) => ({id: index}))

type ListItemProps = {
    viewableItems: Animated.SharedValue<ViewToken[]>;
    item: {
      id: number;
    };
  };

const ListItem: React.FC<ListItemProps> = ({item, viewableItems}) => {
        const rStyle = useAnimatedStyle(() => {

            const isVisible = Boolean(viewableItems.value
            .filter((item) => item.isViewable)
            .find((viewableItem) => viewableItem.item.id === item.id))

            return {
                opacity: withTiming(isVisible ? 1 : 0),
                transform: [
                    {scale: withTiming(isVisible ? 1 : 0.6)}
                ]
            }
        })

        return (
        <Animated.View 
        style={[{height: 80, 
            width: '90%', 
            backgroundColor: '#FACAD2', 
            marginTop: 20, 
            borderRadius: 15, 
            alignSelf: 'center'}, rStyle]}/>)
}


const Animation_15 = () => {
    const viewableItems = useSharedValue<ViewToken[]>([]);



  return (
    <View style={styles.container}>
      <FlatList 
      contentContainerStyle={{ paddingTop: 40 }}
      onViewableItemsChanged={({viewableItems: vItems}) => {
            viewableItems.value = vItems;
      }}
      data={data}
      renderItem={({item}) =>{
        return <ListItem item={item} viewableItems={viewableItems} />;
      } }/>
    </View>
  )
}

export default Animation_15

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})