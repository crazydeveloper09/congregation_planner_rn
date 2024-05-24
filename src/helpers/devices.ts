import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const aspectRatio = height / width;

export const isTablet = aspectRatio < 1.6;

const determineNumOfColumns = () => isTablet ? 2 : 1;
export const columnsNum = determineNumOfColumns();
