import React, { useEffect, useState } from "react";
import { CONSTANTS } from "../constants";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";


export function StatsByCountry(props) {

  const [casesLoaded, setCasesLoaded] = useState(false);
  const [popLoaded, setPopLoaded] = useState(false);

  const [countryCases, setCountryCases] = useState({});
  const [countryPopulation, setPopulation] = useState(0)

  let countryName = props.cName ? props.cName : 'italy';


  const getData = () => {
    fetch(`${CONSTANTS.COVID_API}/country/?name=${countryName}`, {
      method: "GET",
      headers: CONSTANTS.COVID_HEADERS,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setCasesLoaded(true);
        console.log(responseJson);
        setCountryCases(responseJson[0]);
      })
      .catch((error) => {
        console.error(error);
      });


    fetch(`${CONSTANTS.COUNTRY_POP_API}Mexico`, {
      method: "GET",
      headers: CONSTANTS.WORLD_POP_HEADERS,
    })
      .then((response)=> response.json())
      .then((responseJson) => {
        setPopLoaded(true);
        setCountryCases(responseJson.body.population);
      })
      .catch((error) => {
        setPopLoaded(true);
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (!casesLoaded || !popLoaded) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading Data from JSON Placeholder API ...</Text>
        </View>
      );
    }
    return (
      <View style={styles.bodyContainer}>
      <View style={styles.itemContainer}>

        <View style={styles.item}>
          <Text style={[styles.itemHeading, styles.countryName]}>{countryCases.country}</Text>
        </View>


        <View style={styles.item}>
          <Text style={styles.itemHeading}>Confirmed</Text>
          <View style={styles.itemNumbers}>
            <View style={[styles.sb, styles.p10]}>
              <Text>No. of Cases</Text>
              <Text style={styles.itemCount}>{countryCases.confirmed}</Text>
            </View>
            <View style={[styles.sb, styles.p10]}>
              <Text>Percentage</Text>
              <Text style={styles.itemCount}>
                {countryCases.confirmed/countryPopulation}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemHeading}>Recovered</Text>
          <View style={styles.itemNumbers}>
            <View style={[styles.sb, styles.p10]}>
              <Text>No. of Cases</Text>
              <Text style={styles.itemCount}>{countryCases.recovered}</Text>
            </View>
            <View style={[styles.sb, styles.p10]}>
              <Text>Percentage</Text>
              <Text style={styles.itemCount}>10%</Text>
            </View>
          </View>
        </View>


        <View style={styles.item}>
          <Text style={styles.itemHeading}>Critical</Text>
          <View style={styles.itemNumbers}>
            <View style={[styles.sb, styles.p10]}>
              <Text>No. of Cases</Text>
              <Text style={styles.itemCount}>{countryCases.critical}</Text>
            </View>
            <View style={[styles.sb, styles.p10]}>
              <Text>Percentage</Text>
              <Text style={styles.itemCount}>10%</Text>
            </View>
          </View>
        </View>


        <View style={styles.item}>
          <Text style={styles.itemHeading}>Deaths</Text>
          <View style={styles.itemNumbers}>
            <View style={[styles.sb, styles.p10]}>
              <Text>No. of Cases</Text>
              <Text style={styles.itemCount}>{countryCases.deaths}</Text>
            </View>
            <View style={[styles.sb, styles.p10]}>
              <Text>Percentage</Text>
              <Text style={styles.itemCount}>10%</Text>
            </View>
          </View>
        </View>


        <View style={styles.item}>
          <Text style={styles.itemHeading}>Last Update</Text>
          <View style={styles.itemNumbers}>
            <View style={[styles.sb, styles.p10]}>
              <Text>Last Updated</Text>
              <Text style={styles.itemCount}>{countryCases.lastUpdate}</Text>
            </View>
          </View>
        </View>


      </View>
      </View>
    );
}


const styles = StyleSheet.create({
  itemContainer:{
    flex: 1,
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemHeading: {
    fontSize: 20,
    textAlign: "center",
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 20,
    marginBottom: 20,
    fontWeight: 700
  },
  item: {
    paddingHorizontal: 20,
    width: '80%',
    paddingVertical: 20,
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 40,
    borderRadius: 10,
    shadowColor: '#a5a5a5',
    shadowOffset: { width: 0, height: 0 },    
    shadowOpacity: 0.4,
    shadowRadius: 10,  
    elevation: 5
  },
  itemCount: {
    fontWeight: 500,
    fontSize: 15,
  },
  sb: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  p10: {
    padding: 10
  },
  countryName: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0
  }
});
