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
    answer: `Initial assessment: ${site.fees.assessment} | Follow-up session (45-60 mins): ${site.fees.session} | We offer package discounts for block bookings. Payment can be made directly by cash, bank transfer, or card.`,
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

/**
 * Questions specific to each service landing page, keyed by service slug.
 * Shown above the shared fee/referral/coverage questions on that page and
 * emitted in its FAQPage markup, so every service page carries Q&A content
 * that no other page has.
 */
export const serviceFaqs: Record<string, Faq[]> = {
  'neurological-physiotherapy': [
    {
      question: 'Can you help with stroke rehabilitation at home?',
      answer:
        'Yes. After a stroke I assess movement, balance, arm and hand function and walking in your own home, then set practical goals such as getting in and out of bed, managing the stairs or making a drink. Practising tasks where you actually do them helps progress carry over into daily life, and family members or carers can learn the exercises too.',
    },
    {
      question: "Do you treat Parkinson's and multiple sclerosis?",
      answer:
        "Yes. For Parkinson's the focus is usually walking, freezing, turning, balance and getting up from a chair; for MS it is strength, fatigue management, spasticity and mobility. Programmes are adjusted as symptoms change, and I can work alongside your neurologist, specialist nurse or GP.",
    },
  ],
  'elderly-physiotherapy': [
    {
      question: 'Can you coordinate with my GP or care team?',
      answer:
        'Yes. With your consent I can share assessment findings and progress with your GP, community nurses, occupational therapist or care agency, and suggest equipment or onward referrals where they would help. Family members and carers are welcome at visits so everyone follows the same plan.',
    },
    {
      question: 'Can you help an older relative after a hospital stay?',
      answer:
        'Yes. Many older adults lose strength and confidence after time in hospital. I start with a full home assessment of walking, transfers, stairs and falls risk, then build a programme to rebuild strength and independence in their own surroundings, at a pace that suits them.',
    },
  ],
  'post-operative-rehabilitation': [
    {
      question: 'How soon after surgery can home physiotherapy start?',
      answer:
        "Usually within the first days or weeks of getting home, depending on the operation and your surgeon's instructions. I follow your surgical team's protocol, including any movement or weight-bearing restrictions, and progress the programme as you recover.",
    },
    {
      question: 'Do you provide physiotherapy after hip or knee replacement?',
      answer:
        'Yes, hip and knee replacement rehabilitation is one of the most common reasons for home visits. Treatment covers swelling and pain management, range of movement, strengthening, walking with or without aids, and practising stairs and getting in and out of a chair, car or bath safely.',
    },
  ],
  'falls-prevention-physiotherapy': [
    {
      question: 'How many sessions does vestibular rehab take?',
      answer:
        "It depends on the cause. BPPV often settles within one to three sessions using repositioning manoeuvres such as the Epley manoeuvre. Other vestibular problems, such as vestibular neuritis, usually need a home exercise programme over several weeks (commonly around 6 to 8), with visits to progress the exercises. I'll give you a clearer estimate after the first assessment.",
    },
    {
      question: 'What happens in a falls risk assessment at home?',
      answer:
        'I look at your strength, balance, walking, footwear, previous falls and any dizziness, then check your home for hazards such as loose rugs, poor lighting and stairs. You get a personalised strength and balance programme plus practical changes to reduce your risk of falling.',
    },
  ],
  'musculoskeletal-physiotherapy': [
    {
      question: 'Can physiotherapy at home help with back pain?',
      answer:
        "Yes. Most back pain responds well to a combination of advice, hands-on treatment and graded exercise, all of which can be delivered at home. I assess how the pain affects your daily activities and build a plan to reduce it and get you moving with confidence. If anything needs further investigation, I'll advise you to see your GP.",
    },
    {
      question: 'Do I need a scan before musculoskeletal physiotherapy?',
      answer:
        "Usually not. Most back, neck and joint problems can be assessed clinically without a scan. If your symptoms suggest a scan or specialist opinion is needed, I'll explain why and recommend you discuss it with your GP. If you already have scan results, please have them available at the first visit.",
    },
  ],
  'respiratory-physiotherapy': [
    {
      question: 'Can respiratory physiotherapy help with COPD?',
      answer:
        'Yes. For COPD I teach breathing control and airway clearance techniques, help you manage breathlessness during everyday activities, and build a gentle exercise programme to improve stamina. Treatment complements, rather than replaces, the inhalers and medical care your GP or respiratory team provide.',
    },
    {
      question: 'Do you help with breathlessness after COVID-19 or a chest infection?',
      answer:
        'Yes. I assess your breathing pattern, energy levels and exercise tolerance, then introduce breathing exercises, pacing strategies and a gradual return to activity. If your symptoms are new or getting worse, contact your GP or NHS 111 first.',
    },
  ],
};
