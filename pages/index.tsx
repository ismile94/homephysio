import { useState, useEffect } from 'react';
import Head from 'next/head';

interface ServiceData {
  title: string;
  description: string;
  conditions: string[];
  treatments: string[];
}

const servicesData: Record<string, ServiceData> = {
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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState<ServiceData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [year, setYear] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
    
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const href = target.getAttribute('href');
        if (href) {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (window.innerWidth <= 968) {
              setMenuOpen(false);
            }
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const openModal = (serviceKey: string) => {
    setActiveService(servicesData[serviceKey]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveService(null);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setFormSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError(error instanceof Error ? error.message : 'An error occurred. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Head>
        <title>Home Physiotherapy Services UK</title>
        <meta name="description" content="HCPC registered physiotherapist providing specialist home physiotherapy across the UK. Neurological rehabilitation, post-operative care, falls prevention and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
          background: #ffffff;
        }

        nav {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #e8e8e8;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.25rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #2563eb;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }

        .nav-links a {
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: #2563eb;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-content h1 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 3.5rem;
          line-height: 1.15;
          margin-bottom: 1.5rem;
          font-weight: 500;
          color: #1e293b;
        }

        .hero-content .highlight {
          color: #2563eb;
        }

        .hero-content p {
          font-size: 1.25rem;
          color: #64748b;
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .credentials {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .credential-badge {
          background: #eff6ff;
          color: #1e40af;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid #bfdbfe;
        }

        .cta-button {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }

        .hero-image {
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .hero-image:hover img {
          transform: scale(1.05);
        }

        .trust-section {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          padding: 4rem 2rem;
        }

        .trust-container {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .trust-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border: 1px solid rgba(37, 99, 235, 0.1);
        }

        .trust-card:hover {
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.15);
          transform: translateY(-4px);
        }

        .trust-icon {
          font-size: 2.5rem;
          filter: drop-shadow(0 2px 4px rgba(37, 99, 235, 0.2));
        }

        .trust-card strong {
          color: #1e293b;
          font-size: 1.05rem;
        }

        .section-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem;
        }

        .section-title {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 2.75rem;
          margin-bottom: 1rem;
          font-weight: 500;
          color: #1e293b;
          text-align: center;
        }

        .section-subtitle {
          text-align: center;
          color: #64748b;
          font-size: 1.15rem;
          margin-bottom: 4rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .service-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          border: 2px solid #e2e8f0;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transform: scaleX(0);
          transition: transform 0.3s;
        }

        .service-card:hover::before {
          transform: scaleX(1);
        }

        .service-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 12px 32px rgba(37, 99, 235, 0.15);
          transform: translateY(-6px);
        }

        .service-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .service-card h3 {
          font-size: 1.4rem;
          margin-bottom: 0.75rem;
          font-weight: 600;
          color: #1e293b;
        }

        .service-card p {
          color: #64748b;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .service-card .click-hint {
          font-size: 0.9rem;
          color: #3b82f6;
          font-weight: 500;
        }

        .conditions-section {
          background: #f8fafc;
          padding: 6rem 2rem;
        }

        .conditions-grid {
          max-width: 1200px;
          margin: 3rem auto 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .condition-category {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          border: 2px solid #e2e8f0;
        }

        .condition-category h3 {
          color: #1e293b;
          font-size: 1.3rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .condition-category ul {
          list-style: none;
          padding: 0;
        }

        .condition-category li {
          padding: 0.5rem 0;
          color: #475569;
          border-bottom: 1px solid #f1f5f9;
        }

        .condition-category li:last-child {
          border-bottom: none;
        }

        .approach-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem;
        }

        .approach-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .approach-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          padding: 2.5rem;
          border-radius: 16px;
          border: 2px solid #e2e8f0;
        }

        .approach-card h3 {
          font-size: 1.5rem;
          color: #1e293b;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .approach-card p {
          color: #64748b;
          line-height: 1.8;
          margin-bottom: 1rem;
        }

        .approach-card ul {
          list-style: none;
          padding: 0;
        }

        .approach-card li {
          color: #475569;
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
        }

        .approach-card li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #3b82f6;
        }

        .process-section {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          padding: 6rem 2rem;
        }

        .process-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .process-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .process-step {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          text-align: center;
          position: relative;
          border: 2px solid #e2e8f0;
        }

        .process-number {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 auto 1rem;
        }

        .process-step h4 {
          font-size: 1.2rem;
          color: #1e293b;
          margin-bottom: 0.75rem;
        }

        .process-step p {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .faq-section {
          background: #f8fafc;
          padding: 6rem 2rem;
        }

        .faq-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .faq-item {
          background: white;
          margin-bottom: 1rem;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          overflow: hidden;
        }

        .faq-question {
          padding: 1.5rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          color: #1e293b;
          font-size: 1.1rem;
        }

        .faq-question:hover {
          background: #f8fafc;
        }

        .faq-answer {
          padding: 0 1.5rem 1.5rem;
          color: #64748b;
          line-height: 1.7;
          display: none;
        }

        .faq-answer.active {
          display: block;
        }

        .contact-section {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #f1f5f9;
          padding: 6rem 2rem;
        }

        .contact-container {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .contact-info h2 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .contact-info p {
          color: #cbd5e1;
          margin-bottom: 2.5rem;
          font-size: 1.15rem;
          line-height: 1.7;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.1rem;
        }

        .contact-item a {
          color: #f1f5f9;
          text-decoration: none;
        }

        .coverage-area {
          margin-top: 2rem;
          padding: 1.5rem;
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
        }

        .coverage-area h4 {
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .coverage-area p {
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .contact-form {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 1rem;
          margin-bottom: 1.25rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .contact-form textarea {
          min-height: 140px;
          resize: vertical;
        }

        .contact-form button {
          width: 100%;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 1rem;
          border: none;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .contact-form button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }

        .contact-form button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        footer {
          text-align: center;
          padding: 2.5rem;
          font-size: 0.95rem;
          color: #64748b;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        .modal {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 1000;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .modal.active {
          display: flex;
        }

        .modal-content {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          animation: modalFadeIn 0.3s ease;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-header h3 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 1.75rem;
          font-weight: 500;
          color: #1e293b;
        }

        .close-btn {
          background: #f1f5f9;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          line-height: 1;
          border-radius: 8px;
          transition: all 0.3s;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          background: #e2e8f0;
        }

        .modal-content > p {
          color: #64748b;
          margin-bottom: 1.25rem;
          font-weight: 500;
        }

        .modal-content ul {
          list-style: none;
          padding: 0;
        }

        .modal-content ul li {
          color: #475569;
          margin-bottom: 0.75rem;
          padding-left: 1.5rem;
          position: relative;
          line-height: 1.6;
        }

        .modal-content ul li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #3b82f6;
          font-weight: bold;
        }

        @media (max-width: 968px) {
          .hero {
            grid-template-columns: 1fr;
            padding: 4rem 1.5rem;
            gap: 3rem;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }

          .hero-image {
            height: 400px;
          }

          .contact-container,
          .approach-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .conditions-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .process-steps {
            grid-template-columns: repeat(2, 1fr);
          }

          .nav-links {
            display: none;
          }

          .menu-toggle {
            display: block;
          }

          .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem 2rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
        }

        @media (max-width: 640px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .hero-image {
            height: 300px;
          }

          .conditions-grid,
          .process-steps {
            grid-template-columns: 1fr;
          }

          .services-grid,
          .trust-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <nav>
        <div className="nav-container">
          <div className="logo">Home Physiotherapy Visit</div>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#approach">Our Approach</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Professional <span className="highlight">Home Physiotherapy</span></h1>
          <div className="credentials">
            <span className="credential-badge">HCPC Registered</span>
            <span className="credential-badge">MCSP Chartered</span>
            <span className="credential-badge">BSc (Hons) Physiotherapy</span>
          </div>
          <p>Delivering specialist, evidence-based physiotherapy care in the comfort and safety of your own home. Comprehensive rehabilitation programmes tailored to your individual needs and goals.</p>
          <a href="#contact" className="cta-button">
            <span>📅</span> Book Your Consultation
          </a>
        </div>
        <div className="hero-image">
          <img 
            src="/evhastasi.jpg" 
            alt="Home physiotherapy care"
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </section>

      <section className="trust-section">
        <div className="trust-container">
          <div className="trust-card">
            <span className="trust-icon">🛡️</span>
            <div>
              <strong>HCPC Registered</strong>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Health & Care Professions Council</p>
            </div>
          </div>
          <div className="trust-card">
            <span className="trust-icon">⚡</span>
            <div>
              <strong>Chartered Physiotherapist</strong>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Member of CSP (MCSP)</p>
            </div>
          </div>
          <div className="trust-card">
            <span className="trust-icon">🏠</span>
            <div>
              <strong>Home Visit Specialist</strong>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Fully Insured & DBS Checked</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-wrapper">
        <h2 className="section-title">Specialist Services</h2>
        <p className="section-subtitle">Comprehensive physiotherapy care across a wide range of conditions, delivered with expertise and compassion in your home environment</p>
        <div className="services-grid">
          <div className="service-card" onClick={() => openModal('neurological')}>
            <div className="service-icon">🧠</div>
            <h3>Neurological Physiotherapy</h3>
            <p>Specialist rehabilitation for neurological conditions including stroke, Parkinson's, MS, and brain injury. Focus on maximizing independence and quality of life.</p>
            <p className="click-hint">View conditions & treatments →</p>
          </div>
          <div className="service-card" onClick={() => openModal('geriatric')}>
            <div className="service-icon">👴</div>
            <h3>Geriatric Rehabilitation</h3>
            <p>Comprehensive care for older adults addressing frailty, osteoarthritis, reduced mobility, and post-hospital recovery. Evidence-based interventions to maintain independence.</p>
            <p className="click-hint">View conditions & treatments →</p>
          </div>
          <div className="service-card" onClick={() => openModal('postOp')}>
            <div className="service-icon">🏥</div>
            <h3>Post-operative Rehabilitation</h3>
            <p>Structured recovery programmes following joint replacements, spinal surgery, and orthopaedic procedures. Optimizing healing and restoring function safely.</p>
            <p className="click-hint">View conditions & treatments →</p>
          </div>
          <div className="service-card" onClick={() => openModal('balance')}>
            <div className="service-icon">⚖️</div>
            <h3>Balance & Falls Prevention</h3>
            <p>Targeted assessment and treatment for balance disorders, vestibular conditions, and recurrent falls. Building confidence and reducing fall risk.</p>
            <p className="click-hint">View conditions & treatments →</p>
          </div>
          <div className="service-card" onClick={() => openModal('msk')}>
            <div className="service-icon">🦴</div>
            <h3>Musculoskeletal Therapy</h3>
            <p>Treatment for back pain, neck pain, arthritis, and sports injuries. Manual therapy, exercise prescription, and pain management strategies.</p>
            <p className="click-hint">View conditions & treatments →</p>
          </div>
          <div className="service-card" onClick={() => openModal('respiratory')}>
            <div className="service-icon">🫁</div>
            <h3>Respiratory Physiotherapy</h3>
            <p>Breathing exercises, airway clearance techniques, and rehabilitation for COPD, post-COVID recovery, and chronic respiratory conditions.</p>
            <p className="click-hint">View conditions & treatments →</p>
          </div>
        </div>
      </section>

      <section className="conditions-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="section-title">Conditions We Treat</h2>
          <p className="section-subtitle">Expert physiotherapy for a comprehensive range of medical conditions</p>
        </div>
        <div className="conditions-grid">
          <div className="condition-category">
            <h3>🧠 Neurological</h3>
            <ul>
              <li>Stroke (CVA) Recovery</li>
              <li>Parkinson's Disease</li>
              <li>Multiple Sclerosis (MS)</li>
              <li>Motor Neurone Disease</li>
              <li>Brain & Spinal Cord Injury</li>
              <li>Peripheral Neuropathy</li>
              <li>Cerebral Palsy</li>
            </ul>
          </div>
          <div className="condition-category">
            <h3>🦴 Musculoskeletal</h3>
            <ul>
              <li>Lower Back Pain</li>
              <li>Neck Pain & Whiplash</li>
              <li>Osteoarthritis</li>
              <li>Rheumatoid Arthritis</li>
              <li>Sports Injuries</li>
              <li>Tendinopathies</li>
              <li>Ligament Sprains</li>
            </ul>
          </div>
          <div className="condition-category">
            <h3>🏥 Post-Surgical</h3>
            <ul>
              <li>Hip Replacement</li>
              <li>Knee Replacement</li>
              <li>Spinal Surgery</li>
              <li>Shoulder Surgery</li>
              <li>Fracture Rehabilitation</li>
              <li>ACL Reconstruction</li>
              <li>General Orthopaedic Surgery</li>
            </ul>
          </div>
          <div className="condition-category">
            <h3>⚖️ Balance & Mobility</h3>
            <ul>
              <li>Recurrent Falls</li>
              <li>Balance Disorders</li>
              <li>Vestibular Dysfunction</li>
              <li>Dizziness & Vertigo</li>
              <li>Gait Abnormalities</li>
              <li>Muscle Weakness</li>
              <li>Deconditioning</li>
            </ul>
          </div>
          <div className="condition-category">
            <h3>🫁 Respiratory</h3>
            <ul>
              <li>COPD Management</li>
              <li>Post-COVID Recovery</li>
              <li>Bronchiectasis</li>
              <li>Cystic Fibrosis</li>
              <li>Chronic Breathlessness</li>
              <li>Pneumonia Recovery</li>
              <li>Chest Infections</li>
            </ul>
          </div>
          <div className="condition-category">
            <h3>👴 Elderly Care</h3>
            <ul>
              <li>Frailty Syndrome</li>
              <li>Post-Hospital Discharge</li>
              <li>Reduced Mobility</li>
              <li>General Weakness</li>
              <li>End of Life Care</li>
              <li>Palliative Physiotherapy</li>
              <li>Age-Related Decline</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="approach" className="approach-section">
        <h2 className="section-title">Our Treatment Approach</h2>
        <p className="section-subtitle">Evidence-based physiotherapy combining clinical expertise with compassionate, patient-centered care</p>
        <div className="approach-grid">
          <div className="approach-card">
            <h3>Comprehensive Assessment</h3>
            <p>Every treatment begins with a thorough clinical assessment including:</p>
            <ul>
              <li>Detailed medical history review</li>
              <li>Functional movement analysis</li>
              <li>Strength and flexibility testing</li>
              <li>Balance and coordination evaluation</li>
              <li>Pain assessment and management</li>
              <li>Home environment safety review</li>
            </ul>
          </div>
          <div className="approach-card">
            <h3>Personalized Treatment Plans</h3>
            <p>Tailored rehabilitation programmes designed specifically for you:</p>
            <ul>
              <li>Goal-oriented therapy sessions</li>
              <li>Progressive exercise programmes</li>
              <li>Manual therapy techniques</li>
              <li>Education and self-management</li>
              <li>Equipment prescription if needed</li>
              <li>Regular progress monitoring</li>
            </ul>
          </div>
          <div className="approach-card">
            <h3>Evidence-Based Practice</h3>
            <p>Treatment grounded in the latest clinical research and best practices:</p>
            <ul>
              <li>Current NICE guidelines followed</li>
              <li>Neuroplasticity principles applied</li>
              <li>Task-specific training methods</li>
              <li>Functional rehabilitation focus</li>
              <li>Outcome measure tracking</li>
              <li>Continuous professional development</li>
            </ul>
          </div>
          <div className="approach-card">
            <h3>Holistic Care</h3>
            <p>Addressing all aspects of your health and wellbeing:</p>
            <ul>
              <li>Physical and psychological support</li>
              <li>Lifestyle and activity advice</li>
              <li>Pain management strategies</li>
              <li>Carer training and education</li>
              <li>MDT communication and liaison</li>
              <li>Long-term health promotion</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="process" className="process-section">
        <div className="process-container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">A simple, straightforward process from initial contact to ongoing care</p>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-number">1</div>
              <h4>Initial Contact</h4>
              <p>Call, email, or use our contact form to discuss your needs and book a free consultation.</p>
            </div>
            <div className="process-step">
              <div className="process-number">2</div>
              <h4>Assessment Visit</h4>
              <p>Comprehensive 60-minute assessment in your home to evaluate your condition and goals.</p>
            </div>
            <div className="process-step">
              <div className="process-number">3</div>
              <h4>Treatment Plan</h4>
              <p>Personalized rehabilitation programme developed collaboratively with clear, measurable objectives.</p>
            </div>
            <div className="process-step">
              <div className="process-number">4</div>
              <h4>Ongoing Care</h4>
              <p>Regular treatment sessions with continuous monitoring, adjustment, and support.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="faq-container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-item">
            <div className="faq-question" onClick={() => toggleFaq(0)}>
              Do I need a GP referral?
              <span>{openFaq === 0 ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${openFaq === 0 ? 'active' : ''}`}>
              No, you don't need a GP referral to access our home physiotherapy services. However, we're happy to liaise with your GP and other healthcare professionals involved in your care to ensure a coordinated approach.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question" onClick={() => toggleFaq(1)}>
              How long are treatment sessions?
              <span>{openFaq === 1 ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${openFaq === 1 ? 'active' : ''}`}>
              Initial assessments typically last 60 minutes, allowing comprehensive evaluation of your condition. Follow-up treatment sessions are usually 45-60 minutes, depending on your individual needs and treatment plan.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question" onClick={() => toggleFaq(2)}>
              How many sessions will I need?
              <span>{openFaq === 2 ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${openFaq === 2 ? 'active' : ''}`}>
              This varies depending on your condition, goals, and progress. Some patients benefit from intensive short-term treatment (6-8 weeks), while others require longer-term management. We'll discuss this during your initial assessment and review progress regularly.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question" onClick={() => toggleFaq(3)}>
              What are your fees?
              <span>{openFaq === 3 ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${openFaq === 3 ? 'active' : ''}`}>
              Initial assessment: £75 | Standard session (45-60 mins): £65 | We offer package discounts for block bookings. Payment can be made by cash or bank transfer.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question" onClick={() => toggleFaq(4)}>
              Which areas do you cover?
              <span>{openFaq === 4 ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${openFaq === 4 ? 'active' : ''}`}>
              We provide home visits across London and the Home Counties, with coverage extending to surrounding areas. Please contact us to confirm we can visit your location - we're often able to accommodate requests outside our standard coverage area.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question" onClick={() => toggleFaq(5)}>
              What should I prepare for my first visit?
              <span>{openFaq === 5 ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${openFaq === 5 ? 'active' : ''}`}>
              Please have any relevant medical reports, imaging results, or medication lists available. Wear comfortable clothing that allows movement. Ensure there's adequate space for assessment and exercises. Having a family member or carer present can be helpful for support and education.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question" onClick={() => toggleFaq(6)}>
              Are you insured and registered?
              <span>{openFaq === 6 ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${openFaq === 6 ? 'active' : ''}`}>
              Yes, I am fully registered with the Health and Care Professions Council (HCPC) and am a Chartered Member of the Chartered Society of Physiotherapy (CSP). I hold full Professional Liability Insurance (PLI) and have an enhanced DBS check.
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Ready to start your recovery journey? Contact me today to discuss your needs and arrange a free consultation. I'm here to answer any questions you may have.</p>
            <div className="contact-details">
              <div className="contact-item">
                <span>📞</span> <a href="tel:07466012234">07466 012234</a>
              </div>
              <div className="contact-item">
                <span>📧</span> <a href="mailto:ismailaram94@gmail.com">ismailaram94@gmail.com</a>
              </div>
            </div>
            <div className="coverage-area">
              <h4>📍 Service Areas</h4>
              <p>West and North London, East and West Berkshire, South Buckinghamshire and surrounding areas. Flexible appointment times available - contact us to discuss your preferred schedule.</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleFormSubmit}>
            {formError && (
              <div style={{ 
                padding: '1rem', 
                marginBottom: '1.5rem', 
                background: '#fee2e2', 
                color: '#991b1b', 
                borderRadius: '12px',
                border: '2px solid #ef4444',
                textAlign: 'center',
                fontWeight: 600
              }}>
                ⚠ {formError}
              </div>
            )}
            {formSubmitted && (
              <div style={{ 
                padding: '1rem', 
                marginBottom: '1.5rem', 
                background: '#d1fae5', 
                color: '#065f46', 
                borderRadius: '12px',
                border: '2px solid #10b981',
                textAlign: 'center',
                fontWeight: 600
              }}>
                ✓ Thank you! We'll get back to you within 24 hours.
              </div>
            )}
            <input 
              type="text" 
              name="name"
              placeholder="Your Name *" 
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
            <input 
              type="tel" 
              name="phone"
              placeholder="Phone Number *" 
              value={formData.phone}
              onChange={handleInputChange}
              required 
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              value={formData.email}
              onChange={handleInputChange}
            />
            <textarea 
              name="message"
              placeholder="Tell us about your condition and how we can help... *" 
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>We typically respond within 24 hours</p>
          </form>
        </div>
      </section>

      <footer>
        <p><strong>Ismail Aram BSc (Hons) MCSP – Chartered Physiotherapist</strong></p>
        <p style={{ marginTop: '0.5rem' }}>HCPC Registered | Professional Liability Insurance (PLI) | Enhanced DBS</p>
        <p style={{ marginTop: '1rem' }}>© {year} Ismail Aram Physiotherapy. All rights reserved.</p>
      </footer>

      {modalOpen && activeService && (
        <div className="modal active" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{activeService.title}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div>
              <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>{activeService.description}</p>
              
              <h4 style={{ color: '#1e293b', fontSize: '1.2rem', margin: '1.5rem 0 1rem', fontWeight: 600 }}>Conditions Treated:</h4>
              <ul>
                {activeService.conditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
              
              <h4 style={{ color: '#1e293b', fontSize: '1.2rem', margin: '1.5rem 0 1rem', fontWeight: 600 }}>Treatment Approaches:</h4>
              <ul>
                {activeService.treatments.map((treatment, index) => (
                  <li key={index}>{treatment}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
