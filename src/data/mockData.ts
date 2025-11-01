// Mock data for Shanhaijing Bestiary

export interface Mountain {
  id: string;
  name: string;
  nameZh: string;
  x: number; // Position on map (0-100)
  y: number; // Position on map (0-100)
  waters: string[]; // IDs of connected waters
}

export interface Water {
  id: string;
  name: string;
  nameZh: string;
  type: "river" | "lake" | "sea";
  mountainId: string;
  fish: string[]; // IDs of fish found here
}

export interface FishImage {
  period: "ancient" | "modern1" | "modern2" | "modern3";
  label: string;
  styleAnalysis: string;
}

export interface Fish {
  id: string;
  name: string;
  nameZh: string;
  sourceBook: string;
  sourceChapter: string;
  territory: string;
  originalText: string;
  description: string;
  waterId: string;
  images: FishImage[];
}

export const mountains: Mountain[] = [
  {
    id: "jiuwei",
    name: "Jiuwei Mountain",
    nameZh: "九尾山",
    x: 35,
    y: 40,
    waters: ["jiuwei-river"],
  },
  {
    id: "qingqiu",
    name: "Qingqiu Mountain",
    nameZh: "青丘山",
    x: 60,
    y: 30,
    waters: ["qingqiu-lake"],
  },
  {
    id: "kunlun",
    name: "Kunlun Mountain",
    nameZh: "昆仑山",
    x: 25,
    y: 60,
    waters: ["kunlun-river", "jade-lake"],
  },
  {
    id: "zhongshan",
    name: "Zhongshan",
    nameZh: "钟山",
    x: 70,
    y: 55,
    waters: ["zhong-river"],
  },
  {
    id: "tianshan",
    name: "Tianshan",
    nameZh: "天山",
    x: 45,
    y: 25,
    waters: ["tian-river"],
  },
];

export const waters: Water[] = [
  {
    id: "jiuwei-river",
    name: "Jiuwei River",
    nameZh: "九尾之水",
    type: "river",
    mountainId: "jiuwei",
    fish: ["lushu"],
  },
  {
    id: "qingqiu-lake",
    name: "Qingqiu Lake",
    nameZh: "青丘之湖",
    type: "lake",
    mountainId: "qingqiu",
    fish: ["wenyu"],
  },
  {
    id: "kunlun-river",
    name: "Kunlun River",
    nameZh: "昆仑之水",
    type: "river",
    mountainId: "kunlun",
    fish: ["feiyu"],
  },
  {
    id: "jade-lake",
    name: "Jade Lake",
    nameZh: "瑶池",
    type: "lake",
    mountainId: "kunlun",
    fish: ["shenyu"],
  },
  {
    id: "zhong-river",
    name: "Zhong River",
    nameZh: "钟水",
    type: "river",
    mountainId: "zhongshan",
    fish: ["chiyu"],
  },
  {
    id: "tian-river",
    name: "Tian River",
    nameZh: "天水",
    type: "river",
    mountainId: "tianshan",
    fish: ["lingyu"],
  },
];

export const fish: Fish[] = [
  {
    id: "lushu",
    name: "Lushu Fish",
    nameZh: "鹿蜀",
    sourceBook: "Classic of the Southern Mountains",
    sourceChapter:
      "Chapter 1: The First Mountains of the South",
    territory: "Jiuwei Mountain",
    originalText:
      "又东三百里，曰堂庭之山，多棪木，多白猿，多水玉，多黄金。有兽焉，其状如鹿而白尾，马足人手而四角，名曰鹿蜀。有鸟焉，其状如鸡而人面，名曰凫徯。",
    description:
      "A mystical fish resembling a deer with white tail, horse feet, human hands, and four horns. Said to bring good fortune to those who see it.",
    waterId: "jiuwei-river",
    images: [
      {
        period: "ancient",
        label: "Ancient Woodcut",
        styleAnalysis:
          "Traditional Ming Dynasty woodblock print featuring bold, simplified linework with high contrast. The composition uses symbolic representation rather than naturalistic detail, with stylized waves and geometric patterns. The fish is depicted with exaggerated features emphasizing its hybrid nature, rendered in a flat, two-dimensional style characteristic of classical Chinese illustration.",
      },
      {
        period: "modern1",
        label: "Modern Interpretation 1",
        styleAnalysis:
          "Contemporary digital art with vibrant color gradients and flowing, organic forms. This interpretation emphasizes the mystical nature of the creature through bioluminescent effects and ethereal lighting. The style blends traditional Chinese ink wash techniques with modern fantasy art aesthetics, creating a dreamlike underwater atmosphere.",
      },
      {
        period: "modern2",
        label: "Modern Interpretation 2",
        styleAnalysis:
          "Minimalist vector illustration using a limited color palette of gold and teal against dark backgrounds. Clean geometric shapes and negative space create a sophisticated, contemporary look. The design focuses on symbolic representation, abstracting the creature into essential forms while maintaining cultural authenticity.",
      },
      {
        period: "modern3",
        label: "Modern Interpretation 3",
        styleAnalysis:
          "Hyper-detailed digital painting with photorealistic textures and dramatic chiaroscuro lighting. This interpretation reimagines the mythical fish as a plausible biological specimen, adding anatomical detail and naturalistic coloring. The style draws from scientific illustration while maintaining the fantastical elements of the original text.",
      },
    ],
  },
  {
    id: "wenyu",
    name: "Wenyu Fish",
    nameZh: "文鳐",
    sourceBook: "Classic of the Eastern Mountains",
    sourceChapter: "Chapter 2: Waters of the East",
    territory: "Qingqiu Mountain",
    originalText:
      "青丘之山，有兽焉，其状如狐而九尾。有鸟焉，其状如鸠，其音若呵，名曰灌灌。有鱼焉，其状如鲤而鸟翼，苍文而白首赤喙，常行西海，游于东海，以夜飞。",
    description:
      "A remarkable fish with the body of a carp but possessing bird wings. Features azure patterns, white head, and red beak. Known to traverse between the Western and Eastern seas by night.",
    waterId: "qingqiu-lake",
    images: [
      {
        period: "ancient",
        label: "Ancient Woodcut",
        styleAnalysis:
          "Classic Song Dynasty illustration style with delicate line work and balanced composition. The creature is depicted in profile with carefully rendered scales and feathers, showing the integration of fish and bird elements. Black ink on cream paper with minimal shading, focusing on outline and pattern.",
      },
      {
        period: "modern1",
        label: "Modern Interpretation 1",
        styleAnalysis:
          "Watercolor and digital mixed media creating soft, translucent effects. The winged fish appears to be suspended in an aquatic atmosphere with diffused light and flowing movement. Pastel colors blend seamlessly, evoking both air and water elements in a single harmonious composition.",
      },
      {
        period: "modern2",
        label: "Modern Interpretation 2",
        styleAnalysis:
          "Bold graphic design with strong silhouettes and pattern work. The fish is rendered in a decorative, almost textile-like style with intricate geometric patterns representing scales and feathers. Influenced by Art Deco and modern Chinese design movements, with metallic gold accents.",
      },
      {
        period: "modern3",
        label: "Modern Interpretation 3",
        styleAnalysis:
          "Surrealist digital painting with dreamlike atmosphere and impossible physics. The creature floats in an ambiguous space between water and sky, with detailed anatomical rendering contrasted against abstract, flowing backgrounds. Rich color saturation and dynamic composition create visual tension.",
      },
    ],
  },
  {
    id: "feiyu",
    name: "Feiyu",
    nameZh: "飞鱼",
    sourceBook: "Classic of the Western Mountains",
    sourceChapter: "Chapter 3: The Sacred Waters",
    territory: "Kunlun Mountain",
    originalText:
      "昆仑之丘，是实惟帝之下都。有鱼焉，其状如豚而有珠，名曰飞鱼。",
    description:
      "A celestial fish resembling a pig but adorned with precious pearls. Inhabits the sacred waters near the divine capital.",
    waterId: "kunlun-river",
    images: [
      {
        period: "ancient",
        label: "Ancient Woodcut",
        styleAnalysis:
          "Yuan Dynasty court painting style with refined brushwork and attention to mythological symbolism. Gold leaf accents highlight the pearl elements. The fish is portrayed with dignity befitting its sacred origin, using controlled lines and classical composition principles.",
      },
      {
        period: "modern1",
        label: "Modern Interpretation 1",
        styleAnalysis:
          "3D rendered illustration with volumetric lighting and particle effects. The pearls emit a soft glow, creating dramatic light and shadow play. Contemporary CGI techniques bring a sense of magic and wonder, with realistic water simulation and atmospheric perspective.",
      },
      {
        period: "modern2",
        label: "Modern Interpretation 2",
        styleAnalysis:
          "Flat design aesthetic with bold shapes and limited color palette. Inspired by mid-century modern illustration, the fish is simplified into essential geometric forms. The pearls are represented as perfect circles, creating visual rhythm and pattern against the flowing form of the creature.",
      },
      {
        period: "modern3",
        label: "Modern Interpretation 3",
        styleAnalysis:
          "Neo-traditional Chinese painting blending classical ink techniques with modern color theory. Spontaneous brushstrokes capture the essence of the creature while maintaining traditional composition. Contemporary pigments add vibrancy while respecting historical artistic conventions.",
      },
    ],
  },
  {
    id: "shenyu",
    name: "Shenyu",
    nameZh: "神鱼",
    sourceBook: "Classic of the Western Mountains",
    sourceChapter: "Chapter 4: The Jade Lake",
    territory: "Kunlun Mountain - Jade Lake",
    originalText:
      "瑶池之上，有神鱼焉，其状如鲤而龙鳞，五色而发光。",
    description:
      "A divine fish with carp-like body but covered in dragon scales. Shimmers with five sacred colors and emits its own radiance.",
    waterId: "jade-lake",
    images: [
      {
        period: "ancient",
        label: "Ancient Woodcut",
        styleAnalysis:
          "Elaborate Qing Dynasty style with intricate detail and symbolic color use. Dragon scales are meticulously rendered with repeating patterns. The five-color motif is suggested through varying line densities and cross-hatching, representing imperial and divine associations.",
      },
      {
        period: "modern1",
        label: "Modern Interpretation 1",
        styleAnalysis:
          "Iridescent digital art with rainbow gradient effects and prismatic light refraction. The five colors blend and shift across the surface, mimicking natural phenomena like oil slicks or butterfly wings. High contrast and saturation create an otherworldly, luminous quality.",
      },
      {
        period: "modern2",
        label: "Modern Interpretation 2",
        styleAnalysis:
          "Stained glass-inspired vector art with distinct color blocks and leading lines. Each scale is a separate geometric segment in one of the five sacred colors, creating a mosaic effect. The style evokes both traditional Chinese cloisonné and contemporary graphic design.",
      },
      {
        period: "modern3",
        label: "Modern Interpretation 3",
        styleAnalysis:
          "Baroque-influenced fantasy art with dramatic lighting and rich, jewel-toned colors. The fish appears almost sculptural, with heightened realism and theatrical presentation. Gold highlights and deep shadows create depth and majesty, celebrating the divine nature of the creature.",
      },
    ],
  },
  {
    id: "chiyu",
    name: "Chiyu",
    nameZh: "赤鱼",
    sourceBook: "Classic of the Central Mountains",
    sourceChapter: "Chapter 5: The Red Waters",
    territory: "Zhongshan",
    originalText:
      "钟山之水，多赤鱼，其状如鱼而人面，其音如鸳鸯。",
    description:
      "The red fish with a human face, producing sounds like mandarin ducks. A mysterious creature of the central waters.",
    waterId: "zhong-river",
    images: [
      {
        period: "ancient",
        label: "Ancient Woodcut",
        styleAnalysis:
          "Ming Dynasty folk art style with simplified, expressive features. The human face is rendered with minimal lines but maximum character. Bold contrast and direct presentation typical of woodblock prints meant for wider circulation, with symbolic rather than realistic proportions.",
      },
      {
        period: "modern1",
        label: "Modern Interpretation 1",
        styleAnalysis:
          "Surrealist digital composition exploring the uncanny valley between human and fish. Photorealistic textures create disquieting beauty. The style draws from contemporary portrait photography while embracing the fantastical, with careful attention to emotional expression in the human features.",
      },
      {
        period: "modern2",
        label: "Modern Interpretation 2",
        styleAnalysis:
          "Abstract expressionist approach with loose, gestural marks suggesting form rather than defining it. Red pigments dominate, applied in varied densities. The human face emerges from chaos of brushstrokes, creating psychological depth through ambiguity and movement.",
      },
      {
        period: "modern3",
        label: "Modern Interpretation 3",
        styleAnalysis:
          "Pop art-influenced illustration with bold outlines and Ben-Day dots. Bright, unnaturalistic colors and graphic simplification create visual impact. The style references both traditional Chinese New Year prints and Western comic book art, making the mythical accessible and contemporary.",
      },
    ],
  },
  {
    id: "lingyu",
    name: "Lingyu",
    nameZh: "灵鱼",
    sourceBook: "Classic of the Northern Mountains",
    sourceChapter: "Chapter 6: The Heavenly Stream",
    territory: "Tianshan",
    originalText:
      "天山之水，出焉。有灵鱼，其状如鲤而六足，其名曰灵鱼，食之使人不眯。",
    description:
      "A spiritual fish resembling a carp but with six legs. Consuming it is said to prevent nightmares and grant clarity of vision.",
    waterId: "tian-river",
    images: [
      {
        period: "ancient",
        label: "Ancient Woodcut",
        styleAnalysis:
          "Tang Dynasty Buddhist-influenced illustration with spiritual symbolism. The six legs are arranged symmetrically, suggesting religious iconography. Fine line work with circular patterns representing water, rendered in a contemplative, balanced composition that emphasizes the sacred nature of the creature.",
      },
      {
        period: "modern1",
        label: "Modern Interpretation 1",
        styleAnalysis:
          "Ethereal fantasy art with soft focus and glowing effects. The six-legged fish appears to float in a luminous void, backlit by divine light. Delicate color transitions from gold to white suggest purity and spiritual power, with gossamer fins catching imaginary currents.",
      },
      {
        period: "modern2",
        label: "Modern Interpretation 2",
        styleAnalysis:
          "Biomechanical design aesthetic blending organic and geometric forms. The six legs are rendered with anatomical precision, showing muscle and bone structure. Clean lines and technical illustration style present the mythical creature as if it were a specimen in a fantastical natural history collection.",
      },
      {
        period: "modern3",
        label: "Modern Interpretation 3",
        styleAnalysis:
          "Psychedelic art with kaleidoscopic patterns and vibrant, contrasting colors. The six legs create radial symmetry, emphasized by repeating motifs and mandala-like background elements. The style evokes altered states of consciousness, connecting to the fish's dream-preventing properties.",
      },
    ],
  },
];