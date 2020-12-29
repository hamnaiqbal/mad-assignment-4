import React, { useEffect, useState } from "react";
import { CONSTANTS } from "./constants";
import { ActivityIndicator, View, Text, StyleSheet, SafeAreaView, Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import {WorldStats} from './components/WorldStats'
import {CountryList} from './components/CountriesList'
import {FavoriteCountries} from './components/FavoritesList'
import {StatsByCountry} from './components/StatsByCountry'



export default function App() {
  const Drawer = createDrawerNavigator();

  return (

    <SafeAreaView>
    <View>
      <View style={styles.header}>
      </View>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="WorldStats">
          <Drawer.Screen name="WorldStats" component={WorldStats} />
          <Drawer.Screen name="Countries List" component={CountryList} />
          <Drawer.Screen name="Stats By Country" component={StatsByCountry} />
          <Drawer.Screen
            name="Favorite Countries"
            component={FavoriteCountries}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  
    </SafeAreaView>
    );

}
const styles = StyleSheet.create({
  header: {

  }
});