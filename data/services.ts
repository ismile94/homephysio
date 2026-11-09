import type { IconName } from '@/components/Icon';

export interface ServiceData {
  /** Icon mark shown on the service card. */
  icon: IconName;
  title: string;
  /** URL segment for the service landing page: /services/{slug}. */
  slug: string;
  /** H1 / title-tag phrase for the landing page, written as people search. */
  headline: string;
  /** <title> for the landing page: unique per service, 60-70 characters, service + "at home" + area. */
  seoTitle: string;
  /** Meta description for the landing page: unique per service, 150-160 characters. */
  metaDescription: string;
  /** Why this treatment works well at home - unique copy for the landing page. */
  whyHome: string;
  /** Short card copy. `description` is the longer version used in the modal and schema. */
  blurb: string;
  description: string;
  conditions: string[];
  treatments: string[];
}

export const servicesData: Record<string, ServiceData> = {
  neurological: {
    icon: "neuro",
    title: "Neurological Physiotherapy",
    slug: "neurological-physiotherapy",
    headline: "Neurological physiotherapy at home",
    seoTitle: "Neurological Physiotherapy at Home | Manchester, Stockport & Cheshire",
    metaDescription: "Neurological physiotherapy at home for stroke, Parkinson's, MS and brain injury across Manchester, Stockport & Cheshire. HCPC-registered physio. No GP referral.",
    whyHome: "Practising walking, transfers and everyday tasks in your own home means the skills you rebuild are the ones you actually use - on your stairs, in your kitchen and around your furniture. It also spares you the fatigue of travelling to a clinic, which matters with stroke, MS and Parkinson's.",
    blurb: "Specialist rehabilitation for neurological conditions including stroke, Parkinson's, MS, and brain injury. Focus on maximizing independence and quality of life.",
    description: "Specialist neurological rehabilitation focusing on maximizing function, independence, and quality of life for patients with neurological conditions.",
    conditions: [
      "Stroke (CVA) - acute and chronic recovery",
      "Parkinson's Disease - movement and balance training",
      "Multiple Sclerosis (MS) - fatigue management and mobility",
      "Motor Neurone Disease (MND) - maintaining function and independence",
      "Brain Injury - cognitive and physical rehabilitation",
      "Spinal Cord Injury - functional training and adaptation",
      "Peripheral Neuropathy - sensory retraining and gait work"
    ],
    treatments: [
      "Neuroplasticity-based rehabilitation",
      "Task-specific training programmes",
      "Balance and coordination exercises",
      "Gait re-education and walking aids",
      "Upper limb functional training",
      "Spasticity management",
      "Fatigue management strategies"
    ]
  },
  geriatric: {
    icon: "elder",
    title: "Geriatric Rehabilitation",
    slug: "elderly-physiotherapy",
    headline: "Physiotherapy at home for older adults",
    seoTitle: "Elderly Physiotherapy at Home | Manchester, Stockport & Cheshire",
    metaDescription: "Home physiotherapy for older adults: frailty, falls, reduced mobility and recovery after hospital. Chartered physio visiting Manchester, Stockport & Cheshire.",
    whyHome: "For many older adults the journey to a clinic is the hardest part of physiotherapy. At home we work on getting in and out of a chair, managing the stairs and moving safely between rooms - and I can spot trip hazards and suggest simple changes or equipment.",
    blurb: "Comprehensive care for older adults addressing frailty, osteoarthritis, reduced mobility, and post-hospital recovery. Evidence-based interventions to maintain independence.",
    description: "Comprehensive physiotherapy for older adults, promoting healthy aging, maintaining independence, and improving quality of life.",
    conditions: [
      "Frailty Syndrome - strength and endurance building",
      "Osteoarthritis - pain management and joint mobility",
      "Reduced Mobility - progressive exercise programmes",
      "Deconditioning - post-hospital or illness recovery",
      "Post-Hospital Discharge - safe transition home",
      "General Age-Related Decline - preventative interventions"
    ],
    treatments: [
      "Progressive strength training",
      "Functional mobility exercises",
      "Balance and stability work",
      "Joint mobilization techniques",
      "Pain management strategies",
      "Home safety assessments",
      "Walking aid prescription and training"
    ]
  },
  postOp: {
    icon: "surgical",
    title: "Post-operative Rehabilitation",
    slug: "post-operative-rehabilitation",
    headline: "Rehabilitation at home after surgery",
    seoTitle: "Post-Op Physiotherapy at Home | Manchester, Stockport & Cheshire",
    metaDescription: "Home physiotherapy after hip or knee replacement, spinal or orthopaedic surgery. Chartered physio visiting Manchester, Stockport & Cheshire. No GP referral.",
    whyHome: "In the first weeks after surgery, getting to a clinic can be painful and impractical. Home visits let you start rehabilitation early, follow your surgeon's protocol and practise the real movements - stairs, bed, bath and car - that your recovery depends on.",
    blurb: "Structured recovery programmes following joint replacements, spinal surgery, and orthopaedic procedures. Optimizing healing and restoring function safely.",
    description: "Structured recovery programmes designed to optimize healing, restore function, and return you to your desired activities safely following surgery.",
    conditions: [
      "Hip Replacement - total and partial",
      "Knee Replacement - total and partial",
      "Spinal Surgery - discectomy, fusion, decompression",
      "Shoulder Surgery - rotator cuff, arthroplasty",
      "Orthopaedic Trauma - fracture fixation",
      "ACL Reconstruction - sport-specific rehab",
      "Fracture Rehabilitation - conservative and surgical"
    ],
    treatments: [
      "Post-surgical exercise protocols",
      "Progressive loading programmes",
      "Scar tissue mobilization",
      "Range of movement restoration",
      "Strength and conditioning",
      "Functional activity training",
      "Return to activity planning"
    ]
  },
  balance: {
    icon: "balance",
    title: "Balance & Falls Prevention",
    slug: "falls-prevention-physiotherapy",
    headline: "Balance & falls prevention physiotherapy at home",
    seoTitle: "Falls Prevention Physiotherapy at Home | Manchester & Cheshire",
    metaDescription: "Falls prevention physiotherapy at home: balance, vestibular rehab, strength and confidence for older adults in Manchester, Stockport & Cheshire. No GP referral.",
    whyHome: "Most falls happen at home, so that is the best place to assess and treat them. I look at how you move through your own rooms, check lighting, rugs and steps, and build a strength and balance programme you can keep doing between visits.",
    blurb: "Targeted assessment and treatment for balance disorders, vestibular conditions, and recurrent falls. Building confidence and reducing fall risk.",
    description: "Specialist assessment and treatment for balance disorders, reducing fall risk and building confidence in mobility.",
    conditions: [
      "Recurrent Falls - multi-factorial assessment",
      "Balance Disorders - various etiologies",
      "Vestibular Dysfunction - BPPV, vestibular neuritis",
      "Dizziness & Vertigo - symptom management",
      "Fear of Falling - confidence building",
      "Gait Abnormalities - biomechanical correction",
      "Muscle Weakness - targeted strengthening"
    ],
    treatments: [
      "Vestibular rehabilitation exercises",
      "Balance retraining programmes",
      "Epley maneuver for BPPV",
      "Strength and conditioning",
      "Environmental modification advice",
      "Walking aid assessment",
      "Fear avoidance therapy"
    ]
  },
  msk: {
    icon: "joint",
    title: "Musculoskeletal Physiotherapy",
    slug: "musculoskeletal-physiotherapy",
    headline: "Physiotherapy at home for back, neck & joint pain",
    seoTitle: "MSK Physiotherapy at Home: Back & Joint Pain | Manchester & Cheshire",
    metaDescription: "Home physiotherapy for back pain, neck pain, arthritis and joint injuries. Hands-on treatment and exercise plans across Manchester, Stockport & Cheshire.",
    whyHome: "Treating pain at home means no travel when moving is uncomfortable, and advice that fits your own desk, chair, bed and daily routine. Your exercise programme is set up with the space and equipment you already have.",
    blurb: "Treatment for back pain, neck pain, arthritis, and sports injuries. Manual therapy, exercise prescription, and pain management strategies.",
    description: "Evidence-based treatment for acute and chronic musculoskeletal pain and dysfunction, helping you return to normal activities.",
    conditions: [
      "Lower Back Pain - acute and chronic",
      "Neck Pain & Whiplash - trauma and postural",
      "Osteoarthritis - all major joints",
      "Rheumatoid Arthritis - inflammatory conditions",
      "Sports Injuries - strains, sprains, tendinopathies",
      "Shoulder Pain - rotator cuff, frozen shoulder",
      "Tendinopathies - Achilles, patellar, tennis elbow"
    ],
    treatments: [
      "Manual therapy techniques",
      "Joint mobilization and manipulation",
      "Soft tissue massage",
      "Exercise prescription",
      "Postural correction",
      "Ergonomic advice",
      "Pain neuroscience education"
    ]
  },
  respiratory: {
    icon: "lungs",
    title: "Respiratory Physiotherapy",
    slug: "respiratory-physiotherapy",
    headline: "Respiratory physiotherapy at home",
    seoTitle: "Respiratory Physiotherapy at Home | Manchester, Stockport & Cheshire",
    metaDescription: "Respiratory physiotherapy at home for COPD, post-COVID recovery and chronic breathlessness. Chartered physio visiting Manchester, Stockport & Cheshire.",
    whyHome: "Breathlessness makes travel tiring and stressful. At home we work on breathing control, airway clearance and gradually building your activity - with pacing advice that fits the routines and stairs of your own house.",
    blurb: "Breathing exercises, airway clearance techniques, and rehabilitation for COPD, post-COVID recovery, and chronic respiratory conditions.",
    description: "Specialist breathing and airway clearance techniques to improve respiratory function and quality of life.",
    conditions: [
      "COPD - chronic obstructive pulmonary disease",
      "Post-COVID Recovery - long COVID rehabilitation",
      "Bronchiectasis - airway clearance",
      "Cystic Fibrosis - ongoing management",
      "Chronic Breathlessness - symptom control",
      "Pneumonia Recovery - post-infection rehab",
      "Chest Infections - acute management"
    ],
    treatments: [
      "Breathing exercises and techniques",
      "Airway clearance methods",
      "Pulmonary rehabilitation programmes",
      "Energy conservation strategies",
      "Positioning for optimal breathing",
      "Exercise tolerance training",
      "Oxygen assessment and advice"
    ]
  }
};

export const serviceList: ServiceData[] = Object.values(servicesData);

export function serviceBySlug(slug: string): ServiceData | undefined {
  return serviceList.find((service) => service.slug === slug);
}
