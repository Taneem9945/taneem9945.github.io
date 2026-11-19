import links from './assets/links.json';
import publications from './assets/publications.json';

// Edit this file when your biography and photo are ready.
// Professional links and publications are saved in src/assets/.
// Put photos and PDFs in public/, then use paths such as 'photo.jpg' or 'cv.pdf'.
export const profile = {
  name: 'Mohammad Taneem Bin Nazim',
  initials: 'MT',
  photo: 'portrait.jpg',
  affiliation: 'The University of Texas at El Paso',
  affiliationUrl: '',
  email: 'mtnazim@miners.utep.edu',
  biography: [
    'I am a Ph.D. student in Computer Science at The University of Texas at El Paso (UTEP), working under the supervision of Dr. Palvi Aggarwal. My research connects human behavior, cybersecurity experimentation, and agentic AI, with a focus on understanding attacker decision-making and developing adaptive cyber defenses.',
    'I lead the development of HackIT 2.0, an interactive cybersecurity testbed for studying attacker behavior and cognitive biases. My work on Cyber-Agent-Flow examines how AI agents plan, use tools, and interact with human input through execution trace analysis. In my ongoing Watcher Agent project, I use LLMs to interpret evidence from cybersecurity activity and support defensive recommendations.',
    'Alongside my research, I serve as an Associate Instructor of Computer Science at UTEP. My teaching emphasizes clear explanations, familiar examples, and practical exercises that help students build confidence and solve unfamiliar problems.',
  ],
  links,
  // Add entries with date (YYYY-MM-DD) and text.
  news: [],
  publications,
};
