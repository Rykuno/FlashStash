import { Text } from 'react-native';
import styled from 'styled-components';
import Fonts from './fonts';

const MainText = styled.Text`
  fontFamily: ${Fonts.MAIN};
`;

const AltText = styled.Text`
  fontFamily: ${Fonts.ALT};
`;

export default {
  MainText,
  AltText
};
