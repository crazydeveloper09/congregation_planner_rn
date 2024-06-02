import React, { useContext, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Share, Alert } from "react-native";
import { IPreacher } from "../../../contexts/interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Context as PreachersContext } from "../../../contexts/PreachersContext";
import { isTablet } from "../../../helpers/devices";
import ButtonC from "../../../commonComponents/Button";
import { FlatList } from "react-native-gesture-handler";
import { preacherRoles } from "../helpers/roles";
import IconLink from "../../../commonComponents/IconLink";

interface PreacherProps {
    preacher: IPreacher;
}

const Preacher: React.FC<PreacherProps> = ({ preacher }) => {
    const navigation = useNavigation();
    const { state, generateLink } = useContext(PreachersContext)

    const onShare = async (preacher: IPreacher) => {

        try {
          const result = await Share.share({
            message:
                `Witaj ${preacher.name},\n Twój specjalny link do Congregation Planner: ${preacher.link} (link tylko do skopiowania, nie klikaj go!). \n\n Jak uruchomić aplikację? \n\n 1. \n • IOS - wejdź do instrukcji uruchamiania: https://docs.google.com/document/d/1mhc8c38rUHpXxug-amBXT_W3AUuVsBpMEkat-BR3dVI/edit?usp=sharing i postępuj zgodnie z podanymi tam wskazówkami. \n\n • Android: W odpowiedzi na tą wiadomość wyślij mi swojego maila. Po jakimś czasie dostaniesz linka do Sklepu Play. Zainstaluj ją na swoim urządzeniu. \n\n 2. Wejdź do aplikacji. \n\n 3. Kliknij "Logowanie głosiciela" i wklej specjalny link. \n\n Vouilla. Możesz teraz przeglądać różne plany w Twoim zborze.`,
            });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error: any) {
          Alert.alert(error.message);
        }
      };

    useEffect(() => {

    }, [preacher])


    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{preacher.name}</Text>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('EditPreacher', {preacher} as unknown as never)}>
                        <MaterialCommunityIcons name='pencil' color={'#1f8aad'} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('DeleteConfirmPreacher', {id: preacher._id} as unknown as never)}>
                        <MaterialCommunityIcons name='trash-can' color={'#1f8aad'} size={22} />
                    </TouchableOpacity>
                </View>
                
            </View>
            <FlatList
                data={preacher.roles}
                renderItem={({ item }) => <Text style={{ marginBottom: 10 }}>• {preacherRoles[item]}</Text>}
                scrollEnabled={false}
            />
            <View style={{ flexDirection: 'row', gap: 8 }}>
                { preacher?.link && (
                    <IconLink 
                        onPress={() => onShare(preacher)}
                        iconName="share-variant"
                        description="Udostępnij link"
                        isCentered={true}
                    />
                )}
            
            </View>
            
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 15,
        borderColor: '#1f8aad',
        borderWidth: 1,
        borderRadius: 10,
        width: isTablet ? '49%' : 'auto',
        marginRight: isTablet ? 15 : 0
    },
    titleContainer: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 10
    },
    title: {
        fontFamily: 'MontserratSemiBold',
        fontSize: 19
    },
})

export default Preacher;