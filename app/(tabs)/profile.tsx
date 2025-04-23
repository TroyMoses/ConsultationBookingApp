import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultation App</Text>
      <Text style={styles.info}>
        This app allows you to book consultations and manage your appointments.
      </Text>
      <Text style={styles.contact}>
        Contact us: support@consultationapp.com
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  info: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 15,
  },
  contact: {
    fontSize: 16,
    color: "#4A90E2",
    fontWeight: "500",
  },
});
