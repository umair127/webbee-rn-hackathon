import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

import { HomeScreen } from "../screens/common/home.screen";
import { MachineCategoryListScreen } from "../screens/machines/category-list.screen";
import { MachineCategoryItemListScreen } from "../screens/machines/category-item-list.screen";
import { useAppSelector } from "../hooks";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { categories } = useAppSelector((state) => state.machine);

  const { state } = props;
  const { routes, index } = state;
  const focusedRoute: any = routes[index];

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        focused={focusedRoute.name === "Home"}
        onPress={() => props.navigation.jumpTo("Home")}
      />
      <DrawerItem
        label="Manage Categories"
        focused={focusedRoute.name === "MachineCategoryList"}
        onPress={() => props.navigation.jumpTo("MachineCategoryList")}
      />
      {categories.map((c, i) => (
        <DrawerItem
          key={i}
          label={!c.name ? "Untitled Category" : c.name}
          focused={focusedRoute.params?.category === c.id}
          onPress={() =>
            props.navigation.jumpTo("MachineCategoryItemList", {
              category: c.id,
            })
          }
        />
      ))}
    </DrawerContentScrollView>
  );
};

export const RootDrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen
      name="MachineCategoryList"
      component={MachineCategoryListScreen}
      options={{title: "Manage Categories"}}
    />
    <Drawer.Screen
      name="MachineCategoryItemList"
      component={MachineCategoryItemListScreen}
      options={{title: "Details"}}
    />
  </Drawer.Navigator>
);
