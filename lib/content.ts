export const company = {
  thai: "บริษัท เลิฟลี่ แกรนด์ จำกัด",
  english: "LOVELY GRAND CO.,LTD.",
  lineUrl: process.env.NEXT_PUBLIC_LINE_URL ?? "https://lin.ee/Y03gaLz",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "0818782470",
  email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "",
};

export const games = [
  { id: "free-fire", name: "Garena Free Fire", shortName: "Free Fire", image: "free-fire.webp", category: "Battle Royale", accountLabel: "Player ID" },
  { id: "rov", name: "Arena of Valor", shortName: "RoV", image: "rov.webp", category: "MOBA", accountLabel: "Player ID" },
  { id: "pubg", name: "PUBG Mobile", shortName: "PUBG Mobile", image: "pubg.webp", category: "Battle Royale", accountLabel: "Character ID" },
  { id: "mobile-legends", name: "Mobile Legends", shortName: "Mobile Legends", image: "mobile-legends.webp", category: "MOBA", accountLabel: "User ID และ Zone ID" },
  { id: "genshin", name: "Genshin Impact", shortName: "Genshin Impact", image: "genshin.webp", category: "RPG", accountLabel: "UID และเซิร์ฟเวอร์" },
  { id: "ragnarok", name: "Ragnarok M", shortName: "Ragnarok M", image: "ragnarok.webp", category: "RPG", accountLabel: "Character ID และเซิร์ฟเวอร์" },
] as const;

export const cards = [
  { id: "google-play", name: "Google Play Gift Card", image: "google-play.webp", color: "#fff" },
  { id: "app-store", name: "App Store & iTunes", image: "app-store.webp", color: "#00b7ef" },
  { id: "steam", name: "Steam Wallet", image: "steam.webp", color: "#143751" },
  { id: "playstation", name: "PlayStation Store Card", image: "playstation.webp", color: "#006fe9" },
  { id: "nintendo", name: "Nintendo eShop Card", sprite: { x: 473, y: 1046, w: 100, h: 87 }, color: "#f53139" },
  { id: "truemoney", name: "TrueMoney Wallet", sprite: { x: 37, y: 1148, w: 101, h: 86 }, color: "#fff" },
  { id: "line", name: "LINE Prepaid Card", sprite: { x: 146, y: 1147, w: 99, h: 89 }, color: "#13c47a" },
  { id: "garena", name: "Garena Shells", image: "garena.webp", color: "#f62433" },
  { id: "razer-gold", name: "Razer Gold", image: "razer-gold.webp", color: "#13c643" },
] as const;

export const promotions = [
  { id: "welcome", line1: "เติมครั้งแรก", line2: "รับโบนัสพิเศษ", title: "โบนัสสำหรับการเติมครั้งแรก", description: "สอบถามเงื่อนไขและรายการเกมที่ร่วมโปรโมชั่นกับทีมงานก่อนสั่งซื้อ", sprite: { x: 620, y: 1054, w: 159, h: 118 } },
  { id: "package", line1: "แพ็กเกจสุดคุ้ม", line2: "ราคาพิเศษ", title: "แพ็กเกจเติมเกมสุดคุ้ม", description: "เลือกเกมที่คุณชื่นชอบ แล้วสอบถามแพ็กเกจและราคาที่เปิดให้บริการในขณะนั้น", sprite: { x: 789, y: 1054, w: 146, h: 118 } },
  { id: "gift", line1: "กิจกรรม", line2: "แจกไอเทมฟรี", title: "กิจกรรมและไอเทมเกม", description: "สอบถามกิจกรรมที่เปิดอยู่ พร้อมรายละเอียดการเข้าร่วมและเงื่อนไขรับไอเทมจากทีมงาน", sprite: { x: 947, y: 1054, w: 146, h: 118 } },
] as const;

export type Game = (typeof games)[number];
export type Card = (typeof cards)[number];
export type Promotion = (typeof promotions)[number];
export type SpriteRegion = { x: number; y: number; w: number; h: number };
