export type RootStackParamList = {
    Register: undefined;
    Login: undefined;
    Home: undefined;
    Verify: { email: string };
    ForgotPassword: undefined;
    ForgotOTP: { email: string };
    ResetPassword: { token: string };
    ProductManagerScreen: undefined;
    ListProduct: { id: string };
    ProductDetail: { id: string };
    Cart: undefined;
    Order: undefined;
    QrScreen: { url: string };
};