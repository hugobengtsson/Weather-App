import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

interface ModalProps {
  route: any,
}



export default function ModalScreen({ route }: ModalProps) {
  const [loading, setLoading] = useState<boolean>(false);


  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{route.params.name}</Text>
        <Text style={styles.titleText}>Spara dina favoritorter så att du snabbt kan kolla vädret på dina smultronställen</Text>
        <View style={styles.inputContainer}>
          <TextInput 
          style={styles.input} 
          placeholder="Namn på objekt"
          />
        </View>
        <TouchableOpacity onPress={() => setLoading(true)} style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text>Spara!</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{...styles.loader, display: loading ? "flex": "none",}}>
      <ActivityIndicator
        size="large"
        color="black"
        animating={loading}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: "5%",
  }, title: {
    fontSize: 32,
    fontWeight: "bold",
  }, titleText: {
    width: "80%",
    marginTop: "2%",
    textAlign: "center",
  }, inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: "lightgray",
    width: "90%",
    height: "8%",
    marginTop: "5%",
    justifyContent:"space-between",
    alignItems: 'center',
    borderRadius: 10,
    padding: '3%',
  }, input: {
    fontSize: 20,
    width: "100%",
  }, buttonContainer: {
    marginTop: "3%",
  }, button: {
    backgroundColor: "lightgray",
    padding: "3%",
    borderRadius: 10,
  }, loader: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(200, 200, 200, 0.6)",
  }
});
