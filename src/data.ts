import { MenuItem, Review, EventItem } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  // BREWS
  {
    id: "brew_1",
    name: "Himalayan Honey Cappuccino",
    hindiName: "हिमालयन हनी कैपुचीनो",
    description: "Our signature espresso infused with pure wild forest honey collected from the high meadows of Chamba, capped with thick, velvety foam.",
    price: 210,
    category: "brews",
    tags: ["signature", "hot", "must_try"],
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "brew_2",
    name: "Flat White Garden Special",
    hindiName: "फ्लैट वाइट स्पेशल",
    description: "Double ristretto over steamed whole milk, displaying complex caramel notes with an exceptionally smooth latte-art finish.",
    price: 190,
    category: "brews",
    tags: ["signature", "hot"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzvfp05eanlyJG0r9OFCzYveG9XSoZlO5N4xUMEUxNOg-kbiEConJzhe_lBjSgk_w4Tza7gz5-9dc39n4qs9rF6__cVL_bJQBBhuz0H3lEqNEyIgAMfILyABCvLASpqWK5zOF3eatONpxjHIbedwzN6vP5cauVECgc1WezzdT9tDTqUZ56D65QXmpLoEiVj7VSd2xiqxcOcQWhApgI67m7ofzxCalGcGAoqXuRXMX72CXrghGAA9oR8tfg0a0lsM_uZY1tzHEWUIcK"
  },
  {
    id: "brew_3",
    name: "Rhododendron Herbal Infusion",
    hindiName: "बुरांश हर्बल चाय",
    description: "Handpicked local 'Buransh' red petals brewed gently with fresh mint and hill cardamom. Antioxidant-rich and naturally decaf.",
    price: 160,
    category: "brews",
    tags: ["vegan", "gluten_free", "hot"],
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "brew_4",
    name: "Bageecha Iced Shakerato",
    hindiName: "बगीचा आइस्ड शेकेरेटो",
    description: "Slightly sweetened double shot aerated with spring ice cubes and fresh orange zest spray for a refreshing citrus lift.",
    price: 180,
    category: "brews",
    tags: ["cold", "vegan"],
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600"
  },

  // BITES
  {
    id: "bite_1",
    name: "Wood-Fired Pahadi Paneer Pizza",
    hindiName: "पहाड़ी पनीर पिज़्ज़ा",
    description: "Fresh country style paneer marinated in local herbs, charred garlic, bell peppers on thin hand-stretched sourdough crust.",
    price: 380,
    category: "bites",
    tags: ["signature", "must_try"],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "bite_2",
    name: "Wild Mushroom & Truffle Oil Pasta",
    hindiName: "जंगली मशरूम पास्ता",
    description: "Chamba pine forest mushrooms sautéed in a rich cream sauce, tossed in artisanal fettuccine, highlighted with local wild basil.",
    price: 340,
    category: "bites",
    tags: ["signature"],
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "bite_3",
    name: "Himachali Herbs Bruschetta",
    hindiName: "हर्ब ब्रुशेटा",
    description: "Grilled garlic sourdough slices piled with tomatoes, hand-crushed local herbs, and fresh olive-infused Himalayan cheese.",
    price: 220,
    category: "bites",
    tags: ["vegan"],
    image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&q=80&w=600"
  },

  // SWEETS
  {
    id: "sweet_1",
    name: "Signature Berry Forest Cheesecake",
    hindiName: "बेरी फॉरेस्ट चीज़केक",
    description: "Light cream cheese on butter graham crust topped with wild blackberry and raspberry compote. The pride of Cafe Bageecha.",
    price: 260,
    category: "sweets",
    tags: ["signature", "must_try"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk_GCMY17Caqxwz8chZ3FWeotM6GZVqT1THZrJ5-T5jN7poUYKthPXKG71Pj1vi7GEayguWJ8Qsbk6fUdJSlaI6_GpNevn34h_GPwoycPV4YgXSndhY40Th-_swG8LaqV3z4u4R0sp9RxAlgX8wZO2SpDjcqSFLSaKF_B7K7UxWglD_DoWSL-bslhAQe8j5QUYy8dKfEgH7V6DBFBSMfi8YnsE7Amt4NepMloUYoO3wor46SZqviryZTnSVTmP33z89CEfH5KZDDFZ"
  },
  {
    id: "sweet_2",
    name: "Apple Crumble Tart with Vanilla Bean",
    hindiName: "एप्पल क्रम्बल टार्ट",
    description: "Slow-baked local Himachali apples spiced with cinnamon and ginger, topped with crispy oat cobbler and premium Madagascar vanilla cream.",
    price: 240,
    category: "sweets",
    tags: ["signature"],
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "sweet_3",
    name: "Himalayan Walnut Brownie Fudge",
    hindiName: "अखरोट ब्राउनी फज",
    description: "Warm, fudgy dark chocolate cake packed with native Himalayan walnut chunks, served sizzling with salted caramel drip.",
    price: 230,
    category: "sweets",
    tags: ["gluten_free"],
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600"
  },

  // MOUNTAIN SPECIALS
  {
    id: "mtn_1",
    name: "Traditional Siddu with Pure Desi Ghee",
    hindiName: "पारंपरिक सिड्डू और घी",
    description: "The crown jewel of Himachal! Steamed soft wheat bun stuffed with delicious poppy seeds, walnuts and local spices, drizzled with warm homechurned cow ghee.",
    price: 180,
    category: "mountain_specials",
    tags: ["signature", "must_try"],
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "mtn_2",
    name: "Pahadi Rajma & Red Rice Platter",
    hindiName: "पहाड़ी राजमा चावल थाली",
    description: "Creamy, slowly simmered red beans, heavily spiced with wild spices, served over mountain red organic rice with organic local radish pickle.",
    price: 250,
    category: "mountain_specials",
    tags: ["vegan", "gluten_free"],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "mtn_3",
    name: "Buransh (Rhododendron) Ginger Lemon Cooler",
    hindiName: "बुरांश अदरक लेमन कूलर",
    description: "Refreshing ice cold carbonated beverage made with pure mountain Rhododendron squash, spiced ginger extract and fresh squeeze of lemon.",
    price: 150,
    category: "mountain_specials",
    tags: ["cold", "vegan", "gluten_free"],
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600"
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev_1",
    stars: 5,
    name: "Anjali Sharma",
    text: "Chamba ka sabse peaceful cafe experience. The views are breathtaking, and their Himalayan honey cappuccino is absolute heaven! Staff was incredibly warm and helpful.",
    date: "2026-06-02",
    verified: true,
    avatarColor: "bg-forest",
    origin: "Shimla, HP"
  },
  {
    id: "rev_2",
    stars: 5,
    name: "Rohit Verma",
    text: "Coffee, food aur garden atmosphere sab perfect. Must visit when in Chamba. The woodfired pizza takes some time but it is totally worth it. The fresh pine smells are wonderful.",
    date: "2026-06-12",
    verified: true,
    avatarColor: "bg-gold",
    origin: "Delhi"
  },
  {
    id: "rev_3",
    stars: 4,
    name: "Neha Bansal",
    text: "Family outing ke liye best place. Kids loved the open grassy spaces to wander safely! Their Berry Forest Cheesecake remains my absolute favorite pastry on this trek.",
    date: "2026-06-14",
    verified: true,
    avatarColor: "bg-emerald-800",
    origin: "Chandigarh"
  },
  {
    id: "rev_4",
    stars: 5,
    name: "Lieke van de Berg",
    text: "A truly magical spot! Stumbled inside while trekking up the valley. Sitting among blooming garden arches with real espresso in hand is something I never expected in such remote mountains. 10 stars!",
    date: "2026-05-28",
    verified: true,
    avatarColor: "bg-sky-800",
    origin: "Amsterdam, NL"
  }
];

export const EVENTS: EventItem[] = [
  {
    id: "evt_1",
    title: "Himalayan Folk & Acoustic Night",
    description: "Unplugged evening showcasing traditional Himachali flutes accompanied by soft acoustic guitar and local mountain stories shared alongside bonfire.",
    date: "2026-06-20",
    time: "06:30 PM - 09:30 PM",
    price: 350,
    seatsTotal: 40,
    seatsLeft: 12,
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "evt_2",
    title: "Coffee Brewing & Latte Art Mastery",
    description: "Hands-on masterclass led by our Head Barista. Demystify the pour-over technique, water temperature science, and pour your own gorgeous leaf latte art.",
    date: "2026-06-27",
    time: "10:30 AM - 01:00 PM",
    price: 800,
    seatsTotal: 15,
    seatsLeft: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzvfp05eanlyJG0r9OFCzYveG9XSoZlO5N4xUMEUxNOg-kbiEConJzhe_lBjSgk_w4Tza7gz5-9dc39n4qs9rF6__cVL_bJQBBhuz0H3lEqNEyIgAMfILyABCvLASpqWK5zOF3eatONpxjHIbedwzN6vP5cauVECgc1WezzdT9tDTqUZ56D65QXmpLoEiVj7VSd2xiqxcOcQWhApgI67m7ofzxCalGcGAoqXuRXMX72CXrghGAA9oR8tfg0a0lsM_uZY1tzHEWUIcK"
  },
  {
    id: "evt_3",
    title: "Chamba Miniature Painting Live Art",
    description: "Admire national-award winning craftsmen drawing the majestic Pahari miniature paintings right on the lawn. Includes premium Rhododendron rose coolers.",
    date: "2026-07-05",
    time: "02:00 PM - 05:00 PM",
    price: 0,
    seatsTotal: 25,
    seatsLeft: 9,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=600"
  }
];

export const GALLERY_PHOTOS = [
  {
    id: "photo_1",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJjy7n9DJx66A64l3sLB3KM0PTPyXWKlknnDXoEVCx-5ausrfsKlUR9mkf-1BVJNVdFsievcdaNeZIOJvXwqGC43TuQDay9pvQBksNpZ9D4OPNsSA92Sh4h4KxfsasOz8PlgIP_KXTIwkfha0NsSUjzUvUJ9wEg4UW-kuNB8OXlEuz_WcdxgAE5k9h61iBt-PEp7PHtey8kjvbO5g7J_U1CVmwvQKlhHJXofwRMNXRInQYUSlGE973BvuASKEPRCx4UDlD8RNfNYK6",
    title: "View of the beautiful wooden dining spaces overlooking Chamba valley",
    tag: "ambience"
  },
  {
    id: "photo_2",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7LuOFCG5vbvJIEMIpGeeRsywKa78bYxmwfp_gJzPuNfdbObKWZ1PIYvTOxqY7hIj4kyB3Y1BeQ8YTEPyFLM6yBz3VupEAOTw1GMucsDCipcmgr_uTOcsapUm6RADsieLWBYqvImOoIEC-jYjz0JQO4bOeireg9KdI6CFgsVwkUaRBuKjL8AJFUabKo054AjWl_tacqzu1Si6GaGuftw_gjvum3sMsNpMY3QzPxMlzzoKoXz32ufx__iAm_ztbbDjaYk2QXmmAVm7k",
    title: "Lush green archways leading to the garden sanctuary seating",
    tag: "garden"
  },
  {
    id: "photo_3",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzvfp05eanlyJG0r9OFCzYveG9XSoZlO5N4xUMEUxNOg-kbiEConJzhe_lBjSgk_w4Tza7gz5-9dc39n4qs9rF6__cVL_bJQBBhuz0H3lEqNEyIgAMfILyABCvLASpqWK5zOF3eatONpxjHIbedwzN6vP5cauVECgc1WezzdT9tDTqUZ56D65QXmpLoEiVj7VSd2xiqxcOcQWhApgI67m7ofzxCalGcGAoqXuRXMX72CXrghGAA9oR8tfg0a0lsM_uZY1tzHEWUIcK",
    title: "Fresh cappuccino served hot in handmade local stoneware ceramic",
    tag: "food"
  },
  {
    id: "photo_4",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk_GCMY17Caqxwz8chZ3FWeotM6GZVqT1THZrJ5-T5jN7poUYKthPXKG71Pj1vi7GEayguWJ8Qsbk6fUdJSlaI6_GpNevn34h_GPwoycPV4YgXSndhY40Th-_swG8LaqV3z4u4R0sp9RxAlgX8wZO2SpDjcqSFLSaKF_B7K7UxWglD_DoWSL-bslhAQe8j5QUYy8dKfEgH7V6DBFBSMfi8YnsE7Amt4NepMloUYoO3wor46SZqviryZTnSVTmP33z89CEfH5KZDDFZ",
    title: "A slice of signature Dark Berry Mountain Cheesecake with raspberries",
    tag: "food"
  },
  {
    id: "photo_5",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCc4s9e8joYGhv2pmOIAbXuUU4VsNR0iHR2forFfk2GV5IyU31LI5YsLAsyC5J2h7i-USrktBMqK5PgIf5InLvRQ3GRx_H09S-hKtVA2tXSEtYspieCCnzRo2a4RAvmBJcb8juOw5avQxcWbiCAQOzE8N9SbECle-uoFTGTa0rO-1_irf9p1DRJVbq5YcdccvvWyRpQPTT_IVtYH2EbxKA-wsA2eZDv9EsrfZtRcOVW4IVT9YQShnQSdyuvCfHjir43ktiDtni-_PQN",
    title: "Fresh brewed pour-over coffee set next to wild tea leaves",
    tag: "food"
  },
  {
    id: "photo_6",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600",
    title: "Ambient custom timber structure of our cozy glasshouse during twilight",
    tag: "ambience"
  }
];
