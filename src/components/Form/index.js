import React, { useState } from "react";
import { View, TextInput, Text, Button, TouchableOpacity } from "react-native";
import { Result } from "./result";
import { styles } from "./styles";

export function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular Imc");

  function imcCalculator(height, weight) {
    return setImc((weight / (height * height)).toFixed(2));
  }

  function validatorImc() {
    if (weight != null && height != null) {
      imcCalculator(height, weight);
      setHeight(null);
      setWeight(null);
      setMessageImc("Seu imc é igual a:");
      setTextButton("Calcular Novamente");
      return;
    }

    setImc(null);
    setTextButton("Calcular");
    setMessageImc("Preencha o peso e a altura");
  }

  return (
    <View style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex ... 1.75"
          keyboardType="numeric"
          onChangeText={setHeight}
          value={height}
          keyboardAppearance="dark"
        />
        <Text style={styles.formLabel}>Peso</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex ... 75.3"
          keyboardType="numeric"
          onChangeText={setWeight}
          value={weight}
          keyboardAppearance="dark"
        />
        <TouchableOpacity onPress={() => validatorImc()} style={styles.buttonCalculator}>
          <Text style={styles.textButtonCalculator}>{textButton}</Text>
        </TouchableOpacity>
      </View>
      <Result messageResultImc={messageImc} resultImc={imc} />
    </View>
  );
}
