import { AssessmentData, SpiritualGiftMeta } from '@/lib/types'

export const spiritualGifts: SpiritualGiftMeta[] = [
  {
    id: 'wisdom',
    name: 'Wisdom',
    description: 'The Spirit-enabled ability to see into the heart of situations and apply divine truth with discernment.',
    scripture: 'To one there is given through the Spirit a message of wisdom...',
    scriptureRef: '1 Corinthians 12:8',
  },
  {
    id: 'knowledge',
    name: 'Knowledge',
    description: 'The Spirit-enabled ability to understand and articulate truths about God and His ways.',
    scripture: '...to another a message of knowledge by means of the same Spirit...',
    scriptureRef: '1 Corinthians 12:8',
  },
  {
    id: 'faith',
    name: 'Faith',
    description: 'The Spirit-enabled ability to trust God with extraordinary confidence, especially in difficult circumstances.',
    scripture: '...to another faith by the same Spirit...',
    scriptureRef: '1 Corinthians 12:9',
  },
  {
    id: 'healing',
    name: 'Healing',
    description: 'The Spirit-enabled ability to be a channel through which God brings restoration to body, mind, or spirit.',
    scripture: '...to another gifts of healing by that one Spirit...',
    scriptureRef: '1 Corinthians 12:9',
  },
  {
    id: 'miracles',
    name: 'Miracles',
    description: 'The Spirit-enabled ability to be a conduit for God\'s supernatural intervention in the natural order.',
    scripture: '...to another miraculous powers...',
    scriptureRef: '1 Corinthians 12:10',
  },
  {
    id: 'prophecy',
    name: 'Prophecy',
    description: 'The Spirit-enabled ability to receive and communicate messages from God for encouragement, strengthening, and comfort.',
    scripture: '...to another prophecy... But the one who prophesies speaks to people for their strengthening, encouraging and comfort.',
    scriptureRef: '1 Corinthians 12:10, 14:3',
  },
  {
    id: 'discernment-of-spirits',
    name: 'Discernment of Spirits',
    description: 'The Spirit-enabled ability to distinguish between what is of God, human origin, or spiritual opposition.',
    scripture: '...to another distinguishing between spirits...',
    scriptureRef: '1 Corinthians 12:10',
  },
  {
    id: 'tongues',
    name: 'Tongues',
    description: 'The Spirit-enabled ability to speak in languages unknown to the speaker, for prayer, praise, or communication.',
    scripture: '...to another speaking in different kinds of tongues...',
    scriptureRef: '1 Corinthians 12:10',
  },
  {
    id: 'interpretation-of-tongues',
    name: 'Interpretation of Tongues',
    description: 'The Spirit-enabled ability to make known the meaning of messages spoken in tongues.',
    scripture: '...and to still another the interpretation of tongues.',
    scriptureRef: '1 Corinthians 12:10',
  },
  {
    id: 'teaching',
    name: 'Teaching',
    description: 'The Spirit-enabled ability to explain and apply Scripture in ways that bring understanding and transformation.',
    scripture: 'If it is teaching, then teach...',
    scriptureRef: 'Romans 12:7',
  },
  {
    id: 'shepherding',
    name: 'Shepherding (Pastoring)',
    description: 'The Spirit-enabled ability to guide, protect, and nurture believers toward spiritual maturity.',
    scripture: 'Be shepherds of God\'s flock that is under your care, watching over them...',
    scriptureRef: '1 Peter 5:2',
  },
  {
    id: 'apostolic',
    name: 'Apostolic / Sending',
    description: 'The Spirit-enabled ability to establish new works and provide leadership across communities of faith.',
    scripture: 'And God has placed in the church first of all apostles...',
    scriptureRef: '1 Corinthians 12:28',
  },
  {
    id: 'evangelism',
    name: 'Evangelism',
    description: 'The Spirit-enabled ability to communicate the gospel with clarity and see people respond to Christ.',
    scripture: 'Christ himself gave... the evangelists...',
    scriptureRef: 'Ephesians 4:11',
  },
  {
    id: 'service',
    name: 'Service (Helps)',
    description: 'The Spirit-enabled ability to identify and meet practical needs in ways that free others for their work.',
    scripture: 'If it is serving, then serve...',
    scriptureRef: 'Romans 12:7',
  },
  {
    id: 'encouragement',
    name: 'Encouragement (Exhortation)',
    description: 'The Spirit-enabled ability to strengthen others through words that comfort, challenge, and call forward.',
    scripture: 'If it is to encourage, then give encouragement...',
    scriptureRef: 'Romans 12:8',
  },
  {
    id: 'giving',
    name: 'Giving',
    description: 'The Spirit-enabled ability to contribute resources with extraordinary generosity and joy.',
    scripture: '...if it is giving, then give generously...',
    scriptureRef: 'Romans 12:8',
  },
]

export const giftsAssessment: AssessmentData = {
  module: 'gifts',
  title: 'Spirit-Given Gifts',
  description: 'This assessment helps you discern evidence of spiritual gifts — not to diagnose them definitively, but to notice patterns where the Spirit may be at work.',
  instructions: `As you answer these questions, remember:

• Spiritual gifts are given by the Spirit as He determines (1 Cor 12:11) — not earned or achieved
• Gifts are irrevocable (Romans 11:29) — they remain even when we are unfaithful
• The presence of a gift does not indicate spiritual maturity
• Gifts are for building up the body, not for personal status (1 Cor 12:7)

Answer based on your actual experience and what others have observed, not what you wish were true.`,
  questions: [
    // Wisdom (2 questions)
    {
      id: 'wis-1',
      type: 'scenario',
      text: 'When has applying a word of wisdom brought clarity to a difficult situation?',
      scenario: 'Reflect on times when you have been in situations where people were stuck or confused.',
      options: [
        { value: 'high', label: 'Frequently — I often find myself articulating a perspective that cuts through complexity and helps people see a way forward' },
        { value: 'med', label: 'Sometimes — there are occasions when I have offered insight that seemed to help, though I am not always sure why' },
        { value: 'low', label: 'Rarely — I can think of perhaps one or two times, but it does not feel like a pattern' },
        { value: 'none', label: 'I cannot think of clear examples where this has happened through me' },
      ],
    },
    {
      id: 'wis-2',
      type: 'scale',
      text: 'How often do others seek you out specifically for wisdom about difficult decisions or situations?',
      helpText: 'Consider whether people come to you not just for advice but for a kind of insight that goes deeper.',
      minLabel: 'Rarely or never',
      maxLabel: 'Very frequently — it is a consistent pattern',
      min: 1,
      max: 5,
    },

    // Knowledge (2 questions)
    {
      id: 'kno-1',
      type: 'scenario',
      text: 'When has understanding of Scripture or spiritual truth come to you in a way that surprised you?',
      scenario: 'Think about times when you have understood or explained something about God\'s truth in a way that seemed beyond your normal capacity.',
      options: [
        { value: 'high', label: 'Regularly — I often find myself grasping and articulating truths in ways that feel given, not just learned' },
        { value: 'med', label: 'Occasionally — there have been moments of insight that felt like more than my own thinking' },
        { value: 'low', label: 'Seldom — my understanding usually comes through normal study and effort' },
        { value: 'none', label: 'I rely entirely on others to help me understand spiritual truth' },
      ],
    },
    {
      id: 'kno-2',
      type: 'scale',
      text: 'How often have others said that your explanation of something helped them understand Scripture or God\'s ways more deeply?',
      minLabel: 'Rarely or never',
      maxLabel: 'Very frequently',
      min: 1,
      max: 5,
    },

    // Faith (2 questions)
    {
      id: 'fai-1',
      type: 'scenario',
      text: 'When circumstances seem impossible, what is your typical posture?',
      scenario: 'Consider situations where the obstacles seemed insurmountable or resources were clearly insufficient.',
      options: [
        { value: 'high', label: 'I find myself confident that God will act, even when I cannot see how — and this confidence often anchors others' },
        { value: 'med', label: 'I try to trust God but also feel the weight of the impossibility — my faith fluctuates' },
        { value: 'low', label: 'I tend to focus on realistic assessment of what is possible given the circumstances' },
        { value: 'none', label: 'I typically feel anxious or defeated when situations seem impossible' },
      ],
    },
    {
      id: 'fai-2',
      type: 'scale',
      text: 'How often have others described your trust in God as unusual or said that your faith encouraged them to believe?',
      minLabel: 'Rarely or never',
      maxLabel: 'Very frequently — it is something people consistently notice',
      min: 1,
      max: 5,
    },

    // Healing (2 questions)
    {
      id: 'hea-1',
      type: 'scenario',
      text: 'What has been your experience with praying for healing?',
      scenario: 'Reflect on times you have prayed for physical, emotional, or spiritual healing for others.',
      options: [
        { value: 'high', label: 'I have seen specific, clear answers to prayers for healing that I cannot explain naturally — this has happened multiple times' },
        { value: 'med', label: 'I have occasionally seen what seemed like answers to prayers for healing, though I am uncertain how to interpret them' },
        { value: 'low', label: 'I pray for healing when asked but have not seen patterns of response that stand out' },
        { value: 'none', label: 'I have not been involved in praying for healing, or I have not seen evidence of response' },
      ],
    },
    {
      id: 'hea-2',
      type: 'scale',
      text: 'How often do you feel a specific burden or prompting to pray for someone\'s healing?',
      helpText: 'Not just general concern, but a particular sense that you should pray for their restoration.',
      minLabel: 'Rarely or never',
      maxLabel: 'Frequently — it is a recurring prompting',
      min: 1,
      max: 5,
    },

    // Miracles (2 questions)
    {
      id: 'mir-1',
      type: 'scenario',
      text: 'Have you experienced being present when God did something clearly supernatural?',
      scenario: 'Consider whether you have been involved — not just as an observer — in situations where something happened that had no natural explanation.',
      options: [
        { value: 'high', label: 'Yes, and I sensed that I was meant to be there or to participate — this has happened more than once' },
        { value: 'med', label: 'I have been present for things that seemed supernatural, though I am unsure of my role in them' },
        { value: 'low', label: 'I may have witnessed something unusual but would not describe it as miraculous' },
        { value: 'none', label: 'I have not experienced this' },
      ],
    },
    {
      id: 'mir-2',
      type: 'scale',
      text: 'How comfortable are you with the idea that God might work miraculously through your prayers or actions?',
      helpText: 'This is about expectation, not presumption.',
      minLabel: 'Very uncomfortable — I do not expect this',
      maxLabel: 'Open and expectant — I believe God can and sometimes does',
      min: 1,
      max: 5,
    },

    // Prophecy (2 questions)
    {
      id: 'pro-1',
      type: 'scenario',
      text: 'Have you ever felt you received a specific message from God for another person or group?',
      scenario: 'Consider whether you have experienced a sense of having a word to share that felt given rather than your own idea.',
      options: [
        { value: 'high', label: 'Yes, this happens with some regularity — I have shared words that others confirmed resonated deeply or proved meaningful' },
        { value: 'med', label: 'Occasionally — I have felt prompted to share something, and sometimes it seemed to land with significance' },
        { value: 'low', label: 'Rarely — I usually share my own thoughts rather than feeling I have a word from God' },
        { value: 'none', label: 'I have not experienced this' },
      ],
    },
    {
      id: 'pro-2',
      type: 'scale',
      text: 'How often do others tell you that something you said felt like exactly what they needed to hear from God?',
      minLabel: 'Rarely or never',
      maxLabel: 'Frequently — it is a consistent pattern',
      min: 1,
      max: 5,
    },

    // Discernment of Spirits (2 questions)
    {
      id: 'dis-1',
      type: 'scenario',
      text: 'How do you experience sensing what is spiritually happening beneath the surface?',
      scenario: 'Consider situations where something felt off spiritually, or where you sensed opposition or deception that was not obvious.',
      options: [
        { value: 'high', label: 'I frequently sense the spiritual atmosphere of situations — whether something is of God, merely human, or from the enemy' },
        { value: 'med', label: 'Sometimes I notice something spiritually amiss, though I am not always confident in what I am perceiving' },
        { value: 'low', label: 'I occasionally feel uneasy about situations but rarely attribute it to spiritual discernment' },
        { value: 'none', label: 'I do not experience this kind of spiritual awareness' },
      ],
    },
    {
      id: 'dis-2',
      type: 'scale',
      text: 'How often has your sense about a person or situation proved accurate when others could not see what you perceived?',
      helpText: 'Consider times when you sensed something was not right, and it later became evident.',
      minLabel: 'Rarely or never',
      maxLabel: 'Very frequently',
      min: 1,
      max: 5,
    },

    // Tongues (2 questions)
    {
      id: 'ton-1',
      type: 'choice',
      text: 'What is your experience with speaking in tongues?',
      helpText: 'This may be in personal prayer or in community settings.',
      options: [
        { value: 'high', label: 'I regularly speak in tongues in my personal prayer life and/or have spoken tongues publicly with interpretation' },
        { value: 'med', label: 'I have experienced speaking in tongues but it is not a regular part of my life' },
        { value: 'low', label: 'I have had experiences that might have been tongues but I am uncertain' },
        { value: 'none', label: 'I have not experienced speaking in tongues' },
      ],
    },
    {
      id: 'ton-2',
      type: 'scale',
      text: 'If you speak in tongues, how integral is it to your communion with God?',
      helpText: 'This question may not apply if you have not experienced tongues.',
      minLabel: 'Not applicable or not integral',
      maxLabel: 'Very integral — it is a significant part of my prayer life',
      min: 1,
      max: 5,
    },

    // Interpretation of Tongues (2 questions)
    {
      id: 'int-1',
      type: 'choice',
      text: 'Have you experienced understanding or interpreting tongues?',
      helpText: 'This could be interpreting your own tongues in prayer or another person\'s tongues in a gathering.',
      options: [
        { value: 'high', label: 'Yes — I have provided interpretations that were confirmed as meaningful, or I regularly receive understanding of my own tongues' },
        { value: 'med', label: 'I have had occasional experiences of seeming to understand what was being communicated' },
        { value: 'low', label: 'I may have had one or two experiences but I am unsure' },
        { value: 'none', label: 'I have not experienced this' },
      ],
    },
    {
      id: 'int-2',
      type: 'scale',
      text: 'When tongues are spoken in a gathering, do you sense an interpretation arising within you?',
      minLabel: 'Never or rarely',
      maxLabel: 'Frequently',
      min: 1,
      max: 5,
    },

    // Teaching (2 questions)
    {
      id: 'tea-1',
      type: 'scenario',
      text: 'What happens when you explain Scripture or spiritual truth to others?',
      scenario: 'Consider times when you have taught, explained, or shared biblical truth with individuals or groups.',
      options: [
        { value: 'high', label: 'People consistently say they understand things more clearly through my teaching — complex ideas become accessible' },
        { value: 'med', label: 'My explanations sometimes help, though I am not sure my teaching stands out' },
        { value: 'low', label: 'I can explain things adequately but teaching does not feel like a particular strength' },
        { value: 'none', label: 'I struggle to explain spiritual truths clearly and prefer others to teach' },
      ],
    },
    {
      id: 'tea-2',
      type: 'scale',
      text: 'How much energy and satisfaction do you get from preparing and delivering teaching?',
      minLabel: 'It drains me',
      maxLabel: 'It energises me deeply',
      min: 1,
      max: 5,
    },

    // Shepherding (2 questions)
    {
      id: 'she-1',
      type: 'scenario',
      text: 'What is your relationship to the long-term spiritual care of others?',
      scenario: 'Consider whether you find yourself in ongoing, committed relationships where you are watching over someone\'s spiritual life.',
      options: [
        { value: 'high', label: 'I naturally take on this role — I feel responsible for people\'s spiritual wellbeing over time and they come to me as a shepherd' },
        { value: 'med', label: 'I have some relationships like this but would not describe it as a primary pattern' },
        { value: 'low', label: 'I care about people but ongoing pastoral responsibility is not where I naturally land' },
        { value: 'none', label: 'I tend to engage with people around specific moments rather than sustained spiritual care' },
      ],
    },
    {
      id: 'she-2',
      type: 'scale',
      text: 'How strong is your protective instinct when you see someone in your community being spiritually misled or harmed?',
      minLabel: 'I notice but do not feel personally responsible',
      maxLabel: 'Very strong — I feel compelled to act',
      min: 1,
      max: 5,
    },

    // Apostolic (2 questions)
    {
      id: 'apo-1',
      type: 'scenario',
      text: 'What is your relationship to starting new things or providing leadership across boundaries?',
      scenario: 'Consider whether you find yourself establishing works, providing direction to multiple groups, or being recognised as a leader beyond a local context.',
      options: [
        { value: 'high', label: 'I have started or helped establish new works, and I am often called upon to provide leadership beyond my immediate community' },
        { value: 'med', label: 'I have occasionally been in founding or cross-community leadership roles' },
        { value: 'low', label: 'I prefer to work within established contexts rather than pioneering new ones' },
        { value: 'none', label: 'Starting new things or leading broadly is not something I have experienced' },
      ],
    },
    {
      id: 'apo-2',
      type: 'scale',
      text: 'How often are you invited to speak into, advise, or provide oversight for works beyond your own community?',
      minLabel: 'Rarely or never',
      maxLabel: 'Frequently',
      min: 1,
      max: 5,
    },

    // Evangelism (2 questions)
    {
      id: 'eva-1',
      type: 'scenario',
      text: 'What is your experience of sharing the gospel with people who do not know Christ?',
      scenario: 'Reflect on conversations with non-believers about faith and Jesus.',
      options: [
        { value: 'high', label: 'I find myself naturally drawn to these conversations, and I have seen multiple people respond to Christ through them' },
        { value: 'med', label: 'I share when opportunity arises and have seen some fruit, though it does not feel like a primary calling' },
        { value: 'low', label: 'I find evangelistic conversations difficult or awkward, though I try when prompted' },
        { value: 'none', label: 'I rarely engage in direct gospel conversations' },
      ],
    },
    {
      id: 'eva-2',
      type: 'scale',
      text: 'How much do you feel a burden for people who do not know Christ?',
      helpText: 'Not just general care, but a specific weight for their eternal state.',
      minLabel: 'Minimal burden',
      maxLabel: 'Constant, pressing burden',
      min: 1,
      max: 5,
    },

    // Service (2 questions)
    {
      id: 'ser-1',
      type: 'scenario',
      text: 'What happens when you see a practical need that no one else is addressing?',
      scenario: 'Consider unmet needs — physical, logistical, administrative — in your community.',
      options: [
        { value: 'high', label: 'I instinctively step in to meet it — seeing and serving practical needs is where I come alive' },
        { value: 'med', label: 'I often help when I notice needs, though I am not always the first to act' },
        { value: 'low', label: 'I help when asked but do not naturally notice unmet practical needs' },
        { value: 'none', label: 'Practical service is not where I tend to contribute' },
      ],
    },
    {
      id: 'ser-2',
      type: 'scale',
      text: 'How much joy and energy do you get from meeting practical needs that enable others to do their work?',
      minLabel: 'It feels like obligation',
      maxLabel: 'It brings deep satisfaction',
      min: 1,
      max: 5,
    },

    // Encouragement (2 questions)
    {
      id: 'enc-1',
      type: 'scenario',
      text: 'What happens when you see someone who is discouraged or stuck?',
      scenario: 'Consider your response to people who are struggling, doubting, or losing heart.',
      options: [
        { value: 'high', label: 'I feel drawn to them and find words come that strengthen, challenge, or comfort — people often tell me my words helped significantly' },
        { value: 'med', label: 'I try to encourage when I can, and sometimes my words seem to help' },
        { value: 'low', label: 'I care but do not feel particularly equipped to offer encouragement' },
        { value: 'none', label: 'I tend to give people space rather than offering words' },
      ],
    },
    {
      id: 'enc-2',
      type: 'scale',
      text: 'How often do people seek you out specifically when they need to be encouraged or called forward?',
      minLabel: 'Rarely or never',
      maxLabel: 'Very frequently',
      min: 1,
      max: 5,
    },

    // Giving (2 questions)
    {
      id: 'giv-1',
      type: 'scenario',
      text: 'What is your experience of financial and material generosity?',
      scenario: 'Consider your patterns of giving beyond obligation — tithes and offerings beyond what is expected.',
      options: [
        { value: 'high', label: 'I give substantially and joyfully — it is a primary way I express love for God and others, and I often give sacrificially' },
        { value: 'med', label: 'I give regularly and sometimes feel prompted to give beyond my normal pattern' },
        { value: 'low', label: 'I give but it does not feel like a particular area of calling or joy' },
        { value: 'none', label: 'Generosity is an area I struggle with' },
      ],
    },
    {
      id: 'giv-2',
      type: 'scale',
      text: 'How much joy do you experience when you give significantly to Kingdom work?',
      helpText: 'Consider not just willingness but actual delight.',
      minLabel: 'Minimal joy — it feels like duty',
      maxLabel: 'Profound joy — it is worship',
      min: 1,
      max: 5,
    },
  ],
}
