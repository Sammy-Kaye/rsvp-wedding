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
  { id: 100, name: "Couple Tharcisse Yambayamba", partySize: 2, searchTerms: ["couple", "tharcisse", "yambayamba"] },
  { id: 101, name: "Couple Nicolas Tshilumba", partySize: 2, searchTerms: ["couple", "nicolas", "tshilumba"] },
  { id: 102, name: "Couple Danny Mulamba", partySize: 2, searchTerms: ["couple", "danny", "mulamba"] },
  { id: 103, name: "Couple Polly Mangi", partySize: 2, searchTerms: ["couple", "polly", "mangi"] },
  { id: 104, name: "Couple Nico Kalongo", partySize: 2, searchTerms: ["couple", "nico", "kalongo"] },
  { id: 105, name: "Couple Joshua Lokamba", partySize: 2, searchTerms: ["couple", "joshua", "lokamba"] },
  { id: 106, name: "Couple Guy Kubelua", partySize: 2, searchTerms: ["couple", "guy", "kubelua"] },
  { id: 107, name: "Couple Chance Murula", partySize: 2, searchTerms: ["couple", "chance", "murula"] },
  { id: 108, name: "Couple Christophe Kalenga", partySize: 2, searchTerms: ["couple", "christophe", "kalenga"] },
  { id: 109, name: "Couple Emmanuel Mbiye", partySize: 2, searchTerms: ["couple", "emmanuel", "mbiye"] },
  { id: 110, name: "Couple Faustin Lugoma", partySize: 2, searchTerms: ["couple", "faustin", "lugoma"] },
  { id: 111, name: "Couple Jean-luc Kadima", partySize: 2, searchTerms: ["couple", "jean-luc", "kadima"] },
  { id: 112, name: "Couple Mbayo Muyembe", partySize: 2, searchTerms: ["couple", "mbayo", "muyembe"] },
  { id: 113, name: "Couple Jermain Mbuyu", partySize: 2, searchTerms: ["couple", "jermain", "mbuyu"] },
  { id: 114, name: "Couple Serge Kalenga", partySize: 2, searchTerms: ["couple", "serge", "kalenga"] },
  { id: 115, name: "Couple Tharcisse Ntunka", partySize: 2, searchTerms: ["couple", "tharcisse", "ntunka"] },
  { id: 116, name: "Couple Joshua Haripersadh", partySize: 2, searchTerms: ["couple", "joshua", "haripersadh"] },
  { id: 117, name: "Couple Laurent Mbiya", partySize: 2, searchTerms: ["couple", "laurent", "mbiya"] },
  { id: 118, name: "Couple Francis Kayamba", partySize: 2, searchTerms: ["couple", "francis", "kayamba"] },

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
  { id: 300, name: "Couple Didiye Kangudia", partySize: 2, searchTerms: ["couple", "didiye", "kangudia"] },
  { id: 301, name: "Couple Richard Mukeninay", partySize: 2, searchTerms: ["couple", "richard", "mukeninay"] },
  { id: 302, name: "Couple Andri Kayembe", partySize: 2, searchTerms: ["couple", "andri", "kayembe"] },
  { id: 303, name: "Couple Andre Kadima", partySize: 2, searchTerms: ["couple", "andre", "kadima"] },
  { id: 304, name: "Couple Carl Tubadi", partySize: 2, searchTerms: ["couple", "carl", "tubadi"] },
  { id: 305, name: "Couple Philipe Ngoma", partySize: 2, searchTerms: ["couple", "philipe", "ngoma"] },
  { id: 306, name: "Couple Joshua Madi", partySize: 2, searchTerms: ["couple", "joshua", "madi"] },
  { id: 307, name: "Couple Deli Kalonji", partySize: 2, searchTerms: ["couple", "deli", "kalonji"] },
  { id: 308, name: "Couple Jaques Kanda", partySize: 2, searchTerms: ["couple", "jaques", "kanda"] },
  { id: 309, name: "Couple Phinees Ngoie", partySize: 2, searchTerms: ["couple", "phinees", "ngoie"] },
  { id: 310, name: "Couple Joel Mukuna", partySize: 2, searchTerms: ["couple", "joel", "mukuna"] },
  { id: 311, name: "Couple Adonis Ngoie", partySize: 2, searchTerms: ["couple", "adonis", "ngoie"] },
  { id: 312, name: "Couple Seraphin Ngoie", partySize: 2, searchTerms: ["couple", "seraphin", "ngoie"] },
  { id: 313, name: "Couple Ekaka Kangudia", partySize: 2, searchTerms: ["couple", "ekaka", "kangudia"] },
  { id: 314, name: "Couple Bruno Kalala", partySize: 2, searchTerms: ["couple", "bruno", "kalala"] },
  { id: 315, name: "Couple Leonard Kayembe", partySize: 2, searchTerms: ["couple", "leonard", "kayembe"] },
  { id: 316, name: "Couple Olivier Tumba", partySize: 2, searchTerms: ["couple", "olivier", "tumba"] },
  { id: 317, name: "Couple Tatty Mulongoy", partySize: 2, searchTerms: ["couple", "tatty", "mulongoy"] },
  { id: 318, name: "Couple Marc Tshibwabwa", partySize: 2, searchTerms: ["couple", "marc", "tshibwabwa"] },
  { id: 319, name: "Couple Shadrac Ilunga", partySize: 2, searchTerms: ["couple", "shadrac", "ilunga"] },
  { id: 320, name: "Couple Danny Kabemba", partySize: 2, searchTerms: ["couple", "danny", "kabemba"] },
  { id: 321, name: "Couple Daniel Tshibangu", partySize: 2, searchTerms: ["couple", "daniel", "tshibangu"] },
  { id: 322, name: "Couple Christophe Cesar", partySize: 2, searchTerms: ["couple", "christophe", "cesar"] },
  { id: 323, name: "Couple Jean Lubanza", partySize: 2, searchTerms: ["couple", "jean", "lubanza"] },
  { id: 324, name: "Couple Patrick Kalonji", partySize: 2, searchTerms: ["couple", "patrick", "kalonji"] },
  { id: 325, name: "Couple Olivier Odia", partySize: 2, searchTerms: ["couple", "olivier", "odia"] },
  { id: 326, name: "Couple Donat Kahutu", partySize: 2, searchTerms: ["couple", "donat", "kahutu"] },
  { id: 327, name: "Couple Emmanuel Kalambay", partySize: 2, searchTerms: ["couple", "emmanuel", "kalambay"] },
  { id: 328, name: "Couple Paul Kalambay", partySize: 2, searchTerms: ["couple", "paul", "kalambay"] },
  { id: 329, name: "Couple Ceasar Mukuna", partySize: 2, searchTerms: ["couple", "ceasar", "mukuna"] },
  { id: 330, name: "Couple Mikyle Pillay", partySize: 2, searchTerms: ["couple", "mikyle", "pillay"] },
  { id: 331, name: "Couple Leonard Kadima", partySize: 2, searchTerms: ["couple", "leonard", "kadima"] },
  { id: 332, name: "Couple Jonathan Kayembe", partySize: 2, searchTerms: ["couple", "jonathan", "kayembe"] },
  { id: 333, name: "Couple Nevil Kajingu", partySize: 2, searchTerms: ["couple", "nevil", "kajingu"] },
  { id: 334, name: "Couple Pathy Mukie", partySize: 2, searchTerms: ["couple", "pathy", "mukie"] },
  { id: 335, name: "Couple Henoch N'daie", partySize: 2, searchTerms: ["couple", "henoch", "n'daie"] },
  { id: 336, name: "Couple Jean Kasemwana", partySize: 2, searchTerms: ["couple", "jean", "kasemwana"] },
  { id: 337, name: "Couple Guelord Yombi", partySize: 2, searchTerms: ["couple", "guelord", "yombi"] },
  { id: 338, name: "Couple Dannah Tshisul", partySize: 2, searchTerms: ["couple", "dannah", "tshisul"] },
  { id: 339, name: "Couple Joel Bajay", partySize: 2, searchTerms: ["couple", "joel", "bajay"] },
  { id: 340, name: "Couple Papi Senga", partySize: 2, searchTerms: ["couple", "papi", "senga"] },
  { id: 341, name: "Couple Mukaya", partySize: 2, searchTerms: ["couple", "mukaya"] },
  { id: 342, name: "Couple Jean Kapenga", partySize: 2, searchTerms: ["couple", "jean", "kapenga"] },
  { id: 343, name: "Couple Israel Kibambi", partySize: 2, searchTerms: ["couple", "israel", "kibambi"] },
  { id: 344, name: "Couple Docteur Bope", partySize: 2, searchTerms: ["couple", "docteur", "bope"] },
  { id: 345, name: "Couple Jean Paul Tshalanga", partySize: 2, searchTerms: ["couple", "jean", "paul", "tshalanga"] },
  { id: 346, name: "Couple Paul Ilunga", partySize: 2, searchTerms: ["couple", "paul", "ilunga"] },
  { id: 347, name: "Couple Mukepe", partySize: 2, searchTerms: ["couple", "mukepe"] },
  { id: 348, name: "Couple Pulayisa", partySize: 2, searchTerms: ["couple", "pulayisa"] },
  { id: 349, name: "Couple Mwepu", partySize: 2, searchTerms: ["couple", "mwepu"] },
  { id: 350, name: "Couple Mbuyu", partySize: 2, searchTerms: ["couple", "mbuyu"] },
  { id: 351, name: "Couple Mukendi", partySize: 2, searchTerms: ["couple", "mukendi"] },
];

async function clearGuests() {
  try {
    const snapshot = await db.collection('guests').get();
    if (!snapshot.empty) {
      let batch = db.batch();
      let count = 0;
      snapshot.forEach(doc => {
        batch.delete(doc.ref);
        count++;
        if (count % 500 === 0) {
          batch.commit();
          batch = db.batch();
        }
      });
      if (count % 500 !== 0) {
        await batch.commit();
      }
      console.log(`Cleared ${count} existing guests.`);
    }
  } catch (error) {
    console.error('Error clearing guests:', error);
    throw error;
  }
}

async function seedGuests() {
  try {
    console.log('Clearing existing guest list...');
    await clearGuests();

    const guestsCollection = db.collection('guests');
    let batch = db.batch();
    let count = 0;

    for (const guest of GUEST_LIST) {
      const docRef = guestsCollection.doc(); // Automatically generate a new ID
          const { id, ...guestData } = guest;
          batch.set(docRef, {
            ...guestData,
            rsvp: 'pending',
            code: generateUniqueCode(),
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });      count++;
      if (count % 500 === 0) {
        await batch.commit();
        batch = db.batch();
      }
    }

    if (count % 500 !== 0) {
      await batch.commit();
    }

    console.log(`Seeded ${count} guests.`);
  } catch (error) {
    console.error('Error seeding guests:', error);
    throw error;
  }
}

function generateUniqueCode() {
    const prefix = 'WED';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const timestamp = Date.now().toString().slice(-4);
    return `${prefix}${randomNum}${timestamp}`;
}
