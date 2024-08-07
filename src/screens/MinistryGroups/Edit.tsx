import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import { Context as MinistryGroupContext } from "../../contexts/MinistryGroupContext";
import DropDownPicker from "react-native-dropdown-picker";
import Loading from "../../commonComponents/Loading";
import ButtonC from "../../commonComponents/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import territories from "../../api/territories";
import { IPreacher } from "../../contexts/interfaces";
import MyInput from "../../commonComponents/MyInput";
import { defaultStyles } from "../defaultStyles";
import Label from "../../commonComponents/Label";
import useLocaLization from "../../hooks/useLocalization";
import { ministryGroupsTranslations } from "./translations";

interface MinistryGroupEditScreenProps {
    route: {
        params: {
            congregationID: string,
            ministryGroupID: string,
        }
    }
}

const MinistryGroupEditScreen: React.FC<MinistryGroupEditScreenProps> = ({ route }) => {
    const ministryGroup = useContext(MinistryGroupContext);
    const preachers = useContext(PreachersContext);

    const [name, setName] = useState('')
    const [ministryGroupID, setMinistryGroupID] = useState(route.params.ministryGroupID)
    const [preachersValue, setPreachersValue] = useState([]);
    const [preachersOpen, setPreachersOpen] = useState(false);
    const [preachersItems, setPreachersItems] = useState([]);
    const [overseerOpen, setOverseerOpen] = useState(false);
    const [overseerValue, setOverseerValue] = useState(null);
    const [overseerItems, setOverseerItems] = useState([]);

    const ministryGroupTranslate = useLocaLization(ministryGroupsTranslations);

    const loadPreachers = async () => {
        const token = await AsyncStorage.getItem('token')
        territories.get<IPreacher[]>('/preachers/all', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((response) => {
            const selectItems = response.data.map((preacher) => {
                return { label: preacher.name, value: preacher._id } as never
            })
            setPreachersItems(selectItems)
            setOverseerItems(selectItems)
        })
        .catch((err) => console.log(err))
    }


    useEffect(() => {
        loadPreachers()
        ministryGroup.loadMinistryGroups(route.params.congregationID);

        const ministryGroupItem = ministryGroup.state?.ministryGroups?.find((ministryGroup) => ministryGroup._id === ministryGroupID);
        const preachersDefault = ministryGroupItem?.preachers?.map((preacher) => preacher._id);
        setName(ministryGroupItem?.name!)
        setPreachersValue(preachersDefault!);
        setOverseerValue(ministryGroupItem?.overseer?._id!)
    }, [])

    if(preachers.state.isLoading && ministryGroup.state.isLoading){
        return <Loading />
    }

    if(preachers.state.errMessage || ministryGroup.state.errMessage){
        Alert.alert("Server error", preachers.state.errMessage || ministryGroup.state.errMessage)
    }

    return (
        <View style={styles.container}>
            <MyInput 
                label={ministryGroupTranslate.t("nameLabel")}
                placeholder={ministryGroupTranslate.t("namePlaceholder")}
                value={name}
                onChangeText={setName}
            />
            <Label text={ministryGroupTranslate.t("preacherLabel")} />
            <DropDownPicker
                multiple={true}
                open={preachersOpen}
                value={preachersValue}
                items={preachersItems}
                setOpen={setPreachersOpen}
                setValue={setPreachersValue}
                searchable={true}
                placeholder={ministryGroupTranslate.t("preacherPlaceholder")}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
            />

            {!preachersOpen && <>
                <Label text={ministryGroupTranslate.t("overseerLabel")} />
                <DropDownPicker
                    open={overseerOpen}
                    value={overseerValue}
                    items={overseerItems}
                    setOpen={setOverseerOpen}
                    setValue={setOverseerValue}
                    labelStyle={defaultStyles.dropdown}
                    placeholderStyle={defaultStyles.dropdown}
                    searchable={true}
                    containerStyle={{
                        marginBottom: 20
                    }}
                    placeholder={ministryGroupTranslate.t("overseerPlaceholder")}
                />
            </>}

            <ButtonC title={ministryGroupTranslate.t("editText")} isLoading={ministryGroup.state.isLoading} onPress={() => ministryGroup.editMinistryGroup(route.params.congregationID, ministryGroupID, name, preachersValue, overseerValue)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        justifyContent: 'center'
    },
})

export default MinistryGroupEditScreen;