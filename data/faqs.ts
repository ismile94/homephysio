import { coverageSentence, site } from './site';

export interface Faq {
  question: string;
  answer: string;
}

/**
 * Also emitted as FAQPage structured data (see components/Seo.tsx), so answers
 * must stay self-contained and factual — Google renders them verbatim as rich
 * results, and the on-page text must match the markup exactly.
 */
export const faqs: Faq[] = [
  {
    question: 'Do I need a GP referral?',
    answer:
      "No, you don't need a GP referral to access our home physiotherapy services. However, we're happy to liaise with your GP and other healthcare professionals involved in your care to ensure a coordinated approach.",
  },
  {
    question: 'How long are treatment sessions?',
    answer:
      'Initial assessments typically last 60 minutes, allowing comprehensive evaluation of your condition. Follow-up treatment sessions are usually 45-60 minutes, depending on your individual needs and treatment plan.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      "This varies depending on your condition, goals, and progress. Some patients benefit from intensive short-term treatment (6-8 weeks), while others require longer-term management. We'll discuss this during your initial assessment and review progress regularly.",
  },
  {
    question: 'What are your fees?',
    answer: `Initial assessment: ${site.fees.assessment} | Follow-up session (45-60 mins): ${site.fees.session} | We offer package discounts for block bookings. Payment can be made by cash, bank transfer, or card. Some private health insurance policies cover home physiotherapy - please check with your provider.`,
  },
  {
    question: 'Which areas do you cover?',
    answer: `We provide home physiotherapy visits across ${site.coverage.label}, covering ${coverageSentence()}. There is no clinic to travel to - every assessment and treatment session takes place in your own home. If you are just outside these areas, please get in touch with your postcode and we will confirm whether we can reach you.`,
  },
  {
    question: 'What should I prepare for my first visit?',
    answer:
      "Please have any relevant medical reports, imaging results, or medication lists available. Wear comfortable clothing that allows movement. Ensure there's adequate space for assessment and exercises. Having a family member or carer present can be helpful for support and education.",
  },
  {
    question: 'Are you insured and registered?',
    answer:
      'Yes, I am fully registered with the Health and Care Professions Council (HCPC) and am a Chartered Member of the Chartered Society of Physiotherapy (CSP). I hold full professional indemnity insurance and have an enhanced DBS check.',
  },
];
