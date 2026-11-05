// Single source for all Google Ads text. Edit here, then run from the project root:
//   node google-ads/ad-copy/build.mjs
// It checks every Google character limit and regenerates the CSV files
// (Google Ads Editor import format) and ad-copy.md (for copy-pasting in the web UI).

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://www.physiovisit.co.uk';
const CAMPAIGN = 'Search - Home Physio - Manchester & Cheshire';

const LIMITS = { headline: 30, description: 90, path: 15, sitelink: 25, sitelinkLine: 35, callout: 25, snippet: 25 };

const shared = {
  headlines: [
    'Chartered Physiotherapist',
    'HCPC Registered Physio',
    'No GP Referral Needed',
    'Reply Within 24 Hours',
    'Fully Insured & DBS Checked',
    'Book a Home Visit Today',
    'Initial Assessment £100',
    'No Travel, No Waiting Room',
  ],
};

const adGroups = [
  {
    name: 'Home Physio - General',
    url: `${SITE}/`,
    path: ['home-physio', 'manchester'],
    headlines: [
      'Home Physiotherapy Manchester',
      'Physio Visits in Your Home',
      'Stockport & Cheshire Visits',
      'Mobile Physio Near You',
      'One-to-One Home Sessions',
      'Same Physio Every Visit',
      'Personal Home Exercise Plan',
    ],
    descriptions: [
      'Chartered, HCPC registered physiotherapist visiting you at home in Manchester & Cheshire.',
      'No travel, no waiting room. One-to-one treatment and a plan built around your own home.',
      'Initial assessment £100, follow-up £90. No GP referral needed. Message or call today.',
      'Stockport, Altrincham, Sale, Wilmslow, Macclesfield & more. Fully insured, DBS checked.',
    ],
    keywords: [
      'home physiotherapy', 'home physio', 'mobile physiotherapist', 'mobile physio',
      'physiotherapist home visit', 'physio home visit', 'physiotherapy at home', 'physio at home',
      'home visit physiotherapist', 'domiciliary physiotherapy', 'private physiotherapist home visits',
      'physio that comes to your home', 'physiotherapist who comes to your house',
    ],
    townKeywords: ['home physio', 'mobile physio', 'physiotherapist home visit', 'home physiotherapy'],
  },
  {
    name: 'Elderly Physio',
    url: `${SITE}/services/elderly-physiotherapy`,
    path: ['elderly', 'home-visits'],
    headlines: [
      'Physio at Home for Elderly',
      'Elderly Physio Manchester',
      'Gentle Rehab for Older Adults',
      'Stay Mobile & Independent',
      'Physio for Mum or Dad at Home',
      'Strength & Mobility at Home',
      'Help After Hospital Discharge',
    ],
    descriptions: [
      'Home physiotherapy for older adults: strength, mobility and confidence in their own home.',
      'Frailty, arthritis or recovery after hospital - gentle one-to-one sessions, no travel.',
      'Chartered & HCPC registered. No GP referral needed. Covering Manchester & Cheshire.',
      'Practise chairs, stairs and walking where it matters most. We reply within 24 hours.',
    ],
    keywords: [
      'elderly physiotherapy at home', 'physiotherapy for elderly at home', 'physio for elderly',
      'home physio for elderly', 'physiotherapist for elderly parent', 'frailty physiotherapy',
      'physio after hospital discharge', 'physio for older adults', 'geriatric physiotherapy',
      'elderly mobility physiotherapist',
    ],
  },
  {
    name: 'Falls & Balance',
    url: `${SITE}/services/falls-prevention-physiotherapy`,
    path: ['falls', 'balance'],
    headlines: [
      'Falls Prevention Physio',
      'Balance Training at Home',
      'Worried About a Fall?',
      'Confidence on Your Feet',
      'Balance Physio Manchester',
      'Advice on Home Trip Hazards',
      'Dizziness & Vertigo Physio',
    ],
    descriptions: [
      'Most falls happen at home, so that is where we assess and treat balance and strength.',
      'Tailored balance programme plus advice on rugs, lighting and stairs in your own home.',
      'Chartered & HCPC registered physio. No GP referral. Manchester, Stockport & Cheshire.',
      'Help for recurrent falls, fear of falling, dizziness and BPPV. Reply within 24 hours.',
    ],
    keywords: [
      'falls prevention physiotherapy', 'falls prevention physio', 'balance physiotherapy',
      'balance physio', 'physio for balance problems', 'falls rehabilitation', 'physio after a fall',
      'vestibular physiotherapy', 'vertigo physiotherapist', 'bppv physio',
    ],
  },
  {
    name: 'Neuro & Stroke',
    url: `${SITE}/services/neurological-physiotherapy`,
    path: ['neuro', 'stroke-rehab'],
    headlines: [
      'Stroke Physio at Home',
      'Neuro Physio Manchester',
      "Parkinson's & MS Physio",
      'Stroke Rehab in Your Home',
      'Neurological Physiotherapy',
      'Practise Where You Live',
      'Less Fatigue, No Travel',
    ],
    descriptions: [
      "Neuro physiotherapy at home for stroke, Parkinson's, MS and brain injury recovery.",
      'Rebuild walking, transfers and daily tasks on your own stairs and in your own kitchen.',
      'Chartered & HCPC registered. No GP referral needed. Manchester, Stockport & Cheshire.',
      'Home visits spare you the tiring trip to a clinic. Message or call - reply in 24 hours.',
    ],
    keywords: [
      'neuro physiotherapy', 'neurological physiotherapy', 'neuro physio at home',
      'stroke physiotherapy at home', 'stroke rehabilitation at home', 'stroke physio',
      'private stroke rehab', 'parkinsons physiotherapy', 'ms physiotherapy',
      'physio for multiple sclerosis', 'brain injury physiotherapy', 'private neuro physio',
    ],
  },
  {
    name: 'Post-Op Rehab',
    url: `${SITE}/services/post-operative-rehabilitation`,
    path: ['post-op', 'rehab'],
    headlines: [
      'Physio After Surgery at Home',
      'Hip & Knee Replacement Rehab',
      'Post-Op Rehab Manchester',
      'Rehab Without the Travel',
      'Recover at Home After Surgery',
      'Rehab Soon After Discharge',
      'Practise Stairs, Bed & Bath',
    ],
    descriptions: [
      'Physio at home after hip or knee replacement, spinal, shoulder or fracture surgery.',
      "Start rehab early, follow your surgeon's protocol and practise real moves at home.",
      'Chartered & HCPC registered. No GP referral needed. Manchester, Stockport & Cheshire.',
      'Initial assessment £100, follow-up £90. Message or call and we reply within 24 hours.',
    ],
    keywords: [
      'physio after knee replacement', 'physio after hip replacement',
      'knee replacement physiotherapy at home', 'hip replacement physio at home',
      'post operative physiotherapy', 'post surgery physio', 'rehab after surgery at home',
      'physio after shoulder surgery', 'acl rehab physio', 'fracture rehabilitation physio',
    ],
  },
  {
    name: 'Back & Joint Pain',
    url: `${SITE}/services/musculoskeletal-physiotherapy`,
    path: ['back-pain', 'home-visits'],
    headlines: [
      'Back & Neck Pain Physio',
      'Joint Pain Physio at Home',
      'MSK Physio Manchester',
      'Home Visit for Back Pain',
      'Hands-On Treatment at Home',
      'Too Sore to Travel to Clinic?',
      'Arthritis Physio at Home',
    ],
    descriptions: [
      'Home physio for back pain, neck pain, sciatica, arthritis and joint injuries.',
      'Hands-on treatment plus an exercise plan set up with the space you already have.',
      'Chartered & HCPC registered. No GP referral needed. Manchester, Stockport & Cheshire.',
      'No travel when moving hurts. Initial assessment £100. We reply within 24 hours.',
    ],
    keywords: [
      'back pain physio home visit', 'physio for back pain at home', 'home physio for back pain',
      'sciatica physio at home', 'neck pain physio', 'knee pain physio', 'shoulder pain physio',
      'arthritis physiotherapy', 'frozen shoulder physio', 'msk physiotherapy',
    ],
  },
  {
    name: 'Respiratory',
    url: `${SITE}/services/respiratory-physiotherapy`,
    path: ['respiratory', 'home-visits'],
    headlines: [
      'Respiratory Physio at Home',
      'COPD Physio Manchester',
      'Breathing Exercises at Home',
      'Chest Clearance Techniques',
      'Breathlessness Support',
      'Lung Health Rehab at Home',
      'Pacing Advice for Your Home',
    ],
    descriptions: [
      'Respiratory physiotherapy at home for COPD, bronchiectasis and chronic breathlessness.',
      'Breathing control, airway clearance and gradual activity building - without the trip.',
      'Chartered & HCPC registered. No GP referral needed. Manchester, Stockport & Cheshire.',
      'Pacing advice that fits your own stairs and routine. Message or call, reply in 24 hours.',
    ],
    keywords: [
      'respiratory physiotherapy', 'respiratory physio at home', 'copd physiotherapy',
      'physio for copd', 'breathing physiotherapy', 'chest physiotherapy at home',
      'bronchiectasis physio', 'pulmonary rehabilitation at home', 'breathlessness physiotherapy',
    ],
  },
];

// Town variants are phrase match only; location targeting already restricts geography.
const keywordTowns = [
  'Manchester', 'Stockport', 'Altrincham', 'Sale', 'Wilmslow', 'Macclesfield',
  'Knutsford', 'Cheadle', 'Poynton', 'Northwich', 'Congleton', 'Stretford',
];

export const locations = [
  'Altrincham', 'Biddulph', 'Bollington', 'Cheadle', 'Cheadle Hulme', 'Congleton', 'Denton', 'Eccles',
  'Knutsford', 'Macclesfield', 'Manchester', 'Middlewich', 'Northwich', 'Partington', 'Poynton', 'Sale',
  'Sandbach', 'Stockport', 'Stretford', 'Wilmslow', 'Worsley',
];

const negatives = [
  'job', 'jobs', 'vacancy', 'vacancies', 'career', 'careers', 'salary', 'recruitment', 'locum',
  'band 5', 'band 6', 'apprenticeship', 'course', 'courses', 'degree', 'university', 'qualification',
  'how to become', 'cpd', 'exam', 'assignment', 'pdf', 'printable', 'wikipedia', 'definition',
  'meaning', 'youtube', 'nhs', 'free', 'cheap', 'dog', 'canine', 'equine', 'horse', 'animal', 'vet',
  'veterinary', 'pet', 'paediatric', 'pediatric', 'child', 'children', 'baby', 'kids', 'pregnancy',
  'pelvic floor', 'online', 'virtual', 'osteopath', 'chiropractor', 'chiropractic', 'kinesiology tape',
  'tens machine', 'amazon', 'ebay', 'equipment hire',
];

const sitelinks = [
  ['Home Physio for Elderly', 'Frailty, mobility & discharge', 'Gentle, one-to-one home visits', '/services/elderly-physiotherapy'],
  ['Stroke & Neuro Rehab', "Stroke, Parkinson's, MS & more", 'Practise skills in your own home', '/services/neurological-physiotherapy'],
  ['Falls & Balance', 'Balance & strength programmes', 'Advice on home trip hazards', '/services/falls-prevention-physiotherapy'],
  ['Rehab After Surgery', 'Hip, knee, spine & shoulder', 'Start soon after you get home', '/services/post-operative-rehabilitation'],
  ['Back, Neck & Joint Pain', 'Hands-on treatment at home', 'Exercise plan for your space', '/services/musculoskeletal-physiotherapy'],
  ['Breathing & COPD Rehab', 'COPD & breathlessness support', 'Breathing control at home', '/services/respiratory-physiotherapy'],
];

const callouts = [
  'HCPC Registered', 'Chartered Physiotherapist', 'No GP Referral Needed', 'Fully Insured',
  'Enhanced DBS Checked', 'Reply Within 24 Hours', 'One-to-One Home Visits', 'Same Physio Every Visit',
  'Personal Exercise Plans', 'Member of the CSP',
];

const snippets = [
  ['Services', ['Stroke Rehab', 'Elderly Physio', 'Falls Prevention', 'Post-Op Rehab', 'Back & Joint Pain', 'Respiratory Physio']],
  ['Neighborhoods', ['Stockport', 'Altrincham', 'Sale', 'Wilmslow', 'Macclesfield', 'Knutsford', 'Cheadle', 'Poynton', 'Northwich', 'Congleton']],
];

// ---------------------------------------------------------------------------

const errors = [];
const check = (kind, text, where) => {
  if (text.length > LIMITS[kind]) errors.push(`${where}: "${text}" is ${text.length}/${LIMITS[kind]} (${kind})`);
};
const csvCell = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const csv = (rows) => rows.map((r) => r.map((c) => csvCell(String(c ?? ''))).join(',')).join('\r\n') + '\r\n';

for (const g of adGroups) {
  g.allHeadlines = [...g.headlines, ...shared.headlines];
  if (g.allHeadlines.length !== 15) errors.push(`${g.name}: needs 15 headlines, has ${g.allHeadlines.length}`);
  if (new Set(g.allHeadlines).size !== g.allHeadlines.length) errors.push(`${g.name}: duplicate headline`);
  if (g.descriptions.length !== 4) errors.push(`${g.name}: needs 4 descriptions`);
  g.allHeadlines.forEach((h) => check('headline', h, g.name));
  g.descriptions.forEach((d) => check('description', d, g.name));
  g.path.forEach((p) => check('path', p, g.name));
}
sitelinks.forEach(([t, d1, d2]) => { check('sitelink', t, 'Sitelink'); check('sitelinkLine', d1, t); check('sitelinkLine', d2, t); });
callouts.forEach((c) => check('callout', c, 'Callout'));
snippets.forEach(([, values]) => values.forEach((v) => check('snippet', v, 'Snippet')));

if (errors.length) {
  console.error('Character limit problems:\n  ' + errors.join('\n  '));
  process.exit(1);
}

const H = Array.from({ length: 15 }, (_, i) => `Headline ${i + 1}`);
const D = Array.from({ length: 4 }, (_, i) => `Description ${i + 1}`);

writeFileSync(join(OUT, 'ads-rsa.csv'), csv([
  ['Campaign', 'Ad group', 'Ad type', ...H, ...D, 'Path 1', 'Path 2', 'Final URL'],
  ...adGroups.map((g) => [CAMPAIGN, g.name, 'Responsive search ad', ...g.allHeadlines, ...g.descriptions, ...g.path, g.url]),
]));

const kwRows = [['Campaign', 'Ad group', 'Keyword', 'Criterion Type', 'Final URL']];
for (const g of adGroups) {
  for (const k of g.keywords) {
    kwRows.push([CAMPAIGN, g.name, k, 'Phrase', '']);
    kwRows.push([CAMPAIGN, g.name, k, 'Exact', '']);
  }
  for (const base of g.townKeywords ?? []) {
    for (const town of keywordTowns) kwRows.push([CAMPAIGN, g.name, `${base} ${town.toLowerCase()}`, 'Phrase', '']);
  }
}
writeFileSync(join(OUT, 'keywords.csv'), csv(kwRows));

writeFileSync(join(OUT, 'negative-keywords.csv'), csv([
  ['Campaign', 'Keyword', 'Criterion Type'],
  ...negatives.map((n) => [CAMPAIGN, n, 'Negative Phrase']),
]));

writeFileSync(join(OUT, 'sitelinks.csv'), csv([
  ['Campaign', 'Sitelink text', 'Description line 1', 'Description line 2', 'Final URL'],
  ...sitelinks.map(([t, d1, d2, p]) => [CAMPAIGN, t, d1, d2, `${SITE}${p}`]),
]));

writeFileSync(join(OUT, 'callouts.csv'), csv([['Campaign', 'Callout text'], ...callouts.map((c) => [CAMPAIGN, c])]));

writeFileSync(join(OUT, 'structured-snippets.csv'), csv([
  ['Campaign', 'Header', 'Snippet values'],
  ...snippets.map(([h, v]) => [CAMPAIGN, h, v.join(';')]),
]));

writeFileSync(join(OUT, 'locations.txt'), locations.map((l) => `${l}, England, United Kingdom`).join('\r\n') + '\r\n');

writeFileSync(join(OUT, 'negative-keywords.txt'), negatives.map((n) => `"${n}"`).join('\r\n') + '\r\n');

// Human-readable version for copy-pasting into the Google Ads website.
const md = [
  '# PhysioVisit - Google Ads text (auto-generated)',
  '',
  '> Do not edit this file. Edit `build.mjs` and run `node google-ads/ad-copy/build.mjs`.',
  '',
  `Campaign: **${CAMPAIGN}**`,
  '',
];
for (const g of adGroups) {
  md.push(`## Ad group: ${g.name}`, '', `- Final URL: ${g.url}`, `- Display path: physiovisit.co.uk/${g.path.join('/')}`, '');
  md.push('| # | Headline (max 30) | Chars |', '|---|---|---|');
  g.allHeadlines.forEach((h, i) => md.push(`| ${i + 1} | ${h} | ${h.length} |`));
  md.push('', '| # | Description (max 90) | Chars |', '|---|---|---|');
  g.descriptions.forEach((d, i) => md.push(`| ${i + 1} | ${d} | ${d.length} |`));
  md.push('', '**Keywords** (add each as phrase match `"..."` and exact match `[...]`):', '');
  md.push(g.keywords.map((k) => `\`${k}\``).join(', '));
  if (g.townKeywords) {
    md.push('', '**Town keywords** (phrase match only):', '', g.townKeywords.map((b) => keywordTowns.map((t) => `\`${b} ${t.toLowerCase()}\``).join(', ')).join(', '));
  }
  md.push('');
}
md.push('## Sitelinks', '', '| Text (max 25) | Line 1 (max 35) | Line 2 (max 35) | URL |', '|---|---|---|---|');
sitelinks.forEach(([t, d1, d2, p]) => md.push(`| ${t} | ${d1} | ${d2} | ${SITE}${p} |`));
md.push('', '## Callouts (max 25)', '', ...callouts.map((c) => `- ${c}`));
md.push('', '## Structured snippets', '', ...snippets.map(([h, v]) => `- **${h}:** ${v.join(', ')}`));
md.push('', '## Negative keywords (campaign level, phrase match)', '', negatives.map((n) => `\`${n}\``).join(', '), '');
writeFileSync(join(OUT, 'ad-copy.md'), md.join('\n'));

console.log(`OK - ${adGroups.length} ad groups, ${kwRows.length - 1} keywords, ${negatives.length} negatives, all within limits.`);
