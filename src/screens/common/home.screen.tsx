import { Alert } from "react-native";
import {
  VStack,
  HStack,
  Button,
  Text,
  Box,
  ScrollView,
  Flex,
  useMediaQuery,
} from "native-base";

import { MachineCard } from "../../components/machine-card.component";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { addMachineToCategory } from "../../redux/machineSlice";
import { Category } from "../../interfaces/machine";

export const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.machine);

  const [isSmallScreen] = useMediaQuery({
    minWidth: 280,
    maxWidth: 768,
  });

  const addMachine = (category: Category) => {
    if (category.fields.length > 0) {
      dispatch(addMachineToCategory({ category: category.id }));
    } else {
      Alert.alert(
        "Missing fields",
        "Please add some fields first in the category"
      );
    }
  };

  return (
    <VStack flex={1} p="2" space="4" safeAreaBottom>
      {categories.length > 0 ? (
        <ScrollView>
          {categories.map((c, i) => {
            return (
              <VStack key={i} p="2" space="4">
                <HStack
                  space="4"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text fontSize="lg" bold>
                    {c.name || "Untitled Category"}
                  </Text>
                  <Button onPress={() => addMachine(c)}>Add new Item</Button>
                </HStack>

                <Flex
                  direction={isSmallScreen ? "column" : "row"}
                  flexWrap="wrap"
                  flex={1}
                >
                  {c.machines.length > 0 ? (
                    <>
                      {c.machines.map((m, idx) => (
                        <Box key={idx} w={{ base: "100%", md: "50%" }}>
                          <MachineCard
                            machine={m}
                            fields={c.fields}
                            categoryId={c.id}
                          />
                        </Box>
                      ))}
                    </>
                  ) : (
                    <Box flex={1} justifyContent="center" alignItems="center">
                      <Text alignSelf="center">No items available</Text>
                    </Box>
                  )}
                </Flex>
              </VStack>
            );
          })}
        </ScrollView>
      ) : (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Button onPress={() => navigation.jumpTo("MachineCategoryList")}>
            Add Category
          </Button>
        </Box>
      )}
    </VStack>
  );
};
