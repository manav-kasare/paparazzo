// import {ToasterHelper} from 'react-native-customizable-toast';
import Toast from 'react-native-toast-message';

export const showToast = (
  type: 'default' | 'success' | 'error' | 'info' | 'warning',
  text: string,
) => {
  console.log('showing toast...', text);
  Toast.show({
    type,
    text1: type[0].toUpperCase() + type.slice(1),
    text2: text,
    position: 'bottom',
  });
};
