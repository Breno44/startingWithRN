import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";

import { styles } from "./styles";

export function Result(props) {
  const onShare = async () => {
    const result = await Share.share({
      message: "Meu imc hojr é: " + props.resultImc,
    });
  };

  return (
    <View style={styles.resultImc}>
      <Text style={styles.information}>{props.messageResultImc}</Text>
      <Text style={styles.numberImc}>{props.resultImc}</Text>
      <View style={styles.boxShareButton}>
        <TouchableOpacity onPress={onShare} style={styles.shared}>
          <Text style={styles.sharedText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
