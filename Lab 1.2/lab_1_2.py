# Lab 1.2: Example of Value Function
# Conceptual implementation from slides

import numpy as np

class GridWorld:
    """
    A simple 3x3 grid world environment.
    """
    def __init__(self):
        self.grid_size = (3, 3)
        self.num_actions = 4  # Up, Down, Left, Right
        # Immediate rewards defined for each cell in the grid
        self.rewards = np.array([
            [0, 0, 0],
            [0, 0, 0],
            [0, 1, 0]  # Reward of +1 in the bottom-middle cell (row 2, col 1)
        ])

    def get_reward(self, state):
        """
        Returns reward for landing/being in a given state.
        """
        return self.rewards[state[0], state[1]]

class ValueFunction:
    """
    A table-lookup representation of state values.
    """
    def __init__(self, grid_size):
        # Initialize values of all states to 0
        self.values = np.zeros(grid_size)

    def update_value(self, state, new_value):
        """
        Updates value of a state to the given value.
        """
        self.values[state[0], state[1]] = new_value

    def get_value(self, state):
        """
        Returns the value of a state.
        """
        return self.values[state[0], state[1]]

if __name__ == "__main__":
    # Create the environment
    grid_world = GridWorld()
    
    # Create value function
    value_function = ValueFunction(grid_world.grid_size)
    
    # Initialize value function using the state rewards
    for i in range(grid_world.grid_size[0]):
        for j in range(grid_world.grid_size[1]):
            state = (i, j)
            reward = grid_world.get_reward(state)
            value_function.update_value(state, reward)
            
    print("Initial Value Function (populated with immediate rewards):")
    print(value_function.values)
