import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StatusBar, Text, View ,Image} from 'react-native';
import { ImageBackground } from 'react-native-web';
import DrinkItem from '../../components/DrinkItem';
import data from '../../data/drinks.json';
import styles from './styles';

export default function HomeScreen({ navigation }) {
  const [user, setuser] = useState(null);
  const renderItem = ({ item, index }) => {
    return <DrinkItem item={item} index={index} navigation={navigation} />;
  };
  const getUserData = async () => {
    let curUser = await AsyncStorage.getItem('curUser');
    curUser = JSON.parse(curUser);
    setuser(curUser);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <ScrollView
      style={{
        backgroundColor: '#C57B2C',
        paddingHorizontal: 12,
        marginTop: StatusBar.currentHeight + 10,
      }}
    >
      <Text style={{ marginTop: 20, fontSize: 18,color:'white',fontWeight:'bold' }}>
      <Image
            style={{
              alignSelf: 'center',
              height: 100,
              resizeMode: 'contain',
              width: 100,
            }}
            source={require('../../../assets/3703377.png')}
          />
        {` Welcome! ${
        user && user.name
      }`}</Text>
      <View>
        <Image
            style={{
              alignSelf: 'center',
              height: 300,
              resizeMode: 'contain',
              width: 800,
            }}
            source={require('../../../assets/360_F_417207342_G7LYJqMP12em9M6szV1rEaUEGuVwBEYH.jpg')}
          />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Món ăn đang HOT</Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={true}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Có thể bạn sẽ thích</Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
}
