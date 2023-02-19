import { ActivityIndicator, View } from "react-native";
import tw from "twrnc";

const Spinner = () => (
  <View style={tw`flex-1 justify-center items-center`}>
    <ActivityIndicator size="large" color="#52AEF3" />
  </View>
);

export default Spinner;
