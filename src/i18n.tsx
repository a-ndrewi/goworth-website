import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'ro'

const en = {
  nav: { features: 'Features', how: 'How it works', watch: 'Watch', new: 'New', premium: 'Premium', faq: 'FAQ', download: 'Get the app' },
  hero: {
    title1: 'Discover.',
    title2: 'Plan.',
    title3: 'Go.',
    lead: 'GoWorth turns “where should we go?” into a day-by-day plan. Swipe through real places, build multi-city trips in three steps and keep every euro on track.',
    web: 'Open in browser',
    stats: [
      { value: '64', label: 'curated destinations' },
      { value: '384', label: 'hand-picked places' },
      { value: '14', label: 'days, planned day by day' },
    ],
    toastSaved: 'Saved to Paris trip',
    toastBudget: 'per day left',
    toastRoute: 'Day 1 · 6 stops',
  },
  store: { appleTop: 'Download on the', appleName: 'App Store', googleTop: 'Get it on', googleName: 'Google Play' },
  marquee: { eyebrow: 'Six regions, one app', title: 'From Positano to Kyoto, and the places in between.' },
  tour: {
    eyebrow: 'Inside the app',
    title: 'Everything a trip needs, nothing it doesn’t.',
    lead: 'Six tools that work together, from the first spark of an idea to the last coffee before your flight.',
    items: [
      {
        tab: 'Discover',
        title: 'Swipe through real places',
        body: 'A fresh discovery deck built around where you are. Pass, save or open a place in one tap, with a real photo for every pick.',
        points: ['Places near you, within the radius you choose', 'Museums, beaches, landmarks, nature and food', 'Swipe right to save it for later'],
      },
      {
        tab: 'Explore',
        title: 'The whole world on one map',
        body: 'Spin the globe, jump to a region or search any country, city or place. Selecting one loads what is worth seeing nearby.',
        points: ['Worldwide, Europe, Asia and US state views', 'Search powered by OpenStreetMap', 'Nearby attractions load on demand'],
      },
      {
        tab: 'Plan',
        title: 'A multi-city trip in three steps',
        body: 'Pick your cities and how many days in each, set your dates and choose a travel style. GoWorth lays it all out for you.',
        points: ['Several cities in one route', 'Up to 14 days, organised day by day', 'Solo, couple, friends or family'],
      },
      {
        tab: 'Itinerary',
        title: 'Every day, mapped out',
        body: 'Each day gets its own timeline and route, with the stops in a sensible order and one tap to navigate.',
        points: ['A route for every day', 'Times, stops and notes in one view', 'Open any stop on the map'],
      },
      {
        tab: 'Budget',
        title: 'Stay on budget without a spreadsheet',
        body: 'Set a budget, add expenses as you go and see what is left for each remaining day, split by category.',
        points: ['Accommodation, food, transport and more', 'Remaining and per-day-left at a glance', 'Your currency, your way'],
      },
      {
        tab: 'Saved',
        title: 'Every place you love, kept',
        body: 'Saved places and past trips live together and sync to your account, so your shortlist follows you to every device.',
        points: ['Places and trips in one list', 'Synced privately to your account', 'Preview a place without losing your spot'],
      },
    ],
  },
  steps: {
    eyebrow: 'How it works',
    title: 'From idea to itinerary in a minute.',
    items: [
      { title: 'Where are you going?', body: 'Add one city or several for a route, and set the days in each.' },
      { title: 'When?', body: 'Pick your dates. Up to 14 days, organised day by day.' },
      { title: 'Your style', body: 'Solo, couple, friends or family, plus a budget for suggestions.' },
    ],
    days: 'days',
    depart: 'Departure',
    ret: 'Return',
    styles: ['Solo', 'Couple', 'Friends', 'Family'],
    perPerson: 'per person',
  },
  watch: {
    eyebrow: 'See it in motion',
    title: 'Thirty seconds, one whole trip.',
    lead: 'A quick tour of GoWorth, from the first swipe to a fully budgeted itinerary.',
    tour: 'Product tour',
    teaser: 'Teaser',
    play: 'Play',
    pause: 'Pause',
    mute: 'Mute',
    unmute: 'Unmute',
  },
  bento: {
    eyebrow: 'Thoughtful details',
    title: 'Built for the way you actually travel.',
    routes: { title: 'Smart day routes', body: 'Stops ordered into a route, with bars, cafés and food near each one.' },
    budget: {
      title: 'Spending by category',
      body: 'See where the money goes before it is gone.',
      categories: ['Accommodation', 'Shopping', 'Food & Drinks', 'Transport'],
      remaining: 'Remaining',
      perDay: 'Per day left',
    },
    privacy: { title: 'Private by design', body: 'Your trips, journal and saved places belong to your account and nobody else.' },
    language: { title: 'Your language and currency', body: 'English or Română, and the currency you think in.' },
    offline: { title: 'Photos that always load', body: 'Destination photos ship with the app, credited to their Wikimedia Commons authors.' },
  },
  extras: {
    eyebrow: 'New in GoWorth',
    title: 'Your trips, long after you land.',
    lead: 'A passport that fills with every trip, live weather where you are going, a boarding pass on your home screen and reminders that know when to speak up.',
    passport: {
      title: 'A visa for every country',
      body: 'Finish a trip and its countries arrive as visas in your own passport, with an entry stamp for every return visit. Turn the pages to relive where you have been.',
      label: 'Passport',
      entries: 'entries',
      stamp: 'Entry',
    },
    widget: {
      title: 'Your trip as a boarding pass',
      body: 'The iPhone home screen widget shows the current trip as a boarding pass: city codes, the day’s plans and a timeline, in light and dark.',
      from: 'From',
      to: 'To',
      day: 'Day 2 of 5',
      plans: ['Louvre Museum', 'Lunch in Le Marais', 'Seine at sunset'],
    },
    weather: {
      title: 'Weather at a glance',
      body: 'Trip days, city pages and discovery cards show the temperature there right now, from Open-Meteo.',
    },
    reminders: {
      title: 'Reminders, only the useful ones',
      body: 'Know when your daily spin is ready, get a nudge to plan the next trip and, if you opt in, a heads-up when something worth a look is nearby. Each one has its own switch.',
    },
  },
  plans: {
    eyebrow: 'GoWorth Premium',
    title: 'Travel without limits.',
    lead: 'The Free plan covers 1 new trip and 5 new saved places every month. Premium removes the limits, on every device signed in to your account.',
    perks: ['Unlimited trips every month', 'Unlimited saved places', 'Your full visa passport', 'Help an independent travel app keep growing'],
    bestValue: 'Best value',
    items: [
      { id: 'monthly', name: 'Monthly', note: 'Billed every month', unit: 'Renews monthly' },
      { id: 'yearly', name: 'Yearly', note: 'Billed once a year', unit: 'Renews yearly' },
      { id: 'lifetime', name: 'Lifetime', note: 'Pay once, yours forever', unit: 'One payment' },
    ],
    priceNote: 'Prices are shown in the app, in your local currency, before you buy.',
    fine: 'Bought through the App Store or Google Play. Subscriptions renew automatically at the same price until you cancel in your store settings, at least 24 hours before the period ends. Lifetime is a single payment with no renewal.',
    rules: 'Read the Premium & wheel rules',
  },
  wheel: {
    eyebrow: 'Or win it for free',
    title: 'Spin the daily wheel. Win Premium.',
    lead: 'Every account gets one free spin every 24 hours, with or without a subscription. Buying Premium never changes the odds.',
    labels: { lifetime: 'Lifetime', month: '1 month', none: 'Tomorrow' },
    prizes: [
      { name: 'Premium for 1 month', odds: '1 in 100', pct: '1%' },
      { name: 'Lifetime Premium', odds: '1 in 5,000', pct: '0.02%' },
    ],
    chance: 'chance per spin',
    points: [
      'The wheel never asks for payment',
      'One spin every 24 hours, timed on our server, not your device clock',
      'A month won while Premium is active is added after its end date',
      'Won and bought Premium count together: you get whichever lasts longer',
    ],
    rules: 'Read the Premium & wheel rules',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered.',
    items: [
      {
        q: 'Is GoWorth free?',
        a: 'Yes. The app is free to download and use. The Free plan includes one new trip and five new saved places every month. Premium removes these limits: you can buy it monthly, yearly or once for Lifetime, or win it on the daily wheel.',
      },
      {
        q: 'How do I buy or cancel Premium?',
        a: 'Premium is bought in the app through the App Store or Google Play, with the price shown in your currency before you confirm. You need to be signed in, so Premium follows your account to every device, and Restore purchases brings it back on a new phone. Subscriptions renew automatically until you cancel in your App Store or Google Play settings, at least 24 hours before the period ends; you keep Premium until the end of the period you paid for. Refunds are handled by Apple or Google.',
      },
      {
        q: 'How does the Premium wheel work?',
        a: 'Every signed-in account gets one free spin every 24 hours, with or without a subscription. Each spin has a 1 in 100 chance of Premium for 1 month and a 1 in 5,000 chance of Lifetime Premium; a month won while Premium is active is added after its end date. Buying Premium does not change the odds. The full Premium & wheel rules are linked in the footer.',
      },
      {
        q: 'How do I earn visas in my passport?',
        a: 'When a planned trip reaches its end date, every country it passed through is added to your passport as a visa, and a return visit adds an entry stamp. Free accounts collect visas too; Premium opens the passport so you can see them.',
      },
      {
        q: 'Do I need an account?',
        a: 'Yes, an email account. Every new account starts empty, and your profile, trips, expenses, saved places and journal stay private to you.',
      },
      {
        q: 'Which devices does it run on?',
        a: 'GoWorth is available for iPhone and Android, and your account syncs between them.',
      },
      {
        q: 'Where does the place information come from?',
        a: 'A curated catalogue of 64 destinations and 384 named places, plus live map search from OpenStreetMap and photos from Wikimedia Commons with their source and licence. Always confirm current opening hours and prices with the venue.',
      },
      {
        q: 'Can I plan a trip with several cities?',
        a: 'Yes. Add as many cities as you like, set the days in each and GoWorth builds the itinerary day by day, for up to 14 days.',
      },
      {
        q: 'Which languages are supported?',
        a: 'English and Romanian, with the currency of your choice.',
      },
    ],
  },
  cta: {
    title: 'Your next trip starts here.',
    body: 'Download GoWorth and plan somewhere worth going.',
    scan: 'Scan to download',
    scanHint: 'Point your phone camera at the code.',
  },
  footer: {
    product: 'Product',
    get: 'Download',
    legal: 'Legal',
    rights: 'All rights reserved.',
  },
  legal: {
    back: 'Back to home',
    eyebrow: 'Legal',
    contents: 'On this page',
    website: 'This website',
    websiteBody:
      'Destination photos on this site come from Wikimedia Commons and are released under CC0. Map data shown in the app captures is © OpenStreetMap contributors. Weather in the app is from Open-Meteo, CC BY 4.0. Fonts: Inter and Bricolage Grotesque, SIL Open Font License. Icons: Lucide, ISC License. App captures and product videos © GoWorth.',
    photos: 'Photo credits',
    place: 'Place',
    creator: 'Creator',
    license: 'License',
  },
}

export type Dict = typeof en

const ro: Dict = {
  nav: { features: 'Funcții', how: 'Cum funcționează', watch: 'Video', new: 'Noutăți', premium: 'Premium', faq: 'Întrebări', download: 'Descarcă' },
  hero: {
    title1: 'Descoperă.',
    title2: 'Planifică.',
    title3: 'Pleacă.',
    lead: 'GoWorth transformă „unde mergem?” într-un plan zi cu zi. Glisează prin locuri reale, construiește călătorii în mai multe orașe în trei pași și ține fiecare euro sub control.',
    web: 'Deschide în browser',
    stats: [
      { value: '64', label: 'destinații alese' },
      { value: '384', label: 'locuri selectate' },
      { value: '14', label: 'zile, planificate zi cu zi' },
    ],
    toastSaved: 'Salvat în călătoria la Paris',
    toastBudget: 'pe zi rămași',
    toastRoute: 'Ziua 1 · 6 opriri',
  },
  store: { appleTop: 'Descarcă din', appleName: 'App Store', googleTop: 'Disponibil pe', googleName: 'Google Play' },
  marquee: { eyebrow: 'Șase regiuni, o singură aplicație', title: 'De la Positano la Kyoto, și tot ce e între ele.' },
  tour: {
    eyebrow: 'În aplicație',
    title: 'Tot ce-i trebuie unei călătorii, nimic în plus.',
    lead: 'Șase instrumente care lucrează împreună, de la prima idee până la ultima cafea dinaintea zborului.',
    items: [
      {
        tab: 'Descoperă',
        title: 'Glisează prin locuri reale',
        body: 'Un pachet de descoperiri mereu nou, construit în jurul locului în care te afli. Treci, salvează sau deschide un loc dintr-o atingere, cu o fotografie reală pentru fiecare.',
        points: ['Locuri din apropiere, pe raza aleasă de tine', 'Muzee, plaje, obiective, natură și mâncare', 'Glisează la dreapta ca să-l păstrezi'],
      },
      {
        tab: 'Explorează',
        title: 'Toată lumea pe o singură hartă',
        body: 'Rotește globul, sari la o regiune sau caută orice țară, oraș sau loc. Când alegi unul, apar lucrurile care merită văzute în jur.',
        points: ['Vederi Mondial, Europa, Asia și state SUA', 'Căutare cu OpenStreetMap', 'Atracțiile din apropiere se încarcă la cerere'],
      },
      {
        tab: 'Planifică',
        title: 'O călătorie în mai multe orașe, în trei pași',
        body: 'Alege orașele și câte zile stai în fiecare, setează datele și stilul de călătorie. GoWorth le așază pe toate pentru tine.',
        points: ['Mai multe orașe pe un singur traseu', 'Până la 14 zile, organizate zi cu zi', 'Singur, în cuplu, cu prietenii sau cu familia'],
      },
      {
        tab: 'Itinerariu',
        title: 'Fiecare zi, pe hartă',
        body: 'Fiecare zi are propria cronologie și propriul traseu, cu opririle într-o ordine logică și navigare dintr-o atingere.',
        points: ['Un traseu pentru fiecare zi', 'Ore, opriri și notițe într-un singur loc', 'Deschide orice oprire pe hartă'],
      },
      {
        tab: 'Buget',
        title: 'Rămâi în buget fără tabele',
        body: 'Setează un buget, adaugă cheltuielile pe drum și vezi cât îți rămâne pentru fiecare zi, pe categorii.',
        points: ['Cazare, mâncare, transport și altele', 'Rămas și rămas pe zi, dintr-o privire', 'Moneda ta, cum vrei tu'],
      },
      {
        tab: 'Salvate',
        title: 'Toate locurile preferate, păstrate',
        body: 'Locurile salvate și călătoriile trecute stau împreună și se sincronizează cu contul tău, pe orice dispozitiv.',
        points: ['Locuri și călătorii într-o singură listă', 'Sincronizate privat cu contul tău', 'Previzualizează un loc fără să pierzi lista'],
      },
    ],
  },
  steps: {
    eyebrow: 'Cum funcționează',
    title: 'De la idee la itinerariu într-un minut.',
    items: [
      { title: 'Unde mergi?', body: 'Adaugă un oraș sau mai multe pentru un traseu și setează zilele în fiecare.' },
      { title: 'Când?', body: 'Alege datele. Până la 14 zile, organizate zi cu zi.' },
      { title: 'Stilul tău', body: 'Singur, în cuplu, cu prietenii sau cu familia, plus un buget pentru sugestii.' },
    ],
    days: 'zile',
    depart: 'Plecare',
    ret: 'Întoarcere',
    styles: ['Singur', 'Cuplu', 'Prieteni', 'Familie'],
    perPerson: 'de persoană',
  },
  watch: {
    eyebrow: 'Vezi-o în mișcare',
    title: 'Treizeci de secunde, o călătorie întreagă.',
    lead: 'Un tur rapid prin GoWorth, de la primul swipe la un itinerariu cu buget complet.',
    tour: 'Tur al aplicației',
    teaser: 'Teaser',
    play: 'Pornește',
    pause: 'Pauză',
    mute: 'Fără sunet',
    unmute: 'Cu sunet',
  },
  bento: {
    eyebrow: 'Detalii gândite',
    title: 'Făcută pentru felul în care chiar călătorești.',
    routes: { title: 'Trasee zilnice inteligente', body: 'Opriri ordonate într-un traseu, cu baruri, cafenele și restaurante lângă fiecare.' },
    budget: {
      title: 'Cheltuieli pe categorii',
      body: 'Vezi unde se duc banii înainte să se ducă.',
      categories: ['Cazare', 'Cumpărături', 'Mâncare și băuturi', 'Transport'],
      remaining: 'Rămas',
      perDay: 'Rămas pe zi',
    },
    privacy: { title: 'Privat din principiu', body: 'Călătoriile, jurnalul și locurile salvate aparțin contului tău și nimănui altcuiva.' },
    language: { title: 'Limba și moneda ta', body: 'English sau Română, și moneda în care gândești.' },
    offline: { title: 'Fotografii care se încarcă mereu', body: 'Fotografiile destinațiilor vin cu aplicația, creditate autorilor de pe Wikimedia Commons.' },
  },
  extras: {
    eyebrow: 'Nou în GoWorth',
    title: 'Călătoriile tale, mult după aterizare.',
    lead: 'Un pașaport care se umple cu fiecare călătorie, vremea de acum la destinație, o carte de îmbarcare pe ecranul principal și remindere care știu când să apară.',
    passport: {
      title: 'O viză pentru fiecare țară',
      body: 'Încheie o călătorie și țările ei apar ca vize în propriul tău pașaport, cu o ștampilă de intrare la fiecare revenire. Întoarce paginile și retrăiește locurile prin care ai fost.',
      label: 'Pașaport',
      entries: 'intrări',
      stamp: 'Intrare',
    },
    widget: {
      title: 'Călătoria ta, ca o carte de îmbarcare',
      body: 'Widgetul pentru ecranul principal al iPhone-ului arată călătoria curentă ca o carte de îmbarcare: codurile orașelor, planurile zilei și o cronologie, în modul luminos și întunecat.',
      from: 'De la',
      to: 'Spre',
      day: 'Ziua 2 din 5',
      plans: ['Muzeul Luvru', 'Prânz în Le Marais', 'Sena la apus'],
    },
    weather: {
      title: 'Vremea dintr-o privire',
      body: 'Zilele călătoriei, paginile orașelor și cardurile de descoperire arată temperatura de acolo chiar acum, de la Open-Meteo.',
    },
    reminders: {
      title: 'Remindere, doar cele utile',
      body: 'Află când e gata învârtirea zilnică, primește un imbold să-ți planifici următoarea călătorie și, dacă vrei, o alertă când ai ceva de văzut în apropiere. Fiecare are propriul comutator.',
    },
  },
  plans: {
    eyebrow: 'GoWorth Premium',
    title: 'Călătorește fără limite.',
    lead: 'Planul Gratuit include 1 călătorie nouă și 5 locuri noi salvate în fiecare lună. Premium elimină limitele, pe orice dispozitiv conectat la contul tău.',
    perks: ['Călătorii nelimitate în fiecare lună', 'Locuri salvate nelimitate', 'Pașaportul tău complet cu vize', 'Susții o aplicație de călătorii independentă'],
    bestValue: 'Cea mai bună ofertă',
    items: [
      { id: 'monthly', name: 'Lunar', note: 'Facturat lunar', unit: 'Se reînnoiește lunar' },
      { id: 'yearly', name: 'Anual', note: 'Facturat o dată pe an', unit: 'Se reînnoiește anual' },
      { id: 'lifetime', name: 'Pe viață', note: 'Plătești o dată, e al tău pentru totdeauna', unit: 'O singură plată' },
    ],
    priceNote: 'Prețurile apar în aplicație, în moneda ta locală, înainte să cumperi.',
    fine: 'Se cumpără prin App Store sau Google Play. Abonamentele se reînnoiesc automat la același preț până le anulezi din setările magazinului, cu cel puțin 24 de ore înainte de finalul perioadei. Pe viață este o plată unică, fără reînnoire.',
    rules: 'Citește regulile Premium și ale roții',
  },
  wheel: {
    eyebrow: 'Sau câștigă-l gratuit',
    title: 'Învârte roata zilnică. Câștigă Premium.',
    lead: 'Fiecare cont are o învârtire gratuită la fiecare 24 de ore, cu sau fără abonament. Cumpărarea Premium nu schimbă niciodată șansele.',
    labels: { lifetime: 'Pe viață', month: '1 lună', none: 'Mâine' },
    prizes: [
      { name: 'Premium pe 1 lună', odds: '1 la 100', pct: '1%' },
      { name: 'Premium Pe viață', odds: '1 la 5.000', pct: '0,02%' },
    ],
    chance: 'șansă la fiecare învârtire',
    points: [
      'Roata nu cere niciodată plată',
      'O învârtire la 24 de ore, cronometrată pe serverul nostru, nu pe ceasul telefonului',
      'O lună câștigată cât Premium e activ se adaugă după data de expirare',
      'Premium câștigat și cel cumpărat se cumulează: primești varianta care durează mai mult',
    ],
    rules: 'Citește regulile Premium și ale roții',
  },
  faq: {
    eyebrow: 'Întrebări',
    title: 'Întrebări, cu răspunsuri.',
    items: [
      {
        q: 'GoWorth este gratuită?',
        a: 'Da. Aplicația se descarcă și se folosește gratuit. Planul Gratuit include o călătorie nouă și cinci locuri noi salvate în fiecare lună. Premium elimină aceste limite: îl poți cumpăra lunar, anual sau o singură dată pe viață, ori îl poți câștiga la roata zilnică.',
      },
      {
        q: 'Cum cumpăr sau anulez Premium?',
        a: 'Premium se cumpără din aplicație prin App Store sau Google Play, cu prețul afișat în moneda ta înainte să confirmi. Trebuie să fii conectat, ca Premium să te urmeze pe orice dispozitiv, iar Restaurează cumpărăturile îl aduce înapoi pe un telefon nou. Abonamentele se reînnoiesc automat până le anulezi din setările App Store sau Google Play, cu cel puțin 24 de ore înainte de finalul perioadei; păstrezi Premium până la finalul perioadei plătite. Rambursările sunt gestionate de Apple sau Google.',
      },
      {
        q: 'Cum funcționează roata Premium?',
        a: 'Fiecare cont conectat are o învârtire gratuită la fiecare 24 de ore, cu sau fără abonament. Fiecare învârtire are o șansă de 1 la 100 pentru Premium pe 1 lună și de 1 la 5.000 pentru Premium Pe viață; o lună câștigată cât Premium e activ se adaugă după data de expirare. Cumpărarea Premium nu schimbă șansele. Regulile Premium și ale roții sunt în subsolul paginii.',
      },
      {
        q: 'Cum primesc vize în pașaport?',
        a: 'Când o călătorie planificată ajunge la data de final, fiecare țară prin care a trecut se adaugă în pașaport ca viză, iar o revenire adaugă o ștampilă de intrare. Și conturile gratuite strâng vize; Premium deschide pașaportul ca să le vezi.',
      },
      {
        q: 'Am nevoie de cont?',
        a: 'Da, un cont cu email. Fiecare cont nou pornește gol, iar profilul, călătoriile, cheltuielile, locurile salvate și jurnalul rămân private.',
      },
      {
        q: 'Pe ce dispozitive funcționează?',
        a: 'GoWorth este disponibilă pentru iPhone și Android, iar contul se sincronizează între ele.',
      },
      {
        q: 'De unde vin informațiile despre locuri?',
        a: 'Dintr-un catalog de 64 de destinații și 384 de locuri, plus căutare live pe hartă prin OpenStreetMap și fotografii de pe Wikimedia Commons, cu sursa și licența lor. Verifică mereu programul și prețurile actuale cu locația.',
      },
      {
        q: 'Pot planifica o călătorie în mai multe orașe?',
        a: 'Da. Adaugă câte orașe vrei, setează zilele în fiecare și GoWorth construiește itinerariul zi cu zi, pentru până la 14 zile.',
      },
      {
        q: 'Ce limbi sunt disponibile?',
        a: 'Engleză și română, cu moneda pe care o alegi.',
      },
    ],
  },
  cta: {
    title: 'Următoarea ta călătorie începe aici.',
    body: 'Descarcă GoWorth și planifică un loc care merită.',
    scan: 'Scanează ca să descarci',
    scanHint: 'Îndreaptă camera telefonului spre cod.',
  },
  footer: {
    product: 'Produs',
    get: 'Descarcă',
    legal: 'Legal',
    rights: 'Toate drepturile rezervate.',
  },
  legal: {
    back: 'Înapoi la pagina principală',
    eyebrow: 'Legal',
    contents: 'Pe această pagină',
    website: 'Acest site',
    websiteBody:
      'Fotografiile destinațiilor de pe acest site provin de pe Wikimedia Commons și sunt publicate sub licența CC0. Datele de hartă din capturile aplicației sunt © contribuitorii OpenStreetMap. Vremea din aplicație provine de la Open-Meteo, CC BY 4.0. Fonturi: Inter și Bricolage Grotesque, SIL Open Font License. Iconițe: Lucide, licența ISC. Capturile aplicației și videoclipurile de prezentare © GoWorth.',
    photos: 'Credite foto',
    place: 'Loc',
    creator: 'Autor',
    license: 'Licență',
  },
}

const dicts: Record<Lang, Dict> = { en, ro }
const STORAGE_KEY = 'goworth-lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'ro') return saved
  } catch {
    // Storage can be unavailable in private windows; fall back to the browser language.
  }
  return navigator.language?.toLowerCase().startsWith('ro') ? 'ro' : 'en'
}

const I18nContext = createContext<{ lang: Lang; t: Dict; setLang: (lang: Lang) => void } | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Not persisting the choice is fine.
    }
  }, [lang])

  return <I18nContext.Provider value={{ lang, t: dicts[lang], setLang }}>{children}</I18nContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
