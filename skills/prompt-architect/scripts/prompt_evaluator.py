"""
Prompt Evaluator - Scores prompts across quality dimensions
"""

def evaluate_prompt(prompt_text):
    """
    Evaluate a prompt across multiple quality dimensions.

    Args:
        prompt_text (str): The prompt to evaluate

    Returns:
        dict: Scores and analysis for each dimension
    """
    results = {
        'clarity': evaluate_clarity(prompt_text),
        'specificity': evaluate_specificity(prompt_text),
        'context': evaluate_context(prompt_text),
        'completeness': evaluate_completeness(prompt_text),
        'structure': evaluate_structure(prompt_text)
    }

    # Calculate overall score
    results['overall'] = sum(r['score'] for r in results.values()) / len(results)

    return results

def evaluate_clarity(prompt_text):
    """Evaluate how clear and unambiguous the prompt is."""
    score = 5  # Base score
    issues = []
    strengths = []

    # Check for vague words
    vague_words = ['thing', 'stuff', 'something', 'anything', 'maybe', 'kind of', 'sort of']
    vague_count = sum(1 for word in vague_words if word in prompt_text.lower())
    if vague_count > 0:
        score -= min(vague_count * 0.5, 3)
        issues.append(f"Contains {vague_count} vague term(s)")
    else:
        strengths.append("No vague language detected")

    # Check for question words (indicates goal)
    question_words = ['what', 'how', 'why', 'when', 'where', 'who']
    has_clear_goal = any(word in prompt_text.lower() for word in question_words)
    if has_clear_goal:
        score += 2
        strengths.append("Clear goal indicated")
    else:
        issues.append("Goal could be more explicit")

    # Check for ambiguous pronouns without antecedents
    pronouns = ['it', 'this', 'that', 'they']
    # Simple heuristic: if prompt starts with pronoun, likely unclear
    first_word = prompt_text.split()[0].lower() if prompt_text.split() else ""
    if first_word in pronouns:
        score -= 2
        issues.append("Starts with ambiguous pronoun")

    return {
        'score': max(0, min(10, score)),
        'issues': issues,
        'strengths': strengths
    }

def evaluate_specificity(prompt_text):
    """Evaluate how specific and detailed the prompt is."""
    score = 5  # Base score
    issues = []
    strengths = []

    word_count = len(prompt_text.split())

    # Very short prompts are often not specific enough
    if word_count < 5:
        score -= 3
        issues.append(f"Very brief ({word_count} words) - likely missing details")
    elif word_count < 10:
        score -= 1
        issues.append("Quite brief - could benefit from more specifics")
    elif word_count > 15:
        strengths.append("Good level of detail provided")
        score += 1

    # Check for quantitative details (numbers, dates, etc.)
    has_numbers = any(char.isdigit() for char in prompt_text)
    if has_numbers:
        score += 1
        strengths.append("Includes quantitative details")

    # Check for specific named entities (capitals indicating names, places, etc.)
    proper_nouns = sum(1 for word in prompt_text.split() if word and word[0].isupper() and word not in ['I', 'A'])
    if proper_nouns > 0:
        score += 1
        strengths.append(f"Mentions specific entities ({proper_nouns} found)")

    # Check for specifications (format, length, style mentions)
    spec_keywords = ['format', 'length', 'style', 'words', 'paragraphs', 'sections', 'points']
    spec_count = sum(1 for keyword in spec_keywords if keyword in prompt_text.lower())
    if spec_count > 0:
        score += min(spec_count, 2)
        strengths.append(f"Includes {spec_count} specification(s)")
    else:
        issues.append("No format/length specifications")

    return {
        'score': max(0, min(10, score)),
        'issues': issues,
        'strengths': strengths
    }

def evaluate_context(prompt_text):
    """Evaluate whether sufficient context is provided."""
    score = 5  # Base score
    issues = []
    strengths = []

    # Check for context indicators
    context_indicators = [
        'for', 'because', 'since', 'background', 'context', 'situation',
        'currently', 'previously', 'in order to', 'so that'
    ]
    context_count = sum(1 for indicator in context_indicators if indicator in prompt_text.lower())

    if context_count == 0:
        score -= 3
        issues.append("No contextual information provided")
    elif context_count >= 2:
        score += 2
        strengths.append(f"Good contextual framing ({context_count} indicators)")
    else:
        score += 1
        strengths.append("Some context provided")

    # Check for constraints or limitations
    constraint_words = [
        'must', 'should', 'cannot', 'don\'t', 'avoid', 'limit', 'maximum',
        'minimum', 'required', 'constraint', 'restriction'
    ]
    has_constraints = any(word in prompt_text.lower() for word in constraint_words)
    if has_constraints:
        score += 1
        strengths.append("Constraints or requirements specified")
    else:
        issues.append("No constraints or limitations specified")

    return {
        'score': max(0, min(10, score)),
        'issues': issues,
        'strengths': strengths
    }

def evaluate_completeness(prompt_text):
    """Evaluate whether all necessary information seems present."""
    score = 5  # Base score
    issues = []
    strengths = []

    # Check if prompt answers: What, Why, How
    has_what = any(word in prompt_text.lower() for word in ['create', 'write', 'analyze', 'generate', 'make', 'develop', 'build'])
    has_why = any(word in prompt_text.lower() for word in ['because', 'for', 'to', 'so that', 'in order to', 'goal', 'purpose'])
    has_how = any(word in prompt_text.lower() for word in ['using', 'with', 'through', 'by', 'via', 'format', 'style', 'approach'])

    if has_what:
        score += 2
        strengths.append("Task/action clearly stated")
    else:
        score -= 2
        issues.append("What to do is unclear")

    if has_why:
        score += 1
        strengths.append("Purpose/motivation included")
    else:
        issues.append("Missing purpose or goal")

    if has_how:
        score += 1
        strengths.append("Approach or method indicated")
    else:
        issues.append("Missing guidance on approach")

    # Check for output format specification
    format_words = ['format', 'structure', 'as a', 'in the form of', 'list', 'table', 'paragraph', 'json', 'markdown']
    has_format = any(word in prompt_text.lower() for word in format_words)
    if has_format:
        score += 1
        strengths.append("Output format specified")
    else:
        issues.append("Output format not specified")

    return {
        'score': max(0, min(10, score)),
        'issues': issues,
        'strengths': strengths
    }

def evaluate_structure(prompt_text):
    """Evaluate how well-structured the prompt is."""
    score = 5  # Base score
    issues = []
    strengths = []

    # Check for sentence structure
    sentences = [s.strip() for s in prompt_text.split('.') if s.strip()]
    if len(sentences) > 1:
        score += 1
        strengths.append(f"Multi-sentence structure ({len(sentences)} sentences)")
    else:
        issues.append("Single sentence - could benefit from more structure")

    # Check for list/bullet indicators
    has_bullets = any(char in prompt_text for char in ['-', '•', '*']) or '\n' in prompt_text
    if has_bullets:
        score += 1
        strengths.append("Uses lists or structure markers")

    # Check for section markers
    section_markers = [':', '\n\n', '1.', '2.', 'First', 'Second']
    has_sections = any(marker in prompt_text for marker in section_markers)
    if has_sections:
        score += 1
        strengths.append("Organized into sections")

    # Check for run-on sentences
    very_long_sentence = any(len(s.split()) > 40 for s in sentences)
    if very_long_sentence:
        score -= 1
        issues.append("Contains very long sentence(s) - could be split")

    # Check organization
    word_count = len(prompt_text.split())
    if word_count > 30 and not has_sections and not has_bullets:
        score -= 1
        issues.append("Longer prompt would benefit from more structure")
    elif word_count > 30 and (has_sections or has_bullets):
        strengths.append("Well-organized for its length")
        score += 1

    return {
        'score': max(0, min(10, score)),
        'issues': issues,
        'strengths': strengths
    }

def generate_improvement_suggestions(evaluation):
    """Generate specific improvement suggestions based on evaluation."""
    suggestions = []

    # Clarity suggestions
    if evaluation['clarity']['score'] < 7:
        suggestions.append("Improve clarity by:")
        for issue in evaluation['clarity']['issues']:
            if 'vague' in issue.lower():
                suggestions.append("  - Replace vague terms with specific descriptions")
            if 'goal' in issue.lower():
                suggestions.append("  - Clearly state what you want to achieve")
            if 'pronoun' in issue.lower():
                suggestions.append("  - Replace ambiguous pronouns with specific nouns")

    # Specificity suggestions
    if evaluation['specificity']['score'] < 7:
        suggestions.append("Increase specificity by:")
        for issue in evaluation['specificity']['issues']:
            if 'brief' in issue.lower():
                suggestions.append("  - Add more details about requirements")
            if 'specification' in issue.lower():
                suggestions.append("  - Specify desired format, length, or structure")

    # Context suggestions
    if evaluation['context']['score'] < 7:
        suggestions.append("Add more context:")
        for issue in evaluation['context']['issues']:
            if 'contextual' in issue.lower():
                suggestions.append("  - Explain the background or situation")
            if 'constraint' in issue.lower():
                suggestions.append("  - Mention any limitations or requirements")

    # Completeness suggestions
    if evaluation['completeness']['score'] < 7:
        suggestions.append("Make it more complete:")
        for issue in evaluation['completeness']['issues']:
            if 'what' in issue.lower():
                suggestions.append("  - Clearly state what action to take")
            if 'why' in issue.lower() or 'purpose' in issue.lower():
                suggestions.append("  - Explain the purpose or goal")
            if 'how' in issue.lower() or 'approach' in issue.lower():
                suggestions.append("  - Indicate preferred approach or method")
            if 'format' in issue.lower():
                suggestions.append("  - Specify how output should be formatted")

    # Structure suggestions
    if evaluation['structure']['score'] < 7:
        suggestions.append("Improve structure:")
        for issue in evaluation['structure']['issues']:
            if 'single sentence' in issue.lower():
                suggestions.append("  - Break into multiple sentences")
            if 'long sentence' in issue.lower():
                suggestions.append("  - Split long sentences for clarity")
            if 'more structure' in issue.lower():
                suggestions.append("  - Use bullet points or numbered lists")

    return suggestions

if __name__ == "__main__":
    # Example usage
    test_prompts = [
        "Write about AI",
        "Create a detailed blog post about machine learning applications in healthcare for non-technical readers, around 800 words, in a friendly but professional tone.",
        "Analyze the data",
        "Review this code for security vulnerabilities, focusing on SQL injection and XSS. Provide specific line numbers and remediation steps."
    ]

    for prompt in test_prompts:
        print(f"\n{'='*60}")
        print(f"Prompt: {prompt}")
        print(f"{'='*60}")

        eval_result = evaluate_prompt(prompt)

        print(f"\nOverall Score: {eval_result['overall']:.1f}/10\n")

        for dimension, result in eval_result.items():
            if dimension == 'overall':
                continue
            print(f"{dimension.upper()}: {result['score']}/10")
            if result['strengths']:
                print(f"  ✓ {', '.join(result['strengths'])}")
            if result['issues']:
                print(f"  ✗ {', '.join(result['issues'])}")

        suggestions = generate_improvement_suggestions(eval_result)
        if suggestions:
            print(f"\nSuggestions:")
            for suggestion in suggestions:
                print(f"  {suggestion}")
