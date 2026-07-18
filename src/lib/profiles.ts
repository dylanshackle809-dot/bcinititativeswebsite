/**
 * Student profiles — real admitted students, compiled from their own public
 * "stats & extracurriculars" videos (see profiles-source.md).
 *
 * All entries are consent-based and video-sourced; `verified: false` until
 * hand-confirmed. Descriptions are reworded summaries of what each student
 * shared — nothing is invented, and unknown fields (grad year, attending
 * school, stats) are omitted rather than guessed.
 */

export type ThemeId = "stem" | "leadership" | "service" | "arts" | "athletics" | "entrepreneurship";

export const themeLabels: Record<ThemeId, string> = {
  stem: "STEM & Research",
  leadership: "Leadership",
  service: "Community Service",
  arts: "Arts & Culture",
  athletics: "Athletics",
  entrepreneurship: "Entrepreneurship",
};

export interface Extracurricular {
  role: string;
  org: string;
  theme: ThemeId;
  description: string;
  relatedOpportunityIds?: number[]; // Opportunity.id from src/lib/opportunities.ts
}

export interface Profile {
  id: string; // URL slug for /profiles/$id
  name: string;
  major: string;
  gradYear?: number; // omitted when the source doesn't state it
  location: string;
  curriculum: string;
  stats: { label: string; value: string }[]; // self-reported by the student
  themes: ThemeId[];
  extracurriculars: Extracurricular[]; // ordered — the first two drive the card roles line
  awards: string[];
  acceptedSchoolIds: string[]; // School.id[]
  attendingSchoolId?: string; // only when the source clearly evidences it
  sourceVideoUrl: string; // "" when no video link was provided
  sourceLinks?: string[]; // e.g. LinkedIn
  verified?: boolean;
  consent: boolean; // HARD GATE — non-consenting profiles never render anywhere
}

const allProfiles: Profile[] = [
  {
    id: "christian-phanhthourath",
    name: "Christian Phanhthourath",
    major: "Physics",
    gradYear: 2025,
    location: "Atlanta, Georgia",
    curriculum: "AP (14 APs)",
    stats: [
      { label: "GPA (UW)", value: "4.0" },
      { label: "GPA (W)", value: "4.672" },
      { label: "SAT", value: "1560" },
    ],
    themes: ["stem", "arts", "service", "leadership"],
    extracurriculars: [
      {
        role: "MITES Scholar",
        org: "MIT",
        theme: "stem",
        description:
          "Selected (~8% acceptance) for MIT's Introduction to Technology, Engineering and Science program as a quantum computation and science-writing scholar.",
      },
      {
        role: "Cellist",
        org: "Carnegie Hall NYO2",
        theme: "arts",
        description:
          "One of nine cellists chosen nationally; performed as symphony and quintet cellist at Carnegie Hall and on tour in the Dominican Republic.",
      },
      {
        role: "Student Leader",
        org: "Atlanta Symphony Youth Orchestra",
        theme: "arts",
        description:
          "Cello-section and chamber-players leader in a highly competitive youth orchestra (~100 selected from 300+ annual auditioners).",
      },
      {
        role: "Research Intern",
        org: "Glass Laboratory, Kennesaw State University",
        theme: "stem",
        description:
          "Conducted physics research under faculty mentorship in the fall of senior year.",
      },
      {
        role: "Cello Major",
        org: "Georgia Governor's Honors Program",
        theme: "arts",
        description:
          "One of five cellists statewide selected for a competitive residential summer program for gifted students.",
      },
      {
        role: "Recruitment Director & Cello Tutor",
        org: "Doremiproject",
        theme: "service",
        description:
          "Recruitment director and cello tutor for an international youth-run 501(c)(3) offering free virtual music lessons to 2,000+ participants.",
      },
      {
        role: "President",
        org: "Tri-M Music Honor Society",
        theme: "leadership",
        description:
          "Led the chapter after serving as communications officer; ran volunteer initiatives at elementary schools and senior homes and hosted monthly socials.",
      },
      {
        role: "Co-President",
        org: "Magnet Ambassadors",
        theme: "leadership",
        description:
          "Co-led outreach for a competitive STEM magnet, managing a 100+ member group for prospective families and mentoring incoming students.",
      },
      {
        role: "Cellist",
        org: "Georgia All-State Orchestra",
        theme: "arts",
        description:
          "Selected as a full-orchestra cellist across sophomore, junior and senior years.",
      },
      {
        role: "Mathematics Tutor",
        org: "Mathnasium",
        theme: "service",
        description: "Tutored K-12 students performing below grade level.",
      },
    ],
    awards: [
      "National Merit Semifinalist",
      "National Hispanic Recognition Program Scholar",
      "Georgia Certificate of Merit",
      "Outstanding Achievement Awards in Calculus, Pre-Calculus and Literature",
      "National Honor Society member; Science Honor Society member; English Honor Society President",
    ],
    acceptedSchoolIds: ["yale", "princeton", "penn", "duke", "columbia"],
    sourceVideoUrl: "",
    sourceLinks: ["https://www.linkedin.com/in/05chrs"],
    verified: false,
    consent: true,
  },
  {
    id: "anya-draves",
    name: "Anya Draves",
    major: "Physics",
    location: "Berkeley, California",
    curriculum: "AP (8 APs)",
    stats: [
      { label: "GPA (UW)", value: "4.0" },
      { label: "SAT", value: "1590" },
    ],
    themes: ["service", "leadership"],
    extracurriculars: [
      {
        role: "Founder & Co-President",
        org: "Berkeley High School Zero Waste Club",
        theme: "service",
        description:
          "Founded and co-led the club, driving school-wide sustainability initiatives including a Meatless Monday campaign.",
      },
      {
        role: "Commissioner",
        org: "City of Berkeley Youth Commission",
        theme: "leadership",
        description:
          "Appointed commissioner identifying youth needs and recommending city services through monthly public meetings.",
      },
      {
        role: "Intern",
        org: "Environmental Public Interest Law Firm",
        theme: "leadership",
        description:
          "Summer internship exposing her to environmental advocacy, legal research and nonprofit policy work.",
      },
      {
        role: "Piano Teacher",
        org: "Independent",
        theme: "arts",
        description: "Taught private piano lessons independently throughout high school.",
      },
      {
        role: "Academic Tutor",
        org: "Volunteer",
        theme: "service",
        description: "Volunteered as a peer academic tutor across subjects from grades 10-12.",
      },
      {
        role: "Captain",
        org: "Debate Team",
        theme: "leadership",
        description: "Captained the debate team for two years and earned team awards.",
      },
      {
        role: "President",
        org: "Berkeley High School Body Positivity Club",
        theme: "service",
        description:
          "Rose from member to social-media manager to president, leading mental-health and body-image advocacy.",
      },
      {
        role: "Assistant Preschool Teacher",
        org: "Summer role",
        theme: "service",
        description:
          "Worked summers throughout middle and high school gaining early-childhood education experience.",
      },
      {
        role: "Intern",
        org: "Alameda County Public Defender's Office",
        theme: "leadership",
        description:
          "Supported criminal-defense attorneys and gained exposure to public defense work.",
      },
      {
        role: "Participant",
        org: "ACLU Summer Advocacy Institute",
        theme: "leadership",
        description:
          "Attended the selective institute engaging with ACLU lawyers, lobbyists and activists on civil-rights strategy.",
      },
    ],
    awards: [
      "National Merit Scholarship",
      "AP Scholar with Honor",
      "Golden Gate Speech Association Tournament Winner",
      "Hispanic Scholarship Fund Finalist",
    ],
    acceptedSchoolIds: ["penn", "georgetown", "washu", "ucla"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=DhvGN-rkQco",
    verified: false,
    consent: true,
  },
  {
    id: "adam-liao",
    name: "Adam Liao",
    major: "Engineering",
    location: "United States",
    curriculum: "AP (4 APs)",
    stats: [],
    themes: ["stem", "arts", "entrepreneurship"],
    extracurriculars: [
      {
        role: "Founder & Content Creator",
        org: "3A Creates",
        theme: "stem",
        description:
          "Ran a DIY engineering YouTube channel on RC vehicles and 3D-printed products, uploading 100+ videos with 120,000+ views.",
      },
      {
        role: "Content Creator",
        org: "YouTube",
        theme: "arts",
        description:
          "Maintained a personal vlog channel producing content for a STEM-interested audience.",
      },
      {
        role: "Inventor",
        org: "Solar Panel Prototype",
        theme: "stem",
        description:
          "Designed and prototyped an original solar panel for an entrepreneurship challenge and continued development independently.",
      },
      {
        role: "Writer",
        org: "New York Times Writing Competition",
        theme: "arts",
        description: "Won the NYT student writing competition three consecutive years (2022-2024).",
      },
      {
        role: "Songwriter & Music Producer",
        org: "Independent",
        theme: "arts",
        description:
          "Independently learned songwriting and production aiming to become a streaming artist.",
      },
      {
        role: "Founder & Head of Social Media",
        org: "Amazon Vendor Content Agency",
        theme: "entrepreneurship",
        description:
          "Founded a boutique agency creating TikTok/YouTube promo content for Amazon vendors.",
      },
      {
        role: "Video Crew Head",
        org: "Miramonte High School Stagecraft",
        theme: "arts",
        description:
          "Led the video crew, directing recording and promo content for school productions.",
      },
      {
        role: "Trumpet Player",
        org: "Blue Devils Wind Symphony",
        theme: "arts",
        description: "Played trumpet for ~9-10 years, earning auditioned spots in regional bands.",
      },
      {
        role: "Founder & President",
        org: "Miramonte Film Club",
        theme: "arts",
        description:
          "Founded the film club, mentored a cohort in video production and directed a short film.",
      },
      {
        role: "Part-time Cafeteria Worker",
        org: "Miramonte High School",
        theme: "service",
        description: "Worked every lunch period from sophomore through senior year.",
      },
    ],
    awards: [
      "International Competition Semi-Finalist — Solar Panel Innovation",
      "New York Times Writing Competition Winner",
      "Contra Costa County Honor Band — Trumpet",
    ],
    acceptedSchoolIds: ["stanford", "brown", "ucla"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=TIRn9Cr-8oQ",
    verified: false,
    consent: true,
  },
  {
    id: "katherine-zhao",
    name: "Katherine Zhao",
    major: "Architecture",
    location: "Great Neck, New York",
    curriculum: "AP (25 APs)",
    stats: [
      { label: "GPA", value: "97.2" },
      { label: "SAT", value: "1570" },
    ],
    themes: ["arts", "stem", "service"],
    extracurriculars: [
      {
        role: "Founder & Editor-in-Chief",
        org: "Chromaticscarsreview",
        theme: "arts",
        description:
          "Founded an international literary/art magazine, built the website and hired a global editorial staff, publishing three issues.",
      },
      {
        role: "Intern",
        org: "Guilorarchitects",
        theme: "stem",
        description:
          "Interned at an architecture firm drafting technical maps and training in SketchUp and AutoCAD.",
      },
      {
        role: "Student",
        org: "CIAO: Center for Introduction to Architecture Overseas",
        theme: "stem",
        description:
          "Competitive three-week program studying Rome's architecture and building a sustainable biofarming model.",
      },
      {
        role: "Student",
        org: "Cornell University Architecture Summer Intensive",
        theme: "stem",
        description: "Completed Cornell's six-week online architecture intensive (2023).",
      },
      {
        role: "Volunteer Instructor",
        org: "Local Art Center",
        theme: "service",
        description: "Taught painting, ceramics, dance, acting and music to campers ages 4-14.",
      },
      {
        role: "Co-Editor-in-Chief",
        org: "Guidepost (School Newspaper)",
        theme: "arts",
        description:
          "Led the editing team and production cycle, doing InDesign layout and teaching journalism.",
      },
      {
        role: "Co-Editor-in-Chief & Co-President",
        org: "School Literary & Art Magazine",
        theme: "arts",
        description: "Co-led the magazine, hosting workshops and overseeing layout and editing.",
      },
      {
        role: "President",
        org: "Art History Club",
        theme: "leadership",
        description:
          "Facilitated discussions on social-justice themes and presented club research to local officials.",
      },
      {
        role: "Classically Trained Pianist",
        org: "Independent",
        theme: "arts",
        description:
          "Ten-year pianist; earned ABRSM Grade 8 with Distinction and a perfect score on NY State's highest music exam.",
      },
      {
        role: "Co-Founder",
        org: "Share Minds Project",
        theme: "service",
        description:
          "Co-founded a nonprofit shipping iPads with educational tools to underprivileged children in Bolivia.",
      },
    ],
    awards: [
      "Best of Issue @ National High School Poetry Contest",
      "Gold Key, Silver Keys & Honorable Mentions @ Scholastic Art & Writing Awards",
      "First Place @ Wildlife Forever Fish Art Competition (NY State)",
      "First Place (Platinum) @ Concours National de Francais",
      "Second Prize @ Concert Festival International Piano Competition",
    ],
    acceptedSchoolIds: ["cornell", "michigan", "usc", "washu", "gatech", "uva", "utaustin"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=-6Y3ogInbSw",
    verified: false,
    consent: true,
  },
  {
    id: "rachel-tong",
    name: "Rachel Tong",
    major: "Strategic Design and Management",
    location: "New York / Washington",
    curriculum: "",
    stats: [{ label: "GPA (UW)", value: "4.05" }],
    themes: ["arts", "entrepreneurship", "athletics"],
    extracurriculars: [
      {
        role: "Videographer Member",
        org: "School Media Team",
        theme: "arts",
        description:
          "Filmed and edited promotional and highlight videos for school social-media channels.",
      },
      {
        role: "Graphic Design, Animation & Video Editing Intern",
        org: "Gravitas",
        theme: "arts",
        description:
          "Designed and edited lecture videos for the global online extension of The Stony Brook School.",
      },
      {
        role: "Social Media Intern",
        org: "Clothesforkids",
        theme: "service",
        description:
          "Designed posters and social graphics promoting a nonprofit store, earning the role after volunteering.",
      },
      {
        role: "Founder",
        org: "Multiple Self-Owned Small Businesses",
        theme: "entrepreneurship",
        description:
          "Founded and ran several e-commerce businesses, designing products and managing customer service and marketing.",
      },
      {
        role: "Brand Collaboration Content Creator",
        org: "YouTube",
        theme: "arts",
        description:
          "Produced content across YouTube, TikTok and Instagram, collaborating with brands on paid campaigns.",
      },
      {
        role: "Leadership Team Member",
        org: "Bare Necessities Mental Health Leadership Team",
        theme: "service",
        description:
          "Organized events and school talks and created social content promoting mental-health awareness.",
      },
      {
        role: "Hair, Makeup & Costume Crew",
        org: "School Theater Production",
        theme: "arts",
        description: "Planned mood boards, mentored junior crew and styled actors.",
      },
      {
        role: "MC & Assistant",
        org: "Matra Leadership Team",
        theme: "leadership",
        description:
          "Served as MC for weekly community dinners and supported event logistics at a boarding school.",
      },
      {
        role: "Member",
        org: "Bearcast Podcast Club",
        theme: "arts",
        description: "Recorded and edited podcast episodes as part of the school podcast club.",
      },
      {
        role: "Varsity Soccer Player",
        org: "School Girls Varsity Soccer Team",
        theme: "athletics",
        description:
          "Competed on varsity, mentored younger players and contributed to game strategy.",
      },
    ],
    awards: [
      "Cum Laude Honor Certificate",
      "Videography Award",
      "Head of School Honor Roll",
      "High Honor Roll",
    ],
    acceptedSchoolIds: ["usc", "ucirvine", "northeastern", "ucsd", "ucla"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=b0ADXMzhRnQ",
    verified: false,
    consent: true,
  },
  {
    id: "ming-an-cybele-fasquelle",
    name: "Ming-An Cybèle Fasquelle",
    major: "Psychology",
    location: "Los Angeles Metropolitan Area",
    curriculum: "IB (4 APs)",
    stats: [],
    themes: ["arts", "service", "leadership"],
    extracurriculars: [
      {
        role: "Show Choir Member",
        org: "In Sync, Burbank High School",
        theme: "arts",
        description:
          "Performed with a nationally ranked #1 show choir while completing a dual IB + online arts program.",
      },
      {
        role: "Member & Election Worker",
        org: "Key Club, Burbank High School",
        theme: "service",
        description:
          "Served as student election worker/translator, participated in Key Club and Interact Club and tutored English and Spanish.",
      },
      {
        role: "A Cappella Singer",
        org: "Sirens, Burbank High School",
        theme: "arts",
        description:
          "Auditioned into a selective 8-member a cappella ensemble performing at community events.",
      },
      {
        role: "Certified Peer Mediator",
        org: "Burbank High School",
        theme: "service",
        description:
          "Certified in peer mediation and regularly facilitated student conflict resolution.",
      },
      {
        role: "Co-Founder",
        org: "Burbank High School Film Club",
        theme: "arts",
        description: "Co-founded the film club and contributed music arrangements for projects.",
      },
      {
        role: "Social Media Coordinator",
        org: "Sunrise Movement Club",
        theme: "leadership",
        description:
          "Managed digital communications, fundraising and advocacy for the school chapter.",
      },
      {
        role: "Member",
        org: "Girl Up Club",
        theme: "service",
        description:
          "Organized fundraisers supporting healthcare and education for adolescent girls in developing countries.",
      },
      {
        role: "Merit Scholar",
        org: "Berklee College of Music Aspire Program",
        theme: "arts",
        description:
          "Attended Berklee's competitive 5-week intensive on a merit scholarship, placing into the top jazz ensemble.",
      },
      {
        role: "Radio Host & DJ",
        org: "Harvard Radio Broadcasting (WHRB 95.3 FM)",
        theme: "arts",
        description: "Trained host on a program at Harvard's undergraduate-run station.",
      },
      {
        role: "Co-Founder",
        org: "The Mix",
        theme: "entrepreneurship",
        description:
          "Co-founded a student-run music-industry collective bridging Harvard and Berklee.",
      },
    ],
    awards: [
      "Winner — RFK Human Rights x Grammy Museum Speak Up Sing Out Songwriting Competition",
      "Larry and Louis Dunn Shining Star Award",
      "Girl Scout Gold Award",
      "Congressional Award Gold Certificate",
      "President's Volunteer Service Award — Gold (2020)",
    ],
    acceptedSchoolIds: ["harvard", "ucberkeley"],
    attendingSchoolId: "harvard",
    sourceVideoUrl: "https://www.youtube.com/watch?v=uDla9Yk8qP4",
    verified: false,
    consent: true,
  },
  {
    id: "anika-suman",
    name: "Anika Suman",
    major: "Electrical & Computer Engineering, Computer Science",
    location: "Raleigh-Durham-Chapel Hill Area",
    curriculum: "AP (8 APs)",
    stats: [
      { label: "GPA (UW)", value: "4.0" },
      { label: "GPA (W)", value: "4.73" },
      { label: "SAT", value: "1560" },
    ],
    themes: ["stem", "leadership", "arts", "service"],
    extracurriculars: [
      {
        role: "Founder & President",
        org: "School Code Club",
        theme: "stem",
        description:
          "Coached teams for programming contests and directed virtual statewide coding camps reaching 100+ students.",
      },
      {
        role: "President & Co-Founder",
        org: "Math Club / Math Tutoring Initiative",
        theme: "stem",
        description:
          "Co-founded a statewide tutoring initiative and hosted a virtual national middle-school math contest across 11+ states.",
      },
      {
        role: "Soprano Singer",
        org: "Guilford College Choir & Lumina Travel Ensemble",
        theme: "arts",
        description:
          "Selected as one of five representatives for an All-State festival choir at Duke Chapel.",
      },
      {
        role: "Treasurer & Co-Head Choreographer",
        org: "UNCG Bollywood Fusion Dance Team",
        theme: "arts",
        description: "Co-founded a dance team performing and competing locally for four years.",
      },
      {
        role: "Parliamentarian, Historian & Media Manager",
        org: "Student Council",
        theme: "leadership",
        description:
          "Founded the school YouTube channel (43 videos, 9,200+ views) and grew Instagram 65%.",
      },
      {
        role: "Robotics Team Member & Fundraising Lead",
        org: "Robotics Club (FRC/FTC/FLL)",
        theme: "stem",
        description:
          "Competed from FLL through FRC and led fundraising for the school's robotics program.",
      },
      {
        role: "Varsity Member",
        org: "Science Olympiad",
        theme: "stem",
        description: "Competed across STEM events on the varsity team.",
      },
      {
        role: "Sensei Instructor & Camp Leader",
        org: "Code Ninjas",
        theme: "service",
        description:
          "Taught coding to students ages 3-16 and ran solo video-making and Scratch camps.",
      },
      {
        role: "Summer Research Intern",
        org: "Neuromuscular Rehabilitation Engineering Lab (UNC-NC State BME)",
        theme: "stem",
        description:
          "Studied EMG-based control of ankle prostheses and presented results at a conference.",
      },
      {
        role: "Zoo Docent & Museum Ambassador",
        org: "Greensboro Science Center",
        theme: "service",
        description:
          "Guided visitors and conducted a psychology research project partnered with a UNCG lab.",
      },
    ],
    awards: [
      "Trinity Scholar @ Duke University",
      "A. James Clark Scholar @ Duke University",
      "IT Web Development Certificate — GTCC",
      "All-Collegiate All-State Festival Choir Selection",
    ],
    acceptedSchoolIds: ["brown", "columbia", "dartmouth", "duke", "ucberkeley", "gatech"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=M2WA6bOmUxc",
    verified: false,
    consent: true,
  },
  {
    id: "anita-liu",
    name: "Anita Liu",
    major: "Undeclared",
    location: "San Francisco Bay Area",
    curriculum: "AP (12 APs)",
    stats: [{ label: "ACT", value: "36" }],
    themes: ["stem", "arts", "leadership", "service"],
    extracurriculars: [
      {
        role: "Paid Research Intern",
        org: "Anson L. Clark Scholars Program (Texas Tech)",
        theme: "stem",
        description: "Selective paid summer research internship.",
      },
      {
        role: "Cultural Dance Performer & Soloist",
        org: "Chinese Cultural Dance",
        theme: "arts",
        description:
          "Trained since age 5; performed across Southern California and won first-place overall soloist in her age division.",
      },
      {
        role: "Director",
        org: "INTEGIRLS All-Girls Math Tournament",
        theme: "stem",
        description:
          "Director for a teen-led all-girls math competition organization with chapters across the US.",
      },
      {
        role: "President",
        org: "School Math Club",
        theme: "stem",
        description: "Organized weekly meetings and tutoring fundraisers and competed in the AMC.",
      },
      {
        role: "Vice President",
        org: "Young Engineers in Action",
        theme: "service",
        description:
          "Ran weekly STEM classes and camps for elementary students through a student-run nonprofit.",
      },
      {
        role: "Mechanical Engineering Intern",
        org: "L3 Technologies",
        theme: "stem",
        description:
          "3D-modeled parts in Autodesk Inventor/AutoCAD for government projects under security-clearance protocols.",
      },
      {
        role: "Paid Dancer/Actor",
        org: "Professional Musical (El Portal Theatre)",
        theme: "arts",
        description:
          "Performed in a professional Hollywood musical alongside professional choreographers.",
      },
      {
        role: "President & Founder",
        org: "Chinese Culture Club",
        theme: "leadership",
        description: "Founded the club and organized an annual Lunar New Year spirit week.",
      },
      {
        role: "Cast Member (Dancer)",
        org: "AFI Conservatory Thesis Film",
        theme: "arts",
        description: "Cast as a dancer in a thesis film showcased at the AFI premiere.",
      },
      {
        role: "Viola",
        org: "School Symphony Orchestra & Chamber Strings",
        theme: "arts",
        description:
          "Earned superior ratings at regional festivals and performed at Disneyland/Knott's Berry Farm.",
      },
    ],
    awards: ["National AP Scholar", "First Place Overall Soloist, Chinese Dance Competition"],
    acceptedSchoolIds: ["mit", "penn", "caltech", "ucberkeley", "ucla", "usc"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=OYtIPRDm3i0",
    verified: false,
    consent: true,
  },
  {
    id: "brianna-zhang",
    name: "Brianna Zhang",
    major: "Undeclared",
    location: "Kalamazoo, Michigan",
    curriculum: "AP (16 APs)",
    stats: [
      { label: "GPA (UW)", value: "3.99" },
      { label: "GPA (W)", value: "4.80" },
      { label: "SAT", value: "1520" },
    ],
    themes: ["entrepreneurship", "leadership", "service"],
    extracurriculars: [
      {
        role: "Executive Director & Co-Founder",
        org: "Leadersforyouthsports",
        theme: "service",
        description:
          "Co-founded a youth-led nonprofit making sports accessible for underserved children across Michigan.",
      },
      {
        role: "Co-President",
        org: "DECA Chapter",
        theme: "entrepreneurship",
        description:
          "Rose from director of fundraising to co-president, growing the chapter to record membership.",
      },
      {
        role: "Student Leadership Council & Rules Committee",
        org: "National Speech and Debate Association",
        theme: "leadership",
        description: "Captained the debate team and served on national committees.",
      },
      {
        role: "Research Assistant",
        org: "University Labs and KAMSC",
        theme: "stem",
        description: "Conducted research through a magnet curriculum and in university labs.",
      },
      {
        role: "Co-President & Co-Founder",
        org: "Cultural Cooking Club",
        theme: "service",
        description:
          "Co-founded a club on global awareness through food, raising thousands for World Central Kitchen and the IRC.",
      },
      {
        role: "Video Producer & Co-VP",
        org: "School Newspaper & Student Government",
        theme: "leadership",
        description:
          "Co-launched the newspaper's video branch and served three years in student government.",
      },
      {
        role: "Intern",
        org: "Law Firm, Political Campaign & Business Externship",
        theme: "leadership",
        description: "Completed three professional experiences across law, politics and business.",
      },
      {
        role: "Political Advocate",
        org: "Local Advocacy Organization",
        theme: "leadership",
        description: "Wrote and delivered speeches at legislative lobby visits.",
      },
      {
        role: "Associate Concertmaster & MC",
        org: "School Orchestra",
        theme: "arts",
        description:
          "Served as associate concertmaster and toured elementary schools for outreach.",
      },
      {
        role: "Part-Time Employee",
        org: "Various",
        theme: "service",
        description: "Held part-time work during school breaks.",
      },
    ],
    awards: [
      "First Place (International Champion), DECA ICDC — Community Awareness (2025)",
      "Quarterfinalist, National Speech and Debate Tournament (2025)",
      "Grant & Mentorship Recipient @ Aspen Institute Project Play",
      "Regional Honoree, Billie Jean King Youth Leadership Award (2025)",
      "State Finalist, United States Senate Youth Program (2025)",
    ],
    acceptedSchoolIds: ["harvard", "stanford", "penn"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=OnKQPRZDGoM",
    verified: false,
    consent: true,
  },
  {
    id: "carim-jalloh",
    name: "Carim Jalloh",
    major: "Pre-Medicine",
    location: "New York",
    curriculum: "AP (9 APs)",
    stats: [
      { label: "GPA (W)", value: "98.14" },
      { label: "SAT", value: "1550" },
    ],
    themes: ["stem", "leadership", "service", "athletics"],
    extracurriculars: [
      {
        role: "Senior Leader",
        org: "RYLA District 7255",
        theme: "leadership",
        description:
          "Led year-round events and mentorship for a student-run Rotary Youth Leadership org serving 300+ high schoolers.",
      },
      {
        role: "Social Media Team Member",
        org: "Society of Black Students in Healthcare",
        theme: "stem",
        description:
          "Created educational content on healthcare disparities affecting the Black community.",
      },
      {
        role: "Math Tutor",
        org: "Mathnasium",
        theme: "service",
        description: "Tutored K-12 students in math from junior through senior year.",
      },
      {
        role: "Vice President",
        org: "School Student Government",
        theme: "leadership",
        description: "Served in student government all four years, as VP in grades 10-11.",
      },
      {
        role: "Community Tutor",
        org: "Volunteer",
        theme: "service",
        description: "Tutored students across academic subjects throughout high school.",
      },
      {
        role: "Summer STEM Program Participant",
        org: "Clarkson University",
        theme: "stem",
        description:
          "Attended two competitive STEM programs developing solutions to real-world problems.",
      },
      {
        role: "Shadowing Student",
        org: "Orthopedic Surgery",
        theme: "stem",
        description: "Shadowed an orthopedic surgeon before senior year.",
      },
      {
        role: "Tennis Player",
        org: "Club Team",
        theme: "athletics",
        description: "Competed on a club tennis team all four years.",
      },
      {
        role: "Musical Theater Performer",
        org: "School Productions",
        theme: "arts",
        description: "Performed in multiple musical-theater productions.",
      },
    ],
    awards: [
      "Coca-Cola Scholars Program Semi-Finalist",
      "National African American Recognition Award — College Board",
      "AP Scholar with Honor",
      "National Honor Society member",
      "Clarkson University Summer Program accolades",
    ],
    acceptedSchoolIds: ["yale"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=31tMlOI_muQ",
    verified: false,
    consent: true,
  },
  {
    id: "daniel-lee",
    name: "Daniel Lee",
    major: "Computer Science",
    location: "New York City",
    curriculum: "IB",
    stats: [
      { label: "GPA (UW)", value: "4.0" },
      { label: "SAT", value: "1580" },
    ],
    themes: ["stem", "arts", "athletics"],
    extracurriculars: [
      {
        role: "Bioinformatics Intern",
        org: "Nestler Laboratory, Icahn School of Medicine at Mount Sinai",
        theme: "stem",
        description:
          "Analyzed genomic data on addiction-driven gene expression, built a Hi-C pipeline and co-authored a paper.",
      },
      {
        role: "Violinist & Classical Performer",
        org: "Independent",
        theme: "arts",
        description:
          "Soloed at Carnegie Hall eight times, won international competitions and led the school's advanced ensemble.",
      },
      {
        role: "Team Manager",
        org: "Special Olympics New York",
        theme: "service",
        description:
          "Managed logistics for the school's annual Special Olympics event supporting athletes with disabilities.",
      },
      {
        role: "Founder & President",
        org: "Athletic Exchange",
        theme: "service",
        description:
          "Founded a nonprofit redistributing 300+ items of sports gear and expanded it to additional schools.",
      },
      {
        role: "Captain",
        org: "Varsity Cross Country and Track",
        theme: "athletics",
        description: "Captained the team while mentoring teammates across four years.",
      },
      {
        role: "Endocrinology Research Intern",
        org: "Mone Zaidi Laboratory, Icahn School of Medicine",
        theme: "stem",
        description:
          "Studied an FSH-blocking antibody for obesity, learning core wet-lab techniques.",
      },
      {
        role: "Research Assistant",
        org: "Michaelson Laboratory, Massachusetts General Hospital",
        theme: "stem",
        description:
          "Coded a Java simulation of embryonic development; credited as third author on a preprint.",
      },
      {
        role: "Junior Editor",
        org: "Journal of Research High School",
        theme: "stem",
        description: "Reviewed submitted papers for clarity, citations and accuracy.",
      },
      {
        role: "English Tutor",
        org: "Goddard Riverside Star Learning Center",
        theme: "service",
        description: "Created individualized lessons for underserved students.",
      },
      {
        role: "Staff Writer",
        org: "School Newspaper",
        theme: "arts",
        description:
          "Wrote feature articles across engineering, economics, history and literature.",
      },
    ],
    awards: [
      "Glender Ree Scholar Award",
      "USA Computing Olympiad — Gold Division",
      "Scholastic Art & Writing Awards — Regional Gold Key (Personal Essay & Memoir)",
      "John Locke Institute Global Essay Prize — History Commendation",
      "First Place — American Protégé International String Competition",
    ],
    acceptedSchoolIds: ["stanford"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=BTkNf5J9X6M",
    verified: false,
    consent: true,
  },
  {
    id: "dontae-christie",
    name: "Dontae Christie",
    major: "Government",
    location: "Cambridge, Massachusetts",
    curriculum: "AP (11 APs)",
    stats: [{ label: "Grades", value: "Straight A's (one 89)" }],
    themes: ["leadership", "service"],
    extracurriculars: [
      {
        role: "President",
        org: "Student Council",
        theme: "leadership",
        description: "Served as VP then President, leading schoolwide governance initiatives.",
      },
      {
        role: "Editor-in-Chief & Founder",
        org: "School Media Team",
        theme: "leadership",
        description: "Founded and led the school's media team from the ground up.",
      },
      {
        role: "Competitor",
        org: "Academic Decathlon",
        theme: "leadership",
        description:
          "Earned multiple medals including a third-place state finish in speech and interview.",
      },
      {
        role: "Group Secretary",
        org: "Superintendent Student Advisory Council",
        theme: "leadership",
        description:
          "Collaborated with the superintendent to represent student interests district-wide.",
      },
      {
        role: "Competitor",
        org: "UIL Academics",
        theme: "leadership",
        description: "Competed across academic events, earning placement finishes.",
      },
      {
        role: "Attorney & Team Lead",
        org: "Mock Trial Team",
        theme: "leadership",
        description:
          "Led the team as lead attorney to a state-level appearance in its first qualifying run.",
      },
      {
        role: "President",
        org: "Junior Class Council",
        theme: "leadership",
        description: "Organized class events including prom and student-engagement activities.",
      },
      {
        role: "Nationalist & State Delegate",
        org: "Texas Boys State",
        theme: "leadership",
        description: "Elected a state delegate, gaining civic-leadership experience.",
      },
      {
        role: "Vice President",
        org: "National Honor Society",
        theme: "service",
        description: "Supported service initiatives and chapter leadership across two years.",
      },
      {
        role: "Volunteer",
        org: "Food Bank",
        theme: "service",
        description: "Helped sort and distribute ~100,000 pounds of food (summer 2021).",
      },
    ],
    awards: [
      "KENS 5 All-Star Student Award",
      "National Math and Science Initiative Star Student Award",
      "Academic Decathlon State Third Place — Speech and Interview",
      "Harvard Book Award Recipient",
      "AP Scholar",
    ],
    acceptedSchoolIds: ["harvard", "yale", "penn", "cornell"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=hqYBVtwzQsI",
    verified: false,
    consent: true,
  },
  {
    id: "belise-swartwood",
    name: "Belise Swartwood",
    major: "Mathematics and Finance",
    location: "Honolulu, Hawaii",
    curriculum: "AP (15 APs)",
    stats: [
      { label: "GPA", value: "4.48" },
      { label: "ACT", value: "34" },
    ],
    themes: ["stem", "athletics", "arts"],
    extracurriculars: [
      {
        role: "Competitive Swimmer",
        org: "Club Swimming / MIT Division III",
        theme: "athletics",
        description:
          "Trained 15-17 hrs/week, competing at national meets and qualifying for open-water junior nationals.",
      },
      {
        role: "Coding Club Member",
        org: "Mililani High School",
        theme: "stem",
        description:
          "Built a wildlife-incident reporting app with backend Python and MongoDB for a coding challenge.",
      },
      {
        role: "Concertmaster",
        org: "Hoyeuf Symphony",
        theme: "arts",
        description: "Studied violin from age 7, advancing to concertmaster by senior year.",
      },
      {
        role: "Piano Student",
        org: "Independent",
        theme: "arts",
        description: "Studied piano from ~age 9 with weekly lessons alongside violin.",
      },
      {
        role: "Undergraduate Researcher",
        org: "Massachusetts General Hospital",
        theme: "stem",
        description:
          "Research intern in the hospital's research department beginning freshman year at MIT.",
      },
      {
        role: "Researcher",
        org: "MIT Self Assembly Lab",
        theme: "stem",
        description:
          "Contributed to the Growing Islands project at the intersection of design and materials science.",
      },
    ],
    awards: [
      "AP Scholar with Distinction",
      "ISEF Finalist — Convolutional Neural Network Medical Imaging Project",
      "Second Place @ Hawaii State Science Fair",
      "Winner @ Hoye Annual Coding Challenge",
    ],
    acceptedSchoolIds: ["mit"],
    attendingSchoolId: "mit",
    sourceVideoUrl: "https://www.youtube.com/watch?v=hiFeQRfgeew",
    verified: false,
    consent: true,
  },
  {
    id: "marcos-rico-peng",
    name: "Marcos Rico Peng",
    major: "Electrical Engineering and Computer Science",
    location: "Madrid, Spain / Wyoming Seminary, Pennsylvania",
    curriculum: "IB Diploma",
    stats: [
      { label: "GPA (UW)", value: "3.9" },
      { label: "SAT", value: "1360" },
    ],
    themes: ["athletics", "arts", "entrepreneurship"],
    extracurriculars: [
      {
        role: "Competitive Swimmer",
        org: "California Aquatics (UC Berkeley)",
        theme: "athletics",
        description:
          "Four-time Spanish Junior National Champion and Pennsylvania state champion; recruited as a Division I swimmer.",
      },
      {
        role: "Founder & Executive",
        org: "International People's Club",
        theme: "leadership",
        description:
          "Founded a school international-students' club connecting students across cultures.",
      },
      {
        role: "Violinist and Pianist",
        org: "Independent",
        theme: "arts",
        description: "Over a decade of classical training on violin and piano.",
      },
      {
        role: "Co-Founder",
        org: "Ping Pong Club",
        theme: "athletics",
        description: "Co-founded a new student sports group.",
      },
      {
        role: "Second Chair",
        org: "Civic Orchestra and String Ensemble",
        theme: "arts",
        description: "Performed as second-chair violinist.",
      },
      {
        role: "YouTube Content Creator",
        org: "Independent",
        theme: "entrepreneurship",
        description: "Built a channel of cinematic vlogs to 160,000+ subscribers and 11M+ views.",
      },
    ],
    awards: [
      "Four-Time Spanish Junior National Champion (Swimming)",
      "Pennsylvania State Champion (Swimming)",
    ],
    acceptedSchoolIds: ["ucberkeley"],
    attendingSchoolId: "ucberkeley",
    sourceVideoUrl: "https://www.youtube.com/watch?v=nLdblfk8OQk",
    verified: false,
    consent: true,
  },
];

/** The consent gate. Non-consenting entries never leave this module. */
export const profiles: Profile[] = allProfiles.filter((p) => p.consent === true);

export const getProfile = (id: string) => profiles.find((p) => p.id === id);

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Checkbox options for the Major filter — derived from the data, grows with it. */
export const majorOptions = [...new Set(profiles.map((p) => p.major))]
  .sort()
  .map((m) => ({ value: slugify(m), label: m }));
