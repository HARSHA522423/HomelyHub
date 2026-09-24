import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Globe2,
  HandHeart,
  HeartHandshake,
  House,
  Landmark,
  LifeBuoy,
  LockKeyhole,
  MessageCircle,
  PartyPopper,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  WalletCards,
} from "lucide-react";
import "../css/InfoPage.css";

const infoSections = {
  help: {
    eyebrow: "Support for every stay",
    title: "Help Center",
    description: "Find answers about booking stays, managing reservations, and using HomelyHub.",
    icon: LifeBuoy,
    heroNote: "A little guidance goes a long way. Start with the topic that matches your question.",
    cards: [
      { icon: Search, title: "Find a stay", text: "Search destinations, dates, guests, and amenities with confidence." },
      { icon: CalendarClock, title: "Manage reservations", text: "Review booking details, dates, and next steps in one place." },
      { icon: MessageCircle, title: "Account support", text: "Get help with your profile, payments, and travel plans." },
    ],
    sectionTitle: "Popular help topics",
    sectionIntro: "Quick answers for the moments guests and hosts ask about most.",
    list: [
      { icon: BookOpen, title: "Before you book", text: "Compare property details, amenities, house rules, and location information." },
      { icon: WalletCards, title: "After you book", text: "Keep your confirmation details handy and contact your host through the right channels." },
      { icon: CheckCircle2, title: "When plans change", text: "Review your reservation terms before changing dates or cancelling a stay." },
    ],
    faqs: [
      ["How do I find my booking details?", "Open My Bookings from your profile menu to review upcoming and past reservations."],
      ["Can I update my account details?", "Yes. Visit your profile to update your name, contact information, and account preferences."],
      ["Where can I get help during a stay?", "Start with your reservation details and contact the host or HomelyHub support for next steps."],
    ],
    action: { label: "Explore stays", to: "/" },
  },
  safety: {
    eyebrow: "Travel with confidence",
    title: "AirCover & Safety",
    description: "Learn about verified stays, safety guidance, and support during your HomelyHub journey.",
    icon: ShieldCheck,
    heroNote: "Thoughtful tools and clear information help every stay feel more comfortable.",
    cards: [
      { icon: BadgeCheck, title: "Verified stays", text: "Discover listings with clear details, photos, and host information." },
      { icon: LockKeyhole, title: "Secure booking", text: "Keep your reservation and payment conversations within HomelyHub." },
      { icon: HandHeart, title: "Stay support", text: "Know where to turn if something changes before or during your trip." },
    ],
    sectionTitle: "Simple safety habits",
    sectionIntro: "A few small checks can make a meaningful difference to your travel experience.",
    list: [
      { icon: ClipboardCheck, title: "Review the listing", text: "Read house rules, cancellation terms, amenities, and guest reviews before booking." },
      { icon: MessageCircle, title: "Keep communication clear", text: "Use HomelyHub messaging for important booking details and arrangements." },
      { icon: ShieldCheck, title: "Ask when unsure", text: "Reach out to your host or support team when something does not match your reservation." },
    ],
    faqs: [
      ["What should I check before arrival?", "Confirm the address, check-in instructions, host contact details, and any property-specific rules."],
      ["How does HomelyHub support guests?", "We help connect guests and hosts, provide booking information, and guide you when a reservation needs attention."],
      ["What if a stay is not as described?", "Document the issue and contact support promptly through your booking details so the right next step can be assessed."],
    ],
    action: { label: "Find a verified stay", to: "/" },
  },
  cancellation: {
    eyebrow: "Plans can change",
    title: "Cancellation options",
    description: "Review cancellation details and understand how reservation changes are handled.",
    icon: CalendarClock,
    heroNote: "The policy attached to each reservation is the best source for your exact dates and refund terms.",
    cards: [
      { icon: Sparkles, title: "Flexible", text: "Often allows a fuller refund when you cancel within the stated window." },
      { icon: CalendarClock, title: "Moderate", text: "Balances flexibility for guests with planning certainty for hosts." },
      { icon: Landmark, title: "Strict", text: "Offers limited refunds after the policy deadline, so check before booking." },
    ],
    sectionTitle: "What happens after cancellation",
    sectionIntro: "Your reservation flow stays clear from the first change to the final confirmation.",
    list: [
      { icon: ClipboardCheck, title: "Check your policy", text: "Open the reservation and review the cancellation terms shown for your booking." },
      { icon: MessageCircle, title: "Confirm the change", text: "Follow the cancellation steps and keep the confirmation message for your records." },
      { icon: WalletCards, title: "Track your refund", text: "Any eligible refund follows the payment method and timing shown in your reservation details." },
    ],
    faqs: [
      ["Where can I see my cancellation policy?", "Your reservation details show the policy that applies to the dates and property you booked."],
      ["When will an eligible refund arrive?", "Refund timing can vary by payment provider. Check the confirmation details for the expected timing."],
      ["Can I change dates instead of cancelling?", "Date changes depend on availability and host policy. Review your booking and contact the host when appropriate."],
    ],
    action: { label: "View my bookings", to: "/user/mybookings" },
  },
  resources: {
    eyebrow: "For thoughtful hosts",
    title: "Hosting resources",
    description: "Get practical guidance for listing your home and creating a welcoming guest experience.",
    icon: House,
    heroNote: "A well-prepared listing helps the right guests find your space and arrive with confidence.",
    cards: [
      { icon: Sparkles, title: "Start with the basics", text: "Share accurate details, strong photos, and the essentials guests need." },
      { icon: Star, title: "Create a great listing", text: "Set clear expectations and highlight what makes your space special." },
      { icon: HeartHandshake, title: "Welcome guests well", text: "Small touches, quick communication, and consistency build trust." },
    ],
    sectionTitle: "Hosting checklist",
    sectionIntro: "Use this simple rhythm to prepare your space and support every arrival.",
    list: [
      { icon: ClipboardCheck, title: "Prepare your space", text: "Check cleanliness, essentials, access instructions, and safety details before every stay." },
      { icon: BookOpen, title: "Set expectations", text: "Keep amenities, house rules, availability, and cancellation terms accurate and easy to understand." },
      { icon: MessageCircle, title: "Stay responsive", text: "Answer questions clearly and share helpful arrival information at the right time." },
    ],
    faqs: [
      ["What makes a listing stand out?", "Accurate photos, complete amenities, thoughtful descriptions, and clear house rules help guests choose confidently."],
      ["How should I prepare for a guest?", "Use the checklist above, confirm access details, and make sure the space matches the listing."],
      ["Where do I manage my accommodations?", "Use Manage accommodations from the footer or your profile navigation to review your listings."],
    ],
    action: { label: "List your home", to: "/accomodationform" },
  },
  about: {
    eyebrow: "The HomelyHub story",
    title: "About us",
    description: "HomelyHub helps travelers discover authentic, comfortable stays across India.",
    icon: Globe2,
    heroNote: "We believe the best journeys leave room for local connection, comfort, and a sense of belonging.",
    cards: [
      { icon: Globe2, title: "Local discovery", text: "Find stays that help you experience more of the places you visit." },
      { icon: Users, title: "People first", text: "Build better travel moments for guests, hosts, and local communities." },
      { icon: HeartHandshake, title: "Stay with meaning", text: "Make every booking feel more personal, considered, and welcoming." },
    ],
    sectionTitle: "Why HomelyHub exists",
    sectionIntro: "Travel should feel more human than a transaction. Our platform brings useful tools and genuine hospitality together.",
    list: [
      { icon: Target, title: "Make discovery easier", text: "Bring stays, practical details, and travel planning into one calm experience." },
      { icon: HandHeart, title: "Support real hosting", text: "Give hosts a clear way to share their spaces and create memorable stays." },
      { icon: Sparkles, title: "Keep improving the journey", text: "Design thoughtful experiences that make planning and arriving feel simpler." },
    ],
    stats: [
      ["01", "Guest-first design"],
      ["02", "Trusted local stays"],
      ["24/7", "Travel support mindset"],
    ],
    action: { label: "Explore HomelyHub", to: "/" },
  },
  careers: {
    eyebrow: "Build what comes next",
    title: "Careers",
    description: "Build the future of meaningful travel with the HomelyHub team.",
    icon: BriefcaseBusiness,
    heroNote: "We are curious, practical, and committed to making travel feel more personal for everyone.",
    cards: [
      { icon: Users, title: "People who care", text: "Work with thoughtful teammates who value craft, clarity, and kindness." },
      { icon: Target, title: "Meaningful problems", text: "Help guests and hosts make better decisions at every step of a journey." },
      { icon: PartyPopper, title: "Room to grow", text: "Bring your perspective, learn quickly, and help shape how we work." },
    ],
    sectionTitle: "Where you could make an impact",
    sectionIntro: "Our work spans the product, people, and operations that make a stay feel seamless.",
    list: [
      { icon: Sparkles, title: "Product and engineering", text: "Create dependable tools that make discovery, booking, and hosting easier." },
      { icon: MessageCircle, title: "Guest and host experience", text: "Help people feel informed, supported, and welcome throughout their journey." },
      { icon: Globe2, title: "Operations and growth", text: "Build the partnerships and systems that help HomelyHub reach more travelers." },
    ],
    stats: [
      ["Care", "In how we work"],
      ["Craft", "In what we build"],
      ["Curiosity", "In how we learn"],
    ],
    action: { label: "Start a conversation", to: "mailto:careers@homelyhub.com" },
  },
};

const InfoPage = () => {
  const { section } = useParams();
  const content = infoSections[section] || infoSections.help;
  const [openFaq, setOpenFaq] = useState(null);
  const HeroIcon = content.icon;

  return (
    <main className="info-page">
      <div className="info-page-shell">
        <section className="info-hero">
          <div className="info-hero-copy">
            <p className="info-page-eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="info-page-description">{content.description}</p>
            <div className="info-hero-actions">
              <Link to={content.action.to} className="info-primary-action">
                {content.action.label}
                <ArrowRight size={17} />
              </Link>
              <Link to="/" className="info-page-link">Back to home</Link>
            </div>
          </div>
          <div className="info-hero-art" aria-hidden="true">
            <div className="info-hero-icon"><HeroIcon size={42} strokeWidth={1.7} /></div>
            <span className="info-hero-note">{content.heroNote}</span>
          </div>
        </section>

        <section className="info-card-grid" aria-label={`${content.title} highlights`}>
          {content.cards.map(({ icon: CardIcon, title, text }) => (
            <article className="info-feature-card" key={title}>
              <div className="info-card-icon">{React.createElement(CardIcon, { size: 21 })}</div>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="info-section-block">
          <div className="info-section-heading">
            <p className="info-page-eyebrow">A useful place to start</p>
            <h2>{content.sectionTitle}</h2>
            <p>{content.sectionIntro}</p>
          </div>
          <div className="info-list-grid">
            {content.list.map(({ icon: ListIcon, title, text }) => (
              <article className="info-list-item" key={title}>
                {React.createElement(ListIcon, { size: 20, className: "info-list-icon" })}
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {content.stats && (
          <section className="info-stats-row" aria-label={`${content.title} highlights`}>
            {content.stats.map(([value, label]) => (
              <div className="info-stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </section>
        )}

        {content.faqs && (
          <section className="info-faq-section">
            <div className="info-section-heading">
              <p className="info-page-eyebrow">Need a little more clarity?</p>
              <h2>Frequently asked questions</h2>
            </div>
            <div className="info-faq-list">
              {content.faqs.map(([question, answer], index) => {
                const isOpen = openFaq === index;
                return (
                  <div className={`info-faq-item ${isOpen ? "is-open" : ""}`} key={question}>
                    <button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}>
                      <span>{question}</span>
                      <ChevronDown size={18} />
                    </button>
                    {isOpen && <p>{answer}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="info-cta-band">
          <div>
            <p className="info-page-eyebrow">Ready when you are</p>
            <h2>{section === "careers" ? "Bring your best work to HomelyHub." : "Make your next step feel simple."}</h2>
          </div>
          <Link to={content.action.to} className="info-primary-action">
            {content.action.label}
            <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </main>
  );
};

export default InfoPage;
