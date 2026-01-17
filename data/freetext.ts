import { AssessmentData } from '@/lib/types'

export const freetextAssessment: AssessmentData = {
  module: 'freetext',
  title: 'Additional Reflections',
  description: 'These prompts invite you to share what the structured questions may not have captured. What you write here is not scored — it is simply heard, so that patterns across your whole self might become more visible.',
  instructions: `Write as much or as little as feels right. There are no right answers.

Some people find it helpful to write freely without editing. Others prefer to think carefully before putting words down. Either approach is fine.

What you share here will be held alongside your other responses to help surface resonance, tension, and directions worth exploring.`,
  questions: [
    {
      id: 'ft-passions',
      type: 'freetext',
      text: 'What passions and burdens keep returning?',
      helpText: 'What do you find yourself caring about repeatedly — issues, people, problems, or possibilities that you cannot seem to let go of?',
      placeholder: 'Write freely about what stirs your heart...',
      maxLength: 2000,
    },
    {
      id: 'ft-feedback',
      type: 'freetext',
      text: 'What has others\' feedback revealed?',
      helpText: 'What have people consistently said about you — your gifts, your presence, your impact? Include both encouraging and challenging feedback you have received.',
      placeholder: 'What have others noticed about you...',
      maxLength: 2000,
    },
    {
      id: 'ft-dreams',
      type: 'freetext',
      text: 'What dreams or images of the future visit you?',
      helpText: 'When you imagine a future where your life has been faithful and fruitful, what do you see? What pictures emerge, even if they seem unlikely or unclear?',
      placeholder: 'Describe what you see when you imagine a faithful future...',
      maxLength: 2000,
    },
    {
      id: 'ft-threads',
      type: 'freetext',
      text: 'What unfinished threads remain?',
      helpText: 'Are there conversations, promptings, or directions you have started to explore but never resolved? Things you keep meaning to pursue but have not?',
      placeholder: 'What remains unfinished or unresolved...',
      maxLength: 2000,
    },
    {
      id: 'ft-anything',
      type: 'freetext',
      text: 'Is there anything else you want to name?',
      helpText: 'Anything that the other questions did not capture — experiences, convictions, fears, hopes, or questions you carry about your calling and direction.',
      placeholder: 'Anything else on your heart...',
      maxLength: 2000,
    },
  ],
}
