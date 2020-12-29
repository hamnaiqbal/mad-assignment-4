import React, { useEffect, useState } from 'react';
import { CONSTANTS } from '../constants';
import { ActivityIndicator, View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

export function CountryList({navigator, props}) {
  const [isLoading, setIsLoading] = useState(true);
  const [countriesList, setCountriesList] = useState([]);

  // TODO ADD THE SEARCH FUNCTIONALITY IF TIME LEFT

    

  const getCountriesList = () => {
    return fetch(CONSTANTS.ALL_COUNTRIES_NAMES, {
      method: 'GET',
      headers: CONSTANTS.WORLD_POP_HEADERS,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setIsLoading(false);
        setCountriesList(responseJson.body.countries.sort());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCountriesList();
  }, []);

  if (!isLoading) {
    return (
      <View style={styles.countryList}>
      <FlatList
      data={countriesList} 
      renderItem={(item)=>{
        return(
          <TouchableOpacity style={styles.singleItem} onPress={()=>{console.log(navigator)}}>
            <Text style={styles.itemText}>
              {item.item}
            </Text>
            <Image source="https://www.flaticon.com/svg/static/icons/svg/318/318476.svg"/>
          </TouchableOpacity>
        )
      }}
      />      
      </View>
    );
  } else {
    return <ActivityIndicator />;
  }
}


const styles = StyleSheet.create({
  countryList: {
    backgroundColor: '#e5e5e5'
  },
  singleItem: {
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: 'white',
    fontSize: 20,
    borderRadius: 2,
    shadowColor: '#a5a5a5',
    shadowOffset: { width: 0, height: 0 },    
    shadowOpacity: 0.4,
    shadowRadius: 5,  
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemText: {
    fontSize: 15,
    fontWeight: 500
  },
  
});
