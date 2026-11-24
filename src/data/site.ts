// Site-wide content that is not part of the product catalog.

export const SITE = {
  name: 'Aeronix Machinery',
  tagline: 'Factory-direct food processing machines from Guangzhou, China.',
  description:
    'Factory-direct food processing machines from Guangzhou, China. Built to your voltage, tested on live video and shipped worldwide with installation help.',
  email: 'sale@aeronixmachinery.com',
  whatsappNumber: '8618062717283',
  whatsappDisplay: '+86 180 6271 7283',
  instagramUrl: 'https://www.instagram.com/aeronixmachineries/',
  instagramHandle: '@aeronixmachineries',
  ogImage: '/hero/hero-poster.jpg'
};

export const waLink = (text = 'Hello Aeronix, I would like to know more about your machines.') =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;

// Header row 2 / footer "Company" links. Anchors point at sections of the home page.
export const NAV = [
  { label: 'About', href: '/#about' },
  { label: 'How it works', href: '/#process' },
  { label: 'Shipping', href: '/#shipping' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '#quote' }
];

export const HERO_SLIDES = [
  {
    eyebrow: 'Factory-direct from Guangzhou, China',
    title: 'Food processing machines, straight from the factory.',
    text: 'Built to your voltage, tested on video, and shipped to your door anywhere in the world.',
    cta: { label: 'Get a free quote', href: '#quote' },
    video: true,
    image: '/hero/hero-poster.jpg',
    alt: 'Food processing machine running on the factory floor'
  },
  {
    eyebrow: 'Built for your kitchen or plant',
    title: 'Built to your voltage. Tested on video.',
    text: 'Your voltage, plug type and capacity, set up before it ships. Watch a live test run with your own product.',
    cta: { label: 'Browse machines', href: '/machines/' },
    image: '/images/site/hero-ovens.jpg',
    alt: 'Industrial deck oven and rotary rack oven in a bakery'
  },
  {
    eyebrow: 'Sea & air freight to any major port',
    title: 'Shipped to your door, anywhere in the world.',
    text: 'Export crating, all documents ready, and step-by-step installation help when it arrives.',
    cta: { label: 'How shipping works', href: '/#shipping' },
    image: '/images/site/hero-shipping.jpg',
    alt: 'Container ship docked at a port with cargo cranes'
  }
];

export const TICKER = [
  'Meat grinders', 'Dough mixers', 'Rack ovens', 'Snack extruders', 'Belt fryers', 'Noodle machines',
  'Pasta extruders', 'Nut roasters', 'Dumpling machines', 'Spiral freezers', 'Vegetable cutters', 'Fruit pulpers'
];

export const REASONS = [
  { icon: 'badge-dollar-sign', title: 'Factory pricing', body: 'Buy at the source, without middlemen adding their margin.' },
  { icon: 'sliders-horizontal', title: 'Built for you', body: 'Your voltage, plug type and capacity, set up before it ships.' },
  { icon: 'video', title: 'See it first', body: 'Watch a live video test run with your own product.' },
  { icon: 'heart-handshake', title: 'Real support', body: 'One friendly team from your first message to long after delivery.' }
];

export const STEPS = [
  { n: '01', title: 'Tell us your needs', body: 'Your product, daily output and budget.' },
  { n: '02', title: 'Get a quote', body: 'We match the right machine and factory.' },
  { n: '03', title: 'Watch it run', body: 'A live video test with your product.' },
  { n: '04', title: 'We build & pack', body: 'Quality checked and safely crated.' },
  { n: '05', title: 'Ship & set up', body: 'Delivered, with installation help.' }
];

export const SHIPPING = [
  { icon: 'ship', k: 'Sea & air freight', v: 'To any major port in the world. We arrange everything.' },
  { icon: 'package', k: 'Safe export packing', v: 'Strong wooden crates, built for long journeys.' },
  { icon: 'file-text', k: 'All documents ready', v: 'Invoice, packing list, bill of lading and certificate of origin.' },
  { icon: 'wrench', k: 'Installation help', v: 'Step-by-step video guidance, and engineer visits for full lines.' }
];

export const CASES = [
  { tag: 'Snack startup · Southeast Asia', title: 'From handmade to a full snack line', body: 'A small snack brand moved to an extruder line, matched to their recipe after a video test run.' },
  { tag: 'Central kitchen · Middle East', title: 'Faster prep for a restaurant group', body: 'A grinder, bowl cutter and meatball former now handle prep for every branch.' },
  { tag: 'Family bakery · Africa', title: 'Twice the bread, same small team', body: 'A mixer, divider and rack oven helped a family bakery take on wholesale orders.' }
];

export const FAQS = [
  { q: 'Can I order just one machine?', a: 'Yes. Many of our customers start with a single machine. We ship single units and full production lines.' },
  { q: 'Can the machine be built for my country’s voltage?', a: 'Yes. Tell us your voltage, phase and plug type, and the factory builds the machine to match.' },
  { q: 'How do I know the machine works before it ships?', a: 'We run the machine on live video for you, ideally with your own ingredients, so you see exactly what you are getting.' },
  { q: 'How long does delivery take?', a: 'Most machines are ready in 15–30 days. Shipping time depends on your port, and your quote will include a clear timeline.' },
  { q: 'What happens after the machine arrives?', a: 'You get an English manual, a spare parts kit and video installation guidance. We stay available on WhatsApp.' },
  { q: 'Do you work with distributors?', a: 'Yes. We supply distributors in many regions. Contact us to talk about volume pricing.' }
];
