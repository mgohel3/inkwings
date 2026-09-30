export type Product = {
  slug: string;
  name: string;
  desc: string;
};

export type Shape = {
  w: number;
  h: number;
  x: number;
  y: number;
  rot: number;
  bg: string;
  radius: number;
  label: string;
  textColor: string;
};

export type Category = {
  slug: string;
  name: string;
  nav: string;
  line: string;
  tag: string;
  solution: string;
  products: Product[];
};

const productList = (
  arr: [string, string, string][]
): Product[] => arr.map(([slug, name, desc]) => ({ slug, name, desc }));

export const categories: Category[] = [
  {
    slug: "corporate-stationery",
    name: "Corporate Stationery",
    nav: "Corporate Branding",
    line: "Make every document feel like your brand.",
    tag: "Made for first impressions.",
    solution:
      "Cards, letterheads and folders that carry your brand into every meeting.",
    products: productList([
      ["business-cards", "Business Cards / Die Cut", "Standard and die cut cards."],
      ["envelopes", "Envelopes", "Envelopes printed with your identity."],
      ["letterheads", "Letterheads", "Official paper for official words."],
      ["certificates", "Certificates", "Printed recognition."],
      ["folders", "Folders", "Hold the paperwork, show the brand."],
      ["diaries", "Diaries", "A brand people open every day."],
      ["notepads", "Notepads", "Branded pages for quick notes."],
      ["bill-books", "Bill Book / Chalan Book", "Business records, printed to fit."],
    ]),
  },
  {
    slug: "marketing-materials",
    name: "Marketing Materials",
    nav: "Marketing Collateral",
    line: "Get noticed before you say a word.",
    tag: "Made to be handed over.",
    solution: "Printed pieces that carry your message into people's hands.",
    products: productList([
      ["flyers", "Flyers / Leaflets", "Quick, direct, easy to hand out."],
      ["rack-cards", "Rack Cards", "Slim cards for counters and racks."],
      ["stickers", "Stickers", "Small marks that travel."],
      ["danglers", "Danglers / Die Cut Danglers", "Hanging displays, cut to shape."],
      ["brochures", "Brochure / Catalogue", "Your range, bound and held."],
      ["bookmarks", "Bookmark", "Small, useful, kept."],
      ["menu-cards", "Menu Card", "The menu, printed properly."],
      ["door-hangers", "Hotel Door Hangers", "A message on the handle."],
      ["hang-tags", "Hang Tags", "The finishing touch on the product."],
    ]),
  },
  {
    slug: "promotional-materials",
    name: "Promotional Materials",
    nav: "Promotional Branding",
    line: "Give your brand something to hold on to.",
    tag: "Made to be carried around.",
    solution: "Everyday objects that keep your name in circulation.",
    products: productList([
      ["id-cards", "ID Cards", "Identification, printed clean."],
      ["lanyards", "Lanyards", "Worn all day, seen all day."],
      ["round-badges", "Round Badges", "Small circles, big presence."],
      ["mouse-pads", "Mouse Pads", "A desk-sized canvas."],
      ["mugs", "Custom Mugs", "Morning coffee with your logo."],
      ["pens", "Custom Pens", "A pen that gets passed around."],
      ["promo-diaries", "Diaries", "A year of your brand."],
      ["bags", "Bags", "Carried in public."],
      ["placements", "Placement Materials", "Print for tables and counters."],
    ]),
  },
  {
    slug: "advertising",
    name: "Indoor & Outdoor Advertising",
    nav: "Outdoor Advertising",
    line: "Be seen from across the street.",
    tag: "Made to be seen from a distance.",
    solution: "Signage and displays for shopfronts, events and interiors.",
    products: productList([
      ["flex", "Flex", "Large format print."],
      ["flex-frame", "Flex with Frame", "Flex, framed and ready to hang."],
      ["vinyl", "Vinyl Sticker", "Adhesive print for smooth surfaces."],
      ["foamsheet", "Foamsheet", "Light boards for indoor display."],
      ["sign-board", "Sign Board", "Your name above the door."],
      ["mdf-acrylic-ss", "MDF / Acrylic / SS", "Signage in rigid materials."],
      ["rollup", "Rollup Standy", "Portable, quick to set up."],
      ["canopy", "Canopy Tents", "Branded shade for events."],
      ["umbrellas", "Marketing Umbrellas", "Branding overhead."],
      ["flags", "Flags", "Movement and colour."],
      ["letters", "Letters & Numbers", "Dimensional lettering."],
      ["wallpaper", "Wallpaper", "Printed walls."],
    ]),
  },
  {
    slug: "packaging",
    name: "Packaging & Label Printing",
    nav: "Packaging & Labels",
    line: "Your product, dressed for the shelf.",
    tag: "Made for the moment of unboxing.",
    solution: "Boxes and labels for food, cosmetics, warehouses and logistics.",
    products: productList([
      ["packaging-box", "Product Packaging Box", "Boxes that present the product."],
      ["food-labels", "Food & Beverage Labels", "Labels for food and drink."],
      ["cosmetic-boxes", "Cosmetic Product Boxes and Labels", "Packaging for cosmetics."],
      ["warehouse-labels", "Warehouse Labels", "Labels for storage and shelving."],
      ["logistic-labels", "Logistic Labels", "Labels for shipments."],
      ["container-labels", "Container Labels", "Labels for containers."],
      ["wooden-box", "Wooden Box", "Printed wooden packaging."],
      ["shrink-sleeve", "Shrink Sleeve", "Full-body printed sleeves."],
      ["sleeve-rolls", "Shrink Sleeve Label Rolls", "Sleeve labels on rolls."],
      ["lubricant-labels", "Lubricant Self-Adhesive Sticker Labels", "Self-adhesive labels for lubricants."],
      ["custom-box", "Corporate Custom Design Box Print", "Boxes designed around your brand."],
    ]),
  },
  {
    slug: "apparel",
    name: "Apparel & Merchandise",
    nav: "Merchandise & Apparel",
    line: "Wear the brand.",
    tag: "Made to be worn.",
    solution: "Team and event wear with your identity on it.",
    products: productList([
      ["t-shirts", "T-Shirts", "Printed tees."],
      ["polo", "Polo T-Shirts", "A smarter shirt with your mark."],
      ["uniforms", "Uniforms", "One look for the whole team."],
      ["caps", "Caps", "Branded headwear."],
      ["aprons", "Aprons", "Branded workwear."],
    ]),
  },
];

export const extras = [
  "Wedding Planner Stationery",
  "Boards",
  "Foamsheet Cutouts",
  "Canvas Print with Framing",
  "Fabric Print with Framing",
  "PVC Airballoon Branding",
];

// [w,h,x,y,rot,bg,radius,label,textColor]
type ShapeTuple = [number, number, number, number, number, string, number, string, string];

const shapeTuples: Record<string, ShapeTuple[]> = {
  "corporate-stationery": [
    [220, 124, -30, -90, -14, "#F4F0E8", 6, "Business card", "#111"],
    [220, 124, 0, -40, -6, "#E8560E", 6, "", "#111"],
    [220, 124, 20, 10, 3, "#F4F0E8", 6, "Letterhead", "#111"],
    [220, 124, -10, 60, 10, "#63813A", 6, "", "#111"],
    [150, 200, 140, -10, 8, "#fff", 4, "Envelope", "#111"],
  ],
  "marketing-materials": [
    [150, 210, -110, 0, -24, "#F4F0E8", 4, "Flyer", "#111"],
    [150, 210, -50, -10, -10, "#E8560E", 4, "Rack card", "#111"],
    [150, 210, 10, -14, 4, "#fff", 4, "Brochure", "#111"],
    [150, 210, 70, -6, 16, "#63813A", 4, "", "#111"],
    [70, 70, 130, 130, 0, "#E8560E", 40, "Tag", "#111"],
  ],
  "promotional-materials": [
    [130, 140, -90, 20, 0, "#E8560E", 22, "Mug", "#111"],
    [22, 240, 60, -10, 20, "#F4F0E8", 10, "", "#111"],
    [110, 170, 110, 10, -6, "#fff", 10, "ID card", "#111"],
    [90, 90, -20, -120, 0, "#63813A", 60, "Badge", "#111"],
    [8, 190, -150, -60, -12, "#F4F0E8", 4, "", "#111"],
  ],
  advertising: [
    [330, 120, 0, -110, -2, "#E8560E", 6, "Flex banner", "#111"],
    [110, 250, -140, 50, 0, "#F4F0E8", 8, "Rollup", "#111"],
    [150, 110, 10, 70, 0, "#fff", 6, "Sign board", "#111"],
    [130, 90, 150, 70, -8, "#63813A", 60, "Canopy", "#111"],
    [8, 120, 105, -60, 0, "#F4F0E8", 2, "", "#111"],
  ],
  packaging: [
    [150, 150, -100, 0, -8, "#F4F0E8", 6, "Box", "#111"],
    [130, 130, 20, -50, 10, "#E8560E", 6, "Cosmetic box", "#111"],
    [120, 120, 90, 70, 0, "#63813A", 60, "Label roll", "#111"],
    [100, 100, -90, -110, 14, "#fff", 6, "Label", "#111"],
    [80, 80, -10, 110, 0, "#F4F0E8", 50, "", "#111"],
  ],
  apparel: [
    [180, 200, -20, -10, 0, "#E8560E", 20, "T-shirt", "#111"],
    [130, 70, -150, 70, -8, "#F4F0E8", 70, "Cap", "#111"],
    [110, 170, 130, 10, 6, "#63813A", 14, "Apron", "#111"],
    [150, 170, 70, -60, 10, "#fff", 18, "Polo", "#111"],
    [60, 60, -140, -90, 0, "#F4F0E8", 40, "", "#111"],
  ],
};

export const shapes: Record<string, Shape[]> = Object.fromEntries(
  Object.entries(shapeTuples).map(([slug, tuples]) => [
    slug,
    tuples.map(([w, h, x, y, rot, bg, radius, label, textColor]) => ({
      w,
      h,
      x,
      y,
      rot,
      bg,
      radius,
      label,
      textColor,
    })),
  ])
);

const palette = ["#E8560E", "#F4F0E8", "#63813A", "#111", "#fff"];
const tileVariants: [number, number, number][] = [
  [200, 120, 6],
  [140, 190, 4],
  [160, 160, 10],
  [120, 120, 60],
  [220, 90, 4],
];

export function tile(i: number, k = 1) {
  const v = tileVariants[(i * 3 + 1) % 5];
  return {
    width: v[0] * k,
    height: v[1] * k,
    background: palette[i % 5],
    borderRadius: v[2],
    boxShadow: "0 20px 36px #0003",
  };
}

export type FlatProduct = Product & { cat: Category };

export const allProducts: FlatProduct[] = categories.flatMap((c) =>
  c.products.map((p) => ({ ...p, cat: c }))
);

export function getCategory(slug: string | undefined | null) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string | undefined | null) {
  return allProducts.find((p) => p.slug === slug);
}

export function categoryHref(slug: string) {
  return `/products/${slug}`;
}

export function productHref(catSlug: string, slug: string) {
  return `/products/${catSlug}/${slug}`;
}

export const contact = {
  phone: "+91 81416 40756",
  tel: "tel:+918141640756",
  wa: "https://wa.me/918141640756",
  email: "inkwingsprint@gmail.com",
  website: "inkwings.in",
  address: {
    line1: "B-811, Sun Westbank,",
    line2: "Opp. Vallabh Sadan,",
    line3: "River Front, Ashram Road,",
    line4: "Ahmedabad - 380009",
  },
};
