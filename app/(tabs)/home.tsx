import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "../../constants/typography";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Hero Section */}
          <LinearGradient
            colors={["#4A90E2", "#5BAAFF"]}
            style={styles.heroContainer}
          >
            <ImageBackground
              source={require("../../assets/images/hero-pattern.png")}
              style={styles.heroBackground}
              imageStyle={{ opacity: 0.1 }}
            >
              <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>LEGACY CONSULTANT</Text>
                <Text style={styles.heroSubtitle}>
                  Book expert consultations anytime, anywhere!
                </Text>

                <Link href="/book" asChild>
                  <TouchableOpacity style={styles.ctaButton}>
                    <Text style={styles.ctaText}>Book Now</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                  </TouchableOpacity>
                </Link>
              </View>
            </ImageBackground>
          </LinearGradient>

          {/* Features Grid */}
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Why Choose Us</Text>

            <View style={styles.featuresGrid}>
              {/* Feature 1 */}
              <View style={styles.featureCard}>
                <Ionicons name="time-outline" size={32} color="#4A90E2" />
                <Text style={styles.featureTitle}>24/7 Availability</Text>
                <Text style={styles.featureText}>
                  Book appointments anytime that suits you
                </Text>
              </View>

              {/* Feature 2 */}
              <View style={styles.featureCard}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={32}
                  color="#4A90E2"
                />
                <Text style={styles.featureTitle}>Verified Experts</Text>
                <Text style={styles.featureText}>
                  Qualified and experienced professionals
                </Text>
              </View>

              {/* Feature 3 */}
              <View style={styles.featureCard}>
                <Ionicons name="videocam-outline" size={32} color="#4A90E2" />
                <Text style={styles.featureTitle}>Virtual Sessions</Text>
                <Text style={styles.featureText}>
                  Connect from the comfort of your home
                </Text>
              </View>

              {/* Feature 4 */}
              <View style={styles.featureCard}>
                <Ionicons
                  name="notifications-outline"
                  size={32}
                  color="#4A90E2"
                />
                <Text style={styles.featureTitle}>Smart Reminders</Text>
                <Text style={styles.featureText}>
                  Never miss an appointment
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  heroContainer: {
    height: 320,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
  },
  heroBackground: {
    flex: 1,
    padding: 24,
  },
  heroContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  heroTitle: {
    fontSize: 32,
    color: "white",
    fontFamily: typography.bold,
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.9)",
    fontFamily: typography.medium,
    textAlign: "center",
    marginBottom: 32,
  },
  ctaButton: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: "center",
    gap: 10,
  },
  ctaText: {
    color: "white",
    fontSize: 18,
    fontFamily: typography.semiBold,
  },
  featuresContainer: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: typography.bold,
    color: "#1E293B",
    marginBottom: 24,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  featureCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: typography.semiBold,
    color: "#1E293B",
    marginVertical: 12,
    textAlign: "center",
  },
  featureText: {
    fontSize: 14,
    color: "#64748B",
    fontFamily: typography.regular,
    textAlign: "center",
    lineHeight: 20,
  },
});
