import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase/firebase";
import TimeSlot from "@/components/TimeSlot";

interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  reason: string;
}

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  today: "Today",
};
LocaleConfig.defaultLocale = "en";

export default function BookingScreen() {
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<BookingDetails>({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  // Generate time slots (you might want to fetch these from Firebase)
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour}:00 - ${hour + 1}:00`);
    }

    return slots;
  };

  interface Appointment {
    time: string;
  }

  const fetchBookedSlots = async (date: string): Promise<string[]> => {
    try {
      const q = query(
        collection(db, "appointments"),
        where("date", "==", date)
      );
      const querySnapshot = await getDocs(q);
      const bookedSlots: string[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Appointment;
        return data.time;
      });
      return bookedSlots;
    } catch (error) {
      console.error("Error fetching booked slots:", error);
      return [];
    }
  };

  interface DateObject {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
  }

  const handleDateSelect = async (date: DateObject): Promise<void> => {
    setSelectedDate(date.dateString);
    setSelectedSlot(null);
    setLoading(true);

    const allSlots: string[] = generateTimeSlots();
    const bookedSlots: string[] = await fetchBookedSlots(date.dateString);

    const available: string[] = allSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );
    setAvailableSlots(available);
    setLoading(false);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot || !details.name || !details.email) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), {
        ...details,
        date: selectedDate,
        time: selectedSlot,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Success", "Appointment booked successfully!");
      // Reset form
      setDetails({ name: "", email: "", phone: "", reason: "" });
      setSelectedDate("");
      setSelectedSlot(null);
    } catch (error) {
      Alert.alert("Error", "Failed to book appointment");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book a Consultation</Text>

      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#4A90E2" },
        }}
        theme={{
          selectedDayBackgroundColor: "#4A90E2",
          todayTextColor: "#4A90E2",
          arrowColor: "#4A90E2",
        }}
      />

      {selectedDate && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Available Time Slots for {selectedDate}
          </Text>

          {loading ? (
            <ActivityIndicator size="small" color="#4A90E2" />
          ) : availableSlots.length > 0 ? (
            <View style={styles.slotsContainer}>
              {availableSlots.map((slot, index) => (
                <TimeSlot
                  key={index}
                  time={slot}
                  selected={selectedSlot === slot}
                  onPress={() => setSelectedSlot(slot)}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.noSlotsText}>
              No available slots for this date
            </Text>
          )}
        </View>
      )}

      {selectedDate && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            value={details.name}
            onChangeText={(text) => setDetails({ ...details, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email *"
            value={details.email}
            onChangeText={(text) => setDetails({ ...details, email: text })}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={details.phone}
            onChangeText={(text) => setDetails({ ...details, phone: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Reason for Consultation"
            value={details.reason}
            onChangeText={(text) => setDetails({ ...details, reason: text })}
            multiline
          />
        </View>
      )}

      {/* Add the Confirm Booking button conditionally */}
      {selectedSlot && (
        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#555",
  },
  noSlotsText: {
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginTop: 10,
    height: 100,
    textAlignVertical: "top",
  },
  bookButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  bookButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
