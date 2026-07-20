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
  photo?: string; // student-submitted headshot under public/profiles/; initials avatar when absent
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
    photo: "/profiles/christian-phanhthourath.png",
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
    photo: "/profiles/anya-draves.png",
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
    photo: "/profiles/adam-liao.png",
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
    photo: "/profiles/katherine-zhao.png",
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
    photo: "/profiles/rachel-tong.png",
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
    photo: "/profiles/ming-fasquelle.png",
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
    photo: "/profiles/anika-suman.png",
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
    photo: "/profiles/anita-liu.png",
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
    photo: "/profiles/brianna-zhang.png",
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
    photo: "/profiles/carim-jalloh.png",
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
    photo: "/profiles/daniel-lee.png",
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
    photo: "/profiles/dontae-christie.png",
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
    photo: "/profiles/belise-swartwood.png",
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
    photo: "/profiles/marcos-peng.png",
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
  {
    id: "akshaj-satyawada",
    name: "Akshaj Satyawada",
    photo: "/profiles/akshaj-satyawada.png",
    major: "Artificial Intelligence",
    location: "Northeast Ohio",
    curriculum: "AP (12 APs)",
    stats: [
      { label: "GPA (UW)", value: "4.0" },
      { label: "GPA (W)", value: "4.6" },
      { label: "SAT", value: "1550" },
    ],
    themes: ["stem", "arts", "service"],
    extracurriculars: [
      {
        role: "Founder and iOS Developer",
        org: "MindMatters",
        theme: "stem",
        description:
          "Built an award-winning Swift mental-health app with 15+ resources; won the 2023 Congressional App Challenge and pitched to Fortune 500 companies.",
      },
      {
        role: "Data Science AI Intern",
        org: "Cleveland Clinic",
        theme: "stem",
        description:
          "Paid summer internship (sub-10% acceptance) curating a 400+ patient intracranial EEG dataset for ML and neurological research.",
      },
      {
        role: "Researcher",
        org: "AI Dementia Classification Project",
        theme: "stem",
        description:
          "Developed a CNN for dementia classification on 3,600 MRI scans reaching 99% accuracy; published in the Journal of Emerging Investigators.",
      },
      {
        role: "Percussion Captain and Section Leader",
        org: "North Royalton High School",
        theme: "arts",
        description:
          "Led the drum line with 10 years of experience, directing 200+ band members and mentoring 25+ percussionists.",
      },
      {
        role: "AI Models Researcher",
        org: "Case Western Blood, Heart, Lung, and Immunology Research Center",
        theme: "stem",
        description:
          "Developed regression and ML models analyzing cardiac calcium-score variables in a clinical database.",
      },
      {
        role: "Head Sound Producer and Actor",
        org: "Local Temple Cultural Program",
        theme: "arts",
        description:
          "Volunteered 10+ years as actor and head sound producer, producing audio every Sunday.",
      },
      {
        role: "Captain and Build Event Leader",
        org: "Science Olympiad",
        theme: "stem",
        description:
          "Led build events and captained the team to its first-ever state qualifier; organized a $3,000+ fundraiser.",
      },
      {
        role: "Dietary Aide",
        org: "Regina Health Center",
        theme: "service",
        description:
          "Paid dietary aide preparing and delivering food trays for residents at a nonprofit nursing facility.",
      },
      {
        role: "Social Media Content Creator",
        org: "Independent",
        theme: "entrepreneurship",
        description:
          "Produces short-form basketball content across Instagram Reels, YouTube Shorts, and Facebook Reels.",
      },
      {
        role: "Participant",
        org: "Cleveland Clinic Effective Leadership Academy",
        theme: "leadership",
        description:
          "Selected as one of 90 from 1,000+ applicants; completed 26 hours of leadership training and earned a certificate.",
      },
    ],
    awards: [
      "Congressional App Challenge Winner",
      "National Merit Commended Scholar",
      "United Nations Association National Community Impact Award",
      "Ohio Governor Merit Scholarship Award",
      "AP Scholar with Distinction",
    ],
    acceptedSchoolIds: ["penn"],
    sourceVideoUrl: "",
    verified: false,
    consent: true,
  },
  {
    id: "alondra-de-la-torre-ramirez",
    name: "Alondra De La Torre Ramirez",
    photo: "/profiles/alondra-de-la-torre-ramirez.png",
    major: "Environmental Science and Policy",
    location: "San Diego, California",
    curriculum: "AP (6 APs)",
    stats: [{ label: "SAT", value: "Test-optional" }],
    themes: ["service", "athletics", "stem"],
    extracurriculars: [
      {
        role: "Varsity Lacrosse Captain",
        org: "Morse High School",
        theme: "athletics",
        description: "Played varsity lacrosse all four years and captained the team senior year.",
      },
      {
        role: "Varsity Soccer Captain",
        org: "Morse High School",
        theme: "athletics",
        description: "Played varsity soccer all four years and captained the team senior year.",
      },
      {
        role: "President",
        org: "Environmental Club",
        theme: "service",
        description:
          "Led the environmental club, organizing community events promoting environmental awareness and stewardship.",
      },
      {
        role: "Microbiology Research Student",
        org: "UC Irvine",
        theme: "stem",
        description:
          "Studied the gut microbiome in a month-long residential program, optimizing probiotic survival in the human stomach.",
      },
      {
        role: "Laboratory Assistant",
        org: "Salk Institute for Biological Studies",
        theme: "stem",
        description:
          "Assisted plant-biology researchers over a summer at the Salk Institute in La Jolla.",
      },
      {
        role: "Peer Mentor",
        org: "First Gen Scholars",
        theme: "service",
        description:
          "Mentored first-generation, low-income students through the college application process; continued mentoring after enrolling in college.",
      },
      {
        role: "Squared Fellow",
        org: "San Diego Squared (SD2)",
        theme: "stem",
        description:
          "Selected as a Squared Fellow in an 11-month STEM-diversity program, touring San Diego STEM companies.",
      },
    ],
    awards: [],
    acceptedSchoolIds: ["ucsd", "uchicago", "ucirvine", "ucla", "vanderbilt", "duke"],
    sourceVideoUrl: "",
    verified: false,
    consent: true,
  },
  {
    id: "helen-piltner",
    name: "Helen Piltner",
    photo: "/profiles/helen-piltner.png",
    major: "Biomedical Engineering",
    location: "Charleston, South Carolina",
    curriculum: "AP (6 APs)",
    stats: [
      { label: "GPA (UW)", value: "4.0" },
      { label: "GPA (W)", value: "100.936" },
      { label: "SAT", value: "1530 superscore" },
    ],
    themes: ["stem", "arts"],
    extracurriculars: [
      {
        role: "Researcher",
        org: "Math and Engineering Research",
        theme: "stem",
        description:
          "Analyzed abdominal aortic aneurysm images using elastic deformation functions; presented at the 2021 Joint Mathematics Meetings poster session.",
      },
      {
        role: "Researcher",
        org: "Georgia Southern University",
        theme: "stem",
        description:
          "Created polyacrylonitrile/polysulfide membranes to compare lithium-ion battery performance.",
      },
      {
        role: "Independent Researcher",
        org: "Breakthrough Junior Challenge",
        theme: "stem",
        description:
          "Modeled international COVID-19 case data with logistic differential equations in MATLAB.",
      },
      {
        role: "Founder and President",
        org: "Cultural Appreciation Club",
        theme: "leadership",
        description:
          "Founded a club promoting inclusivity and diversity through culture-appreciation activities and events.",
      },
      {
        role: "Founder and President",
        org: "Mu Alpha Theta Chapter",
        theme: "stem",
        description:
          "Founded the school's math honor-society chapter, running weekly meetings and fundraising for elementary math tournaments.",
      },
      {
        role: "Competitive Dancer and Choreographer",
        org: "School Theater",
        theme: "arts",
        description:
          "Danced since age 3, won regional dance awards, and choreographed school theater productions.",
      },
      {
        role: "Student Director and Performer",
        org: "School Theater",
        theme: "arts",
        description:
          "Student-directed multiple school shows and performed in plays, musicals, and variety shows.",
      },
      {
        role: "Pianist and Accompanist",
        org: "School Theater",
        theme: "arts",
        description: "Played piano overtures for musicals and plays and accompanied a radio play.",
      },
      {
        role: "Piano Volunteer",
        org: "Local Retirement Home",
        theme: "service",
        description:
          "Performed piano selections for residents every other week across classical, Disney, and other genres.",
      },
      {
        role: "Volunteer",
        org: "Ralph H. Johnson VA Medical Center Summer Youth Program",
        theme: "service",
        description:
          "Helped veterans navigate technology in a virtual summer program, reaching 100+ volunteer hours.",
      },
    ],
    awards: [
      "Regional Dance Awards",
      "Volunteer Excellence Award, Ralph H. Johnson VA Medical Center",
    ],
    acceptedSchoolIds: ["harvard", "columbia", "duke", "vanderbilt", "emory", "gatech"],
    sourceVideoUrl: "",
    verified: false,
    consent: true,
  },
  {
    id: "madison-walia-peters",
    name: "Madison Walia-Peters",
    photo: "/profiles/madison-walia-peters.png",
    major: "Pre-Medicine",
    location: "Hoboken, New Jersey",
    curriculum: "AP (15 APs)",
    stats: [
      { label: "GPA (W)", value: "4.679" },
      { label: "SAT", value: "1590" },
    ],
    themes: ["stem", "leadership", "athletics"],
    extracurriculars: [
      {
        role: "Research Assistant",
        org: "Albert Einstein College of Medicine",
        theme: "stem",
        description:
          "Assisted NIH-funded neuroscience research on Alzheimer's risk factors in elderly Bronx residents.",
      },
      {
        role: "Council Member",
        org: "Hoboken Youth Advisory Commission",
        theme: "leadership",
        description:
          "Worked with city council members and the mayor on youth issues, advocating for teen safe spaces from 9th grade.",
      },
      {
        role: "Co-Founder and Co-Chair",
        org: "Hoboken High School Health and Wellness Committee",
        theme: "service",
        description:
          "Co-founded a committee leading suicide-prevention walks, anti-bullying demonstrations, and blood drives.",
      },
      {
        role: "Varsity Volleyball Player and Co-Captain",
        org: "Hoboken High School",
        theme: "athletics",
        description:
          "Four-year varsity player and co-captain; named freshman MVP and helped turn the team from 1-16 to 20-3.",
      },
      {
        role: "Scholar",
        org: "Governor's STEM Scholars Program",
        theme: "stem",
        description:
          "One of ~150 statewide scholars; conducted a research project on white noise as a non-pharmacological sleep aid.",
      },
      {
        role: "Research Assistant",
        org: "Stevens Institute of Technology",
        theme: "stem",
        description:
          "Assisted a musculoskeletal-lab thesis on optimal basketball-dunk jump mechanics; contributing research published in 2024.",
      },
      {
        role: "Senior Class President",
        org: "Hoboken High School Student Government",
        theme: "leadership",
        description:
          "Progressed from class rep to secretary to Senior Class President, driving school-wide fundraisers and initiatives.",
      },
      {
        role: "Competitor",
        org: "Harvard and Princeton Model Congress",
        theme: "leadership",
        description:
          "Competed in Harvard and Princeton Model Congress within a 100+ member debate program.",
      },
      {
        role: "Research Assistant and Intern",
        org: "Montclair Hospital",
        theme: "stem",
        description:
          "Supported research on cognition of elderly patients post-cardiovascular rehabilitation.",
      },
      {
        role: "Senior Mentor",
        org: "Girls on the Run",
        theme: "service",
        description:
          "Mentored elementary girls through running activities and lessons on empathy and self-confidence, culminating in a 5K.",
      },
    ],
    awards: [
      "Published Researcher @ Journal of Student Research",
      "Honorable Mention @ USA Biology Olympiad",
      "Merit Award @ National Honor Society",
      "Civic Award @ Governor's STEM Scholars Program",
      "National Merit Scholar",
    ],
    acceptedSchoolIds: ["harvard", "cornell", "ucberkeley"],
    sourceVideoUrl: "",
    verified: false,
    consent: true,
  },
  {
    id: "precious-agwagom",
    name: "Precious Agwagom",
    photo: "/profiles/precious-agwagom.png",
    major: "Pre-Medicine",
    location: "Arlington, Texas",
    curriculum: "AP (13 APs)",
    stats: [
      { label: "GPA (UW)", value: "3.98" },
      { label: "GPA (W)", value: "102.5" },
      { label: "SAT", value: "1420" },
    ],
    themes: ["stem", "service", "leadership"],
    extracurriculars: [
      {
        role: "President",
        org: "Key Club International",
        theme: "service",
        description:
          "Led the school's Key Club chapter, coordinating service events and membership.",
      },
      {
        role: "Co-Founder",
        org: "Red Alert",
        theme: "stem",
        description:
          "Co-founded a class passion project designing period-scrub prototypes to help healthcare workers manage menstrual changes during long shifts.",
      },
      {
        role: "Class President & Spirit Committee Head",
        org: "Mansfield Frontier High School Student Council",
        theme: "leadership",
        description:
          "Served as class president (grades 9-10) and spirit committee head in 10th grade.",
      },
      {
        role: "EKG Certification Candidate",
        org: "Health Science CTE Program",
        theme: "stem",
        description:
          "Completed CTE health-science coursework, performed 10 successful EKGs, and passed the NHA certification exam.",
      },
      {
        role: "Summer Immersion Program Student",
        org: "Girlswhocode",
        theme: "stem",
        description:
          "Learned JavaScript and p5.js to build five games and joined a game jam and workshop with JPMorgan Chase.",
      },
      {
        role: "Member",
        org: "Hope Squad",
        theme: "service",
        description:
          "One of 20 students serving as a peer mental-health listener for grades 10-12.",
      },
      {
        role: "Youth Member",
        org: "Nigerian Catholic Community",
        theme: "service",
        description: "Led the rosary and helped organize the parish's annual cultural picnic.",
      },
      {
        role: "Lead Planner",
        org: "Engineering Day",
        theme: "stem",
        description:
          "Co-organized a school-wide engineering career fair, coordinating 10 presenters.",
      },
      {
        role: "Member",
        org: "HOSA",
        theme: "stem",
        description:
          "Obtained CPR certification, performed blood-pressure screenings at a Toys for Tots event, and placed third in medical assisting at area level.",
      },
      {
        role: "Ambassador",
        org: "College Board BigFuture",
        theme: "service",
        description:
          "Created and reshared content connecting peers with college-planning resources.",
      },
    ],
    awards: [
      "Penn Early Exploration Program",
      "Most Improved Key Club Honorable Mention",
      "National African American Recognition Program",
      "AP Scholar with Distinction",
      "National Honor Society",
    ],
    acceptedSchoolIds: ["penn", "utaustin"],
    sourceVideoUrl: "",
    verified: false,
    consent: true,
  },
  {
    id: "elijah-jenkins",
    name: "Elijah Jenkins",
    photo: "/profiles/elijah-jenkins.png",
    major: "Law, Letters, and Society",
    location: "Phoenix, Arizona",
    curriculum: "AP (11 APs)",
    stats: [
      { label: "GPA (UW)", value: "3.79" },
      { label: "GPA (W)", value: "4.2" },
      { label: "SAT", value: "1400" },
    ],
    themes: ["leadership", "service", "arts"],
    extracurriculars: [
      {
        role: "Co-Founder & COO",
        org: "African American Reconstruction",
        theme: "service",
        description:
          "Co-founded a Phoenix nonprofit; hosted a three-day teen conference and civic forums to register voters and support youth education.",
      },
      {
        role: "Member",
        org: "SEED Philanthropy",
        theme: "service",
        description:
          "Fundraised for minority-owned businesses and nonprofits through a student-led African American youth philanthropy group.",
      },
      {
        role: "Youth Advisor",
        org: "City of Phoenix District 4",
        theme: "leadership",
        description:
          "Served on the District 4 youth advisory, launching the district's first-ever 5K to fund youth education programs.",
      },
      {
        role: "President",
        org: "Black Student Union",
        theme: "leadership",
        description:
          "Rose from Historian to Secretary to President, leading 50+ members and co-hosting events with affinity clubs.",
      },
      {
        role: "Member",
        org: "Culture Project",
        theme: "service",
        description:
          "Helped run an organization spotlighting marginalized communities and creating events for DACA/Dreamer students.",
      },
      {
        role: "President",
        org: "Model United Nations",
        theme: "leadership",
        description:
          "Led the MUN club, coaching members on proposals and resolutions and preparing for competition.",
      },
      {
        role: "Peer Mentor",
        org: "Big Brother Program",
        theme: "service",
        description:
          "Mentored 20+ incoming freshmen through campus life and the social transition to high school.",
      },
      {
        role: "Class Representative",
        org: "Student Council",
        theme: "leadership",
        description: "Represented the junior and senior class, organizing assemblies and dances.",
      },
      {
        role: "Section Leader",
        org: "Orchestra",
        theme: "arts",
        description:
          "Served as orchestra section leader, mentoring peers and competing at state level.",
      },
      {
        role: "Missions Guide",
        org: "School",
        theme: "service",
        description: "Led campus tours and helped host school events as a missions guide.",
      },
    ],
    awards: [
      "Committed to Doing Justice Award",
      "Gymnastics Regional Second Place",
      "Poetry Out Loud Runner-Up",
      "AP Scholar with Distinction",
      "Tri-M Music Honor Society",
    ],
    acceptedSchoolIds: ["uchicago"],
    sourceVideoUrl: "",
    verified: false,
    consent: true,
  },
  {
    id: "christopher-delcher",
    name: "Christopher Delcher",
    photo: "/profiles/christopher-delcher.png",
    major: "Aerospace Engineering",
    location: "Lexington, Kentucky",
    curriculum: "AP (24 APs)",
    stats: [
      { label: "GPA (UW)", value: "4.0" },
      { label: "GPA (W)", value: "4.8" },
      { label: "ACT", value: "36" },
    ],
    themes: ["stem", "arts", "service"],
    extracurriculars: [
      {
        role: "Founder and Co-President",
        org: "Dunbar Aerospace and Rocketry Club",
        theme: "stem",
        description:
          "Founded a model-rocketry club, running flight simulations to engineer fuselage/fin parameters and overseeing 10+ launches.",
      },
      {
        role: "Captain and President",
        org: "Science Olympiad",
        theme: "stem",
        description:
          "Led the team as captain and president, authored practice exams, and guided the team to three state tournaments with podium finishes.",
      },
      {
        role: "Researcher",
        org: "University of Kentucky Mechanical and Aerospace Engineering",
        theme: "stem",
        description:
          "Completed a 360-hour capstone simulating capsule re-entry and thermal protection response for NASA Artemis-era heat-shield research.",
      },
      {
        role: "Co-Founder",
        org: "Hifivetutoring",
        theme: "service",
        description:
          "Co-founded a 501(c)(3) tutoring nonprofit, raising $2,000+ for pediatric cancer research and growing to $500+/month.",
      },
      {
        role: "Researcher",
        org: "REU Research in Symmetries, University of Kentucky",
        theme: "stem",
        description:
          "Engineered resin clip-winding mechanisms for uniform magnetic fields in cosine-theta coils and presented at a symposium.",
      },
      {
        role: "Student Researcher",
        org: "University of Kentucky Physics and Astronomy",
        theme: "stem",
        description:
          "Fabricated spin-transport coil prototypes in Fusion 360 to reproduce theoretical magnetic-field data over 60 hours.",
      },
      {
        role: "Founder",
        org: "WPLLD en Espanol",
        theme: "service",
        description:
          "Founded the school's first ESL Spanish-language news broadcast, earning JEA National Diversity Recognition.",
      },
      {
        role: "Pianist",
        org: "Independent",
        theme: "arts",
        description:
          "Classically trained pianist with 9+ years; admitted to the Kentucky Governor's School for the Arts for piano performance.",
      },
      {
        role: "Private Piano Instructor and Academic Tutor",
        org: "Independent",
        theme: "service",
        description:
          "Tutors piano students in advanced technique and provides academic tutoring in AP and honors courses.",
      },
    ],
    awards: [
      "Science Olympiad State Champion Medalist",
      "KSLE State Speech Champion",
      "Research Experience for Undergraduates Certificate",
      "USAT National Triathlon Qualifier",
      "Kentucky Governor's School for the Arts Admission",
    ],
    acceptedSchoolIds: ["gatech", "cmu", "michigan"],
    sourceVideoUrl: "",
    verified: false,
    consent: true,
  },
  {
    id: "anastasia-poliakova",
    name: "Anastasia Poliakova",
    photo: "/profiles/anastasia-poliakova.png",
    major: "Economics",
    location: "Cambridge, Massachusetts",
    curriculum: "AP (11 APs)",
    stats: [
      { label: "GPA (UW)", value: "3.89" },
      { label: "SAT", value: "1510" },
    ],
    themes: ["arts", "entrepreneurship", "athletics"],
    extracurriculars: [
      {
        role: "Pre-Professional Ballet Dancer",
        org: "Tokyo International Ballet Junior Company",
        theme: "arts",
        description:
          "Trained 14 years and performed 26 shows with the company alongside Mariinsky and Mannheim principal dancers during freshman year.",
      },
      {
        role: "Founder & President",
        org: "DECA",
        theme: "entrepreneurship",
        description:
          "Founded the school's first DECA chapter and organized business pitch competitions and fundraisers.",
      },
      {
        role: "Competitive Ballet Dancer",
        org: "Independent",
        theme: "arts",
        description:
          "Earned first place in both winter and summer Educational Ballet Competition tournaments in freshman and sophomore years.",
      },
      {
        role: "Economic Researcher",
        org: "Independent",
        theme: "stem",
        description:
          "Researched South Korea's gender wage gap (1990s-2022) using KLIPS panel data, regression, and wage-decomposition techniques.",
      },
      {
        role: "Secretary-Treasurer & Booster Treasurer",
        org: "Student Council",
        theme: "leadership",
        description: "Served as junior secretary-treasurer and booster treasurer.",
      },
      {
        role: "Founder & President",
        org: "Mock Trial Club",
        theme: "leadership",
        description:
          "Founded and led the mock trial club, running structured trial simulations on criminal and property law.",
      },
      {
        role: "Volunteer",
        org: "Relay for Life & Social Service Council",
        theme: "service",
        description:
          "Volunteered at Relay for Life in Ueno Park, Tokyo, all four years of high school.",
      },
      {
        role: "Soprano Section Leader & Honor Choir Member",
        org: "School Choir",
        theme: "arts",
        description:
          "Participated in choir all four years, serving as soprano-one section leader in senior year.",
      },
      {
        role: "Runner",
        org: "Varsity Cross Country",
        theme: "athletics",
        description:
          "Competed on the varsity cross country team from freshman through senior year.",
      },
      {
        role: "Captain",
        org: "Varsity Track and Field",
        theme: "athletics",
        description:
          "Captained the team and advanced as a finalist in all four events at the 2023 DOD Far East Championships.",
      },
    ],
    awards: [
      "High School Choir Gold Medal & Carnegie Hall Invitation",
      "Educational Ballet Competition First Place Winner",
      "Team Play Second Place & Educational Ballet Competition Third Place",
      "KATO Regionals Art Competition Medals",
    ],
    acceptedSchoolIds: ["harvard"],
    sourceVideoUrl: "",
    verified: false,
    consent: true,
  },
  {
    id: "aleysha-chen",
    name: "Aleysha Chen",
    photo: "/profiles/aleysha-chen.png",
    major: "Bioengineering",
    location: "San Diego, California",
    curriculum: "AP (12 APs)",
    stats: [
      { label: "GPA", value: "4.5" },
      { label: "SAT", value: "1530" },
    ],
    themes: ["stem", "leadership"],
    extracurriculars: [
      {
        role: "Secretary, Vice President, and Co-President",
        org: "Engineering Club",
        theme: "stem",
        description:
          "Advanced through leadership roles, coordinating annual school science fairs all four years and competing for three.",
      },
      {
        role: "Founder",
        org: "Science Olympiad Team",
        theme: "stem",
        description:
          "Founded a Science Olympiad team after identifying the school lacked one, adding a STEM competition pathway.",
      },
      {
        role: "Vice President",
        org: "National Honor Society",
        theme: "leadership",
        description:
          "Served as NHS VP senior year, coordinating with teachers and helping organize school events.",
      },
      {
        role: "Undergraduate Researcher",
        org: "UC Berkeley Schaffer Laboratory",
        theme: "stem",
        description:
          "Conducted bioengineering research in David Schaffer's lab, developing a scientific poster and continuing work during breaks.",
      },
      {
        role: "Summer Researcher",
        org: "UC San Diego School of Medicine",
        theme: "stem",
        description:
          "Completed endothelial-cell biology research with independent project work and a public poster presentation.",
      },
      {
        role: "Academic Committee Chair",
        org: "UC Berkeley Biomedical Engineering Society",
        theme: "leadership",
        description:
          "Led academic programming for Cal BMES, supporting panels, mentorship, and graduate-student connections.",
      },
      {
        role: "External Relations / Outreach",
        org: "UC Berkeley Biomedical Engineering Society",
        theme: "leadership",
        description:
          "Built external relationships connecting bioengineering students with alumni, corporate, and community opportunities.",
      },
    ],
    awards: [],
    acceptedSchoolIds: ["ucberkeley", "rice"],
    sourceVideoUrl: "",
    verified: false,
    consent: true,
  },
  {
    id: "amy-fan",
    name: "Amy Fan",
    photo: "/profiles/amy-fan.png",
    major: "Psychology",
    location: "Auburn, Alabama",
    curriculum: "IB Diploma",
    stats: [
      { label: "GPA (W)", value: "4.27" },
      { label: "SAT", value: "1497" },
    ],
    themes: ["stem", "service", "arts"],
    extracurriculars: [
      {
        role: "Competitor",
        org: "HOSA International Leadership Conference",
        theme: "stem",
        description:
          "Advanced to HOSA's International Leadership Conference, placing 2nd in the Human Growth & Development event.",
      },
      {
        role: "Treasurer",
        org: "Science and Engineering Fair Club",
        theme: "stem",
        description:
          "Placed 2nd in Behavioral & Social Sciences at the Alabama Science Fair; the project drove her pivot from engineering to psychology.",
      },
      {
        role: "Vice President",
        org: "Mock Trial (Youth Judicial)",
        theme: "leadership",
        description:
          "Rose to VP of the mock trial club, competing through the Alabama YMCA Youth Judicial program.",
      },
      {
        role: "Research Intern",
        org: "Auburn University Materials Engineering",
        theme: "stem",
        description:
          "Assisted graduate students with materials-engineering research over roughly two months.",
      },
      {
        role: "Teen Volunteer",
        org: "East Alabama Health",
        theme: "service",
        description:
          "Served in a teen volunteer program at the local hospital, supporting patient and community services.",
      },
      {
        role: "Treasurer",
        org: "Music from the Heart",
        theme: "arts",
        description:
          "Treasurer of a student band performing for local nursing homes and the hospital.",
      },
      {
        role: "Player",
        org: "IB Girls Basketball Team",
        theme: "athletics",
        description:
          "Played on the school's intramural IB girls basketball team against other city teams.",
      },
      {
        role: "Member",
        org: "French Club and Societe Honoraire de Francais",
        theme: "arts",
        description:
          "Inducted into the Societe Honoraire de Francais and participated in French Club.",
      },
      {
        role: "Participant",
        org: "Distinguished Young Women Program",
        theme: "leadership",
        description:
          "Competed across five categories, earning a scholastic scholarship and writing her Common App essay on the experience.",
      },
      {
        role: "Member",
        org: "Auburn High School Marching Band",
        theme: "arts",
        description: "Marched with the band (including color guard) through sophomore year.",
      },
    ],
    awards: [
      "National Merit Finalist",
      "Northwestern National Merit Scholarship",
      "2nd Place, HOSA Human Growth & Development (International Leadership Conference)",
      "2nd Place, Alabama Science and Engineering Fair (Behavioral & Social Sciences)",
      "Distinguished Young Women Scholastic Scholarship",
    ],
    acceptedSchoolIds: ["bu", "northwestern"],
    sourceVideoUrl: "",
    verified: false,
    consent: true,
  },
  {
    id: "anshika-ojha",
    name: "Anshika Ojha",
    photo: "/profiles/anshika-ojha.png",
    major: "Computer Science and Business Administration",
    location: "Pleasanton, California",
    curriculum: "AP (10 APs)",
    stats: [],
    themes: ["entrepreneurship", "service", "arts"],
    extracurriculars: [
      {
        role: "Book Reviewer",
        org: "Selective Literature Review Program",
        theme: "arts",
        description:
          "Reviewed unreleased manuscripts, analyzing structure and character development to advise a local bookstore on titles to stock.",
      },
      {
        role: "Director of Partnership",
        org: "The Urban Garden Initiative",
        theme: "service",
        description:
          "Led partnership development for an international youth sustainability nonprofit with 60+ chapters worldwide.",
      },
      {
        role: "Business Development Intern",
        org: "Vijay Computer Academy (VCA)",
        theme: "entrepreneurship",
        description:
          "Researched Instagram SEO to promote coding courses for women and hosted webinars on discrimination women face in tech.",
      },
      {
        role: "Instagram Content Curator & Visual Marketing Strategist",
        org: "Independent",
        theme: "entrepreneurship",
        description:
          "Ran an Instagram content program with Pixlr/Lightroom workflows for sustainability and women's organizations.",
      },
      {
        role: "Social Media Manager",
        org: "American Red Cross",
        theme: "service",
        description:
          "Revamped the Red Cross's pandemic-era social presence, boosting engagement and contributing to record donation levels.",
      },
    ],
    awards: [
      "AP Scholar with Distinction",
      "Sandia Women's Connection Award",
      "Presidential Volunteer Service Award",
      "Blue Star Award",
    ],
    acceptedSchoolIds: ["ucberkeley", "ucsd", "ucsb", "ucdavis", "ucirvine"],
    sourceVideoUrl: "",
    verified: false,
    consent: true,
  },
  {
    id: "athina-chen",
    name: "Athina Chen",
    photo: "/profiles/athina-chen.png",
    major: "Applied Mathematics-Economics",
    location: "Palo Alto, California",
    curriculum: "AP (12 APs)",
    stats: [
      { label: "GPA (UW)", value: "3.97" },
      { label: "GPA (W)", value: "4.33" },
      { label: "ACT", value: "35" },
    ],
    themes: ["entrepreneurship", "arts", "athletics"],
    extracurriculars: [
      {
        role: "Solo Violinist and Concertmaster",
        org: "Youth Orchestra",
        theme: "arts",
        description:
          "Performed as a solo violinist, winning first place and prize-winner distinctions in multiple competitions.",
      },
      {
        role: "Captain",
        org: "Varsity Golf Team",
        theme: "athletics",
        description:
          "Captained the varsity golf team and served as low-scoring player in multiple tournaments.",
      },
      {
        role: "Volunteer and Guest Speaker",
        org: "Firsttee",
        theme: "service",
        description:
          "Volunteered with First Tee and was competitively selected nationally to participate in national events.",
      },
      {
        role: "Co-Founder",
        org: "Perfect Square Tutors",
        theme: "entrepreneurship",
        description:
          "Co-founded a math tutoring business connecting grades 6-12 students with perfect-scoring tutors.",
      },
      {
        role: "Co-Founder and President",
        org: "Socially Responsible Investment Fund",
        theme: "entrepreneurship",
        description:
          "Founded a club on impact investing and sustainable finance, advocating for gender equity in finance.",
      },
      {
        role: "Co-President",
        org: "Mock Trial",
        theme: "leadership",
        description:
          "Rose to co-president, helping lead the team through case strategy and courtroom performance.",
      },
      {
        role: "President",
        org: "SAGE (Students for the Advancement of Global Entrepreneurship)",
        theme: "entrepreneurship",
        description: "Chapter president leading the club through competitions and initiatives.",
      },
      {
        role: "Participant",
        org: "Google Apprentice Program",
        theme: "entrepreneurship",
        description:
          "Developed a business plan and presented at Google Pitch Night, earning first place with a partner.",
      },
      {
        role: "Teaching Assistant",
        org: "BEAM Course",
        theme: "service",
        description:
          "TA for a business/entrepreneurship/math elective, designing mini-lessons and interactive activities.",
      },
      {
        role: "Program Manager",
        org: "Big Sisters Project",
        theme: "service",
        description:
          "Helped manage a 10-week summer entrepreneurship program for young girls, developing curriculum content.",
      },
    ],
    awards: [
      "First Place @ Google Pitch Night",
      "First Tee ACE Certification",
      "ICDC Qualifier @ DECA",
      "Third Place @ SAGE Competition",
      "Second Place @ Girls Who Invest Challenge",
    ],
    acceptedSchoolIds: ["brown"],
    sourceVideoUrl: "",
    verified: false,
    consent: true,
  },
  {
    id: "chloe-barbu",
    name: "Chloe Barbu",
    photo: "/profiles/chloe-barbu.png",
    major: "Business Administration",
    location: "Charlotte, North Carolina",
    curriculum: "AP (5 APs)",
    stats: [
      { label: "GPA (UW)", value: "3.93" },
      { label: "GPA (W)", value: "4.6" },
      { label: "SAT", value: "1350" },
    ],
    themes: ["athletics", "entrepreneurship", "service"],
    extracurriculars: [
      {
        role: "Captain",
        org: "Varsity Volleyball",
        theme: "athletics",
        description:
          "Played varsity volleyball all four years and captained senior year; ran camps and clinics as community service.",
      },
      {
        role: "President",
        org: "We the People Club",
        theme: "leadership",
        description:
          "Led the school's We the People civic-education club all four years and organized a shoe-drive with Samaritan's Feet.",
      },
      {
        role: "Senior Leader",
        org: "National Honor Society",
        theme: "leadership",
        description:
          "Held an NHS senior leadership role and was a two-year member of the National English Honor Society.",
      },
      {
        role: "Captain",
        org: "Club Volleyball",
        theme: "athletics",
        description:
          "Captained multiple club volleyball teams through junior year, sustaining year-round athletics.",
      },
      {
        role: "Volunteer",
        org: "Local and National Political Campaigns",
        theme: "service",
        description:
          "Volunteered with local government and national political campaigns, an early civic commitment she credited for standing out at UNC.",
      },
      {
        role: "Co-Founder",
        org: "Shop Barbu",
        theme: "entrepreneurship",
        description:
          "Co-founded an online women's clothing boutique with her sisters, growing the combined social following past 2,000.",
      },
      {
        role: "Content Creator",
        org: "YouTube",
        theme: "entrepreneurship",
        description:
          "Ran a lifestyle and college-admissions vlog channel from 2018, growing past 17,000 subscribers and 1.2M+ lifetime views.",
      },
      {
        role: "Coach",
        org: "Youth Volleyball",
        theme: "athletics",
        description:
          "Coached a youth volleyball team for two years as a paid coach and volunteered at summer camps.",
      },
    ],
    awards: [],
    acceptedSchoolIds: ["unc"],
    sourceVideoUrl: "",
    verified: false,
    consent: true,
  },
  {
    id: "richard-uoft-ubc",
    name: "Richard",
    major: "Business / Commerce",
    location: "Not stated",
    curriculum: "AP",
    stats: [{ label: "Average", value: "~97% overall" }],
    themes: ["entrepreneurship", "leadership", "arts"],
    extracurriculars: [
      {
        role: "Legislative Assistant",
        org: "Provincial Legislature",
        theme: "leadership",
        description:
          "Worked at his provincial legislature alongside a Member of the Legislative Assembly, experiencing politics up close.",
      },
      {
        role: "Cultural Representative",
        org: "Local Community Event",
        theme: "service",
        description:
          "Informed and represented his culture through a local community event across two years.",
      },
      {
        role: "Musician",
        org: "Jazz Band & Wind Ensemble",
        theme: "arts",
        description: "Played in the school jazz band and musical wind ensemble.",
      },
      {
        role: "Member",
        org: "Student Council",
        theme: "leadership",
        description: "Served on student council for several years.",
      },
    ],
    awards: [],
    acceptedSchoolIds: ["uoft", "ubc"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=31dreUsO2TI",
    verified: false,
    consent: true,
  },
  {
    id: "celina-business-twin",
    name: "Celina",
    major: "Business / Commerce",
    location: "Ontario",
    curriculum: "IB",
    stats: [{ label: "Average", value: "~94.6% (top six)" }],
    themes: ["entrepreneurship", "service", "arts"],
    extracurriculars: [
      {
        role: "Founder & Executive Director",
        org: "4U Tutoring",
        theme: "service",
        description:
          "Founded a nonprofit tutoring organization providing free 1-on-1 tutoring, making many student–tutor matches.",
      },
      {
        role: "Author & Course Instructor",
        org: "Independent",
        theme: "arts",
        description: "Self-published a book and taught a five-week webinar course based on it.",
      },
      {
        role: "Vice President",
        org: "School Social Justice Club",
        theme: "leadership",
        description:
          "Rose from social media coordinator to elected vice president, running fundraisers and school (and virtual) events.",
      },
    ],
    awards: [],
    acceptedSchoolIds: ["uoft", "york", "mcmaster", "western", "queens"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=6s4X_zzcNow",
    verified: false,
    consent: true,
  },
  {
    id: "sarah-business-twin",
    name: "Sarah",
    major: "Business / Commerce",
    location: "Ontario",
    curriculum: "IB",
    stats: [{ label: "Average", value: "~95% (top six)" }],
    themes: ["entrepreneurship", "service", "arts", "leadership"],
    extracurriculars: [
      {
        role: "Author",
        org: "Independent",
        theme: "arts",
        description: "Self-published a book (a project she and her twin both completed).",
      },
      {
        role: "Founder",
        org: "Eyes on Youth",
        theme: "service",
        description:
          "Founded an international youth-led organization amplifying youth voices through digital magazines, events, and interviews.",
      },
      {
        role: "Acting Co-Chair",
        org: "School Library Steering Committee",
        theme: "leadership",
        description:
          "Worked up from general member to acting co-chair, leading events and initiatives.",
      },
    ],
    awards: [],
    acceptedSchoolIds: ["uoft", "york", "mcmaster", "western", "queens"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=6s4X_zzcNow",
    verified: false,
    consent: true,
  },
  {
    id: "maddy-a-ubc",
    name: "Maddy A.",
    major: "Combined Science + Master of Management",
    location: "British Columbia (Delta area)",
    curriculum: "AP",
    stats: [{ label: "Average", value: "~95% (Gr 11) / ~94% (Gr 12)" }],
    themes: ["stem", "leadership", "athletics", "service"],
    extracurriculars: [
      {
        role: "Grad Council President & Student Council",
        org: "School",
        theme: "leadership",
        description:
          "Served on student council through high school and ran for and became grad council president in senior year.",
      },
      {
        role: "Co-President",
        org: "Model United Nations",
        theme: "leadership",
        description: "Member then co-president of the school's Model UN club.",
      },
      {
        role: "Member",
        org: "Youth Advisory Councils",
        theme: "service",
        description:
          "Sat on two youth councils — one serving the school and one serving the community (Delta Youth Advisory Council).",
      },
      {
        role: "Volunteer",
        org: "Wildlife Rehabilitation Centre",
        theme: "service",
        description: "Volunteered at an orphaned-wildlife rehabilitation centre.",
      },
      {
        role: "Athlete — Basketball & Soccer",
        org: "School",
        theme: "athletics",
        description: "Played school basketball and soccer across her high school years.",
      },
      {
        role: "Part-Time Employee",
        org: "Independent",
        theme: "leadership",
        description:
          "Held a part-time job (about three days/week in Grade 10, reduced in Grade 12), showing sustained employment.",
      },
    ],
    awards: [],
    acceptedSchoolIds: ["ubc"],
    attendingSchoolId: "ubc",
    sourceVideoUrl: "https://www.youtube.com/watch?v=isiKhIdTO14",
    verified: false,
    consent: true,
  },
  {
    id: "wynette-business",
    name: "Wynette",
    major: "Business / Commerce",
    location: "Ontario",
    curriculum: "AP",
    stats: [{ label: "Average", value: "~95% (Gr 11) / ~92% (Gr 12)" }],
    themes: ["entrepreneurship", "athletics", "service", "leadership"],
    extracurriculars: [
      {
        role: "President",
        org: "DECA",
        theme: "entrepreneurship",
        description: "Served as DECA president at her school.",
      },
      {
        role: "Lifeguard & Swim Instructor",
        org: "Local Municipality",
        theme: "athletics",
        description:
          "Worked as a lifeguard and swim instructor at her local municipality (~7 hours/week during the school year).",
      },
      {
        role: "Member",
        org: "Public Library Teen Advisory Group",
        theme: "service",
        description:
          "Five-year member planning and running teen programs (trivia nights, cooking classes, games) to make the library more teen-inclusive.",
      },
      {
        role: "Volunteer Tutor",
        org: "School",
        theme: "service",
        description: "Tutored Grade 9 math during lunch and after school for about two years.",
      },
      {
        role: "Timbit Soccer Coach",
        org: "Volunteer",
        theme: "athletics",
        description: "Coached a youth (six-year-old) soccer team.",
      },
      {
        role: "Museum Photographer",
        org: "Local Museum",
        theme: "arts",
        description: "Served as a photographer at a local museum for about a year.",
      },
    ],
    awards: [],
    acceptedSchoolIds: ["western", "uoft", "mcmaster", "york", "waterloo"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=GuaVRzTIU4w",
    verified: false,
    consent: true,
  },
  {
    id: "nelson-lee",
    name: "Nelson Lee",
    major: "Engineering / Commerce",
    location: "Ontario",
    curriculum: "AP",
    stats: [{ label: "Average", value: "90s" }],
    themes: ["stem", "entrepreneurship", "leadership"],
    extracurriculars: [
      {
        role: "Organizer",
        org: "School Walkout",
        theme: "leadership",
        description: "Organized a school walkout involving over 1,500 students.",
      },
      {
        role: "Competitor",
        org: "DECA",
        theme: "entrepreneurship",
        description: "Placed third internationally at DECA with a partner.",
      },
      {
        role: "Candidate",
        org: "City Youth Council President Campaign",
        theme: "leadership",
        description: "Ran a campaign to become city (youth) council president.",
      },
    ],
    awards: ["3rd Place International — DECA"],
    acceptedSchoolIds: ["waterloo", "uoft", "queens", "western"],
    sourceVideoUrl: "https://www.youtube.com/watch?v=1P732no1U_k",
    verified: false,
    consent: true,
  },
  {
    id: "camille-bley",
    name: "Camille Bley",
    major: "International Relations",
    location: "Pennsylvania, USA",
    curriculum: "Other",
    stats: [
      { label: "GPA", value: "4.16 / 4.3 scale" },
      { label: "SAT", value: "1490 superscore" },
    ],
    themes: ["leadership", "athletics", "service"],
    extracurriculars: [
      {
        role: "Class Officer",
        org: "School",
        theme: "leadership",
        description:
          "Planned class activities, fundraising, and meetings across freshman, sophomore, and senior years (~6 hrs/week).",
      },
      {
        role: "Exchange Student",
        org: "Japan Summer Exchange",
        theme: "service",
        description:
          "Completed a summer language-and-culture immersion exchange in Japan on the Japan-American Friendship Scholarship, then presented her experience to sponsors and her school.",
      },
      {
        role: "Captain",
        org: "Varsity Soccer",
        theme: "athletics",
        description: "Played varsity soccer all four years and captained junior and senior year.",
      },
      {
        role: "Head",
        org: "Model United Nations",
        theme: "leadership",
        description: "Member in 11th grade and head in senior year.",
      },
      {
        role: "Proctor (Residential Assistant)",
        org: "School",
        theme: "leadership",
        description:
          "Selected as one of four juniors living in the freshman dorm; led dorm meetings, mediated conflicts, and monitored study hall.",
      },
      {
        role: "Head Ambassador",
        org: "School",
        theme: "leadership",
        description:
          "Ambassador then head ambassador; co-led a team of 80+ ambassadors, giving tours, interviewing students, and serving on panels.",
      },
      {
        role: "Member",
        org: "Black Student Union & Black Women's Affinity Group",
        theme: "service",
        description: "Active member all four years of high school.",
      },
      {
        role: "Volunteer",
        org: "English Tutoring for Chinese Immigrants",
        theme: "service",
        description:
          "Volunteered weekly teaching English to Chinese immigrants through a school club, as part of a global leadership certificate program.",
      },
    ],
    awards: [
      "National Merit Commended Student",
      "College Board National Recognition Program",
      "National Chinese Honor Society",
      "Elliot Math Award (most improved)",
      "Pennsylvania Area Lacrosse Team Award",
    ],
    acceptedSchoolIds: ["princeton", "penn", "usc", "georgetown", "nyu"],
    attendingSchoolId: "princeton",
    sourceVideoUrl: "https://www.youtube.com/watch?v=jBa2MIq-eMo",
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
