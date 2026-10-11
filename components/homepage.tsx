"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { ArrowRight, Check, ChevronRight, Clock3, CreditCard, Gamepad2, Gift, Headphones, House, Menu, MessageCircle, Newspaper, Phone, Search, ShieldCheck, Smartphone, Sparkles, Tags, ThumbsUp, UserRound, X, Zap } from "lucide-react";
import { cards, company, games, promotions, type Card, type Game, type Promotion, type SpriteRegion } from "@/lib/content";

type DialogState = { kind: "catalogue"; tab: "games" | "cards" } | { kind: "game"; game: Game } | { kind: "card"; card: Card } | { kind: "promotion"; promotion?: Promotion } | { kind: "login" } | { kind: "support" } | { kind: "news" };

const navigation = [
  { name: "หน้าแรก", icon: House, href: "#home" },
  { name: "เติมเกม", icon: Gamepad2, href: "#games" },
  { name: "บัตรเติมเงิน", icon: CreditCard, href: "#cards" },
  { name: "โปรโมชั่น", icon: Tags, href: "#promotions" },
  { name: "ข่าวสาร", icon: Newspaper, dialogKind: "news" },
  { name: "แจ้งปัญหา", icon: MessageCircle, dialogKind: "support" },
] as const;

function Sprite({ region, className = "" }: { region: SpriteRegion; className?: string }) {
  const style = { "--sprite-x": `${(-region.x / 1122) * 100}%`, "--sprite-y": `${(-region.y / 1402) * 100}%`, "--sprite-width": `${(1122 / region.w) * 100}%`, aspectRatio: `${region.w}/${region.h}` } as CSSProperties;
  return <span className={`reference-sprite ${className}`} style={style} aria-hidden="true"><Image src="/images/reference-sheet.jpg" alt="" width={1122} height={1402} unoptimized /></span>;
}

function ContactActions() {
  const hasContact = Boolean(company.lineUrl || company.phone || company.email);
  return <div className="contact-options">
    {company.lineUrl && <a className="primary-button line-contact" href={company.lineUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} />ติดต่อผ่าน LINE<ArrowRight size={18} /></a>}
    {company.phone && <a className="secondary-button" href={`tel:${company.phone}`}><Phone size={18} />{company.phone}</a>}
    {company.email && <a className="secondary-button" href={`mailto:${company.email}`}><MessageCircle size={18} />อีเมลทีมงาน</a>}
    {!hasContact && <p className="availability-note">ช่องทางติดต่อยังไม่เปิดให้บริการบนเว็บไซต์</p>}
  </div>;
}

export function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ทั้งหมด");
  const [loginMessage, setLoginMessage] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const openDialog = useCallback((state: DialogState) => {
    if (!dialogRef.current?.open) previousFocus.current = document.activeElement as HTMLElement;
    setDialog(state);
    setMenuOpen(false);
    setQuery("");
    setCategory("ทั้งหมด");
    setLoginMessage("");
  }, []);

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
    setDialog(null);
    previousFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (dialog && !dialogRef.current?.open) dialogRef.current?.showModal();
    if (dialog) {
      const focusTarget = dialog.kind === "catalogue"
        ? dialogRef.current?.querySelector<HTMLInputElement>(".search-box input")
        : dialogRef.current?.querySelector<HTMLButtonElement>(".dialog-close");
      focusTarget?.focus();
    }
    document.body.style.overflow = dialog ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [dialog]);

  const filteredGames = games.filter(game => (`${game.name} ${game.shortName}`.toLowerCase().includes(query.toLowerCase())) && (category === "ทั้งหมด" || game.category === category));
  const filteredCards = cards.filter(card => card.name.toLowerCase().includes(query.toLowerCase()));
  const modalTitle = !dialog ? "" : dialog.kind === "catalogue" ? (dialog.tab === "games" ? "เลือกเกมที่ต้องการเติม" : "บัตรเติมเงินดิจิทัล") : dialog.kind === "game" ? dialog.game.name : dialog.kind === "card" ? dialog.card.name : dialog.kind === "promotion" ? dialog.promotion?.title ?? "โปรโมชั่นสุดคุ้ม" : dialog.kind === "login" ? "เข้าสู่ระบบ" : dialog.kind === "news" ? "ข่าวสาร Lovely Grand" : "ติดต่อทีมงาน / แจ้งปัญหา";

  function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginMessage("ระบบสมาชิกยังไม่เปิดให้บริการผ่านเว็บไซต์ กรุณาติดต่อทีมงานเพื่อรับบริการ");
  }

  return <div className="site-shell">
    <a className="skip-link" href="#main">ข้ามไปเนื้อหา</a>
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" aria-label="Lovely Grand หน้าแรก"><strong>{company.thai}</strong><span>{company.english}</span></a>
        <nav className="desktop-navigation" aria-label="เมนูหลัก">{navigation.map((item, index) => { const Icon = item.icon; return "href" in item ? <a className={`nav-item ${index === 0 ? "active" : ""}`} href={item.href} key={item.name}><Icon aria-hidden="true" /><span>{item.name}</span></a> : <button className="nav-item" onClick={() => openDialog({ kind: item.dialogKind })} key={item.name}><Icon aria-hidden="true" /><span>{item.name}</span></button>; })}</nav>
        <button className="login-button" aria-label="เข้าสู่ระบบ" onClick={() => openDialog({ kind: "login" })}><UserRound aria-hidden="true" /><span>เข้าสู่ระบบ</span></button>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "ปิดเมนู" : "เปิดเมนู"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="mobile-navigation" aria-label="เมนูมือถือ">{navigation.map(item => { const Icon = item.icon; return "href" in item ? <a href={item.href} key={item.name} onClick={() => setMenuOpen(false)}><Icon size={20} />{item.name}</a> : <button onClick={() => openDialog({ kind: item.dialogKind })} key={item.name}><Icon size={20} />{item.name}</button>; })}</nav>}
    </header>

    <main id="main">
      <section className="hero" id="home" aria-labelledby="hero-heading">
        <Image className="hero-art" src="/images/hero.webp" alt="ตัวละครเกมแฟนตาซี มือถือ เพชร และเหรียญทองบนพื้นหลังสีรุ้ง" fill sizes="(min-width: 1440px) 1440px, 100vw" preload quality={90} />
        <div className="hero-copy">
          <h1 id="hero-heading"><span className="headline-top"><span className="pink-word">เติม</span><span className="cyan-word">เกม</span><span className="online-word">ออนไลน์</span></span><span className="headline-sub">รวดเร็ว ปลอดภัย ได้รับทันที</span></h1>
          <div className="company-sign"><div className="sign-ribbon">ภายใต้การดำเนินงาน</div><div className="sign-body"><strong>{company.thai}</strong><span>{company.english}</span></div></div>
          <div className="trust-strip" aria-label="จุดเด่นบริการ"><span><i><Check /></i>ถูกต้องตามกฎหมาย</span><span><i><Check /></i>ระบบอัตโนมัติ 24 ชม.</span><span><i><Check /></i>มั่นใจ ปลอดภัย 100%</span></div>
          <div className="benefits">
            <div className="benefit"><span className="benefit-icon purple"><Zap aria-hidden="true" /></span><strong>เติมไว</strong><span>ได้รับทันที</span></div>
            <div className="benefit"><span className="benefit-icon pink"><ShieldCheck aria-hidden="true" /></span><strong>ปลอดภัย</strong><span>มาตรฐานสากล</span></div>
            <div className="benefit"><span className="benefit-icon blue"><Clock3 aria-hidden="true" /><b>24</b></span><strong>ระบบอัตโนมัติ</strong><span>24 ชั่วโมง</span></div>
            <div className="benefit"><span className="benefit-icon green"><Headphones aria-hidden="true" /></span><strong>บริการดี</strong><span>พร้อมดูแลทุกวัน</span></div>
          </div>
        </div>
        <a className="hero-mobile-cta" href="#games"><Gamepad2 size={23} />เลือกเกมที่ต้องการเติม<ChevronRight size={20} /></a>
      </section>

      <div className="catalogue-background">
        <div className="content-container">
          <section className="games-panel glass-panel" id="games" aria-labelledby="games-heading">
            <div className="section-header"><h2 id="games-heading"><Gamepad2 className="game-heading-icon" aria-hidden="true" />เติมเกมยอดนิยม</h2><button className="view-all" onClick={() => openDialog({ kind: "catalogue", tab: "games" })}>ดูทั้งหมด<ChevronRight size={20} /></button></div>
            <div className="game-grid">{games.map(game => <button className="game-card" key={game.id} onClick={() => openDialog({ kind: "game", game })} aria-label={`เติมเกม ${game.name}`}><Image className="game-image" src={`/images/${game.image}`} alt={`ภาพเกม ${game.shortName}`} width={408} height={426} sizes="(max-width: 600px) 42vw, (max-width: 900px) 25vw, 160px" /><span className="game-name">{game.id === "free-fire" ? <>Garena<br />Free Fire</> : game.id === "pubg" ? <>PUBG<br />Mobile</> : game.name}</span></button>)}<button className="more-games" onClick={() => openDialog({ kind: "catalogue", tab: "games" })}><Gamepad2 aria-hidden="true" /><strong>และเกมอื่นๆ<br />อีกมากมาย</strong><span className="circle-arrow"><ChevronRight /></span></button></div>
          </section>

          <div className="offers-grid">
            <section className="cards-panel glass-panel" id="cards" aria-labelledby="cards-heading">
              <div className="section-header"><h2 id="cards-heading"><CreditCard aria-hidden="true" />บัตรเติมเงินดิจิทัล</h2><button className="view-all" onClick={() => openDialog({ kind: "catalogue", tab: "cards" })}>ดูทั้งหมด<ChevronRight size={18} /></button></div>
              <div className="gift-grid">{cards.map(card => <button key={card.id} className="gift-card" style={{ background: card.color }} onClick={() => openDialog({ kind: "card", card })} aria-label={card.name}>{"image" in card ? <Image src={`/images/${card.image}`} alt={card.name} width={303} height={270} sizes="(max-width: 600px) 17vw, 100px" /> : <Sprite region={card.sprite} />}</button>)}<button className="other-cards" onClick={() => openDialog({ kind: "catalogue", tab: "cards" })}><strong>และบัตรอื่นๆ<br />อีกมากมาย</strong><span aria-hidden="true">•••</span></button></div>
            </section>

            <section className="promotions-panel glass-panel" id="promotions" aria-labelledby="promotions-heading">
              <div className="section-header"><h2 id="promotions-heading"><Gift aria-hidden="true" /><span>โปรโมชั่นสุดคุ้ม<small>เติมง่าย ได้มากกว่า</small></span></h2><button className="view-all" onClick={() => openDialog({ kind: "promotion" })}>ดูทั้งหมด<ChevronRight size={18} /></button></div>
              <div className="promotion-grid">{promotions.map(promotion => <button className="promotion-card" key={promotion.id} onClick={() => openDialog({ kind: "promotion", promotion })}><Sprite region={promotion.sprite} /><span className="promotion-caption"><strong>{promotion.line1}</strong><b>{promotion.line2}</b></span></button>)}</div>
            </section>
          </div>

          <section className="network-panel glass-panel" aria-label="เติมเงินมือถือและอินเทอร์เน็ต">
            <button className="network-intro" onClick={() => openDialog({ kind: "support" })}><Smartphone aria-hidden="true" /><span><strong>เติมได้ทุกเครือข่าย</strong><small>ทั้งมือถือ และอินเทอร์เน็ต</small></span></button>
            <button className="network-brands" aria-label="สอบถามเติมเงิน AIS, true, dtac และ my by NT" onClick={() => openDialog({ kind: "support" })}><Sprite region={{ x: 327, y: 1293, w: 410, h: 77 }} /></button>
            <div className="network-benefits"><span><i className="purple"><ThumbsUp /></i>ใช้งานง่าย</span><span><i className="pink"><ShieldCheck /></i>ปลอดภัย</span><span><i className="blue"><Zap /></i>รวดเร็ว</span></div>
          </section>
        </div>
      </div>
    </main>

    <footer className="site-footer"><span>© {new Date().getFullYear()} {company.english}</span><div className="footer-contacts">{company.phone && <a href={`tel:${company.phone}`}><Phone size={13} />{company.phone}</a>}{company.lineUrl && <a href={company.lineUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={13} />LINE</a>}<button onClick={() => openDialog({ kind: "support" })}>ติดต่อทีมงาน<ChevronRight size={14} /></button></div></footer>

    <dialog ref={dialogRef} className="site-dialog" aria-labelledby="dialog-title" onCancel={closeDialog} onClick={event => { if (event.target === event.currentTarget) closeDialog(); }}>
      <div className="dialog-content"><div className="dialog-header"><div><span className="dialog-eyebrow">LOVELY GRAND</span><h2 id="dialog-title">{modalTitle}</h2></div><button className="dialog-close" aria-label="ปิดหน้าต่าง" onClick={closeDialog}><X /></button></div>
        {dialog?.kind === "catalogue" && <><div className="catalogue-tabs" role="group" aria-label="หมวดสินค้า"><button className={dialog.tab === "games" ? "selected" : ""} onClick={() => openDialog({ kind: "catalogue", tab: "games" })}><Gamepad2 size={18} />เกม</button><button className={dialog.tab === "cards" ? "selected" : ""} onClick={() => openDialog({ kind: "catalogue", tab: "cards" })}><CreditCard size={18} />บัตรเติมเงิน</button></div><label className="search-box"><Search size={20} /><input autoFocus type="search" placeholder={dialog.tab === "games" ? "ค้นหาชื่อเกม..." : "ค้นหาบัตรเติมเงิน..."} aria-label={dialog.tab === "games" ? "ค้นหาเกม" : "ค้นหาบัตรเติมเงิน"} value={query} onChange={event => setQuery(event.target.value)} /></label>{dialog.tab === "games" ? <><div className="category-filters" role="group" aria-label="ประเภทเกม">{["ทั้งหมด", "Battle Royale", "MOBA", "RPG"].map(name => <button key={name} className={category === name ? "selected" : ""} aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>)}</div><div className="modal-product-grid">{filteredGames.map(game => <button className="modal-product" key={game.id} onClick={() => openDialog({ kind: "game", game })}><Image src={`/images/${game.image}`} alt="" width={100} height={100} /><span><strong>{game.shortName}</strong><small>{game.category}</small></span><ChevronRight size={18} /></button>)}</div>{!filteredGames.length && <p className="empty-results" role="status">ไม่พบเกมที่ค้นหา ลองค้นหาด้วยชื่ออื่น</p>}</> : <><div className="modal-product-grid">{filteredCards.map(card => <button className="modal-product card-result" key={card.id} onClick={() => openDialog({ kind: "card", card })}>{"image" in card ? <Image src={`/images/${card.image}`} alt="" width={100} height={90} /> : <Sprite region={card.sprite} />}<strong>{card.name}</strong><ChevronRight size={18} /></button>)}</div>{!filteredCards.length && <p className="empty-results" role="status">ไม่พบบัตรที่ค้นหา ลองค้นหาด้วยชื่ออื่น</p>}</>}</>}
        {dialog?.kind === "game" && <><div className="product-detail"><Image src={`/images/${dialog.game.image}`} alt={dialog.game.shortName} width={180} height={190} /><div><span className="product-tag">{dialog.game.category}</span><h3>เติมเกม {dialog.game.shortName}</h3><p>เตรียม {dialog.game.accountLabel} ให้พร้อม แล้วติดต่อทีมงานเพื่อสอบถามแพ็กเกจและราคา</p></div></div><div className="detail-note"><ShieldCheck size={24} /><p>ตรวจสอบชื่อบัญชีและรหัสผู้เล่นก่อนทำรายการทุกครั้ง ไม่ต้องแจ้งรหัสผ่านเกม</p></div><ContactActions /><button className="back-to-catalogue" onClick={() => openDialog({ kind: "catalogue", tab: "games" })}>เลือกเกมอื่น<ArrowRight size={16} /></button></>}
        {dialog?.kind === "card" && <><div className="product-detail card-detail"><div className="detail-card-image" style={{ background: dialog.card.color }}>{"image" in dialog.card ? <Image src={`/images/${dialog.card.image}`} alt={dialog.card.name} width={180} height={160} /> : <Sprite region={dialog.card.sprite} />}</div><div><span className="product-tag">DIGITAL GIFT CARD</span><h3>{dialog.card.name}</h3><p>ติดต่อทีมงานเพื่อสอบถามมูลค่าบัตร ราคา และภูมิภาคที่รองรับก่อนสั่งซื้อ</p></div></div><div className="detail-note"><CreditCard size={24} /><p>เลือกบัตรให้ตรงกับประเทศหรือภูมิภาคของบัญชีที่ต้องการใช้งาน</p></div><ContactActions /><button className="back-to-catalogue" onClick={() => openDialog({ kind: "catalogue", tab: "cards" })}>เลือกบัตรอื่น<ArrowRight size={16} /></button></>}
        {dialog?.kind === "promotion" && <><div className="modal-promotions">{(dialog.promotion ? [dialog.promotion] : promotions).map(promotion => <div className="modal-promotion" key={promotion.id}><Sprite region={promotion.sprite} /><div><h3>{promotion.title}</h3><p>{promotion.description}</p></div></div>)}</div><p className="promotion-terms">รายละเอียดและสิทธิ์รับโปรโมชั่นขึ้นอยู่กับรายการที่เปิดให้บริการ กรุณาสอบถามก่อนทำรายการ</p><ContactActions /></>}
        {dialog?.kind === "login" && <><form className="login-form" onSubmit={submitLogin}><label>อีเมล<input type="email" name="email" autoComplete="email" placeholder="name@example.com" required /></label><label>รหัสผ่าน<input type="password" name="password" autoComplete="current-password" placeholder="กรอกรหัสผ่าน" minLength={6} required /></label><button className="primary-button" type="submit"><UserRound size={20} />เข้าสู่ระบบ</button></form><p className="login-availability">ระบบสมาชิกยังไม่เปิดให้บริการผ่านเว็บไซต์</p>{loginMessage && <p className="form-message" role="status">{loginMessage}</p>}<ContactActions /></>}
        {dialog?.kind === "support" && <><div className="support-intro"><span className="support-icon"><Headphones /></span><div><h3>ให้เราช่วยดูแลคุณ</h3><p>สอบถามบริการเติมเกม บัตรเติมเงิน หรือแจ้งปัญหาการทำรายการกับทีมงาน Lovely Grand</p></div></div><div className="detail-note"><ShieldCheck size={24} /><p>หากต้องการแจ้งปัญหา เตรียมชื่อเกม รหัสผู้เล่น และหลักฐานการทำรายการ ไม่ต้องส่งรหัสผ่านหรือ OTP</p></div><ContactActions /></>}
        {dialog?.kind === "news" && <><div className="news-empty"><Newspaper size={46} /><h3>ติดตามข่าวสารและกิจกรรม</h3><p>ขณะนี้ยังไม่มีประกาศข่าวสารใหม่</p></div><button className="primary-button" onClick={() => openDialog({ kind: "promotion" })}><Sparkles size={20} />ดูโปรโมชั่น<ArrowRight size={18} /></button></>}
      </div>
    </dialog>
  </div>;
}
