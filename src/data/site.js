/**
 * Single source of truth for every piece of copy and imagery on the page.
 * Edit here rather than inside the components.
 *
 * Images are imported from `assets/optimized` - web-sized derivatives produced by
 * `scripts/optimize-images.ps1`. Re-run that script after replacing an original.
 */

import logo from "../assets/optimized/logo.png";

import platter from "../assets/optimized/download.jpg";
import jalebi from "../assets/optimized/download1.jpg";
import gulabJamun from "../assets/optimized/download2.jpg";

import sweetIcon from "../assets/optimized/sweet.jpg";
import savouriesIcon from "../assets/optimized/savouries.jpg";
import bakeryIcon from "../assets/optimized/bakery.jpg";
import othersIcon from "../assets/optimized/others.jpg";

import sweetMenu from "../assets/optimized/sweet-menu.jpg";
import savouriesMenu from "../assets/optimized/savouries-menu.jpg";
import bakeryMenu from "../assets/optimized/bakery-menu.jpg";
import othersMenu from "../assets/optimized/others-menu.jpg";

import poster1 from "../assets/optimized/board-light-1.jpg";
import poster2 from "../assets/optimized/board-light-2.jpg";
import poster3 from "../assets/optimized/board-light-3.jpg";
import poster5 from "../assets/optimized/board-light-5.jpg";

export { logo };

const whatsappNumber = "918940940435"; // country code + number, no symbols - required by wa.me
const whatsappMessage =
  "Hi City Bakery! I'd like to enquire about your sweets and snacks.";

export const business = {
  name: "City Bakery",
  tagline: "Sweets & Snacks",
  phone: "+91 89409 40435",
  phoneHref: "tel:+918940940435",
  email: "01citybakerysulur@gmail.com",
  emailHref: "mailto:01citybakerysulur@gmail.com",
  address: [
    "City Bakery Sweet & Snacks",
    "Trichy Rd, opp. Sulur Bus Stand",
    "Sulur, Tamil Nadu 641402",
  ],
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=City+Bakery+Sweet+%26+Snacks+Trichy+Rd+Sulur+Tamil+Nadu+641402",
  hours: "Monday to Sunday · Open 24/7",
  established: 1991,
  instagramHref: "https://www.instagram.com/citybakery_sulur/",
  whatsappHref: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
};

export const navLinks = [
  { id: "about", label: "About Us" },
  { id: "menu", label: "Menu" },
  { id: "best-sellers", label: "Best Sellers" },
  { id: "contact", label: "Contact Us" },
];

/** Hero slideshow - portrait food photography, shown in a 4:5 frame. */
export const heroSlides = [
  { src: platter, alt: "A wooden platter piled with assorted Indian sweets" },
  { src: jalebi, alt: "Freshly fried jalebi topped with pistachio" },
  { src: gulabJamun, alt: "Gulab jamun served in an ornate golden bowl" },
];

export const heroStats = [
  { value: "35+", label: "Years of service" },
  { value: "100+", label: "Sweets & snacks" },
  { value: "24/7", label: "Always open" },
];

/** Menu categories. `board` is the printed menu shown when a category is picked. */
export const categories = [
  {
    id: "sweet",
    name: "Sweets",
    icon: sweetIcon,
    iconAlt: "A brass plate of traditional Indian sweets",
    board: sweetMenu,
    boardAlt: "City Bakery sweets menu board",
  },
  {
    id: "savouries",
    name: "Savouries",
    icon: savouriesIcon,
    iconAlt: "A festive thali of murukku, laddu and mixture",
    board: savouriesMenu,
    boardAlt: "City Bakery savouries menu board",
  },
  {
    id: "bakery",
    name: "Bakery Items",
    icon: bakeryIcon,
    iconAlt: "Assorted freshly baked goods",
    board: bakeryMenu,
    boardAlt: "City Bakery bakery items menu board",
  },
  {
    id: "others",
    name: "Others",
    icon: othersIcon,
    iconAlt: "Milkshakes in glass jars topped with cream",
    board: othersMenu,
    boardAlt: "City Bakery other items menu board",
  },
];

/** Best sellers. Each photo is matched to the sweet it actually shows. */
export const bestSellers = [
  {
    id: "jalebi",
    name: "Jalebi",
    desc: "Crisp golden spirals soaked in saffron syrup and finished with pistachio.",
    img: jalebi,
    alt: "A plate of hot jalebi garnished with pistachio",
    badge: "Most loved",
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    desc: "Soft milk dumplings simmered in warm cardamom and rose syrup.",
    img: gulabJamun,
    alt: "Gulab jamun in a decorative golden bowl",
    badge: "Festive favourite",
  },
  {
    id: "sweet-box",
    name: "Thean Mittai Box",
    desc: "Our signature assorted box - a little of every house speciality.",
    img: platter,
    alt: "An assorted box of Indian sweets on a wooden platter",
    badge: "Gift ready",
  },
];

export const aboutParagraphs = [
  "Established in 1991, we have served generations of families with authentic sweets and freshly prepared snacks for over 35 years, building a legacy rooted in taste, trust and tradition. What began as a small neighbourhood bakery has grown into a well-loved destination known for quality, consistency and a deep passion for craftsmanship.",
  "From the very beginning our mission has been simple - to create delicious, high-quality sweets and snacks using time-tested recipes and the finest ingredients. Every item we prepare reflects our commitment to preserving traditional flavours while maintaining the highest standards of hygiene and freshness.",
  "As we continue to grow, we remain committed to the values that started it all. We are honoured to be part of your celebrations and everyday indulgences, and we look forward to serving you for many more years to come.",
];

/** Brand posters shown alongside the story. */
export const aboutSlides = [
  { src: poster1, alt: "City Bakery rose milk, badam milk and ilaneer payasam" },
  { src: poster2, alt: "City Bakery seasonal specials poster" },
  { src: poster3, alt: "City Bakery signature range poster" },
  { src: poster5, alt: "City Bakery fresh bakes poster" },
];
