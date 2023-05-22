import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard, PermissionsAndroid, Platform } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MyAlert from '../../../component/MyAlert';

import Loader from '../../../WebApi/Loader';
import LinearGradient from 'react-native-linear-gradient';
import { baseUrl, login, shop_eat_business, requestPostApi, requestGetApi, connect_dating_profile, connect_dating_editprofile, common_master_attributes, } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';

const image1 = require('../../../assets/images/people-following-person.png')
const onlinePersonImageWidth = 50
const onlineDotWidth = 12
const DatingEditProfile = (props) => {
  const User = useSelector(state => state.user.user_details)
  const [searchValue, setsearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  const [userMessage, setUserMessage] = useState('')
  const [filepath, setfilepath] = useState(null)
  const [pick1, setpick] = useState('')
  const [aboutme, setAboutMe] = useState('');

  const [multiSliderValue, setMultiSliderValue] = useState([18, 24])
  // const [slidervalue,setSLiderValue]=useState('');
  console.log('slidervalue====================================');
  console.log(multiSliderValue[1]);
  console.log('====================================slidervalue');
  const [showPassionsModal, setShowPassionsModal] = useState(false)
  const [showPassionsModal2, setShowPassionsModal2] = useState(false)
  const [showPassionsModal3, setShowPassionsModal3] = useState(false)

  const [selectedPassions, setSelectedPassions] = useState([])
   

  const [selectedLanguage, setSelectedLanguage] = useState([])

  const [selectedZodiac, setSelectedZodiac] = useState('')
  // const [allPassions, setAllPassions] = useState(['90s Kid', 'Musicians', 'Maggi', 'Sneakers', 'Foodie', 'Yippie', 'Festival', 'Travelling', 'k-pop']);
  // const [allLanguage, setAllLanguage] = useState(['Hindi', 'English', 'Punjabi', 'Marathi', 'France', 'Sanskrit', 'Telugu', 'Spanish']);
  const [allZodiac, setZodiac] = useState(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Saggitarius', 'Capricorn', 'Aquarius', 'Pisces']);
  const [showMeValue, setShowMeValue] = useState(0);
  const [showMeselect, setShowMeSelect] = useState('');

  const [smokingValue, setSmokingValue] = useState(0)
  const [smokingdata, setSmokingdata] = useState('');

  const [drinkingValue, setDrinkingValue] = useState(0);
  const [drinkingselect, setDrinkingSelect] = useState('');

  const [kidsValue, setKidsValue] = useState(0);
  const [kidsSelect, setKidsSelect] = useState('');

  const [politicsValue, setPoliticsValue] = useState(0);
  const [politicsselect, setPoliticsSelect] = useState('');

  const [attribute, setAttribute] = useState([]);
  const [upData, setupData] = useState([
    {
      id: '1',
      name: 'Chetan Manne',
      isOnline: true,
      message: 'Reference site about lorem...',
      img: require('../../../assets/images/dating-message-image.png'),
    },
    {
      id: '1',
      name: 'Chetan Manne',
      isOnline: false,
      message: 'Reference site about lorem...',
      img: require('../../../assets/images/dating-message-image.png'),
    },
    {
      id: '1',
      name: 'Chetan Manne',
      isOnline: true,
      message: 'Reference site about lorem...',
      img: require('../../../assets/images/dating-message-image.png'),
    },
    {
      id: '1',
      name: 'Chetan Manne',
      isOnline: false,
      message: 'Reference site about lorem...',
      img: require('../../../assets/images/dating-message-image.png'),
    },
  ])

  const changeShowMeValue = (index) => {
    if (showMeValue === index) {
      return
    }
    if (showMeValue === 0) {
      setShowMeSelect('Male')
    } else if (showMeValue === 1) {
      setShowMeSelect('Women')
    } else  if (showMeValue === 2)  {
      setShowMeSelect('Everyone')
    }

    setShowMeValue(index)
  }
  const changeSmokingValue = (index) => {
    console.log(smokingdata);
    if (smokingValue === index) {
      return
    }
    if (smokingValue === 0) {
      setSmokingdata('Yes')
    } else if (smokingValue === 1) {
      setSmokingdata('No')
    } else  if (smokingValue === 2)  {
      setSmokingdata('Occassionally')
    }
    setSmokingValue(index)
  }

  const changeDrinkingValue = (index) => {
    if (drinkingValue === index) {
      return
    }
    if (drinkingValue === 0) {
      setDrinkingSelect('Yes')
    } else if (drinkingValue === 1) {
      setDrinkingSelect('No')
    } else  if (drinkingValue === 2)  {
      setDrinkingSelect('Occassionally')
    }
    setDrinkingValue(index)
  }
  const changeKidsValue = (index) => {
    if (kidsValue === index) {
      return
    }
    if (kidsValue === 0) {
      setKidsSelect('Open to kids')
    } else if (kidsValue === 1) {
      setKidsSelect('Don`t want')
    } else  if (kidsValue === 2)  {
      setKidsSelect('Not sure yet')
    }
    setKidsValue(index)
  }
  const changePoliticsValue = (index) => {
    if (politicsValue === index) {
      return
    }
    if (politicsValue === 0) {
      setPoliticsSelect('Apolotical')
    } else if (politicsValue === 1) {
      setPoliticsSelect('moderate')
    } else  if (politicsValue === 2)  {
      setPoliticsSelect('Left')
    }else  if (politicsValue === 3)  {
      setPoliticsSelect('Right')
    }else  if (politicsValue === 4)  {
      setPoliticsSelect('Communist')
    }else  if (politicsValue === 5)  {
      setPoliticsSelect('Socialist')
    }

    setPoliticsValue(index)
  }

  const changeSelectedPassions = (value) => {
    console.log("changeSelectedPassions", value);
    if (selectedPassions?.includes(value.name)) {
      const updatedData = selectedPassions?.filter(el => el !== value.name)
      setSelectedPassions([...updatedData])
    } else {
      setSelectedPassions([...selectedPassions, value.name])
      
    }
  }

  const changeSelectedLanguage = (value) => {
    if (selectedLanguage?.includes(value.name)) {
      const updatedData = selectedLanguage?.filter(el => el !== value.name)
      setSelectedLanguage([...updatedData])
    } else {
      setSelectedLanguage([...selectedLanguage, value.name])
    }
  }
  const changeSelectedzodiac = (index) => {
    if (selectedZodiac === index) {
      return
    }

    setSelectedZodiac(index)
  }

  const multiSliderValuesChange = (values) => {
    console.log("MultiSlider:::", values);
    setMultiSliderValue(values)
  }


  const openLibrary = async () => {

    let options = {
      title: 'Image Picker',
      // mediaType: 'mixed',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      durationLimit: 30,
      title: 'Select Image/Video',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (image) => {
      if (!image.didCancel) {
        console.log('the ddd==', image.assets[0].uri)
        var photo = {
          uri: image.assets[0].uri,
          type: image.assets[0].type,
          name: image.assets[0].fileName
        };
        console.log("image", photo);
        setpick(photo)
        setfilepath(image)
      }
    })


  }
  const requestCameraPermission = async () => {
    if (Platform.OS === 'ios') {
      openLibrary();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to access camera',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          openLibrary();
          console.log('Storage Permission Granted.');
        } else {
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('ERROR' + err);
      }
    }
  };
  const opencamera = async () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // let options = {
    //   title: 'Select Image',
    //   customButtons: [
    //     {
    //       name: 'customOptionKey',
    //       title: 'Choose Photo from Custom Option'
    //     },
    //   ],
    //   mediaType:'video',
    //   maxWidth: 500,
    //   maxHeight: 500,
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };

    launchCamera(options, (image) => {
      if (!image.didCancel) {
        console.log('the ddd==', image)
        var photo = {
          uri: image.assets[0].uri,
          type: image.assets[0].type,
          name: image.assets[0].fileName
        };
        console.log("imageCamera", photo);
        setpick(photo)
        setfilepath(image)
      }

    })

  }

  const GetAttributes = async (hob) => {
    console.log("the res==>>GetAttributes", hob);
    setLoading(true);

    const { responseJson, err } = await requestGetApi(
      common_master_attributes + hob,
      "",
      "GET",
      User.token
    );
    setLoading(false);
    console.log("the res==>>GetAttributes", responseJson);
    if (responseJson.headers.success == 1) {
      console.log("the res==>>GetAttributes", responseJson.body);
      setAttribute(responseJson.body);
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }

  };

  const Editprofile = async (items) => {

    var paasionarray = []
    var hobby = selectedPassions

    // for (let i = 1; i <= hobby.length; i++) {
      paasionarray.push({
        attribute_type: hobby.master_type,
        attribute_code: hobby.master_code,
        attribute_value: hobby.name
      })

    // }
    console.log("SAVE PROFILE DATA:",paasionarray);

    setLoading(true)

    var data = {
      // username: "Saurabh Kumar",
      about: aboutme,
      // fullname: "Saurabh kumar",
      // dob: "1991-01-01",
      age_preference: multiSliderValue[1],
      // activity_status: "Online",
      intrest_in: showMeselect,
      job_title: "Software Developer",
      smoking: smokingdata,
      drinking: drinkingselect,
      kids: kidsSelect,
      zodiac: selectedZodiac,
      "politics": politicsselect,
      passions: [
        {
          attribute_type: "dating_passion",
          attribute_code: "90s-kid",
          attribute_value: "90s Kid"
        },
        {
          attribute_type: "dating_passion",
          attribute_code: "sneekers",
          attribute_value: "Sneekers"
        }
      ],
      languages: [
        {
          attribute_type: "dating_language",
          attribute_code: "en",
          attribute_value: "English"
        },
        {
          attribute_type: "dating_language",
          attribute_code: "hi",
          attribute_value: "Hindi"
        }
      ]
    }
    const { responseJson, err } = await requestPostApi(connect_dating_editprofile, data, 'PUT', User.token)
    setLoading(false)
    console.log('the Editprofileres==>>', responseJson)
    // if (responseJson.headers.success == 1) {
    //   //  Toast.show(responseJson.headers.message)
    //   Toast.show({ text1: responseJson.headers.message });
    //   menuList(menutypevalue)
    //   //  props.navigation.navigate('ShopCart')
    // } else {
    //   Toast.show({ text1: responseJson.headers.message });
    //   // setalert_sms(err)
    //   // setMy_Alert(true)
    // }
  }

  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ flex: 1, }}>
      <LinearGradient
        colors={['#FD869F', 'rgba(255, 255, 255, 0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.7, 0.9]}
        style={{ flex: 1, height: dimensions.SCREEN_HEIGHT, }}
      >
        <ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 80, padding: 20, }}>
            <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ flex: 1 }}>
              <Image source={require('../../../assets/images/dating-back-arrow.png')} style={{ width: 25, height: 15 }} resizeMode='contain' />
            </TouchableOpacity>
            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontSize: 12.5, fontWeight: '600', color: '#31313f' }}>Edit Profile</Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>
          <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>

            <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginBottom: 10 }}>Edit Profile Photo</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Image source={require('../../../assets/images/dating-message-image.png')} style={{ width: 100, height: 100, borderRadius: 2 }} resizeMode='contain' />
                <View style={styles.deleteIconView}>
                  <Image source={require('../../../assets/images/dating-delete-photo-icon.png')} style={styles.deleteIcon} resizeMode='contain' />
                </View>
              </View>
              {/* <View style={{ marginLeft: 20 }}>
                <Image source={require('../../../assets/images/dating-message-image.png')} style={{ width: 100, height: 100, borderRadius: 2 }} resizeMode='contain' />
                <View style={styles.deleteIconView}>
                  <Image source={require('../../../assets/images/dating-delete-photo-icon.png')} style={styles.deleteIcon} resizeMode='contain' />
                </View>
              </View> */}
              <TouchableOpacity onPress={() => { requestCameraPermission() }} style={styles.plusIconSuperView}>
                <Image source={require('../../../assets/images/dating-upload-camera-icon.png')} style={{ width: 30, height: 30, }} resizeMode='contain' />
                <View style={styles.plusIconView}>
                  <Image source={require('../../../assets/images/dating-upload-plus-icon.png')} style={styles.deleteIcon} resizeMode='contain' />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 20 }}>About me</Text>
            <TextInput
              value={aboutme}
              textAlignVertical='top'
              onChangeText={(e) => { setAboutMe(e) }}
              placeholder={'Type here.....'}
              placeholderTextColor="#bbbbbb"
              multiline={true}
              // maxLength={500}
              // keyboardType="number-pad"
              autoCapitalize='none'
              style={[styles.input]}
            />
            <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 15 }}>Passions</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff1f6', padding: 20, borderRadius: 10 }}>
              <Text style={{ fontSize: 10, color: '#ff5e96', fontStyle: 'italic' }}>{selectedPassions?.join(', ')}</Text>
              <TouchableOpacity onPress={() => { setShowPassionsModal(true), GetAttributes('dating_passion') }}>
                <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 20, width: 20, }} resizeMode='contain' />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 15 }}>Show me</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { changeShowMeValue(0) }} style={[styles.showMeView, { backgroundColor: showMeValue === 0 ? '#fff1f6' : '#fff', borderColor: showMeValue === 0 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Men</Text>
                <View style={[styles.showMeImageView, { backgroundColor: showMeValue === 0 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { changeShowMeValue(1) }} style={[styles.showMeView, { marginLeft: 10, backgroundColor: showMeValue === 1 ? '#fff1f6' : '#fff', borderColor: showMeValue === 1 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Women</Text>
                <View style={[styles.showMeImageView, { backgroundColor: showMeValue === 1 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { changeShowMeValue(2) }} style={[styles.showMeView, { marginLeft: 10, backgroundColor: showMeValue === 2 ? '#fff1f6' : '#fff', borderColor: showMeValue === 2 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Everyone</Text>
                <View style={[styles.showMeImageView, { backgroundColor: showMeValue === 2 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 15 }}>
              <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869' }}>Age preference</Text>
              <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#ff3b7f' }}>{`${multiSliderValue[0]}-${multiSliderValue[1]}`}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <MultiSlider
                values={[multiSliderValue[0], multiSliderValue[1]]}
                // values={[multiSliderValue[0]]}
                sliderLength={350}

                // isMarkersSeparated={true}
                // onValuesChangeStart={setSLiderValue}
                // onValuesChangeFinish={setSLiderValue}

                onValuesChange={multiSliderValuesChange}
                min={18}
                max={60}
                step={1}
                allowOverlap={false}
                minMarkerOverlapDistance={10}
                markerStyle={{
                  ...Platform.select({
                    ios: {
                      height: 30,
                      width: 30,
                      shadowColor: '#000000',
                      shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.1,
                      borderColor: '#f23476',
                      borderWidth: 1
                    },
                    android: {
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                      backgroundColor: '#f23476',
                      borderColor: '#f23476',
                      borderWidth: 1
                    }
                  })
                }}
                pressedMarkerStyle={{
                  ...Platform.select({
                    android: {
                      height: 30,
                      width: 30,
                      borderRadius: 20,
                      backgroundColor: '#f23476'
                    }
                  })
                }}
                selectedStyle={{ backgroundColor: '#f23476' }}
                unselectedStyle={{ backgroundColor: '#e3d0d7', borderColor: '#f23476', borderWidth: 0.5 }}
                trackStyle={{
                  height: 5
                }}
                touchDimensions={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  slipDisplacement: 40
                }}
              />
            </View>

            <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 15 }}>Language</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff1f6', padding: 20, borderRadius: 10 }}>
              <Text style={{ fontSize: 10, color: '#ff5e96', fontStyle: 'italic' }}>{selectedLanguage?.join(', ')}</Text>
              <TouchableOpacity onPress={() => { setShowPassionsModal2(true), GetAttributes('dating_language') }}>
                <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 20, width: 20, }} resizeMode='contain' />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 15 }}>Smoking</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { changeSmokingValue(0) }} style={[styles.showMeView, { backgroundColor: smokingValue === 0 ? '#fff1f6' : '#fff', borderColor: smokingValue === 0 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Yes</Text>
                <View style={[styles.showMeImageView, { backgroundColor: smokingValue === 0 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { changeSmokingValue(1) }} style={[styles.showMeView, { marginLeft: 10, backgroundColor: smokingValue === 1 ? '#fff1f6' : '#fff', borderColor: smokingValue === 1 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>No</Text>
                <View style={[styles.showMeImageView, { backgroundColor: smokingValue === 1 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { changeSmokingValue(2) }} style={[styles.smokingView, { marginLeft: 10, backgroundColor: smokingValue === 2 ? '#fff1f6' : '#fff', borderColor: smokingValue === 2 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Occassionally</Text>
                <View style={[styles.showMeImageView, { backgroundColor: smokingValue === 2 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

            </View>

            <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 15 }}>Drinking</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { changeDrinkingValue(0) }} style={[styles.showMeView, { backgroundColor: drinkingValue === 0 ? '#fff1f6' : '#fff', borderColor: drinkingValue === 0 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Yes</Text>
                <View style={[styles.showMeImageView, { backgroundColor: drinkingValue === 0 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { changeDrinkingValue(1) }} style={[styles.showMeView, { marginLeft: 10, backgroundColor: drinkingValue === 1 ? '#fff1f6' : '#fff', borderColor: drinkingValue === 1 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>No</Text>
                <View style={[styles.showMeImageView, { backgroundColor: drinkingValue === 1 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { changeDrinkingValue(2) }} style={[styles.smokingView, { marginLeft: 10, backgroundColor: drinkingValue === 2 ? '#fff1f6' : '#fff', borderColor: drinkingValue === 2 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Occassionally</Text>
                <View style={[styles.showMeImageView, { backgroundColor: drinkingValue === 2 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

            </View>

            <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 15 }}>Kid's</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { changeKidsValue(0) }} style={[styles.smokingView, { backgroundColor: kidsValue === 0 ? '#fff1f6' : '#fff', borderColor: kidsValue === 0 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Open to kids</Text>
                <View style={[styles.showMeImageView, { backgroundColor: kidsValue === 0 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { changeKidsValue(1) }} style={[styles.showMeView, { marginLeft: 10, backgroundColor: kidsValue === 1 ? '#fff1f6' : '#fff', borderColor: kidsValue === 1 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Don't want</Text>
                <View style={[styles.showMeImageView, { backgroundColor: kidsValue === 1 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { changeKidsValue(2) }} style={[styles.smokingView, { marginLeft: 10, backgroundColor: kidsValue === 2 ? '#fff1f6' : '#fff', borderColor: kidsValue === 2 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Not sure yet</Text>
                <View style={[styles.showMeImageView, { backgroundColor: kidsValue === 2 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

            </View>

            <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 15 }}>Zodiac</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff1f6', padding: 20, borderRadius: 10 }}>
              <Text style={{ fontSize: 10, color: '#ff5e96', fontStyle: 'italic' }}>{selectedZodiac}</Text>
              <TouchableOpacity onPress={() => setShowPassionsModal3(true)}>
                <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 20, width: 20, }} resizeMode='contain' />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 15 }}>Politics</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { changePoliticsValue(0) }} style={[styles.smokingView, { backgroundColor: politicsValue === 0 ? '#fff1f6' : '#fff', borderColor: politicsValue === 0 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Apolotical</Text>
                <View style={[styles.showMeImageView, { backgroundColor: politicsValue === 0 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { changePoliticsValue(1) }} style={[styles.smokingView, { marginLeft: 10, backgroundColor: politicsValue === 1 ? '#fff1f6' : '#fff', borderColor: politicsValue === 1 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Moderate</Text>
                <View style={[styles.showMeImageView, { backgroundColor: politicsValue === 1 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { changePoliticsValue(2) }} style={[styles.showMeView, { marginLeft: 10, backgroundColor: politicsValue === 2 ? '#fff1f6' : '#fff', borderColor: politicsValue === 2 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Left</Text>
                <View style={[styles.showMeImageView, { backgroundColor: politicsValue === 2 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity onPress={() => { changePoliticsValue(3) }} style={[styles.showMeView, { backgroundColor: politicsValue === 3 ? '#fff1f6' : '#fff', borderColor: politicsValue === 3 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Right</Text>
                <View style={[styles.showMeImageView, { backgroundColor: politicsValue === 3 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { changePoliticsValue(4) }} style={[styles.smokingView, { marginLeft: 10, backgroundColor: politicsValue === 4 ? '#fff1f6' : '#fff', borderColor: politicsValue === 4 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Communist</Text>
                <View style={[styles.showMeImageView, { backgroundColor: politicsValue === 4 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { changePoliticsValue(5) }} style={[styles.showMeView, { marginLeft: 10, backgroundColor: politicsValue === 5 ? '#fff1f6' : '#fff', borderColor: politicsValue === 5 ? '#ff3b7f' : '#e3d0d7' }]}>
                <Text style={styles.showMeText}>Socialist</Text>
                <View style={[styles.showMeImageView, { backgroundColor: politicsValue === 5 ? '#ff3b7f' : '#e3d0d7' }]}>
                  <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                </View>
              </TouchableOpacity>

            </View>
            <View style={{ height: 50 }} />

            <MyButtons title="Save" height={60} width={'100%'} borderRadius={10} alignSelf="center" press={() => {Editprofile() }} marginHorizontal={20} fontSize={11}
              titlecolor={Mycolors.BG_COLOR} hLinearColor={['#8d046e', '#e30f50']} />

            <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, backgroundColor: '#F8F8F8' }}>
            </View>








          </View>
          <View style={{ height: 100 }} />

        </ScrollView>

        <Modal
          isVisible={showPassionsModal}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '50%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
                <View style={{ flex: 1 }} />
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center' }}>Passions</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center' }}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignSelf: 'center' }}>
                <Text style={{ color: '#4a4c52', fontSize: 12 }}>
                  Select passions that you would like to share. Choose a minimum of 3.
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                  <Text style={{ color: '#4a4c52', fontSize: 12, fontWeight: '500' }}>Passions</Text>
                  <Text style={{ color: '#4a4c52', fontSize: 12, fontWeight: '500' }}>{`${selectedPassions?.length}/${attribute?.length}`}</Text>
                </View>

                <FlatList
                  data={attribute}
                  showsHorizontalScrollIndicator={false}
                  numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={() => { changeSelectedPassions(item) }} style={[styles.showMeView, { width: '30%', marginHorizontal: index % 3 === 1 ? 10 : 0, marginBottom: 10, backgroundColor: selectedPassions?.includes(item.name) ? '#fff1f6' : '#fff', borderColor: selectedPassions?.includes(item.name) ? '#ff3b7f' : '#e3d0d7' }]}>
                        <Text style={styles.showMeText}>{item.name}</Text>
                        <View style={[styles.showMeImageView, { backgroundColor: selectedPassions?.includes(item.name) ? '#ff3b7f' : '#e3d0d7' }]}>
                          <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                        </View>
                      </TouchableOpacity>
                    )
                  }}
                />
              </View>

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>

        {/* ......Language select modal 2..... */}
        <Modal
          isVisible={showPassionsModal2}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal2(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal2(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '50%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
                <View style={{ flex: 1 }} />
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center' }}>Language</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal2(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center' }}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignSelf: 'center' }}>
                <Text style={{ color: '#4a4c52', fontSize: 12 }}>
                  Select language that you would like to share. Choose a minimum of 2.
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                  <Text style={{ color: '#4a4c52', fontSize: 12, fontWeight: '500' }}>Language's</Text>
                  <Text style={{ color: '#4a4c52', fontSize: 12, fontWeight: '500' }}>{`${selectedLanguage?.length}/${attribute?.length}`}</Text>
                </View>

                <FlatList
                  data={attribute}
                  showsHorizontalScrollIndicator={false}
                  numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={() => { changeSelectedLanguage(item) }} style={[styles.showMeView, { width: '30%', marginHorizontal: index % 3 === 1 ? 10 : 0, marginBottom: 10, backgroundColor: selectedLanguage?.includes(item.name) ? '#fff1f6' : '#fff', borderColor: selectedLanguage?.includes(item.name) ? '#ff3b7f' : '#e3d0d7' }]}>
                        <Text style={styles.showMeText}>{item.name}</Text>
                        <View style={[styles.showMeImageView, { backgroundColor: selectedLanguage?.includes(item.name) ? '#ff3b7f' : '#e3d0d7' }]}>
                          <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                        </View>
                      </TouchableOpacity>
                    )
                  }}
                />
              </View>

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>

        {/* ......Zodiac select modal 3..... */}
        <Modal
          isVisible={showPassionsModal3}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal3(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal3(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '50%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
                <View style={{ flex: 1 }} />
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center' }}>Zodiac</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal3(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center' }}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignSelf: 'center' }}>
                <Text style={{ color: '#4a4c52', fontSize: 12 }}>
                  Select Zodiac that you would like to share.
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                  {/* <Text style={{ color: '#4a4c52', fontSize: 12, fontWeight: '500' }}>Zodiac</Text> */}
                  {/* <Text style={{ color: '#4a4c52', fontSize: 12, fontWeight: '500' }}>{`${selectedZodiac?.length}`}</Text> */}
                </View>

                <FlatList
                  data={allZodiac}
                  showsHorizontalScrollIndicator={false}
                  numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={() => { changeSelectedzodiac(item) }} style={[styles.showMeView, { width: '30%', marginHorizontal: index % 3 === 1 ? 10 : 0, marginBottom: 10, backgroundColor: selectedZodiac == item ? '#fff1f6' : '#fff', borderColor: selectedZodiac == item ? '#ff3b7f' : '#e3d0d7' }]}>
                        <Text style={styles.showMeText}>{item}</Text>
                        <View style={[styles.showMeImageView, { backgroundColor: selectedZodiac == item ? '#ff3b7f' : '#e3d0d7' }]}>
                          <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                        </View>
                      </TouchableOpacity>
                    )
                  }}
                />
              </View>

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>
      </LinearGradient>
      {loading ? <Loader /> : null}
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    paddingLeft: 15,
    width: '100%',
    fontSize: 13,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    color: '#ff5e96',
    height: 100,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // color:Mycolors.Black,
    shadowColor: '#91e3e3',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 1,

  },
  showMeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '27%',
    padding: 10,
    // paddingHorizontal:15, 
    borderRadius: 20,
    borderWidth: 0.5
  },
  smokingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '32%',
    padding: 10,
    // paddingHorizontal:15, 
    borderRadius: 20,
    borderWidth: 0.5
  },
  showMeText: {
    fontSize: 10,
    color: '#4a4c52'
  },
  showMeImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    marginLeft: 10,
  },
  showMeImage: {
    height: 15,
    width: 15
  },
  deleteIconView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 50 / 2,
    backgroundColor: '#ff001e',
    position: 'absolute',
    top: -5,
    left: 80
  },
  plusIconView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 50 / 2,
    backgroundColor: '#ff3b7f',
    position: 'absolute',
    bottom: -10,
    left: 40
  },
  deleteIcon: {
    width: 10,
    height: 10
  },
  plusIconSuperView: {
    marginLeft: 20,
    backgroundColor: '#fde7eb',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 10
  }
});
export default DatingEditProfile 