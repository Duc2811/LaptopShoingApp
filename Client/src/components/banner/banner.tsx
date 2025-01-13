import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-x-carousel';
import { BannerData } from '../../utils/BannerData';

const width = Dimensions.get('window').width;

const Banner: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const renderItem = (data: any) => {
        return (
            <View key={data.coverImageUri} style={styles.cardContainer}>
                <Pressable onPress={() => alert(data._id)}>
                    <View style={styles.cardWrapper}>
                        <Image style={styles.card} source={{ uri: data.coverImageUri }} />
                        <View
                            style={[
                                styles.cornerLabel,
                                { backgroundColor: data.cornerLabelColor },
                            ]}
                        >
                            <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Carousel
                renderItem={renderItem}
                data={BannerData}
                loop
                autoplay
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width,
    },
    cardWrapper: {
        overflow: 'hidden',
    },
    card: {
        width: width * 1,
        height: width * 0.4,
    },
    cornerLabel: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderTopLeftRadius: 8,
    },
    cornerLabelText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
    },
});

export default Banner;
