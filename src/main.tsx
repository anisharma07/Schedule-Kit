import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Spacer from './components/Spacer';
import Card from './components/Card';

const MainApp = ({}) => {
  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Spacer />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
    paddingTop: 20,
  },
});

export default MainApp;
