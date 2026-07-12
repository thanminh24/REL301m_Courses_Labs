# Friend Talking Points: D2 and D3

Fast notes for presenting Slides 6-9. Keep these short while speaking.

## Slide 6: D2 Method - Representation

- D2 compares two observation inputs for the same DQN setup.
- `vec8` is a fixed 8-dimensional hand-crafted feature vector.
- `grid256` is the flattened 4-channel 8x8 grid.
- This is not a CNN comparison; both use an MLP.
- Transfer matters because `vec8` keeps the same size when the board changes.

## Slide 7: D2 Result - Compact Features Win Here

- `vec8` reached 100% win rate vs RandomOpponent for both seeds.
- `grid256` reached 84% and 86%.
- `vec8` also transferred zero-shot to n=12 with 100% win rate for both seeds.
- `grid256` cannot do that zero-shot transfer because its input size changes.
- Careful wording: compact features were stronger in this course-scale setup.

## Slide 8: D3 Method - Reward Shaping

- D3 asks whether reward design changes behavior.
- Peaceful: collisions are free.
- Default: collision reward depends on score gap.
- Aggressive: collision winner gets a larger fixed reward, loser gets a penalty.
- The second part adds a food-distance compass bonus during training only.

## Slide 9: D3 Result - Reward Changes Did Not Separate Clearly

- All three regimes reached 100% win rate vs RandomOpponent.
- Collisions stayed around 0.6-0.8 per episode.
- Food stayed near 26 per episode.
- Illegal moves stayed low across regimes.
- Shaped reached 100% and 100%; unshaped reached 100% and 98%.
- Careful wording: RandomOpponent was too easy to prove one regime is better.

## Unresolved questions

- None currently.
