"""
Framework Analyzer - Recommends appropriate prompting frameworks
Uses intent-based selection matching the 7-category system in SKILL.md
"""

# ─────────────────────────────────────────────────────────────
# INTENT CATEGORIES (maps to SKILL.md A-G)
# ─────────────────────────────────────────────────────────────

INTENT_SIGNALS = {
    'recover': {
        'description': 'Reconstruct a prompt from an existing output',
        'keywords': ['reverse engineer', 'recover prompt', 'what prompt', 'lost prompt',
                     'reconstruct prompt', 'template from output', 'prompt that produced'],
        'frameworks': ['rpef']
    },
    'clarify': {
        'description': 'Requirements are unclear; need to gather information first',
        'keywords': ['not sure what i need', 'help me figure out', 'interview me',
                     'ask me questions', 'what do i need', 'unclear requirements',
                     'not sure how to start'],
        'frameworks': ['reverse_role']
    },
    'create': {
        'description': 'Generating new content from scratch',
        'keywords': ['write', 'create', 'draft', 'generate', 'compose', 'build', 'make',
                     'produce', 'develop', 'design'],
        'frameworks': ['co-star', 'risen', 'rise-ie', 'rise-ix', 'tidd-ec',
                       'rtf', 'ctf', 'ape', 'race', 'crispe', 'broke', 'care']
    },
    'transform': {
        'description': 'Improving or converting existing content',
        'keywords': ['rewrite', 'refactor', 'convert', 'improve', 'edit', 'revise',
                     'transform', 'update', 'change', 'fix', 'clean up', 'restructure',
                     'rephrase', 'summarize', 'compress', 'densify', 'expand'],
        'frameworks': ['bab', 'self_refine', 'chain_of_density', 'skeleton_of_thought']
    },
    'reason': {
        'description': 'Solving a reasoning or calculation problem',
        'keywords': ['calculate', 'solve', 'figure out', 'reason', 'analyze', 'evaluate',
                     'determine', 'compute', 'derive', 'proof', 'logic', 'math',
                     'should i', 'which is better', 'compare options'],
        'frameworks': ['plan_and_solve', 'chain_of_thought', 'least_to_most',
                       'step_back', 'tree_of_thought', 'rcot']
    },
    'critique': {
        'description': 'Stress-testing, attacking, or verifying output',
        'keywords': ['review', 'critique', 'evaluate', 'stress test', 'find flaws',
                     'what could go wrong', 'attack', 'challenge', 'verify', 'check',
                     'validate', 'risks', 'failure modes', 'problems with', 'weaknesses'],
        'frameworks': ['self_refine', 'cai_critique_revise', 'devils_advocate',
                       'pre_mortem', 'rcot']
    },
    'agentic': {
        'description': 'Tool-use with iterative reasoning cycles',
        'keywords': ['use tools', 'search and', 'run code', 'execute', 'fetch',
                     'query database', 'look up', 'agent', 'automate', 'multi-step with tools'],
        'frameworks': ['react']
    }
}

# ─────────────────────────────────────────────────────────────
# FRAMEWORK DEFINITIONS (all 27)
# ─────────────────────────────────────────────────────────────

FRAMEWORKS = {
    # ── CREATE family ────────────────────────────────────────
    'ape': {
        'name': 'APE',
        'full_name': 'Action, Purpose, Expectation',
        'intent': 'create',
        'complexity': 'minimal',
        'best_for': ['ultra_simple', 'one_off', 'quick_task', 'no_role_needed'],
        'discriminators': ['short prompt', 'one-off', 'simple action'],
        'indicators': {
            'keywords': ['quickly', 'brief', 'simple', 'just'],
            'signals': ['short_prompt', 'no_role', 'no_context_needed']
        }
    },
    'rtf': {
        'name': 'RTF',
        'full_name': 'Role, Task, Format',
        'intent': 'create',
        'complexity': 'low',
        'best_for': ['simple_tasks', 'expertise_driven', 'format_focused'],
        'discriminators': ['expertise framing matters', 'simple task'],
        'indicators': {
            'keywords': ['format', 'structure', 'template', 'simple', 'quick', 'as a'],
            'signals': ['short_prompt', 'format_primary']
        }
    },
    'ctf': {
        'name': 'CTF',
        'full_name': 'Context, Task, Format',
        'intent': 'create',
        'complexity': 'low',
        'best_for': ['context_driven', 'simple_tasks', 'situation_matters'],
        'discriminators': ['situation/background more important than expertise'],
        'indicators': {
            'keywords': ['given that', 'because of', 'in this situation', 'mid-project',
                         'currently', 'background'],
            'signals': ['context_heavy', 'no_role_needed']
        }
    },
    'race': {
        'name': 'RACE',
        'full_name': 'Role, Action, Context, Expectation',
        'intent': 'create',
        'complexity': 'medium',
        'best_for': ['expert_task_with_context', 'outcome_clarity_needed'],
        'discriminators': ['role + context + explicit outcome all needed'],
        'indicators': {
            'keywords': ['review', 'assess', 'recommend', 'evaluate with context'],
            'signals': ['role_needed', 'context_needed', 'outcome_explicit']
        }
    },
    'crispe': {
        'name': 'CRISPE',
        'full_name': 'Capacity+Role, Insight, Instructions, Personality, Experiment',
        'intent': 'create',
        'complexity': 'medium',
        'best_for': ['multiple_variants_needed', 'tone_critical', 'comprehensive'],
        'discriminators': ['multiple output variants needed', 'A/B options'],
        'indicators': {
            'keywords': ['options', 'versions', 'variants', 'different approaches', 'alternatives'],
            'signals': ['multiple_outputs', 'style_critical']
        }
    },
    'broke': {
        'name': 'BROKE',
        'full_name': 'Background, Role, Objective, Key Results, Evolve',
        'intent': 'create',
        'complexity': 'medium',
        'best_for': ['business_deliverable', 'measurable_outcomes', 'okr_aligned'],
        'discriminators': ['business KPIs exist', 'self-critique loop desired'],
        'indicators': {
            'keywords': ['metric', 'kpi', 'goal', 'objective', 'measure', 'target',
                         'revenue', 'conversion', 'reduce', 'increase by'],
            'signals': ['business_kpis', 'iteration_expected']
        }
    },
    'care': {
        'name': 'CARE',
        'full_name': 'Context, Ask, Rules, Examples',
        'intent': 'create',
        'complexity': 'medium',
        'best_for': ['compliance_required', 'rules_heavy', 'examples_help'],
        'discriminators': ['explicit rules + examples (combined), not separate do/don\'t lists'],
        'indicators': {
            'keywords': ['must not', 'required', 'compliance', 'plain language', 'rule',
                         'standard', 'guideline', 'accessibility', 'grade level'],
            'signals': ['rules_important', 'examples_provided', 'compliance']
        }
    },
    'co-star': {
        'name': 'CO-STAR',
        'full_name': 'Context, Objective, Style, Tone, Audience, Response',
        'intent': 'create',
        'complexity': 'high',
        'best_for': ['content_creation', 'audience_matters', 'tone_critical', 'writing'],
        'discriminators': ['audience/tone/style are critical factors'],
        'indicators': {
            'keywords': ['write', 'create', 'article', 'blog', 'post', 'content', 'email',
                         'message', 'audience', 'tone', 'style', 'voice'],
            'signals': ['audience_specified', 'tone_matters', 'writing_task']
        }
    },
    'risen': {
        'name': 'RISEN',
        'full_name': 'Role, Instructions, Steps, End goal, Narrowing',
        'intent': 'create',
        'complexity': 'high',
        'best_for': ['multi_step_process', 'methodology_matters', 'constraints_important'],
        'discriminators': ['multi-step with constraints and methodology'],
        'indicators': {
            'keywords': ['process', 'procedure', 'workflow', 'steps', 'guide',
                         'methodology', 'systematic', 'checklist'],
            'signals': ['sequential_steps', 'methodology_needed']
        }
    },
    'tidd-ec': {
        'name': 'TIDD-EC',
        'full_name': 'Task type, Instructions, Do, Don\'t, Examples, Context',
        'intent': 'create',
        'complexity': 'high',
        'best_for': ['explicit_dos_donts', 'high_precision', 'compliance_tasks'],
        'discriminators': ['explicit separate DO and DON\'T lists needed'],
        'indicators': {
            'keywords': ['must', 'avoid', "don't", "shouldn't", 'do not', 'never',
                         'always', 'requirement', 'boundary', 'compliance', 'support'],
            'signals': ['explicit_dos_donts', 'precision_required']
        }
    },
    'rise-ie': {
        'name': 'RISE-IE',
        'full_name': 'Role, Input, Steps, Expectation (Input-Expectation)',
        'intent': 'create',
        'complexity': 'medium',
        'best_for': ['data_transformation', 'input_output_defined', 'analytical'],
        'discriminators': ['clear input → output transformation'],
        'indicators': {
            'keywords': ['analyze', 'process', 'transform', 'data', 'input', 'csv',
                         'json', 'file', 'extract', 'parse', 'convert'],
            'signals': ['input_defined', 'output_defined', 'transformation']
        }
    },
    'rise-ix': {
        'name': 'RISE-IX',
        'full_name': 'Role, Instructions, Steps, Examples (Instructions-Examples)',
        'intent': 'create',
        'complexity': 'medium',
        'best_for': ['content_with_examples', 'style_matching', 'creative'],
        'discriminators': ['content creation with reference examples'],
        'indicators': {
            'keywords': ['like this', 'similar to', 'example', 'style', 'format like',
                         'match this', 'replicate'],
            'signals': ['examples_provided', 'style_reference']
        }
    },
    # ── TRANSFORM family ─────────────────────────────────────
    'bab': {
        'name': 'BAB',
        'full_name': 'Before, After, Bridge',
        'intent': 'transform',
        'complexity': 'low',
        'best_for': ['rewrite', 'refactor', 'convert', 'transformation'],
        'discriminators': ['existing content → new form'],
        'indicators': {
            'keywords': ['rewrite', 'refactor', 'convert', 'change this to', 'transform',
                         'turn into', 'migrate', 'update to'],
            'signals': ['existing_content', 'desired_state_different']
        }
    },
    'self_refine': {
        'name': 'Self-Refine',
        'full_name': 'Generate → Feedback → Refine',
        'intent': 'transform',
        'complexity': 'medium',
        'best_for': ['quality_improvement', 'iterative_feedback', 'any_output'],
        'discriminators': ['iterative quality improvement of any output'],
        'indicators': {
            'keywords': ['improve', 'make better', 'enhance', 'refine', 'review and fix',
                         'quality check', 'iterate'],
            'signals': ['existing_output', 'quality_improvement']
        }
    },
    'chain_of_density': {
        'name': 'Chain of Density',
        'full_name': 'Iterative compression and densification',
        'intent': 'transform',
        'complexity': 'medium',
        'best_for': ['summarization', 'compression', 'densification'],
        'discriminators': ['compress/densify content into tighter form'],
        'indicators': {
            'keywords': ['summarize', 'compress', 'condense', 'shorten', 'densify', 'tighten'],
            'signals': ['compression_goal', 'existing_content']
        }
    },
    'skeleton_of_thought': {
        'name': 'Skeleton of Thought',
        'full_name': 'Skeleton-first then expand (parallel)',
        'intent': 'transform',
        'complexity': 'medium',
        'best_for': ['structured_long_form', 'outline_first', 'multi_section'],
        'discriminators': ['outline-first then expand each section'],
        'indicators': {
            'keywords': ['outline', 'structure', 'organized', 'sections', 'comprehensive',
                         'document', 'report'],
            'signals': ['multi_section', 'structure_important']
        }
    },
    # ── REASON family ─────────────────────────────────────────
    'plan_and_solve': {
        'name': 'Plan-and-Solve (PS+)',
        'full_name': 'Plan first, extract variables, calculate step by step',
        'intent': 'reason',
        'complexity': 'low',
        'best_for': ['numerical_calculation', 'zero_shot_math', 'variable_extraction'],
        'discriminators': ['numerical/calculation, zero-shot'],
        'indicators': {
            'keywords': ['calculate', 'compute', 'math', 'formula', '%', '$', 'total',
                         'how many', 'how much', 'rate', 'percentage', 'sum'],
            'signals': ['numbers_present', 'calculation_needed']
        }
    },
    'least_to_most': {
        'name': 'Least-to-Most',
        'full_name': 'Decompose into ordered subproblems, solve sequentially',
        'intent': 'reason',
        'complexity': 'medium',
        'best_for': ['compositional_reasoning', 'multi_hop', 'dependency_order'],
        'discriminators': ['multi-hop with ordered dependencies (A needed before B)'],
        'indicators': {
            'keywords': ['depends on', 'first need to know', 'requires knowing',
                         'multi-step', 'building on', 'chain of'],
            'signals': ['dependency_chain', 'multi_hop']
        }
    },
    'step_back': {
        'name': 'Step-Back',
        'full_name': 'Abstract to underlying principles, then answer',
        'intent': 'reason',
        'complexity': 'medium',
        'best_for': ['principle_grounded', 'first_principles', 'stem_reasoning'],
        'discriminators': ['needs first-principles reasoning before answering'],
        'indicators': {
            'keywords': ['why does', 'what principle', 'what rule', 'physics', 'chemistry',
                         'first principles', 'underlying', 'fundamentally'],
            'signals': ['principle_needed', 'abstract_first']
        }
    },
    'tree_of_thought': {
        'name': 'Tree of Thought',
        'full_name': 'Branching exploration of multiple solution paths',
        'intent': 'reason',
        'complexity': 'medium',
        'best_for': ['multiple_approaches', 'decision_making', 'trade_off_analysis'],
        'discriminators': ['multiple distinct approaches to compare'],
        'indicators': {
            'keywords': ['which approach', 'options', 'alternatives', 'trade-offs',
                         'should we use', 'pros and cons', 'compare', 'choose between'],
            'signals': ['multiple_options', 'decision_needed']
        }
    },
    'chain_of_thought': {
        'name': 'Chain of Thought',
        'full_name': 'Step-by-step linear reasoning',
        'intent': 'reason',
        'complexity': 'medium',
        'best_for': ['linear_reasoning', 'debugging', 'logical_analysis'],
        'discriminators': ['linear step-by-step reasoning'],
        'indicators': {
            'keywords': ['solve', 'reason', 'think through', 'debug', 'logic',
                         'why', 'how does', 'step by step'],
            'signals': ['reasoning_needed', 'linear_path']
        }
    },
    'rcot': {
        'name': 'RCoT',
        'full_name': 'Reverse Chain-of-Thought (verify by reconstruction)',
        'intent': 'reason',
        'complexity': 'medium',
        'best_for': ['verification', 'multi_condition', 'overlooked_conditions'],
        'discriminators': ['verify reasoning didn\'t overlook conditions'],
        'indicators': {
            'keywords': ['verify', 'check reasoning', 'missed anything', 'conditions',
                         'multi-constraint', 'overlook'],
            'signals': ['verification_needed', 'multi_condition']
        }
    },
    # ── CRITIQUE family ───────────────────────────────────────
    'cai_critique_revise': {
        'name': 'CAI Critique-Revise',
        'full_name': 'Principle-based critique and revision',
        'intent': 'critique',
        'complexity': 'medium',
        'best_for': ['principle_compliance', 'standard_alignment', 'quality_gate'],
        'discriminators': ['align output to explicit stated principle/standard'],
        'indicators': {
            'keywords': ['principle', 'standard', 'policy', 'comply', 'against',
                         'violates', 'enforce', 'align to', 'plain language'],
            'signals': ['explicit_principle', 'compliance_check']
        }
    },
    'devils_advocate': {
        'name': "Devil's Advocate",
        'full_name': 'Strongest opposing argument generation',
        'intent': 'critique',
        'complexity': 'low',
        'best_for': ['decision_testing', 'debiasing', 'find_weaknesses'],
        'discriminators': ['find strongest opposing argument against a position'],
        'indicators': {
            'keywords': ['argue against', 'find flaws', 'challenge', 'opposition',
                         'devil\'s advocate', 'steelman', 'counterargument', 'push back'],
            'signals': ['position_to_attack', 'opposing_view']
        }
    },
    'pre_mortem': {
        'name': 'Pre-Mortem',
        'full_name': 'Assume failure, work backwards to causes',
        'intent': 'critique',
        'complexity': 'low',
        'best_for': ['risk_identification', 'failure_analysis', 'pre_launch'],
        'discriminators': ['identify failure modes before they happen'],
        'indicators': {
            'keywords': ['risks', 'failure', 'what could go wrong', 'pre-mortem',
                         'before launch', 'potential problems', 'failure modes'],
            'signals': ['risk_analysis', 'forward_looking']
        }
    },
    # ── META/REVERSE family ───────────────────────────────────
    'rpef': {
        'name': 'RPEF',
        'full_name': 'Reverse Prompt Engineering Framework',
        'intent': 'recover',
        'complexity': 'low',
        'best_for': ['recover_prompt', 'template_from_output', 'reverse_engineer'],
        'discriminators': ['reconstruct a prompt from an existing output'],
        'indicators': {
            'keywords': ['reverse engineer', 'recover prompt', 'what prompt created',
                         'prompt template from', 'reconstruct'],
            'signals': ['output_provided', 'prompt_recovery']
        }
    },
    'reverse_role': {
        'name': 'Reverse Role Prompting',
        'full_name': 'AI-Led Interview (FATA)',
        'intent': 'clarify',
        'complexity': 'low',
        'best_for': ['unclear_requirements', 'non_expert_user', 'discovery'],
        'discriminators': ['gather information before executing'],
        'indicators': {
            'keywords': ['not sure', 'help me figure out', 'ask me', 'interview',
                         'what do i need', 'unclear', 'don\'t know how to start'],
            'signals': ['requirements_unclear', 'needs_clarification']
        }
    },
    # ── AGENTIC family ────────────────────────────────────────
    'react': {
        'name': 'ReAct',
        'full_name': 'Reasoning + Acting (Thought-Action-Observation)',
        'intent': 'agentic',
        'complexity': 'medium',
        'best_for': ['tool_use', 'agentic_workflow', 'iterative_tool_reasoning'],
        'discriminators': ['task requires tools; each result informs next step'],
        'indicators': {
            'keywords': ['search', 'run code', 'query', 'fetch', 'execute', 'agent',
                         'use tools', 'look up', 'database', 'api call'],
            'signals': ['tools_available', 'iterative_tool_use']
        }
    }
}


# ─────────────────────────────────────────────────────────────
# INTENT DETECTION
# ─────────────────────────────────────────────────────────────

def detect_intent(prompt_text):
    """
    Detect the primary intent category from a prompt.
    Returns intent category and confidence.
    """
    prompt_lower = prompt_text.lower()
    intent_scores = {}

    for intent, config in INTENT_SIGNALS.items():
        score = 0
        for keyword in config['keywords']:
            if keyword in prompt_lower:
                score += 3
        intent_scores[intent] = score

    # Sort by score
    sorted_intents = sorted(intent_scores.items(), key=lambda x: x[1], reverse=True)
    top_intent = sorted_intents[0]

    # If no strong intent signal, default to 'create' (most common)
    if top_intent[1] == 0:
        return 'create', 0
    return top_intent[0], top_intent[1]


# ─────────────────────────────────────────────────────────────
# FRAMEWORK RECOMMENDATION
# ─────────────────────────────────────────────────────────────

def analyze_use_case(prompt_text):
    """
    Analyze a prompt and recommend appropriate frameworks.
    Uses intent-based selection matching SKILL.md's 7-category system.

    Args:
        prompt_text (str): The user's original prompt

    Returns:
        list: Recommended frameworks with reasoning
    """
    prompt_lower = prompt_text.lower()
    word_count = len(prompt_text.split())

    # Step 1: Detect primary intent
    intent, intent_confidence = detect_intent(prompt_text)

    # Step 2: Get candidate frameworks for this intent
    candidate_ids = INTENT_SIGNALS.get(intent, {}).get('frameworks', [])

    # Step 3: Score candidates using discriminators
    scores = {}
    for fw_id in candidate_ids:
        if fw_id not in FRAMEWORKS:
            continue
        fw = FRAMEWORKS[fw_id]
        score = intent_confidence  # Base score from intent match
        matches = [f"intent: {intent}"]

        for keyword in fw['indicators'].get('keywords', []):
            if keyword in prompt_lower:
                score += 2
                matches.append(f"keyword: '{keyword}'")

        # Apply framework-specific heuristics
        if fw_id == 'ape' and word_count < 10:
            score += 3
            matches.append("very short prompt → ultra-minimal framework")

        if fw_id == 'rtf' and word_count < 20:
            score += 2
            matches.append("short, focused prompt → RTF")

        if fw_id == 'co-star' and any(w in prompt_lower for w in ['audience', 'tone', 'style', 'readers']):
            score += 4
            matches.append("audience/tone/style signals → CO-STAR")

        if fw_id == 'tidd-ec' and any(w in prompt_lower for w in ["don't", "avoid", "must not", "never"]):
            score += 4
            matches.append("explicit don'ts → TIDD-EC over CARE")

        if fw_id == 'care' and 'example' in prompt_lower and 'rule' in prompt_lower:
            score += 3
            matches.append("rules + examples → CARE")

        if fw_id == 'broke':
            if any(w in prompt_lower for w in ['metric', 'kpi', 'target', 'revenue', 'conversion']):
                score += 4
                matches.append("business KPI signals → BROKE")

        if fw_id == 'risen' and any(w in prompt_lower for w in ['step', 'process', 'procedure', 'workflow']):
            score += 3
            matches.append("process signals → RISEN")

        if fw_id == 'rise-ie' and any(w in prompt_lower for w in ['csv', 'json', 'data', 'file', 'input']):
            score += 4
            matches.append("data transformation signals → RISE-IE")

        if fw_id == 'rise-ix' and any(w in prompt_lower for w in ['example', 'like', 'similar', 'style']):
            score += 4
            matches.append("style/example signals → RISE-IX")

        if fw_id == 'bab' and any(w in prompt_lower for w in ['rewrite', 'refactor', 'convert', 'transform']):
            score += 4
            matches.append("transformation signals → BAB")

        if fw_id == 'plan_and_solve' and any(c.isdigit() for c in prompt_text):
            score += 3
            matches.append("numbers present → Plan-and-Solve")

        if fw_id == 'pre_mortem' and any(w in prompt_lower for w in ['risk', 'failure', 'wrong', 'fail']):
            score += 4
            matches.append("failure/risk signals → Pre-Mortem")

        if fw_id == 'devils_advocate' and any(w in prompt_lower for w in ['challenge', 'argue', 'flaw', 'wrong']):
            score += 4
            matches.append("challenge/flaw signals → Devil's Advocate")

        scores[fw_id] = {'score': score, 'matches': matches, 'framework': FRAMEWORKS[fw_id]}

    # Sort by score, return top 2
    sorted_frameworks = sorted(scores.items(), key=lambda x: x[1]['score'], reverse=True)

    recommendations = []
    for fw_id, data in sorted_frameworks[:2]:
        if data['score'] > 0:
            fw = data['framework']
            recommendations.append({
                'id': fw_id,
                'name': fw['name'],
                'full_name': fw['full_name'],
                'intent': intent,
                'score': data['score'],
                'matches': data['matches'],
                'complexity': fw['complexity'],
                'best_for': fw['best_for'],
                'discriminators': fw.get('discriminators', [])
            })

    # Fallback: if no candidates scored, suggest based on intent alone
    if not recommendations:
        fallback_map = {
            'create': 'rtf', 'transform': 'bab', 'reason': 'chain_of_thought',
            'critique': 'self_refine', 'recover': 'rpef',
            'clarify': 'reverse_role', 'agentic': 'react'
        }
        fw_id = fallback_map.get(intent, 'rtf')
        fw = FRAMEWORKS[fw_id]
        recommendations.append({
            'id': fw_id,
            'name': fw['name'],
            'full_name': fw['full_name'],
            'intent': intent,
            'score': 1,
            'matches': [f"fallback for intent: {intent}"],
            'complexity': fw['complexity'],
            'best_for': fw['best_for'],
            'discriminators': fw.get('discriminators', [])
        })

    return recommendations


# ─────────────────────────────────────────────────────────────
# CLARIFICATION QUESTIONS
# ─────────────────────────────────────────────────────────────

def get_framework_questions(framework_id):
    """
    Get clarifying questions for a specific framework.

    Args:
        framework_id (str): Framework identifier

    Returns:
        list: Questions to ask user
    """
    questions = {
        'co-star': [
            "What's the background context or situation?",
            "Who is your target audience? (expertise level, role, characteristics)",
            "What specific objective do you want to achieve?",
            "What tone is appropriate? (professional, casual, urgent, friendly)",
            "What style or format should the output follow?",
            "How should the response be structured? (length, sections, format)"
        ],
        'risen': [
            "What role or expertise level should be demonstrated?",
            "What principles or guidelines should guide the approach?",
            "What are the specific steps or sequence of actions needed?",
            "What defines success? What are the acceptance criteria?",
            "What should be avoided? What constraints or boundaries exist?"
        ],
        'rise-ie': [
            "What role or perspective is needed for this analytical task?",
            "What input are you providing? (format: CSV, JSON, text, etc.)",
            "What are the characteristics of the input data?",
            "What processing or transformation steps are needed?",
            "What should the output look like? (format, structure, required elements)"
        ],
        'rise-ix': [
            "What role or persona is most appropriate?",
            "What are the main instructions or task requirements?",
            "What workflow or steps should be followed?",
            "Can you provide 2-3 examples of desired output or style?",
            "What format or style should be replicated?"
        ],
        'tidd-ec': [
            "What type of task is this?",
            "What are the exact instructions to follow?",
            "What MUST be included in the output? (explicit dos)",
            "What must be AVOIDED? (explicit don'ts)",
            "Can you provide examples of good output?",
            "What context or background information is relevant?"
        ],
        'rtf': [
            "What expertise or perspective is needed?",
            "What exactly needs to be done? (be specific)",
            "How should the output be formatted? (structure, length, style)"
        ],
        'ctf': [
            "What is the current situation or background context?",
            "What exactly needs to be done?",
            "How should the output be formatted?"
        ],
        'ape': [
            "What is the core action to take? (one clear verb-driven instruction)",
            "Why is this needed? (one sentence on how it will be used)",
            "What does a good result look like? (format, length, quality bar)"
        ],
        'race': [
            "What role or expertise should the AI embody?",
            "What exactly needs to be done?",
            "What is the situational background and constraints?",
            "What does a successful output look like?"
        ],
        'crispe': [
            "What expertise level and role should be embodied?",
            "What background context and insight is needed?",
            "What are the specific instructions?",
            "What tone and personality should the output have?",
            "How many variants would you like to compare? What dimension of variation?"
        ],
        'broke': [
            "What is the current situation and background?",
            "What role should the AI take?",
            "What is the specific objective/deliverable?",
            "What measurable business outcomes should this drive? (Key Results)",
            "Should the AI suggest 3 improvements after responding? (Evolve)"
        ],
        'care': [
            "What is the situation and background context?",
            "What is the specific request?",
            "What rules or constraints govern the output? (what must/must not happen)",
            "Can you provide 1-3 examples showing the desired quality or style?"
        ],
        'bab': [
            "What is the current state? (what exists now, what's wrong with it)",
            "What should it become? (desired end state and qualities)",
            "What rules govern the transformation? (what to preserve, what to change)"
        ],
        'chain_of_density': [
            "What content needs to be compressed or densified?",
            "How many iterations of refinement?",
            "What should each iteration optimize for? (clarity, brevity, information density)",
            "What constraints apply? (length limits, key information to preserve)"
        ],
        'skeleton_of_thought': [
            "What is the topic or question to structure?",
            "How many skeleton points? (typically 5-8)",
            "How deeply should each point be expanded?"
        ],
        'plan_and_solve': [
            "What is the full problem, including all relevant numbers and variables?",
            "Are there intermediate calculation steps to show?"
        ],
        'least_to_most': [
            "What is the full complex problem?",
            "What are the simpler prerequisite subproblems (in dependency order)?",
            "Which subproblem must be solved first?"
        ],
        'step_back': [
            "What is the original specific question?",
            "What higher-level principle or concept governs this question?"
        ],
        'tree_of_thought': [
            "What decision or problem needs to be solved?",
            "What are the 2-5 distinct approaches or strategies to explore?",
            "What criteria should be used to evaluate each branch?"
        ],
        'chain_of_thought': [
            "What problem needs to be reasoned through?",
            "Should intermediate reasoning steps be shown?",
            "What verification or validation is needed?"
        ],
        'rcot': [
            "What is the question with all its conditions?",
            "Do you have an initial answer to verify, or should one be generated first?"
        ],
        'self_refine': [
            "What output needs to be improved?",
            "What dimensions to evaluate? (e.g., clarity, completeness, tone, security)",
            "How many refinement cycles? What's the stop condition?"
        ],
        'cai_critique_revise': [
            "What is the specific principle or standard to enforce?",
            "What output should be critiqued against this principle?"
        ],
        'devils_advocate': [
            "What position, plan, or decision should be attacked?",
            "What dimensions to attack? (assumptions, logic, execution risks, alternatives)",
            "Should the 3 most fatal flaws be ranked at the end?"
        ],
        'pre_mortem': [
            "What project or decision is being analyzed?",
            "What time horizon? (e.g., 6 months, 12 months from now)",
            "What domains to cover? (technical, people, market, financial, external)"
        ],
        'rpef': [
            "What output do you want to reverse-engineer into a prompt?",
            "Do you have the input data that produced this output? (optional)",
            "Should the recovered prompt be specific or a generalized template?"
        ],
        'reverse_role': [
            "What is your goal in 1-2 sentences?",
            "What domain or expertise should the AI bring to the interview?",
            "Batch questions (all at once) or conversational (one at a time)?"
        ],
        'react': [
            "What is the goal to achieve?",
            "What tools are available? (search, code execution, database, API, etc.)",
            "What constraints apply? (max iterations, stop conditions)"
        ]
    }

    return questions.get(framework_id, [
        "What is the specific task or goal?",
        "What context or background is relevant?",
        "What does a good output look like?"
    ])


# ─────────────────────────────────────────────────────────────
# MAIN (example usage)
# ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    test_prompts = [
        "Write a blog post about machine learning",
        "Analyze this CSV file and find trends",
        "Create a procedure for onboarding new employees",
        "Rewrite this email to sound more professional",
        "What are the risks of our Q4 product launch?",
        "Calculate the payback period: CAC $1200, MRR $150, 70% margin",
        "I want to build something but not sure what I need — can you help?",
        "Recover the prompt from this output: [output example]",
        "Argue against our decision to expand to Europe",
        "Search the web for the latest React hooks documentation and summarize it",
        "Write customer support responses — must be empathetic, don't use jargon",
        "Improve this code review — check for security, readability, and edge cases"
    ]

    for prompt in test_prompts:
        print(f"\nPrompt: {prompt[:60]}...")
        intent, confidence = detect_intent(prompt)
        print(f"Intent: {intent} (confidence: {confidence})")
        recs = analyze_use_case(prompt)
        for rec in recs:
            print(f"  → {rec['name']} ({rec['complexity']}) | score: {rec['score']}")
            print(f"     Matches: {', '.join(rec['matches'][:2])}")
