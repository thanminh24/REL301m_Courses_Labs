#!/usr/bin/env python

from rlglue.agent import BaseAgent

import numpy as np

class Agent(BaseAgent):
    """
    Base bandit agent used by all 3 agent subclasses in the notebook.
    
    RLGlue lifecycle:
        agent_init()  → called once at experiment start (read config, create arrays)
        agent_start() → called once per episode (pick first action)
        agent_step()  → called every step (update Q, pick next action) ← THIS IS OVERRIDDEN BY SUBCLASSES
        agent_end()   → called when episode terminates (final Q update, no new action)
    """
    def __init__(self):
        self.last_action = None
        self.num_actions = None
        self.q_values = None
        self.step_size = None
        self.epsilon = None
        self.initial_value = 0.0
        self.arm_count = [0.0 for _ in range(10)]

    def agent_init(self, agent_info={}):
        """Setup for the agent called when the experiment first starts.
        
        Reads configuration from agent_info dict:
            - num_actions:    how many arms (default 2)
            - initial_value:  starting Q value for all arms (default 0.0)
            - step_size:      fixed α for constant step-size agent (default 0.1)
            - epsilon:        exploration probability (default 0.0 = pure greedy)
        """
        # ─── Read config parameters from the experiment ───
        self.num_actions = agent_info.get("num_actions", 2)
        self.initial_value = agent_info.get("initial_value", 0.0)
        
        # Q(a) estimates: initialized to initial_value for all arms
        # Using initial_value > 0 enables "optimistic initialization" which
        # encourages early exploration (all rewards < initial_value → untried arms look better)
        self.q_values = np.ones(agent_info.get("num_actions", 2)) * self.initial_value
        
        # Step-size α for constant step-size agent
        self.step_size = agent_info.get("step_size", 0.1)
        
        # Exploration rate ε (0.0 = no exploration = greedy)
        self.epsilon = agent_info.get("epsilon", 0.0)

        self.last_action = 0

    def agent_start(self, observation):
        """Called once at the start of each episode.
        
        The observation is always 0 in bandits (no states).
        We pick our first action randomly (since all Q values are equal initially).
        
        Returns:
            int: The first action the agent takes.
        """
        # Random choice among all arms for the first step
        # (all Q values are equal, so any selection method would be effectively random)
        self.last_action = np.random.choice(self.num_actions)
        return self.last_action

    def agent_step(self, reward, observation):
        """Called every step in the interaction loop.
        
        NOTE: This base implementation does NO learning (just picks random actions).
        The 3 subclasses in the notebook OVERRIDE this method with proper update + selection logic.
        
        Args:
            reward:      the reward received for taking last_action
            observation: the state (always 0 in bandits, unused)
        Returns:
            int: The next action the agent takes.
        """
        self.last_action = np.random.choice(self.num_actions)
        return self.last_action

    def agent_end(self, reward):
        """Called when the episode terminates.
        
        The agent receives a final reward for last_action.
        In bandits, episodes typically don't terminate early, so this is rarely called.
        """
        pass

    def agent_cleanup(self):
        """Cleanup done after the agent ends."""
        pass

    def agent_message(self, message):
        """A function used to pass information from the agent to the experiment."""
        pass