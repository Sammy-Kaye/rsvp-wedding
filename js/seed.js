// Guest list data
const GUEST_LIST = [
  // Groom's side - Singles
  { id: 1, name: "Narcisse", partySize: 1, searchTerms: ["narcisse"] },
  { id: 2, name: "Ammielle Ngombe", partySize: 1, searchTerms: ["ammielle", "ngombe"] },
  { id: 3, name: "Grace Mangi", partySize: 1, searchTerms: ["grace", "mangi"] },
  { id: 4, name: "Samuel Kalongo", partySize: 1, searchTerms: ["samuel", "kalongo"] },
  { id: 5, name: "Michel Kalongo", partySize: 1, searchTerms: ["michel", "kalongo"] },
  { id: 6, name: "Marilyn Kalongo", partySize: 1, searchTerms: ["marilyn", "kalongo"] },
  { id: 7, name: "Tantine Esther Kanyanya", partySize: 1, searchTerms: ["tantine", "esther", "kanyanya"] },
  { id: 8, name: "Ya Floride Mulamba", partySize: 1, searchTerms: ["ya", "floride", "mulamba"] },
  { id: 9, name: "Frere Pascal Kalala", partySize: 1, searchTerms: ["frere", "pascal", "kalala"] },
  { id: 10, name: "Arthur Kalenga", partySize: 1, searchTerms: ["arthur", "kalenga"] },
  { id: 11, name: "Laura Kalenga", partySize: 1, searchTerms: ["laura", "kalenga"] },
  { id: 12, name: "Tonton Emile Kitenge", partySize: 1, searchTerms: ["tonton", "emile", "kitenge"] },
  { id: 13, name: "Martin Kasongo", partySize: 1, searchTerms: ["martin", "kasongo"] },
  { id: 14, name: "Henriette Kasongo", partySize: 1, searchTerms: ["henriette", "kasongo"] },
  { id: 15, name: "Sharon Mbiye", partySize: 1, searchTerms: ["sharon", "mbiye"] },
  { id: 16, name: "Shekinah Mbiye", partySize: 1, searchTerms: ["shekinah", "mbiye"] },
  { id: 17, name: "Tantine Doudou Mulumba", partySize: 1, searchTerms: ["tantine", "doudou", "mulumba"] },
  { id: 18, name: "Jemima Mulumba", partySize: 1, searchTerms: ["jemima", "mulumba"] },
  { id: 19, name: "Jude Mulumba", partySize: 1, searchTerms: ["jude", "mulumba"] },
  { id: 20, name: "Nathan Mulumba", partySize: 1, searchTerms: ["nathan", "mulumba"] },
  { id: 21, name: "Emerance Musau", partySize: 1, searchTerms: ["emerance", "musau"] },
  { id: 22, name: "Narcisse Mbuyu", partySize: 1, searchTerms: ["narcisse", "mbuyu"] },
  { id: 23, name: "Nzuzo Mthabela", partySize: 1, searchTerms: ["nzuzo", "mthabela"] },
  { id: 24, name: "Teveshan Valaitham", partySize: 1, searchTerms: ["teveshan", "valaitham"] },
  { id: 25, name: "Ayanda Khumalo", partySize: 1, searchTerms: ["ayanda", "khumalo"] },
  { id: 26, name: "Jemima", partySize: 1, searchTerms: ["jemima"] },

  // Groom's side - Couples
  { id: 100, name: "Tharcisse Yambayamba", partySize: 2, searchTerms: ["tharcisse", "yambayamba"] },
  { id: 101, name: "Nicolas Tshilumba", partySize: 2, searchTerms: ["nicolas", "tshilumba"] },
  { id: 102, name: "Danny Mulamba", partySize: 2, searchTerms: ["danny", "mulamba"] },
  { id: 103, name: "Polly Mangi", partySize: 2, searchTerms: ["polly", "mangi"] },
  { id: 104, name: "Nico Kalongo", partySize: 2, searchTerms: ["nico", "kalongo"] },
  { id: 105, name: "Joshua Lokamba", partySize: 2, searchTerms: ["joshua", "lokamba"] },
  { id: 106, name: "Guy Kubelua", partySize: 2, searchTerms: ["guy", "kubelua"] },
  { id: 107, name: "Chance Murula", partySize: 2, searchTerms: ["chance", "murula"] },
  { id: 108, name: "Christophe Kalenga", partySize: 2, searchTerms: ["christophe", "kalenga"] },
  { id: 109, name: "Emmanuel Mbiye", partySize: 2, searchTerms: ["emmanuel", "mbiye"] },
  { id: 110, name: "Faustin Lugoma", partySize: 2, searchTerms: ["faustin", "lugoma"] },
  { id: 111, name: "Jean-luc Kadima", partySize: 2, searchTerms: ["jean-luc", "kadima"] },
  { id: 112, name: "Mbayo Muyembe", partySize: 2, searchTerms: ["mbayo", "muyembe"] },
  { id: 113, name: "Jermain Mbuyu", partySize: 2, searchTerms: ["jermain", "mbuyu"] },
  { id: 114, name: "Serge Kalenga", partySize: 2, searchTerms: ["serge", "kalenga"] },
  { id: 115, name: "Tharcisse Ntunka", partySize: 2, searchTerms: ["tharcisse", "ntunka"] },
  { id: 116, name: "Joshua Haripersadh", partySize: 2, searchTerms: ["joshua", "haripersadh"] },
  { id: 117, name: "Laurent Mbiya", partySize: 2, searchTerms: ["laurent", "mbiya"] },
  { id: 118, name: "Francis Kayamba", partySize: 2, searchTerms: ["francis", "kayamba"] },

  // Bride's side
  { id: 200, name: "Soeur Monique Mulanga", partySize: 1, searchTerms: ["soeur", "monique", "mulanga"] },
  { id: 201, name: "Soeur Keren Mulanga", partySize: 1, searchTerms: ["soeur", "keren", "mulanga"] },
  { id: 202, name: "Frere Jevic Kangudia", partySize: 1, searchTerms: ["frere", "jevic", "kangudia"] },
  { id: 203, name: "Soeur Christell Bilonda", partySize: 1, searchTerms: ["soeur", "christell", "bilonda"] },
  { id: 204, name: "Soeur Mwa Ndaya Beya", partySize: 1, searchTerms: ["soeur", "mwa", "ndaya", "beya"] },
  { id: 205, name: "Soeur Kasy Siwe", partySize: 1, searchTerms: ["soeur", "kasy", "siwe"] },
  { id: 206, name: "Soeur Mbuyi Siwe", partySize: 1, searchTerms: ["soeur", "mbuyi", "siwe"] },
  { id: 207, name: "Soeur Thamar Siwe", partySize: 1, searchTerms: ["soeur", "thamar", "siwe"] },
  { id: 208, name: "Soeur Gabriela Mukeninay", partySize: 1, searchTerms: ["soeur", "gabriela", "mukeninay"] },
  { id: 209, name: "Soeur Sephora Kapenga", partySize: 1, searchTerms: ["soeur", "sephora", "kapenga"] },
  { id: 210, name: "Soeur Eunice Nkulu", partySize: 1, searchTerms: ["soeur", "eunice", "nkulu"] },
  { id: 211, name: "Soeur Keren Nkulu", partySize: 1, searchTerms: ["soeur", "keren", "nkulu"] },
  { id: 212, name: "Soeur Christelle Ndjibu", partySize: 1, searchTerms: ["soeur", "christelle", "ndjibu"] },
  { id: 213, name: "Soeur Christella Ndjibu", partySize: 1, searchTerms: ["soeur", "christella", "ndjibu"] },
  { id: 214, name: "Soeur Hadassa Mukeninay", partySize: 1, searchTerms: ["soeur", "hadassa", "mukeninay"] },
  { id: 215, name: "Seour Jael Kalonji", partySize: 1, searchTerms: ["seour", "jael", "kalonji"] },
  { id: 216, name: "Seour Christelle Nsenga", partySize: 1, searchTerms: ["seour", "christelle", "nsenga"] },
  { id: 217, name: "Soeur Debora Ekaka", partySize: 1, searchTerms: ["soeur", "debora", "ekaka"] },
  { id: 218, name: "Soeur Harmony Ndaye", partySize: 1, searchTerms: ["soeur", "harmony", "ndaye"] },
  { id: 219, name: "Soeur Dina Makingo", partySize: 1, searchTerms: ["soeur", "dina", "makingo"] },
  { id: 220, name: "Charlie Lubanza", partySize: 1, searchTerms: ["charlie", "lubanza"] },
  { id: 221, name: "Divine Nsenga", partySize: 1, searchTerms: ["divine", "nsenga"] },
  { id: 222, name: "Soeur Dorcas Ndjibu", partySize: 1, searchTerms: ["soeur", "dorcas", "ndjibu"] },
  { id: 223, name: "Soeur Chitalu", partySize: 1, searchTerms: ["soeur", "chitalu"] },
  { id: 224, name: "Soeur Christen Jadika", partySize: 1, searchTerms: ["soeur", "christen", "jadika"] },
  { id: 225, name: "Frere Jeff Muganza", partySize: 1, searchTerms: ["frere", "jeff", "muganza"] },
  { id: 226, name: "Soeur Charlotte Sikil", partySize: 1, searchTerms: ["soeur", "charlotte", "sikil"] },
  { id: 227, name: "Soeur Chichi Chilemb", partySize: 1, searchTerms: ["soeur", "chichi", "chilemb"] },
  { id: 228, name: "Soeur Sara Mukaya", partySize: 1, searchTerms: ["soeur", "sara", "mukaya"] },
  { id: 229, name: "Soeur Anne Mukaya", partySize: 1, searchTerms: ["soeur", "anne", "mukaya"] },
  { id: 230, name: "Soeur Aime Ndjibu", partySize: 1, searchTerms: ["soeur", "aime", "ndjibu"] },
  { id: 231, name: "Frere Marco Bope", partySize: 1, searchTerms: ["frere", "marco", "bope"] },
  { id: 232, name: "Frere Markus Bin Kahenga", partySize: 1, searchTerms: ["frere", "markus", "bin", "kahenga"] },
  { id: 233, name: "Soeur Sharon Kasongo", partySize: 1, searchTerms: ["soeur", "sharon", "kasongo"] },
  { id: 234, name: "Frere Jean Matama", partySize: 1, searchTerms: ["frere", "jean", "matama"] },
  { id: 235, name: "Soeur Anacore Bope", partySize: 1, searchTerms: ["soeur", "anacore", "bope"] },
  { id: 236, name: "Soeur Mukendi Kalonji-Ngoyi", partySize: 1, searchTerms: ["soeur", "mukendi", "kalonji", "ngoyi"] },
  { id: 237, name: "Soeur Ruth Seth", partySize: 1, searchTerms: ["soeur", "ruth", "seth"] },
  { id: 238, name: "Soeur Dorcas Nkulu", partySize: 1, searchTerms: ["soeur", "dorcas", "nkulu"] },

  // Bride's side - Couples
  { id: 300, name: "Didiye Kangudia", partySize: 2, searchTerms: ["didiye", "kangudia"] },
  { id: 301, name: "Richard Mukeninay", partySize: 2, searchTerms: ["richard", "mukeninay"] },
  { id: 302, name: "Andri Kayembe", partySize: 2, searchTerms: ["andri", "kayembe"] },
  { id: 303, name: "Andre Kadima", partySize: 2, searchTerms: ["andre", "kadima"] },
  { id: 304, name: "Carl Tubadi", partySize: 2, searchTerms: ["carl", "tubadi"] },
  { id: 305, name: "Philipe Ngoma", partySize: 2, searchTerms: ["philipe", "ngoma"] },
  { id: 306, name: "Joshua Madi", partySize: 2, searchTerms: ["joshua", "madi"] },
  { id: 307, name: "Deli Kalonji", partySize: 2, searchTerms: ["deli", "kalonji"] },
  { id: 308, name: "Jaques Kanda", partySize: 2, searchTerms: ["jaques", "kanda"] },
  { id: 309, name: "Phinees Ngoie", partySize: 2, searchTerms: ["phinees", "ngoie"] },
  { id: 310, name: "Joel Mukuna", partySize: 2, searchTerms: ["joel", "mukuna"] },
  { id: 311, name: "Adonis Ngoie", partySize: 2, searchTerms: ["adonis", "ngoie"] },
  { id: 312, name: "Seraphin Ngoie", partySize: 2, searchTerms: ["seraphin", "ngoie"] },
  { id: 313, name: "Ekaka Kangudia", partySize: 2, searchTerms: ["ekaka", "kangudia"] },
  { id: 314, name: "Bruno Kalala", partySize: 2, searchTerms: ["bruno", "kalala"] },
  { id: 315, name: "Leonard Kayembe", partySize: 2, searchTerms: ["leonard", "kayembe"] },
  { id: 316, name: "Olivier Tumba", partySize: 2, searchTerms: ["olivier", "tumba"] },
  { id: 317, name: "Tatty Mulongoy", partySize: 2, searchTerms: ["tatty", "mulongoy"] },
  { id: 318, name: "Marc Tshibwabwa", partySize: 2, searchTerms: ["marc", "tshibwabwa"] },
  { id: 319, name: "Shadrac Ilunga", partySize: 2, searchTerms: ["shadrac", "ilunga"] },
  { id: 320, name: "Danny Kabemba", partySize: 2, searchTerms: ["danny", "kabemba"] },
  { id: 321, name: "Daniel Tshibangu", partySize: 2, searchTerms: ["daniel", "tshibangu"] },
  { id: 322, name: "Christophe Cesar", partySize: 2, searchTerms: ["christophe", "cesar"] },
  { id: 323, name: "Jean Lubanza", partySize: 2, searchTerms: ["jean", "lubanza"] },
  { id: 324, name: "Patrick Kalonji", partySize: 2, searchTerms: ["patrick", "kalonji"] },
  { id: 325, name: "Olivier Odia", partySize: 2, searchTerms: ["olivier", "odia"] },
  { id: 326, name: "Donat Kahutu", partySize: 2, searchTerms: ["donat", "kahutu"] },
  { id: 327, name: "Emmanuel Kalambay", partySize: 2, searchTerms: ["emmanuel", "kalambay"] },
  { id: 328, name: "Paul Kalambay", partySize: 2, searchTerms: ["paul", "kalambay"] },
  { id: 329, name: "Ceasar Mukuna", partySize: 2, searchTerms: ["ceasar", "mukuna"] },
  { id: 330, name: "Mikyle Pillay", partySize: 2, searchTerms: ["mikyle", "pillay"] },
  { id: 331, name: "Leonard Kadima", partySize: 2, searchTerms: ["leonard", "kadima"] },
  { id: 332, name: "Jonathan Kayembe", partySize: 2, searchTerms: ["jonathan", "kayembe"] },
  { id: 333, name: "Nevil Kajingu", partySize: 2, searchTerms: ["nevil", "kajingu"] },
  { id: 334, name: "Pathy Mukie", partySize: 2, searchTerms: ["pathy", "mukie"] },
  { id: 335, name: "Henoch N'daie", partySize: 2, searchTerms: ["henoch", "ndaie"] },
  { id: 336, name: "Jean Kasemwana", partySize: 2, searchTerms: ["jean", "kasemwana"] },
  { id: 337, name: "Guelord Yombi", partySize: 2, searchTerms: ["guelord", "yombi"] },
  { id: 338, name: "Dannah Tshisul", partySize: 2, searchTerms: ["dannah", "tshisul"] },
  { id: 339, name: "Joel Bajay", partySize: 2, searchTerms: ["joel", "bajay"] },
  { id: 340, name: "Papi Senga", partySize: 2, searchTerms: ["papi", "senga"] },
  { id: 341, name: "Mukaya", partySize: 2, searchTerms: ["mukaya"] },
  { id: 342, name: "Jean Kapenga", partySize: 2, searchTerms: ["jean", "kapenga"] },
  { id: 343, name: "Israel Kibambi", partySize: 2, searchTerms: ["israel", "kibambi"] },
  { id: 344, name: "Docteur Bope", partySize: 2, searchTerms: ["docteur", "bope"] },
  { id: 345, name: "Jean Paul Tshalanga", partySize: 2, searchTerms: ["jean", "paul", "tshalanga"] },
  { id: 346, name: "Paul Ilunga", partySize: 2, searchTerms: ["paul", "ilunga"] },
  { id: 347, name: "Mukepe", partySize: 2, searchTerms: ["mukepe"] },
  { id: 348, name: "Pulayisa", partySize: 2, searchTerms: ["pulayisa"] },
  { id: 349, name: "Mwepu", partySize: 2, searchTerms: ["mwepu"] },
  { id: 350, name: "Mbuyu", partySize: 2, searchTerms: ["mbuyu"] },
  { id: 351, name: "Mukendi", partySize: 2, searchTerms: ["mukendi"] },
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
