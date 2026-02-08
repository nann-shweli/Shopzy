
import React, { useRef } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { BANNERS } from '../../data/mockData';
import { spacing } from '../../theme/colors';

const { width } = Dimensions.get('window');

interface BannerProps {
    onIndexChange?: (index: number) => void;
}

const Banner = ({ onIndexChange }: BannerProps) => {
    const lastIndex = useRef(0);

    const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);

        if (lastIndex.current !== currentIndex) {
            lastIndex.current = currentIndex;
            if (onIndexChange) {
                onIndexChange(currentIndex);
            }
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onMomentumScrollEnd={onMomentumScrollEnd}
            >
                {BANNERS.map((banner) => (
                    <View key={banner.id} style={styles.bannerContainer}>
                        <Image source={{ uri: banner.image }} style={styles.image} resizeMode="cover" />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{banner.title}</Text>
                            <View style={styles.button}>
                                <Text style={[styles.buttonText, { color: banner.backgroundColor }]}>
                                    {banner.subtitle}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            {/* Pagination Dots could go here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 180,
        marginTop: -spacing.s, // Pull up to overlap with background
    },
    bannerContainer: {
        width: width,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        position: 'absolute',
        left: spacing.l,
        top: spacing.l,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.s,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    button: {
        backgroundColor: 'white',
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default Banner;
