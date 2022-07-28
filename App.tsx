import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Clients } from "./models/Clients";
import { Journal } from "./models/Journal";
import { JournalLine } from "./models/JournalLine";

export default function App() {
  const client = new Clients("Juan", "Perez");
  const journal = new Journal(new Date(), client, "Venta de computadora");

  journal.addLine({
    code: "110505",
    account: "Caja",
    amount: 2200,
    operation: "D",
  });

  journal.addLine({
    code: "110505",
    account: "Caja",
    amount: 2200,
    operation: "C",
  });

  journal.addLine({
    code: "110505",
    account: "Caja",
    amount: 1200,
    operation: "D",
  });

  journal.addLine({
    code: "110505",
    account: "Caja",
    amount: 1200,
    operation: "C",
  });

  console.log(client);
  console.log(journal);
  console.log(" Total Debit:::::", journal.getTotalDebit());
  console.log(" Total Credit:::::", journal.getTotalCredit());
  console.log("Los totales son iguales?: ", journal.validateTotalsAreEquals());
  console.log(journal.deleteLine() === undefined);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to sta!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dedede",
    alignItems: "center",
    justifyContent: "center",
  },
});
