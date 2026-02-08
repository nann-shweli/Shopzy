import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"; import { NavigationContainer } from '@react-navigation/native';

import AppNavigation from './navigation/AppNavigation';

function App() {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
