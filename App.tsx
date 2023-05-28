import { NativeBaseProvider, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "react-native-gesture-handler";

import { store, persistor } from "./src/redux";
import { RootDrawerNavigator } from "./src/navigation/root.navigator";

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <NavigationContainer>
            <RootDrawerNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}
