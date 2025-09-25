import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import { getBundleId } from 'react-native-device-info';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import { Provider } from 'react-redux';
import NoInternetModal from './src/components/NoInternetModal';
import NotificationModal from './src/components/NotificationModal';
import Container from './src/library/toastify-react-native';
import Routes from './src/navigation/Routes';
import {
  setDefaultLanguage,
  updateInternetConnection,
} from './src/redux/actions/init';
import store from './src/redux/store';
import colors from './src/styles/colors';
import fontFamily from './src/styles/fontFamily';
import { moderateScaleVertical, width } from './src/styles/responsiveSize';
import { appIds } from './src/utils/constants/DynamicAppKeys';
import {
  notificationListener,
  requestUserPermission,
} from './src/utils/notificationServices';
import ShowNotificationForeground from './src/utils/ShowNotificationForeground';
import types from './src/redux/types';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { MenuProvider } from 'react-native-popup-menu';

const { dispatch } = store;

const App = () => {
  const [internetConnection, setInternet] = useState(true);

  const setInitialLanguage = () => {
    if (appIds.bluebolt == DeviceInfo.getBundleId()) {
      setDefaultLanguage({
        id: 9,
        label: 'Vietnamese',
        value: 'vi',
      });
    }
  };

  useEffect(() => {
    (async () => {
      await AsyncStorage.getItem('alreadyLaunched').then((value) => {
        if (value == null) {
          const data = JSON.stringify({ data: true });
          AsyncStorage.setItem('alreadyLaunched', data);
          setInitialLanguage();
        }
      });

      await AsyncStorage.getItem('cabPoolingStatus')
        .then((value) => {
          const poolingStatus = JSON.parse(value);
          dispatch({
            type: types.POOLING,
            payload: poolingStatus,
          });
        })
        .catch((error) => {
          console.log(error, 'error in getting poolstatus');
        });
    })().catch((err) => {
      console.error(err);
    });
  }, []);

  const notificationConfig = () => {
    requestUserPermission();
    notificationListener();
  };

  useEffect(() => {
    notificationConfig();
    if (getBundleId() == appIds?.flank) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 100);
    } else {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1500);
    }
  }, []);

  // Check internet connection
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const netStatus = state.isConnected;
      setInternet(netStatus);
      updateInternetConnection(netStatus);
    });

    return () => removeNetInfoSubscription();
  }, []);

  return (
    <SafeAreaProvider>
      <MenuProvider>
        <Provider store={store}>
          <ShowNotificationForeground />
          <Routes />
          <NotificationModal />
        </Provider>
        <Container
          width={width - 20}
          position="top"
          duration={2000}
          positionValue={moderateScaleVertical(20)}
        />
        <FlashMessage position="top" />
        <NoInternetModal show={!internetConnection} />
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default App;
