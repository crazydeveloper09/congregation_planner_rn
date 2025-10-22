import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { FAB, Portal } from "react-native-paper";
import { ICartDay } from "../../../contexts/interfaces";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";
import { buildTheme } from "../../../helpers/colors";
import useLocaLization from "../../../hooks/useLocalization";
import { cartScheduleTranslations } from "../translations";

interface ModificationProps {
  cartDay?: ICartDay;
  date: string;
  dayItems: number;
}

const Modification: React.FC<ModificationProps> = ({ cartDay, date, dayItems }) => {
  const [state, setState] = React.useState({ open: false });
  const navigation = useNavigation();
  const visible = useIsFocused();
  const { open } = state;
  const settings = useContext(SettingsContext);
  const theme = buildTheme(settings.state.mainColor)
  const cartScheduleTranslate = useLocaLization(cartScheduleTranslations)

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible={visible}
        style={{ bottom: 80 }}
        icon={open ? "close": "pencil-outline"}
        fabStyle={{ backgroundColor: theme.colors.secondaryContainer }}
        actions={[
          {
            icon: "plus",
            label: dayItems >= 1 ? cartScheduleTranslate.t("otherPlace") : cartScheduleTranslate.t("addText"),
            style: { backgroundColor: theme.colors.elevation.level2 },
            onPress: () => navigation.navigate("Carts Day New", { date }),
          },
          ...(cartDay
            ? [
                {
                  icon: "pencil",
                  label: cartScheduleTranslate.t("editText"),
                  style: { backgroundColor: theme.colors.elevation.level2 },
                  onPress: () =>
                    navigation.navigate("Carts Day Edit", { cartDay }),
                },
                {
                  icon: "trash-can",
                  label: cartScheduleTranslate.t("deleteText"),
                  style: { backgroundColor: theme.colors.elevation.level2 },
                  onPress: () =>
                    navigation.navigate("Carts Day Delete Confirm", {
                      cartDay,
                    }),
                },
              ]
            : []),
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};

export default Modification;
