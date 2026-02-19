import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import Header from '../../component/molecules/home/Header';
import CategoryTabs from '../../component/molecules/home/CategoryTabs';
import Banner from '../../component/molecules/home/Banner';
import ServiceFeatures from '../../component/molecules/home/ServiceFeatures';
import CircleCategoryList from '../../component/molecules/home/CircleCategoryList';
import ProductFeed from '../../component/molecules/home/ProductFeed';
import { colors } from '../../theme/colors';
import { BANNERS } from '../../data/mockData';
import SignInBanner from '../../component/molecules/home/SignInBanner';

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
        <View style={styles.viewStyle} />
      </ScrollView>

      <SignInBanner />
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
  viewStyle: { height: 100 }
});

export default Home;
