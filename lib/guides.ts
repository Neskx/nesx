/**
 * Målarguiden – artiklar för SEO.
 * Lägg till en ny artikel genom att kopiera ett objekt nedan och ändra innehållet.
 * Sidan, sitemap och strukturerad data skapas automatiskt.
 */

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "tip"; title: string; text: string };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  /** ISO-datum, uppdatera när texten ändras. */
  updated: string;
  readMinutes: number;
  relatedService: string;
  blocks: Block[];
};

export const guides: Guide[] = [
  {
    slug: "nar-ska-fasaden-malas-om",
    title: "När ska fasaden målas om?",
    description:
      "Så ser du om träfasaden behöver målas om: tecknen att hålla utkik efter, hur länge olika färgtyper håller och när på året det är läge.",
    updated: "2026-11-12",
    readMinutes: 4,
    relatedService: "fasadmalning",
    blocks: [
      { type: "p", text: "En träfasad som målas om i tid kräver mindre arbete, mindre färg och håller längre än en som fått stå för länge. Men hur vet man när det är dags? Det går inte att ge ett exakt årtal – det beror på färgtyp, väderstreck och hur väl förra målningen gjordes. Däremot finns det tydliga tecken." },
      { type: "h2", text: "Fem tecken på att det är dags" },
      {
        type: "ul",
        items: [
          "Färgen kritar – stryk med handen över fasaden. Blir handflatan tydligt färgad har bindemedlet brutits ner.",
          "Färgen har mattats och bleknat ojämnt, särskilt på söder- och västsidan.",
          "Sprickor och flagor, ofta först i brädornas nederkant och kring knutar och fönster.",
          "Grått, bart trä tittar fram. Då är skyddet borta och virket tar upp fukt.",
          "Alger och svart påväxt som kommer tillbaka snabbt efter tvätt.",
        ],
      },
      { type: "p", text: "Ser du bara det första tecknet räcker det ofta med tvätt och en ny strykning. Har färgen börjat flagna krävs skrapning och grundning, och arbetet blir större. Det är alltså billigare att vara lite tidigt ute än lite sent." },
      { type: "h2", text: "Hur länge håller en fasadmålning?" },
      { type: "p", text: "Som tumregel behöver en täckmålad träfasad målas om ungefär vart åttonde till femtonde år. Slamfärg, som den klassiska röda, slits på ett annat sätt: den bleknar och kritar men flagnar inte, och är lätt att borsta av och stryka om." },
      { type: "p", text: "Väderstrecket spelar stor roll. Sol och slagregn gör att söder- och västfasader ofta behöver målas betydligt tidigare än norrsidan. Det är helt i sin ordning att måla om de utsatta sidorna oftare än resten av huset." },
      { type: "h2", text: "Rätt tid på året" },
      { type: "p", text: "Utvändig målning görs normalt från maj till september. Träet behöver ha torkat upp efter vintern, och temperaturen ska hålla sig över den gräns som färgtillverkaren anger – även nattetid medan färgen torkar. Undvik att måla i stark sol direkt på fasaden; färgen torkar då för fort och fäster sämre." },
      { type: "tip", title: "Gör en vårrunda", text: "Gå ett varv runt huset varje vår. Titta särskilt på nedersta brädorna, fönsterblecken och vindskivorna – det är där skadorna börjar." },
      { type: "h2", text: "Underarbetet avgör resultatet" },
      { type: "p", text: "Ny färg fäster aldrig bättre än underlaget tillåter. En ordentlig fasadtvätt, skrapning av allt som sitter löst och grundning av bart trä är det som gör att nästa målning håller i många år. Det är också viktigt att veta vilken färgtyp som sitter på i dag, eftersom alla färger inte går att kombinera." },
      { type: "p", text: "Är du osäker på fasadens skick? Skicka några bilder eller boka ett kostnadsfritt hembesök, så får du ett ärligt besked om vad som behöver göras nu och vad som kan vänta." },
    ],
  },
  {
    slug: "linoljefarg-eller-akrylat",
    title: "Linoljefärg eller akrylat?",
    description:
      "Linoljefärg, alkyd eller akrylat? Här är skillnaderna, för- och nackdelarna och vad som passar bäst på fasad, fönster och äldre hus.",
    updated: "2026-11-12",
    readMinutes: 5,
    relatedService: "fonster-och-snickerier",
    blocks: [
      { type: "p", text: "Valet av färgtyp påverkar inte bara utseendet utan också hur huset ska underhållas i framtiden. Det finns ingen färg som är bäst på allt – däremot finns det nästan alltid en som är rätt för just ditt hus." },
      { type: "h2", text: "Linoljefärg – den traditionella" },
      { type: "p", text: "Linoljefärg består av linolja och pigment och har använts på svenska hus i århundraden. Oljan tränger in i träet i stället för att lägga sig som en hinna ovanpå, och färgen släpper igenom fukt. Den åldras genom att sakta mattas och krita, inte genom att flagna." },
      {
        type: "ul",
        items: [
          "Fördelar: tränger in i och skyddar träet, åldras vackert, lätt att underhålla – ofta räcker det att olja eller stryka om. Få och enkla beståndsdelar.",
          "Nackdelar: lång torktid, kräver tunna strykningar och rätt väder, mattas snabbare i utsatta lägen och kräver mer hantverksvana.",
        ],
      },
      { type: "h2", text: "Akrylatfärg – den moderna" },
      { type: "p", text: "Akrylatfärg är vattenburen och bildar en elastisk film på ytan. Den håller kulör och glans länge och torkar snabbt, vilket gör arbetet mindre väderkänsligt." },
      {
        type: "ul",
        items: [
          "Fördelar: god kulör- och glansbeständighet, snabb torktid, lätt att arbeta med och låg lukt.",
          "Nackdelar: lägger sig som ett skikt ovanpå träet. Om fukt tar sig in bakom filmen kan färgen släppa i flagor, och underarbetet vid nästa ommålning blir större.",
        ],
      },
      { type: "h2", text: "Alkyd – mellanvägen" },
      { type: "p", text: "Alkydfärg är en oljebaserad färg som tränger in bättre än akrylat men torkar snabbare än ren linoljefärg. Den används ofta som grundfärg under akrylat, eller som täckfärg på snickerier där man vill ha en hård och slät yta." },
      { type: "h2", text: "Vad passar var?" },
      {
        type: "ul",
        items: [
          "Äldre hus och gamla träfönster: linoljefärg fungerar väl ihop med gammalt virke och gör framtida underhåll enkelt.",
          "Nyare villor som redan är målade med akrylat: fortsätt oftast med samma system, med alkydgrund på bart trä.",
          "Fasader med slamfärg: stryks om med slamfärg. Vill man byta till täckfärg krävs ett grundligt underarbete.",
          "Invändiga snickerier: vattenburen snickerifärg ger en slät, tålig yta med låg lukt.",
        ],
      },
      { type: "tip", title: "Byt inte system i onödan", text: "Den vanligaste orsaken till flagnande fasader är att fel färg lagts ovanpå den gamla. Ta reda på vad som sitter på huset innan du bestämmer dig – det går att testa på plats." },
      { type: "h2", text: "Miljö och hälsa" },
      { type: "p", text: "Linoljefärg bygger på en förnybar råvara och innehåller få tillsatser. Moderna vattenburna färger har låga halter lösningsmedel, och många är miljömärkta. Inomhus är märkta färger med låg lukt standard. Säg till om du har särskilda önskemål, så tas det med redan i offerten." },
      { type: "p", text: "Vill du veta vad som passar ditt hus? Vid hembesöket kontrolleras vilken färg som sitter på i dag, och du får en rekommendation med både för- och nackdelar." },
    ],
  },
  {
    slug: "sa-fungerar-rot-avdraget",
    title: "Så fungerar ROT-avdraget",
    description:
      "ROT-avdrag vid målning förklarat: hur mycket du får dra av, vilka villkor som gäller och hur avdraget hanteras på fakturan.",
    updated: "2026-11-12",
    readMinutes: 4,
    relatedService: "invandig-malning",
    blocks: [
      { type: "p", text: "ROT-avdraget gör att du som privatperson bara betalar en del av arbetskostnaden när du anlitar en målare. Resten begär företaget från Skatteverket. Här är det viktigaste att känna till." },
      { type: "h2", text: "Hur stort är avdraget?" },
      { type: "p", text: "ROT-avdraget är 30 procent av arbetskostnaden, upp till 50 000 kronor per person och år. Är ni två som äger bostaden kan ni dela på avdraget och alltså få upp till 100 000 kronor tillsammans. ROT och RUT har ett gemensamt tak på 75 000 kronor per person och år." },
      { type: "p", text: "Avdraget gäller bara arbetet. Material, resor och utrustning ger inte rätt till ROT-avdrag. Därför delas offerten upp så att arbetskostnaden syns tydligt." },
      { type: "tip", title: "Räkneexempel", text: "Arbetskostnad 40 000 kr och material 8 000 kr. ROT-avdraget blir 30 % av 40 000 = 12 000 kr. Du betalar 36 000 kr i stället för 48 000 kr." },
      { type: "h2", text: "Vilka villkor gäller?" },
      {
        type: "ul",
        items: [
          "Du ska äga bostaden och bo i den, eller använda den som fritidsbostad. Avdraget kan även gälla arbete i dina föräldrars bostad om du äger den.",
          "Småhus ska vara äldre än fem år.",
          "I bostadsrätt gäller avdraget bara arbeten inne i lägenheten, alltså det du själv ansvarar för – inte fasad eller trapphus.",
          "Du måste ha betalat tillräckligt med skatt under året för att kunna utnyttja avdraget.",
          "Företaget som utför arbetet ska vara godkänt för F-skatt.",
        ],
      },
      { type: "h2", text: "Vilka målningsarbeten omfattas?" },
      { type: "p", text: "Invändig målning, tapetsering och spackling omfattas, liksom utvändig målning av småhus – fasad, fönster, dörrar och snickerier. Även fristående komplementbyggnader som garage och förråd på tomten kan omfattas." },
      { type: "h2", text: "Så går det till i praktiken" },
      {
        type: "ul",
        items: [
          "Du lämnar personnummer och fastighetsbeteckning. För bostadsrätt behövs föreningens organisationsnummer och lägenhetsnummer.",
          "Avdraget dras direkt på fakturan. Du betalar bara din del.",
          "När fakturan är betald begär företaget resten från Skatteverket.",
          "Skatteverket skickar ett besked till dig, och avdraget syns sedan i din deklaration.",
        ],
      },
      { type: "p", text: "Om Skatteverket skulle neka utbetalningen, till exempel för att du redan utnyttjat hela ditt utrymme, är du skyldig att betala resterande belopp. Du kan se hur mycket ROT- och RUT-avdrag du har använt under året genom att logga in hos Skatteverket." },
      { type: "h2", text: "För föreningar och företag" },
      { type: "p", text: "Bostadsrättsföreningar, hyresfastigheter och företag kan inte få ROT-avdrag. Där lämnas offerten utan avdrag och priset anges exklusive moms." },
      { type: "p", text: "Reglerna kan ändras. Uppgifterna här gäller för 2026 – aktuella belopp och villkor finns alltid hos Skatteverket. Vill du se vad avdraget betyder för ditt jobb? Prova ROT-kalkylatorn på startsidan." },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
