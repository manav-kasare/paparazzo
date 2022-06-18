import React, {useCallback, useState} from 'react';
import {
  Image,
  TextInput,
  TextStyle,
  ViewStyle,
  StyleSheet,
  Platform,
} from 'react-native';

import Block from './Block';
import Text from './Text';

import useTheme from '../hooks/useTheme';
import {IInputProps} from '../constants/types';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from './Button';

const Input = ({
  id = 'Input',
  style,
  color,
  primary,
  secondary,
  tertiary,
  black,
  white,
  gray,
  danger,
  warning,
  success,
  info,
  search,
  disabled,
  label,
  labelColor,
  icon,
  marginBottom,
  marginTop,
  marginHorizontal,
  marginVertical,
  marginRight,
  marginLeft,
  handleSearch,
  onFocus,
  onBlur,
  ...props
}: IInputProps) => {
  const {assets, colors, sizes} = useTheme();
  const [isFocused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (event, focus) => {
      setFocused(focus);
      focus && onFocus?.(event);
      !focus && onBlur?.(event);
    },
    [setFocused, onFocus, onBlur],
  );

  const colorIndex = primary
    ? 'primary'
    : secondary
    ? 'secondary'
    : tertiary
    ? 'tertiary'
    : black
    ? 'black'
    : white
    ? 'white'
    : gray
    ? 'gray'
    : danger
    ? 'danger'
    : warning
    ? 'warning'
    : success
    ? 'success'
    : info
    ? 'info'
    : null;
  const inputColor = color
    ? color
    : colorIndex
    ? colors?.[colorIndex]
    : colors.gray;

  const inputBoxStyles = StyleSheet.flatten([
    style,
    {
      minHeight: sizes.inputHeight,
      ...(marginBottom && {marginBottom: marginBottom}),
      ...(marginTop && {marginTop: marginTop}),
      ...(marginHorizontal && {marginHorizontal: marginHorizontal}),
      ...(marginVertical && {marginVertical: marginVertical}),
      ...(marginRight && {marginRight: marginRight}),
      ...(marginLeft && {marginLeft: marginLeft}),
    },
  ]) as ViewStyle;

  const inputContainerStyles = StyleSheet.flatten([
    {
      minHeight: sizes.inputHeight,
      borderRadius: sizes.inputRadius,
      borderWidth: isFocused ? 2 : sizes.inputBorder,
      borderColor: isFocused ? colors.focus : inputColor,
    },
  ]) as ViewStyle;

  const inputStyles = StyleSheet.flatten([
    {
      flex: 1,
      zIndex: 2,
      height: '100%',
      fontSize: sizes.p,
      color: colors.input,
      paddingHorizontal: sizes.inputPadding,
    },
  ]) as TextStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const inputID =
    Platform.OS === 'android' ? {accessibilityLabel: id} : {testID: id};

  return (
    <Block flex={0} style={inputBoxStyles}>
      {label && (
        <Text
          bold
          color={labelColor ? labelColor : colors.text}
          marginBottom={sizes.s}>
          {label}
        </Text>
      )}
      <Block row align="center" justify="flex-end" style={inputContainerStyles}>
        {search && (
          <Ionicons
            name="search"
            size={20}
            color={colors.text}
            style={{marginHorizontal: sizes.s}}
          />
        )}
        {icon && (
          <Image
            source={assets?.[icon]}
            style={{marginLeft: sizes.inputPadding, tintColor: colors.icon}}
          />
        )}
        <TextInput
          {...inputID}
          {...props}
          style={inputStyles}
          editable={!disabled}
          placeholderTextColor={inputColor}
          onFocus={event => handleFocus(event, true)}
          onBlur={event => handleFocus(event, false)}
        />
        {search && (
          <Button haptic marginRight={sizes.s} onPress={handleSearch}>
            <Text color={colors.primary} bold>
              Search
            </Text>
          </Button>
        )}
        {danger && assets.warning && (
          <Image
            source={assets.warning}
            style={{
              marginRight: sizes.s,
              tintColor: colors.danger,
            }}
          />
        )}
        {success && assets.check && (
          <Image
            source={assets.check}
            style={{
              width: 12,
              height: 9,
              marginRight: sizes.s,
              tintColor: colors.success,
            }}
          />
        )}
      </Block>
    </Block>
  );
};

export default React.memo(Input);
