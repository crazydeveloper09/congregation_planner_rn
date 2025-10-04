import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform, RefreshControl } from 'react-native';
import { Context as TerritoriesContext } from '../../contexts/TerritoriesContext';
import { Context as PreachersContext } from '../../contexts/PreachersContext';
import Loading from '../../commonComponents/Loading';
import { FontAwesome } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationProp } from '@react-navigation/native';
import GoogleMapReact from "google-map-react";

interface TerritoriesHistoryScreenProps {
    navigation: NavigationProp<any>
    route: {
        params: {
            id: string
        }
    }
}

const TerritoriesHistoryScreen: React.FC<TerritoriesHistoryScreenProps> = ({ navigation, route }) => {
    const {state, loadTerritoryHistory, clearError} = useContext(TerritoriesContext);
    const preachersContext = useContext(PreachersContext)
    const [infoOpen, setInfoOpen] = useState(false);

    const toggleInfo = () => {
      setInfoOpen(!infoOpen);
    };


      const [refreshing, setRefreshing] = React.useState(false);

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);


    useEffect(() => {
     
        loadTerritoryHistory(route.params.id);
        const unsubscribe = navigation.addListener('focus', () => {
          loadTerritoryHistory(route.params.id)
        });

      return unsubscribe;
    }, [route.params.id, navigation, refreshing])

    if(state.isLoading){
        return <Loading />
    }

    if(state.errMessage){
      Alert.alert("Server error", state.errMessage, [{ text: "OK", onPress: () => clearError() }])
    }

    let backgroundColor;
    let territoryKindText;
    switch(state.territory?.kind){
      case 'city':
          backgroundColor = '#f6edd9';
          territoryKindText = 'Teren miejski';
          break;
      case 'market':
          backgroundColor = 'white';
          territoryKindText = 'Teren handlowo-usługowy';
          break;
      case 'village':
          backgroundColor = '#e1f1ff'
          territoryKindText = 'Teren wiejski';
          break;
      default:
          break;
  }
    return (
      <View style={[styles.container, { backgroundColor }] }>
      

        {state.territory && <>
          {Platform.OS === "web" ? <div style={{ height: "100vh", width: "100vw" }}>
        <GoogleMapReact

          bootstrapURLKeys={{ key: "AIzaSyDKvmIASZjDfZNXZZn2fa4pGvR6T3cQTcA" }}
          defaultCenter={{ lat: state.territory?.latitude, lng: state.territory?.longitude }}
          defaultZoom={16}
        >
          <div lat={state.territory?.latitude} lng={state.territory?.longitude}>
            <FontAwesome name="map-marker" size={40} color="red" />
          </div>
        </GoogleMapReact>
      </div>
    : <MapView
          provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
          region={{
            latitude: state.territory?.latitude!,
            longitude: state.territory?.longitude!,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={styles.map}
          
        >
          <Marker
            coordinate={{
              latitude: state.territory?.latitude!,
              longitude: state.territory?.longitude!,
            }}
            title={`Teren nr ${state.territory?.number} - ${state.territory?.street} ${state.territory?.beginNumber ? state.territory?.beginNumber : ''} ${state.territory.endNumber ? '- ' + state.territory?.endNumber: ''} ${state.territory.description || state.territory?.description !== ''  ? '(' + state.territory?.description + ')' : ''}`}
          >
            <View style={{ alignItems: "center" }}>
              <FontAwesome name="map-marker" size={40} color="red" />
            </View>
          </Marker>
        </MapView>}
        </> 
        
        }
      
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: { top: 0, bottom: 0, left: 0, right: 0, position: "absolute" }

})

export default TerritoriesHistoryScreen;