import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase/firebase";
import AppointmentCard from "@/components/AppointmentCard";

interface Appointment {
  id: string;
  date: string;
  time: string;
  reason: string;
  status: "confirmed" | "cancelled";
  name: string;
  email: string;
  phone: string;
}

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        const appointmentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Appointment[];

        // Sort appointments
        appointmentsData.sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time.split(" - ")[0]}`);
          const dateB = new Date(`${b.date} ${b.time.split(" - ")[0]}`);
          return dateA.getTime() - dateB.getTime();
        });

        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await deleteDoc(doc(db, "appointments", appointmentId));
      setAppointments((prev) => prev.filter((app) => app.id !== appointmentId));
      Alert.alert("Success", "Appointment cancelled successfully");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      Alert.alert("Error", "Failed to cancel appointment");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Appointments</Text>

      {appointments.length === 0 ? (
        <Text style={styles.emptyText}>No appointments found</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AppointmentCard
              appointment={item}
              onCancel={() => handleCancelAppointment(item.id)}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  listContainer: {
    paddingBottom: 20,
  },
});
