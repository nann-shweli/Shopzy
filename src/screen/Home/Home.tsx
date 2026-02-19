import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import Header from '../../component/home/Header';
import CategoryTabs from '../../component/home/CategoryTabs';
import Banner from '../../component/home/Banner';
import ServiceFeatures from '../../component/home/ServiceFeatures';
import CircleCategoryList from '../../component/home/CircleCategoryList';
import ProductFeed from '../../component/home/ProductFeed';
import { colors } from '../../theme/colors';
import { BANNERS } from '../../data/mockData';

const Home = () => {
  const [headerColor, setHeaderColor] = useState(BANNERS[0]?.backgroundColor || colors.primary);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const onBannerIndexChange = (index: number) => {
    const color = BANNERS[index]?.backgroundColor;
    if (color) {
      setHeaderColor(color);
    }
  };

  return (
    <View style={styles.container}>
      <Header backgroundColor={headerColor} />
      <CategoryTabs
        backgroundColor={headerColor}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ScrollView bounces={false} style={styles.content}>
        <View style={[styles.redBackgroundFix, { backgroundColor: headerColor }]} />
        <Banner onIndexChange={onBannerIndexChange} />
        <ServiceFeatures />
        <CircleCategoryList />
        <ProductFeed filterCategory={selectedCategory === 'All' ? undefined : selectedCategory.toLowerCase()} />
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sign In Sticky Banner */}
      <View style={styles.signInBanner}>
        <View style={styles.signInTextContainer}>
          <Text style={styles.signInText}>Sign in and enjoy more</Text>
        </View>
        <View style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  redBackgroundFix: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: colors.primary,
  },
  signInBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  signInTextContainer: {
    flex: 1,
  },
  signInText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  signInButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Home;
