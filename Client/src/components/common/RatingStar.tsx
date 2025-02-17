import { Star } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

interface RatingStarProps {
  rating: number;
  handleRatingChange?: (star: number) => void;
}

const RatingStar: React.FC<RatingStarProps> = ({ rating, handleRatingChange }) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          style={[styles.starButton, star <= rating ? styles.activeStar : styles.inactiveStar]}
          onPress={() => handleRatingChange?.(star)}
        >
          <Star
            size={24}
            color={star <= rating ? "#FFD700" : "#000"}
            fill={star <= rating ? "#FFD700" : "none"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  starButton: {
    padding: 8,
    borderRadius: 50,
  },
  activeStar: {
    backgroundColor: "black",
  },
  inactiveStar: {
    backgroundColor: "transparent",
  },
});

export default RatingStar;
