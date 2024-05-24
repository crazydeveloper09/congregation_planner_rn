import MarkedList from "@jsamr/react-native-li";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import numeric from '@jsamr/counter-style/presets/decimal';
import point from '@jsamr/counter-style/presets/circle';
import square from '@jsamr/counter-style/presets/square';

const PoliciesScreen: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.sectionHeader, { color: '#1F8AAD' }]}>Polityka Prywatności</Text>
            <MarkedList counterRenderer={numeric}>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.listHeader}>Informacje ogólne</Text>
                    <MarkedList counterRenderer={point}>
                        <Text style={styles.listElement}>Niniejsza polityka dotyczy aplikacji mobilnej: Congregation Planner</Text>
                        <Text style={styles.listElement}>Operatorem serwisu oraz Administratorem danych osobowych jest Maciej Kuta zamieszkały na ul. Obrońców Pokoju 30B/30 w Głogowie</Text>
                        <Text style={styles.listElement}>Adres kontaktowy poczty elektronicznej operatora: admin@websiteswithpassion.pl</Text>
                        <Text style={styles.listElement}>Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych podanych dobrowolnie w Serwisie.</Text>
                        <View style={{ flexShrink: 1 }}>
                            <Text style={styles.listElement}>Serwis wykorzystuje dane osobowe w następujących celach:</Text>
                            <MarkedList counterRenderer={square}>
                                <Text style={styles.listElement}>Prezentacja planu zebrań</Text>
                                <Text style={styles.listElement}>Prezentacja planu zbiórek</Text>
                                <Text style={styles.listElement}>Prezentacja planu wózka</Text>
                                <Text style={styles.listElement}>Prezentacja planu audio-wideo i porządkowych</Text>
                            </MarkedList>
                        </View>
                        <View style={{ flexShrink: 1 }}>
                            <Text style={styles.listElement}>Serwis realizuje funkcje pozyskiwania informacji o użytkownikach i ich zachowaniu w następujący sposób:</Text>
                            <MarkedList counterRenderer={square}>
                                <Text style={styles.listElement}>
                                    Poprzez dobrowolnie wprowadzone w formularzach dane, które zostają wprowadzone do systemów Operatora.
                                </Text>
                            </MarkedList>
                        </View>
                    </MarkedList>
                </View>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.listHeader}>Wybrane metody ochrony danych stosowane przez Operatora</Text>
                    <MarkedList counterRenderer={point}>
                        <Text style={styles.listElement}>
                        Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat SSL). Dzięki temu dane osobowe i dane logowania, wprowadzone na stronie, zostają zaszyfrowane w telefonie użytkownika i mogą być odczytane jedynie na docelowym serwerze.
                        </Text>
                        <Text style={styles.listElement}>
                        Dostęp do bazy danych oraz do samego serwisu jest zabezpieczony weryfikacją dwuetapową. Poza tym z aplikacji może korzystać wyłącznie właściciel urządzenia dzięki potwierdzeniu tożsamości odciskiem palca/hasłem urządzenia/rozpoznanawaniem twarzy
                        </Text>
                        <Text style={styles.listElement}>
                        Hasła użytkowników są przechowywane w postaci hashowanej. Funkcja hashująca działa jednokierunkowo - nie jest możliwe odwrócenie jej działania, co stanowi obecnie współczesny standard w zakresie przechowywania haseł użytkowników.
                        </Text>
                        <Text style={styles.listElement}>
                        Istotnym elementem ochrony danych jest regularna aktualizacja wszelkiego oprogramowania, wykorzystywanego przez Operatora do przetwarzania danych osobowych, co w szczególności oznacza regularne aktualizacje komponentów programistycznych.
                        </Text>
                    </MarkedList>
                </View>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.listHeader}>Hosting</Text> 
                    <MarkedList counterRenderer={point}>
                        <Text style={styles.listElement}>
                        Serwis jest hostowany (technicznie utrzymywany) na serwerach operatora: Expo.

                        </Text>
                    </MarkedList>
                </View>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.listHeader}>Twoje prawa i dodatkowe informacje o sposobie wykorzystania danych</Text>
                    <MarkedList counterRenderer={point}>
                        <View style={{ flexShrink: 1 }}>
                            <Text style={styles.listElement}>
                            W niektórych sytuacjach Administrator ma prawo przekazywać Twoje dane osobowe innym odbiorcom, jeśli będzie to niezbędne do wykonania zawartej z Tobą umowy lub do zrealizowania obowiązków ciążących na Administratorze. Dotyczy to takich grup odbiorców:
                            </Text>
                            <MarkedList counterRenderer={square}>
                                <Text style={styles.listElement}>
                                    osoby upoważnione przez nas, pracownicy i współprcownicy, którzy muszą mieć dostęp do danych osobowych w celu wykonywania swoich obowiązków,
                                </Text>
                                <Text style={styles.listElement}>
                                    firma hostingowa,
                                </Text>
                                <Text style={styles.listElement}>
                                    firmy obsługująca mailingi,
                                </Text>
                                <Text style={styles.listElement}>firmy obsługująca komunikaty SMS,</Text>
                                <Text style={styles.listElement}>
                                    firmy, z którymi Administrator współpracuje w zakresie marketingu własnego,
                                </Text>
                                <Text style={styles.listElement}>
                                    kurierzy,
                                </Text>
                                <Text style={styles.listElement}>ubezpieczyciele,</Text>
                                <Text style={styles.listElement}>kancelarie prawne i windykatorzy,</Text>
                                <Text style={styles.listElement}>banki,</Text>
                                <Text style={styles.listElement}>operatorzy płatności,</Text>
                                <Text style={styles.listElement}>organy publiczne.</Text>
                            </MarkedList>
                        </View>
                        
                        <Text style={styles.listElement}>
                        Twoje dane osobowe przetwarzane przez Administratora nie dłużej, niż jest to konieczne do wykonania związanych z nimi czynności określonych osobnymi przepisami (np. o prowadzeniu rachunkowości). W odniesieniu do danych marketingowych dane nie będą przetwarzane dłużej niż przez 3 lata.
                        </Text>
                        <View style={{ flexShrink: 1 }}>
                            <Text style={styles.listElement}>Przysługuje Ci prawo żądania od Administratora:</Text>
                            <MarkedList counterRenderer={square}>
                                <Text style={styles.listElement}>dostępu do danych osobowych dotyczących Ciebie,</Text>
                                <Text style={styles.listElement}>ich sprostowania,</Text>
                                <Text style={styles.listElement}>usunięcia,</Text>
                                <Text style={styles.listElement}>ograniczenia przetwarzania,</Text>
                                <Text style={styles.listElement}>oraz przenoszenia danych.</Text>
                            </MarkedList>
                        </View>
                        <Text style={styles.listElement}>
                        Przysługuje Ci prawo do złożenia sprzeciwu w zakresie przetwarzania wskazanego w pkt 3.3 c) wobec przetwarzania danych osobowych w celu wykonania prawnie uzasadnionych interesów realizowanych przez Administratora, w tym profilowania, przy czym prawo sprzeciwu nie będzie mogło być wykonane w przypadku istnienia ważnych prawnie uzasadnionych podstaw do przetwarzania, nadrzędnych wobec Ciebie interesów, praw i wolności, w szczególności ustalenia, dochodzenia lub obrony roszczeń.
                        </Text>
                        <Text style={styles.listElement}>
                            Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.
                        </Text>
                        <Text style={styles.listElement}>
                            Podanie danych osobowych jest dobrowolne, lecz niezbędne do obsługi Serwisu.
                        </Text>
                        <Text style={styles.listElement}>
                        W stosunku do Ciebie mogą być podejmowane czynności polegające na zautomatyzowanym podejmowaniu decyzji, w tym profilowanie w celu świadczenia usług w ramach zawartej umowy oraz w celu prowadzenia przez Administratora marketingu bezpośredniego.
                        </Text>
                        <Text style={styles.listElement}>
                        Dane osobowe nie są przekazywane od krajów trzecich w rozumieniu przepisów o ochronie danych osobowych. Oznacza to, że nie przesyłamy ich poza teren Unii Europejskiej.
                        </Text>
                    </MarkedList>
                </View>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.listHeader}>Informacje w formularzach</Text>
                    <MarkedList counterRenderer={point}>
                        <Text style={styles.listElement}>
                            Serwis zbiera informacje podane dobrowolnie przez użytkownika,
                            w tym dane osobowe.
                        </Text>
                        <Text style={styles.listElement}>
                            Dane podane w formularzu są przetwarzane w celu wynikającym z funkcji konkretnego formularza. Każdorazowo kontekst i opis formularza w czytelny sposób informuje, do czego on służy.</Text>
                    </MarkedList>
                </View>
                
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.listHeader}>Logi administratora</Text>
                    <MarkedList counterRenderer={point}>
                        <Text style={styles.listElement}>Informacje o zachowaniu użytkowników w serwisie mogą podlegać logowaniu. Dane te są wykorzystywane w celu administrowania serwisem oraz wyszukiwaniu błędów w kodzie.</Text>

                    </MarkedList>
                </View>
                
                
            </MarkedList>
            <Text style={[styles.sectionHeader, { color: '#1F8AAD' }]}>Klauzula RODO</Text>
            <Text style={styles.listHeader}>Kto jest administratorem danych?</Text>
            <Text style={[styles.listElement, { marginVertical: 15 }]}>
            Administratorem Danych Osobowych (dalej Administrator) jest osoba fizyczna "Maciej Kuta" zamieszkała w Głogowie, świadcząca usługi drogą elektroniczną za pośrednictwem Serwisu
            </Text>
            
            <Text style={styles.listHeader}>Jak można skontaktować się z administratorem danych?</Text>
            <View style={{ marginVertical: 15 }}>
                <Text style={styles.listElement}>Z Administratorem można skontaktować się w jeden z poniższych sposobów</Text>
                <MarkedList counterRenderer={point}>
                    <Text style={styles.listElement}>Adres poczty elektronicznej - admin@websiteswithpassion.pl</Text>
                    <Text style={styles.listElement}>Połączenie telefoniczne - +48 515 091 616</Text>
                </MarkedList>
            </View>
            <Text style={styles.listHeader}>Czy Administrator powołał Inspektora Danych Osobowych?</Text>
            
            <Text style={[styles.listElement, { marginVertical: 15 }]}>
            Na podstawie Art. 37 RODO, Administrator nie powołał Inspektora Ochrony Danych.

W sprawach dotyczących przetwarzania danych, w tym danych osobowych, należy kontaktować się bezpośrednio z Administratorem.
            </Text>
            <Text style={styles.listHeader}>Skąd pozyskujemy dane osobowe i jakie są ich źródła?</Text>
            <View style={{ marginVertical: 15 }}>
                <Text style={styles.listElement}>Dane pozyskiwane są z następujących źródeł:</Text>
                <MarkedList counterRenderer={point}>
                    <Text style={styles.listElement}>od osób, których dane dotyczą</Text>
                </MarkedList>
            </View>
            <Text style={styles.listHeader}>Jaki jest zakres przetwarzanych przez nas danych osobowych?</Text>
            
            <Text style={[styles.listElement, { marginVertical: 15 }]}>
            W serwisie przetwarzane są dane osobowe zwykłe, podane dobrowolnie przez osoby, których dotyczą
(Np. imię i nazwisko, login, adres e-mail, telefon, adres IP, itp.)

Szczegółowy zakres przetwarzanych danych dostępny jest w Polityce Prywatności.
            </Text>
            <Text style={styles.listHeader}>Jakie są cele przetwarzania przez nas danych?</Text>
            <View style={{ marginVertical: 15 }}>
                <Text style={styles.listElement}>Dane osobowe dobrowolnie podane przez Użytkowników są przetwarzane w jednym z następujących celów:</Text>
                <MarkedList counterRenderer={point}>
                    <View>
                        <Text style={styles.listElement}>Realizacji usług elektronicznych:</Text>
                        <MarkedList counterRenderer={square}>
                            <Text style={styles.listElement}>Usługi rejestracji i utrzymania konta Użytkownika w Serwisie i funkcjonalności z nim związanych</Text>
                        </MarkedList>
                    </View>
                    <Text style={styles.listElement}>Komunikacji Administratora z Użytkownikami w sprawach związanych z Serwisem oraz ochrony danych</Text>
                    <Text style={styles.listElement}>Zapewnienia prawnie uzasadnionego interesu Administratora</Text>
                </MarkedList>
            </View>
          
           
            <Text style={styles.listHeader}>Jakie są podstawy prawne przetwarzania danych?</Text>
            <View style={{ marginVertical: 15 }}>
                <Text style={styles.listElement}>Serwis gromadzi i przetwarza dane Użytkowników na podstawie:</Text>
                <MarkedList counterRenderer={point}>
                    <View>
                        <Text style={styles.listElement}>Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych)</Text>
                        <MarkedList counterRenderer={square}>
                            <Text style={styles.listElement}>art. 6 ust. 1 lit. a - osoba, której dane dotyczą wyraziła zgodę na przetwarzanie swoich danych osobowych w jednym lub większej liczbie określonych celów</Text>
                            <Text style={styles.listElement}>art. 6 ust. 1 lit. b - przetwarzanie jest niezbędne do wykonania umowy, której stroną jest osoba, której dane dotyczą, lub do podjęcia działań na żądanie osoby, której dane dotyczą, przed zawarciem umowy</Text>
                            <Text style={styles.listElement}>art. 6 ust. 1 lit. f - przetwarzanie jest niezbędne do celów wynikających z prawnie uzasadnionych interesów realizowanych przez administratora lub przez stronę trzecią</Text>
                        </MarkedList>
                    </View>
                    <Text style={styles.listElement}>Ustawa z dnia 10 maja 2018 r. o ochronie danych osobowych (Dz.U. 2018 poz. 1000)</Text>
                    <Text style={styles.listElement}>Ustawa z dnia 16 lipca 2004 r. Prawo telekomunikacyjne (Dz.U. 2004 nr 171 poz. 1800)</Text>
                    <Text style={styles.listElement}>Ustawa z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych (Dz. U. 1994 Nr 24 poz. 83)</Text>
                </MarkedList>
            </View>
            
            <Text style={styles.listHeader}>Jaki jest prawnie uzasadniony interes realizowany przez Administratora?</Text>
            <View style={{ marginVertical: 15 }}>
                <MarkedList counterRenderer={point}>
                    <Text style={styles.listElement}>W celu ewentualnego ustalenia, dochodzenia lub obrony przed roszczeniami – podstawą prawną przetwarzania jest nasz uzasadniony interes (art. 6 ust. 1 lit. f) RODO) polegający na ochronie naszych praw, w tym między innymi;</Text>
                    <Text style={styles.listElement}>W celu oceny ryzyka potencjalnych klientów</Text>
                    <Text style={styles.listElement}>W celu oceny planowanych kampanii marketingowych</Text>
                    <Text style={styles.listElement}>W celu realizacji marketingu bezpośredniego</Text>
                </MarkedList>
            </View>
            <Text style={styles.listHeader}>Przez jaki okres przetwarzamy dane osobowe?</Text>
            <Text style={[styles.listElement, { marginVertical: 15 }]}>
            Co do zasady, wskazane dane osobowe są przechowywane wyłącznie przez okres świadczenia usługi w ramach prowadzonego serwisu przez Administratora. Są one usuwane lub anonimizowane w okresie do 30 dni od chwili zakończenia świadczenia usług (np. usunięcie zarejestrowanego konta użytkownika, wypisanie z listy Newsletter, itp.) 

W wyjątkowych sytuacjach, w celu zabezpieczenie prawnie uzasadnionego interesu realizowanego przez Administratora, okres ten może ulec wydłużeniu. W takiej sytuacji Administrator będzie przechowywał wskazane dane, od czasu żądania ich usunięcia przez Użytkownika, nie dłużej niż przez okres 3 lat w przypadku naruszenia lub podejrzenia naruszenia zapisów regulaminu serwisu przez osobę, której dane dotyczą.
            </Text>
            <Text style={styles.listHeader}>Kto jest odbiorcą danych w tym danych osobowych?</Text>
            <Text style={styles.listHeader}>Czy Państwa dane osobowe będą przekazywane poza Unię Europejską?</Text>
            <Text style={[styles.listElement, { marginVertical: 15 }]}>
            Dane osobowe nie będą przekazywane poza Unię Europejską, chyba że zostały opublikowane na skutek indywidualnego działania Użytkownika (np. wprowadzenie komentarza lub wpisu), co sprawi, że dane będą dostępne dla każdej osoby odwiedzającej serwis.
            </Text>
            <Text style={styles.listHeader}>Czy dane osobowe będą podstawą zautomatyzowanego podejmowania decyzji?</Text>
            <Text style={[styles.listElement, { marginVertical: 15 }]}>
            Dane osobowe nie będą wykorzystywane do zautomatyzowanego podejmowania decyzji (profilowania).
            </Text>
            <Text style={styles.listHeader}>Jakie mają Państwo prawa związane z przetwarzaniem danych osobowych?</Text>
            <View style={{ marginVertical: 15 }}>
                
                <MarkedList counterRenderer={point}>
                    <Text style={styles.listElement}>
                    Prawo dostępu do danych osobowych - Użytkownikom przysługuje prawo uzyskania dostępu do swoich danych osobowych, realizowane za pośrednictwem panelu użytkownika dostępnego po zalogowaniu i narzędzi umożliwiających dostęp do konta w przypadku zapomnianego hasła.
                    </Text>
                    <Text style={styles.listElement}>
                    Prawo do sprostowania danych osobowych - Użytkownikom przysługuje prawo żądania od Administratora niezwłocznego sprostowania danych osobowych, które są nieprawidłowe lub / oraz uzupełnienia niekompletnych danych osobowych, realizowane na żądanie złożone do Administratora
                    </Text>
                    <Text style={styles.listElement}>
                    Prawo do usunięcia danych osobowych - Użytkownikom przysługuje prawo żądania od Administratora niezwłocznego usunięcia danych osobowych, realizowane na żądanie złożone do Administratora.

                    W przypadku kont użytkowników, usunięcie danych polega na anonimizacji danych umożliwiających identyfikację Użytkownika.

                    W przypadku usługi Newsletter, Użytkownik ma możliwość samodzielnego usunięcia swoich danych osobowych korzystając z odnośnika umieszczonego w każdej przesyłanej wiadomości e-mail.
                    </Text>
                    <Text style={styles.listElement}>
                    Prawo do ograniczenia przetwarzania danych osobowych - Użytkownikom przysługuje prawo ograniczenia przetwarzania danych osobowych w przypadkach wskazanych w art. 18 RODO, m.in. kwestionowania prawidłowość danych osobowych, realizowane na żądanie złożone do Administratora
                    </Text>
                    <Text style={styles.listElement}>
                    Prawo do przenoszenia danych osobowych - Użytkownikom przysługuje prawo uzyskania od Administratora, danych osobowych dotyczących Użytkownika w ustrukturyzowanym, powszechnie używanym formacie nadającym się do odczytu maszynowego, realizowane na żądanie złożone do Administratora
                    </Text>
                    <Text style={styles.listElement}>
                    Prawo wniesienia sprzeciwu wobec przetwarzania danych osobowych - Użytkownikom przysługuje prawo wniesienia sprzeciwu wobec przetwarzania jego danych osobowych w przypadkach określonych w art. 21 RODO, realizowane na żądanie złożone do Administratora
                    </Text>
                    <Text style={styles.listElement}>
                    Prawo wniesienia skargi - Użytkownikom przysługuje prawo wniesienia skargi do organu nadzorczego zajmującego się ochroną danych osobowych.
                    </Text>
                </MarkedList>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ece9e9",
        padding: 15,
        flex: 1
    },
    sectionHeader: {
        fontSize: 23,
        fontFamily: 'PoppinsSemiBold'
    },
    listHeader: {
        fontSize: 19,
        fontFamily: 'MontserratSemiBold'
    },
    listElement: {
        fontSize: 16,
        fontFamily: 'MontserratRegular',
        flexShrink: 1
    }
})

export default PoliciesScreen;