/**
 * Syllabus Style Checker - Google Docs Add-on
 * Helps professors improve syllabi with inclusive, student-centered language
 */

// Rules for checking syllabus text
const SYLLABUS_RULES = [
  // Belonging and Inclusion - with replacements
  {
    pattern: /\byou must\b/gi,
    message: "Consider using more collaborative language",
    suggestion: "Try 'you will' or 'you are expected to' for a more supportive tone",
    category: "tone",
    replacement: "you are expected to",
    learnMoreUrl: "https://www.chronicle.com/article/how-to-make-your-teaching-more-inclusive"
  },
  {
    pattern: /\bstudents must\b/gi,
    message: "Consider using more collaborative language",
    suggestion: "Try 'students will' or 'students are expected to'",
    category: "tone",
    replacement: "students are expected to",
    learnMoreUrl: "https://www.chronicle.com/article/how-to-make-your-teaching-more-inclusive"
  },
  {
    pattern: /\bforbidden\b/gi,
    message: "This language may feel punitive",
    suggestion: "Consider 'not permitted' or explain the reasoning",
    category: "tone",
    replacement: "not permitted",
    learnMoreUrl: "https://citl.illinois.edu/citl-101/teaching-learning/resources/teaching-strategies/creating-an-inclusive-classroom"
  },
  {
    pattern: /\bprohibited\b/gi,
    message: "This language may feel punitive",
    suggestion: "Consider 'not allowed' or explain the reasoning",
    category: "tone",
    replacement: "not allowed",
    learnMoreUrl: "https://citl.illinois.edu/citl-101/teaching-learning/resources/teaching-strategies/creating-an-inclusive-classroom"
  },
  {
    pattern: /\bfailure to\b/gi,
    message: "This phrase emphasizes failure rather than success",
    suggestion: "Try 'if you do not' or reframe positively",
    category: "tone",
    replacement: "if you do not",
    learnMoreUrl: "https://www.brown.edu/sheridan/teaching-learning-resources/inclusive-teaching/approaches"
  },
  {
    pattern: /\bno late work\b/gi,
    message: "Consider building in flexibility for diverse student needs",
    suggestion: "Consider grace periods, drop policies, or flexible deadlines",
    category: "flexibility",
    learnMoreUrl: "https://www.facultyfocus.com/articles/teaching-and-learning/flexible-deadlines-help-students-succeed/"
  },
  {
    pattern: /\blate work will not be accepted\b/gi,
    message: "Consider building in flexibility for diverse student needs",
    suggestion: "Consider grace periods, drop policies, or flexible deadlines",
    category: "flexibility",
    learnMoreUrl: "https://www.facultyfocus.com/articles/teaching-and-learning/flexible-deadlines-help-students-succeed/"
  },
  
  // Clarity and Accessibility
  {
    pattern: /\bplease see me\b/gi,
    message: "Some students may be hesitant to approach",
    suggestion: "Add 'via email, office hours, or by appointment' to provide options",
    category: "accessibility",
    replacement: "please contact me via email, office hours, or by appointment",
    learnMoreUrl: "https://www.washington.edu/teaching/topics/inclusive-teaching/inclusive-syllabus/"
  },
  {
    pattern: /\bcome see me\b/gi,
    message: "Some students may be hesitant to approach",
    suggestion: "Add 'via email, office hours, or by appointment' to provide options",
    category: "accessibility",
    replacement: "contact me via email, office hours, or by appointment",
    learnMoreUrl: "https://www.washington.edu/teaching/topics/inclusive-teaching/inclusive-syllabus/"
  },
  {
    pattern: /\beasy\b/gi,
    message: "What's easy for some may not be for others",
    suggestion: "Avoid assuming difficulty levels; be specific about skills needed",
    category: "accessibility",
    learnMoreUrl: "https://www.insidehighered.com/advice/2020/07/22/why-we-should-avoid-ableist-language-describing-student-learning-opinion"
  },
  {
    pattern: /\bsimple\b/gi,
    message: "What's simple for some may not be for others",
    suggestion: "Avoid assuming difficulty levels; be specific about skills needed",
    category: "accessibility",
    learnMoreUrl: "https://www.insidehighered.com/advice/2020/07/22/why-we-should-avoid-ableist-language-describing-student-learning-opinion"
  },
  {
    pattern: /\bobvious(?:ly)?\b/gi,
    message: "What's obvious to you may not be to students",
    suggestion: "Be specific about what you mean instead of using 'obvious'",
    category: "accessibility",
    learnMoreUrl: "https://www.insidehighered.com/advice/2020/07/22/why-we-should-avoid-ableist-language-describing-student-learning-opinion"
  },
  {
    pattern: /\bclearly\b/gi,
    message: "What's clear to you may not be to students",
    suggestion: "Explain explicitly rather than using 'clearly'",
    category: "accessibility",
    learnMoreUrl: "https://www.insidehighered.com/advice/2020/07/22/why-we-should-avoid-ableist-language-describing-student-learning-opinion"
  },
  {
    pattern: /\bjust\b/gi,
    message: "'Just' can minimize complexity",
    suggestion: "Remove 'just' or be more specific about the task",
    category: "clarity",
    learnMoreUrl: "https://www.chronicle.com/article/how-to-make-your-teaching-more-inclusive"
  },
  
  // Student-Centered Language
  {
    pattern: /\bI expect\b/gi,
    message: "Consider shifting focus from instructor to learning outcomes",
    suggestion: "Try 'Students will' or 'By the end, you will be able to'",
    category: "student-centered",
    replacement: "You will be able to",
    learnMoreUrl: "https://www.teachthought.com/pedagogy/difference-between-teacher-centered-student-centered-learning/"
  },
  {
    pattern: /\bI require\b/gi,
    message: "Consider shifting focus to learning outcomes",
    suggestion: "Try 'This course requires' or 'You will need to'",
    category: "student-centered",
    replacement: "You will need to",
    learnMoreUrl: "https://www.teachthought.com/pedagogy/difference-between-teacher-centered-student-centered-learning/"
  },
  {
    pattern: /\bcheating\b/gi,
    message: "Consider reframing academic integrity positively",
    suggestion: "Focus on learning and academic integrity rather than violations",
    category: "tone",
    replacement: "academic integrity violations",
    learnMoreUrl: "https://www.chronicle.com/article/how-to-promote-academic-integrity"
  },
  {
    pattern: /\bplagiarism\b/gi,
    message: "Consider using more constructive language",
    suggestion: "Frame as 'proper citation' or 'academic integrity' instead",
    category: "tone",
    learnMoreUrl: "https://www.chronicle.com/article/how-to-promote-academic-integrity"
  },
  
  // Flexibility and Support
  {
    pattern: /\bno exceptions\b/gi,
    message: "Absolute language may discourage students from seeking help",
    suggestion: "Consider 'exceptions require prior arrangement' or similar",
    category: "flexibility",
    replacement: "exceptions require prior arrangement",
    learnMoreUrl: "https://www.facultyfocus.com/articles/teaching-and-learning/flexible-deadlines-help-students-succeed/"
  },
  {
    pattern: /\bzero tolerance\b/gi,
    message: "This language can feel harsh and inflexible",
    suggestion: "Explain consequences clearly without punitive language",
    category: "flexibility",
    learnMoreUrl: "https://citl.illinois.edu/citl-101/teaching-learning/resources/teaching-strategies/creating-an-inclusive-classroom"
  },
  
  // Growth Mindset
  {
    pattern: /\bweeder course\b/gi,
    message: "This language suggests the course is designed to fail students",
    suggestion: "Emphasize challenge and growth instead",
    category: "growth-mindset",
    learnMoreUrl: "https://www.chronicle.com/article/the-weeder-course-myth"
  },
  {
    pattern: /\bthis course is difficult\b/gi,
    message: "Consider framing challenge as opportunity",
    suggestion: "Try 'This course will challenge you to grow' or similar",
    category: "growth-mindset",
    replacement: "This course will challenge you to develop",
    learnMoreUrl: "https://www.edutopia.org/article/growth-mindset-classroom"
  },
  {
    pattern: /\bthis is a hard class\b/gi,
    message: "Consider framing challenge as opportunity",
    suggestion: "Try 'This class will help you develop' or similar",
    category: "growth-mindset",
    replacement: "This class will help you develop",
    learnMoreUrl: "https://www.edutopia.org/article/growth-mindset-classroom"
  },
  {
    pattern: /\bonly the (best|top|strongest) students\b/gi,
    message: "This language suggests fixed ability rather than growth",
    suggestion: "Emphasize that all students can succeed with effort",
    category: "growth-mindset",
    learnMoreUrl: "https://www.edutopia.org/article/growth-mindset-classroom"
  },
  
  // Inclusive Pronouns
  {
    pattern: /\bhe\/she\b/gi,
    message: "Consider more inclusive pronoun usage",
    suggestion: "Use 'they' or restructure the sentence",
    category: "inclusion",
    replacement: "they",
    learnMoreUrl: "https://www.apa.org/style-grammar-guidelines/grammar/singular-they"
  },
  {
    pattern: /\bhis\/her\b/gi,
    message: "Consider more inclusive pronoun usage",
    suggestion: "Use 'their' or restructure the sentence",
    category: "inclusion",
    replacement: "their",
    learnMoreUrl: "https://www.apa.org/style-grammar-guidelines/grammar/singular-they"
  },
  {
    pattern: /\bhim\/her\b/gi,
    message: "Consider more inclusive pronoun usage",
    suggestion: "Use 'them' or restructure the sentence",
    category: "inclusion",
    replacement: "them",
    learnMoreUrl: "https://www.apa.org/style-grammar-guidelines/grammar/singular-they"
  },
  
  // Deficit-Based Language
  {
    pattern: /\bstruggling students\b/gi,
    message: "This language may be stigmatizing",
    suggestion: "Try 'students who need additional support'",
    category: "tone",
    replacement: "students who need additional support",
    learnMoreUrl: "https://www.brown.edu/sheridan/teaching-learning-resources/inclusive-teaching/approaches"
  },
  {
    pattern: /\bweak students\b/gi,
    message: "This language may be stigmatizing",
    suggestion: "Try 'students developing skills in' or 'students working on'",
    category: "tone",
    replacement: "students developing their skills",
    learnMoreUrl: "https://www.brown.edu/sheridan/teaching-learning-resources/inclusive-teaching/approaches"
  },
  {
    pattern: /\blow(?:-| )performing students\b/gi,
    message: "This language may be stigmatizing",
    suggestion: "Try 'students who would benefit from additional support'",
    category: "tone",
    replacement: "students who would benefit from additional support",
    learnMoreUrl: "https://www.brown.edu/sheridan/teaching-learning-resources/inclusive-teaching/approaches"
  },
  
  // Attendance Language
  {
    pattern: /\battendance is mandatory\b/gi,
    message: "Consider more supportive framing",
    suggestion: "Explain the value: 'Attendance supports your learning because...'",
    category: "tone",
    replacement: "Attendance is important for your learning",
    learnMoreUrl: "https://www.chronicle.com/article/how-to-make-your-teaching-more-inclusive"
  },
  {
    pattern: /\bif you miss class\b/gi,
    message: "Consider acknowledging that absences happen",
    suggestion: "Try 'if you're unable to attend class' to acknowledge circumstances",
    category: "tone",
    replacement: "if you're unable to attend class",
    learnMoreUrl: "https://www.chronicle.com/article/how-to-make-your-teaching-more-inclusive"
  },
  
  // Technology Assumptions
  {
    pattern: /\ball students must have\b/gi,
    message: "Not all students have equal access to resources",
    suggestion: "Consider 'students will need' and offer alternatives or lending options",
    category: "accessibility",
    replacement: "students will need",
    learnMoreUrl: "https://www.washington.edu/teaching/topics/inclusive-teaching/inclusive-syllabus/"
  },
  {
    pattern: /\byou need to have access to\b/gi,
    message: "Consider acknowledging access barriers",
    suggestion: "Add 'If you don't have access, please contact me to discuss alternatives'",
    category: "accessibility",
    learnMoreUrl: "https://www.washington.edu/teaching/topics/inclusive-teaching/inclusive-syllabus/"
  },
  {
  pattern: /\bstudents (?:don't know|do not know|are behind|lack skills)\b/gi,
  message: "Avoid deficit-based framing that assumes students are unprepared.",
  suggestion: "Rephrase to focus on growth and opportunity.",
  category: "tone",
  replacement: "students will have opportunities to build skills",
  learnMoreUrl: "https://www.chronicle.com/article/how-to-make-your-teaching-more-inclusive"
},
{
  pattern: /\b(?:you will fail if|i will not tolerate|there will be consequences)\b/gi,
  message: "Avoid threatening or punitive phrasing.",
  suggestion: "Use language that clarifies expectations without intimidation.",
  category: "tone",
  replacement: "to succeed in this course, students should",
  learnMoreUrl: "https://www.chronicle.com/article/how-to-sound-more-inviting-in-your-syllabus"
},
{
  pattern: /\b(automatic failure)\b/gi,
  message: "This term may cause students with genuine extenuating circumstances to avoid talking to you about it.",
  suggestion: "Use language that clarifies expectations without intimidation.",
  category: "tone",
  replacement: "possible failure, barring extenuating circumstances",
  learnMoreUrl: "https://www.chronicle.com/article/how-to-sound-more-inviting-in-your-syllabus"
},
{
  pattern: /\b(?:no exceptions|under no circumstances|without exception)\b/gi,
  message: "Absolute statements can exclude students with complex needs.",
  suggestion: "Allow for case-by-case flexibility when appropriate.",
  category: "flexibility",
  replacement: "exceptions may be handled case-by-case",
  learnMoreUrl: "https://www.chronicle.com/article/a-more-human-syllabus"
},
{
  pattern: /\b(?:normal students|typical students|everyone knows)\b/gi,
  message: "Avoid assuming one type of student as the default.",
  suggestion: "Acknowledge varied backgrounds and experiences.",
  category: "assumptions",
  replacement: "students come from diverse backgrounds",
  learnMoreUrl: "https://www.facultyfocus.com/articles/teaching-and-learning/inclusive-teaching"
},
{
  pattern: /\b(?:you should already know|i expect all students to have mastered|this should be obvious)\b/gi,
  message: "Avoid assuming prior knowledge that not all students share.",
  suggestion: "Clarify what will be taught explicitly in the course.",
  category: "assumptions",
  replacement: "this course will introduce",
  learnMoreUrl: "https://tilthighered.com/inclusive-design"
},
{
  pattern: /\b(?:do not email me|i may not respond|i will not respond|limit questions)\b/gi,
  message: "Discouraging communication can create barriers for students.",
  suggestion: "Offer clear guidelines while remaining approachable.",
  category: "communication",
  replacement: "email is welcome within these guidelines",
  learnMoreUrl: "https://www.chronicle.com/article/how-to-make-your-syllabus-more-welcoming"
},
{
  pattern: /\b(?:accommodations.*will not be considered|must provide full documentation immediately)\b/gi,
  message: "Accessibility language should not discourage accommodations.",
  suggestion: "Affirm institutional accessibility processes and support.",
  category: "accessibility",
  replacement: "please contact me to coordinate accommodations",
  learnMoreUrl: "https://www.ahead.org/professional-resources/inclusive-syllabi"
},
{
  pattern: /\b(?:attendance is required no matter what|no absences allowed)\b/gi,
  message: "Strict attendance policies may exclude students with legitimate needs.",
  suggestion: "Include flexibility for emergencies or documented circumstances.",
  category: "flexibility",
  replacement: "attendance supports learning and flexibility is available",
  learnMoreUrl: "https://www.chronicle.com/article/rethinking-attendance-policies"
},
{
  pattern: /\b(?:you must have reliable internet|you should own a new laptop|24\/7 availability)\b/gi,
  message: "Avoid assuming all students have equal access to technology or time.",
  suggestion: "Recognize different resource levels and offer alternatives.",
  category: "equity",
  replacement: "contact me if technology access becomes a barrier",
  learnMoreUrl: "https://www.educause.edu/inclusive-access"
},
{
  pattern: /\b(?:weed out the weak|only serious students survive)\b/gi,
  message: "Gatekeeping language can create a hostile environment.",
  suggestion: "Communicate challenge without discouraging learners.",
  category: "tone",
  replacement: "this course is challenging, and support is available",
  learnMoreUrl: "https://www.chronicle.com/article/weed-out-classes"
},
{
  pattern: /\b(?:some people just aren't good at this|if you don't get it early you never will)\b/gi,
  message: "Fixed-mindset statements undermine student confidence.",
  suggestion: "Frame ability as something that develops with practice.",
  category: "mindset",
  replacement: "everyone can grow with practice",
  learnMoreUrl: "https://www.mindsetworks.com/science"
},
{
  pattern: /\b(?:everyone must learn at the same pace|falling behind is unacceptable)\b/gi,
  message: "Avoid one-speed-fits-all expectations.",
  suggestion: "Acknowledge different learning rates.",
  category: "equity",
  replacement: "students learn at different rates",
  learnMoreUrl: "https://www.udlcenter.org/inclusive_practices"
},
{
  pattern: /\b(?:assignments are due whenever stated|check online)\b/gi,
  message: "Unclear timelines can create inequity and confusion.",
  suggestion: "Provide explicit and predictable deadlines.",
  category: "clarity",
  replacement: "deadlines are listed clearly in the module",
  learnMoreUrl: "https://www.chronicle.com/article/syllabus-design-for-transparency"
},
{
  pattern: /\b(?:personal issues are not my concern|your problems do not excuse)\b/gi,
  message: "Dismissing life circumstances can be harmful.",
  suggestion: "Acknowledge that challenges can affect learning.",
  category: "tone",
  replacement: "life circumstances can impact learning; communicate with me early",
  learnMoreUrl: "https://www.academicsupport/inclusive-teaching"
},
{
  pattern: /\b(?:speak up or lose points|participation means talking frequently)\b/gi,
  message: "Participation expectations should consider different communication styles.",
  suggestion: "Define participation broadly to include multiple modes.",
  category: "participation",
  replacement: "participation can take many forms",
  learnMoreUrl: "https://www.crlt.umich.edu/inclusive-teaching"
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

/**
 * Get all text from the document and check it
 */
function checkDocument() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const text = body.getText();
  
  Logger.log('Document text length: ' + text.length);
  
  const issues = [];
  
  // Check against each rule
  SYLLABUS_RULES.forEach(function(rule) {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        matchedText: match[0],
        message: rule.message,
        suggestion: rule.suggestion,
        category: rule.category,
        replacement: rule.replacement || null,
        learnMoreUrl: rule.learnMoreUrl || null,
        id: 'issue_' + issues.length
      });
    }
  });
  
  Logger.log('Found ' + issues.length + ' issues');
  
  // Highlight issues in the document
  highlightIssues(issues);
  
  return issues;
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
  const text = body.editAsText();
  
  // Reset background color for entire document
  text.setBackgroundColor(null);
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
