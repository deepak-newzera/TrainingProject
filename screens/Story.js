/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, ImageBackground, Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';

const Story = ({route, navigation}) => {
  const {imageSource} = route.params;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setProgress(prog => {
        return prog + 0.01;
      });
    }, 50);
    setTimeout(() => {
      navigation.navigate('Profile');
    }, 5000);
  }, [navigation]);
  return (
    <View style={{flex: 1}}>
      <Progress.Bar
        progress={progress}
        width={Dimensions.get('window').width}
      />
      <ImageBackground
        source={{uri: imageSource}}
        resizeMode="cover"
        style={{flex: 1}}
      />
    </View>
  );
};

export default Story;
