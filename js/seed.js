
// Guest list data
const GUEST_LIST = [
  // Groom's side - Singles
  { id: 1, name: "Narcisse", partySize: 1, searchTerms: ["narcisse"] },
  { id: 2, name: "Jemima", partySize: 1, searchTerms: ["jemima"] },
  { id: 3, name: "Anella Tshilumba", partySize: 1, searchTerms: ["anella", "tshilumba"] },
  { id: 4, name: "Ammielle Ngombe", partySize: 1, searchTerms: ["ammielle", "ngombe"] },
  { id: 5, name: "Grace Mangi", partySize: 1, searchTerms: ["grace", "mangi"] },
  { id: 10, name: "Samuel Kalongo", partySize: 1, searchTerms: ["samuel", "kalongo"] },
  { id: 11, name: "Michel Kalongo", partySize: 1, searchTerms: ["michel", "kalongo"] },
  { id: 12, name: "Marilyn Kalongo", partySize: 1, searchTerms: ["marilyn", "kalongo"] },
  { id: 13, name: "Tantine Esther Kanyanya", partySize: 1, searchTerms: ["esther", "kanyanya", "tantine"] },
  { id: 14, name: "Joshua Lokamba", partySize: 1, searchTerms: ["joshua", "lokamba"] },
  { id: 15, name: "Rachel Lokamba", partySize: 1, searchTerms: ["rachel", "lokamba"] },
  { id: 16, name: "Guy Kubelua", partySize: 1, searchTerms: ["guy", "kubelua"] },
  { id: 17, name: "Priscille Kubelua", partySize: 1, searchTerms: ["priscille", "kubelua"] },
  { id: 18, name: "Ya Floride Mulamba", partySize: 1, searchTerms: ["floride", "mulamba"] },
  { id: 19, name: "Frere Pascal Kalala", partySize: 1, searchTerms: ["pascal", "kalala", "frere"] },
  { id: 20, name: "Sister Esther Murula", partySize: 1, searchTerms: ["esther", "murula", "sister"] },
  { id: 21, name: "Fr Chance Murula", partySize: 1, searchTerms: ["chance", "murula"] },
  { id: 24, name: "Arthur Kalenga", partySize: 1, searchTerms: ["arthur", "kalenga"] },
  { id: 25, name: "Laura Kalenga", partySize: 1, searchTerms: ["laura", "kalenga"] },
  { id: 26, name: "Tonton Emile Kitenge", partySize: 1, searchTerms: ["emile", "kitenge", "tonton"] },
  { id: 31, name: "Sharon Mbiye", partySize: 1, searchTerms: ["sharon", "mbiye"] },
  { id: 32, name: "Shekinah Mbiye", partySize: 1, searchTerms: ["shekinah", "mbiye"] },
  { id: 35, name: "Tantine Doudou Mulumba", partySize: 1, searchTerms: ["doudou", "mulumba", "tantine"] },
  { id: 36, name: "Jemima Mulumba", partySize: 1, searchTerms: ["jemima", "mulumba"] },
  { id: 37, name: "Jude Mulumba", partySize: 1, searchTerms: ["jude", "mulumba"] },
  { id: 38, name: "Nathan Mulumba", partySize: 1, searchTerms: ["nathan", "mulumba"] },
  { id: 39, name: "Emerance Musau", partySize: 1, searchTerms: ["emerance", "musau"] },
  { id: 40, name: "Fr Jermain Mbuyu", partySize: 1, searchTerms: ["jermain", "mbuyu"] },
  { id: 41, name: "Da Nicole Mbuyu", partySize: 1, searchTerms: ["nicole", "mbuyu"] },
  { id: 42, name: "Narcisse Mbuyu", partySize: 1, searchTerms: ["narcisse", "mbuyu"] },
  { id: 43, name: "Fr Tharcisse Ntunka", partySize: 1, searchTerms: ["tharcisse", "ntunka"] },
  { id: 44, name: "Da Cathy Ntunka", partySize: 1, searchTerms: ["cathy", "ntunka"] },
  { id: 45, name: "Nzuzo Mthabela", partySize: 1, searchTerms: ["nzuzo", "mthabela"] },
  { id: 46, name: "Teveshan Valaitham", partySize: 1, searchTerms: ["teveshan", "valaitham"] },
  { id: 47, name: "Ayanda Khumalo", partySize: 1, searchTerms: ["ayanda", "khumalo"] },
  { id: 50, name: "Charlie Lubanza", partySize: 1, searchTerms: ["charlie", "lubanza"] },
  { id: 51, name: "Divine Nsenga", partySize: 1, searchTerms: ["divine", "nsenga"] },

  // Groom's side - Couples
  { id: 100, name: "Nicolas & Anella Tshilumba", partySize: 2, searchTerms: ["nicolas", "anella", "tshilumba"] },
  { id: 101, name: "Danny & Deborah Mulamba", partySize: 2, searchTerms: ["danny", "deborah", "mulamba"] },
  { id: 102, name: "Polly & Annie Mangi", partySize: 2, searchTerms: ["polly", "annie", "mangi"] },
  { id: 103, name: "Nico & Thethe Kalongo", partySize: 2, searchTerms: ["nico", "thethe", "kalongo"] },
  { id: 104, name: "Christophe & Betty Kalenga", partySize: 2, searchTerms: ["christophe", "betty", "kalenga"] },
  { id: 105, name: "Martin & Henriette Kasongo", partySize: 2, searchTerms: ["martin", "henriette", "kasongo"] },
  { id: 106, name: "Emma & Gertrude Mbiye", partySize: 2, searchTerms: ["emma", "gertrude", "mbiye"] },
  { id: 107, name: "Faustin & Vicky Lugoma", partySize: 2, searchTerms: ["faustin", "vicky", "lugoma"] },
  { id: 108, name: "Jean-luc Kadima", partySize: 2, searchTerms: ["jean", "luc", "kadima", "jeanluc"] },
  { id: 109, name: "Papa Mbayo Muyembe", partySize: 2, searchTerms: ["mbayo", "muyembe", "papa"] },
  { id: 110, name: "Fr Serge Kalenga", partySize: 2, searchTerms: ["serge", "kalenga"] },
  { id: 111, name: "Joshua & Sansha Haripersadh", partySize: 2, searchTerms: ["joshua", "sansha", "haripersadh"] },
  { id: 112, name: "Laurent & Patou Mbiya", partySize: 2, searchTerms: ["laurent", "patou", "mbiya"] },
  { id: 113, name: "Kevin Muya & Francis Kayamba", partySize: 2, searchTerms: ["kevin", "muya", "francis", "kayamba"] },
  { id: 114, name: "Vivi & Papa Lubanza", partySize: 2, searchTerms: ["vivi", "lubanza", "papa"] },
  { id: 115, name: "Patrick & Anita Kalonji", partySize: 2, searchTerms: ["patrick", "anita", "kalonji"] },
  { id: 116, name: "Olivier & Deddy Odia", partySize: 2, searchTerms: ["olivier", "deddy", "odia"] },
  { id: 117, name: "Donat & Julia Kahutu", partySize: 2, searchTerms: ["donat", "julia", "kahutu"] },
  { id: 118, name: "Emmanuel & Nono Kalambay", partySize: 2, searchTerms: ["emmanuel", "nono", "kalambay"] },
  { id: 119, name: "Paul Kalambay", partySize: 2, searchTerms: ["paul", "kalambay"] },
  { id: 120, name: "Ceasar & Rozi Mukuna", partySize: 2, searchTerms: ["ceasar", "rozi", "mukuna"] },
  { id: 121, name: "Mikyle Pillay", partySize: 2, searchTerms: ["mikyle", "pillay"] },
  { id: 122, name: "Leonard Kadima & Mwa Mbuyi", partySize: 2, searchTerms: ["leonard", "kadima", "mwa", "mbuyi"] },

  // Bride's side
  { id: 200, name: "Soeur Monique Mulanga", partySize: 1, searchTerms: ["monique", "mulanga", "soeur"] },
  { id: 201, name: "Soeur Keren Mulanga", partySize: 1, searchTerms: ["keren", "mulanga", "soeur"] },
  { id: 202, name: "Couple Kangudia", partySize: 2, searchTerms: ["kangudia"] },
  { id: 203, name: "Frere Jevic", partySize: 1, searchTerms: ["jevic", "frere"] },
  { id: 204, name: "Couple Mukeninay", partySize: 2, searchTerms: ["mukeninay"] },
  { id: 205, name: "Couple Kayembe", partySize: 2, searchTerms: ["kayembe"] },
  { id: 206, name: "Couple Andre Kadima", partySize: 2, searchTerms: ["andre", "kadima"] },
  { id: 207, name: "Couple Tubadi", partySize: 2, searchTerms: ["tubadi"] },
  { id: 208, name: "Soeur Christell Bilonda", partySize: 1, searchTerms: ["christell", "bilonda", "soeur"] },
  { id: 209, name: "Mwa Ndaya Beya", partySize: 1, searchTerms: ["ndaya", "beya", "mwa"] },
  { id: 210, name: "Soeur Kasy", partySize: 1, searchTerms: ["kasy", "soeur"] },
  { id: 211, name: "Soeur Mbuyi", partySize: 1, searchTerms: ["mbuyi", "soeur"] },
  { id: 212, name: "Soeur Thamar", partySize: 1, searchTerms: ["thamar", "soeur"] },
  { id: 213, name: "Couple Philipe Ngoma", partySize: 2, searchTerms: ["philipe", "ngoma"] },
  { id: 214, name: "Soeur Gabriela", partySize: 1, searchTerms: ["gabriela", "soeur"] },
  { id: 215, name: "Soeur Sephora", partySize: 1, searchTerms: ["sephora", "soeur"] },
  { id: 216, name: "Soeur Eunice", partySize: 1, searchTerms: ["eunice", "soeur"] },
  { id: 217, name: "Soeur Keren", partySize: 1, searchTerms: ["keren", "soeur"] },
  { id: 218, name: "Soeur Christelle", partySize: 1, searchTerms: ["christelle", "soeur"] },
  { id: 219, name: "Soeur Christella", partySize: 1, searchTerms: ["christella", "soeur"] },
  { id: 220, name: "Soeur Hadassa", partySize: 1, searchTerms: ["hadassa", "soeur"] },
  { id: 221, name: "Couple Madi", partySize: 2, searchTerms: ["madi"] },
  { id: 222, name: "Couple Kalonji", partySize: 2, searchTerms: ["kalonji"] },
  { id: 223, name: "Couple Kanda", partySize: 2, searchTerms: ["kanda"] },
  { id: 224, name: "Seour Jael Kalonji", partySize: 1, searchTerms: ["jael", "kalonji", "seour"] },
  { id: 225, name: "Couple Phinees Ngoie", partySize: 2, searchTerms: ["phinees", "ngoie"] },
  { id: 226, name: "Couple Joel Mukuna", partySize: 2, searchTerms: ["joel", "mukuna"] },
  { id: 227, name: "Couple Adonis Ngoie", partySize: 2, searchTerms: ["adonis", "ngoie"] },
  { id: 228, name: "Couple Seraphin Ngoie", partySize: 2, searchTerms: ["seraphin", "ngoie"] },
  { id: 229, name: "Couple Ekaka Kangudia", partySize: 2, searchTerms: ["ekaka", "kangudia"] },
  { id: 230, name: "Couple Kalala (Lice)", partySize: 2, searchTerms: ["kalala", "lice"] },
  { id: 231, name: "Seour Christelle Nsenga", partySize: 1, searchTerms: ["christelle", "nsenga", "seour"] },
  { id: 232, name: "Couple Leonard Kayembe", partySize: 2, searchTerms: ["leonard", "kayembe"] },
  { id: 233, name: "Couple Tumba", partySize: 2, searchTerms: ["tumba"] },
  { id: 234, name: "Couple Mulongoy", partySize: 2, searchTerms: ["mulongoy"] },
  { id: 235, name: "Couple Marc Tshibwabwa", partySize: 2, searchTerms: ["marc", "tshibwabwa"] },
  { id: 236, name: "Couple Ilunga", partySize: 2, searchTerms: ["ilunga"] },
  { id: 237, name: "Soeur Debora Ekaka", partySize: 1, searchTerms: ["debora", "ekaka", "soeur"] },
  { id: 238, name: "Couple Danny Kabemba", partySize: 2, searchTerms: ["danny", "kabemba"] },
  { id: 239, name: "Soeur Harmony", partySize: 1, searchTerms: ["harmony", "soeur"] },
  { id: 240, name: "Soeur Dina", partySize: 1, searchTerms: ["dina", "soeur"] },
  { id: 241, name: "Couple Tshibangu (Chatty)", partySize: 2, searchTerms: ["tshibangu", "chatty"] },
  { id: 242, name: "Couple Christophe (Rachel)", partySize: 2, searchTerms: ["christophe", "rachel"] },
  { id: 243, name: "Soeur Dorcas", partySize: 1, searchTerms: ["dorcas", "soeur"] },
  { id: 244, name: "Soeur Chitalu", partySize: 1, searchTerms: ["chitalu", "soeur"] },
  { id: 245, name: "Couple Jonathan Kayembe", partySize: 2, searchTerms: ["jonathan", "kayembe"] },
  { id: 246, name: "Couple Kajingu (Sis bert)", partySize: 2, searchTerms: ["kajingu", "bert"] },
  { id: 247, name: "Couple Pathy Mukie", partySize: 2, searchTerms: ["pathy", "mukie"] },
  { id: 248, name: "Couple Henoch", partySize: 2, searchTerms: ["henoch"] },
  { id: 249, name: "Couple Jean Kasemwana", partySize: 2, searchTerms: ["jean", "kasemwana"] },
  { id: 250, name: "Soeur Christen", partySize: 1, searchTerms: ["christen", "soeur"] },
  { id: 251, name: "Couple Guelord", partySize: 2, searchTerms: ["guelord"] },
  { id: 252, name: "Frere Jeff", partySize: 1, searchTerms: ["jeff", "frere"] },
  { id: 253, name: "Couple Danah", partySize: 2, searchTerms: ["danah"] },
  { id: 254, name: "Couple Bajay", partySize: 2, searchTerms: ["bajay"] },
  { id: 255, name: "Couple Papi", partySize: 2, searchTerms: ["papi"] },
  { id: 256, name: "Soeur Charlotte", partySize: 1, searchTerms: ["charlotte", "soeur"] },
  { id: 257, name: "Soeur Chichi", partySize: 1, searchTerms: ["chichi", "soeur"] },
  { id: 258, name: "Soeur Sara", partySize: 1, searchTerms: ["sara", "soeur"] },
  { id: 259, name: "Soeur Anne", partySize: 1, searchTerms: ["anne", "soeur"] },
  { id: 260, name: "Soeur Aime", partySize: 1, searchTerms: ["aime", "soeur"] },
  { id: 261, name: "Frere Marco Bope", partySize: 1, searchTerms: ["marco", "bope", "frere"] },
  { id: 262, name: "Frere Markus", partySize: 1, searchTerms: ["markus", "frere"] },
  { id: 263, name: "Couple Mukaya", partySize: 2, searchTerms: ["mukaya"] },
  { id: 264, name: "Soeur Sharon", partySize: 1, searchTerms: ["sharon", "soeur"] },
  { id: 265, name: "Frere Jean Matama", partySize: 1, searchTerms: ["jean", "matama", "frere"] },
  { id: 266, name: "Couple Kapenga", partySize: 2, searchTerms: ["kapenga"] },
  { id: 267, name: "Couple Kibambi", partySize: 2, searchTerms: ["kibambi"] },
  { id: 268, name: "Couple Bope", partySize: 2, searchTerms: ["bope"] },
  { id: 269, name: "Soeur Anacore", partySize: 1, searchTerms: ["anacore", "soeur"] },
  { id: 270, name: "Mama Bilonda", partySize: 1, searchTerms: ["bilonda", "mama"] },
  { id: 271, name: "Soeur Ruth Seth", partySize: 1, searchTerms: ["ruth", "seth", "soeur"] },
  { id: 272, name: "Soeur Dorcas (Mama Aime)", partySize: 1, searchTerms: ["dorcas", "aime", "mama", "soeur"] },
  { id: 273, name: "Couple Jean Paul Tshalanga", partySize: 2, searchTerms: ["jean", "paul", "tshalanga"] },
  { id: 274, name: "Couple Paul Ilunga", partySize: 2, searchTerms: ["paul", "ilunga"] },
];

async function seedGuests() {
  const guestsCollection = db.collection('guests');
  let batch = db.batch();
  let count = 0;

  for (const guest of GUEST_LIST) {
    const docRef = guestsCollection.doc(); // Automatically generate a new ID
    batch.set(docRef, {
      ...guest,
      rsvp: 'pending',
      code: generateUniqueCode(),
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    count++;
    if (count % 500 === 0) {
      await batch.commit();
      batch = db.batch();
    }
  }

  if (count % 500 !== 0) {
    await batch.commit();
  }

  console.log(`Seeded ${count} guests.`);
}

function generateUniqueCode() {
    const prefix = 'WED';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const timestamp = Date.now().toString().slice(-4);
    return `${prefix}${randomNum}${timestamp}`;
}
