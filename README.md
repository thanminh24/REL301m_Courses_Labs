<div align="center">

# REL301m Courses Labs

### Reinforcement Learning Labs, Assignments, Slides, and Course Notes

**Course REL301m from FPT University.**

[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org)
[![Jupyter](https://img.shields.io/badge/Jupyter-Notebooks-F37626?style=for-the-badge&logo=jupyter&logoColor=white)](https://jupyter.org)
[![NumPy](https://img.shields.io/badge/NumPy-Scientific%20Computing-013243?style=for-the-badge&logo=numpy&logoColor=white)](https://numpy.org)
[![Matplotlib](https://img.shields.io/badge/Matplotlib-Visualization-11557C?style=for-the-badge)](https://matplotlib.org)

**Local workspace for REL301m reinforcement learning practice: bandits, dynamic programming, temporal-difference learning, Dyna-Q, function approximation, and course assignments.**

[Complete Exam Guide](docs/rel301m-complete-learning-guide.md) | [Labs](#labs) | [Assignments](#assignments) | [Course Materials](#course-materials) | [Quick Start](#quick-start) | [Project Layout](#project-layout)

</div>

---

## Highlights

- **Lab notebooks** - runnable Jupyter notebooks grouped by course section.
- **Python support files** - agents, environments, RL-Glue helpers, graders, and plotting scripts live beside each lab.
- **Assignment workspace** - assignment notebooks and helper files are kept in a separate `Assignment 1/` folder.
- **Reference materials** - original student notebooks, lecture slides, and course PDFs live under `docs/`.
- **Clean Lab 3 structure** - Lab 3.4 and Lab 3.5 now have direct folders instead of generic `Files (*)` names.

---

## Exam Canon and Evidence

All Q001–Q317 appeared in tests, so all **317 questions are canonical exam material**.
Canonical means examinable. For multiple-choice practice, the app uses the **best
available answer among A–D**, following the school material rather than demanding
that every option be universally worded.

Source priority is: **school lecture slides**, **Sutton–Barto**, then the official
**Coursera Reinforcement Learning Specialization** material on which the course is
based. The bank key remains the exam fallback when the available references do not
uniquely settle an item.

| Primary evidence tier | Questions | Status |
|---|---:|---|
| Local lecture slides | 225 | answer-bearing slide mapping |
| Sutton–Barto reference book | 54 | page-level fallback, visibly marked as book-supported |
| Official public Coursera pages | 0 | course alignment only; no direct answer-bearing mapping |
| Supplied test-bank key only | 38 | canonical for exam recall, but not reference-verified |

Only publicly visible official Coursera descriptions were inspected. No login, paywall, gated
lesson, video, transcript, quiz, or assignment content was accessed or crawled. Legacy `OUT`
and `discard` labels in the source audit describe mapping or question quality; they do not
exclude any of the 317 tested questions.

---

## Stack

| Layer | Technology |
|-------|------------|
| **Notebook Runtime** | Jupyter Notebook or JupyterLab |
| **Language** | Python 3.x |
| **Core Libraries** | NumPy, Matplotlib |
| **RL Utilities** | RL-Glue-style agent/environment interfaces |
| **Course Assets** | `.ipynb`, `.py`, `.pptx`, `.pdf`, `.npy`, `.zip`, `.png` |

---

## Quick Start

Install the common notebook packages in your preferred Python environment:

```bash
python -m pip install --upgrade pip
python -m pip install jupyter numpy matplotlib scipy tqdm
```

Open the notebooks:

```bash
jupyter lab
```

Then browse to the lab or assignment folder you want to run.

Useful direct starts:

```bash
jupyter lab "Lab 1"
jupyter lab "Lab 2"
jupyter lab "Lab 3"
jupyter lab "Assignment 1"
```

### Quiz-style study app

The offline-capable study app contains all 317 canonical questions:

**Live site:** [https://thanminh24.github.io/rel301m/](https://thanminh24.github.io/rel301m/)

```bash
cd study-app
npm ci
npm run dev
```

Learn presents one best-answer choice at a time: a correct response advances
immediately; a wrong response reveals the answer and short rationale. Its other
modes are Question Bank, Flashcards, Match, configurable Test, and local
Progress. Run the complete release gate with
`npm run verify`; see
[`study-app/docs/quizlet-parity-matrix.md`](study-app/docs/quizlet-parity-matrix.md)
for the implemented product boundary.

---

## Project Layout

```text
.
|-- Assignment 1/
|   `-- Week 5/                         # assignment notebook, agent/env files, tests, results
|-- Lab 1/
|   |-- Lab 1.1/                        # introductory notebook + script
|   |-- Lab 1.2/                        # value function example
|   |-- Lab 1.3/                        # bandits and exploration-exploitation
|   `-- Lab 1.4/                        # dynamic programming
|-- Lab 2/
|   |-- Lab 2.4/                        # TD policy evaluation
|   |-- Lab 2.5/                        # Q-learning and Expected Sarsa
|   `-- Lab 2.6/                        # Dyna-Q and Dyna-Q+
|-- Lab 3/
|   |-- Lab 3.4/                        # TD with state aggregation
|   `-- Lab 3.5/                        # semi-gradient TD with neural network
`-- docs/
    |-- Lab & Assignment/               # original student labs and assignments
    |-- slides/                         # lecture slides
    `-- 1-Reinforcement Learning-An introduction.pdf
```

---

## Labs

| Folder | Topic |
|--------|-------|
| `Lab 1/Lab 1.1` | Exploration and exploitation intro |
| `Lab 1/Lab 1.2` | Value function example |
| `Lab 1/Lab 1.3` | Bandits and exploration-exploitation |
| `Lab 1/Lab 1.4` | Optimal policies with dynamic programming |
| `Lab 2/Lab 2.4` | Policy evaluation with temporal-difference learning |
| `Lab 2/Lab 2.5` | Q-learning and Expected Sarsa |
| `Lab 2/Lab 2.6` | Dyna-Q and Dyna-Q+ |
| `Lab 3/Lab 3.4` | TD with state aggregation |
| `Lab 3/Lab 3.5` | Semi-gradient TD with a neural network |

---

## Assignments

| Folder | Contents |
|--------|----------|
| `Assignment 1/Week 5` | Implement-your-agent notebook, environment files, tests, generated result artifacts |
| `docs/Lab & Assignment/Assignment-student` | Original assignment notebooks and slides |

---

## Course Materials

| Path | Description |
|------|-------------|
| [`docs/rel301m-complete-learning-guide.md`](docs/rel301m-complete-learning-guide.md) | Canonical question-first route for all 317 tested questions: 225 slide-supported, 54 book-supported, and 38 visibly bank-key-only; public Coursera pages confirm alignment but directly support 0 answers |
| [`docs/final-exam-revision-question-index.md`](docs/final-exam-revision-question-index.md) | Preserved source audit and searchable question index; defer to the canonical guide for final verdicts |
| [`docs/final-exam-active-recall-workbook.md`](docs/final-exam-active-recall-workbook.md) | Optional calculations and algorithm traces; not evidence of, or required by, the supplied question bank |
| `docs/Lab & Assignment/Lab-Student` | Original lab notebooks and lab slide decks |
| `docs/Lab & Assignment/Assignment-student` | Original assignment notebooks and assignment slide decks |
| `docs/slides/slides` | Lecture slides by course topic |
| `docs/1-Reinforcement Learning-An introduction.pdf` | Sutton–Barto reference book used as the page-level fallback when local slides are insufficient |

---

## Notes

- Lab folders contain the working copies to edit and run.
- `docs/` keeps source/reference materials for comparison or restoration.
- Some notebooks depend on helper `.py` files in the same directory, so open notebooks from their own lab folder when possible.
