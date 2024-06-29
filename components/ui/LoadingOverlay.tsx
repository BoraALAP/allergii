// LoadingOverlay.js

import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { Modal, View, ActivityIndicator, StyleSheet } from "react-native";
import styled from "styled-components";

//make visible prop a boolean type
const LoadingOverlay = ({ visible }: { visible: boolean }) => {
  const animation = useRef(null);
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={() => {}}
    >
      <ModalBackground>
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
      </ModalBackground>
    </Modal>
  );
};

const ModalBackground = styled(View)`
  flex: 1;
  align-items: "center";
  justify-content: "center";
  background-color: "rgba(0, 0, 0, 0.5)";
`;

export default LoadingOverlay;
