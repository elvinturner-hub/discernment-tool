import { AssessmentData, VocationalDomainMeta } from '@/lib/types'

export const vocationalDomains: VocationalDomainMeta[] = [
  {
    id: 'formation-discipleship',
    name: 'Formation & Discipleship',
    description: 'Helping people grow in faith — through teaching, mentoring, small groups, or spiritual direction.',
    examples: 'Youth worker, small group leader, campus minister, spiritual director, discipleship pastor',
    costs: 'Slow fruit, carrying others\' burdens, hidden work, vulnerability in sharing your own journey',
  },
  {
    id: 'leadership-stewardship',
    name: 'Leadership & Stewardship',
    description: 'Building and leading organisations, teams, or systems for greater effectiveness and health.',
    examples: 'Church leadership, nonprofit director, manager, entrepreneur, organisational consultant',
    costs: 'Criticism and misunderstanding, loneliness of leadership, difficult decisions affecting others, slow change',
  },
  {
    id: 'justice-mercy',
    name: 'Justice, Mercy & the Poor',
    description: 'Standing with the marginalised, advocating for justice, serving those in need.',
    examples: 'Social worker, advocate, relief worker, community organiser, public defender, charity founder',
    costs: 'Proximity to suffering, burnout, systemic frustration, being misunderstood by those with more comfort',
  },
  {
    id: 'cultural-creation',
    name: 'Cultural Creation & Influence',
    description: 'Shaping culture through creativity, media, arts, business, education, or public life.',
    examples: 'Artist, writer, filmmaker, entrepreneur, teacher, journalist, creative professional',
    costs: 'Working in secular spaces, being a minority voice, slow influence, criticism of your work',
  },
  {
    id: 'pioneering-mission',
    name: 'Pioneering, Mission & the Margins',
    description: 'Going to new places (geographical or cultural) where the gospel or the church is not yet established.',
    examples: 'Church planter, missionary, campus pioneer, marketplace missionary, cross-cultural worker',
    costs: 'Loneliness, cultural displacement, slow or invisible fruit, danger, starting from scratch repeatedly',
  },
]

export const vocationalAssessment: AssessmentData = {
  module: 'vocational',
  title: 'Vocational Direction',
  description: 'Explore which kinds of work and calling stir something in you.',
  instructions: `This isn't about choosing a career — it's about noticing what kinds of work draw you.

Pay attention to what excites you, what burdens you carry for the world, and what costs you'd be willing to bear.

Your answers here won't tell you what to do — but they might help you notice where God has been stirring something.`,
  questions: [
    // Formation & Discipleship (4 questions)
    {
      id: 'fd-1',
      type: 'scale',
      text: 'How drawn are you to helping others grow in their faith — walking with them through questions, doubts, and breakthroughs?',
      minLabel: 'Not particularly drawn',
      maxLabel: 'Deeply drawn to this',
      min: 1,
      max: 5,
    },
    {
      id: 'fd-2',
      type: 'scenario',
      text: 'Someone asks you to meet with them regularly to help them grow spiritually.',
      scenario: 'They\'re hungry to learn and grow, but it would take significant time each week.',
      options: [
        { value: 'fd-high', label: 'I\'d be excited — this is exactly what I want to do with my life' },
        { value: 'fd-med', label: 'I\'d consider it seriously if I had the capacity' },
        { value: 'fd-low', label: 'I might say yes but it\'s not where I naturally gravitate' },
        { value: 'fd-none', label: 'I\'d probably refer them to someone better suited' },
      ],
    },
    {
      id: 'fd-3',
      type: 'scale',
      text: 'How willing would you be to accept that your impact might be slow, hidden, and hard to measure — investing years into a few people?',
      minLabel: 'That would frustrate me',
      maxLabel: 'I\'d embrace that gladly',
      min: 1,
      max: 5,
    },
    {
      id: 'fd-4',
      type: 'forced-choice',
      text: 'Which sounds more like your dream?',
      optionA: { value: 'fd', label: 'Seeing a handful of people deeply transformed through years of investment' },
      optionB: { value: 'other', label: 'Making a wider impact that affects many people at once' },
    },

    // Leadership & Stewardship (4 questions)
    {
      id: 'ls-1',
      type: 'scale',
      text: 'How drawn are you to building, leading, or improving organisations — whether churches, businesses, or ministries?',
      minLabel: 'Not my thing',
      maxLabel: 'Very drawn to this',
      min: 1,
      max: 5,
    },
    {
      id: 'ls-2',
      type: 'scenario',
      text: 'A group or organisation needs someone to step up and lead through a difficult transition.',
      scenario: 'It\'s messy, there will be criticism, and the outcome is uncertain.',
      options: [
        { value: 'ls-high', label: 'I feel drawn to step in — this is where I come alive' },
        { value: 'ls-med', label: 'I\'d consider it if no one else was better suited' },
        { value: 'ls-low', label: 'I\'d prefer to support the leader rather than be the leader' },
        { value: 'ls-none', label: 'I\'d step back — leadership isn\'t my calling' },
      ],
    },
    {
      id: 'ls-3',
      type: 'scale',
      text: 'How willing would you be to bear the loneliness and criticism that comes with leadership — making hard decisions that not everyone will understand?',
      minLabel: 'That sounds painful',
      maxLabel: 'I\'d accept that cost',
      min: 1,
      max: 5,
    },
    {
      id: 'ls-4',
      type: 'forced-choice',
      text: 'Which energises you more?',
      optionA: { value: 'ls', label: 'Building systems and structures that help others thrive' },
      optionB: { value: 'other', label: 'Working directly with people in hands-on ways' },
    },

    // Justice, Mercy & the Poor (4 questions)
    {
      id: 'jm-1',
      type: 'scale',
      text: 'How much does injustice — poverty, oppression, marginalisation — burden your heart and stir you to action?',
      minLabel: 'I care but don\'t feel called to it specifically',
      maxLabel: 'It\'s a fire in my bones — I have to respond',
      min: 1,
      max: 5,
    },
    {
      id: 'jm-2',
      type: 'scenario',
      text: 'You have the opportunity to work closely with people in poverty or crisis — but it would mean proximity to pain every day.',
      scenario: 'The work is heavy but meaningful.',
      options: [
        { value: 'jm-high', label: 'This is exactly where I want to be — proximity to suffering is part of the call' },
        { value: 'jm-med', label: 'I\'d consider it, though I\'d worry about burnout' },
        { value: 'jm-low', label: 'I\'d rather support from a distance — through giving, advocacy, or prayer' },
        { value: 'jm-none', label: 'I don\'t feel particularly called to this type of work' },
      ],
    },
    {
      id: 'jm-3',
      type: 'scale',
      text: 'How willing would you be to work in broken systems where change is slow, victory is rare, and the problems keep coming?',
      minLabel: 'That would drain me',
      maxLabel: 'I\'d embrace it as faithfulness',
      min: 1,
      max: 5,
    },
    {
      id: 'jm-4',
      type: 'forced-choice',
      text: 'Which resonates more?',
      optionA: { value: 'jm', label: 'Being present with the poor and marginalised, sharing their lives' },
      optionB: { value: 'other', label: 'Influencing culture and systems from positions of greater comfort' },
    },

    // Cultural Creation & Influence (4 questions)
    {
      id: 'cc-1',
      type: 'scale',
      text: 'How drawn are you to shaping culture — through creativity, media, arts, business, education, or public influence?',
      minLabel: 'Not really',
      maxLabel: 'Deeply drawn to this',
      min: 1,
      max: 5,
    },
    {
      id: 'cc-2',
      type: 'scenario',
      text: 'You could pursue a career where you\'d work primarily with non-Christians — in creative industries, business, media, or education.',
      scenario: 'You\'d be a minority voice, but potentially influential.',
      options: [
        { value: 'cc-high', label: 'That excites me — I want to bring the gospel into spaces where it\'s not already' },
        { value: 'cc-med', label: 'I\'d be open to it if I felt called' },
        { value: 'cc-low', label: 'I\'d prefer to work in explicitly Christian contexts' },
        { value: 'cc-none', label: 'That sounds isolating — I need Christian community around me in my work' },
      ],
    },
    {
      id: 'cc-3',
      type: 'scale',
      text: 'How willing would you be to accept that your influence might be slow, indirect, and hard to measure — planting seeds you may never see grow?',
      minLabel: 'I need to see fruit',
      maxLabel: 'I\'m okay with planting for others to harvest',
      min: 1,
      max: 5,
    },
    {
      id: 'cc-4',
      type: 'forced-choice',
      text: 'Which excites you more?',
      optionA: { value: 'cc', label: 'Creating something beautiful or influential that shapes how people think or feel' },
      optionB: { value: 'other', label: 'Working directly in ministry or service to obvious spiritual ends' },
    },

    // Pioneering, Mission & the Margins (4 questions)
    {
      id: 'pm-1',
      type: 'scale',
      text: 'How drawn are you to going somewhere new — geographically or culturally — where the gospel or the church isn\'t yet established?',
      minLabel: 'Not drawn to this',
      maxLabel: 'Strongly drawn to the frontier',
      min: 1,
      max: 5,
    },
    {
      id: 'pm-2',
      type: 'scenario',
      text: 'There\'s an opportunity to go somewhere where there\'s no existing church or Christian community.',
      scenario: 'You\'d be starting from scratch, possibly in a different culture or context.',
      options: [
        { value: 'pm-high', label: 'I feel alive thinking about it — this is what I want' },
        { value: 'pm-med', label: 'I\'d seriously consider it if I felt called' },
        { value: 'pm-low', label: 'I\'d prefer to strengthen something that already exists' },
        { value: 'pm-none', label: 'That sounds too risky or isolating for me' },
      ],
    },
    {
      id: 'pm-3',
      type: 'scale',
      text: 'How willing would you be to bear loneliness, cultural displacement, and slow or invisible fruit for years?',
      minLabel: 'That sounds really hard',
      maxLabel: 'I\'d embrace it for the mission',
      min: 1,
      max: 5,
    },
    {
      id: 'pm-4',
      type: 'forced-choice',
      text: 'Which describes you better?',
      optionA: { value: 'pm', label: 'I\'m drawn to the edge — new places, unreached people, uncomfortable contexts' },
      optionB: { value: 'other', label: 'I\'m drawn to depth — investing where I already am, going deeper not wider' },
    },
  ],
}
