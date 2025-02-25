import { Film, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export const contentTypes = [
  {
    title: "YouTube Video Description",
    slug: "youtube-description",
    icon: Youtube,
    description: "Generate engaging video descriptions",
    color: "content-youtube",
    aiPrompt: "Generate a YouTube video description based on the provided title and outline.",
    form: [
      { label: "Video Title", field: "input", required: true },
      { label: "Description Outline", field: "textarea" },
    ],
  },
  {
    title: "Instagram Caption",
    slug: "instagram-caption",
    icon: Instagram,
    description: "Create captivating Instagram captions",
    color: "content-instagram",
    aiPrompt: "Generate an Instagram caption based on the provided niche and key message.",
    form: [
      { label: "Post Niche", field: "input", required: true },
      { label: "Main Message", field: "textarea" },
    ],
  },
  {
    title: "LinkedIn Post",
    slug: "linkedin-post",
    icon: Linkedin,
    description: "Write professional LinkedIn content",
    color: "content-linkedin",
    aiPrompt: "Generate a LinkedIn post idea based on the provided niche and key talking points.",
    form: [
      { label: "Post Niche", field: "input", required: true },
      { label: "Key Talking Points", field: "textarea" },
    ],
  },
  {
    title: "Tweet Thread",
    slug: "tweet-thread",
    icon: Twitter,
    description: "Compose engaging tweet threads",
    color: "content-twitter",
    aiPrompt: "Generate a Twitter thread based on the given topic and outline.",
    form: [
      { label: "Thread Topic", field: "input", required: true },
      { label: "Additional Context", field: "textarea" },
    ],
  },
  {
    title: "TikTok Script",
    slug: "tiktok-script",
    icon: Film,
    description: "Write viral TikTok video scripts",
    color: "content-tiktok",
    aiPrompt: "Generate a TikTok video script based on the provided niche and key points.",
    form: [
      { label: "Video Niche", field: "input", required: true },
      { label: "Main Content Outline", field: "textarea" },
    ],
  },
];

export const categories = [
  { name: "All", value: "All" },
  { name: "YouTube", value: "YouTube" },
  { name: "Instagram", value: "Instagram" },
  { name: "TikTok", value: "TikTok" },
  { name: "LinkedIn", value: "LinkedIn" },
  { name: "Twitter", value: "Tweet" },
];

export const templateIcons: Record<string, any> = {
  "YouTube Video Description": Youtube,
  "Instagram Caption": Instagram,
  "LinkedIn Post": Linkedin,
  "Tweet Thread": Twitter,
  "TikTok Script": Film,
};

export const templateColors: Record<
  string,
  { gradient: string; text: string }
> = {
  "YouTube Video Description": {
    gradient: "gradient-youtube",
    text: "text-youtube",
  },
  "Instagram Caption": {
    gradient: "gradient-instagram",
    text: "text-instagram",
  },
  "LinkedIn Post": {
    gradient: "gradient-linkedin",
    text: "text-linkedin",
  },
  "Tweet Thread": {
    gradient: "gradient-twitter",
    text: "text-twitter",
  },
  "TikTok Script": {
    gradient: "gradient-tiktok",
    text: "text-tiktok",
  },
};

export const externalLinks: Record<string, { url: string; label: string }> = {
  "YouTube Video Description": {
    url: "https://youtube.com/upload",
    label: "Open YouTube Studio",
  },
  "Instagram Caption": {
    url: "https://www.instagram.com",
    label: "Open Instagram",
  },
  "LinkedIn Post": {
    url: "https://www.linkedin.com/feed/",
    label: "Open LinkedIn",
  },
  "Tweet Thread": {
    url: "https://twitter.com/compose/tweet",
    label: "Open Twitter",
  },
  "TikTok Script": {
    url: "https://www.tiktok.com/upload",
    label: "Open TikTok",
  },
};

export const pointPackages = [
  {
    name: "Starter Pack",
    description: "Perfect for small projects",
    points: "500",
    bonus: "0",
    price: "$5",
    features: [
      "Valid for 3 months",
      "Basic templates",
      "Standard generation speed",
      "Email support",
    ],
    popular: false,
    button: {
      text: "Purchase Points",
      disabled: false,
    },
  },
  {
    name: "Pro Pack",
    description: "Most popular choice",
    points: "1,200",
    bonus: "200",
    price: "$10",
    features: [
      "Valid for 6 months",
      "All premium templates",
      "Priority generation speed",
      "24/7 Priority support",
    ],
    popular: true,
    button: {
      text: "Purchase Points",
      disabled: false,
    },
  },
];