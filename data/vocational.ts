import { AssessmentData, VocationalDomainMeta } from '@/lib/types'

export const vocationalDomains: VocationalDomainMeta[] = [
  {
    id: 'formation-discipleship',
    name: 'Formation & Discipleship',
    description: 'Work that shapes people — their character, faith, and capacity to follow Jesus well.',
    examples: [
      'Walking with students through formative years',
      'Mentoring younger believers',
      'Creating spaces for spiritual growth',
      'Developing resources for discipleship',
      'Youth ministry and campus work',
    ],
    typicalCosts: [
      'Slow, often invisible fruit',
      'Watching people struggle and sometimes fall away',
      'Being misunderstood by those who want faster results',
      'Lower pay in many contexts',
    ],
  },
  {
    id: 'leadership-stewardship',
    name: 'Leadership & Stewardship in Systems',
    description: 'Work within institutions — commerce, government, healthcare, education — bringing wisdom and faithfulness to systems that shape society.',
    examples: [
      'Leading teams or organisations toward good ends',
      'Stewarding resources with integrity',
      'Bringing ethical leadership to secular environments',
      'Institution-building and organisational health',
      'Policy and governance work',
    ],
    typicalCosts: [
      'Moral complexity and compromise',
      'Being misunderstood by both Christian and secular colleagues',
      'Pressure to prioritise profit or power over people',
      'Loneliness of integrating faith in secular contexts',
    ],
  },
  {
    id: 'justice-mercy',
    name: 'Justice, Mercy & the Poor',
    description: 'Work that addresses suffering, inequality, and injustice — standing with the vulnerable and pursuing shalom.',
    examples: [
      'Advocacy for the marginalised',
      'Direct service to the poor and oppressed',
      'Legal work for justice',
      'Community development',
      'Fighting trafficking, poverty, or systemic injustice',
    ],
    typicalCosts: [
      'Burnout from exposure to suffering',
      'Slow systemic change despite urgent need',
      'Funding instability',
      'Moral complexity of power dynamics',
    ],
  },
  {
    id: 'cultural-creation',
    name: 'Cultural Creation & Influence',
    description: 'Work that shapes imagination — arts, media, storytelling, thought leadership — cultivating beauty and truth in public discourse.',
    examples: [
      'Creating art, music, or literature',
      'Working in media and journalism',
      'Academic and intellectual work',
      'Architecture and design',
      'Shaping public conversation on important issues',
    ],
    typicalCosts: [
      'Financial instability in creative fields',
      'Rejection and criticism',
      'Tension between artistic integrity and audience expectations',
      'Being seen as irrelevant by pragmatists',
    ],
  },
  {
    id: 'pioneering-mission',
    name: 'Pioneering, Mission & the Margins',
    description: 'Work that goes to the edges — geographically, culturally, or socially — bringing the gospel to unreached people and places.',
    examples: [
      'Cross-cultural mission',
      'Church planting in hard places',
      'Reaching unreached people groups',
      'Ministry in neglected communities',
      'Social entrepreneurship in underserved areas',
    ],
    typicalCosts: [
      'Isolation and distance from support systems',
      'Cultural dislocation and loneliness',
      'Physical hardship or danger',
      'Slow and uncertain fruit',
    ],
  },
]

export const vocationalAssessment: AssessmentData = {
  module: 'vocational',
  title: 'Vocational Future Directions',
  description: 'This assessment helps you notice which kinds of futures you are drawn toward — not to prescribe a career path, but to surface gravitational pulls worth exploring prayerfully.',
  instructions: `This is not about finding "the right answer" for your life. It is about noticing:
  
• Who you are drawn to serve
• What contexts feel weighty to you
• What costs you are willing to bear
• What visions of future fruitfulness resonate

No job titles will emerge from this. You will not be told what to do. You will be invited to notice directions that may deserve prayer, testing, and wise counsel.`,
  questions: [
    // Formation & Discipleship (4 questions)
    {
      id: 'fd-1',
      type: 'scale',
      text: 'How drawn are you to work that primarily involves shaping people over time — their character, their faith, their formation?',
      minLabel: 'Not particularly drawn',
      maxLabel: 'Deeply drawn — this feels central',
      min: 1,
      max: 5,
    },
    {
      id: 'fd-2',
      type: 'scenario',
      text: 'If you could invest deeply in any group, which would feel most weighty?',
      scenario: 'Imagine you have significant time and energy to give. Where would your heart most want to invest?',
      options: [
        { value: 'fd-high', label: 'Young people in their formative years — students, youth, emerging adults' },
        { value: 'other-ls', label: 'People in positions of influence who need wisdom to lead well' },
        { value: 'other-jm', label: 'People who are suffering or on the margins of society' },
        { value: 'other-cc', label: 'People who shape culture — artists, thinkers, creators' },
        { value: 'other-pm', label: 'People who have never heard the gospel or live in unreached places' },
      ],
    },
    {
      id: 'fd-3',
      type: 'forced-choice',
      text: 'Which cost would you find easier to bear?',
      optionA: { value: 'fd', label: 'Slow, often invisible fruit where the impact takes years to see' },
      optionB: { value: 'other', label: 'Public opposition or controversy for visible positions you take' },
    },
    {
      id: 'fd-4',
      type: 'scale',
      text: 'How much do you long to see people grow in spiritual maturity and become who they were created to be?',
      minLabel: 'Moderately',
      maxLabel: 'Intensely — this is a deep desire',
      min: 1,
      max: 5,
    },

    // Leadership & Stewardship in Systems (4 questions)
    {
      id: 'ls-1',
      type: 'scale',
      text: 'How drawn are you to work within established institutions — business, government, healthcare, education — bringing faithful presence to systems?',
      minLabel: 'Not particularly drawn',
      maxLabel: 'Deeply drawn — this feels central',
      min: 1,
      max: 5,
    },
    {
      id: 'ls-2',
      type: 'scenario',
      text: 'Imagine you have influence in a significant institution. What would feel most meaningful?',
      scenario: 'You find yourself in a position of leadership within a major organisation or sector.',
      options: [
        { value: 'ls-high', label: 'Stewarding resources and people with wisdom and integrity in a complex environment' },
        { value: 'other-fd', label: 'Focusing primarily on the development and formation of the people you work with' },
        { value: 'other-jm', label: 'Using the institution\'s power to address injustice or serve the vulnerable' },
        { value: 'other-cc', label: 'Shaping the culture and values of the institution toward beauty and truth' },
        { value: 'other-pm', label: 'Pioneering new ventures or expanding into neglected areas' },
      ],
    },
    {
      id: 'ls-3',
      type: 'forced-choice',
      text: 'Which cost would you find easier to bear?',
      optionA: { value: 'ls', label: 'Moral complexity and the loneliness of integrating faith in secular environments' },
      optionB: { value: 'other', label: 'Financial instability and the uncertainty of less established paths' },
    },
    {
      id: 'ls-4',
      type: 'scale',
      text: 'How much do you believe that faithfulness in mainstream institutions is a crucial part of God\'s work in the world?',
      minLabel: 'Somewhat',
      maxLabel: 'Strongly — this conviction shapes how I think about vocation',
      min: 1,
      max: 5,
    },

    // Justice, Mercy & the Poor (4 questions)
    {
      id: 'jm-1',
      type: 'scale',
      text: 'How drawn are you to work that directly addresses suffering, poverty, injustice, or vulnerability?',
      minLabel: 'Not particularly drawn',
      maxLabel: 'Deeply drawn — this feels central',
      min: 1,
      max: 5,
    },
    {
      id: 'jm-2',
      type: 'scenario',
      text: 'When you see injustice or suffering, what is your instinctive response?',
      scenario: 'You encounter a situation of clear injustice or deep human need.',
      options: [
        { value: 'jm-high', label: 'I feel compelled to act — whether through direct service, advocacy, or systemic change' },
        { value: 'other-fd', label: 'I think about how to help those affected grow and develop through the hardship' },
        { value: 'other-ls', label: 'I consider how systems and institutions could be changed to prevent this' },
        { value: 'other-cc', label: 'I think about how to tell this story in a way that moves others to care' },
        { value: 'other-pm', label: 'I notice the need but feel drawn to different kinds of work' },
      ],
    },
    {
      id: 'jm-3',
      type: 'forced-choice',
      text: 'Which cost would you find easier to bear?',
      optionA: { value: 'jm', label: 'Regular exposure to suffering and the emotional toll of mercy work' },
      optionB: { value: 'other', label: 'Working in contexts where your faith is unwelcome or misunderstood' },
    },
    {
      id: 'jm-4',
      type: 'scale',
      text: 'How much does the phrase "bring good news to the poor" resonate as a description of what you want your life to be about?',
      helpText: 'Isaiah 61:1 — "to proclaim good news to the poor... to bind up the brokenhearted..."',
      minLabel: 'Moderately',
      maxLabel: 'Deeply — this captures something essential',
      min: 1,
      max: 5,
    },

    // Cultural Creation & Influence (4 questions)
    {
      id: 'cc-1',
      type: 'scale',
      text: 'How drawn are you to work that shapes imagination — arts, media, storytelling, ideas — cultivating beauty and truth in public life?',
      minLabel: 'Not particularly drawn',
      maxLabel: 'Deeply drawn — this feels central',
      min: 1,
      max: 5,
    },
    {
      id: 'cc-2',
      type: 'scenario',
      text: 'If you could contribute to any sphere, which would feel most significant?',
      scenario: 'Imagine your work could have real influence in one of these areas.',
      options: [
        { value: 'cc-high', label: 'Arts, media, or intellectual life — shaping how people see and think about the world' },
        { value: 'other-fd', label: 'Education and mentoring — shaping individual people toward maturity' },
        { value: 'other-ls', label: 'Business or government — shaping institutions that affect many lives' },
        { value: 'other-jm', label: 'Service to the vulnerable — shaping concrete outcomes for those in need' },
        { value: 'other-pm', label: 'Mission and church planting — shaping new communities of faith' },
      ],
    },
    {
      id: 'cc-3',
      type: 'forced-choice',
      text: 'Which cost would you find easier to bear?',
      optionA: { value: 'cc', label: 'Financial instability and the uncertainty of creative or intellectual pursuits' },
      optionB: { value: 'other', label: 'The slow, hidden nature of work that never gets public recognition' },
    },
    {
      id: 'cc-4',
      type: 'scale',
      text: 'How much do you believe that beauty, story, and ideas are essential to human flourishing and God\'s Kingdom?',
      minLabel: 'Somewhat',
      maxLabel: 'Profoundly — this conviction shapes my sense of calling',
      min: 1,
      max: 5,
    },

    // Pioneering, Mission & the Margins (4 questions)
    {
      id: 'pm-1',
      type: 'scale',
      text: 'How drawn are you to work at the edges — geographically, culturally, or socially — bringing the gospel to unreached people and places?',
      minLabel: 'Not particularly drawn',
      maxLabel: 'Deeply drawn — this feels central',
      min: 1,
      max: 5,
    },
    {
      id: 'pm-2',
      type: 'scenario',
      text: 'When you think about where Christians are most needed, what comes to mind?',
      scenario: 'Consider where you believe faithful presence is most lacking.',
      options: [
        { value: 'pm-high', label: 'Unreached places — where the gospel has not yet taken root' },
        { value: 'other-fd', label: 'The next generation — young people who need formation' },
        { value: 'other-ls', label: 'Centers of power — institutions that shape society' },
        { value: 'other-jm', label: 'Places of suffering — where the poor and vulnerable need advocates' },
        { value: 'other-cc', label: 'Cultural spaces — where imagination is shaped' },
      ],
    },
    {
      id: 'pm-3',
      type: 'forced-choice',
      text: 'Which cost would you find easier to bear?',
      optionA: { value: 'pm', label: 'Geographic isolation and distance from familiar support systems' },
      optionB: { value: 'other', label: 'The moral complexity of working within systems that are not fully just' },
    },
    {
      id: 'pm-4',
      type: 'scale',
      text: 'How strongly do you feel the pull to go where others have not gone — to pioneer rather than maintain?',
      minLabel: 'Minimally',
      maxLabel: 'Strongly — I am drawn to the edges',
      min: 1,
      max: 5,
    },
  ],
}
