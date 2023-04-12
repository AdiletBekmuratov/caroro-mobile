import { ArticleScreen, ArticlesScreen } from '@/screens/Articles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ArticlesStackParamList } from '../types';

const Stack = createNativeStackNavigator<ArticlesStackParamList>();

export default function ArticlesStack() {
  return (
    <Stack.Navigator initialRouteName="ArticlesScreen">
      <Stack.Screen
        name="ArticlesScreen"
        options={{ title: 'Новости' }}
        component={ArticlesScreen}
      />
      <Stack.Screen
        name="ArticleScreen"
        component={ArticleScreen}
        options={({ route }) => ({ title: route.params.article.title })}
      />
    </Stack.Navigator>
  );
}
