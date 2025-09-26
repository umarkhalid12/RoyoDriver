import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import { getBundleId } from 'react-native-device-info';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { MenuProvider } from 'react-native-popup-menu';

import NoInternetModal from './src/components/NoInternetModal';
import NotificationModal from './src/components/NotificationModal';
import Container from './src/library/toastify-react-native';
import Routes from './src/navigation/Routes';
import {
  setDefaultLanguage,
  updateInternetConnection,
} from './src/redux/actions/init';
import store from './src/redux/store';
import { moderateScaleVertical, width } from './src/styles/responsiveSize';
import { appIds } from './src/utils/constants/DynamicAppKeys';
import {
  notificationListener,
  requestUserPermission,
} from './src/utils/notificationServices';
import ShowNotificationForeground from './src/utils/ShowNotificationForeground';
import types from './src/redux/types';

const App = () => {
  const [internetConnection, setInternet] = useState(true);

  const setInitialLanguage = () => {
    if (appIds.bluebolt === DeviceInfo.getBundleId()) {
      setDefaultLanguage({
        id: 9,
        label: 'Vietnamese',
        value: 'vi',
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
        if (!alreadyLaunched) {
          await AsyncStorage.setItem(
            'alreadyLaunched',
            JSON.stringify({ data: true })
          );
          setInitialLanguage();
        }

        const cabPoolingStatus = await AsyncStorage.getItem('cabPoolingStatus');
        if (cabPoolingStatus) {
          const poolingStatus = JSON.parse(cabPoolingStatus);
          store.dispatch({
            type: types.POOLING,
            payload: poolingStatus,
          });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListener();

    setTimeout(() => {
      SplashScreen.hide();
    }, getBundleId() === appIds?.flank ? 100 : 1500);
  }, []);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const netStatus = state.isConnected;
      setInternet(netStatus);
      store.dispatch(updateInternetConnection(netStatus)); // ✅ must dispatch
    });

    return () => removeNetInfoSubscription();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MenuProvider>
          <ShowNotificationForeground />
          <Routes />
          <NotificationModal />
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
    </Provider>
  );
};

export default App;
