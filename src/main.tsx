import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Spacer from './components/Spacer';
import Card from './components/Card';

const MainApp = ({}) => {
  return (
    <>
      <View style={styles.header}></View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ScrollView>
      <Spacer />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    width: '100%',
    marginBottom: 20,

    backgroundColor: '#27272A',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },
});

export default MainApp;
