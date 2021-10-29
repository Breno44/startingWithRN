import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  Vibration,
  Pressable,
  Keyboard,
  FlatList,
} from "react-native";
import { Result } from "./result";
import { styles } from "./styles";

export function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular Imc");
  const [errorMessage, setErrorMessage] = useState(null);
  const [imcList, setImcList] = useState([]);

  function imcCalculator(height, weight) {
    let heightFormat = height.replace(",", ".");
    let heightDefinitive = heightFormat.replace("-", "");
    let weightFormat = height.replace(",", ".");
    let weightDefinitive = weightFormat.replace("-", "");
    const totalImc = (weightDefinitive / (heightDefinitive * heightDefinitive)).toFixed(2);
    setImcList((arr) => [...arr, { id: new Date().getDate(), imc: totalImc }]);
    setImc(totalImc);
  }

  function verificationImc() {
    if (imc == null) {
      Vibration.vibrate();
      setErrorMessage("Campo Obrigatório*");
    }
  }

  function validatorImc() {
    if (weight != null && height != null && weight != 0 && height != 0) {
      imcCalculator(height, weight);
      setHeight(null);
      setWeight(null);
      setErrorMessage(null);
      setTextButton("Calcular Novamente");
      setMessageImc(null);
      return;
    } else {
      setImc(null);
      setTextButton("Calcular");
      setMessageImc("Preencha o peso e a altura");
      verificationImc();
    }
  }

  return (
    <View style={styles.formContext}>
      {imc == null ? (
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex ... 1.75"
            keyboardType="numeric"
            onChangeText={setHeight}
            value={height}
            keyboardAppearance="dark"
          />
          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
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
        </Pressable>
      ) : (
        <View style={styles.exhibitionResultImc}>
          <Result messageResultImc={messageImc} resultImc={imc} />
          <TouchableOpacity onPress={() => validatorImc()} style={styles.buttonCalculator}>
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        showVerticalScrollIndicator={false}
        style={styles.listImc}
        data={imcList.reverse()}
        renderItem={({ item }) => {
          return (
            <Text style={styles.resultImcItem}>
              <Text style={styles.textResultItemList}>Resultado Imc = </Text>
              {item.imc}
            </Text>
          );
        }}
        keyExtractor={(item) => {
          item.id;
        }}
      />
    </View>
  );
}
