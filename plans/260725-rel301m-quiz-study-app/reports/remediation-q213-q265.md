# Editorial remediation: Q213–Q265

Date: 2026-07-25  
Scope: `study-app/content/fragments/q213-q317.json`, records Q213–Q265 only

## Result

Remediated every Q213–Q265 record named by the v3 independent audit:

`Q215, Q217, Q219, Q221, Q222, Q223, Q226, Q227, Q228, Q232, Q233,
Q236, Q237, Q238, Q241, Q243, Q244, Q245, Q246, Q247, Q254, Q255,
Q256, Q261, Q264, Q265`.

Also replaced the duplicated bank-only takeaway shared by Q225 and Q263 with
question-specific memory cues.

Key corrections:

- separated Sarsa, Expected Sarsa, and Q-learning targets rather than reusing a
  general TD capsule;
- explained why action values support action comparison and policy
  improvement in Q217;
- distinguished dynamic programming's overlapping recursive subproblems from
  a purely greedy strategy in Q222;
- tied model purpose, model-based planning, and simulated Q-planning to the
  exact stems in Q227, Q232, and Q243;
- stated Q233's complete TD core idea: immediate reward plus bootstrapped
  next-state value;
- preserved Q246's caveat that ordinary importance sampling can have high
  variance while weighted/stabilized variants reduce it;
- explained the incomplete-episode distinction directly in Q247 and Q254;
- made underfitting in Q255 about linear representational capacity;
- separated tabular TD(0) from neural-network backpropagation in Q256;
- explained stacked action features as three four-feature blocks in Q264;
- limited policy evaluation in Q265 to computing values for the current fixed
  policy.

Every rewritten A–D rationale now addresses its own option. Repeated takeaway
sentences were removed from correct rationales.

## Read-only validation

- JSON parse: PASS
- Assigned slice size: 53 records
- Exact duplicate explanations in Q213–Q265: 0
- Exact duplicate takeaways in Q213–Q265: 0
- Exact cross-question option rationales in Q213–Q265: 0
- Within-question duplicate rationales: 0
- Rationales below ten words: 0
- Repeated substantive sentence inside a rationale: 0
- Mandatory 26-record depth scan: PASS

Shared generated artifacts were not rebuilt, per file-ownership instruction.

## Unresolved questions

None.
