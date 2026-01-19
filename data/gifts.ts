import { AssessmentData, SpiritualGiftMeta } from '@/lib/types'

export const spiritualGifts: SpiritualGiftMeta[] = [
  {
    id: 'wisdom',
    name: 'Wisdom',
    scripture: '1 Corinthians 12:8',
    description: 'The Spirit-given ability to apply truth to life situations with insight that goes beyond natural understanding.',
  },
  {
    id: 'knowledge',
    name: 'Knowledge',
    scripture: '1 Corinthians 12:8',
    description: 'The Spirit-given ability to understand deep truths or receive specific insight that serves the body.',
  },
  {
    id: 'faith',
    name: 'Faith',
    scripture: '1 Corinthians 12:9',
    description: 'The Spirit-given ability to trust God with extraordinary confidence, even when circumstances seem impossible.',
  },
  {
    id: 'healing',
    name: 'Healing',
    scripture: '1 Corinthians 12:9',
    description: 'The Spirit-given ability to be a channel for God\'s healing work in others — physically, emotionally, or spiritually.',
  },
  {
    id: 'miracles',
    name: 'Miracles',
    scripture: '1 Corinthians 12:10',
    description: 'The Spirit-given ability to participate in supernatural acts that display God\'s power.',
  },
  {
    id: 'prophecy',
    name: 'Prophecy',
    scripture: '1 Corinthians 12:10',
    description: 'The Spirit-given ability to receive and speak words from God that strengthen, encourage, and comfort.',
  },
  {
    id: 'discernment-of-spirits',
    name: 'Discernment of Spirits',
    scripture: '1 Corinthians 12:10',
    description: 'The Spirit-given ability to distinguish between what is from God, human, or demonic.',
  },
  {
    id: 'tongues',
    name: 'Tongues',
    scripture: '1 Corinthians 12:10',
    description: 'The Spirit-given ability to speak in languages unknown to the speaker, for prayer or proclamation.',
  },
  {
    id: 'interpretation-of-tongues',
    name: 'Interpretation of Tongues',
    scripture: '1 Corinthians 12:10',
    description: 'The Spirit-given ability to understand and communicate the meaning of messages in tongues.',
  },
  {
    id: 'teaching',
    name: 'Teaching',
    scripture: 'Romans 12:7',
    description: 'The Spirit-given ability to explain truth clearly so that others understand and can apply it.',
  },
  {
    id: 'shepherding',
    name: 'Shepherding',
    scripture: 'Ephesians 4:11',
    description: 'The Spirit-given ability to guide, protect, and care for others in their spiritual journey over time.',
  },
  {
    id: 'apostolic',
    name: 'Apostolic/Sending',
    scripture: 'Ephesians 4:11',
    description: 'The Spirit-given ability to start new things, pioneer into new territory, and establish foundations.',
  },
  {
    id: 'evangelism',
    name: 'Evangelism',
    scripture: 'Ephesians 4:11',
    description: 'The Spirit-given ability to share the gospel in ways that lead others to faith in Jesus.',
  },
  {
    id: 'service',
    name: 'Service',
    scripture: 'Romans 12:7',
    description: 'The Spirit-given ability to identify and meet practical needs in ways that free others to serve.',
  },
  {
    id: 'encouragement',
    name: 'Encouragement',
    scripture: 'Romans 12:8',
    description: 'The Spirit-given ability to come alongside others with words that comfort, challenge, and strengthen.',
  },
  {
    id: 'giving',
    name: 'Giving',
    scripture: 'Romans 12:8',
    description: 'The Spirit-given ability to give resources generously and joyfully for God\'s purposes.',
  },
]

export const giftsAssessment: AssessmentData = {
  module: 'gifts',
  title: 'Spirit-Given Gifts',
  description: 'Explore evidence of how the Holy Spirit may be gifting you to serve others.',
  instructions: `Spiritual gifts are given by the Holy Spirit for building up the body of Christ (1 Corinthians 12:7).

They are not achievements you earn or skills you develop — they are grace given through you.

Answer honestly about your actual experience, not what you wish were true. If you haven't experienced something, that's okay — it doesn't mean you never will.

Remember: gifts are given by the Spirit as he determines (1 Corinthians 12:11), and they are irrevocable (Romans 11:29). This assessment helps you notice patterns, not define your destiny.`,
  questions: [
    // Wisdom (2 questions)
    {
      id: 'wis-1',
      type: 'scale',
      text: 'When friends face difficult decisions, how often do they come to you for insight — and leave feeling like you saw something they couldn\'t see on their own?',
      minLabel: 'Rarely happens',
      maxLabel: 'Happens regularly',
      min: 1,
      max: 5,
    },
    {
      id: 'wis-2',
      type: 'scenario',
      text: 'Someone is stuck in a complicated situation with no clear answer.',
      scenario: 'They\'ve tried everything they can think of and don\'t know what to do.',
      options: [
        { value: 'high', label: 'I often sense a way through that considers things they hadn\'t — and it usually proves wise' },
        { value: 'med', label: 'I can sometimes offer a helpful perspective, but I\'m not always confident in it' },
        { value: 'low', label: 'I usually listen and support, but don\'t have unusual insight to offer' },
        { value: 'none', label: 'I tend to feel as stuck as they are' },
      ],
    },

    // Knowledge (2 questions)
    {
      id: 'kno-1',
      type: 'scale',
      text: 'How often do you find yourself understanding spiritual truths or situations in a way that feels like it came "from somewhere else" rather than just your own thinking?',
      minLabel: 'Rarely or never',
      maxLabel: 'Regularly',
      min: 1,
      max: 5,
    },
    {
      id: 'kno-2',
      type: 'scenario',
      text: 'You\'re praying for someone or a situation.',
      scenario: 'As you pray, specific insight comes to mind that you couldn\'t have known naturally.',
      options: [
        { value: 'high', label: 'This happens to me regularly, and when I share it, it often proves accurate' },
        { value: 'med', label: 'It happens sometimes, and I\'m learning to trust it' },
        { value: 'low', label: 'I\'ve had moments like this but they\'re rare' },
        { value: 'none', label: 'I don\'t really experience this' },
      ],
    },

    // Faith (2 questions)
    {
      id: 'fai-1',
      type: 'scale',
      text: 'When everyone else is worried or doubtful, how often do you find yourself with unusual peace and confidence that God will come through?',
      minLabel: 'I worry like everyone else',
      maxLabel: 'I often carry a deep, settled trust others notice',
      min: 1,
      max: 5,
    },
    {
      id: 'fai-2',
      type: 'scenario',
      text: 'Something seems impossible — way beyond what normal effort could achieve.',
      scenario: 'Everyone else has given up or is looking for a more "realistic" option.',
      options: [
        { value: 'high', label: 'I feel a strong pull to keep trusting God for it — and I\'ve seen unlikely things happen' },
        { value: 'med', label: 'I want to believe, and I try to hold onto hope' },
        { value: 'low', label: 'I usually adjust my expectations to something more achievable' },
        { value: 'none', label: 'I tend to be pretty realistic about what\'s possible' },
      ],
    },

    // Healing (2 questions)
    {
      id: 'hea-1',
      type: 'scale',
      text: 'Have you experienced praying for someone\'s healing (physical, emotional, or spiritual) and seeing a noticeable result that went beyond what you\'d expect naturally?',
      minLabel: 'Never',
      maxLabel: 'Multiple times',
      min: 1,
      max: 5,
    },
    {
      id: 'hea-2',
      type: 'scenario',
      text: 'Someone you know is suffering — physically, emotionally, or spiritually.',
      scenario: 'You sense something stirring in you as you think about their situation.',
      options: [
        { value: 'high', label: 'I often feel prompted to pray specifically for healing, and have seen God work through those prayers' },
        { value: 'med', label: 'I pray for them, and sometimes sense God is doing something' },
        { value: 'low', label: 'I pray generally for comfort and support' },
        { value: 'none', label: 'I don\'t usually think to pray for healing specifically' },
      ],
    },

    // Miracles (2 questions)
    {
      id: 'mir-1',
      type: 'scale',
      text: 'Have you been involved in situations where something happened that could only be explained as supernatural?',
      minLabel: 'Never',
      maxLabel: 'Several times',
      min: 1,
      max: 5,
    },
    {
      id: 'mir-2',
      type: 'scenario',
      text: 'A situation seems to require supernatural intervention.',
      scenario: 'Natural means won\'t be enough — this would take a miracle.',
      options: [
        { value: 'high', label: 'I feel faith rising to ask for the impossible, and have seen God break through' },
        { value: 'med', label: 'I pray and hope, though I\'m not always confident' },
        { value: 'low', label: 'I pray but don\'t really expect anything dramatic' },
        { value: 'none', label: 'I tend to focus on practical solutions' },
      ],
    },

    // Prophecy (2 questions)
    {
      id: 'pro-1',
      type: 'scale',
      text: 'How often do you receive words, impressions, or pictures for others that seem to come from God — and when you share them, they resonate deeply?',
      minLabel: 'Never',
      maxLabel: 'Regularly',
      min: 1,
      max: 5,
    },
    {
      id: 'pro-2',
      type: 'scenario',
      text: 'You\'re spending time with someone or praying for them.',
      scenario: 'A specific word, image, or sense comes to mind that feels like it might be from God.',
      options: [
        { value: 'high', label: 'This happens regularly, and when I share it, people often confirm it speaks directly to their situation' },
        { value: 'med', label: 'I get impressions sometimes and am learning when to share them' },
        { value: 'low', label: 'I occasionally have a sense about something but rarely share it' },
        { value: 'none', label: 'I don\'t really experience this' },
      ],
    },

    // Discernment of Spirits (2 questions)
    {
      id: 'dis-1',
      type: 'scale',
      text: 'How often do you sense when something (a situation, a teaching, a person\'s influence) is spiritually "off" — even when you can\'t explain why?',
      minLabel: 'Rarely',
      maxLabel: 'Often — I seem to sense it before others',
      min: 1,
      max: 5,
    },
    {
      id: 'dis-2',
      type: 'scenario',
      text: 'Everyone else seems fine with something, but you sense something isn\'t right spiritually.',
      scenario: 'It could be a teaching, a person\'s influence, or the atmosphere of a place.',
      options: [
        { value: 'high', label: 'I often pick up on spiritual dynamics others miss, and I\'ve learned to trust this sense' },
        { value: 'med', label: 'I sometimes feel uneasy and later discover there was a reason' },
        { value: 'low', label: 'I occasionally sense something but usually doubt myself' },
        { value: 'none', label: 'I don\'t usually pick up on these things' },
      ],
    },

    // Tongues (2 questions)
    {
      id: 'ton-1',
      type: 'scale',
      text: 'Have you experienced speaking or praying in a language you haven\'t learned — whether in private prayer or in a gathering?',
      minLabel: 'Never',
      maxLabel: 'Yes, regularly',
      min: 1,
      max: 5,
    },
    {
      id: 'ton-2',
      type: 'scenario',
      text: 'In prayer, you find words aren\'t enough to express what\'s in your heart.',
      scenario: 'You\'re praying about something deep or intense.',
      options: [
        { value: 'high', label: 'I pray in tongues and find it helps me connect with God beyond my own words' },
        { value: 'med', label: 'I\'ve experienced this a few times' },
        { value: 'low', label: 'I\'m curious about it but haven\'t experienced it' },
        { value: 'none', label: 'This hasn\'t been part of my experience' },
      ],
    },

    // Interpretation of Tongues (2 questions)
    {
      id: 'int-1',
      type: 'scale',
      text: 'When someone speaks in tongues in a gathering, have you experienced receiving an understanding of what it means?',
      minLabel: 'Never',
      maxLabel: 'Yes, multiple times',
      min: 1,
      max: 5,
    },
    {
      id: 'int-2',
      type: 'scenario',
      text: 'Someone speaks in tongues in a church service or gathering.',
      scenario: 'There\'s a pause, waiting for interpretation.',
      options: [
        { value: 'high', label: 'I often receive understanding and have shared interpretations that resonated with others' },
        { value: 'med', label: 'I\'ve had impressions a few times but wasn\'t always sure enough to share' },
        { value: 'low', label: 'I don\'t usually receive anything specific' },
        { value: 'none', label: 'I haven\'t been in contexts where this happens' },
      ],
    },

    // Teaching (2 questions)
    {
      id: 'tea-1',
      type: 'scale',
      text: 'When you explain something — a concept, a Bible passage, an idea — how often do people say it suddenly "clicked" for them?',
      minLabel: 'Rarely',
      maxLabel: 'Often — people say I make things clear',
      min: 1,
      max: 5,
    },
    {
      id: 'tea-2',
      type: 'scenario',
      text: 'You\'re explaining something you\'ve learned about God or Scripture to a friend.',
      scenario: 'It\'s something that really helped you and you want them to understand it too.',
      options: [
        { value: 'high', label: 'I naturally break it down in a way that lands well — they often say it really helped' },
        { value: 'med', label: 'I can explain things okay, but I\'m not sure I have a special gift for it' },
        { value: 'low', label: 'I sometimes struggle to make things clear for others' },
        { value: 'none', label: 'I prefer to listen and learn rather than teach' },
      ],
    },

    // Shepherding (2 questions)
    {
      id: 'she-1',
      type: 'scale',
      text: 'How often do people naturally look to you for ongoing guidance — coming back to you over time as they navigate their journey?',
      minLabel: 'Rarely',
      maxLabel: 'Often — I end up walking with people long-term',
      min: 1,
      max: 5,
    },
    {
      id: 'she-2',
      type: 'scenario',
      text: 'Someone younger in faith is struggling and needs more than a one-time conversation.',
      scenario: 'They need someone to walk with them over time.',
      options: [
        { value: 'high', label: 'I feel drawn to this — I love investing in people\'s growth over the long haul' },
        { value: 'med', label: 'I\'m willing to do it, though it doesn\'t always come naturally' },
        { value: 'low', label: 'I\'d rather help in other ways than long-term mentoring' },
        { value: 'none', label: 'I don\'t see myself in a shepherding role' },
      ],
    },

    // Apostolic/Sending (2 questions)
    {
      id: 'apo-1',
      type: 'scale',
      text: 'How drawn are you to starting new things — going somewhere nothing exists yet and building from scratch?',
      minLabel: 'Not really — I prefer established contexts',
      maxLabel: 'Very drawn — I love pioneering',
      min: 1,
      max: 5,
    },
    {
      id: 'apo-2',
      type: 'scenario',
      text: 'There\'s a place or group with no church presence or Christian community.',
      scenario: 'Someone needs to go first and start something from nothing.',
      options: [
        { value: 'high', label: 'I feel excited by that — building something new in new ground energises me' },
        { value: 'med', label: 'I\'d consider it if I felt called, though it\'s not my first instinct' },
        { value: 'low', label: 'I\'d rather strengthen something that already exists' },
        { value: 'none', label: 'That sounds daunting — I\'d need a lot of support' },
      ],
    },

    // Evangelism (2 questions)
    {
      id: 'eva-1',
      type: 'scale',
      text: 'How natural is it for you to share your faith with people who don\'t know Jesus — and see them respond?',
      minLabel: 'Very difficult — I rarely do this',
      maxLabel: 'Natural — I do this often and see response',
      min: 1,
      max: 5,
    },
    {
      id: 'eva-2',
      type: 'scenario',
      text: 'You\'re having a genuine conversation with someone who doesn\'t know Jesus.',
      scenario: 'The conversation is going deeper and spiritual things come up naturally.',
      options: [
        { value: 'high', label: 'I love these moments — I often see people take steps toward faith through conversations with me' },
        { value: 'med', label: 'I can share my faith but don\'t always see clear responses' },
        { value: 'low', label: 'I find it awkward and try to avoid being too direct' },
        { value: 'none', label: 'I prefer to show my faith through actions rather than words' },
      ],
    },

    // Service (2 questions)
    {
      id: 'ser-1',
      type: 'scale',
      text: 'How much do you notice practical needs that others overlook — and feel compelled to meet them?',
      minLabel: 'Not really my thing',
      maxLabel: 'Constantly — I see needs everywhere',
      min: 1,
      max: 5,
    },
    {
      id: 'ser-2',
      type: 'scenario',
      text: 'There\'s important behind-the-scenes work that needs doing but nobody will notice or thank you for it.',
      scenario: 'It\'s essential but invisible work.',
      options: [
        { value: 'high', label: 'I\'m drawn to it — I love serving in ways that free others up' },
        { value: 'med', label: 'I\'m willing to help if no one else will' },
        { value: 'low', label: 'I\'d rather serve in ways that use my other strengths' },
        { value: 'none', label: 'I find that kind of work draining' },
      ],
    },

    // Encouragement (2 questions)
    {
      id: 'enc-1',
      type: 'scale',
      text: 'How often do people tell you that your words lifted them, challenged them, or gave them strength to keep going?',
      minLabel: 'Rarely',
      maxLabel: 'All the time',
      min: 1,
      max: 5,
    },
    {
      id: 'enc-2',
      type: 'scenario',
      text: 'A friend is discouraged and ready to give up.',
      scenario: 'They need someone to help them find strength to continue.',
      options: [
        { value: 'high', label: 'I come alive in these moments — I know how to speak life and they often leave renewed' },
        { value: 'med', label: 'I try to encourage them and it sometimes helps' },
        { value: 'low', label: 'I listen and care but don\'t always know what to say' },
        { value: 'none', label: 'I often feel as stuck as they are' },
      ],
    },

    // Giving (2 questions)
    {
      id: 'giv-1',
      type: 'scale',
      text: 'How much joy do you experience in giving away money, resources, or time — even sacrificially?',
      minLabel: 'I give out of duty',
      maxLabel: 'I give joyfully and generously',
      min: 1,
      max: 5,
    },
    {
      id: 'giv-2',
      type: 'scenario',
      text: 'You become aware of a financial need you could help meet.',
      scenario: 'It would cost you something significant but you have the resources.',
      options: [
        { value: 'high', label: 'I feel excited to give — I look for opportunities like this' },
        { value: 'med', label: 'I\'d give if I felt led, though I\'d weigh it carefully' },
        { value: 'low', label: 'I\'d want to help but probably look for smaller ways' },
        { value: 'none', label: 'I don\'t usually think of giving as my primary way of serving' },
      ],
    },
  ],
}
