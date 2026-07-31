export interface ServiceData {
  title: string;
  description: string;
  conditions: string[];
  treatments: string[];
}

export const servicesData: Record<string, ServiceData> = {
  neurological: {
    title: "Neurological Physiotherapy",
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
    title: "Geriatric Rehabilitation",
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
    title: "Post-operative Rehabilitation",
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
    title: "Balance & Falls Prevention",
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
    title: "Musculoskeletal Physiotherapy",
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
    title: "Respiratory Physiotherapy",
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
