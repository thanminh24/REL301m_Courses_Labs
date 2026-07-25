# Strengthened-validator remediation

Date: 2026-07-25  
Scope: Q001–Q212 fragment ownership

## Result

**All assigned strengthened-gate findings remediated.**

No immutable stem, option, supplied key, verdict, evidence, provenance, or
conceptual-adjudication field changed. No shared build was run.

## Fix map

### Q012 rationale collision

- A now directly explains that Dyna-Q queries a learned transition/reward model
  for simulated planning and notes that the bank records A.
- C independently contrasts model-free direct Q-learning with Dyna-Q’s added
  model-based planning and explains why C is conceptually near-equivalent.
- The former shared substantive sentence no longer appears in both rationales.

### Removed meta openers

| IDs | Direct teaching now begins with |
|---|---|
| Q113 | Causes of model discrepancy versus perfect alignment |
| Q115 | Proposal/weight/control-variate design and Monte Carlo variance |
| Q121 | Advantage as Q minus the state baseline |
| Q123 | Overlapping receptive fields and local transfer |
| Q127 | Absence of a natural terminal episode |
| Q129 | Greedification from current values |
| Q131 | Shared linear features and unseen-state transfer |
| Q133 | Complete-return MC versus online TD bootstrap |
| Q137 | Approximate Q-values used by epsilon-greedy |
| Q139 | Neural Q approximation for large state spaces |
| Q141 | Policy action probability in Bellman expectation |
| Q147 | Values ranking action consequences for improvement |
| Q149 | Information-gathering exploration versus reward-seeking exploitation |
| Q151 | Distribution-model expected backups |
| Q155 | Probability allocation across uncertain and known actions |
| Q157 | k as the number of available arms |
| Q165 | Model-based DP versus model-free alternatives |
| Q167 | Policy as a state-to-action mapping |
| Q173 | Neural-policy weights and biases |
| Q185 | Model-based evaluation of hypothetical outcomes |
| Q189 | Fixed-policy value evaluation before improvement |
| Q195 | Sarsa’s next action from the same behavior policy |
| Q199 | The five Sarsa tuple elements |
| Q201 | Gaussian densities for continuous actions |
| Q211 | Q(s,a) as state-and-action-conditioned return |

Every replacement contains at least two substantive teaching sentences.

## Read-only validation

| Check | Result |
|---|---:|
| JSON records inspected | 212 |
| Literal `This item tests` occurrences | 0 |
| Explanations below two substantive sentences | 0 |
| Substantive sentence repeated across A–D rationales | 0 |
| Q012 A/C rationale collision | removed |
| Exact duplicate explanations | 0 |
| Exact duplicate takeaways | 0 |
| JSON parsing | PASS |
| `git diff --check` | PASS |

## Unresolved questions

- None within the assigned strengthened-validator findings. Integrated rebuild
  and independent all-317 audit remain controller-owned.

Status: DONE  
Summary: Removed all remaining Q001–Q212 meta openers, rewrote Q012 A/C
independently, and passed the new slice-wide rationale-sentence gate.  
Concerns/Blockers: None.
