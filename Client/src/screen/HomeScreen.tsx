import React, { useRef } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { Box, AspectRatio, Center, Stack, Heading, Text, HStack } from 'native-base';

const carouselRef = useRef<Carousel<any>>(null);

const img = [
  require("../assets/OIP.jpg"),
  require("../assets/Screenshot 2024-08-02 000616.png"),
  require("../assets/OIP.jpg"),
  require("../assets/OIP.jpg"),
  require("../assets/OIP.jpg"),
];

const HomeScreen: React.FC = () => {
  const handlePrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.snapToPrev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.snapToNext();
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        style={styles.wrapper}
        data={img}  
        renderItem={renderItem}
        ref={carouselRef}
        sliderWidth={300}
        itemWidth={300}
      />
      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={handlePrevious} />
        <Button title="Next" onPress={handleNext} />
      </View>
      <Box alignItems="center">
        <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700"
        }} _web={{
          shadow: 2,
          borderWidth: 0
        }} _light={{
          backgroundColor: "gray.50"
        }}>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image source={{
                uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
              }} alt="image" style={styles.image} />
            </AspectRatio>
            <Center bg="violet.500" _dark={{
              bg: "violet.400"
            }} _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs"
            }} position="absolute" bottom="0" px="3" py="1.5">
              PHOTOS
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                The Garden City
              </Heading>
              <Text fontSize="xs" _light={{
                color: "violet.500"
              }} _dark={{
                color: "violet.400"
              }} fontWeight="500" ml="-0.5" mt="-1">
                The Silicon Valley of India.
              </Text>
            </Stack>
            <Text fontWeight="400">
              Bengaluru (also called Bangalore) is the center of India's high-tech
              industry. The city is also known for its parks and nightlife.
            </Text>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }} fontWeight="400">
                  6 mins ago
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>

      <View>
        <Image source={require("../assets/OIP.jpg")} style={styles.image} />
        <Image source={require("../assets/OIP.jpg")} style={styles.image} />
        <Image source={require("../assets/OIP.jpg")} style={styles.image} />
        <Image source={require("../assets/OIP.jpg")} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  slide: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
