import React, { useContext, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Share, Alert } from "react-native";
import { IPreacher } from "../../../contexts/interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { isTablet } from "../../../helpers/devices";
import { FlatList } from "react-native-gesture-handler";
import IconLink from "../../../commonComponents/IconLink";
import useLocaLization from "../../../hooks/useLocalization";
import { preachersTranslations } from "../translations";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";
import { Context as AuthContext } from "../../../contexts/AuthContext";
import Label from "../../../commonComponents/Label";

interface PreacherProps {
    preacher: IPreacher;
    displayAdditionalInfo?: boolean;
    isOnlyInfoCard?: boolean;
}

const Preacher: React.FC<PreacherProps> = ({ preacher, displayAdditionalInfo = true, isOnlyInfoCard = false }) => {
    const navigation = useNavigation();
    const preacherTranslate = useLocaLization(preachersTranslations);
    const settingsContext = useContext(SettingsContext);
    const authContext = useContext(AuthContext)

    const onShare = async (preacher: IPreacher) => {

        try {
          const result = await Share.share({
            message: preacherTranslate.t("linkShareMessage", { name: preacher.name, link: preacher.link })
    
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
        <View style={[styles.container, { borderColor: settingsContext.state.mainColor }, !displayAdditionalInfo && { flex: 1, alignItems: 'center' }]}>
            <View style={styles.titleContainer}>
                <Text style={[styles.title, { fontSize: 19 + settingsContext.state.fontIncrement }]}>{preacher.name}</Text>
                {authContext.state.whoIsLoggedIn === "admin" && !isOnlyInfoCard && <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('EditPreacher', {preacher} as unknown as never)}>
                        <MaterialCommunityIcons name='pencil' color={settingsContext.state.mainColor} size={22 + settingsContext.state.fontIncrement} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('DeleteConfirmPreacher', {id: preacher._id} as unknown as never)}>
                        <MaterialCommunityIcons name='trash-can' color={settingsContext.state.mainColor} size={22 + settingsContext.state.fontIncrement} />
                    </TouchableOpacity>
                </View>}
                
            </View>
            { authContext.state.whoIsLoggedIn === "admin" && displayAdditionalInfo && <>
                <FlatList
                    data={preacher.roles}
                    renderItem={({ item }) => <Text style={{ marginBottom: 10, fontSize: 15 + settingsContext.state.fontIncrement }}>• {preacherTranslate.t(item)}</Text>}
                    scrollEnabled={false}
                />
                {preacher.privileges?.length > 0 && <>
                    <Label text={preacherTranslate.t('privilegesLabel')} />
                    <FlatList
                        data={preacher.privileges}
                        renderItem={({ item }) => <Text style={{ marginBottom: 10, fontSize: 15 + settingsContext.state.fontIncrement }}>• {preacherTranslate.t(item)}</Text>}
                        scrollEnabled={false}
                    />
                </>}
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    { preacher?.link && (
                        <IconLink 
                            onPress={() => onShare(preacher)}
                            iconName="share-variant"
                            description={preacherTranslate.t("shareButtonLabel")}
                            isCentered={true}
                        />
                    )}
                
                </View>
            </> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 15,
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