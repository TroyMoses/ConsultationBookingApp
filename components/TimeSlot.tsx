import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface TimeSlotProps {
  time: string;
  selected: boolean;
  onPress: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.slot, selected && styles.selectedSlot]}
      onPress={onPress}
    >
      <Text style={[styles.slotText, selected && styles.selectedSlotText]}>
        {time}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  slot: {
    width: '48%',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
  },
  selectedSlot: {
    backgroundColor: Colors.primary,
  },
  slotText: {
    color: Colors.text,
    fontSize: 14,
  },
  selectedSlotText: {
    color: 'white',
  },
});

export default TimeSlot;