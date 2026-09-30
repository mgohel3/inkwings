// Homepage / shared static content ported from the InkWings design prototype.
// Do not invent facts here — only structural/copy content already present in the .dc.html source.

// [w,h,x,y,rot,bg,radius,label,textColor] — placeholder pieces for the Process page's
// scroll-driven layers (steps 1-3). Step 4 reuses shapes from lib/data's shape sets.
export type ProcessPieceTuple = [number, number, number, number, number, string, number, string, string];

export const processPieceSets: ProcessPieceTuple[][] = [
  [
    [140, 190, -150, -20, -12, "#fff", 3, "Idea", "#111"],
    [140, 190, -60, 10, -2, "#fff", 3, "", "#111"],
    [140, 190, 30, -10, 8, "#fff", 3, "Brief", "#111"],
    [140, 190, 120, 20, 16, "#F4F0E8", 3, "", "#111"],
    [60, 60, -10, -140, 0, "#E8560E", 40, "", "#111"],
  ],
  [
    [90, 90, -150, -60, 0, "#E8560E", 4, "Artwork", "#111"],
    [90, 90, -40, -90, 0, "#63813A", 4, "Colour", "#111"],
    [90, 90, 70, -50, 0, "#111", 4, "Size", "#F4F0E8"],
    [200, 140, -20, 70, -4, "#fff", 3, "", "#111"],
    [8, 120, 130, -20, 0, "#111", 2, "", "#111"],
  ],
  [
    [210, 290, -40, 0, -6, "#F4F0E8", 3, "Sheet", "#111"],
    [210, 290, 10, -10, 4, "#E8560E", 3, "", "#111"],
    [210, 290, 60, -20, 12, "#111", 3, "Print", "#F4F0E8"],
    [30, 30, -140, -130, 0, "#111", 30, "", "#111"],
    [30, 30, -140, 130, 0, "#E8560E", 30, "", "#111"],
  ],
];

export const processSteps = [
  { n: "01", t: "Discover", d: "Understand the requirement." },
  { n: "02", t: "Create", d: "Prepare the artwork and production requirements." },
  { n: "03", t: "Print", d: "Bring the design into physical form." },
  { n: "04", t: "Deliver", d: "Finish and deliver the printed material." },
];

export type WorkPiece = {
  name: string;
  cat: string;
  desc: string;
  bg: string;
  w: number;
  h: number;
  rot: number;
};

// Used in the homepage "Made to be held." horizontal gallery.
export const homeGallery: WorkPiece[] = [
  { name: "Business Cards", cat: "Corporate Stationery", desc: "Standard and die cut cards.", bg: "#E8560E", w: 240, h: 140, rot: 6 },
  { name: "Letterheads", cat: "Corporate Stationery", desc: "Office stationery in your identity.", bg: "#fff", w: 200, h: 270, rot: 3 },
  { name: "Brochures", cat: "Marketing Materials", desc: "Brochures and catalogues.", bg: "#63813A", w: 190, h: 250, rot: 4 },
  { name: "Packaging", cat: "Packaging & Labels", desc: "Product and custom design boxes.", bg: "#111", w: 200, h: 200, rot: 6 },
  { name: "Mugs", cat: "Promotional Materials", desc: "Custom printed mugs.", bg: "#F4F0E8", w: 150, h: 170, rot: 26 },
  { name: "ID Cards", cat: "Promotional Materials", desc: "ID cards with lanyards.", bg: "#E8560E", w: 130, h: 210, rot: 12 },
  { name: "Signage", cat: "Indoor & Outdoor", desc: "Sign boards, flex and rollups.", bg: "#fff", w: 280, h: 130, rot: 4 },
  { name: "Apparel", cat: "Apparel & Merchandise", desc: "T-shirts, polos, caps, uniforms.", bg: "#63813A", w: 190, h: 210, rot: 22 },
  { name: "Labels", cat: "Packaging & Labels", desc: "Product and logistic labels.", bg: "#F4F0E8", w: 180, h: 180, rot: 90 },
];

// Work page filterable grid — placeholder tiles, real photography to replace later.
export type WorkItem = {
  title: string;
  category: string;
  catSlug: string;
  span: number;
  aspect: string;
};

export const workItems: WorkItem[] = [
  { title: "Business Cards", category: "Stationery", catSlug: "corporate-stationery", span: 7, aspect: "16/10" },
  { title: "Product Boxes", category: "Packaging", catSlug: "packaging", span: 5, aspect: "4/5" },
  { title: "Brochures", category: "Marketing", catSlug: "marketing-materials", span: 4, aspect: "4/5" },
  { title: "Custom Mugs", category: "Promotional", catSlug: "promotional-materials", span: 4, aspect: "4/5" },
  { title: "Rollup Standy", category: "Advertising", catSlug: "advertising", span: 4, aspect: "4/5" },
  { title: "Letterheads", category: "Stationery", catSlug: "corporate-stationery", span: 5, aspect: "1/1" },
  { title: "T-Shirts", category: "Merchandise", catSlug: "apparel", span: 7, aspect: "16/10" },
  { title: "Shrink Sleeve Labels", category: "Packaging", catSlug: "packaging", span: 6, aspect: "4/3" },
  { title: "Sign Boards", category: "Advertising", catSlug: "advertising", span: 6, aspect: "4/3" },
  { title: "Menu Cards", category: "Marketing", catSlug: "marketing-materials", span: 4, aspect: "4/5" },
  { title: "ID Cards and Lanyards", category: "Promotional", catSlug: "promotional-materials", span: 8, aspect: "16/9" },
  { title: "Caps", category: "Merchandise", catSlug: "apparel", span: 4, aspect: "4/5" },
];

export const workFilterKeys = [
  "All",
  "Stationery",
  "Packaging",
  "Marketing",
  "Promotional",
  "Advertising",
  "Merchandise",
];

export const aboutWhoWeHelp = [
  { t: "Offices", d: "Cards, letterheads, folders, diaries and certificates." },
  { t: "Hotels and restaurants", d: "Menu cards and hotel door hangers." },
  { t: "Food, beverage and cosmetic brands", d: "Labels and boxes for the shelf." },
  { t: "Warehouses and logistics", d: "Warehouse, logistic and container labels." },
  { t: "Event and wedding planners", d: "Wedding planner stationery, canopy tents, flags and boards." },
];

export const navLinks = [
  { label: "Products", href: "/products", key: "products" },
  { label: "Process", href: "/process", key: "process" },
  { label: "Work", href: "/work", key: "work" },
  { label: "About", href: "/about", key: "about" },
  { label: "Contact", href: "/contact", key: "contact" },
];

export const quoteCategoryOptions: [string, string][] = [
  ["Corporate Stationery", "corporate-stationery"],
  ["Marketing Materials", "marketing-materials"],
  ["Promotional Materials", "promotional-materials"],
  ["Advertising", "advertising"],
  ["Packaging", "packaging"],
  ["Labels", "labels"],
  ["Apparel", "apparel"],
  ["Other", "other"],
];

export const quoteNeeds = [
  "Corporate Stationery",
  "Marketing Materials",
  "Promotional Materials",
  "Indoor & Outdoor Advertising",
  "Packaging & Labels",
  "Apparel & Merchandise",
  "Other",
];
