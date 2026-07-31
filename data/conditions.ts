import type { IconName } from '@/components/Icon';

export interface ConditionGroup {
  icon: IconName;
  title: string;
  items: string[];
}

export const conditionGroups: ConditionGroup[] = [
  {
    icon: 'neuro',
    title: 'Neurological',
    items: [
      'Stroke (CVA) Recovery',
      "Parkinson's Disease",
      'Multiple Sclerosis (MS)',
      'Motor Neurone Disease',
      'Brain & Spinal Cord Injury',
      'Peripheral Neuropathy',
      'Cerebral Palsy',
    ],
  },
  {
    icon: 'joint',
    title: 'Musculoskeletal',
    items: [
      'Lower Back Pain',
      'Neck Pain & Whiplash',
      'Osteoarthritis',
      'Rheumatoid Arthritis',
      'Sports Injuries',
      'Tendinopathies',
      'Ligament Sprains',
    ],
  },
  {
    icon: 'surgical',
    title: 'Post-Surgical',
    items: [
      'Hip Replacement',
      'Knee Replacement',
      'Spinal Surgery',
      'Shoulder Surgery',
      'Fracture Rehabilitation',
      'ACL Reconstruction',
      'General Orthopaedic Surgery',
    ],
  },
  {
    icon: 'balance',
    title: 'Balance & Mobility',
    items: [
      'Recurrent Falls',
      'Balance Disorders',
      'Vestibular Dysfunction',
      'Dizziness & Vertigo',
      'Gait Abnormalities',
      'Muscle Weakness',
      'Deconditioning',
    ],
  },
  {
    icon: 'lungs',
    title: 'Respiratory',
    items: [
      'COPD Management',
      'Post-COVID Recovery',
      'Bronchiectasis',
      'Cystic Fibrosis',
      'Chronic Breathlessness',
      'Pneumonia Recovery',
      'Chest Infections',
    ],
  },
  {
    icon: 'elder',
    title: 'Elderly Care',
    items: [
      'Frailty Syndrome',
      'Post-Hospital Discharge',
      'Reduced Mobility',
      'General Weakness',
      'End of Life Care',
      'Palliative Physiotherapy',
      'Age-Related Decline',
    ],
  },
];

export interface ApproachCard {
  title: string;
  intro: string;
  points: string[];
}

export const approachCards: ApproachCard[] = [
  {
    title: 'Comprehensive Assessment',
    intro: 'Every treatment begins with a thorough clinical assessment including:',
    points: [
      'Detailed medical history review',
      'Functional movement analysis',
      'Strength and flexibility testing',
      'Balance and coordination evaluation',
      'Pain assessment and management',
      'Home environment safety review',
    ],
  },
  {
    title: 'Personalized Treatment Plans',
    intro: 'Tailored rehabilitation programmes designed specifically for you:',
    points: [
      'Goal-oriented therapy sessions',
      'Progressive exercise programmes',
      'Manual therapy techniques',
      'Education and self-management',
      'Equipment prescription if needed',
      'Regular progress monitoring',
    ],
  },
  {
    title: 'Evidence-Based Practice',
    intro: 'Treatment grounded in the latest clinical research and best practices:',
    points: [
      'Current NICE guidelines followed',
      'Neuroplasticity principles applied',
      'Task-specific training methods',
      'Functional rehabilitation focus',
      'Outcome measure tracking',
      'Continuous professional development',
    ],
  },
  {
    title: 'Holistic Care',
    intro: 'Addressing all aspects of your health and wellbeing:',
    points: [
      'Physical and psychological support',
      'Lifestyle and activity advice',
      'Pain management strategies',
      'Carer training and education',
      'MDT communication and liaison',
      'Long-term health promotion',
    ],
  },
];

export interface ProcessStep {
  title: string;
  body: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Initial Contact',
    body: 'Call, email, or use our contact form to discuss your needs and book a free consultation.',
  },
  {
    title: 'Assessment Visit',
    body: 'Comprehensive 60-minute assessment in your home to evaluate your condition and goals.',
  },
  {
    title: 'Treatment Plan',
    body: 'Personalized rehabilitation programme developed collaboratively with clear, measurable objectives.',
  },
  {
    title: 'Ongoing Care',
    body: 'Regular treatment sessions with continuous monitoring, adjustment, and support.',
  },
];

/** Trust markers shown under the hero. */
export const trustPoints = [
  { icon: 'shield' as IconName, title: 'HCPC Registered', body: 'Health & Care Professions Council' },
  { icon: 'chartered' as IconName, title: 'Chartered Physiotherapist', body: 'Member of CSP (MCSP)' },
  { icon: 'home' as IconName, title: 'Home Visit Specialist', body: 'Fully Insured & DBS Checked' },
];
