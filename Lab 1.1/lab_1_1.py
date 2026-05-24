# Lab 1.1: Exploration and Exploitation
# Conceptual implementation from slides

import numpy as np

class EpsilonGreedyAgent:
    """
    An agent that balances exploration and exploitation using the epsilon-greedy strategy.
    """
    def __init__(self, num_actions, epsilon=0.1):
        self.num_actions = num_actions
        self.epsilon = epsilon
        # Estimate of action values, initialized to 0
        self.action_values = np.zeros(num_actions)
        # Number of times each action has been selected
        self.action_counts = np.zeros(num_actions)

    def select_action(self):
        """
        Selects an action based on epsilon-greedy policy:
        - With probability epsilon, choose a random action (exploration).
        - Otherwise, choose the action with the highest estimated value (exploitation).
        """
        if np.random.rand() < self.epsilon:
            # Exploration: choose a random action
            action = np.random.randint(self.num_actions)
        else:
            # Exploitation: choose greedy action
            # To break ties randomly, find all actions with max value and pick one randomly
            max_val = np.max(self.action_values)
            ties = np.where(self.action_values == max_val)[0]
            action = np.random.choice(ties)
        return action

    def update_value(self, action, reward):
        """
        Updates the action-value estimate incrementally using the sample-average formula.
        Q_{n+1} = Q_n + 1/N(A) * (R - Q_n)
        """
        self.action_counts[action] += 1
        alpha = 1.0 / self.action_counts[action]
        self.action_values[action] += alpha * (reward - self.action_values[action])

class MultiArmedBandit:
    """
    A simple multi-armed bandit environment where the true action values are drawn from a normal distribution.
    """
    def __init__(self, num_arms):
        self.num_arms = num_arms
        # Mean rewards for each arm, drawn from standard normal N(0, 1)
        self.true_action_values = np.random.normal(0, 1, num_arms)

    def get_reward(self, action):
        """
        Returns reward sampled from a normal distribution with mean true_action_values[action] and unit variance.
        """
        return np.random.normal(self.true_action_values[action], 1.0)

if __name__ == "__main__":
    # Initialize the environment and agent
    num_arms = 10
    num_steps = 1000
    np.random.seed(0)  # Set seed for reproducibility
    
    agent = EpsilonGreedyAgent(num_arms, epsilon=0.1)
    bandit = MultiArmedBandit(num_arms)
    
    print("True Action Values (q_*):")
    print(bandit.true_action_values)
    
    # Interaction loop
    total_rewards = 0
    for step in range(num_steps):
        action = agent.select_action()
        reward = bandit.get_reward(action)
        agent.update_value(action, reward)
        total_rewards += reward

    print("\nInteraction completed over {} steps.".format(num_steps))
    print("Total rewards obtained: {:.2f}".format(total_rewards))
    print("Estimated action values (Q):")
    print(agent.action_values)
    print("Action counts:")
    print(agent.action_counts)
