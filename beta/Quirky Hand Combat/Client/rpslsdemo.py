def rock_paper_scissors():
    valid_choices = ['rock', 'paper', 'scissors', 'spock', 'lizard']
    winning_combinations = {
        'rock': ['scissors', 'lizard'],
        'paper': ['rock', 'spock'],
        'scissors': ['paper', 'lizard'],
        'spock': ['rock', 'scissors'],
        'lizard': ['paper', 'spock']
    }
    
    while True:
        # Player 1's choice
        player1_choice = input("Player 1, choose rock, paper, scissors, spock, or lizard: ").lower()
        if player1_choice not in valid_choices:
            print("Invalid choice. Please try again.")
            continue
        
        # Player 2's choice
        player2_choice = input("Player 2, choose rock, paper, scissors, spock, or lizard: ").lower()
        if player2_choice not in valid_choices:
            print("Invalid choice. Please try again.")
            continue
        
        # Determine the winner
        if player1_choice == player2_choice:
            print(f"It's a tie! Both players chose {player1_choice}.")
        elif player2_choice in winning_combinations[player1_choice]:
            print(f"Player 1 wins! {player1_choice} beats {player2_choice}.")
        else:
            print(f"Player 2 wins! {player2_choice} beats {player1_choice}.")
        
        play_again = input("Do you want to play again? (yes/no): ").lower()
        if play_again != 'yes':
            break

rock_paper_scissors()
