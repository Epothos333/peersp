import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export function LoadMore() {
  return <View style={styles.container}>
    <ActivityIndicator style={styles.activity} />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activity: {
    height: 48,
    width: 48,
  },
});
