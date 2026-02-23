/* ============================================================
   cuacaXD — Database Lokasi Dunia
   Data negara, kota, dan daerah dari seluruh dunia
   dikelompokkan berdasarkan benua.
   ============================================================ */

const WORLD_LOCATIONS = {
    "Asia": {
        "Indonesia": {
            "Jakarta": ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Barat", "Jakarta Timur", "Jakarta Utara", "Kepulauan Seribu"],
            "Surabaya": ["Surabaya Pusat", "Surabaya Selatan", "Surabaya Barat", "Surabaya Timur", "Surabaya Utara"],
            "Bandung": ["Bandung Kota", "Bandung Barat", "Bandung Utara", "Lembang", "Cimahi"],
            "Medan": ["Medan Kota", "Medan Barat", "Medan Timur", "Deli Serdang", "Binjai"],
            "Semarang": ["Semarang Tengah", "Semarang Selatan", "Semarang Barat", "Semarang Timur", "Semarang Utara"],
            "Makassar": ["Makassar Kota", "Tamalanrea", "Panakkukang", "Rappocini", "Manggala"],
            "Yogyakarta": ["Yogyakarta Kota", "Sleman", "Bantul", "Gunung Kidul", "Kulon Progo"],
            "Denpasar": ["Denpasar Kota", "Kuta", "Seminyak", "Ubud", "Sanur", "Nusa Dua"],
            "Palembang": ["Palembang Kota", "Ilir Barat", "Ilir Timur", "Seberang Ulu"],
            "Manado": ["Manado Kota", "Tomohon", "Bitung"],
            "Balikpapan": ["Balikpapan Kota", "Balikpapan Selatan", "Balikpapan Utara"],
            "Pontianak": ["Pontianak Kota", "Pontianak Selatan", "Pontianak Timur"],
            "Malang": ["Malang Kota", "Batu", "Kepanjen"],
            "Lombok": ["Mataram", "Senggigi", "Kuta Lombok"],
            "Aceh": ["Banda Aceh", "Lhokseumawe", "Sabang"]
        },
        "Malaysia": {
            "Kuala Lumpur": ["KLCC", "Bukit Bintang", "Cheras", "Bangsar", "Mont Kiara", "Petaling Jaya"],
            "Penang": ["George Town", "Bayan Lepas", "Butterworth", "Tanjung Bungah"],
            "Johor Bahru": ["JB City Centre", "Iskandar Puteri", "Pasir Gudang", "Skudai"],
            "Kuching": ["Kuching City", "Kota Samarahan", "Bau"],
            "Kota Kinabalu": ["KK City Centre", "Penampang", "Putatan"],
            "Melaka": ["Melaka City", "Ayer Keroh", "Alor Gajah"],
            "Ipoh": ["Ipoh City", "Batu Gajah", "Gopeng"]
        },
        "Singapura": {
            "Singapore": ["Orchard", "Marina Bay", "Sentosa", "Changi", "Jurong", "Woodlands", "Tampines", "Ang Mo Kio"]
        },
        "Thailand": {
            "Bangkok": ["Sukhumvit", "Silom", "Siam", "Chatuchak", "Khao San", "Thonburi"],
            "Chiang Mai": ["Old City", "Nimman", "Night Bazaar", "San Kamphaeng"],
            "Phuket": ["Patong", "Kata", "Karon", "Phuket Town", "Rawai"],
            "Pattaya": ["Pattaya City", "Jomtien", "Naklua"],
            "Krabi": ["Ao Nang", "Krabi Town", "Railay"]
        },
        "Jepang": {
            "Tokyo": ["Shinjuku", "Shibuya", "Ginza", "Akihabara", "Asakusa", "Roppongi", "Ikebukuro", "Harajuku"],
            "Osaka": ["Namba", "Umeda", "Shinsekai", "Dotonbori", "Tennoji"],
            "Kyoto": ["Gion", "Arashiyama", "Fushimi", "Higashiyama", "Kinkaku-ji Area"],
            "Yokohama": ["Minato Mirai", "Chinatown", "Kannai"],
            "Sapporo": ["Odori", "Susukino", "Tanukikoji"],
            "Nagoya": ["Sakae", "Nagoya Station", "Osu"],
            "Fukuoka": ["Hakata", "Tenjin", "Nakasu"],
            "Hiroshima": ["Peace Park Area", "Miyajima", "Hiroshima Station"],
            "Okinawa": ["Naha", "Chatan", "Nago"]
        },
        "Korea Selatan": {
            "Seoul": ["Gangnam", "Myeongdong", "Hongdae", "Itaewon", "Jongno", "Yeouido", "Insadong"],
            "Busan": ["Haeundae", "Nampo-dong", "Seomyeon", "Gwangalli"],
            "Incheon": ["Songdo", "Bupyeong", "Jung-gu"],
            "Jeju": ["Jeju City", "Seogwipo", "Hallim"],
            "Daegu": ["Dongseong-ro", "Suseong", "Buk-gu"]
        },
        "Tiongkok": {
            "Beijing": ["Dongcheng", "Chaoyang", "Haidian", "Xicheng", "Fengtai"],
            "Shanghai": ["Pudong", "Huangpu", "Jing'an", "Xuhui", "Minhang"],
            "Guangzhou": ["Tianhe", "Yuexiu", "Liwan", "Haizhu"],
            "Shenzhen": ["Nanshan", "Futian", "Luohu", "Bao'an"],
            "Chengdu": ["Jinjiang", "Wuhou", "Qingyang", "Chenghua"],
            "Hangzhou": ["Xihu", "Shangcheng", "Binjiang"],
            "Xi'an": ["Beilin", "Yanta", "Lianhu"],
            "Chongqing": ["Yuzhong", "Jiangbei", "Shapingba"],
            "Hong Kong": ["Central", "Tsim Sha Tsui", "Causeway Bay", "Mong Kok", "Wan Chai", "Lantau Island"],
            "Macau": ["Macau Peninsula", "Taipa", "Cotai"]
        },
        "India": {
            "Mumbai": ["Bandra", "Colaba", "Andheri", "Juhu", "Powai", "Worli"],
            "New Delhi": ["Connaught Place", "Chandni Chowk", "Dwarka", "Saket", "Karol Bagh"],
            "Bangalore": ["Koramangala", "Whitefield", "Indiranagar", "MG Road", "Electronic City"],
            "Chennai": ["T. Nagar", "Adyar", "Anna Nagar", "Velachery", "Mylapore"],
            "Kolkata": ["Park Street", "Salt Lake", "Howrah", "New Town", "Ballygunge"],
            "Hyderabad": ["Banjara Hills", "Hitech City", "Jubilee Hills", "Charminar", "Gachibowli"],
            "Jaipur": ["Pink City", "Malviya Nagar", "Vaishali Nagar", "C-Scheme"],
            "Goa": ["Panaji", "Calangute", "Baga", "Margao", "Vasco da Gama"],
            "Agra": ["Taj Ganj", "Sadar Bazaar", "Sikandra"],
            "Varanasi": ["Dashashwamedh", "Assi Ghat", "Godowlia"]
        },
        "Filipina": {
            "Manila": ["Makati", "BGC", "Quezon City", "Ermita", "Intramuros", "Pasay"],
            "Cebu": ["Cebu City", "Mactan", "Mandaue", "Lapu-Lapu"],
            "Davao": ["Davao City", "Samal Island", "Toril"],
            "Boracay": ["Station 1", "Station 2", "Station 3"],
            "Palawan": ["Puerto Princesa", "El Nido", "Coron"]
        },
        "Vietnam": {
            "Ho Chi Minh City": ["District 1", "District 2", "District 3", "District 7", "Binh Thanh"],
            "Hanoi": ["Hoan Kiem", "Ba Dinh", "Tay Ho", "Dong Da", "Cau Giay"],
            "Da Nang": ["Hai Chau", "Son Tra", "Ngu Hanh Son", "Thanh Khe"],
            "Hoi An": ["Old Town", "An Bang Beach", "Cua Dai"],
            "Nha Trang": ["City Center", "Tran Phu Beach", "Vinpearl"]
        },
        "Uni Emirat Arab": {
            "Dubai": ["Downtown Dubai", "Dubai Marina", "Jumeirah", "Deira", "Bur Dubai", "Palm Jumeirah", "JBR"],
            "Abu Dhabi": ["Corniche", "Yas Island", "Saadiyat Island", "Al Reem Island", "Al Ain"],
            "Sharjah": ["Al Majaz", "Al Nahda", "Al Qasimia"],
            "Ajman": ["Ajman City", "Al Nuaimia", "Al Rashidiya"]
        },
        "Arab Saudi": {
            "Riyadh": ["Al Olaya", "Al Malaz", "Diriyah", "Al Murabba"],
            "Jeddah": ["Al Balad", "Corniche", "Al Hamra", "Al Rawdah"],
            "Makkah": ["Haram Area", "Aziziyah", "Al Awali"],
            "Madinah": ["Al Masjid an Nabawi Area", "Quba", "Uhud"]
        },
        "Turki": {
            "Istanbul": ["Sultanahmet", "Beyoğlu", "Kadıköy", "Beşiktaş", "Taksim", "Üsküdar", "Fatih"],
            "Ankara": ["Çankaya", "Kızılay", "Ulus", "Keçiören"],
            "Antalya": ["Kaleiçi", "Lara", "Konyaaltı", "Belek"],
            "Izmir": ["Alsancak", "Konak", "Bornova", "Çeşme"],
            "Cappadocia": ["Göreme", "Ürgüp", "Avanos", "Uçhisar"]
        },
        "Qatar": {
            "Doha": ["West Bay", "The Pearl", "Souq Waqif", "Lusail", "Al Sadd", "Katara"]
        },
        "Pakistan": {
            "Karachi": ["Clifton", "DHA", "Saddar", "Gulshan-e-Iqbal"],
            "Lahore": ["Gulberg", "DHA Lahore", "Old City", "Model Town"],
            "Islamabad": ["Blue Area", "F-Sectors", "G-Sectors", "E-Sectors"]
        },
        "Bangladesh": {
            "Dhaka": ["Gulshan", "Banani", "Dhanmondi", "Uttara", "Motijheel"],
            "Chittagong": ["Agrabad", "Nasirabad", "Patenga"]
        },
        "Sri Lanka": {
            "Colombo": ["Fort", "Pettah", "Bambalapitiya", "Kollupitiya"],
            "Kandy": ["Kandy City", "Peradeniya", "Katugastota"],
            "Galle": ["Galle Fort", "Unawatuna", "Hikkaduwa"]
        },
        "Myanmar": {
            "Yangon": ["Downtown", "Bahan", "Kamaryut", "Hlaing"],
            "Mandalay": ["Mandalay City", "Amarapura", "Sagaing"]
        },
        "Kamboja": {
            "Phnom Penh": ["Daun Penh", "Chamkarmon", "Toul Kork", "BKK"],
            "Siem Reap": ["Old Market", "Pub Street Area", "Angkor Area"]
        },
        "Nepal": {
            "Kathmandu": ["Thamel", "Durbar Square", "Patan", "Bhaktapur", "Boudhanath"]
        },
        "Mongolia": {
            "Ulaanbaatar": ["Sukhbaatar", "Bayangol", "Chingeltei"]
        }
    },

    "Eropa": {
        "Inggris": {
            "London": ["Westminster", "Camden", "Kensington", "Greenwich", "Shoreditch", "Soho", "Mayfair", "Notting Hill"],
            "Manchester": ["City Centre", "Salford", "Didsbury", "Ancoats"],
            "Birmingham": ["City Centre", "Edgbaston", "Jewellery Quarter"],
            "Edinburgh": ["Old Town", "New Town", "Leith", "Stockbridge"],
            "Liverpool": ["City Centre", "Albert Dock", "Baltic Triangle"],
            "Oxford": ["City Centre", "Jericho", "Headington"],
            "Cambridge": ["City Centre", "King's Parade", "Mill Road"]
        },
        "Prancis": {
            "Paris": ["Le Marais", "Montmartre", "Saint-Germain", "Champs-Élysées", "Latin Quarter", "Bastille", "Belleville"],
            "Lyon": ["Vieux Lyon", "Presqu'île", "Part-Dieu", "Croix-Rousse"],
            "Marseille": ["Vieux-Port", "Le Panier", "La Canebière"],
            "Nice": ["Promenade des Anglais", "Vieux Nice", "Cimiez"],
            "Bordeaux": ["Saint-Pierre", "Chartrons", "Saint-Michel"],
            "Strasbourg": ["Grande Île", "Petite France", "Krutenau"]
        },
        "Jerman": {
            "Berlin": ["Mitte", "Kreuzberg", "Prenzlauer Berg", "Charlottenburg", "Friedrichshain", "Neukölln"],
            "Munich": ["Altstadt", "Schwabing", "Maxvorstadt", "Haidhausen"],
            "Hamburg": ["Altstadt", "St. Pauli", "HafenCity", "Sternschanze"],
            "Frankfurt": ["Innenstadt", "Sachsenhausen", "Westend", "Bornheim"],
            "Cologne": ["Altstadt", "Ehrenfeld", "Lindenthal"],
            "Dresden": ["Altstadt", "Neustadt", "Loschwitz"]
        },
        "Italia": {
            "Rome": ["Centro Storico", "Trastevere", "Monti", "Vatican Area", "Testaccio", "Prati"],
            "Milan": ["Duomo", "Brera", "Navigli", "Porta Nuova", "Isola"],
            "Florence": ["Centro", "Oltrarno", "Santa Croce", "San Lorenzo"],
            "Venice": ["San Marco", "Cannaregio", "Dorsoduro", "Murano", "Burano"],
            "Naples": ["Centro Storico", "Spaccanapoli", "Chiaia", "Vomero"],
            "Amalfi": ["Amalfi Town", "Positano", "Ravello"]
        },
        "Spanyol": {
            "Madrid": ["Sol-Gran Vía", "Malasaña", "La Latina", "Salamanca", "Chueca", "Retiro"],
            "Barcelona": ["Gothic Quarter", "Eixample", "Gràcia", "El Born", "Barceloneta", "Poble Sec"],
            "Seville": ["Santa Cruz", "Triana", "Macarena", "Alameda"],
            "Valencia": ["Ciutat Vella", "Ruzafa", "El Cabanyal"],
            "Bilbao": ["Casco Viejo", "Abando", "Deusto"],
            "Granada": ["Albaicín", "Centro", "Sacromonte"]
        },
        "Belanda": {
            "Amsterdam": ["Centrum", "Jordaan", "De Pijp", "Oud-West", "Noord", "Oost"],
            "Rotterdam": ["Centrum", "Kop van Zuid", "Delfshaven"],
            "The Hague": ["Centrum", "Scheveningen", "Archipel"],
            "Utrecht": ["Centrum", "Lombok", "Wittevrouwen"]
        },
        "Swiss": {
            "Zurich": ["Altstadt", "Kreis 1", "Kreis 4", "Kreis 5"],
            "Geneva": ["Old Town", "Eaux-Vives", "Carouge"],
            "Bern": ["Altstadt", "Kirchenfeld", "Länggasse"],
            "Lucerne": ["Altstadt", "Tribschen", "Meggen"],
            "Interlaken": ["Interlaken West", "Interlaken Ost", "Unterseen"]
        },
        "Austria": {
            "Vienna": ["Innere Stadt", "Leopoldstadt", "Neubau", "Mariahilf", "Wieden"],
            "Salzburg": ["Altstadt", "Nonntal", "Maxglan"],
            "Innsbruck": ["Altstadt", "Wilten", "Pradl"]
        },
        "Portugal": {
            "Lisbon": ["Alfama", "Baixa", "Bairro Alto", "Belém", "Chiado", "Mouraria"],
            "Porto": ["Ribeira", "Cedofeita", "Foz do Douro", "Miragaia"],
            "Faro": ["Cidade Velha", "Montenegro", "Gambelas"]
        },
        "Yunani": {
            "Athens": ["Plaka", "Monastiraki", "Psiri", "Kolonaki", "Exarchia"],
            "Thessaloniki": ["Ano Poli", "Ladadika", "Kalamaria"],
            "Santorini": ["Oia", "Fira", "Imerovigli", "Kamari"],
            "Mykonos": ["Mykonos Town", "Ornos", "Platis Gialos"],
            "Crete": ["Heraklion", "Chania", "Rethymno", "Agios Nikolaos"]
        },
        "Rusia": {
            "Moscow": ["Red Square Area", "Arbat", "Tverskaya", "Zamoskvorechye", "Kitay-gorod"],
            "Saint Petersburg": ["Nevsky Prospekt", "Vasilievsky Island", "Petrogradsky", "Admiralteysky"],
            "Kazan": ["Kremlin Area", "Bauman Street", "Novo-Savinovsky"],
            "Sochi": ["Central Sochi", "Adler", "Krasnaya Polyana"]
        },
        "Polandia": {
            "Warsaw": ["Stare Miasto", "Śródmieście", "Praga", "Mokotów"],
            "Krakow": ["Stare Miasto", "Kazimierz", "Podgórze", "Nowa Huta"],
            "Gdansk": ["Główne Miasto", "Wrzeszcz", "Oliwa"]
        },
        "Ceko": {
            "Prague": ["Staré Město", "Malá Strana", "Vinohrady", "Žižkov", "Nové Město"],
            "Brno": ["Centrum", "Královo Pole", "Žabovřesky"]
        },
        "Hungaria": {
            "Budapest": ["Belváros", "Erzsébetváros", "Buda Castle", "Terézváros", "Józsefváros"]
        },
        "Swedia": {
            "Stockholm": ["Gamla Stan", "Södermalm", "Östermalm", "Norrmalm", "Djurgården"],
            "Gothenburg": ["Centrum", "Haga", "Linnéstaden"],
            "Malmö": ["Gamla Staden", "Västra Hamnen", "Möllevången"]
        },
        "Norwegia": {
            "Oslo": ["Sentrum", "Grünerløkka", "Frogner", "Majorstuen"],
            "Bergen": ["Bryggen", "Sentrum", "Sandviken"],
            "Tromsø": ["Sentrum", "Tromsøya", "Kvaløya"]
        },
        "Denmark": {
            "Copenhagen": ["Indre By", "Nørrebro", "Vesterbro", "Christianshavn", "Østerbro"],
            "Aarhus": ["Centrum", "Frederiksbjerg", "Trøjborg"]
        },
        "Finlandia": {
            "Helsinki": ["Kruununhaka", "Kallio", "Kamppi", "Punavuori", "Ullanlinna"],
            "Rovaniemi": ["City Centre", "Santa Claus Village", "Ounasvaara"]
        },
        "Irlandia": {
            "Dublin": ["Temple Bar", "Georgian Quarter", "Smithfield", "Docklands", "Portobello"],
            "Cork": ["City Centre", "Shandon", "Douglas"],
            "Galway": ["Latin Quarter", "Salthill", "Eyre Square"]
        },
        "Belgia": {
            "Brussels": ["Grand Place", "Ixelles", "Saint-Gilles", "Marolles"],
            "Bruges": ["Centrum", "Sint-Anna", "Langestraat"],
            "Antwerp": ["Centrum", "Het Eilandje", "Zuid"]
        },
        "Kroasia": {
            "Zagreb": ["Gornji Grad", "Donji Grad", "Kaptol"],
            "Dubrovnik": ["Old Town", "Lapad", "Babin Kuk"],
            "Split": ["Diocletian Palace", "Bačvice", "Marjan"]
        },
        "Rumania": {
            "Bucharest": ["Old Town", "Cotroceni", "Floreasca", "Herăstrău"],
            "Cluj-Napoca": ["Centru", "Mănăștur", "Gheorgheni"]
        },
        "Islandia": {
            "Reykjavik": ["City Centre", "Laugavegur", "Hlemmur", "Vesturbær"]
        }
    },

    "Amerika Utara": {
        "Amerika Serikat": {
            "New York": ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island", "Harlem", "SoHo", "Times Square"],
            "Los Angeles": ["Hollywood", "Beverly Hills", "Santa Monica", "Venice Beach", "Downtown LA", "Malibu"],
            "Chicago": ["The Loop", "Lincoln Park", "Wicker Park", "Gold Coast", "Hyde Park"],
            "San Francisco": ["Downtown", "Fisherman's Wharf", "Mission District", "Chinatown", "SoMa", "Haight-Ashbury"],
            "Miami": ["South Beach", "Downtown", "Brickell", "Wynwood", "Coconut Grove", "Little Havana"],
            "Las Vegas": ["The Strip", "Downtown", "Fremont Street", "Summerlin", "Henderson"],
            "Washington DC": ["National Mall", "Georgetown", "Capitol Hill", "Dupont Circle", "Adams Morgan"],
            "Houston": ["Downtown", "Montrose", "Heights", "Galleria", "Memorial"],
            "Seattle": ["Downtown", "Capitol Hill", "Pike Place", "Fremont", "Ballard"],
            "Boston": ["Back Bay", "Beacon Hill", "North End", "Cambridge", "South End"],
            "Denver": ["LoDo", "Capitol Hill", "RiNo", "Cherry Creek"],
            "Nashville": ["Downtown", "The Gulch", "East Nashville", "Music Row"],
            "Austin": ["Downtown", "South Congress", "East Austin", "Rainey Street"],
            "San Diego": ["Gaslamp Quarter", "La Jolla", "Pacific Beach", "Old Town"],
            "Orlando": ["Theme Parks Area", "Downtown", "International Drive"],
            "Honolulu": ["Waikiki", "Downtown", "Ala Moana", "Diamond Head"]
        },
        "Kanada": {
            "Toronto": ["Downtown", "Yorkville", "Kensington Market", "Distillery District", "Liberty Village"],
            "Vancouver": ["Downtown", "Gastown", "Kitsilano", "Yaletown", "Commercial Drive"],
            "Montreal": ["Old Montreal", "Plateau Mont-Royal", "Downtown", "Mile End", "Griffintown"],
            "Ottawa": ["ByWard Market", "Centretown", "Glebe", "Westboro"],
            "Calgary": ["Downtown", "Kensington", "Inglewood", "Beltline"],
            "Quebec City": ["Old Quebec", "Saint-Roch", "Place Royale"]
        },
        "Meksiko": {
            "Mexico City": ["Centro Histórico", "Roma", "Condesa", "Polanco", "Coyoacán", "Chapultepec"],
            "Cancún": ["Hotel Zone", "Downtown", "Puerto Morelos", "Playa del Carmen"],
            "Guadalajara": ["Centro Histórico", "Tlaquepaque", "Zapopan", "Chapala"],
            "Puerto Vallarta": ["Zona Romántica", "Marina Vallarta", "Downtown"],
            "Monterrey": ["Centro", "San Pedro", "Cumbres", "Barrio Antiguo"]
        },
        "Kuba": {
            "Havana": ["Habana Vieja", "Vedado", "Centro Habana", "Miramar"],
            "Trinidad": ["Plaza Mayor Area", "Centro Histórico"],
            "Varadero": ["Beach Zone", "Downtown"]
        },
        "Jamaika": {
            "Kingston": ["New Kingston", "Downtown", "Half Way Tree"],
            "Montego Bay": ["Hip Strip", "Rose Hall", "Downtown"]
        },
        "Costa Rica": {
            "San José": ["Centro", "Escazú", "Santa Ana", "Barrio Amón"],
            "La Fortuna": ["Downtown", "Arenal Volcano Area"]
        },
        "Panama": {
            "Panama City": ["Casco Viejo", "El Cangrejo", "Punta Pacifica", "Costa del Este"]
        }
    },

    "Amerika Selatan": {
        "Brasil": {
            "São Paulo": ["Centro", "Paulista", "Vila Madalena", "Pinheiros", "Jardins", "Liberdade"],
            "Rio de Janeiro": ["Copacabana", "Ipanema", "Centro", "Lapa", "Santa Teresa", "Leblon", "Botafogo"],
            "Salvador": ["Pelourinho", "Barra", "Rio Vermelho"],
            "Brasília": ["Plano Piloto", "Lago Sul", "Asa Norte", "Asa Sul"],
            "Manaus": ["Centro", "Ponta Negra", "Cidade Nova"],
            "Florianópolis": ["Centro", "Lagoa da Conceição", "Jurerê"]
        },
        "Argentina": {
            "Buenos Aires": ["San Telmo", "Palermo", "Recoleta", "La Boca", "Puerto Madero", "Belgrano"],
            "Mendoza": ["Centro", "Chacras de Coria", "Godoy Cruz"],
            "Córdoba": ["Centro", "Nueva Córdoba", "Güemes"],
            "Bariloche": ["Centro Cívico", "Lago Moreno", "Cerro Catedral"]
        },
        "Kolombia": {
            "Bogotá": ["La Candelaria", "Chapinero", "Usaquén", "Zona T", "Zona Rosa"],
            "Medellín": ["El Poblado", "Laureles", "Envigado", "Centro"],
            "Cartagena": ["Old City", "Getsemaní", "Bocagrande"],
            "Cali": ["Centro", "San Antonio", "Granada"]
        },
        "Peru": {
            "Lima": ["Miraflores", "Barranco", "San Isidro", "Centro Histórico"],
            "Cusco": ["Plaza de Armas", "San Blas", "Sacsayhuamán"],
            "Arequipa": ["Centro Histórico", "Cayma", "Yanahuara"]
        },
        "Chile": {
            "Santiago": ["Providencia", "Las Condes", "Bellavista", "Lastarria", "Centro"],
            "Valparaíso": ["Cerro Alegre", "Cerro Concepción", "Puerto"],
            "Viña del Mar": ["Centro", "Reñaca", "Jardín del Mar"]
        },
        "Ekuador": {
            "Quito": ["Centro Histórico", "La Mariscal", "La Floresta"],
            "Guayaquil": ["Malecón 2000", "Las Peñas", "Centro"]
        },
        "Venezuela": {
            "Caracas": ["Altamira", "Las Mercedes", "El Hatillo", "Centro"]
        },
        "Uruguay": {
            "Montevideo": ["Ciudad Vieja", "Pocitos", "Carrasco", "Centro"]
        },
        "Bolivia": {
            "La Paz": ["Centro", "Sopocachi", "San Miguel", "Zona Sur"]
        },
        "Paraguay": {
            "Asunción": ["Centro Histórico", "Villa Morra", "Carmelitas"]
        }
    },

    "Afrika": {
        "Afrika Selatan": {
            "Cape Town": ["City Centre", "V&A Waterfront", "Camps Bay", "Constantia", "Bo-Kaap", "Green Point"],
            "Johannesburg": ["Sandton", "Rosebank", "Maboneng", "Melville", "Braamfontein"],
            "Durban": ["Beachfront", "Umhlanga", "Berea", "Glenwood"],
            "Pretoria": ["Arcadia", "Hatfield", "Menlyn", "Brooklyn"]
        },
        "Mesir": {
            "Cairo": ["Downtown", "Zamalek", "Maadi", "Heliopolis", "Giza", "Islamic Cairo"],
            "Alexandria": ["Corniche", "Montazah", "El Raml"],
            "Luxor": ["East Bank", "West Bank", "Karnak"],
            "Aswan": ["City Centre", "Elephantine Island", "Nubian Village"],
            "Sharm El Sheikh": ["Naama Bay", "Old Market", "Shark Bay"]
        },
        "Maroko": {
            "Marrakech": ["Medina", "Gueliz", "Hivernage", "Kasbah", "Menara"],
            "Casablanca": ["Centre Ville", "Habous", "Anfa", "Corniche"],
            "Fes": ["Fes el Bali", "Ville Nouvelle", "Fes el Jdid"],
            "Tangier": ["Medina", "Ville Nouvelle", "Kasbah"]
        },
        "Kenya": {
            "Nairobi": ["CBD", "Westlands", "Karen", "Kilimani", "Lavington"],
            "Mombasa": ["Old Town", "Nyali", "Diani Beach"]
        },
        "Tanzania": {
            "Dar es Salaam": ["City Centre", "Masaki", "Oysterbay", "Msasani"],
            "Zanzibar": ["Stone Town", "Nungwi", "Kendwa", "Jambiani"]
        },
        "Nigeria": {
            "Lagos": ["Victoria Island", "Ikoyi", "Lekki", "Ikeja", "Surulere"],
            "Abuja": ["Central Area", "Wuse", "Garki", "Maitama"]
        },
        "Ethiopia": {
            "Addis Ababa": ["Bole", "Piazza", "Kazanchis", "Meskel Square"]
        },
        "Ghana": {
            "Accra": ["Osu", "Labone", "Airport City", "East Legon", "Jamestown"]
        },
        "Senegal": {
            "Dakar": ["Plateau", "Almadies", "Ngor", "Yoff", "Gorée"]
        },
        "Tunisia": {
            "Tunis": ["Medina", "Ville Nouvelle", "La Marsa", "Sidi Bou Said"]
        },
        "Rwanda": {
            "Kigali": ["Kiyovu", "Kimihurura", "Nyamirambo", "Remera"]
        },
        "Mauritius": {
            "Port Louis": ["Caudan Waterfront", "China Town", "Centre"],
            "Grand Baie": ["La Croisette", "Sunset Boulevard", "Royal Road"]
        }
    },

    "Oseania": {
        "Australia": {
            "Sydney": ["CBD", "Darling Harbour", "Bondi Beach", "Surry Hills", "Newtown", "Manly", "Circular Quay"],
            "Melbourne": ["CBD", "Fitzroy", "St Kilda", "South Yarra", "Carlton", "Brunswick", "Southbank"],
            "Brisbane": ["CBD", "South Bank", "Fortitude Valley", "West End", "New Farm"],
            "Perth": ["CBD", "Fremantle", "Northbridge", "Subiaco", "Cottesloe"],
            "Adelaide": ["CBD", "North Adelaide", "Glenelg", "Norwood"],
            "Gold Coast": ["Surfers Paradise", "Broadbeach", "Burleigh Heads", "Main Beach"],
            "Cairns": ["CBD", "Esplanade", "Palm Cove", "Port Douglas"]
        },
        "Selandia Baru": {
            "Auckland": ["CBD", "Ponsonby", "Parnell", "Newmarket", "Devonport", "Mission Bay"],
            "Wellington": ["CBD", "Te Aro", "Cuba Street", "Mount Victoria", "Lambton Quay"],
            "Queenstown": ["Town Centre", "Frankton", "Arrowtown", "Glenorchy"],
            "Christchurch": ["CBD", "Riccarton", "Sumner", "Lyttelton"],
            "Rotorua": ["City Centre", "Ohinemutu", "Whakarewarewa"]
        },
        "Fiji": {
            "Suva": ["City Centre", "Domain", "Tamavua"],
            "Nadi": ["Nadi Town", "Denarau Island", "Martintar"]
        },
        "Papua Nugini": {
            "Port Moresby": ["Downtown", "Boroko", "Ela Beach"]
        },
        "Tahiti": {
            "Papeete": ["Centre Ville", "Waterfront", "Faa'a"]
        }
    },

    "Antartika & Kutub": {
        "Antartika": {
            "McMurdo Station": ["McMurdo Station"],
            "Palmer Station": ["Palmer Station"],
            "Rothera": ["Rothera Research Station"]
        },
        "Svalbard": {
            "Longyearbyen": ["Sentrum", "Nybyen", "Sjøområdet"]
        }
    }
};
