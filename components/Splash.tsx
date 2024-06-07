import { SplashLogo } from "@/assets/splashLogo";
import { global } from "@/constants/Theme";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import styled from "styled-components";

const Splash = () => {
  return (
    <Container
      colors={[global.colors.splash.start, global.colors.splash.end]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* <SplashLogo /> */}
      <LottieView
        source={require("../assets/animations/logo.json")}
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
        }}
      />
    </Container>
  );
};

const Container = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default Splash;
