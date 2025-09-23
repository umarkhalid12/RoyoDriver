import { Platform } from 'react-native';
import { getBundleId } from 'react-native-device-info';

const shortCodes = {

  tride: '769ba7',
  
};

const appIds = {

  tride: Platform.select({
    ios: 'com.tride.royodispatcher',
    android: 'com.tride.dispatcher',
  }),
  
};

export { appIds, shortCodes };