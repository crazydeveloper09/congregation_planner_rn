import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface AccordionProps {
    title: string;
    children: React.ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [expanded, setExpanded] = useState<boolean>(false)
    return (
        <View>
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <View>
                    <Text>{title}</Text>
                    {expanded ? <MaterialCommunityIcons name="chevron-up" size={25} />: <MaterialCommunityIcons name="chevron-down" size={25} />}
                </View>
            </TouchableOpacity>
            {expanded && children}
        </View>
    )
}

export default Accordion