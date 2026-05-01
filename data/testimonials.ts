export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Utsav delivered a complex scraping pipeline in 2 weeks flat. Clean code, clear communication, zero hand-holding needed.",
    name: "Rajesh Kumar",
    role: "CTO",
    company: "TechStart Solutions",
  },
  {
    quote:
      "His backend architecture for our job platform handled 10x the traffic we expected. Solid engineering.",
    name: "Priya Sharma",
    role: "Product Lead",
    company: "HireFlow",
  },
  {
    quote:
      "One of the few developers who genuinely understands both the code and the product. Ships fast, thinks deep.",
    name: "Ankit Patel",
    role: "Engineering Manager",
    company: "DataScale",
  },
];
