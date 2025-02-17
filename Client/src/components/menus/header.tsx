import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { doLogout } from "@/src/store/reducer/userReducer";

type RootStackParamList = {
  Home: undefined;
}

interface HeaderProps {
  isCart: boolean;
}

const Header: React.FC<HeaderProps> = ({ isCart }) => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const handleBack = () => {
    navigation.navigate("Home");
  };

  const handleLogout = () => {
    dispatch(doLogout());
    navigation.navigate("Home");
  };

  return (
    <View style={styles.header}>
      {isCart ? (
        <TouchableOpacity
          style={styles.appDrawerContainer}
          onPress={handleBack}
        >
          <Image
            style={styles.appBackIcon}
          />
          <Text>Back</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.appDrawerContainer}>
          <Image
            style={styles.appDrawerIcon}
          />
          <Text>App</Text>
        </View>
      )}

      {isCart ? <Text style={{ fontSize: 20, fontWeight: "bold" }}>My Cart</Text> : null}
      <View>
        <Image
          style={styles.profileImage}
        />
        <Text>Profile</Text>
      </View>


      <TouchableOpacity onPress={handleLogout}>
        <View>
          <Image style={styles.profileImage} />
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>


    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  appDrawerContainer: {
    backgroundColor: "white",
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  appDrawerIcon: {
    height: 30,
    width: 30,
  },
  appBackIcon: {
    height: 24,
    width: 24,
    marginLeft: 10,
  },
  profileImage: {
    height: 44,
    width: 44,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});