import React, { useState, useEffect } from 'react';
import { MapPin, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface MobileLocationFilterHierarchicalProps {
  value: string | null;
  onChange: (location: string | null) => void;
}

// Mapa miast dla każdego województwa (uporzadkowana alfabetycznie)
const CITIES_BY_VOIVODESHIP: { [key: string]: string[] } = {
  "Cała Polska": [],
  "Dolnośląskie": [
    "Bardo", "Bielawa", "Bierutów", "Bogatynia", "Boguszów-Gorce", "Bolesławiec", "Bolków", "Brzeg Dolny", "Bystrzyca Kłodzka", 
    "Chocianów", "Chojnów", "Duszniki-Zdrój", "Dzierżoniów", "Głogów", "Głuszyca", "Góra", "Gryfów Śląski", "Jawor", "Jaworzyna Śląska", 
    "Jedlina-Zdrój", "Jelcz-Laskowice", "Jelenia Góra", "Kamienna Góra", "Karpacz", "Kąty Wrocławskie", "Kłodzko", "Kowary", "Kudowa-Zdrój", 
    "Legnica", "Leśna", "Lubań", "Lubawka", "Lubin", "Lubomierz", "Lwówek Śląski", "Mieroszów", "Międzybórz", "Międzylesie", "Milicz", 
    "Nowa Ruda", "Nowogrodziec", "Oborniki Śląskie", "Oleśnica", "Oława", "Piechowice", "Pieńsk", "Pieszyce", "Piława Górna", "Polanica-Zdrój", 
    "Polkowice", "Prusice", "Przemków", "Radków", "Siechnice", "Sobótka", "Stronie Śląskie", "Strzegom", "Strzelin", "Syców", "Szczawno-Zdrój", 
    "Szczytna", "Szklarska Poręba", "Ścinawa", "Środa Śląska", "Świdnica", "Świebodzice", "Świeradów-Zdrój", "Trzebnica", "Twardogóra", 
    "Wałbrzych", "Wąsosz", "Węgliniec", "Wiązów", "Wleń", "Wojcieszów", "Wołów", "Wrocław", "Zawidów", "Ząbkowice Śląskie", "Zgorzelec", 
    "Ziębice", "Złotoryja", "Złoty Stok", "Żarów", "Żmigród"
  ],
  "Kujawsko-pomorskie": [
    "Aleksandrów Kujawski", "Barcin", "Brodnica", "Brześć Kujawski", "Bydgoszcz", "Chełmno", "Chełmża", "Chodecz", "Ciechocinek", 
    "Dobrzyń nad Wisłą", "Gniewkowo", "Golub-Dobrzyń", "Górzno", "Grudziądz", "Inowrocław", "Izbica Kujawska", "Jabłonowo Pomorskie", 
    "Janikowo", "Kamień Krajeński", "Kcynia", "Koronowo", "Kowal", "Kowalewo Pomorskie", "Kruszwica", "Lipno", "Łabiszyn", "Łasin", 
    "Mogilno", "Mrocza", "Nakło nad Notecią", "Nieszawa", "Nowe", "Pakość", "Piotrków Kujawski", "Radzyń Chełmiński", "Radziejów", 
    "Rypin", "Sępólno Krajeńskie", "Skępe", "Solec Kujawski", "Strzelno", "Szubin", "Świecie", "Tuchola", "Toruń", "Wąbrzeźno", 
    "Więcbork", "Włocławek", "Żnin"
  ],
  "Lubelskie": [
    "Adamów", "Annopol", "Baranów", "Bełżec", "Bełżyce", "Biała Podlaska", "Biłgoraj", "Biskupice", "Bychawa", "Chełm", "Chodel", 
    "Cyców", "Dęblin", "Dołhobyczów", "Dorohusk", "Dzierzkowice", "Frampol", "Godziszów", "Goraj", "Grabowiec", "Hrubieszów", 
    "Horodło", "Izbica", "Jabłonna", "Janów Lubelski", "Jarczów", "Józefów", "Kamionka", "Kazimierz Dolny", "Kock", "Końskowola", 
    "Krasnobród", "Krasnystaw", "Kraśnik", "Krynice", "Krzeszów", "Księżpol", "Lubartów", "Lublin", "Lubycza Królewska", "Ludwin", 
    "Łaszczów", "Łęczna", "Łomazy", "Łuków", "Markuszów", "Międzyrzec Podlaski", "Modliborzyce", "Nałęczów", "Niedrzwica Duża", 
    "Obsza", "Opole Lubelskie", "Ostrów Lubelski", "Parczew", "Piaski", "Piszczac", "Poniatowa", "Potok Górny", "Puławy", 
    "Radzyń Podlaski", "Rejowiec", "Rejowiec Fabryczny", "Ryki", "Rossosz", "Serokomla", "Siedliszcze", "Siennica Różana", 
    "Skierbieszów", "Stary Zamość", "Stoczek Łukowski", "Szczebrzeszyn", "Świdnik", "Tarnogród", "Terespol", "Tereszpol", 
    "Tomaszów Lubelski", "Tyszowce", "Urszulin", "Urzędów", "Włodawa", "Wojciechów", "Wola Uhruska", "Wólka", "Zamość", "Zwierzyniec"
  ],
  "Lubuskie": [
    "Babimost", "Bytom Odrzański", "Cybinka", "Czerwieńsk", "Dąbie", "Dobiegniew", "Dębno", "Drezdenko", "Gozdnica", "Gorzów Wielkopolski", 
    "Gubin", "Iłowa", "Jasień", "Kargowa", "Kostrzyn nad Odrą", "Kożuchów", "Krosno Odrzańskie", "Lubsko", "Łęknica", "Małomice", 
    "Międzyrzecz", "Nowa Sól", "Nowe Miasteczko", "Nowogród Bobrzański", "Ośno Lubuskie", "Rzepin", "Skwierzyna", "Sława", "Słubice", 
    "Strzelce Krajeńskie", "Sulechów", "Sulęcin", "Szlichtyngowa", "Szprotawa", "Świebodzin", "Torzym", "Trzciel", "Wschowa", 
    "Witnica", "Zbąszynek", "Zielona Góra", "Żagań", "Żary"
  ],
  "Łódzkie": [
    "Aleksandrów Łódzki", "Andrespol", "Bełchatów", "Biała Rawska", "Błaszki", "Brzeziny", "Dłutów", "Działoszyn", "Drzewica", 
    "Głowno", "Grabów", "Kamieńsk", "Koluszki", "Konstantynów Łódzki", "Krośniewice", "Kutno", "Łask", "Łęczyca", "Łowicz", "Łódź", 
    "Opoczno", "Ozorków", "Pabianice", "Pajęczno", "Parzęczew", "Piotrków Trybunalski", "Poddębice", "Przedbórz", "Radomsko", 
    "Rawa Mazowiecka", "Rząśnia", "Rzgów", "Sieradz", "Skierniewice", "Stryków", "Sulejów", "Szadek", "Tomaszów Mazowiecki", 
    "Tuszyn", "Ujazd", "Uniejów", "Warta", "Wieluń", "Wieruszów", "Wolbórz", "Zduńska Wola", "Zelów", "Zgierz", "Złoczew"
  ],
  "Małopolskie": [
    "Alwernia", "Andrychów", "Babice", "Biały Dunajec", "Biecz", "Bochnia", "Bolesław", "Brzesko", "Brzeszcze", "Bukowno", 
    "Bystra-Sidzina", "Chełmek", "Chrzanów", "Ciężkowice", "Czarny Dunajec", "Czchów", "Dąbrowa Tarnowska", "Dobczyce", "Dobra", 
    "Gdów", "Gołcza", "Gorlice", "Gręboszów", "Gromnik", "Grybów", "Igołomia-Wawrzeńczyce", "Iwanowice", "Iwkowa", "Jabłonka", 
    "Jerzmanowice-Przeginia", "Jordanów", "Kalwaria Zebrzydowska", "Kamionka Wielka", "Kęty", "Klucze", "Kocmyrzów-Luborzyca", 
    "Koniusza", "Korzenna", "Koszyce", "Kraków", "Krościenko nad Dunajcem", "Krynica-Zdrój", "Krzeszowice", "Lanckorona", "Laskowa", 
    "Libiąż", "Limanowa", "Lisia Góra", "Liszki", "Lubień", "Maków Podhalański", "Michałowice", "Miechów", "Mogilany", "Mszana Dolna", 
    "Muszyna", "Myślenice", "Nawojowa", "Niepołomice", "Nowe Brzesko", "Nowy Sącz", "Nowy Targ", "Nowy Wiśnicz", "Ochotnica Dolna", 
    "Olkusz", "Oświęcim", "Pcim", "Piwniczna-Zdrój", "Pleśna", "Podegrodzie", "Polanka Wielka", "Proszowice", "Rabka-Zdrój", "Racławice", 
    "Radgoszcz", "Radłów", "Ryglice", "Rzepiennik Strzyżewski", "Sękowa", "Siepraw", "Skała", "Skawina", "Skrzyszów", "Słaboszów", 
    "Słomniki", "Spytkowice", "Stary Sącz", "Stryszów", "Sucha Beskidzka", "Sułkowice", "Sułoszowa", "Szczawnica", "Szczucin", 
    "Szczurowa", "Szerzyny", "Tarnów", "Tokarnia", "Trzebinia", "Tuchów", "Tymbark", "Wadowice", "Wieliczka", "Wielka Wieś", 
    "Wietrzychowice", "Wiśniowa", "Wojnicz", "Wolbrom", "Zabierzów", "Zakliczyn", "Zakopane", "Zator", "Zawoja", "Zembrzyce", 
    "Żabno", "Żegocina"
  ],
  "Mazowieckie": [
    "Baranowo", "Belsk Duży", "Białobrzegi", "Bieżuń", "Błonie", "Bodzanów", "Brok", "Brwinów", "Celestynów", "Ciechanów", 
    "Czernice Borowe", "Czerwińsk nad Wisłą", "Dębe Wielkie", "Dobre", "Drobin", "Garwolin", "Glinojeck", "Gostynin", "Góra Kalwaria", 
    "Grodzisk Mazowiecki", "Grójec", "Halinów", "Iłża", "Jabłonna", "Jadów", "Jaktorów", "Jasieniec", "Jedlnia-Letnisko", "Józefów", 
    "Kałuszyn", "Karczew", "Klembów", "Kobyłka", "Konstancin-Jeziorna", "Kosów Lacki", "Kozienice", "Legionowo", "Lipsko", "Łaskarzew", 
    "Łochów", "Łomianki", "Łosice", "Maków Mazowiecki", "Marki", "Milanówek", "Mińsk Mazowiecki", "Mława", "Mogielnica", "Mordy", 
    "Mszczonów", "Myszyniec", "Nasielsk", "Nowe Miasto nad Pilicą", "Nowy Dwór Mazowiecki", "Ostrołęka", "Ostrów Mazowiecka", 
    "Otwock", "Ożarów Mazowiecki", "Parysów", "Piastów", "Piaseczno", "Pilawa", "Pionki", "Płock", "Płońsk", "Podkowa Leśna", 
    "Pruszków", "Przasnysz", "Przysucha", "Pułtusk", "Raciąż", "Radom", "Radzymin", "Różan", "Serock", "Siedlce", "Sierpc", 
    "Skaryszew", "Sochaczew", "Sokołów Podlaski", "Stoczek Łukowski", "Sulejówek", "Szydłowiec", "Tarczyn", "Tłuszcz", "Warszawa", 
    "Węgrów", "Wiskitki", "Wołomin", "Wyszków", "Wyszogród", "Wyśmierzyce", "Zakroczym", "Ząbki", "Zielonka", "Zwoleń", "Żuromin", 
    "Żyrardów"
  ],
  "Opolskie": [
    "Baborów", "Biała", "Byczyna", "Brzeg", "Dobrodzień", "Głogówek", "Głubczyce", "Głuchołazy", "Gogolin", "Grodków",
    "Izbicko", "Kietrz", "Kluczbork", "Kolonowskie", "Komprachcice", "Korfantów", "Krapkowice", "Leśnica", "Lewin Brzeski",
    "Łubniany", "Namysłów", "Niemodlin", "Nysa", "Olesno", "Olszanka", "Opole", "Otmuchów", "Ozimek", "Paczków", "Pokój",
    "Polska Cerekiew", "Popielów", "Praszka", "Prószków", "Prudnik", "Reńska Wieś", "Skoroszyce", "Strzelce Opolskie", "Strzeleczki",
    "Tarnów Opolski", "Tułowice", "Turawa", "Ujazd", "Walce", "Wołczyn", "Zawadzkie", "Zdzieszowice", "Zębowice"
  ],
  "Podkarpackie": [
    "Adamówka", "Bachórz", "Baligród", "Baranów Sandomierski", "Besko", "Białobrzegi", "Bircza", "Błażowa", "Boguchwała", 
    "Bojanów", "Brzostek", "Brzozów", "Bukowsko", "Chorkówka", "Chmielnik", "Cieszanów", "Cmolas", "Czarna", "Czudec", "Dębica", 
    "Dębowiec", "Dubiecko", "Dukla", "Dydnia", "Dynów", "Dzikowiec", "Frysztak", "Gać", "Głogów Małopolski", "Gorzyce", "Grabownica", 
    "Grębów", "Harasiuki", "Horyniec-Zdrój", "Hyżne", "Iwierzyce", "Iwonicz-Zdrój", "Jarocin", "Jarosław", "Jasienica Rosielna", "Jasło", 
    "Jaśliska", "Jawornik Polski", "Jedlicze", "Jeżowe", "Jodłowa", "Kamień", "Kańczuga", "Kolbuszowa", "Kołaczyce", "Komańcza", 
    "Korczyna", "Kotlina", "Krasiczyn", "Krasne", "Krempna", "Krosno", "Krościenko Wyżne", "Krzeszów", "Krzywcza", "Kuryłówka", 
    "Laszki", "Lesko", "Leżajsk", "Lubaczów", "Lubenia", "Lutowiska", "Łańcut", "Majdan Królewski", "Markowa", "Medyka", "Miejsce Piastowe", 
    "Mielec", "Narol", "Niebylec", "Nisko", "Nowa Dęba", "Nowa Sarzyna", "Nowy Żmigród", "Nozdrzec", "Oleszyce", "Olszanica", "Orły", 
    "Osiek Jasielski", "Ostrów", "Padew Narodowa", "Pawłosiów", "Pilzno", "Pruchnik", "Przemyśl", "Przeworsk", "Pysznica", "Radomyśl Wielki", 
    "Radymno", "Rakszawa", "Raniżów", "Rokietnica", "Ropczyce", "Roźwienica", "Rudnik nad Sanem", "Rymanów", "Rzeszów", "Sanok", 
    "Sędziszów Małopolski", "Sieniawa", "Skołyszyn", "Sokołów Małopolski", "Solina", "Stalowa Wola", "Stary Dzików", "Strzyżów", 
    "Stubno", "Świlcza", "Tarnobrzeg", "Tarnowiec", "Tryńcza", "Trzebownisko", "Tuszów Narodowy", "Tyczyn", "Tyrawa Wołoska", 
    "Ulanów", "Ustrzyki Dolne", "Wadowice Górne", "Wiązownica", "Wielkie Oczy", "Wielopole Skrzyńskie", "Wiśniowa", "Wojaszówka", 
    "Zagórz", "Zaklików", "Zaleszany", "Zarszyn", "Zarzecze", "Żołynia", "Żurawica", "Żyraków"
  ],
  "Podlaskie": [
    "Augustów", "Bakałarzewo", "Białowieża", "Białystok", "Bielsk Podlaski", "Boćki", "Brańsk", "Choroszcz", "Ciechanowiec", 
    "Czarna Białostocka", "Czeremcha", "Czyże", "Dąbrowa Białostocka", "Dobrzyniewo Duże", "Drohiczyn", "Dubicze Cerkiewne", 
    "Dziadkowice", "Filipów", "Giby", "Goniądz", "Grajewo", "Gródek", "Hajnówka", "Jałówka", "Janów", "Jedwabne", "Jeleniewo", 
    "Juchnowiec Kościelny", "Kleszczele", "Knyszyn", "Kolno", "Korycin", "Krasnopol", "Krynki", "Krypno", "Kuźnica", "Lipsk", 
    "Łapy", "Łomża", "Mały Płock", "Michałowo", "Milejczyce", "Mońki", "Narew", "Narewka", "Nowogród", "Nowy Dwór", "Orla", 
    "Perlejewo", "Piątnica", "Płaska", "Przerośl", "Przytuły", "Puńsk", "Rajgród", "Raczki", "Sejny", "Siemiatycze", "Sokółka", 
    "Sokoły", "Stawiski", "Suchowola", "Supraśl", "Suraż", "Suwałki", "Szczuczyn", "Szepietowo", "Szudziałowo", "Szumowo", 
    "Śniadowo", "Turośl", "Turośń Kościelna", "Tykocin", "Wasilków", "Wąsosz", "Wizna", "Wysokie Mazowieckie", "Zabłudów", 
    "Zambrów", "Zawady", "Zbójna"
  ],
  "Pomorskie": [
    "Banino", "Brusy", "Bytów", "Cedry Wielkie", "Chojnice", "Chmielno", "Choczewo", "Czarna Woda", "Czarne", "Czersk", 
    "Człuchów", "Damnica", "Debrzno", "Dębnica Kaszubska", "Dziemiany", "Dzierzgoń", "Dźwirzyno", "Elbląg", "Gardeja", "Gdańsk", 
    "Gdynia", "Gniew", "Gniewino", "Główczyce", "Hel", "Jastarnia", "Kaliska", "Karsin", "Kartuzy", "Kolbudy", "Kołobrzeg", "Konarzyny", 
    "Kosakowo", "Kościerzyna", "Krokowa", "Krynica Morska", "Kwidzyn", "Lębork", "Lichnowy", "Liniewo", "Lipnica", "Lipusz", "Lubichowo", 
    "Łeba", "Łęczyce", "Malbork", "Miastko", "Mikołajki Pomorskie", "Morzeszczyn", "Nowa Karczma", "Nowa Wieś Lęborska", "Nowy Dwór Gdański", 
    "Nowy Staw", "Osiek", "Osieczna", "Ostaszewo", "Parchowo", "Pelplin", "Potęgowo", "Prabuty", "Pruszcz Gdański", "Przechlewo", "Przywidz", 
    "Pszczółki", "Puck", "Reda", "Rumia", "Ryjewo", "Rzeczenica", "Sadlinki", "Sierakowice", "Skarszewy", "Skórcz", "Słupsk", "Smętowo Graniczne", 
    "Smołdzino", "Somonino", "Sopot", "Starogard Gdański", "Stary Dzierzgoń", "Stary Targ", "Stegna", "Stężyca", "Studzienice", "Subkowy", 
    "Suchy Dąb", "Sulęczyno", "Szemud", "Sztum", "Sztutowo", "Tczew", "Tuchomie", "Ustka", "Wejherowo", "Władysławowo", "Żukowo"
  ],
  "Śląskie": [
    "Bestwina", "Będzin", "Bielsko-Biała", "Blachownia", "Bobrowniki", "Bojszowy", "Boronów", "Brenna", "Bytom", "Chełm Śląski", 
    "Chorzów", "Chybie", "Ciasna", "Cieszyn", "Czechowice-Dziedzice", "Czerwionka-Leszczyny", "Częstochowa", "Czeladź", "Dąbrowa Górnicza", 
    "Dębowiec", "Gaszowice", "Gierałtowice", "Gilowice", "Gliwice", "Godów", "Goczałkowice-Zdrój", "Goleszów", "Gorzyce", "Herby", 
    "Hażlach", "Irządze", "Istebna", "Jasienica", "Jastrzębie-Zdrój", "Jaworzno", "Jejkowice", "Jeleśnia", "Kalety", "Kamienica Polska", 
    "Katowice", "Kłobuck", "Kłomnice", "Knurów", "Kobiór", "Koniecpol", "Konopiska", "Kornowac", "Koszarawa", "Koszęcin", "Koziegłowy", 
    "Kozy", "Kroczyce", "Krupski Młyn", "Kruszyna", "Krzanowice", "Krzepice", "Krzyżanowice", "Kuźnia Raciborska", "Lelów", "Lipie", 
    "Lipowa", "Lędziny", "Lubliniec", "Lubomia", "Lyski", "Łaziska Górne", "Łazy", "Marklowice", "Miasteczko Śląskie", "Miedźna", 
    "Miedźno", "Mierzęcice", "Mikołów", "Milówka", "Mstów", "Mysłowice", "Myszków", "Mykanów", "Nędza", "Niegowa", "Ogrodzieniec", 
    "Olsztyn", "Opatów", "Ornontowice", "Orzesze", "Ożarowice", "Pawłowice", "Pawonków", "Piekary Śląskie", "Pietrowice Wielkie", 
    "Pilchowice", "Pilica", "Poczesna", "Popów", "Poraj", "Porąbka", "Poręba", "Pszów", "Pszczyna", "Pyskowice", "Racibórz", "Radlin", 
    "Radłów", "Radzionków", "Rajcza", "Rędziny", "Ruda Śląska", "Rudnik", "Rudziniec", "Rybnik", "Rydułtowy", "Siemianowice Śląskie", 
    "Skoczów", "Sławków", "Sosnowiec", "Sośnicowice", "Starcza", "Strumień", "Suszec", "Szczekociny", "Szczyrk", "Świerklaniec", 
    "Świerklany", "Świętochłowice", "Tarnowskie Góry", "Toszek", "Tworóg", "Tychy", "Ujsoły", "Ustroń", "Węgierska Górka", "Wilamowice", 
    "Wilkowice", "Wisła", "Wodzisław Śląski", "Wojkowice", "Woźniki", "Wręczyca Wielka", "Wyry", "Zawiercie", "Zabrze", "Zbrosławice", 
    "Zebrzydowice", "Żarki", "Żarnowiec", "Żory", "Żywiec"
  ],
  "Świętokrzyskie": [
    "Bałtów", "Baćkowice", "Bejsce", "Bieliny", "Bliżyn", "Bodzechów", "Bodzentyn", "Bogoria", "Brody", "Busko-Zdrój", 
    "Chęciny", "Chmielnik", "Czarnocin", "Daleszyce", "Dwikozy", "Działoszyce", "Fałków", "Gnojno", "Gowarczów", "Górno", 
    "Imielno", "Iwaniska", "Jędrzejów", "Kazimierza Wielka", "Kielce", "Klimontów", "Kluczewsko", "Końskie", "Koprzywnica", 
    "Krasocin", "Kunów", "Lipnik", "Łagów", "Łączna", "Łoniów", "Łopuszno", "Małogoszcz", "Masłów", "Michałów", "Miedziana Góra", 
    "Mirzec", "Mniów", "Morawica", "Nagłowice", "Nowa Słupia", "Nowy Korczyn", "Opatów", "Opatowiec", "Osiek", "Ożarów", "Pacanów", 
    "Pawłów", "Piekoszów", "Pierzchnica", "Pińczów", "Połaniec", "Radków", "Raków", "Ruda Maleniecka", "Rytwiany", "Sadowie", 
    "Samborzec", "Sandomierz", "Secemin", "Sędziszów", "Sitkówka-Nowiny", "Skarżysko Kościelne", "Skarżysko-Kamienna", "Skalbmierz", 
    "Słupia", "Smyków", "Sobków", "Solec-Zdrój", "Starachowice", "Staszów", "Stąporków", "Stopnica", "Strawczyn", "Suchedniów", 
    "Szydłów", "Tarłów", "Tuczępy", "Waśniów", "Wąchock", "Wiślica", "Wilczyce", "Włoszczowa", "Wodzisław", "Wojciechowice", 
    "Zagnańsk", "Zawichost", "Złota"
  ],
  "Warmińsko-mazurskie": [
    "Barciany", "Barczewo", "Bartoszyce", "Banie Mazurskie", "Biała Piska", "Biskupiec", "Bisztynek", "Braniewo", 
    "Budry", "Dąbrówno", "Dobre Miasto", "Dubeninki", "Działdowo", "Dywity", "Dźwierzuty", "Elbląg", "Ełk", "Frombork", 
    "Gietrzwałd", "Giżycko", "Godkowo", "Gołdap", "Górowo Iławeckie", "Grodziczno", "Gronowo Elbląskie", "Grunwald", 
    "Iława", "Iłowo-Osada", "Janowiec Kościelny", "Janowo", "Jedwabno", "Jeziorany", "Jonkowo", "Kalinowo", "Kętrzyn", 
    "Kisielice", "Kiwity", "Kolno", "Korsze", "Kowale Oleckie", "Kozłowo", "Kruklanki", "Kurzętnik", "Lelkowo", "Lidzbark", 
    "Lidzbark Warmiński", "Lubawa", "Lubomino", "Łukta", "Małdyty", "Markusy", "Mikołajki", "Milejewo", "Miłakowo", "Miłki", 
    "Miłomłyn", "Morąg", "Mrągowo", "Nidzica", "Nowe Miasto Lubawskie", "Olecko", "Olsztyn", "Olsztynek", "Orneta", "Orzysz", 
    "Ostróda", "Pasłęk", "Pasym", "Piecki", "Pieniężno", "Pisz", "Płoskinia", "Pozezdrze", "Prostki", "Purda", "Reszel", 
    "Rozogi", "Ruciane-Nida", "Rychliki", "Ryn", "Sępopol", "Sorkwity", "Srokowo", "Stawiguda", "Stare Juchy", "Stawiski", 
    "Susz", "Szczytno", "Świątki", "Świętajno", "Tolkmicko", "Węgorzewo", "Wielbark", "Wilczęta", "Wydminy", "Zalewo"
  ],
  "Wielkopolskie": [
    "Babiak", "Baranów", "Białośliwie", "Blizanów", "Bojanowo", "Borek Wielkopolski", "Bralin", "Brodnica", "Brudzew", 
    "Budzyń", "Buk", "Bukowiec", "Chocz", "Chodów", "Chodzież", "Chrzypsko Wielkie", "Czajków", "Czarnków", "Czempiń", 
    "Czermin", "Czerniejewo", "Czerwonak", "Damasławek", "Dąbie", "Dobra", "Dobrzyca", "Dolsk", "Dominowo", "Dopiewo", 
    "Doruchów", "Drawsko", "Dumarki", "Gniezno", "Golina", "Gołańcz", "Gostyń", "Grabów nad Prosną", "Granowo", "Grodziec", 
    "Grodzisk Wielkopolski", "Grzegorzew", "Jaraczewo", "Jarocin", "Jastrowie", "Jutrosin", "Kaczory", "Kalisz", "Kaźmierz", 
    "Kępno", "Kleczew", "Kłecko", "Kłodawa", "Kobylin", "Koło", "Kołaczkowo", "Konin", "Kościan", "Kościelec", "Koźmin Wielkopolski", 
    "Koźminek", "Kórnik", "Krajenka", "Kraszewice", "Krobia", "Krotoszyn", "Krzemieniewo", "Krzykosy", "Krzyż Wielkopolski", 
    "Książ Wielkopolski", "Kuślin", "Kwilcz", "Leszno", "Lipka", "Lipno", "Lisków", "Lubasz", "Luboń", "Lwówek", "Łęka Opatowska", 
    "Łobżenica", "Łubowo", "Malanów", "Margonin", "Miasteczko Krajeńskie", "Miedzichowo", "Mieleszyn", "Mieścisko", "Miejska Górka", 
    "Mielszyn", "Mikstat", "Miłosław", "Mosina", "Murowana Goślina", "Mycielin", "Nekla", "Niechanowo", "Nowe Miasto nad Wartą", 
    "Nowe Skalmierzyce", "Nowy Tomyśl", "Oborniki", "Obrzycko", "Odolanów", "Okonek", "Olszówka", "Opalenica", "Orchowo", "Osiek Mały", 
    "Osieczna", "Ostroróg", "Ostrów Wielkopolski", "Ostrzeszów", "Piasek", "Piła", "Pleszew", "Pniewy", "Pobiedziska", "Pogorzela", 
    "Połajewo", "Poniec", "Postolin", "Poznań", "Przemęt", "Przykona", "Puszczykowo", "Pyzdry", "Rakoniewice", "Raszków", "Rawicz", 
    "Rogoźno", "Rozdrażew", "Rychtal", "Rychwał", "Ryczywół", "Rydzyna", "Rzgów", "Siedlec", "Sieraków", "Skoki", "Skulsk", "Słupca", 
    "Sompolno", "Sośnie", "Stare Miasto", "Stawiszyn", "Stęszew", "Strzałkowo", "Suchy Las", "Sulmierzyce", "Swarzędz", "Szamocin", 
    "Szamotuły", "Szczytniki", "Szydłowo", "Ślesin", "Śmigiel", "Środa Wielkopolska", "Śrem", "Świecie nad Osą", "Święciechowa", 
    "Tarnowo Podgórne", "Tarnówka", "Trzcianka", "Trzemeszno", "Tuliszków", "Turek", "Ujście", "Wągrowiec", "Wapno", "Wieleń", 
    "Wielichowo", "Wieruszów", "Wilczyn", "Witkowo", "Władysławów", "Włoszakowice", "Wolsztyn", "Wronki", "Września", "Wyrzysk", 
    "Wysoka", "Zagórów", "Zakrzewo", "Zawidów", "Zbąszyń", "Zduny", "Złotów", "Żelazków", "Żerków"
  ],
  "Zachodniopomorskie": [
    "Banie", "Barlinke", "Barwice", "Będzino", "Białogard", "Biały Bór", "Bielice", "Bierzwnik", "Bobolice", "Boleszkowice", 
    "Borne Sulinowo", "Brojce", "Brzeźno", "Cedynia", "Chociwel", "Chojna", "Choszczno", "Czaplinek", "Człopa", "Darłowo", 
    "Dębno", "Dobra", "Dobrzany", "Dolice", "Drawno", "Drawsko Pomorskie", "Drewsko", "Dziwnów", "Golczewo", "Goleniów", 
    "Gościno", "Gryfice", "Gryfino", "Ińsko", "Kalisz Pomorski", "Kamień Pomorski", "Karlino", "Karnice", "Kołbaskowo", 
    "Kołobrzeg", "Koszalin", "Kozielice", "Krzęcin", "Lipiany", "Łobez", "Malechowo", "Manowo", "Marianowo", "Maszewo", 
    "Miedzichowo", "Międzyzdroje", "Mielno", "Mieszkowice", "Mirosławiec", "Moryń", "Myślibórz", "Nowe Warpno", "Nowogard", 
    "Nowogródek", "Osina", "Ostrowice", "Pełczyce", "Płoty", "Police", "Połczyn-Zdrój", "Postomino", "Przelewice", "Przybiernów", 
    "Pyrzyce", "Radowo Małe", "Recz", "Resko", "Rewal", "Rymań", "Sianów", "Siemyśl", "Sławno", "Sławoborze", "Stara Dąbrowa", 
    "Stare Czarnowo", "Stargard", "Stepnica", "Suchań", "Szczecin", "Szczecinek", "Świdwin", "Świerzno", "Świnoujście", "Trzcińsko-Zdrój", 
    "Trzebiatów", "Tuczno", "Tychowo", "Ustronie Morskie", "Wałcz", "Warnice", "Widuchowa", "Wierzchowo", "Wolin", "Węgorzyno", 
    "Złocieniec"
  ]
};

export default function MobileLocationFilterHierarchical({ value, onChange }: MobileLocationFilterHierarchicalProps) {
  const [selectedVoivodeship, setSelectedVoivodeship] = useState<string | null>(null);
  const [showCities, setShowCities] = useState(false);
  const [voivodeships] = useState(Object.keys(CITIES_BY_VOIVODESHIP));
  
  // Sprawdź, czy obecna wartość jest województwem czy miastem i ustaw odpowiednio stan
  useEffect(() => {
    if (value) {
      // Sprawdź, czy wartość jest województwem
      if (voivodeships.includes(value)) {
        setSelectedVoivodeship(value);
        setShowCities(false);
      } else {
        // Znajdź województwo dla tego miasta
        const voivodeship = Object.entries(CITIES_BY_VOIVODESHIP).find(([_, cities]) => 
          cities.includes(value)
        );
        
        if (voivodeship) {
          setSelectedVoivodeship(voivodeship[0]);
          setShowCities(true);
        }
      }
    } else {
      setSelectedVoivodeship(null);
      setShowCities(false);
    }
  }, [value, voivodeships]);

  const handleVoivodeshipSelect = (voivodeship: string) => {
    if (voivodeship === "Cała Polska") {
      onChange(voivodeship);
      setSelectedVoivodeship(voivodeship);
      setShowCities(false);
    } else {
      setSelectedVoivodeship(voivodeship);
      setShowCities(true);
    }
  };

  const handleCitySelect = (city: string) => {
    onChange(city);
  };

  const handleBack = () => {
    if (selectedVoivodeship) {
      onChange(selectedVoivodeship);
    }
    setShowCities(false);
  };

  const handleSelectWholeVoivodeship = () => {
    if (selectedVoivodeship) {
      onChange(selectedVoivodeship);
      setShowCities(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      {showCities && selectedVoivodeship ? (
        <div>
          {/* Pasek nawigacji z powrotem do województw */}
          <Button 
            variant="ghost" 
            className="flex items-center w-full justify-start p-3 rounded-none border-b border-gray-200 dark:border-gray-700 text-sm" 
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Wróć</span>
          </Button>
          
          {/* Nagłówek województwa */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
              {selectedVoivodeship}
            </h3>
            <button 
              onClick={handleSelectWholeVoivodeship}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Całe województwo
            </button>
          </div>
          
          {/* Lista miast */}
          <div>
            <h4 className="px-3 pt-3 text-xs font-medium text-gray-500 dark:text-gray-400">
              Wybierz miasto
            </h4>
            <div className="max-h-64 overflow-y-auto">
              {CITIES_BY_VOIVODESHIP[selectedVoivodeship].map((city) => (
                <button
                  key={city}
                  className={`w-full text-left px-3 py-2 text-sm border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    value === city ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Przycisk dla całej Polski */}
          <button
            className={`w-full flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 ${
              value === "Cała Polska" ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            }`}
            onClick={() => handleVoivodeshipSelect("Cała Polska")}
          >
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-sm">Cała Polska</span>
            </div>
          </button>
          
          {/* Lista województw */}
          <div className="max-h-64 overflow-y-auto">
            {voivodeships.filter(v => v !== "Cała Polska").map((voivodeship) => (
              <button
                key={voivodeship}
                className={`w-full flex items-center justify-between p-3 text-sm border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                  value === voivodeship ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                onClick={() => handleVoivodeshipSelect(voivodeship)}
              >
                <span>{voivodeship}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}