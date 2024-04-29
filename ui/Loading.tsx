import React, { useEffect, useRef } from "react";

import { PageView } from "@/ui/Containers";
import LottieView from "lottie-react-native";
import { View } from "react-native";

const Loading = () => {
  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  return (
    <PageView center>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("@/assets/animations/loading.json")}
      />
    </PageView>
  );
};

export default Loading;
