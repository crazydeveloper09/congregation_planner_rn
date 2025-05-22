import MarkedList from "@jsamr/react-native-li";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import numeric from '@jsamr/counter-style/presets/decimal';
import point from '@jsamr/counter-style/presets/circle';
import square from '@jsamr/counter-style/presets/square';
import { Context as SettingsContext } from "../../contexts/SettingsContext";

const PoliciesEnScreen: React.FC = () => {
    const settingsContext = useContext(SettingsContext);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#ece9e9",
            padding: 15,
            flex: 1
        },
        sectionHeader: {
            fontSize: 23 + settingsContext.state.fontIncrement,
            fontFamily: 'PoppinsSemiBold'
        },
        listHeader: {
            fontSize: 19 + settingsContext.state.fontIncrement,
            fontFamily: 'MontserratSemiBold'
        },
        listElement: {
            fontSize: 16 + settingsContext.state.fontIncrement,
            fontFamily: 'MontserratRegular',
            flexShrink: 1
        }
    })

    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.sectionHeader, { color: settingsContext.state.mainColor }]}>Privacy policy</Text>
            <MarkedList counterRenderer={numeric}>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.listHeader}>General Information</Text>
                    <MarkedList counterRenderer={point}>
                        <Text style={styles.listElement}>This policy applies to the mobile application: Congregation Planner</Text>
                        <Text style={styles.listElement}>The service operator and Personal Data Administrator is Maciej Kuta residing at str. Obrońców Pokoju 30B/30 in Głogów</Text>
                        <Text style={styles.listElement}>The operator's contact email address: admin@websiteswithpassion.pl</Text>
                        <Text style={styles.listElement}>The operator is the Administrator of your personal data in relation to data voluntarily provided in the Service.</Text>
                        <View style={{ flexShrink: 1 }}>
                            <Text style={styles.listElement}>The service uses personal data for the following purposes:</Text>
                            <MarkedList counterRenderer={square}>
                                <Text style={styles.listElement}>Presentation of meeting plans</Text>
                                <Text style={styles.listElement}>Presentation of ministry meeting plans</Text>
                                <Text style={styles.listElement}>Presentation of cart schedule</Text>
                                <Text style={styles.listElement}>Presentation of audio video & attendants plans</Text>
                                <Text style={styles.listElement}>Presentation of list of preachers in admin account </Text>
                                <Text style={styles.listElement}>Presentation of ministry group list</Text>
                            </MarkedList>
                        </View>
                        <View style={{ flexShrink: 1 }}>
                            <Text style={styles.listElement}>The service obtains information about users and their behavior in the following ways:</Text>
                            <MarkedList counterRenderer={square}>
                                <Text style={styles.listElement}>
                                    Through data voluntarily entered in forms, which are then sent to the Operator's systems.
                                </Text>
                            </MarkedList>
                        </View>
                    </MarkedList>
                </View>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.listHeader}>Selected data protection methods used by the Operator</Text>
                    <MarkedList counterRenderer={point}>
                        <Text style={styles.listElement}>
                        Login locations and places for entering personal data are protected in the transmission layer (SSL certificate). As a result, personal data and login data entered on the site are encrypted on the user's computer and can only be read on the destination server.
                        </Text>
                        <Text style={styles.listElement}>
                        Access to the database and the service itself is secured by two-factor verification. Moreover, only an owner can use the app thanks to biometric functionalities
                        </Text>
                        <Text style={styles.listElement}>
                        User passwords are stored in a hashed form. The hash function works one-way - it is not possible to reverse its operation, which is currently a modern standard for storing user passwords.
                        </Text>
                        <Text style={styles.listElement}>
                        An important element of data protection is the regular update of all software used by the Operator to process personal data, which in particular means regular updates of programming components.
                        </Text>
                    </MarkedList>
                </View>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.listHeader}>Hosting</Text> 
                    <MarkedList counterRenderer={point}>
                        <Text style={styles.listElement}>
                        The service is hosted (technically maintained) on the servers of the operator: Expo.

                        </Text>
                    </MarkedList>
                </View>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.listHeader}>Your rights and additional information on how data is usedh</Text>
                    <MarkedList counterRenderer={point}>
                        <View style={{ flexShrink: 1 }}>
                            <Text style={styles.listElement}>
                            In some situations, the Administrator has the right to transfer your personal data to other recipients if it is necessary to perform the contract concluded with you or to fulfill the obligations incumbent on the Administrator. This applies to such groups of recipients:
                            </Text>
                            <MarkedList counterRenderer={square}>
                                <Text style={styles.listElement}>
                                    persons authorized by us, employees and co-workers who must have access to personal data in order to perform their duties,
                                </Text>
                                <Text style={styles.listElement}>
                                    hosting company,
                                </Text>
                                <Text style={styles.listElement}>
                                    companies handling mailings,
                                </Text>
                                <Text style={styles.listElement}>companies handling SMS messages,</Text>
                                <Text style={styles.listElement}>
                                companies with which the Administrator cooperates in the field of own marketing,
                                </Text>
                                <Text style={styles.listElement}>
                                    couriers,
                                </Text>
                                <Text style={styles.listElement}>insurers,</Text>
                                <Text style={styles.listElement}>law firms and debt collectors,</Text>
                                <Text style={styles.listElement}>banks,</Text>
                                <Text style={styles.listElement}>payment operators,</Text>
                                <Text style={styles.listElement}>public authorities.</Text>
                            </MarkedList>
                        </View>
                        
                        <Text style={styles.listElement}>
                        Your personal data processed by the Administrator will not be stored longer than necessary to perform the related activities specified by separate regulations (e.g. on accounting). For marketing data, the data will not be processed for longer than 3 years.
                        </Text>
                        <View style={{ flexShrink: 1 }}>
                            <Text style={styles.listElement}>You have the right to request from the Administrator:</Text>
                            <MarkedList counterRenderer={square}>
                                <Text style={styles.listElement}>access to personal data concerning you,</Text>
                                <Text style={styles.listElement}>their rectification,</Text>
                                <Text style={styles.listElement}>deletion,</Text>
                                <Text style={styles.listElement}>processing restrictions,</Text>
                                <Text style={styles.listElement}>and data portability.</Text>
                            </MarkedList>
                        </View>
                        <Text style={styles.listElement}>
                        You have the right to object to the processing indicated in point 3.3 c) regarding the processing of personal data for the purpose of carrying out legally justified interests pursued by the Administrator, including profiling, however, the right to object cannot be exercised if there are valid legally justified grounds for processing, overriding your interests, rights and freedoms, in particular the establishment, exercise or defense of claims.
                        </Text>
                        <Text style={styles.listElement}>
                        Actions of the Administrator are subject to complaint to the President of the Personal Data Protection Office, ul. Stawki 2, 00-193 Warsaw.
                        </Text>
                        <Text style={styles.listElement}>
                        Providing personal data is voluntary, but necessary to operate the Service.
                        </Text>
                        <Text style={styles.listElement}>
                        Automated decision-making may be taken in relation to you, including profiling, in order to provide services under the concluded contract and for the Administrator to conduct direct marketing.
                        </Text>
                        <Text style={styles.listElement}>
                        Personal data is not transferred to third countries within the meaning of personal data protection regulations. This means that we do not send them outside the European Union.
                        </Text>
                    </MarkedList>
                </View>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.listHeader}>Information in forms</Text>
                    <MarkedList counterRenderer={point}>
                        <Text style={styles.listElement}>
                        The service collects information provided voluntarily by the user, including personal data.
                        </Text>
                        <Text style={styles.listElement}>
                        The data provided in the form is processed for the purpose resulting from the function of a specific form. Each time the context and description of the form clearly informs what it is used for.</Text>
                    </MarkedList>
                </View>
                
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.listHeader}>Administrator's logs</Text>
                    <MarkedList counterRenderer={point}>
                        <Text style={styles.listElement}>Information about user behavior on the website may be subject to logging. This data is used for administration of the website and to search for errors in the code.</Text>

                    </MarkedList>
                </View>
                
                
            </MarkedList>
            <Text style={[styles.sectionHeader, { color: settingsContext.state.mainColor }]}>GPDR clause</Text>
            <Text style={styles.listHeader}>Who is the data administrator?</Text>
            <Text style={[styles.listElement, { marginVertical: 15 }]}>
            The Personal Data Administrator (hereinafter referred to as the Administrator) is the natural person "Maciej Kuta" residing in Głogów, providing services electronically through the Service.
            </Text>
            
            <Text style={styles.listHeader}>How can you contact the data administrator?</Text>
            <View style={{ marginVertical: 15 }}>
                <Text style={styles.listElement}>You can contact the Administrator in one of the following ways:</Text>
                <MarkedList counterRenderer={point}>
                    <Text style={styles.listElement}>Email address - admin@websiteswithpassion.pl</Text>
                    <Text style={styles.listElement}>Phone connection- +48 515 091 616</Text>
                </MarkedList>
            </View>
            <Text style={styles.listHeader}>Has the Administrator appointed a Data Protection Officer?</Text>
            
            <Text style={[styles.listElement, { marginVertical: 15 }]}>
            Based on Art. 37 of the GDPR, the Administrator has not appointed a Data Protection Officer.
For matters related to data processing, including personal data, please contact the Administrator directly.
            </Text>
            <Text style={styles.listHeader}>Where do we obtain personal data from and what are their sources?</Text>
            <View style={{ marginVertical: 15 }}>
                <Text style={styles.listElement}>Data is obtained from the following sources:</Text>
                <MarkedList counterRenderer={point}>
                    <Text style={styles.listElement}>from the persons to whom the data relates</Text>
                </MarkedList>
            </View>
            <Text style={styles.listHeader}>What is the scope of personal data processed by us?</Text>
            
            <Text style={[styles.listElement, { marginVertical: 15 }]}>
            The service processes ordinary personal data, provided voluntarily by the persons concerned
(E.g., name and surname, login, email address, phone, IP address, etc.)
The detailed scope of processed data is available in the Privacy Policy.
            </Text>
            <Text style={styles.listHeader}>What are our purposes for processing data?</Text>
            <View style={{ marginVertical: 15 }}>
                <Text style={styles.listElement}>Personal data voluntarily provided by Users is processed for one of the following purposes:</Text>
                <MarkedList counterRenderer={point}>
                    <View>
                        <Text style={styles.listElement}>Implementation of electronic services:</Text>
                        <MarkedList counterRenderer={square}>
                            <Text style={styles.listElement}>User registration and maintenance services in the Service and related functionalities</Text>
                        </MarkedList>
                    </View>
                    <Text style={styles.listElement}>Administrator's communication with Users in matters related to the Service and data protection</Text>
                    <Text style={styles.listElement}>Ensuring the Administrator's legally justified interest</Text>
                </MarkedList>
            </View>
          
           
            <Text style={styles.listHeader}>What are the legal bases for data processing?</Text>
            <View style={{ marginVertical: 15 }}>
                <Text style={styles.listElement}>The service collects and processes User data based on:</Text>
                <MarkedList counterRenderer={point}>
                    <View>
                        <Text style={styles.listElement}>Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC (General Data Protection Regulation)</Text>
                        <MarkedList counterRenderer={square}>
                            <Text style={styles.listElement}>art. 6 par. 1 lit. a
                            the data subject has given consent to the processing of his or her personal data for one or more specific purposes</Text>
                            <Text style={styles.listElement}>
                            art. 6 par. 1 lit. b
                            processing is necessary for the performance of a contract to which the data subject is party or in order to take steps at the request of the data subject prior to entering into a contract
                            </Text>
                            <Text style={styles.listElement}>art. 6 par. 1 lit. f
                            processing is necessary for the purposes of the legitimate interests pursued by the controller or by a third party</Text>
                        </MarkedList>
                    </View>
                    <Text style={styles.listElement}>Act of 10 May 2018 on the protection of personal data (Journal of Laws 2018, item 1000)</Text>
                    <Text style={styles.listElement}>Act of 16 July 2004 Telecommunications Law (Journal of Laws 2004 No. 171, item 1800)</Text>
                    <Text style={styles.listElement}>Act of 4 February 1994 on copyright and related rights (Journal of Laws 1994 No. 24, item 83)</Text>
                </MarkedList>
            </View>
            
            <Text style={styles.listHeader}>What is the legally justified interest pursued by the Administrator?</Text>
            <View style={{ marginVertical: 15 }}>
                <MarkedList counterRenderer={point}>
                    <Text style={styles.listElement}>In order to possibly establish, investigate or defend against claims - the legal basis for processing is our legitimate interest (Article 6(1)(f) of the GDPR) consisting in protecting our rights, including, among others:</Text>
                    <Text style={styles.listElement}>To assess the risk of potential customers</Text>
                    <Text style={styles.listElement}>To evaluate planned marketing campaigns</Text>
                    <Text style={styles.listElement}>To implement direct marketing</Text>
                </MarkedList>
            </View>
            <Text style={styles.listHeader}>For how long do we process personal data?</Text>
            <Text style={[styles.listElement, { marginVertical: 15 }]}>
            As a rule, the indicated personal data is stored only for the period of providing the service within the Service run by the Administrator. They are deleted or anonymized within 30 days from the moment of termination of services (e.g., deletion of a registered user account, unsubscribing from the Newsletter list, etc.)

            In exceptional situations, in order to secure the legally justified interest pursued by the Administrator, this period may be extended. In such a situation, the Administrator will store the indicated data, from the time of requesting their deletion by the User, for no longer than 3 years in case of violation or suspected violation of the Service regulations by the person to whom the data relates.
            </Text>
            <Text style={styles.listHeader}>Who is the recipient of the data, including personal data?</Text>
            <Text style={[styles.listElement, { marginVertical: 15 }]}>
            As a rule, the only recipient of the data is the Administrator.
            </Text>
            <Text style={styles.listElement}>
            However, data processing may be entrusted to other entities providing services to the Administrator in order to maintain the Service's operations.
            </Text>
            <Text style={styles.listElement}>
            Such entities may include, among others:
            </Text>
            <MarkedList counterRenderer={point}>
                <Text style={styles.listElement}>Hosting companies providing hosting or related services to the Administrator</Text>
            </MarkedList>
            <Text style={styles.listHeader}>Will your personal data be transferred outside the European Union?</Text>
            <Text style={[styles.listElement, { marginVertical: 15 }]}>
            Personal data will not be transferred outside the European Union, unless they have been published as a result of individual User action (e.g., entering a comment or post), which will make the data available to anyone visiting the service.

            </Text>
            <Text style={styles.listHeader}>Will personal data be the basis for automated decision-making?</Text>
            <Text style={[styles.listElement, { marginVertical: 15 }]}>
            Personal data will not be used for automated decision-making (profiling).
            </Text>
            <Text style={styles.listHeader}>What rights do you have regarding the processing of personal data?</Text>
            <View style={{ marginVertical: 15 }}>
                
                <MarkedList counterRenderer={point}>
                    <Text style={styles.listElement}>
                    Right of access to personal data - Users have the right to access their personal data, implemented through the user panel available after logging in and tools enabling account access in case of a forgotten password.
                    </Text>
                    <Text style={styles.listElement}>
                    Right to rectification of personal data - Users have the right to request the Administrator to immediately rectify personal data that is incorrect and/or complete incomplete personal data, implemented at the request submitted to the Administrator.
                    </Text>
                    <Text style={styles.listElement}>
                    Right to erasure of personal data - Users have the right to request the Administrator to immediately delete personal data, implemented at the request submitted to the Administrator.

                    For user accounts, data deletion consists of anonymizing data that allows User identification.

                    For the Newsletter service, the User has the ability to independently delete their personal data using the link placed in each sent e-mail message.
                    </Text>
                    <Text style={styles.listElement}>
                    Right to restrict processing of personal data - Users have the right to restrict the processing of personal data in cases indicated in art. 18 GDPR, including questioning the correctness of personal data, implemented at the request submitted to the Administrator.
                    </Text>
                    <Text style={styles.listElement}>
                    Right to data portability - Users have the right to obtain from the Administrator personal data concerning the User in a structured, commonly used machine-readable format, implemented at the request submitted to the Administrator.
                    </Text>
                    <Text style={styles.listElement}>
                    Right to object to the processing of personal data - Users have the right to object to the processing of their personal data in cases specified in art. 21 GDPR, implemented at the request submitted to the Administrator.
                    </Text>
                    <Text style={styles.listElement}>
                    Right to lodge a complaint - Users have the right to lodge a complaint with the supervisory authority dealing with personal data protection.
                    </Text>
                </MarkedList>
            </View>
        </ScrollView>
    )
}

export default PoliciesEnScreen;