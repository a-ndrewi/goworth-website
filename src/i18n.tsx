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
        points: ['Worldwide, Europe, Asia and US state views', 'Many more attractions in every city, each with its own photo', 'Restaurants, bars, cafés, clubs and terraces on every city page'],
      },
      {
        tab: 'Plan',
        title: 'A multi-city trip in three steps',
        body: 'Pick your cities and how many days in each, set your dates and choose a travel style. GoWorth lays it all out for you.',
        points: ['Several cities in one route', 'Up to 14 days, organised day by day', 'Solo, as a duo or with a group'],
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
      { title: 'Your style', body: 'Solo, as a duo or with a group, plus a budget for suggestions.' },
    ],
    days: 'days',
    depart: 'Departure',
    ret: 'Return',
    styles: ['Solo', 'Duo', 'Group'],
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
    privacy: { title: 'Private by design', body: 'Your trips, journal and saved places belong to your account. Only the companions you invite see a trip, and only that trip.' },
    language: { title: 'Your language and currency', body: 'English or Română, and the currency you think in.' },
    offline: { title: 'Photos that always load', body: 'Destination photos ship with the app, credited to their Wikimedia Commons authors.' },
  },
  extras: {
    eyebrow: 'New in GoWorth',
    title: 'Your trips, long after you land.',
    lead: 'Trips you plan together and side by side, expenses that split themselves, a passport that fills with every country, story cards to share where you have been, a month of Premium for every friend you bring, live weather, a boarding pass on your Lock Screen and your trips even without signal.',
    passport: {
      title: 'A visa for every country',
      body: 'Finish a trip and its countries arrive as visas in your own passport, with an entry stamp for every return visit. Turn the pages to relive where you have been.',
      label: 'Passport',
      entries: 'entries',
      stamp: 'Entry',
    },
    widget: {
      title: 'Your trip as a boarding pass',
      body: 'The iPhone home screen widget shows the current trip as a boarding pass: city codes, the day’s plans and a timeline, in light and dark. With Premium it comes to the Lock Screen too.',
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
    companions: {
      title: 'Plan it together',
      body: 'Pick a username and invite the people you travel with. Everyone on the trip edits the same itinerary, budget and expenses, and each companion keeps the trip and its visas when it ends. Free trips include one companion; Premium brings the whole group.',
      you: 'You',
      organiser: 'Organiser',
      invited: 'Invited',
      joined: 'Joined',
    },
    offline: {
      title: 'Your trips, even in airplane mode',
      body: 'With Premium, your itinerary, budget, saved places, journal and passport stay on the phone and open without a connection. They catch up as soon as you are back online.',
      banner: 'Offline · your trips as of 3 Nov, 14:20',
    },
    stamps: {
      title: 'Rare stamps for milestones',
      body: 'Premium passports collect rare stamps along the way, from your first visa to ten flags.',
    },
    share: {
      title: 'Share it as a story',
      body: 'Turn a trip into a 9:16 card for Instagram, TikTok or Messages: a postcard coloured after the country, your route on the map, or a visa page. Spending stays hidden unless you show it, and your whole passport can go out as one card. The Postcard style is free; Route and Passport come with Premium.',
      styles: ['Postcard', 'Route', 'Passport'],
      spending: 'Show spending',
    },
    trips: {
      title: 'Several trips, side by side',
      body: 'Plan the summer road trip and the autumn city break at the same time. With Premium every trip keeps its own itinerary, budget, companions and notes; the Free plan keeps one active trip at a time.',
      list: [
        { name: 'Paris · Lyon', dates: '12 – 18 Mar', tag: 'Duo' },
        { name: 'Lisboa', dates: '3 – 7 Jun', tag: 'Group' },
        { name: 'Kyoto · Tokyo', dates: '14 – 26 Oct', tag: 'Solo' },
      ],
    },
    split: {
      title: 'Split it, then settle up',
      body: 'Log who paid and whom each expense is for: everyone, a few of you or just one person. GoWorth works out who owes whom in as few payments as possible; mark one paid and the balance updates for the whole group.',
      label: 'Settle up',
      owes: 'pays',
      paid: 'Mark paid',
      balance: 'You are owed',
      square: 'Everyone else is square',
    },
    invite: {
      title: 'Invite a friend, both win Premium',
      body: 'Every account has its own invite code. When a friend signs up with it, or enters it within 14 days, you each get a month of Premium, added after any Premium you already have. Earn up to 12 months a year.',
      label: 'Your code',
      share: 'Share your code',
      friends: 'friends joined',
      months: 'months earned',
    },
    venues: {
      title: 'Where to eat and drink, in every city',
      body: 'City pages now go past the landmarks: switch to restaurants, bars and pubs, cafés, clubs or terraces with outdoor seating, each with a photo of the place itself.',
      chips: ['Restaurants', 'Bars & Pubs', 'Cafés', 'Clubs', 'Terraces'],
    },
  },
  plans: {
    eyebrow: 'GoWorth Premium',
    title: 'Travel without limits.',
    lead: 'The Free plan covers one active trip, 1 new trip and 5 new saved places every month, with 1 companion on the trips you organise. Premium removes the limits, on every device signed in to your account.',
    perks: ['Your passport, with a visa for every country you visit', 'Unlimited companions on every trip', 'Several trips side by side, no monthly limit', 'Unlimited saved places', 'Your trips offline, even in airplane mode', 'Rare stamps for every travel milestone', 'Route and passport story cards to share', 'Lock Screen widget for your current trip on iPhone'],
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
      'Invite a friend and you both get a month on top, up to 12 a year',
    ],
    rules: 'Read the Premium & wheel rules',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered.',
    items: [
      {
        q: 'Is GoWorth free?',
        a: 'Yes. The app is free to download and use. The Free plan includes one active trip, one new trip and five new saved places every month, one companion on the trips you organise and the Postcard story card. Premium removes these limits and adds several trips side by side, offline trips, the passport with rare stamps, Route and Passport story cards and the Lock Screen widget: you can buy it monthly, yearly or once for Lifetime, or win it on the daily wheel and by inviting friends.',
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
        q: 'Can I plan a trip with friends?',
        a: 'Yes. Choose a username, then invite companions from your trip by their username or name. Nobody joins without accepting, and everyone on the trip can edit its dates, cities, itinerary, budget and expenses, and sees who owes whom. Your saved places, journal and other trips stay private. When the trip ends, each companion gets a copy in their journal and the visas for its countries. Free trips include one companion; Premium has no limit.',
      },
      {
        q: 'How does splitting expenses work?',
        a: 'On a trip with companions, each expense records who paid and whom it is for: everyone, a few people or one person. Settle up shows your share, what you owe or are owed, and the fewest payments that make everyone square. When someone pays you back, tap Mark paid; you can undo it. Everyone on the trip sees the same balances.',
      },
      {
        q: 'How do invite codes work?',
        a: 'Open Invite friends in your Profile and share your 6-character code. A friend who enters it when creating an account, or within 14 days, wins a month of Premium, and so do you. The month starts right away or after any Premium you already have. You can earn up to 12 months a year this way; your friends always get theirs.',
      },
      {
        q: 'Can I share my trip?',
        a: 'Yes. From a trip or your journal, tap Share and pick a style: Postcard, Route or Passport. The card is made on your phone and goes straight to the share sheet, ready for Instagram, TikTok, Messages or Photos; on Android, take a screenshot of the card. Spending appears only if you turn it on. Postcard is free; Route, Passport and sharing your whole passport come with Premium.',
      },
      {
        q: 'What do “Places near you” notifications do?',
        a: 'Nothing until you turn them on in Profile > Notifications and allow location Always. Then, when you arrive somewhere about 2 km from where you were, GoWorth may suggest one attraction nearby. Your position is used only to look up places on the phone; it is not stored in your account and no location history is kept. Turn the switch off at any time.',
      },
      {
        q: 'Does GoWorth work offline?',
        a: 'With Premium, yes. The app keeps a copy of your trips, budget, saved places, journal and passport on the phone, so they open without signal. Changes need a connection, and the copy refreshes as soon as you are back online.',
      },
      {
        q: 'Do I need an account?',
        a: 'Yes, an email account. Every new account starts empty, and your profile, trips, expenses, saved places and journal stay private to you. Other travellers can find you only once you choose a username, and they never see your email.',
      },
      {
        q: 'Which devices does it run on?',
        a: 'GoWorth is available for iPhone and Android, and your account syncs between them.',
      },
      {
        q: 'Where does the place information come from?',
        a: 'A curated catalogue of 64 destinations and 384 named places, plus attractions and venues from OpenStreetMap, places from Wikipedia and Wikidata, and photos of each place from Wikimedia Commons with their source and licence. Always confirm current opening hours and prices with the venue.',
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
        points: ['Vederi Mondial, Europa, Asia și state SUA', 'Mult mai multe atracții în fiecare oraș, fiecare cu fotografia ei', 'Restaurante, baruri, cafenele, cluburi și terase pe pagina fiecărui oraș'],
      },
      {
        tab: 'Planifică',
        title: 'O călătorie în mai multe orașe, în trei pași',
        body: 'Alege orașele și câte zile stai în fiecare, setează datele și stilul de călătorie. GoWorth le așază pe toate pentru tine.',
        points: ['Mai multe orașe pe un singur traseu', 'Până la 14 zile, organizate zi cu zi', 'Solo, în doi sau în grup'],
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
      { title: 'Stilul tău', body: 'Solo, în doi sau în grup, plus un buget pentru sugestii.' },
    ],
    days: 'zile',
    depart: 'Plecare',
    ret: 'Întoarcere',
    styles: ['Solo', 'Duo', 'Grup'],
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
    privacy: { title: 'Privat din principiu', body: 'Călătoriile, jurnalul și locurile salvate aparțin contului tău. Doar însoțitorii pe care îi inviți văd o călătorie, și doar pe aceea.' },
    language: { title: 'Limba și moneda ta', body: 'English sau Română, și moneda în care gândești.' },
    offline: { title: 'Fotografii care se încarcă mereu', body: 'Fotografiile destinațiilor vin cu aplicația, creditate autorilor de pe Wikimedia Commons.' },
  },
  extras: {
    eyebrow: 'Nou în GoWorth',
    title: 'Călătoriile tale, mult după aterizare.',
    lead: 'Călătorii planificate împreună și în paralel, cheltuieli care se împart singure, un pașaport care se umple cu fiecare țară, carduri de distribuit cu locurile prin care ai fost, o lună de Premium pentru fiecare prieten adus, vremea de acum, o carte de îmbarcare pe ecranul de blocare și călătoriile tale chiar și fără semnal.',
    passport: {
      title: 'O viză pentru fiecare țară',
      body: 'Încheie o călătorie și țările ei apar ca vize în propriul tău pașaport, cu o ștampilă de intrare la fiecare revenire. Întoarce paginile și retrăiește locurile prin care ai fost.',
      label: 'Pașaport',
      entries: 'intrări',
      stamp: 'Intrare',
    },
    widget: {
      title: 'Călătoria ta, ca o carte de îmbarcare',
      body: 'Widgetul pentru ecranul principal al iPhone-ului arată călătoria curentă ca o carte de îmbarcare: codurile orașelor, planurile zilei și o cronologie, în modul luminos și întunecat. Cu Premium apare și pe ecranul de blocare.',
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
    companions: {
      title: 'Planificați împreună',
      body: 'Alege-ți un nume de utilizator și invită oamenii cu care călătorești. Toți cei din călătorie editează același itinerariu, buget și aceleași cheltuieli, iar fiecare însoțitor păstrează călătoria și vizele ei la final. Călătoriile gratuite includ un însoțitor; cu Premium vine tot grupul.',
      you: 'Tu',
      organiser: 'Organizator',
      invited: 'Invitat',
      joined: 'Acceptat',
    },
    offline: {
      title: 'Călătoriile tale, chiar și în modul avion',
      body: 'Cu Premium, itinerariul, bugetul, locurile salvate, jurnalul și pașaportul rămân pe telefon și se deschid fără conexiune. Se actualizează imediat ce revii online.',
      banner: 'Offline · călătoriile tale la 3 nov., 14:20',
    },
    stamps: {
      title: 'Ștampile rare pentru repere',
      body: 'Pașapoartele Premium adună ștampile rare pe drum, de la prima viză la zece steaguri.',
    },
    share: {
      title: 'Distribuie-o ca story',
      body: 'Transformă o călătorie într-un card 9:16 pentru Instagram, TikTok sau Mesaje: o carte poștală în culorile țării, traseul tău pe hartă sau o pagină de viză. Cheltuielile rămân ascunse dacă nu le arăți, iar tot pașaportul poate pleca într-un singur card. Stilul Carte poștală este gratuit; Traseu și Pașaport vin cu Premium.',
      styles: ['Carte poștală', 'Traseu', 'Pașaport'],
      spending: 'Arată cheltuielile',
    },
    trips: {
      title: 'Mai multe călătorii, în paralel',
      body: 'Planifică vacanța de vară și city break-ul de toamnă în același timp. Cu Premium, fiecare călătorie are propriul itinerariu, buget, însoțitori și notițe; planul Gratuit păstrează o singură călătorie activă.',
      list: [
        { name: 'Paris · Lyon', dates: '12 – 18 mar.', tag: 'Duo' },
        { name: 'Lisabona', dates: '3 – 7 iun.', tag: 'Grup' },
        { name: 'Kyoto · Tokyo', dates: '14 – 26 oct.', tag: 'Solo' },
      ],
    },
    split: {
      title: 'Împărțiți, apoi faceți decontarea',
      body: 'Notează cine a plătit și pentru cine e fiecare cheltuială: pentru toți, pentru câțiva sau doar pentru o persoană. GoWorth calculează cine cui datorează, în cât mai puține plăți; marchează una plătită și soldul se actualizează pentru tot grupul.',
      label: 'Decontare',
      owes: 'îi plătește lui',
      paid: 'Marchează plătit',
      balance: 'Ți se datorează',
      square: 'Restul grupului e chit',
    },
    invite: {
      title: 'Invită un prieten, câștigați amândoi Premium',
      body: 'Fiecare cont are propriul cod de invitație. Când un prieten își face cont cu el sau îl introduce în 14 zile, primiți fiecare o lună de Premium, adăugată după orice Premium aveți deja. Până la 12 luni pe an.',
      label: 'Codul tău',
      share: 'Trimite codul',
      friends: 'prieteni s-au alăturat',
      months: 'luni câștigate',
    },
    venues: {
      title: 'Unde mănânci și bei, în fiecare oraș',
      body: 'Paginile orașelor merg acum dincolo de obiective: treci la restaurante, baruri și puburi, cafenele, cluburi sau terase cu locuri afară, fiecare cu o fotografie a locului.',
      chips: ['Restaurante', 'Baruri și puburi', 'Cafenele', 'Cluburi', 'Terase'],
    },
  },
  plans: {
    eyebrow: 'GoWorth Premium',
    title: 'Călătorește fără limite.',
    lead: 'Planul Gratuit include o călătorie activă, 1 călătorie nouă și 5 locuri noi salvate în fiecare lună, plus 1 însoțitor în călătoriile pe care le organizezi. Premium elimină limitele, pe orice dispozitiv conectat la contul tău.',
    perks: ['Pașaportul tău, cu o viză pentru fiecare țară vizitată', 'Însoțitori nelimitați în fiecare călătorie', 'Mai multe călătorii în paralel, fără limită lunară', 'Locuri salvate nelimitate', 'Călătoriile tale offline, chiar și în modul avion', 'Ștampile rare pentru fiecare reper din călătorii', 'Carduri cu traseul și pașaportul, de distribuit', 'Widgetul călătoriei curente pe ecranul de blocare al iPhone-ului'],
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
      'Invită un prieten și primiți amândoi încă o lună, până la 12 pe an',
    ],
    rules: 'Citește regulile Premium și ale roții',
  },
  faq: {
    eyebrow: 'Întrebări',
    title: 'Întrebări, cu răspunsuri.',
    items: [
      {
        q: 'GoWorth este gratuită?',
        a: 'Da. Aplicația se descarcă și se folosește gratuit. Planul Gratuit include o călătorie activă, o călătorie nouă și cinci locuri noi salvate în fiecare lună, un însoțitor în călătoriile pe care le organizezi și cardul Carte poștală. Premium elimină aceste limite și adaugă mai multe călătorii în paralel, călătorii offline, pașaportul cu ștampile rare, cardurile Traseu și Pașaport și widgetul de pe ecranul de blocare: îl poți cumpăra lunar, anual sau o singură dată pe viață, ori îl poți câștiga la roata zilnică și invitând prieteni.',
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
        q: 'Pot planifica o călătorie cu prietenii?',
        a: 'Da. Alege-ți un nume de utilizator, apoi invită însoțitori din călătorie după numele lor de utilizator sau de profil. Nimeni nu intră fără să accepte, iar toți cei din călătorie îi pot edita datele, orașele, itinerariul, bugetul și cheltuielile și văd cine cui datorează. Locurile salvate, jurnalul și celelalte călătorii rămân private. La final, fiecare însoțitor primește o copie în jurnal și vizele pentru țările ei. Călătoriile gratuite includ un însoțitor; cu Premium nu există limită.',
      },
      {
        q: 'Cum funcționează împărțirea cheltuielilor?',
        a: 'Într-o călătorie cu însoțitori, fiecare cheltuială reține cine a plătit și pentru cine e: pentru toți, pentru câțiva sau pentru o singură persoană. Decontarea arată partea ta, cât datorezi sau ți se datorează și cele mai puține plăți prin care toată lumea ajunge chit. Când cineva îți dă banii înapoi, atinge Marchează plătit; poți anula oricând. Toți cei din călătorie văd aceleași solduri.',
      },
      {
        q: 'Cum funcționează codurile de invitație?',
        a: 'Deschide Invită prieteni din Profil și trimite codul tău de 6 caractere. Un prieten care îl introduce când își face cont sau în următoarele 14 zile câștigă o lună de Premium, la fel și tu. Luna începe imediat sau după orice Premium ai deja. Poți câștiga astfel până la 12 luni pe an; prietenii tăi primesc mereu luna lor.',
      },
      {
        q: 'Îmi pot distribui călătoria?',
        a: 'Da. Dintr-o călătorie sau din jurnal, atinge Distribuie și alege un stil: Carte poștală, Traseu sau Pașaport. Cardul este creat pe telefon și ajunge direct în meniul de distribuire, gata pentru Instagram, TikTok, Mesaje sau Poze; pe Android, fă o captură de ecran a cardului. Cheltuielile apar doar dacă le activezi. Carte poștală este gratuit; Traseu, Pașaport și distribuirea întregului pașaport vin cu Premium.',
      },
      {
        q: 'Ce fac notificările „Locuri în apropiere”?',
        a: 'Nimic, până le activezi din Profil > Notificări și permiți locația Întotdeauna. Apoi, când ajungi la aproximativ 2 km de locul în care erai, GoWorth îți poate sugera o atracție din apropiere. Poziția este folosită doar pentru a căuta locuri de pe telefon; nu se salvează în cont și nu se păstrează un istoric al locațiilor. Poți opri comutatorul oricând.',
      },
      {
        q: 'GoWorth funcționează offline?',
        a: 'Cu Premium, da. Aplicația păstrează pe telefon o copie a călătoriilor, bugetului, locurilor salvate, jurnalului și pașaportului, ca să se deschidă fără semnal. Modificările au nevoie de conexiune, iar copia se actualizează imediat ce revii online.',
      },
      {
        q: 'Am nevoie de cont?',
        a: 'Da, un cont cu email. Fiecare cont nou pornește gol, iar profilul, călătoriile, cheltuielile, locurile salvate și jurnalul rămân private. Ceilalți călători te pot găsi doar după ce îți alegi un nume de utilizator și nu îți văd niciodată adresa de email.',
      },
      {
        q: 'Pe ce dispozitive funcționează?',
        a: 'GoWorth este disponibilă pentru iPhone și Android, iar contul se sincronizează între ele.',
      },
      {
        q: 'De unde vin informațiile despre locuri?',
        a: 'Dintr-un catalog de 64 de destinații și 384 de locuri, plus atracții și localuri din OpenStreetMap, locuri din Wikipedia și Wikidata și fotografii ale fiecărui loc de pe Wikimedia Commons, cu sursa și licența lor. Verifică mereu programul și prețurile actuale cu locația.',
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
