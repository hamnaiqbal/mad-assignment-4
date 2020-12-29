import React, { useEffect, useState } from "react";
import { CONSTANTS } from "../constants";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";


export function WorldStats() {

  const [casesLoading, setCasesLoading] = useState(true);
  const [popLoading, setPopLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [worldPop, setWorldPop] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    
    fetch(CONSTANTS.COVID_API, {
      method: "GET",
      headers: CONSTANTS.COVID_HEADERS,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setCasesLoading(false);
        setDataSource(responseJson[0]);
      })
      .catch((error) => {
        console.error(error);
      });
      
    fetch(CONSTANTS.WOLRD_POP_API, {
      method: "GET",
      headers: CONSTANTS.WORLD_POP_HEADERS,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setPopLoading(false);
        setWorldPop(responseJson.body.world_population);
      })
      .catch((error) => {
        console.error(error);
      });
        
  };

  if (casesLoading || popLoading) {
      return (
        <View style={{ flexDirection: 'column', padding: 20, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading Data from JSON Placeholder API ...</Text>
        </View>
      );
    }
    return (
      <View style={styles.bodyContainer}>
      <View style={styles.itemContainer}>
        
        <View style={styles.item}>
          <Text style={styles.itemHeading}>Confirmed</Text>
          <View style={styles.itemNumbers}>
            <View style={[styles.sb, styles.p10]}>
              <Text>No. of Cases</Text>
              <Text style={styles.itemCount}>{dataSource.confirmed}</Text>
            </View>
            <View style={[styles.sb, styles.p10]}>
              <Text>Percentage</Text>
              <Text style={styles.itemCount}>
                {Math.round((dataSource.confirmed/worldPop*100) * 100) / 100}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemHeading}>Recovered</Text>
          <View style={styles.itemNumbers}>
            <View style={[styles.sb, styles.p10]}>
              <Text>No. of Cases</Text>
              <Text style={styles.itemCount}>{dataSource.recovered}</Text>
            </View>
            <View style={[styles.sb, styles.p10]}>
              <Text>Percentage</Text>
              <Text style={styles.itemCount}>
              {Math.round((dataSource.recovered/worldPop*100) * 100) / 100}%
              </Text>
            </View>
          </View>
        </View>


        <View style={styles.item}>
          <Text style={styles.itemHeading}>Critical</Text>
          <View style={styles.itemNumbers}>
            <View style={[styles.sb, styles.p10]}>
              <Text>No. of Cases</Text>
              <Text style={styles.itemCount}>{dataSource.critical}</Text>
            </View>
            <View style={[styles.sb, styles.p10]}>
              <Text>Percentage</Text>
              <Text style={styles.itemCount}>
              {Math.round((dataSource.critical/worldPop*100) * 100) / 100}%
              </Text>
            </View>
          </View>
        </View>


        <View style={styles.item}>
          <Text style={styles.itemHeading}>Deaths</Text>
          <View style={styles.itemNumbers}>
            <View style={[styles.sb, styles.p10]}>
              <Text>No. of Cases</Text>
              <Text style={styles.itemCount}>{dataSource.deaths}</Text>
            </View>
            <View style={[styles.sb, styles.p10]}>
              <Text>Percentage</Text>
              <Text style={styles.itemCount}>
              {Math.round((dataSource.deaths/worldPop*100) * 100) / 100}%
              </Text>
            </View>
          </View>
        </View>


        <View style={styles.item}>
          <Text style={styles.itemHeading}>Last Update</Text>
          <View style={styles.itemNumbers}>
            <View style={[styles.sb, styles.p10]}>
              <Text>Last Updated</Text>
              <Text style={styles.itemCount}>
                {new Date(dataSource.lastUpdate).toLocaleDateString()}
              </Text>
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
  }
});
