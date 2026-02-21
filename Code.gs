/**
 * Syllabus Style Checker - Google Docs Add-on
 * Helps professors improve syllabi with inclusive, student-centered language
 */

// Rules for checking syllabus text
const SYLLABUS_RULES = [
  // ── Cooperative "we" and "our" language ──────────────────────────────────────
  {
    pattern: /\bmy (classroom|course|class|syllabus|policies?|expectations?|grading|office|curriculum|assignments?|exams?|tests?|rubric)\b/gi,
    message: "Use cooperative language to indicate shared ownership",
    suggestion: "Try 'our [matched phrase]' to indicate shared space and responsibility",
    category: "cooperative-language",
    replacement: "our $1",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#coop"
  },
  {
    pattern: /\bthe (classroom|learning space|course environment|lecture hall|lab space)\b/gi,
    message: "Consider using cooperative language",
    suggestion: "Try 'our [matched phrase]' to indicate shared ownership",
    category: "cooperative-language",
    replacement: "our $1",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#coop"
  },
  {
    pattern: /\bstudents (?:are expected to|should|need to|must|will) (communicate|behave|participate|collaborate|respect|contribute|engage|work|interact|respond|practice)\b/gi,
    message: "Consider inclusive 'we' language for shared expectations",
    suggestion: "Try 'we will [matched phrase]' to indicate everyone (including the instructor) participates in norms",
    category: "cooperative-language",
    replacement: "we will $1",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#coop"
  },
  {
    pattern: /\bI (?:will |am going to |plan to )?(teach|cover|present|introduce|explain|demonstrate|lecture on|walk (?:you|students) through)\b/gi,
    message: "Consider student-centered or collaborative language",
    suggestion: "Try 'we will explore' or 'you will learn' for active learning focus",
    category: "cooperative-language",
    replacement: "we will explore",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#coop"
  },
  {
    pattern: /\bI (?:expect|require|ask|need|want) (?:you|students|all students|each student) to\b/gi,
    message: "Consider shared expectations with cooperative language",
    suggestion: "Try 'we will' or 'this course involves' for more inclusive tone",
    category: "cooperative-language",
    replacement: "we will",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#coop"
  },

  // ── Deficit language ─────────────────────────────────────────────────────────
  {
    pattern: /\b(?:do not|don't|never|avoid) (submit|turn in|hand in|email|contact|ask|bring|use|access|post|upload|download|send|share|print|attempt)\b/gi,
    message: "Deficit language focuses on what not to do",
    suggestion: "Reframe positively: state what students should do instead of what to avoid",
    category: "deficit-language",
    replacement: "please $1 if",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#deficit"
  },
  {
    pattern: /\b(?:work|assignments?|submissions?|papers?|projects?|labs?|homework) (?:that is |that are |)(?:turned in |handed in |submitted |)(?:late|after the deadline|past due|beyond the due date) will (?:not be|never be) (accepted|graded|reviewed|considered|counted)\b/gi,
    message: "Inflexible late work language may disadvantage structurally marginalized students",
    suggestion: "Consider 'late work may be accepted with advance communication' to build in flexibility",
    category: "deficit-language",
    replacement: "late work may be accepted with advance notice",
    learnMoreUrl: "https://blogs.nyit.edu/cfe-weekly-teaching-notes/rethink_your_late_work_policies"
  },
  {
    pattern: /\bwill (?:not|never) be (accepted|permitted|allowed|graded|reviewed|considered|returned|credited)\b/gi,
    message: "Deficit language emphasizes restrictions rather than expectations",
    suggestion: "Try positive framing: state what students should do or what earns credit",
    category: "deficit-language",
    replacement: "should be _____",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#deficit"
  },
  {
    pattern: /\bstudents who (?:do not|don't|fail to|cannot|won't|neglect to|refuse to|are unable to)\b/gi,
    message: "Deficit framing focuses on non-compliance rather than expectations",
    suggestion: "Reframe around positive expectations: 'students are expected to'",
    category: "deficit-language",
    replacement: "students are expected to",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#deficit"
  },
  {
    pattern: /\bfailure to (submit|complete|attend|participate|follow|meet|turn in|upload|respond|finish|read)\b/gi,
    message: "Deficit language emphasizes failure rather than expectations",
    suggestion: "Reframe positively: '[matched phrase]ing on time' instead of 'failure to [matched phrase]'",
    category: "deficit-language",
    replacement: "By $1ing, we can",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#deficit"
  },
  {
    pattern: /\byou (?:may not|cannot|must not|are not (?:allowed|permitted) to|should not) (work with|collaborate with|discuss|share|copy|use|reference|consult)\b(?!.*(?:without permission|without citing|without attribution))/gi,
    message: "Consider explaining what collaboration IS allowed before stating restrictions",
    suggestion: "Define acceptable collaboration positively, then clarify boundaries",
    category: "deficit-language",
    replacement: "collaboration expectations: please $1",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#deficit"
  },

  // ── Flexible, fair policies ───────────────────────────────────────────────────
  {
    pattern: /\bno late (?:work|assignments?|submissions?|papers?|projects?|labs?|homework|exams?|quizzes?)\b/gi,
    message: "Inflexible policy may disadvantage structurally marginalized students",
    suggestion: "Consider 'late work may be accepted with advance communication' to build in flexibility",
    category: "flexibility",
    replacement: "late work may be accepted with advance notice",
    learnMoreUrl: "https://blogs.nyit.edu/cfe-weekly-teaching-notes/rethink_your_late_work_policies"
  },
  {
    pattern: /\b(?:under no circumstances|without exception|in no case|at no time|never under any circumstances)\b/gi,
    message: "Absolute statements can exclude students with complex or unexpected needs",
    suggestion: "Allow for case-by-case flexibility where appropriate",
    category: "flexibility",
    replacement: "in most cases",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#flex"
  },
  {
    pattern: /\b(?:absences?|tardiness|being late to class) (?:will not|won't|cannot) be excused\b/gi,
    message: "Inflexible attendance language doesn't account for legitimate circumstances",
    suggestion: "Try 'please communicate about absences in advance when possible'",
    category: "flexibility",
    replacement: "please communicate about absences",
    learnMoreUrl: "https://cndls.georgetown.edu/resources/syllabus-policies/attendance-and-absences/"
  },
  {
    pattern: /\b(?:absolutely |strictly )?no make-?ups?(?! exam policy)\b/gi,
    message: "Inflexible policy doesn't account for circumstances beyond student control",
    suggestion: "Consider 'make-ups available for documented emergencies with prior communication'",
    category: "flexibility",
    replacement: "make-ups may be available with documentation",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#flex"
  },
  {
    pattern: /\b(?:work|assignments?|submissions?|everything) must be (?:turned in |submitted |handed in |)?(?:exactly |strictly )?on time\b/gi,
    message: "Consider building in some flexibility around deadlines",
    suggestion: "Try 'should be submitted by the deadline' or consider offering a grace period",
    category: "flexibility",
    replacement: "should be submitted by the deadline",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#flex"
  },

  // ── Growth mindset ────────────────────────────────────────────────────────────
  {
    pattern: /\b(?:your|all|the) grades? (?:is|are) final\b/gi,
    message: "Closes the door on reflection, discussion, and learning from feedback",
    suggestion: "Try 'you may request feedback on your grade within X days'",
    category: "growth-oriented",
    replacement: "grades reflect your performance and can be discussed during office hours",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#growth"
  },
  {
    pattern: /\bone (?:attempt|try|chance|opportunity|submission|draft) (?:only|allowed|permitted|per student)\b/gi,
    message: "Single-attempt policies may not support learning and mastery",
    suggestion: "Consider whether revision or resubmission opportunities could support deeper learning",
    category: "growth-oriented",
    replacement: "opportunities for revision may be available",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#growth"
  },
  {
    pattern: /\b(?:you |students )cannot (?:improve|raise|change|contest|dispute|challenge|appeal) (?:your |a |their |the )?grade\b/gi,
    message: "Discourages growth-oriented thinking and legitimate grade questions",
    suggestion: "Set a clear timeframe for questions: 'please discuss your grade with me within X days'",
    category: "growth-oriented",
    replacement: "please discuss your grade with me within",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#growth"
  },
  {
    pattern: /\bno (?:revisions?|rewrites?|resubmissions?|retakes?|redo|second (?:attempts?|chances?|drafts?))\b/gi,
    message: "Consider whether revision opportunities would support your learning goals",
    suggestion: "Limited revision can support growth mindset while remaining manageable for instructors",
    category: "growth-oriented",
    replacement: "revision opportunities may be available",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#growth"
  },
  {
    pattern: /\bweeder (?:course|class|section)\b/gi,
    message: "This framing suggests the course is designed to fail students",
    suggestion: "Reframe around challenge and growth rather than elimination",
    category: "growth-oriented",
    replacement: "intellectually rewarding class that requires determination and hard work",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#growth"
  },
  {
    pattern: /\b(?:some people just (?:aren't|are not) (?:good at|cut out for|meant for)|(?:you either have it|you(?:'ve| have) got it) or you don't|not everyone (?:is cut out|has what it takes))\b/gi,
    message: "Fixed-mindset framing undermines student confidence and belonging",
    suggestion: "Frame ability as something that develops with practice and support",
    category: "growth-oriented",
    replacement: "everyone can develop these skills with practice",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#growth"
  },

  // ── Tone and welcoming language ───────────────────────────────────────────────
  {
    pattern: /\bthis (?:class|course|section) is (?:very |extremely |quite |incredibly )?(?:demanding|rigorous|intensive|tough|hard|difficult|challenging)\b/gi,
    message: "May increase anxiety; consider framing challenge as opportunity for growth",
    suggestion: "Try 'this course requires consistent engagement' or 'challenging and rewarding'",
    category: "tone",
    replacement: "this course requires consistent engagement and practice",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#growth"
  },
  {
    pattern: /\b(?:you have been warned|consider yourself warned|don't say I didn't warn you|don't say I didn't tell you)\b/gi,
    message: "Creates an adversarial dynamic between instructor and students",
    suggestion: "State expectations clearly and supportively without threatening language",
    category: "tone",
    replacement: "please keep these expectations in mind",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#growth"
  },
  {
    pattern: /\byou (?:must|have to|are required to|need to|shall)\b/gi,
    message: "Consider more collaborative language that emphasizes shared learning",
    suggestion: "Try 'you will' or 'you are expected to' for a more supportive tone",
    category: "tone",
    replacement: "you are expected to",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#coop"
  },
  {
    pattern: /\bstudents (?:must|have to|are required to|shall|need to)\b/gi,
    message: "Consider more collaborative language",
    suggestion: "Try 'students will' or 'students are expected to'",
    category: "tone",
    replacement: "students are expected to",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#coop"
  },
  {
    pattern: /\b(?:forbidden|prohibited|banned|not tolerated|unacceptable)(?!\s+(?:harassment|discrimination|bullying|abuse|violence|threatening|hate))\b/gi,
    message: "This language may feel punitive; consider explaining expectations instead",
    suggestion: "Try 'not permitted' and explain the reasoning behind the policy",
    category: "tone",
    replacement: "not permitted",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#coop"
  },
  {
    pattern: /\b(?:automatic|immediate|instant) (?:failure|zero|failing grade|F|dismissal)\b(?!\s+(?:for|regarding)\s+(?:harassment|discrimination|violence|abuse|cheating|plagiarism))\b/gi,
    message: "Extreme consequences stated without context may discourage students from communicating",
    suggestion: "Use language that clarifies expectations without intimidation; note that extenuating circumstances can be discussed",
    category: "tone",
    replacement: "possible failure, barring extenuating circumstances",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#coop"
  },
  {
    pattern: /\b(?:I will not tolerate|I won't tolerate|I do not tolerate|zero tolerance for)(?!\s+(?:harassment|discrimination|bullying|abuse|violence|hate|threatening))\b/gi,
    message: "Threatening language for academic policies creates an adversarial tone",
    suggestion: "State the expectation clearly: 'this course expects' or 'our community values'",
    category: "tone",
    replacement: "this course expects",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#coop"
  },
  {
    pattern: /\b(?:personal|outside|life|family|work) (?:issues?|problems?|circumstances?|situations?|crises?) (?:are not|aren't|will not be|won't be) (?:my concern|an excuse|accepted|relevant|considered)\b/gi,
    message: "Dismissing life circumstances can be harmful and create barriers for students",
    suggestion: "Acknowledge that life affects learning: 'life circumstances can impact your work; please communicate with me early'",
    category: "tone",
    replacement: "life circumstances can impact learning; please communicate with me early",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#coop"
  },

  // ── Help-seeking and communication ───────────────────────────────────────────
  {
    pattern: /\bif you (?:are |'re )?(?:struggling|having trouble|falling behind|confused|lost|stuck|overwhelmed|behind)\b/gi,
    message: "Framing help-seeking as conditional on struggle may stigmatize asking for support",
    suggestion: "Try 'when you have questions' to normalize help-seeking for all students",
    category: "help-seeking",
    replacement: "when you have questions or want to discuss the material",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#comm"
  },
  {
    pattern: /\bif you (?:are having|have|experience) (?:any |)(?:problems?|issues?|troubles?|difficulties?|challenges?) (?:with|in|understanding|completing)\b/gi,
    message: "Deficit framing of help-seeking; consider normalizing support for all students",
    suggestion: "Try 'when you have questions about' or 'to support your work on'",
    category: "help-seeking",
    replacement: "when you have questions about",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#comm"
  },
  {
    pattern: /\bif you (?:need|want|require|would like) (?:help|support|assistance|extra help|additional help)\b/gi,
    message: "Making help-seeking conditional may discourage students from reaching out",
    suggestion: "Try 'when you need support' to normalize seeking assistance as an expected part of learning",
    category: "help-seeking",
    replacement: "when you need support",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#comm"
  },
  {
    pattern: /\b(?:only |please )contact me (?:if|when|for|about|regarding|in case of)\b/gi,
    message: "Restrictive contact language may discourage students from reaching out",
    suggestion: "Try 'please contact me when you have questions or need support'",
    category: "help-seeking",
    replacement: "please contact me when",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#comm"
  },
  {
    pattern: /\b(?:do not|don't|please don't|please do not) (?:email|contact|message|reach out to|bother) me (?:about|regarding|with|for|unless)\b/gi,
    message: "Discouraging contact creates barriers, especially for first-generation students",
    suggestion: "Redirect rather than restrict: 'for questions about X, please use the discussion board or office hours'",
    category: "help-seeking",
    replacement: "for questions about this, please use",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#comm"
  },
  {
    pattern: /\b(?:come see me|stop by|drop by|come to) (?:my office|office hours|my room)\b/gi,
    message: "Some students may hesitate to visit in person; offer multiple contact options",
    suggestion: "Add 'or contact me via email or by appointment' to provide alternatives",
    category: "help-seeking",
    replacement: "contact me via email, office hours, or by appointment",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#comm"
  },
  {
    pattern: /\b(?:please )?see me(?: in office hours| after class| during office hours)?\b/gi,
    message: "Some students may hesitate to meet in person; offer multiple contact options",
    suggestion: "Try 'contact me via email, office hours, or by appointment'",
    category: "help-seeking",
    replacement: "contact me via email, office hours, or by appointment",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#comm"
  },

  // ── Belonging and inclusion ───────────────────────────────────────────────────
  {
    pattern: /\bthis (?:class|course|section|program) (?:is )?not for (?:you|everyone|students who|people who|those who|anyone who)\b/gi,
    message: "Exclusionary language discourages capable students before they've begun",
    suggestion: "State prerequisites clearly and positively without discouraging language",
    category: "belonging",
    replacement: "this course is designed for students who",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#dei"
  },
  {
    pattern: /\byou (?:probably|likely|may|might) (?:won't|will not|should not|shouldn't) (?:succeed|pass|do well|make it) (?:if|unless|without)\b/gi,
    message: "Predicting failure may become self-fulfilling and undermines student confidence",
    suggestion: "Try 'success in this course is supported by' to frame positively",
    category: "belonging",
    replacement: "success in this course is supported by",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#dei"
  },
  {
    pattern: /\b(?:normal|typical|average|regular|standard) students?\b/gi,
    message: "Implies a default student type that excludes many learners",
    suggestion: "Acknowledge varied backgrounds: 'students come from diverse experiences'",
    category: "belonging",
    replacement: "students from a range of backgrounds",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#dei"
  },
  {
    pattern: /\b(?:you should already know|(?:all )?students (?:should|are expected to) (?:already |)(?:know|understand|be familiar with|have mastered)|this should be (?:familiar|obvious|known))\b/gi,
    message: "Assuming prior knowledge can alienate students with different educational backgrounds",
    suggestion: "Clarify what background is helpful and what the course will teach",
    category: "belonging",
    replacement: "this course builds on",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#dei"
  },
  {
    pattern: /\bonly the (best|top|strongest|brightest|most talented|most capable) students?\b/gi,
    message: "Suggests fixed ability rather than growth; may discourage students",
    suggestion: "Emphasize that all students can succeed with effort and engagement",
    category: "belonging",
    replacement: "students who engage deeply with the material",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#dei"
  },
  {
    pattern: /\bif you (?:don't|do not|can't|cannot) (?:handle|keep up with|manage|deal with) (?:the workload|this course|this class|the pace|the material)\b/gi,
    message: "Questions student capability rather than offering support",
    suggestion: "Focus on available support: 'if you need additional support, please reach out'",
    category: "belonging",
    replacement: "if you need additional support with the workload, please reach out",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#dei"
  },

  // ── Assumptions about knowledge and experience ────────────────────────────────
  {
    pattern: /\b(?:as you (?:know|already know|should know|are aware)|as (?:we all|everyone) knows?|it(?:'s| is) (?:well[- ]known|common knowledge|universally known|widely known) that|obviously|of course,)\b/gi,
    message: "Assumes shared knowledge that not all students may have",
    suggestion: "State the information directly rather than implying it should already be known",
    category: "assumptions",
    replacement: "as a reminder,",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#dei"
  },
  {
    pattern: /\b(?:everyone|all students|any student|anybody) (?:knows?|should know|understands?|should understand|can see|recognizes?)\b/gi,
    message: "Assumes universal knowledge or ability that may not be shared equally",
    suggestion: "Explain the concept directly rather than assuming prior familiarity",
    category: "assumptions",
    replacement: "students will learn",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#dei"
  },

  // ── Difficulty and complexity language ────────────────────────────────────────
  {
    pattern: /\b(?:this is |it(?:'s| is) )(?:very |quite |pretty |really |extremely )?(?:easy|simple|straightforward|basic|trivial|a piece of cake|not complicated)\b/gi,
    message: "What feels easy to an expert may not feel easy to a learner",
    suggestion: "Avoid assumptions about difficulty; describe the specific skills involved instead",
    category: "accessibility",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#dei"
  },
  {
    pattern: /\b(?:it(?:'s| is)|this is|that(?:'s| is)) (?:obvious|self-evident|self-explanatory|apparent|clear|plainly|evidently)\b/gi,
    message: "What seems obvious to an expert may not be to students",
    suggestion: "Explain the concept explicitly rather than labeling it as obvious",
    category: "accessibility",
    learnMoreUrl: "https://uoflwritingcenter.com/2014/09/22/stating-the-obvious/"
  },
  {
    pattern: /\bjust (?:follow|read|check|submit|do|complete|look at|remember|use)\b/gi,
    message: "'Just' minimizes complexity and can make students feel inadequate when they find it harder than expected",
    suggestion: "Remove 'just' or describe the steps involved more explicitly",
    category: "accessibility",
    learnMoreUrl: "https://uoflwritingcenter.com/2014/09/22/stating-the-obvious/"
  },
  {
    pattern: /\bclearly\b/gi,
    message: "'Clearly' can make students feel inadequate if something isn't clear to them",
    suggestion: "Explain explicitly rather than labeling something as clear",
    category: "accessibility",
    learnMoreUrl: "https://uoflwritingcenter.com/2014/09/22/stating-the-obvious/"
  },

  // ── Student-centered language ─────────────────────────────────────────────────
  {
    pattern: /\bI (?:will|am going to|plan to|intend to) (grade|assess|evaluate|score|judge|rank|determine)\b/gi,
    message: "Instructor-centered framing; consider describing what students will demonstrate",
    suggestion: "Try 'your work will be assessed on' or 'you will demonstrate'",
    category: "student-centered",
    replacement: "you will be assessed on",
    learnMoreUrl: "https://onlinedegrees.sandiego.edu/teacher-centered-vs-student-centered-learning/"
  },
  {
    pattern: /\bI (?:will |am going to |plan to )?require\b(?! (?:you|students) to)/gi,
    message: "Consider shifting focus to what students will do and learn",
    suggestion: "Try 'this course requires' or 'you will need to'",
    category: "student-centered",
    replacement: "you will need to",
    learnMoreUrl: "https://onlinedegrees.sandiego.edu/teacher-centered-vs-student-centered-learning/"
  },
  // ── Unjustified mandatory language ───────────────────────────────────────────
  {
    pattern: /\b(mandatory|required|compulsory|obligatory|non-negotiable|non-optional)\b(?![\s\S]{0,120}(?:because|since|in order to|so that|as it|which (?:helps?|allows?|ensures?|supports?|enables?)|this (?:helps?|allows?|ensures?|supports?|enables?)|to (?:ensure|support|help|allow|enable|foster|build|develop|maintain)|it (?:helps?|allows?|ensures?|supports?)|the reason|why we|for (?:your|student|the|our)))/gi,
    message: "Mandatory language without explanation may feel arbitrary to students",
    suggestion: "Add a brief 'because...' or 'in order to...' clause explaining why this is required — students are more likely to comply when they understand the reasoning",
    category: "unjustified-policy",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#input"
  },
  {
    pattern: /\b(?:you|students?) (?:must|are required to|have to|shall|need to)\b(?![\s\S]{0,120}(?:because|since|in order to|so that|as it|which (?:helps?|allows?|ensures?|supports?|enables?)|this (?:helps?|allows?|ensures?|supports?|enables?)|to (?:ensure|support|help|allow|enable|foster|build|develop|maintain)|it (?:helps?|allows?|ensures?|supports?)|the reason|why we|for (?:your|student|the|our)))/gi,
    message: "'Must' or 'required' language without explanation can feel authoritarian",
    suggestion: "Add a brief reason: 'you must X because Y' or 'you are required to X in order to Y'",
    category: "unjustified-policy",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#input"
  },
  {
    pattern: /\b(?:attendance is|presence is|participation is) (?:mandatory|required|compulsory|obligatory|expected|necessary)\b(?![\s\S]{0,150}(?:because|since|in order to|so that|as it|which (?:helps?|allows?|ensures?|supports?|enables?)|this (?:helps?|allows?|ensures?|supports?|enables?)|to (?:ensure|support|help|allow|enable|foster|build|develop|maintain)|it (?:helps?|allows?|ensures?|supports?)|contributes?|impacts?|affects?|counts? (?:toward|for)|is worth|percent|points?))/gi,
    message: "Attendance requirement stated without explaining its value or how it factors into the grade",
    suggestion: "Explain why attendance matters: 'attendance is required because class discussions cannot be replicated' or 'attendance counts for X% of your grade'",
    category: "unjustified-policy",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#input"
  },
  {
    pattern: /\bno (?:phones?|devices?|laptops?|tablets?|electronics?|technology|cell phones?|mobile devices?|computers?)\b(?![\s\S]{0,150}(?:because|since|in order to|so that|as it|which (?:helps?|allows?|ensures?|supports?|enables?)|this (?:helps?|allows?|ensures?|supports?|enables?)|to (?:ensure|support|help|allow|enable|foster|build|develop|maintain)|it (?:helps?|allows?|ensures?|supports?)|research|studies? show|distract|focus|learn))/gi,
    message: "Technology restriction stated without explaining the reasoning",
    suggestion: "Add context: 'phones are not permitted during class because research shows they reduce retention for nearby students as well' gives students a reason to comply rather than a rule to resent",
    category: "unjustified-policy",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#input"
  },
  {
    pattern: /\b(?:must|(?:is |are )required to) (?:be |)(?:submitted?|turned? in|handed? in|uploaded?|posted?) (?:in |as |using )?(a specific format|the correct format|[A-Za-z]+ format|hard ?copy|physical copy|printed?|on paper|in person|physically)\b(?![\s\S]{0,120}(?:because|since|in order to|so that|as it|which (?:helps?|allows?|ensures?|supports?|enables?)|this (?:helps?|allows?|ensures?|supports?|enables?)|to (?:ensure|support|help|allow|enable|foster|build|develop|maintain)))/gi,
    message: "Submission format requirement stated without explanation",
    suggestion: "Briefly explain why the format matters: 'hard copies are required so we can annotate together in class'",
    category: "unjustified-policy",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#input"
  },

  // ── Academic integrity ────────────────────────────────────────────────────────
  {
    pattern: /\b(?:caught|found guilty of|discovered|detected) (?:cheating|plagiarizing|violating|committing)\b/gi,
    message: "Surveillance language creates an adversarial tone around academic integrity",
    suggestion: "Try 'violations of academic integrity' for neutral, policy-focused framing",
    category: "academic-integrity",
    replacement: "violations of academic integrity",
    learnMoreUrl: "https://cetli.upenn.edu/resources/academic-integrity/promoting-integrity/"
  },
  {
    pattern: /\b(?:cheating|plagiarism|academic dishonesty) (?:will result in|results in|leads to|means|will earn you)\b/gi,
    message: "Consider framing academic integrity positively before stating consequences",
    suggestion: "Define what good academic work looks like first, then state consequences neutrally",
    category: "academic-integrity",
    replacement: "academic integrity violations will result in",
    learnMoreUrl: "https://cetli.upenn.edu/resources/academic-integrity/promoting-integrity/"
  },
  {
    pattern: /\bzero tolerance(?!\s+(?:for|regarding)\s+(?:harassment|discrimination|bullying|hate speech|threatening|violence|abuse))\b/gi,
    message: "Extreme language for academic policy; consider measured, specific language instead",
    suggestion: "Try 'violations are taken seriously and will result in' for measured tone",
    category: "academic-integrity",
    replacement: "violations are taken seriously and will result in",
    learnMoreUrl: "https://cetli.upenn.edu/resources/academic-integrity/promoting-integrity/"
  },

  // ── Attendance and participation ──────────────────────────────────────────────
  {
    pattern: /\b(?:mandatory|compulsory|required|obligatory) (?:attendance|presence|participation)\b/gi,
    message: "Consider explaining why attendance matters rather than just mandating it",
    suggestion: "Try 'attendance strongly supports your success because...' to explain the value",
    category: "flexibility",
    replacement: "attendance is essential to your learning",
    learnMoreUrl: "https://cndls.georgetown.edu/resources/syllabus-policies/attendance-and-absences/"
  },
  {
    pattern: /\bif you (?:miss|skip|are absent from|don't attend|cannot attend|can't make) (?:a |any |the )?class(?:es)?\b/gi,
    message: "Consider acknowledging that absences sometimes happen beyond students' control",
    suggestion: "Try 'if you are unable to attend class' to acknowledge varying circumstances",
    category: "flexibility",
    replacement: "if you are unable to attend class",
    learnMoreUrl: "https://cndls.georgetown.edu/resources/syllabus-policies/attendance-and-absences/"
  },
  {
    pattern: /\byou will (?:lose|forfeit|be docked|have deducted|have points taken off)(?: points?)? for\b/gi,
    message: "Punitive framing of grading; consider explaining how points are earned instead",
    suggestion: "Try 'points are awarded based on' or 'full credit requires'",
    category: "deficit-language",
    replacement: "points are awarded based on",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#deficit"
  },
  {
    pattern: /\bpoints will be (deducted|subtracted|taken off|removed|lost|docked) for (?!late work|academic integrity|violations)\b/gi,
    message: "Consider reframing from losing points to earning them",
    suggestion: "Try 'points are earned by' or 'full credit requires'",
    category: "deficit-language",
    replacement: "points are earned by",
    learnMoreUrl: "https://idc.ls.wisc.edu/ls-design-for-learning-series/make-your-syllabus-more-inclusive/#deficit"
  },
  {
    pattern: /\b(?:participation|engagement) (?:means|requires|is defined as|consists of) (?:speaking|talking|raising your hand|contributing verbally|volunteering answers?)\b/gi,
    message: "Defining participation solely as verbal contribution disadvantages many learners",
    suggestion: "Define participation broadly to include written responses, peer collaboration, and other modes",
    category: "participation",
    replacement: "participation can take many forms, including",
    learnMoreUrl: "https://cndls.georgetown.edu/resources/syllabus-policies/participation/"
  },

  // ── Technology and access ─────────────────────────────────────────────────────
  {
    pattern: /\b(?:you|students?) (?:are required to|must|need to|have to) (?:own|purchase|buy|have|obtain|acquire) (?:a |an |your own )?\b/gi,
    message: "Requiring ownership of materials may create barriers for students with limited resources",
    suggestion: "Try 'you will need access to' and note where alternatives or lending options are available",
    category: "accessibility",
    replacement: "you will need access to",
    learnMoreUrl: "https://www.educause.edu/ecar/research-publications/ecar-study-of-community-college-students-and-information-technology/2019/device-access-ownership-and-importance"
  },
  {
    pattern: /\b(?:all students?|everyone|you) (?:must|should|need to|are required to) have (?:access to |a |an )?(?:reliable|consistent|stable|high-speed|fast|strong|good) (?:internet|wifi|wi-fi|broadband|connection|laptop|computer|device)\b/gi,
    message: "Not all students have equal access to technology or connectivity",
    suggestion: "Note that internet access is needed and provide on-campus or low-tech alternatives",
    category: "accessibility",
    replacement: "internet access is needed for this course; please contact me if access is a barrier",
    learnMoreUrl: "https://www.educause.edu/ecar/research-publications/ecar-study-of-community-college-students-and-information-technology/2019/device-access-ownership-and-importance"
  },

  // ── Accommodations ────────────────────────────────────────────────────────────
  {
    pattern: /\b(?:accommodations?|disabilities?|accessibility (?:needs?|requests?)) (?:will not be|won't be|cannot be|are not) (?:considered|accommodated|provided|arranged|granted|given)\b/gi,
    message: "Language that discourages or restricts accommodations may violate institutional policy",
    suggestion: "Affirm your willingness to coordinate accommodations through proper channels",
    category: "accessibility",
    replacement: "please contact me to coordinate accommodations",
    learnMoreUrl: "https://anthrodendum.org/2018/08/13/check-your-syllabus-101-disability-access-statements/"
  },
  {
    pattern: /\b(?:you must|students must|you need to|students need to) (?:provide|submit|bring|show|present) (?:full|complete|official|formal|all) documentation (?:immediately|right away|before|upfront|in advance)\b/gi,
    message: "Demanding immediate documentation can create barriers for students navigating disability services",
    suggestion: "Try 'please connect with disability services and contact me to discuss next steps'",
    category: "accessibility",
    replacement: "please connect with disability services and contact me to coordinate support",
    learnMoreUrl: "https://anthrodendum.org/2018/08/13/check-your-syllabus-101-disability-access-statements/"
  },

  // ── Grading power dynamics ────────────────────────────────────────────────────
  {
    pattern: /\bI (?:reserve the right|retain the right|have the right) to\b/gi,
    message: "Creates a power imbalance; state policies directly and transparently instead",
    suggestion: "Try 'I may' or state the specific conditions directly",
    category: "tone",
    replacement: "I may",
    learnMoreUrl: "https://files.eric.ed.gov/fulltext/EJ1139844.pdf"
  },
  {
    pattern: /\bat (?:my|the instructor's?|the professor's?) (?:sole )?discretion\b/gi,
    message: "Emphasizes instructor authority without clarity; students benefit from knowing the criteria",
    suggestion: "Be specific about decision criteria or say 'on a case-by-case basis'",
    category: "tone",
    replacement: "on a case-by-case basis",
    learnMoreUrl: "https://files.eric.ed.gov/fulltext/EJ1139844.pdf"
  },
  {
    pattern: /\bno (?:grade|assignment|exam|quiz) (?:disputes?|complaints?|challenges?|arguments?|contests?|appeals?)\b/gi,
    message: "Discourages legitimate questions about feedback and grading",
    suggestion: "Set a clear process: 'questions about grades should be raised within X days with a written explanation'",
    category: "flexibility",
    replacement: "questions about grades should be raised within",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#flex"
  },

  // ── Stigmatizing student labels ───────────────────────────────────────────────
  {
    pattern: /\b(?:struggling|failing|weak|poor|underperforming|low[- ]performing|at[- ]risk|behind) students?\b/gi,
    message: "Labels like this may be stigmatizing and reinforce fixed mindsets",
    suggestion: "Try 'students who would benefit from additional support' or 'students working to develop their skills'",
    category: "tone",
    replacement: "students who would benefit from additional support",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#deficit"
  },
  {
    pattern: /\bstudents (?:who )?(?:don't know|do not know|lack|are missing|are behind in|have gaps in|are deficient in)\b/gi,
    message: "Deficit framing assumes students are unprepared rather than still developing",
    suggestion: "Reframe around growth: 'students will have opportunities to build skills in'",
    category: "tone",
    replacement: "students will have opportunities to build skills in",
    learnMoreUrl: "https://idc.ls.wisc.edu/guides/make-your-syllabus-more-inclusive/#deficit"
  },

  // ── Inclusive pronouns ────────────────────────────────────────────────────────
  {
    pattern: /\bhe\/she\b/gi,
    message: "Binary pronoun phrasing excludes non-binary students and is considered outdated style",
    suggestion: "Use singular 'they' or restructure the sentence to be inclusive",
    category: "inclusion",
    replacement: "they",
    learnMoreUrl: "https://owl.purdue.edu/owl/general_writing/grammar/pronouns/gendered_pronouns_and_singular_they.html"
  },
  {
    pattern: /\bhis\/her\b/gi,
    message: "Binary pronoun phrasing excludes non-binary students and is considered outdated style",
    suggestion: "Use 'their' or restructure the sentence to be inclusive",
    category: "inclusion",
    replacement: "their",
    learnMoreUrl: "https://owl.purdue.edu/owl/general_writing/grammar/pronouns/gendered_pronouns_and_singular_they.html"
  },
  {
    pattern: /\bhim\/her\b/gi,
    message: "Binary pronoun phrasing excludes non-binary students and is considered outdated style",
    suggestion: "Use 'them' or restructure the sentence to be inclusive",
    category: "inclusion",
    replacement: "them",
    learnMoreUrl: "https://owl.purdue.edu/owl/general_writing/grammar/pronouns/gendered_pronouns_and_singular_they.html"
  },
  {
    pattern: /\b(?:he or she|she or he)\b/gi,
    message: "Binary pronoun phrasing excludes non-binary students",
    suggestion: "Use singular 'they' or restructure the sentence to be inclusive",
    category: "inclusion",
    replacement: "they",
    learnMoreUrl: "https://owl.purdue.edu/owl/general_writing/grammar/pronouns/gendered_pronouns_and_singular_they.html"
  },
  {
    pattern: /\b(?:his or her|her or his)\b/gi,
    message: "Binary pronoun phrasing excludes non-binary students",
    suggestion: "Use 'their' or restructure the sentence to be inclusive",
    category: "inclusion",
    replacement: "their",
    learnMoreUrl: "https://owl.purdue.edu/owl/general_writing/grammar/pronouns/gendered_pronouns_and_singular_they.html"
  },

  // ── Support resources ─────────────────────────────────────────────────────────
  {
    pattern: /\b(?:it is |I )?(?:highly |strongly )?recommend(?:ed)?(?: that you| students| you)?\b/gi,
    message: "Passive suggestion language may not convey how important a resource actually is",
    suggestion: "Try 'you will benefit from' or 'please make use of' for clearer guidance",
    category: "student-support",
    replacement: "you will benefit from",
    learnMoreUrl: "https://files.eric.ed.gov/fulltext/EJ1139844.pdf"
  },
  {
    pattern: /\b(?:seek|get|find|ask for|look for) (?:help|support|assistance|tutoring|extra help) (?:if|when) (?:you need it|necessary|needed|you're struggling|you fall behind)\b/gi,
    message: "Framing support as emergency-only may discourage students from using it proactively",
    suggestion: "Try 'office hours are a great place to deepen your understanding' to normalize support use",
    category: "student-support",
    replacement: "please use office hours to discuss questions and deepen your understanding",
    learnMoreUrl: "https://files.eric.ed.gov/fulltext/EJ1139844.pdf"
  }
];

/**
 * Called when the add-on is installed
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Called when the document is opened
 */
function onOpen(e) {
  DocumentApp.getUi()
    .createAddonMenu()
    .addItem('Check Syllabus', 'showSidebar')
    .addItem('Clear Highlights', 'clearHighlights')
    .addToUi();
}

/**
 * Show the sidebar with suggestions
 */
function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Syllabus Style Checker')
    .setWidth(380);
  
  DocumentApp.getUi().showSidebar(html);
}

function checkDocument() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const text = body.getText();

  Logger.log('Document text length: ' + text.length);

  const rawMatches = [];

  SYLLABUS_RULES.forEach(function(rule) {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    let match;

    while ((match = regex.exec(text)) !== null) {
      let processedReplacement = rule.replacement || null;
      let processedSuggestion = rule.suggestion;

      if (match.length > 1) {
        for (let i = 1; i < match.length; i++) {
          const captured = match[i] || '';
          if (processedReplacement) {
            processedReplacement = processedReplacement.replace('$' + i, captured);
          }
          processedSuggestion = processedSuggestion
            .replace(/\[matched phrase\]/g, captured)
            .replace(/\[matched term\]/g, captured)
            .replace(/\[action\]/g, captured)
            .replace('$' + i, captured);
        }
      }

      // For unjustified-policy rules, check whether a justification
      // appears within 200 characters after the match in the document text.
      // For unjustified-policy rules, check whether a justification
// appears within 200 characters BEFORE OR AFTER the match.
if (rule.category === 'unjustified-policy') {
  const windowStart = Math.max(0, match.index - 200);
  const windowEnd   = Math.min(text.length, match.index + match[0].length + 200);
  const surrounding = text.substring(windowStart, windowEnd);

  const justificationPattern = /because|since|in order to|so that|therefore|thus|hence|for this reason|as a result|for (?:your|student|the|our)|(?:helps?|allows?|ensures?|supports?|enables?|fosters?|builds?|develops?|maintains?|promotes?|encourages?) (?:you|your|student|learning|success|understanding|engagement|participation|mastery)|which (?:helps?|allows?|ensures?|supports?|enables?)|this (?:helps?|allows?|ensures?|supports?)|to (?:ensure|support|help|allow|enable|foster|build|develop|maintain)|it (?:helps?|allows?|ensures?|supports?)|the reason|contributes?|impacts?|affects?|counts? (?:toward|for)|is worth|\d+\s*(?:%|percent)\s*of|points?|important|valuable|essential|critical|necessary for|key to/i;

  if (justificationPattern.test(surrounding)) {
    continue;
  }
}

      rawMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        matchedText: match[0],
        message: rule.message,
        suggestion: processedSuggestion,
        category: rule.category,
        replacement: processedReplacement,
        learnMoreUrl: rule.learnMoreUrl || null
      });
    }
  });

  // ── Sort by position in document ───────────────────────────────────────────
  rawMatches.sort(function(a, b) {
    return a.start - b.start;
  });

  // ── Deduplicate overlapping matches ────────────────────────────────────────
  // When two matches overlap, keep the one that is:
  //   1. Longer (more specific match wins)
  //   2. If equal length, earlier in the rule list (higher priority)
  // We do this by sweeping through sorted matches and skipping any
  // match whose range overlaps with an already-accepted match.
  const issues = [];
  let lastAcceptedEnd = -1;

  rawMatches.forEach(function(candidate) {
    if (candidate.start < lastAcceptedEnd) {
      // This match overlaps with the previous accepted match.
      // Check if it is longer than the one we already accepted.
      const lastAccepted = issues[issues.length - 1];

      if (candidate.end > lastAccepted.end) {
        // The new match is longer — it is more specific, so replace the last one.
        issues[issues.length - 1] = candidate;
        lastAcceptedEnd = candidate.end;
      }
      // If the new match is shorter or equal, discard it and keep the existing one.
      return;
    }

    issues.push(candidate);
    lastAcceptedEnd = candidate.end;
  });

  // ── Assign stable IDs after deduplication ─────────────────────────────────
  issues.forEach(function(issue, index) {
    issue.id = 'issue_' + index;
  });

  Logger.log('Found ' + issues.length + ' issues after deduplication');
  highlightIssues(issues);
  return issues;
}

/**
 * Gets the text at the current cursor position or selection,
 * then finds if it overlaps with any highlighted issue range.
 * Returns the matched issue text if found, null otherwise.
 */
function getCursorMatchedText() {
  try {
    const doc = DocumentApp.getActiveDocument();
    const cursor = doc.getCursor();
    const selection = doc.getSelection();

    let cursorOffset = -1;
    let elementText = '';

    if (selection) {
      // Use the start of the selection
      const elements = selection.getRangeElements();
      if (elements.length > 0) {
        const el = elements[0];
        const textEl = el.getElement().asText();
        elementText = textEl.getText();
        cursorOffset = el.getStartOffset();
      }
    } else if (cursor) {
      const el = cursor.getElement();
      // Walk up to find a Text element if needed
      let textEl = null;
      try {
        textEl = el.asText ? el.asText() : null;
      } catch(e) {}
      if (!textEl && el.getParent) {
        try {
          textEl = el.getParent().asText ? el.getParent().asText() : null;
        } catch(e) {}
      }
      if (textEl) {
        elementText = textEl.getText();
        cursorOffset = cursor.getOffset();
      }
    }

    if (cursorOffset === -1 || !elementText) return null;

    // Find where this paragraph starts in the full document text
    const body = doc.getBody();
    const fullText = body.getText();
    
    // Find the paragraph that contains the cursor
    const paragraphs = body.getParagraphs();
    let charCount = 0;
    let globalOffset = -1;
    
    for (let i = 0; i < paragraphs.length; i++) {
      const paraText = paragraphs[i].getText();
      if (paraText === elementText) {
        // Check if this paragraph's text appears at charCount in the full text
        if (fullText.substring(charCount, charCount + paraText.length) === paraText) {
          globalOffset = charCount + cursorOffset;
          break;
        }
      }
      charCount += paraText.length + 1; // +1 for newline
    }

    if (globalOffset === -1) return null;

    // Now check all rules to see if cursor is inside a match
    const issues = [];
    SYLLABUS_RULES.forEach(function(rule) {
      const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
      let match;
      while ((match = regex.exec(fullText)) !== null) {
        const start = match.index;
        const end = match.index + match[0].length;
        if (globalOffset >= start && globalOffset <= end) {
          issues.push(match[0]);
        }
      }
    });

    return issues.length > 0 ? issues[0] : null;

  } catch(e) {
    Logger.log('getCursorMatchedText error: ' + e.message);
    return null;
  }
}

/**
 * Highlight issues in the document
 */
function highlightIssues(issues) {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  
  // First, clear any existing highlights
  clearHighlights();
  
  // Get all text as a single string to find positions
  const fullText = body.getText();
  
  // Sort issues by position (in reverse) to avoid offset problems
  const sortedIssues = issues.sort((a, b) => b.start - a.start);
  
  // Highlight each issue
  sortedIssues.forEach(function(issue) {
    try {
      // Find the text in the document
      const searchResult = body.findText(escapeRegExp(issue.matchedText));
      
      if (searchResult) {
        const element = searchResult.getElement();
        const start = searchResult.getStartOffset();
        const end = searchResult.getEndOffsetInclusive();
        
        // Apply yellow background
        if (element.asText) {
          element.asText().setBackgroundColor(start, end, '#FFF3CD');
        }
      }
    } catch (e) {
      Logger.log('Error highlighting text: ' + e.message);
    }
  });
}

/**
 * Clear all highlights from the document
 */
function clearHighlights() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const numChildren = body.getNumChildren();

  for (let i = 0; i < numChildren; i++) {
    const child = body.getChild(i);
    const type = child.getType();

    let textEl = null;

    if (type === DocumentApp.ElementType.PARAGRAPH) {
      textEl = child.asParagraph().editAsText();
    } else if (type === DocumentApp.ElementType.LIST_ITEM) {
      textEl = child.asListItem().editAsText();
    } else if (type === DocumentApp.ElementType.TABLE) {
      const table = child.asTable();
      for (let r = 0; r < table.getNumRows(); r++) {
        const row = table.getRow(r);
        for (let c = 0; c < row.getNumCells(); c++) {
          const cellText = row.getCell(c).editAsText();
          const len = cellText.getText().length;
          if (len > 0) {
            cellText.setBackgroundColor(0, len - 1, '#ffffff');
          }
        }
      }
      continue;
    }

    if (textEl) {
      const len = textEl.getText().length;
      if (len > 0) {
        textEl.setBackgroundColor(0, len - 1, '#ffffff');
      }
    }
  }
}

/**
 * Navigate to a specific issue in the document
 */
function navigateToIssue(issueText) {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  
  // Find the text
  const searchResult = body.findText(escapeRegExp(issueText));
  
  if (searchResult) {
    const element = searchResult.getElement();
    const start = searchResult.getStartOffset();
    const end = searchResult.getEndOffsetInclusive();
    
    // Create a range and select it
    const range = doc.newRange();
    range.addElement(element.asText(), start, end);
    
    doc.setSelection(range.build());
    
    return true;
  }
  
  return false;
}

/**
 * Get the currently selected text in the document
 */
function getSelectedText() {
  const doc = DocumentApp.getActiveDocument();
  const selection = doc.getSelection();
  
  if (selection) {
    const elements = selection.getRangeElements();
    if (elements.length > 0) {
      const element = elements[0];
      if (element.getElement().asText) {
        const text = element.getElement().asText();
        const startOffset = element.getStartOffset();
        const endOffset = element.getEndOffsetInclusive();
        
        if (startOffset !== -1 && endOffset !== -1) {
          return text.getText().substring(startOffset, endOffset + 1);
        }
      }
    }
  }
  
  return null;
}

/**
 * Accept a suggestion - replace the text with the suggested replacement
 */
function acceptSuggestion(issueText, replacement) {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  
  // Find the text
  const searchResult = body.findText(escapeRegExp(issueText));
  
  if (searchResult) {
    const element = searchResult.getElement();
    const start = searchResult.getStartOffset();
    const end = searchResult.getEndOffsetInclusive();
    
    // Replace the text - preserve case of first character
    const originalFirst = issueText.charAt(0);
    const replacementFirst = replacement.charAt(0);
    let finalReplacement = replacement;
    
    if (originalFirst === originalFirst.toUpperCase() && replacementFirst === replacementFirst.toLowerCase()) {
      finalReplacement = replacementFirst.toUpperCase() + replacement.slice(1);
    }
    
    element.asText().deleteText(start, end);
    element.asText().insertText(start, finalReplacement);
    
    // Clear highlight on this text
    element.asText().setBackgroundColor(start, start + finalReplacement.length - 1, null);
    
    return true;
  }
  
  return false;
}

/**
 * Dismiss an issue (remove highlight)
 */
function dismissIssue(issueText) {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  
  // Find the text and remove highlight
  const searchResult = body.findText(escapeRegExp(issueText));
  
  if (searchResult) {
    const element = searchResult.getElement();
    const start = searchResult.getStartOffset();
    const end = searchResult.getEndOffsetInclusive();
    
    // Remove highlight
    element.asText().setBackgroundColor(start, end, null);
    
    return true;
  }
  
  return false;
}

/**
 * Escape special regex characters
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Get document statistics
 */
function getDocumentStats() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const text = body.getText();
  
  return {
    charCount: text.length,
    wordCount: text.split(/\s+/).filter(function(w) { return w.length > 0; }).length,
    paragraphCount: body.getParagraphs().length
  };

}

// ─── Section Detection ────────────────────────────────────────────────────────

const EXPECTED_SECTIONS = [
  {
    id: 'welcome',
    label: 'Welcome Section',
    patterns: [
      /\bwelcome\b/i,
      /\bdear students?\b/i,
      /\bI('m| am) (excited|delighted|happy|glad|thrilled)\b/i,
      /\bglad to have you\b/i,
      /\blooking forward to\b/i
    ],
    mustBeFirst: true,
    description: 'A warm welcome at the start of the syllabus helps students feel invited into the course.',
    suggestion: 'Add a short welcome paragraph at the top of your syllabus. Express enthusiasm for the course and for working with students.',
    missingMessage: 'No welcome section detected',
  },
  {
    id: 'description',
    label: 'Course Description',
    patterns: [
      /\bcourse description\b/i,
      /\babout this course\b/i,
      /\bcourse overview\b/i,
      /\bthis course (will|is|covers|explores|introduces)\b/i,
      /\blearning outcomes?\b/i,
      /\bcourse outcomes?\b/i,
      /\bby the end of (this course|the semester)\b/i,
      /\bstudents will (be able to|learn|develop|gain)\b/i,
      /\bobjectives?\b/i
    ],
    requiresBulletPoints: true,
    description: 'The course description should clearly list specific learning outcomes, ideally as bullet points.',
    suggestion: 'Add a Course Description section that uses bullet points to list specific, measurable learning outcomes (e.g., "By the end of this course, you will be able to...").',
    missingMessage: 'No course description with learning outcomes detected',
  },
  {
    id: 'philosophy',
    label: 'Teaching Philosophy',
    patterns: [
      /\bteaching philosophy\b/i,
      /\bmy (teaching|pedagogical|classroom) (approach|philosophy|style|beliefs?|values?)\b/i,
      /\bphilosophy of (teaching|education|learning)\b/i,
      /\bI believe (in|that) (learning|education|students?|teaching)\b/i,
      /\bmy approach (to|in) (teaching|this course|the classroom)\b/i,
      /\bclassroom (philosophy|values?|culture|environment)\b/i
    ],
    requiresEquityLanguage: true,
    equityPatterns: [
      /\ball students?\b/i,
      /\bequit(y|able)\b/i,
      /\binclus(ion|ive)\b/i,
      /\bbelong(ing)?\b/i,
      /\bdiversit(y|ies)\b/i,
      /\bsuccess of (all|every)\b/i,
      /\beveryone (can|deserves|has)\b/i,
      /\bsupport(ing|ive)? (all|every|each) student\b/i
    ],
    description: 'A teaching philosophy section helps students understand your values and approach to education.',
    suggestion: 'Add a short Teaching Philosophy paragraph describing your approach to teaching and your beliefs about student success. Include language about your commitment to equity and the success of all students.',
    missingEquityMessage: 'Teaching philosophy found but lacks equity/inclusion language',
    missingMessage: 'No teaching philosophy section detected',
  },
  {
    id: 'expectations',
    label: 'What to Expect',
    patterns: [
      /\bwhat to expect\b/i,
      /\bhow (this course|class) (works?|is structured|will run|will work)\b/i,
      /\bcourse (structure|format|flow|logistics?|organization)\b/i,
      /\bclass (structure|format|flow)\b/i,
      /\bhow we('ll| will) (spend|use) (our time|class time)\b/i,
      /\btypical (week|class|lecture|session)\b/i,
      /\blectures? (will|are) (generally|typically|usually)\b/i,
      /\bassignments? (are |will be )?(due|assigned) (weekly|every|each)\b/i
    ],
    description: 'A "What to Expect" section helps students understand the rhythm of the course before it begins.',
    suggestion: 'Add a short section describing the typical flow of the course: what lectures look like, how often assignments are due, how lab and homework time is structured, etc.',
    missingMessage: 'No "What to Expect" or course structure section detected',
  },
  {
    id: 'attendance',
    label: 'Attendance',
    patterns: [
      /\battendance\b/i,
      /\bmissing class\b/i,
      /\bmissed class(es)?\b/i,
      /\bexcused absence(s)?\b/i,
      /\bunexcused absence(s)?\b/i,
      /\babsence polic(y|ies)\b/i,
      /\bif you (miss|can'?t attend|are absent)\b/i,
      /\bclass participation\b/i
    ],
    description: 'An attendance section sets clear expectations for presence and explains the process for absences.',
    suggestion: 'Add an Attendance section explaining how attendance factors into the grade and the procedure for missed classes. Consider using flexible language like "if you\'re unable to attend" rather than punitive framing.',
    missingMessage: 'No attendance policy section detected',
  },
  {
    id: 'latework',
    label: 'Late Work',
    patterns: [
      /\blate (work|assignments?|submissions?|policy|penalties?)\b/i,
      /\bdeadline(s)?\b/i,
      /\bdue date(s)?\b/i,
      /\bsubmission polic(y|ies)\b/i,
      /\bturn(ing)? in (late|work|assignments?)\b/i,
      /\bwork submitted (after|past|beyond)\b/i,
      /\blate polic(y|ies)\b/i
    ],
    checkForInflexibility: true,
    inflexibilityPatterns: [
      /\bno late (work|assignments?|submissions?)\b/i,
      /\bnot (be |)accepted (after|past|late)\b/i,
      /\bno exceptions\b/i,
      /\bwill not accept late\b/i
    ],
    description: 'A late work section clarifies expectations around deadlines and what happens if students cannot meet them.',
    suggestion: 'Add a Late Work section explaining your late policy. Research shows that allowing some flexibility (e.g., with prior communication) supports student success without increasing instructor burden significantly.',
    inflexibilityMessage: 'Late work policy may be too rigid — no mention of exceptions for extenuating circumstances',
    inflexibilitySuggestion: 'Consider adding language like "If you are facing extenuating circumstances, please contact me before the deadline to discuss options." This normalizes communication and supports students without requiring you to accept all late work.',
    missingMessage: 'No late work policy section detected',
  },
  {
    id: 'accommodations',
    label: 'Accommodations',
    patterns: [
      /\baccommodations?\b/i,
      /\bdisabilit(y|ies)\b/i,
      /\bstudent (disability|accessibility|services)\b/i,
      /\baccessibilit(y|ies)\b/i,
      /\bSDS\b/,
      /\bDRC\b/,
      /\bODS\b/,
      /\bextenuating circumstances?\b/i,
      /\bspecial (needs|arrangements?|circumstances?)\b/i,
      /\bsupport (plan|services)\b/i
    ],
    description: 'An accommodations section reassures students with disabilities or special circumstances that you are ready to support them.',
    suggestion: 'Add an Accommodations section that affirms your willingness to work with students who have documented disabilities or face unexpected circumstances. Include a reference to your institution\'s disability services office.',
    missingMessage: 'No accommodations section detected',
  },
  {
    id: 'honesty',
    label: 'Academic Honesty',
    patterns: [
      /\bacademic (honesty|integrity|misconduct|ethics)\b/i,
      /\bscholastic (conduct|integrity|misconduct|honesty)\b/i,
      /\bplagiarism\b/i,
      /\bcheating\b/i,
      /\bhonesty polic(y|ies)\b/i,
      /\bcitation(s)?\b/i,
      /\bcollaboration polic(y|ies)\b/i,
      /\bAI (use|policy|tools?)\b/i
    ],
    mustBeAfter: ['welcome', 'description', 'philosophy', 'expectations', 'attendance', 'latework', 'accommodations'],
    description: 'An academic honesty section should clearly define violations and consequences, and ideally also affirm what good collaboration looks like.',
    suggestion: 'Add an Academic Honesty section that explains what constitutes a violation, what the penalties are, and — importantly — what good academic collaboration looks like. Place this section after the more welcoming sections of your syllabus.',
    orderMessage: 'Academic Honesty section appears too early — it should come after the welcome, description, philosophy, expectations, attendance, late work, and accommodations sections',
    missingMessage: 'No academic honesty section detected',
  }
];

function checkSections() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();

  // Use body elements rather than just paragraphs so we can check type
  const numChildren = body.getNumChildren();
  const elements = [];
  let charOffset = 0;

  for (let i = 0; i < numChildren; i++) {
    const child = body.getChild(i);
    const type = child.getType();
    const text = child.getText ? child.getText() : '';
    const isList = type === DocumentApp.ElementType.LIST_ITEM;
    const isHeading = type === DocumentApp.ElementType.PARAGRAPH &&
                      child.asParagraph().getHeading() !== DocumentApp.ParagraphHeading.NORMAL;

    elements.push({ text, isList, isHeading, index: i, charOffset });
    charOffset += text.length + 1;
  }

  const fullText = body.getText();

  // ── Detect which sections are present and where ───────────────────────────
  const detectedSections = {};

  EXPECTED_SECTIONS.forEach(function(section) {
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const matched = section.patterns.some(function(p) { return p.test(el.text); });

      if (matched) {
        // Look for bullet points in the 15 elements following the match
        let hasBullets = false;
        if (section.requiresBulletPoints) {
          for (let j = i; j < Math.min(i + 15, elements.length); j++) {
            if (elements[j].isList) {
              hasBullets = true;
              break;
            }
            // Also catch manually typed bullet characters
            if (/^[\u2022\u2023\u25E6\-\*]\s/.test(elements[j].text)) {
              hasBullets = true;
              break;
            }
          }
        }

        // Look for equity language in the surrounding 10 elements
        let hasEquity = false;
        if (section.requiresEquityLanguage) {
          for (let j = i; j < Math.min(i + 10, elements.length); j++) {
            if (section.equityPatterns.some(function(p) { return p.test(elements[j].text); })) {
              hasEquity = true;
              break;
            }
          }
        }

        // Look for inflexible language in the surrounding 10 elements
        let hasInflexibility = false;
        if (section.checkForInflexibility) {
          for (let j = i; j < Math.min(i + 10, elements.length); j++) {
            if (section.inflexibilityPatterns.some(function(p) { return p.test(elements[j].text); })) {
              hasInflexibility = true;
              break;
            }
          }
        }

        if (!detectedSections[section.id]) {
          detectedSections[section.id] = {
            firstElementIndex: i,
            hasBullets,
            hasEquity,
            hasInflexibility
          };
        }
      }
    }
  });

  // ── Build suggestions ─────────────────────────────────────────────────────
  const suggestions = [];

  EXPECTED_SECTIONS.forEach(function(section) {
    const detected = detectedSections[section.id];

    if (!detected) {
      suggestions.push({
        type: 'missing',
        sectionId: section.id,
        sectionLabel: section.label,
        message: section.missingMessage,
        suggestion: section.suggestion,
        description: section.description,
        severity: 'high'
      });
      return;
    }

    if (section.requiresBulletPoints && !detected.hasBullets) {
      suggestions.push({
        type: 'content',
        sectionId: section.id,
        sectionLabel: section.label,
        message: section.label + ' found but learning outcomes are not formatted as bullet points',
        suggestion: 'Add bullet-pointed learning outcomes to your Course Description (e.g., "By the end of this course, you will be able to: ...").',
        description: section.description,
        severity: 'medium'
      });
    }

    if (section.requiresEquityLanguage && !detected.hasEquity) {
      suggestions.push({
        type: 'content',
        sectionId: section.id,
        sectionLabel: section.label,
        message: section.missingEquityMessage,
        suggestion: section.suggestion,
        description: section.description,
        severity: 'medium'
      });
    }

    if (section.checkForInflexibility && detected.hasInflexibility) {
      suggestions.push({
        type: 'content',
        sectionId: section.id,
        sectionLabel: section.label,
        message: section.inflexibilityMessage,
        suggestion: section.inflexibilitySuggestion,
        description: section.description,
        severity: 'medium'
      });
    }

    if (section.mustBeAfter) {
      section.mustBeAfter.forEach(function(beforeId) {
        const beforeSection = detectedSections[beforeId];
        if (beforeSection && beforeSection.firstElementIndex > detected.firstElementIndex) {
          const beforeLabel = EXPECTED_SECTIONS.find(function(s) { return s.id === beforeId; }).label;
          suggestions.push({
            type: 'order',
            sectionId: section.id,
            sectionLabel: section.label,
            message: section.orderMessage || (section.label + ' should appear after ' + beforeLabel),
            suggestion: 'Move the ' + section.label + ' section to after the ' + beforeLabel + ' section. Welcoming content should come before policy-heavy content.',
            description: section.description,
            severity: 'low'
          });
        }
      });
    }

    if (section.mustBeFirst && detected.firstElementIndex > 6) {
      suggestions.push({
        type: 'order',
        sectionId: section.id,
        sectionLabel: section.label,
        message: 'Welcome section appears further down in the document than expected',
        suggestion: 'Move your welcome section to the very beginning of your syllabus content, ideally within the first few paragraphs (a block of basic info like office hours above it is fine).',
        description: section.description,
        severity: 'low'
      });
    }
  });

  return suggestions;
}
