
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ViewStyle } from 'react-native';
import { colors, spacing } from '../../../theme/colors';

interface HeaderProps {
    backgroundColor?: string;
}

const Header = ({ backgroundColor = colors.primary }: HeaderProps) => {
    // If background is white, icons should be black ideally, but for now keeping as is per screenshot which has white bg in Category.
    // Screenshot 2 shows header with white background. Search bar has grey border? And icons are black.
    // We need to adjust icon colors based on background color.
    const isWhiteBg = backgroundColor === 'white' || backgroundColor === '#FFFFFF';
    const iconColor = isWhiteBg ? 'black' : 'white';

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
            <View style={[styles.container, { backgroundColor }]}>
                {/* Top Row: Icons and Search */}
                <View style={styles.topRow}>
                    <TouchableOpacity style={styles.iconButton}>
                        {/* Mail Icon Placeholder */}
                        <View style={styles.iconBox}><Text style={[styles.iconText, { color: iconColor }]}>✉️</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        {/* Calendar Icon Placeholder */}
                        <View style={styles.iconBox}><Text style={[styles.iconText, { color: iconColor }]}>📅</Text></View>
                    </TouchableOpacity>

                    <View style={[styles.searchContainer, isWhiteBg && { borderWidth: 1, borderColor: '#eee' }]}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="New Balance 327"
                            placeholderTextColor="#999"
                        />
                        <View style={styles.searchIcons}>
                            <TouchableOpacity><Text>📷</Text></TouchableOpacity>
                            <View style={[styles.searchButton, { backgroundColor: isWhiteBg ? 'black' : backgroundColor }]}>
                                {/* Only if bg is white, search button might need contrast, screenshot has black search icon circle? 
                                    Actually screenshot shows just a search icon glass. 
                                    Wait, screenshot 2 (Category) search bar looks like outline. 
                                    My searchButton is a container. 
                                    Let's just make the search button background match primary or black if header is clear.
                                 */}
                                <Text style={{ color: 'white' }}>🔍</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.iconButton}>
                        {/* Heart Icon Placeholder */}
                        <View style={styles.iconBox}><Text style={[styles.iconText, { color: iconColor }]}>❤️</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#eee', opacity: isWhiteBg ? 1 : 0 }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        // backgroundColor set via prop
    },
    container: {
        paddingHorizontal: spacing.s,
        paddingBottom: spacing.s,
        // backgroundColor set via prop
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.s,
    },
    iconButton: {
        padding: spacing.xs,
    },
    iconBox: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        color: 'white',
        fontSize: 20
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 4,
        alignItems: 'center',
        paddingLeft: spacing.s,
        height: 36,
        marginHorizontal: spacing.xs,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 0,
        fontSize: 14,
        color: colors.text,
    },
    searchIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingRight: 4
    },
    searchButton: {
        borderRadius: 4,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Header;
