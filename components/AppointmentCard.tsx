import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../constants/Colors";

interface AppointmentCardProps {
  appointment: {
    id: string;
    date: string;
    time: string;
    reason: string;
    status: "confirmed" | "cancelled";
    name: string;
  };
  onCancel?: () => void;
}

export default function AppointmentCard({ appointment, onCancel }: AppointmentCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{appointment.name}</Text>
        <Text style={styles.time}>{appointment.time}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{appointment.date}</Text>
      </View>
      {appointment.reason && (
        <Text style={styles.reason}>Reason: {appointment.reason}</Text>
      )}

      <View style={styles.footer}>
        <View style={styles.statusContainer}>
          <Ionicons
            name={
              appointment.status === "confirmed"
                ? "checkmark-circle"
                : "close-circle"
            }
            color={appointment.status === "confirmed" ? "#4A90E2" : "#FF4444"}
            size={20}
          />
          <Text
            style={[
              styles.status,
              {
                color:
                  appointment.status === "confirmed" ? "#4A90E2" : "#FF4444",
              },
            ]}
          >
            {appointment.status}
          </Text>
        </View>

        {onCancel && (
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Ionicons name="trash-outline" size={20} color="#FF4444" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateContainer: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  time: {
    fontSize: 16,
    color: "#4A90E2",
  },
  reason: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  statusContainer: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusConfirmed: {
    backgroundColor: "#e3f2fd",
    color: "#4A90E2",
  },
  statusCancelled: {
    backgroundColor: "#ffebee",
    color: "#ff4444",
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#ff4444",
    marginLeft: 5,
    fontWeight: "600",
  },
});
