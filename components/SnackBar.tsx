import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

interface ISnackBarProps {
  text: string;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onDismiss?: Function;
  duration: number;
  action?: {
    text: string;
    textColor?: string;
    onPress: (event: GestureResponderEvent) => void;
  };
}

const SnackBar: FC<ISnackBarProps> = ({
  action,
  setVisible,
  visible,
  duration = 3000,
  text,
  onDismiss,
}) => {
  const upAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [touchable, setTouchable] = useState(false);

  useEffect(() => {
    let timer;
    let innerTimer;
    if (visible) {
      fadeIn();
      setTouchable(true);
      timer = setTimeout(() => {
        fadeOut();
        innerTimer = setTimeout(() => {
          setVisible(false);
        }, 500);
      }, duration);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [visible]);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(upAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    if (onDismiss) {
      onDismiss();
    }
    Animated.timing(upAnim, {
      toValue: 50,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  if (!visible) {
    return <></>;
  }

  return (
    <SafeAreaView
      style={tw`w-full px-5 items-center absolute left-0 top-0 h-full`}
    >
      <Animated.View
        style={[
          { transform: [{ translateY: upAnim }], opacity: fadeAnim },
          tw`px-4 py-3 rounded border border-black absolute bottom-8 bg-white flex flex-row justify-between items-center w-full`,
        ]}
      >
        <Text style={tw`flex-1`}>{text}</Text>
        {action && (
          <TouchableOpacity
            onPress={action.onPress}
            style={tw`bg-gray-100 py-2 px-3 rounded`}
          >
            <Text style={tw`${action.textColor} font-bold`}>{action.text}</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

export default SnackBar;
