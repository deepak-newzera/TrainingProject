/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {launchImageLibrary} from 'react-native-image-picker';
import {useQuery, useMutation, gql} from '@apollo/client';

const GET_USER_DETAILS = gql`
  query ($id: Int!) {
    getUserDetail(id: $id) {
      name
      bio
      img
    }
  }
`;

const ADD_PROFILE_PIC = gql`
  mutation ($id: Int!, $img: String!) {
    addProfilePic(id: $id, img: $img) {
      name
      bio
      img
    }
  }
`;

let userId = 1;
let flag = 0;
let avatar =
  'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=';

bs = React.createRef();
fall = new Animated.Value(1);

bsStory = React.createRef();
fallStory = new Animated.Value(1);

const Profile = ({navigation}) => {
  const {error, loading, data} = useQuery(GET_USER_DETAILS, {
    variables: {id: userId},
  });
  const [addProfilePic] = useMutation(ADD_PROFILE_PIC);
  const [isStatusSet, setIsStatusSet] = useState(0);
  const [image, setImage] = useState(avatar);
  const [statusImage, setStatusImage] = useState('');
  const [isStatusViewed, setIsStatusViewed] = useState(1);

  if (loading) {
    return (
      <SafeAreaView>
        <Text style={styles.textColor}>Loading....</Text>
      </SafeAreaView>
    );
  }
  if (error) {
    console.log(error);
    return (
      <SafeAreaView>
        <Text style={styles.textColor}>`Error + ${error.message}`</Text>
      </SafeAreaView>
    );
  }

  const takePhotoFromCamera = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      flag = 1;
      setImage(result.assets[0].uri);
      addProfilePic({variables: {id: userId, img: result.assets[0].uri}});
    }
    this.bs.current.snapTo(1);
    this.bsStory.current.snapTo(1);
  };

  const choosePhotoFromLibrary = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      flag = 1;
      setImage(result.assets[0].uri);
      addProfilePic({variables: {id: userId, img: result.assets[0].uri}});
    }
    this.bs.current.snapTo(1);
    this.bsStory.current.snapTo(1);
  };

  const takePhotoFromCamera1 = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      setStatusImage(result.assets[0].uri);
      setIsStatusViewed(0);
      setIsStatusSet(1);
    }
    this.bs.current.snapTo(1);
    this.bsStory.current.snapTo(1);
  };

  const choosePhotoFromLibrary1 = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      setStatusImage(result.assets[0].uri);
      setIsStatusViewed(0);
      setIsStatusSet(1);
    }
    this.bs.current.snapTo(1);
    this.bsStory.current.snapTo(1);
  };

  const remove = () => {
    console.log(image);
    console.log(data.getUserDetail.img);
    console.log(flag);
    if (
      (flag === 1 && image === avatar) ||
      (data.getUserDetail.img === avatar && flag === 0)
    ) {
      console.log('\nNo Profile Pic\n');
    } else {
      flag = 1;
      setImage(avatar);
      addProfilePic({variables: {id: userId, img: avatar}});
    }
    this.bs.current.snapTo(1);
    this.bsStory.current.snapTo(1);
  };

  renderInner = () => {
    return (
      <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Upload Profile Pic</Text>
          <Text style={styles.panelSubtitle}>Change Your Profile Picture</Text>
        </View>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={takePhotoFromCamera}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={choosePhotoFromLibrary}>
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton} onPress={remove}>
          <Text style={styles.panelButtonTitle}>Remove profile picture</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  renderInnerStory = () => {
    return (
      <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Upload Status</Text>
          <Text style={styles.panelSubtitle}>Choose below</Text>
        </View>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={takePhotoFromCamera1}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={choosePhotoFromLibrary1}>
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onPress = () => {
    if (!isStatusSet) {
      this.bsStory.current.snapTo(0);
      this.bs.current.snapTo(1);
    } else {
      this.bs.current.snapTo(1);
      setIsStatusViewed(1);
      navigation.navigate('Story', {imageSource: statusImage});
    }
  };

  const onLongPress = () => {
    if (this.bs.current === null) {
      return;
    }
    this.bs.current.snapTo(0);
    this.bsStory.current.snapTo(1);
  };

  return (
    <View style={styles.root}>
      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />

      <BottomSheet
        ref={this.bsStory}
        snapPoints={[340, 0]}
        renderContent={this.renderInnerStory}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fallStory}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          opacity: Animated.add(
            0.4,
            Animated.multiply(this.fall, this.fallStory, 1.0),
          ),
        }}>
        <LinearGradient
          colors={['#696969', '#000000']}
          style={{height: '40%'}}
        />
        <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
          <View style={{alignItems: 'center', marginTop: -60}}>
            <ImageBackground
              style={{width: 120, height: 120}}
              imageStyle={{
                borderRadius: 70,
                borderWidth: 7,
                borderColor: isStatusViewed ? 'grey' : 'blue',
              }}
              source={{uri: flag === 1 ? image : data.getUserDetail.img}}
            />
          </View>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 30}}>
            {data.getUserDetail.name}
          </Text>
          <Text style={{fontSize: 22}}>{data.getUserDetail.bio}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#000000',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Profile;
