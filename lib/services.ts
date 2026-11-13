import type { PhotoId } from "./photos";

export type Service = {
  slug: string;
  title: string;
  /** Kort etikett i formulärets "Vad ska målas?". */
  option: string;
  tile: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  body: string[];
  includes: string[];
  craft: { title: string; text: string }[];
  rot: string;
  faq: { q: string; a: string }[];
  photo: PhotoId;
};

export const services: Service[] = [
  {
    slug: "invandig-malning",
    title: "Invändig målning",
    option: "Rum invändigt",
    tile: "Väggar, tak och snickerier – med ett underarbete som syns i slutresultatet.",
    metaTitle: "Invändig målning i Eslöv, Lund och Mellanskåne",
    metaDescription:
      "Målare för invändig målning i Eslöv med omnejd. Väggar, tak, lister och dörrar. Fast pris efter kostnadsfritt hembesök och ROT-avdrag direkt på fakturan.",
    lead: "Ett rum blir aldrig bättre än underarbetet. Därför läggs tiden där den gör skillnad: spackling, slipning och skarpa skärningar mot tak och lister.",
    body: [
      "Oavsett om det gäller ett enstaka rum eller hela huset börjar jobbet med ett hembesök. Då går vi igenom ytorna, pratar kulör och glans och bestämmer vad som behöver lagas innan färgen kommer på.",
      "Golv och möbler täcks, hål och sprickor spacklas och väggarna slipas jämna. Först därefter grundas och målas det – normalt två strykningar. När jobbet är klart är rummet städat och färdigt att flytta in i igen.",
    ],
    includes: [
      "Målning av väggar och tak",
      "Spackling, slipning och grundning av underlaget",
      "Målning av lister, foder, dörrar och andra snickerier",
      "Täckning av golv, möbler och fasta inredningar",
      "Råd om kulör, glans och färgtyp för varje rum",
      "Städning när arbetet är avslutat",
    ],
    craft: [
      { title: "Underarbetet avgör", text: "Skarvar, spikhål och gamla ojämnheter lagas innan första strykningen. Det är det som gör att väggen ser bra ut även i släpljus." },
      { title: "Rätt färg på rätt plats", text: "Tåligare färg i hall och kök, matt i sovrum och vardagsrum. Miljömärkta färger med låg lukt är standard inomhus." },
    ],
    rot: "Bor du i huset eller bostadsrätten och äger den kan du få ROT-avdrag på arbetskostnaden. Avdraget dras direkt på fakturan – du betalar bara mellanskillnaden.",
    faq: [
      { q: "Hur lång tid tar det att måla ett rum?", a: "Ett normalstort rum med väggar och tak tar oftast en till två arbetsdagar, beroende på hur mycket underarbete som krävs. Du får en tidsplan i offerten." },
      { q: "Behöver jag flytta ut möblerna?", a: "Nej. Det räcker att möblerna ställs mot mitten av rummet, så täcks de in. Ömtåliga saker och tavlor är bra om du plockar undan själv." },
      { q: "Kan jag stå för färgen själv?", a: "Det går bra, men oftast blir det bättre och inte dyrare om färgen ingår. Då får du rätt kvalitet och rätt mängd, och ansvaret för resultatet ligger på ett ställe." },
    ],
    photo: "service-invandig",
  },
  {
    slug: "fasadmalning",
    title: "Fasad & utvändigt",
    option: "Fasad / utvändigt",
    tile: "Tvätt, skrapning, grundning och målning som står emot skånskt väder.",
    metaTitle: "Fasadmålning i Eslöv, Höör, Hörby och Mellanskåne",
    metaDescription:
      "Fasadmålning och utvändig målning i Eslöv med omnejd. Tvätt, skrapning, grundning och målning av träfasader, vindskivor och förråd. Fast pris och ROT-avdrag.",
    lead: "En fasad ska skydda huset i många år. Då räcker det inte att stryka på ny färg – underlaget måste vara rent, torrt och friskt först.",
    body: [
      "Utvändig målning görs under den varma delen av året, när träet är torrt och temperaturen tillåter. Vi börjar med att gå runt huset tillsammans och bedöma skicket: var färgen släpper, om det finns röta och vilken typ av färg som sitter på i dag.",
      "Sedan tvättas fasaden, lös färg skrapas bort och bart trä grundas. Skadade brädor byts eller lagas innan fasaden målas med ett färgsystem som passar huset – och som fungerar ihop med den gamla färgen.",
    ],
    includes: [
      "Besiktning av fasadens skick och befintlig färgtyp",
      "Fasadtvätt och behandling mot alger och påväxt",
      "Skrapning, slipning och grundning av bart trä",
      "Målning av fasad, vindskivor, takfot, knutar och foder",
      "Förråd, garage, plank och staket",
      "Enklare byte av skadade brädor och lister",
    ],
    craft: [
      { title: "Rätt färgsystem", text: "Linoljefärg, alkyd, akrylat eller slamfärg – valet styrs av vad som sitter på huset och hur du vill underhålla det framöver." },
      { title: "Väder och torktid", text: "Fasader målas när träet är torrt och vädret tillåter. Hellre en dags väntan än en fasad som flagnar efter två år." },
    ],
    rot: "Utvändig målning av småhus du äger och bor i ger rätt till ROT-avdrag på arbetskostnaden. För bostadsrätt gäller avdraget bara arbeten inne i lägenheten.",
    faq: [
      { q: "När på året kan fasaden målas?", a: "Normalt från maj till september. Det behöver vara tillräckligt varmt och träet måste hinna torka upp efter vintern. Boka gärna hembesök redan under vintern eller våren." },
      { q: "Hur ofta behöver en träfasad målas om?", a: "Det beror på färgtyp, väderstreck och underarbete, men räkna med ungefär vart åttonde till femtonde år. Söder- och västsidor slits snabbast." },
      { q: "Målar ni putsade fasader?", a: "Hör av dig och beskriv huset, så tittar vi på det vid hembesöket. Rätt färg på puts är avgörande för att fasaden ska kunna andas." },
    ],
    photo: "service-fasad",
  },
  {
    slug: "fonster-och-snickerier",
    title: "Fönster & snickerier",
    option: "Fönster & snickerier",
    tile: "Skrapning, kittning och målning av fönster, dörrar och snickerier.",
    metaTitle: "Fönstermålning och fönsterrenovering i Eslöv och Lund",
    metaDescription:
      "Målning och renovering av fönster, dörrar och snickerier i Eslöv, Lund och Mellanskåne. Skrapning, kittning och målning – även med linoljefärg. ROT-avdrag.",
    lead: "Gamla träfönster är ofta värda att bevara. Med rätt underhåll håller de i generationer – och det är nästan alltid billigare än att byta.",
    body: [
      "Fönster och ytterdörrar är husets mest utsatta snickerier. När färgen spricker och kittet släpper tränger fukten in, och då går det fort. Ett fönster som tas om hand i tid behöver sällan mer än skrapning, nytt kitt där det behövs och ny färg.",
      "Arbetet görs noggrant och i rätt ordning: lös färg och dåligt kitt tas bort, träet oljas eller grundas, det kittas om och målas i flera tunna skikt. På äldre hus används gärna linoljefärg, som fungerar väl ihop med gammalt virke.",
    ],
    includes: [
      "Skrapning och slipning av bågar och karmar",
      "Omkittning och lagning av mindre skador",
      "Grundning och målning, in- och utvändigt",
      "Ytterdörrar, entréer och garageportar",
      "Trappor, räcken, lister och foder",
      "Linoljefärg eller modern färg efter husets förutsättningar",
    ],
    craft: [
      { title: "Tunna skikt håller längst", text: "Fönster målas i flera tunna strykningar, och färgen dras en aning in på glaset så att vattnet rinner av i stället för in." },
      { title: "Bevara i stället för att byta", text: "Kärnvirket i äldre fönster är ofta bättre än det som går att köpa nytt. Renovering sparar både pengar och husets karaktär." },
    ],
    rot: "Målning och renovering av fönster och snickerier i bostaden ger rätt till ROT-avdrag på arbetskostnaden när arbetet utförs hemma hos dig.",
    faq: [
      { q: "Går det att renovera fönster som ser riktigt dåliga ut?", a: "Oftast, ja. Flagnande färg och sprucket kitt ser värre ut än det är. Vid hembesöket kontrolleras om träet är friskt – är det bara ytan som är skadad går fönstret att rädda." },
      { q: "Linoljefärg eller vanlig fönsterfärg?", a: "Det beror på vad som sitter på i dag och hur huset är byggt. I Målarguiden finns en genomgång av skillnaderna, och vid hembesöket får du en rekommendation för just dina fönster." },
      { q: "Måste fönstren plockas ur?", a: "Inte alltid. Mycket går att göra på plats. Vid större renoveringar kan bågarna hakas av en i taget så att huset aldrig står öppet." },
    ],
    photo: "service-fonster",
  },
  {
    slug: "tapetsering-och-spackling",
    title: "Tapetsering & spackling",
    option: "Tapetsering & spackling",
    tile: "Släta väggar och raka våder med mönsterpassning som stämmer.",
    metaTitle: "Tapetsering och spackling i Eslöv, Lund och Kävlinge",
    metaDescription:
      "Tapetsering, bredspackling och väggrenovering i Eslöv med omnejd. Nedtagning av gamla tapeter, släta väggar och noggrann mönsterpassning. ROT-avdrag.",
    lead: "En tapet avslöjar allt som finns under. Därför börjar en bra tapetsering med en vägg som är slät, ren och rätt förbehandlad.",
    body: [
      "Gamla tapeter tas ner eller spacklas in, beroende på vad som sitter på väggen och vad som ska upp. Ojämna väggar bredspacklas och slipas tills ytan är helt slät – särskilt viktigt om väggen ska målas eller få en tunn, ljus tapet.",
      "Vid tapetseringen mäts våderna in så att mönstret hamnar rätt i rummet, skarvarna blir täta och avsluten mot tak, lister och hörn blir raka. Det gäller oavsett om det är en enkel enfärgad tapet eller ett stort mönster med lång rapport.",
    ],
    includes: [
      "Nedtagning av gamla tapeter",
      "Lagning, bredspackling och slipning av väggar och tak",
      "Tapetsering med papperstapet, non-woven och vinyl",
      "Mönsterpassning och fondväggar",
      "Uppsättning av väv och målning på väv",
      "Råd om materialåtgång vid beställning av tapet",
    ],
    craft: [
      { title: "Släta väggar", text: "Bredspackling gör att gamla skarvar, struktur och lagningar försvinner. Det är grunden för både tapet och målade väggar." },
      { title: "Mönstret i fokus", text: "Första våden sätts där den syns mest och loddas in. Då följer mönstret rummet i stället för sneda hörn." },
    ],
    rot: "Tapetsering och spackling i bostad du äger och bor i ger rätt till ROT-avdrag på arbetskostnaden. Tapeter och annat material omfattas inte av avdraget.",
    faq: [
      { q: "Kan man tapetsera på gammal tapet?", a: "Ibland, om den gamla sitter ordentligt och är slät. Men resultatet blir nästan alltid bättre om gamla lager tas ner eller spacklas in. Det bedöms på plats." },
      { q: "Hur mycket tapet ska jag köpa?", a: "Det beror på väggytan, rullens mått och mönstrets rapport. Skicka gärna mått eller bilder, så får du hjälp att räkna innan du beställer." },
      { q: "Målar ni väggarna i stället om vi ångrar oss?", a: "Självklart. Efter bredspackling kan väggen lika gärna målas. Säg till vid hembesöket så tas båda alternativen med i offerten." },
    ],
    photo: "service-tapet",
  },
  {
    slug: "fastighetsservice",
    title: "Fastighetsservice & underhåll",
    option: "Fastighetsservice",
    tile: "Löpande underhåll, bättringar och mindre reparationer av din fastighet.",
    metaTitle: "Fastighetsservice och underhållsmålning i Eslöv och Skåne",
    metaDescription:
      "Fastighetsservice i Eslöv med omnejd: underhållsmålning, bättringar och mindre reparationer för villaägare, BRF:er och fastighetsägare. En kontaktperson.",
    lead: "Vi målar – och vi underhåller din fastighet. Små åtgärder i tid är det som håller de stora kostnaderna borta.",
    body: [
      "Fastighetsservice handlar om det som ofta hamnar mellan stolarna: bättringsmålning i trapphuset, staketet som behöver en omgång, dörren som kärvar eller förrådet som börjat flagna. Var för sig små saker, men tillsammans avgör de hur en fastighet upplevs och åldras.",
      "Du får en och samma person som lär känna fastigheten, ser vad som behöver göras och återkommer enligt överenskommelse. Det kan vara enstaka uppdrag eller ett löpande underhållsavtal med fasta besök.",
    ],
    includes: [
      "Underhålls- och bättringsmålning in- och utvändigt",
      "Trapphus, entréer, tvättstugor och förråd",
      "Staket, plank, räcken och utemöbler",
      "Enklare snickerilagningar och justeringar",
      "Målning vid in- och utflyttning",
      "Återkommande tillsyn enligt underhållsavtal",
    ],
    craft: [
      { title: "En som känner huset", text: "Samma person varje gång betyder att ingenting behöver förklaras om, och att små skador upptäcks innan de blir stora." },
      { title: "Planerat underhåll", text: "Med en enkel underhållsplan sprids kostnaderna över åren och fastigheten håller en jämn standard." },
    ],
    rot: "Privatpersoner kan få ROT-avdrag på arbetskostnaden för reparation och underhåll av den egna bostaden. För bostadsrättsföreningar och företag gäller inte ROT – där lämnas offert exklusive moms.",
    faq: [
      { q: "Vilka typer av jobb ingår i fastighetsservice?", a: "Främst målning, ytskikt och enklare reparationer av snickerier. El- och VVS-arbeten utförs inte, men behövs det samordnas gärna arbetet med din behöriga installatör." },
      { q: "Måste vi teckna avtal?", a: "Nej. Många börjar med ett enstaka uppdrag. Ett underhållsavtal passar när ni vill ha fasta besök och en kontakt som håller koll över tid." },
      { q: "Hur fungerar fakturering för föreningar?", a: "Enstaka uppdrag faktureras efter slutfört arbete enligt offert. Vid underhållsavtal görs en överenskommelse om omfattning och fakturering som passar föreningens budget." },
    ],
    photo: "service-fastighet",
  },
];

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.option })),
  { value: "annat", label: "Annat / flera saker" },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
