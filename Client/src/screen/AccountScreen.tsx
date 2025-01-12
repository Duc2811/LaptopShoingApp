import { useDispatch } from "react-redux";
import { View, Text, KeyboardAvoidingView, Pressable, } from "react-native";
import { doLogout } from "../store/reducer/userReducer";
import { userProfile } from "../services/client/ApiServices";
import React, { useEffect, useState } from "react";
import ProfileModal from "../modal/ProfileModal"
import { StackNavigationProp } from "@react-navigation/stack";

interface Profile {
    email: string;
    name: string;
    phone: string;
    address: string;
    image: string;
}

type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Register: undefined;
    Setting: undefined
};

type AccountNavigationProp = StackNavigationProp<RootStackParamList, "Setting">;

interface Props {
    navigation: AccountNavigationProp;
}


const AccountScreen: React.FC<Props> = ({ navigation }) => {

    const dispatch = useDispatch();;
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);

    const getProfile = async () => {
        try {
            const response = await userProfile();
            if (response.data.code === 401 && response.data) {
                navigation.navigate('Login');
            } else {
                if (response.data?.code === 200 && response.data) {
                    setProfile(response);
                }
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }

    }
    const handleLogout = () => {
        dispatch(doLogout());
    }

    useEffect(() => {
        getProfile();
    }, []);
    return (
        <View>
            <Text>Account Screen</Text>
            
        </View>
    )

}
export default AccountScreen;