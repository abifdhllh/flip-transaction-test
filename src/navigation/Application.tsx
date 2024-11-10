import type { RootStackParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import { Detail, List, Startup } from '@/screens';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const { variant, navigationTheme, layout } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant}>
          <Stack.Screen
            component={Startup}
            name={Paths.Startup}
            options={{ title: 'Startup', headerShown: false }}
          />
          <Stack.Screen
            component={List}
            name={Paths.List}
            options={{ title: 'Transaction List' }}
          />
          <Stack.Screen
            component={Detail}
            name={Paths.Detail}
            options={{ title: 'Transaction Detail' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
