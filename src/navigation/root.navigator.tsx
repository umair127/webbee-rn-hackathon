import { createDrawerNavigator } from "@react-navigation/drawer";

import { HomeScreen } from "../screens/common/home.screen";
import { MachineCategoryListScreen } from "../screens/machines/category-list.screen";
import { MachineCategoryItemListScreen } from "../screens/machines/category-item-list.screen";

const Drawer = createDrawerNavigator();

export const RootDrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen
      name="MachineCategoryList"
      component={MachineCategoryListScreen}
    />
    <Drawer.Screen
      name="MachineCategoryItemList"
      component={MachineCategoryItemListScreen}
    />
  </Drawer.Navigator>
);
