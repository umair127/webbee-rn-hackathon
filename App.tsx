import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import "react-native-gesture-handler";

import { store } from "./src/redux";
import { RootDrawerNavigator } from "./src/navigation/root.navigator";

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <RootDrawerNavigator />
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
