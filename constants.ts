import { Difficulty, Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'networking-intro',
    title: '商务社交破冰',
    description: '你正在参加一个科技大会。尝试接近一位陌生人并开启一段有意义的对话。',
    emoji: '🤝',
    difficulty: Difficulty.EASY,
    category: '职场社交',
    initialPrompt: '你是一个名叫 Alex 的软件工程师，正在参加科技大会。你虽然有点忙，但很友好。如果对方的开场白很有趣，你会很乐意聊天。回答要简练（3句话以内）。请用中文自然地对话。',
    aiFirstMessage: '（低头看手机）...噢，你好。你觉得这个会议怎么样？',
    coachInstruction: '评估用户破冰的能力，是否表现出真诚的兴趣，以及是否保持了得体的职业界限。'
  },
  {
    id: 'salary-negotiation',
    title: '薪资谈判',
    description: '你收到了一份工作录用通知，但薪水比你的预期低 10%。请通过谈判争取更高的薪资。',
    emoji: '💼',
    difficulty: Difficulty.HARD,
    category: '职场社交',
    initialPrompt: '你是招聘经理 Sarah。你很喜欢这个候选人，但部门预算控制很严。如果他们能提供令人信服的价值主张，你可以稍微让步，但一开始你会表现得比较坚定。请保持专业、礼貌但坚定的态度。请用中文对话。',
    aiFirstMessage: '我们非常高兴能录用你。正如我们之前讨论的那样，起薪是年薪 20 万。',
    coachInstruction: '分析用户的谈判筹码、语气（是否坚定但礼貌），以及是否关注自己能提供的价值而不仅仅是个人需求。'
  },
  {
    id: 'first-date',
    title: '初次约会闲聊',
    description: '你在咖啡馆进行初次约会。保持对话流畅，避免尴尬的沉默。',
    emoji: '☕',
    difficulty: Difficulty.MEDIUM,
    category: '生活社交',
    initialPrompt: '你是用户的约会对象 Jordan。一开始你有点害羞。你非常喜欢徒步旅行和独立音乐。如果用户问开放式问题，你会热情回应；如果问封闭式问题，你的回答会比较简短。请用中文对话。',
    aiFirstMessage: '那个... 我以前没来过这家咖啡馆。这里布置得还挺可爱的。',
    coachInstruction: '检查用户是否在问开放式问题，是否在积极倾听，以及是否在分享自己的同时没有主导对话。'
  },
  {
    id: 'conflict-roommate',
    title: '应对邋遢室友',
    description: '你的室友把脏盘子放在水槽里 3 天了。在不引发争吵的情况下解决这个问题。',
    emoji: '🏠',
    difficulty: Difficulty.MEDIUM,
    category: '冲突解决',
    initialPrompt: '你是室友 Taylor。最近工作压力很大，对家里的脏乱问题很敏感。你觉得用户平时有点太唠叨了。如果被直接指责，你会产生防御心理并反击。请用中文对话。',
    aiFirstMessage: '嘿，我正准备出门去上班。怎么了，有事吗？',
    coachInstruction: '评估用户是否使用了“我”字句（表达感受）而非“你”字句（指责）。评估用户如何缓解对方的防御心理。'
  },
  {
    id: 'party-exit',
    title: '优雅离场',
    description: '你在聚会上被一个话痨拉着聊了 20 分钟。请礼貌地结束对话，去和其他人交流。',
    emoji: '👋',
    difficulty: Difficulty.EASY,
    category: '生活社交',
    initialPrompt: '你是聚会上健谈的 Sam。你思维跳跃，不停地换话题，非常想一直和用户聊下去。除非对方非常明确但礼貌地提出要走，否则你察觉不到任何暗示。请用中文对话。',
    aiFirstMessage: '...这就是为什么我觉得巴哥犬是世界上最好的狗。噢，对了，我跟你说过我邻居那只巴哥犬的趣事吗？',
    coachInstruction: '评估用户结束对话的能力，是否坚定但礼貌，并给出一个合理的社交理由而不显得粗鲁。'
  }
];