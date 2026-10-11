# Lovely Grand

หน้าเว็บภาษาไทยของบริษัท เลิฟลี่ แกรนด์ จำกัด สร้างด้วย Next.js App Router, TypeScript และ React โดยยึด `theme.jpg` เป็นภาพอ้างอิงหลัก ใช้ธีมสีรุ้งพาสเทล ภาพตัวละครเกม การ์ดเกม บัตรเติมเงิน และโปรโมชั่นตามต้นแบบ

## เปิดในเครื่อง

แนะนำ Node.js 22 LTS ขึ้นไป

```sh
npm ci
npm run dev
```

เปิด http://localhost:3000

## ตรวจและรัน production

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

## Deploy บน Vercel

Import repository `rathapongpumpo/lovelygrand-game` แล้วเลือก Framework Preset: Next.js และ Root Directory: ราก repository ใช้คำสั่ง build/install และ Output Directory ตามค่าเริ่มต้นของ Next.js

เว็บไม่ต้องใช้ API key หรือฐานข้อมูลสำหรับส่วนหน้าที่ส่งมอบ

## ข้อมูลติดต่อ

- LINE เดิมตามที่ผู้ใช้ระบุ: https://lin.ee/Y03gaLz
- โทรศัพท์: 0818782470
- ข้อมูลหลักและรายการสินค้า: `lib/content.ts`
- ตั้งค่า override ได้ผ่าน `NEXT_PUBLIC_LINE_URL`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_SUPPORT_EMAIL` และ `NEXT_PUBLIC_SITE_URL` โดยดู `.env.example`

## ฟังก์ชันที่พร้อมใช้

- เมนู responsive และลิงก์เลื่อนไปยังแต่ละส่วน
- รายการเกมพร้อมค้นหาและกรองประเภท
- รายการบัตรเติมเงินพร้อมค้นหา
- หน้าต่างรายละเอียดเกม บัตร โปรโมชั่น ข่าวสาร และการติดต่อ
- ลิงก์ LINE และโทรศัพท์ พร้อม keyboard navigation และ native dialog

เว็บไซต์นี้เป็นหน้าแนะนำบริการและรับการสอบถามผ่าน LINE/โทรศัพท์ ข้อความการตลาดในหน้าอ้างอิงจากภาพที่ผู้ใช้ให้มา ยังไม่ได้เชื่อมต่อระบบเติมเกมอัตโนมัติ การชำระเงิน ฐานข้อมูลสมาชิก หรือระบบ authentication ปุ่มเข้าสู่ระบบเปิดฟอร์มพร้อมแจ้งว่าระบบสมาชิกยังไม่เปิดให้บริการ และไม่ส่งหรือจัดเก็บข้อมูลเข้าสู่ระบบ

## ภาพและการทดสอบ

- `public/images/hero.webp`: แบนเนอร์ที่สร้างด้วย built-in ImageGen โดยใช้ `theme.jpg` เป็นภาพอ้างอิง
- `public/images/reference-sheet.jpg`: ภาพต้นแบบ ใช้ CSS sprites แสดงภาพบัตร โปรโมชั่น และโลโก้เครือข่ายบางส่วน
- ภาพเกมและบัตรบางรายการนำจาก assets ใน repository ตัวอย่างของผู้ใช้ `rathapongpumpo/qplay2`
- UI เมนู หัวข้อ ปุ่ม และคำบรรยายเป็น HTML/CSS; ไอคอนจาก Lucide
- ดู prompt และแหล่งภาพใน `design/ASSETS.md`
- ดูผลตรวจหน้าเว็บจริงใน `design/QA.md` และภาพหน้าเว็บใน `design/`
