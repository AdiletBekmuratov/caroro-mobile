import { ActivityIndicator, View } from 'react-native';
import tw from 'twrnc';

const Spinner = () => (
  <View
    style={tw`flex-1 justify-center items-center absolute inset-0 bg-gray-100 z-50`}
  >
    <ActivityIndicator size="large" color="#000000" />
  </View>
);

export default Spinner;
