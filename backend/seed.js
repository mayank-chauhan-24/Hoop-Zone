const Product = require('./models/Product');

const productsData = [
  {
    id: 1,
    name: "HoopZone Elite Leather Basketball",
    category: "Basketballs",
    price: 7499,
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Engineered for elite indoor performance, the HoopZone Elite features a premium full-grain composite leather cover that provides unmatched grip, consistency, and durability. Resilient cushion core carcass offers soft feel and deep channels for precise finger alignment during shots.",
    features: [
      "Official Size (29.5\") & Weight",
      "Premium composite leather cover for indoor play",
      "Deep pebbled channels for ultimate control",
      "Cushion Core technology for soft, responsive feel",
      "Excellent shape retention and air sealing"
    ],
    isBestSeller: true,
    isTopPick: true,
    inStock: true,
    reviews: [
      { user: "Marcus K.", rating: 5, comment: "Best indoor basketball I've ever played with. The grip is incredible!", date: "2026-05-12" },
      { user: "Sarah L.", rating: 5, comment: "Maintains shape perfectly. Feels premium and soft in the hand.", date: "2026-06-01" },
      { user: "Coach David", rating: 4, comment: "Excellent training ball for our high school varsity team. Recommended.", date: "2026-06-18" }
    ]
  },
  {
    id: 2,
    name: "HoopZone Streetball Blackout",
    category: "Basketballs",
    price: 3499,
    rating: 4.7,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Built to dominate outdoor concrete courts. The Streetball Blackout combines rugged outdoor cover durability with a stylish stealth aesthetic. The deep channel pattern handles dust and dirt without losing traction, making it the perfect ball for pick-up games.",
    features: [
      "Ultra-durable rubber/composite outer shell",
      "Optimized for asphalt, concrete, and rough courts",
      "Exclusive matte black and orange street art design",
      "Deep channels for enhanced hand placement",
      "Butyl bladder locks in air pressure"
    ],
    isBestSeller: false,
    isTopPick: false,
    inStock: true,
    reviews: [
      { user: "Devon J.", rating: 5, comment: "Handles the rough concrete perfectly. And it looks super cool!", date: "2026-04-20" },
      { user: "Tyler R.", rating: 4, comment: "A bit stiff at first, but breaks in very nicely after a couple of games.", date: "2026-05-15" }
    ]
  },
  {
    id: 3,
    name: "Apex Flight '26 Basketball Shoes",
    category: "Shoes",
    price: 12999,
    rating: 4.8,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Designed for explosive players who live above the rim. The Apex Flight features a responsive nitrogen-infused foam midsole for maximum energy return and impact protection. A breathable woven mesh upper is reinforced with lateral TPU overlays for stability during hard cuts.",
    features: [
      "Nitrogen-infused responsive cushioning system",
      "Multi-directional herringbone outsole pattern for elite traction",
      "Lockdown lacing system with midfoot TPU stabilizer",
      "Breathable engineered knit upper",
      "Padded ankle collar for superior comfort and support"
    ],
    isBestSeller: true,
    isTopPick: true,
    inStock: true,
    reviews: [
      { user: "Chris P.", rating: 5, comment: "The traction is absolute glue on indoor courts. Lockdown is outstanding.", date: "2026-06-03" },
      { user: "Maya W.", rating: 5, comment: "Incredibly light, yet supports my ankles on quick cuts. Love the orange/red colorway!", date: "2026-06-11" },
      { user: "Jaden B.", rating: 4, comment: "Cushioning is amazing, though the fit is slightly narrow. Go half size up.", date: "2026-06-20" }
    ]
  },
  {
    id: 4,
    name: "Gravity Defier Low-Tops",
    category: "Shoes",
    price: 9999,
    rating: 4.6,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Built for guards who value speed, flexibility, and court feel. The Gravity Defier Low-Tops place your foot closer to the ground, maximizing responsiveness. A dynamic fit bootie wraps the ankle, while the lightweight composite midsole absorbs landings without weighing you down.",
    features: [
      "Low-profile responsive ride",
      "Lightweight mesh paneling with high-durability synthetic skin",
      "Flex-grooved traction plate adapts to fast stops",
      "Internal dynamic fit sleeve",
      "Heel pull-tab for easy entry"
    ],
    isBestSeller: false,
    isTopPick: false,
    inStock: true,
    reviews: [
      { user: "SpeedyG", rating: 5, comment: "Lightest shoes I own. Perfect for quick crossovers and speed guards.", date: "2026-05-18" },
      { user: "Brandon S.", rating: 4, comment: "Great court feel, but less cushion for center/power forwards.", date: "2026-05-30" }
    ]
  },
  {
    id: 5,
    name: "HoopZone East Coast Heritage Jersey",
    category: "Jerseys",
    price: 2499,
    rating: 4.5,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515523110800-9415de82373b?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Pay homage to the golden era of playground basketball. The Heritage Jersey combines retro ribbed trims and modern double-knit mesh, ensuring you stay dry and comfortable while showing off classic styling. Featuring stitched numbers and an athletic cut.",
    features: [
      "Dri-Fit moisture-wicking technology",
      "Breathable double-knit mesh fabric",
      "Classic ribbing on neck and armholes",
      "Premium tackle twill stitched lettering and numbers",
      "Split hem for natural range of motion"
    ],
    isBestSeller: false,
    isTopPick: true,
    inStock: true,
    reviews: [
      { user: "Derrick E.", rating: 5, comment: "Love the retro style. The stitching is high-end quality.", date: "2026-04-14" },
      { user: "Leo N.", rating: 4, comment: "Fits perfectly. Feels great during outdoor matches.", date: "2026-05-02" }
    ]
  },
  {
    id: 6,
    name: "Championship Elite Mesh Jersey",
    category: "Jerseys",
    price: 1999,
    rating: 4.4,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1515523110800-9415de82373b?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1515523110800-9415de82373b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=600&auto=format&fit=crop&q=80"
    ],
    description: "The official practice and scrimmaging jersey of elite academies. The Championship Elite is super lightweight and fully reversible, with high-ventilation mesh that keeps you cool during high-intensity training drills and summer league games.",
    features: [
      "Reversible double-layer mesh design (Black & Orange)",
      "Vented side panels for extra breathability",
      "Resistant to odor and shrinking",
      "Relaxed fit wraps comfortably over protective gear",
      "Heat-pressed logos that don't crack"
    ],
    isBestSeller: false,
    isTopPick: false,
    inStock: true,
    reviews: [
      { user: "Coach Al", rating: 5, comment: "Ordered these for our camp. Fantastic durability and love the reversible aspect.", date: "2026-06-08" },
      { user: "Sam H.", rating: 4, comment: "Lightweight and doesn't cling when sweating.", date: "2026-06-15" }
    ]
  },
  {
    id: 7,
    name: "Heavy Duty Agility Ladder Set",
    category: "Training Equipment",
    price: 1299,
    rating: 4.8,
    reviewsCount: 175,
    image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Improve foot speed, lateral agility, and coordination. This professional-grade agility ladder features heavy-duty plastic flat rungs that won't slide easily and a quick-unravel nylon strap design. Set includes metal ground anchors and a carrying bag.",
    features: [
      "15-foot length with adjustable flat rungs",
      "Includes 4 ground stakes for grass and outdoor use",
      "Heavy-duty carrying bag included",
      "Bright orange rungs for high visibility",
      "Fosters critical quick-cut footwork"
    ],
    isBestSeller: true,
    isTopPick: false,
    inStock: true,
    reviews: [
      { user: "FitnessGuy", rating: 5, comment: "Essential for basketball conditioning. Durable construction.", date: "2026-03-12" },
      { user: "Alicia P.", rating: 4, comment: "The adjustable rungs are great for customizing drills. Carrying bag is very convenient.", date: "2026-04-18" }
    ]
  },
  {
    id: 8,
    name: "Dribble-Pro Weighted Gloves",
    category: "Training Equipment",
    price: 1799,
    rating: 4.7,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Strengthen fingers, hands, wrists, and forearms to create a lightning-fast crossover. The Dribble-Pro Weighted Gloves distribute weight evenly across the back of your hand, leaving your palms open for natural ball feel during drills.",
    features: [
      "1 lb of weight per glove distributed across the back",
      "Breathable, flexible neoprene material",
      "Adjustable hook-and-loop wrist wraps for secure fit",
      "Exposed palms and fingers for true dribble feedback",
      "Double stitching in high-wear zones"
    ],
    isBestSeller: false,
    isTopPick: true,
    inStock: true,
    reviews: [
      { user: "Kevin T.", rating: 5, comment: "Instantly saw improvements in my handle speed after a week of training with these.", date: "2026-05-25" },
      { user: "Coach Lopez", rating: 4, comment: "Great training tool, but make sure to get the right size to prevent sliding.", date: "2026-06-05" }
    ]
  },
  {
    id: 9,
    name: "Pro-Rim Heavy Duty Net",
    category: "Court Accessories",
    price: 799,
    rating: 4.6,
    reviewsCount: 125,
    image: "https://images.unsplash.com/photo-1505666287802-931dc83948e9?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1505666287802-931dc83948e9?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Get that satisfying professional 'swish' sound. Made from heavy-duty braided nylon, the Pro-Rim Replacement Net is weather-proof and designed to prevent whip or tangles after hard shots, making it ideal for indoor or outdoor courts.",
    features: [
      "Fits standard 18-inch rims",
      "12 loop construction with anti-whip technology",
      "All-weather heavy-duty nylon fibers",
      "Durable stitching resists rotting and fraying",
      "Easy installation setup"
    ],
    isBestSeller: false,
    isTopPick: false,
    inStock: true,
    reviews: [
      { user: "Baller22", rating: 5, comment: "Very heavy duty, doesn't get caught on the rim. Perfect swish sound!", date: "2026-04-11" },
      { user: "Matt S.", rating: 4, comment: "Simple to install. Has lasted through two severe storms already with no wear.", date: "2026-05-19" }
    ]
  },
  {
    id: 10,
    name: "Portable Basketball Shot Trainer",
    category: "Court Accessories",
    price: 9499,
    rating: 4.5,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505666287802-931dc83948e9?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Perfect your shooting arc and visual target alignment. The Portable Shot Trainer mounts securely to any hoop backboard or rim, highlighting the optimal entry point. Instantly corrects flat shots and pushes players to use consistent high releases.",
    features: [
      "Universal mounting kit fits most standard hoops",
      "Bright neon orange aiming guide for targeting focus",
      "Constructed from resilient impact-resistant polymer",
      "Folds flat for transport and storage in gym bags",
      "Helps improve free-throw and three-point percentages"
    ],
    isBestSeller: false,
    isTopPick: false,
    inStock: false,
    reviews: [
      { user: "Eric D.", rating: 5, comment: "My shooting form has improved drastically. Great feedback tool.", date: "2026-05-04" },
      { user: "Coach M.", rating: 4, comment: "A bit tricky to attach to some older double rims, but works perfectly on standard single rims.", date: "2026-05-28" }
    ]
  },
  {
    id: 11,
    name: "Ultra-Flex Compression Knee Sleeves",
    category: "Protective Gear",
    price: 1199,
    rating: 4.9,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Relieve pressure and prevent strain during heavy jumping and sprinting. The Ultra-Flex Compression Knee Sleeves use a seamless anatomical fit to supply targeted compression to the patella and joint muscles. Non-slip silicone lining ensures they stay in place.",
    features: [
      "Grade compression fabric boosts blood circulation",
      "Anti-slip silicone waves prevent folding and sliding",
      "Lightweight, breathable 3D knit keeps joints warm",
      "Absorbs shock on landing and supports patella",
      "Sold as a pair"
    ],
    isBestSeller: true,
    isTopPick: false,
    inStock: true,
    reviews: [
      { user: "Andre G.", rating: 5, comment: "I play 3 times a week and my knees don't ache anymore. Lifetime customer here.", date: "2026-06-02" },
      { user: "Sophia F.", rating: 5, comment: "They don't slide down at all, even during full court runs. Exceptional support.", date: "2026-06-14" }
    ]
  },
  {
    id: 12,
    name: "HoopZone Pro Padded Ankle Brace",
    category: "Protective Gear",
    price: 1499,
    rating: 4.8,
    reviewsCount: 145,
    image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Maximum stability to guard against rolled ankles and sprains. Featuring rigid side stays and custom figure-8 strap bindings, this low-profile ankle brace simulates athletic taping while allowing complete flexibility for vertical leaps.",
    features: [
      "Reinforced steel springs for lateral brace support",
      "Adjustable figure-8 straps lock ankle joint",
      "Fits easily into low-top or high-top basketball shoes",
      "Breathable tongue and lining prevents sweat buildup",
      "Ambidextrous design (fits left or right foot)"
    ],
    isBestSeller: false,
    isTopPick: true,
    inStock: true,
    reviews: [
      { user: "BigJake", rating: 5, comment: "Highly recommend for anyone coming off a sprained ankle. Solid structure.", date: "2026-05-11" },
      { user: "Emily C.", rating: 4, comment: "Takes a few minutes to lace up, but once on, it provides bulletproof support.", date: "2026-05-27" }
    ]
  }
];

async function seedDatabase() {
  const count = await Product.countDocuments();
  if (count === 0) {
    console.log("Seeding initial products data...");
    await Product.insertMany(productsData);
    console.log("Database seeded successfully with initial products!");
  } else {
    console.log("Database already seeded.");
  }
}

module.exports = seedDatabase;
