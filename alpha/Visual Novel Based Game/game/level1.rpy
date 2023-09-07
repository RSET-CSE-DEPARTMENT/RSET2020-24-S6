init python:
    def lowercase(val):
        return val.lower()

label level1:
    scene bg streets_of_venice
    play music "audio/bustling_city.opus"

    "The Merchant Of Venice, game plot adapted from the eponymous play by Sir William Shakespeare."
    
    "The bustling city of Venice is alive with merchants, sailors, and locals going about their daily business."

    "Antonio is an illustrious nobleman, and generous moneylender in the city of Venice"

    "He is liked by most of the people in the city, due to his kind nature of lending money at low interest rates"

    "He has a friend named Bassanio, who was more like his brother. He would do anything for Bassanio."

    "Bassanio is also a gentleman of Venice, and a kinsman and dear friend to Antonio." 

    "The story begins with Antonio meeting Bassanio at the Venice market"
    
    # "Enter Antonio"
    show antonio at Position(xpos=0.7,xanchor=0.7,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100
    antonio "Bassanio, my friend, what troubles your mind today?"
    show bassanio at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100
    bassanio "Antonio, I find myself in a predicament. I am deeply in debt and seek a loan to woo the beautiful Portia. I plan to travel to Belmont for a chance to win her hand.
    I really need your help"

    antonio "How many ducats do you seek my friend?"
    bassanio "3000"
    menu:
        "help bassanio":
            jump help_bassanio
        "don't help him":
            antonio "Bassanio my friend, my ships are currently at sea with a storm brewing.I am troubled as is and not in a state to help you."
            bassanio "What?.."
            bassanio "I thought you were my friend.."
            return

label help_bassanio:
    antonio "My dear friend, I am at your service." 
    antonio "However, my fortunes are tied up in my merchant ships which are currently at sea."
    antonio "Hence, we must visit another money lender to procure the loan"

    bassanio "Do you have someone particular in mind?"
    menu:
        "Valentino":
            antonio "Valentino is a Catholic moneylender who is sure to provide a low interest rate."
            antonio "We should definitely try visiting him"
            bassanio "Sure"
            jump visit_valentino

        "Shylock":
            antonio "Shylock is a jewish moneylender who may possess that many ducats,though he is 
            known for his shrewd behaviour and on top of that i haven't been in good terms with him"
            antonio "Shall we give him a visit?"
            bassanio "Only if you are okay with that"
            jump visit_shylock


label visit_valentino:
    stop music
    play music "audio/hopeful_music.opus"
    scene bg valentino_office_day
    "Antonio and Bassanio visit Valentino the money lender's office"
    show antonio at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100
    show bassanio at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100
    antonio "Valentino I come to you to ask for a loan of 3000 ducats."
    show valentino at center with fade
    valentino "I am sorry Antonio but my son is ill and is in need of a surgery. My
    finances are tied up in that."
    scene bg pure_black
    stop music
    "Unable to secure the loan from Valentino,Antonio and Bassanio return to the market to discuss other options"
    scene bg streets_of_venice
    show antonio at Position(xpos=0.7,xanchor=0.7,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100
    show bassanio at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100
    bassanio "What now?...."
    bassanio "Shall we go visit Shylock? We don't seem to have many options now"
    menu:
        "visit shylock":
            antonio "Shylock is known for his shrewd behaviour and on top of that i haven't been in good terms with him
            but we shall go visit him as we don't have any other option now"
            jump visit_shylock

        "Decline":
            antonio "Bassanio my friend, if it's Shylock we have to visit then i must decline"
            "Since Antonio declined Bassanio's request to visit shylock their story ends here"
            return


label visit_shylock:
    stop music
    #jump shortest_path_shylock
    scene bg pure_black
    "Antonio and Bassanio must now visit Shylock through the shortest available path"

    scene venice_map_graph

    "Guide Antonio and Bassanio through the city of Venice"
    $path=renpy.input("What is the shortest path in the given graph from A to J")
    
    $path=lowercase(path)
    
    if(path=="abdefghj"):
        pass
    else:
        scene bg game_over
        "Game over"
        return
    scene bg shylock_house_outside

    "Antonio and Bassanio reach Shylock's house"

    show antonio_invert at Position(xpos=0.4,xanchor=0.4,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100
    show bassanio at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    show shylock_guard at Position(xpos=0.9,xanchor=0.9,ypos=0.9,yanchor=0.9) with moveinright:
        yoffset 100

    shylock_guard "Halt!"
    shylock_guard "What do we have here? Antonio and Bassanio, I've heard tales of your dealings with Shylock. 
    What brings you to his doorstep today? Trying to swindle him again, are we?"

    bassanio "We've come to him seeking a loan"

    shylock_guard "A loan, you say? How convenient! You think Shylock would be foolish enough to lend money to the likes of you? 
    You've already milked him dry, haven't you? Well, I have news for you. Shylock isn't in the business of throwing money at those who can't pay their debts."

    menu:
        "Bribe":
            label bribe_guard:
                antonio "Guard, I understand the importance of your role here. 
                Allow me to propose an alternative arrangement. 
                If we were to provide you with a suitable bribe, would you consider granting us access to see Shylock?"

                "The guard glances around discreetly, ensuring no one else is listening, and then leans in closer to Antonio."

                shylock_guard "Alright, Antonio, I see your offer. Money has a way of making things happen. Show me what you have in mind."

                "Antonio discreetly passes a pouch of coins to the guard, ensuring that their transaction remains concealed."
                antonio "Here, as promised. This should be sufficient to secure our access to Shylock."

                "Coins available with antonio before paying the guard = [wallet]"
                $wallet-=1000

                "Coins remaining with antonio = [wallet]"

                jump see_shylock

        "Challenge":
            antonio "Guard, I propose a challenge to settle this matter.
            If I can best you in an intellectual game of your choosing, will you then grant us access to see Shylock?"

            shylock_guard "Hah! An intellectual game, you say? Fine, I accept your challenge. 
            But don't think for a moment that you can outwit me"

            shylock_guard "Here's the puzzle I propose:"

            jump start_hanoi
            
label see_shylock:
    stop music
    play music "audio/hopeful_music.opus"

    scene bg shylocks_office_day
    show shylock at center with fade
    with dissolve

    shylock "What brings you to my doorstep, Antonio? Your ventures are notorious for their risks."

    show antonio at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100
    show bassanio at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    antonio "I seek a loan Shylock, of three thousand ducats."

    shylock "Three thousand ducats, well."

    bassanio "Yes, sir, for three months."

    shylock "For three months, well."

    bassanio "Antonio will be the guarantor of the loan."

    shylock "Three thousand ducats for three months, and Antonio will be bound to guarantee the loan.
    Despite risks, he is a sufficient guarantor for the loan."

    shylock "Antonio do you accept these terms? You usually don't lend or borrow with interest do you?And as interest I have decided make it a piece of
    flesh near your heart, I take my interests seriously unlike you."

    $shylock_satisfaction=0
    menu:
        "Agree to all of his terms":
            $shylock_satisfaction+=1
            antonio "Shylock, I normally don't lend or borrow money with interest, but in
            order to help my needy friend, I'll break my custom.Even if it means a
            piece of flesh, I am certain I would have made four times that amount
            anyway by that time."

        "Agree to his terms but decline the interest":
            antonio "Shylock, I normally don't lend or borrow money with interest, I am
            confident that my ships will bring me my fortune back and that an
            interest will not be necessary. I don't wish to pay you interest
            Shylock.I also don't want to risk my life for bassanio."

    shylock "You are a Christian who lends out money without charging interest,
    forcing the merchant to lower their interest rates. You hate Jews and
    speak badly of them.Are you willing to collect the rest of the amount
    from Tubal the wealthy Jew?I can only provide you with half the
    amount now."

    menu:
        "Agree to collect rest of the loan from Tubal":
            $shylock_satisfaction+=1
            antonio "Sure, why not? I'll agree to such a deal, and I'll admit there is much
            kindness in Jews."

        "Demand the entire loan from Shylock":
            antonio "My religious inclinations are strong Shylock,and Tubal is a fanatical
            Jew. I seek the entire amount from you or we shall seek some other
            way."

    shylock "What if you have ill intent, and try to harm me to not pay off the interest?"
    menu:
        "Sign a contract to reassure him":
            $shylock_satisfaction+=1
            antonio "How can you think of me like that Shylock! I am a law abiding
            Christian who would never do such things. If you have any such
            suspicions about me then lets sign a contract that ensures the interest
            is paid whether you are dead or alive to your closest relative."

        "Proceed without signing any contracts":
            antonio "How can you think of me like that Shylock! I am a law abiding
            Christian who would never do such things. If you have any such
            suspicions about me then you are misinformed."
    if(shylock_satisfaction<3):
        shylock "Antonio you have not met my requirements.
        I thought your friendship with bassanio meant more to you."

        shylock "I shall agree to your loan only if you are able to make a security payment of 2000 ducats upfront"
        if(wallet<2000):
            antonio "I'm sorry.I currently do not possess such an amount.I currently have only [wallet] ducats with me"
            scene bg game_over
            "Game over"
            return
        else:
            antonio "I agree to your terms Shylock"

            "Antonio had [wallet] ducats with him"
            $wallet-=2000

            "Antonio now has [wallet] ducats"
            jump level2

    else:
        shylock "Very well, Antonio. We shall draw up the bond. But beware, if you
        default, the bond shall be enforced."
        "END OF LEVEL 1"
        jump level2

label failed_hanoi:
    scene bg shylock_house_outside
    show antonio_invert at Position(xpos=0.4,xanchor=0.4,ypos=0.1,yanchor=0.1) 
    show bassanio at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) 
    show shylock_guard at Position(xpos=0.9,xanchor=0.9,ypos=0.9,yanchor=0.9)

    shylock_guard "Pathetic! You couldn't even answer a simple question correctly. It seems your intellect is lacking."
    antonio "We apologize for our mistake. We misunderstood the puzzle."
    bassanio "Indeed, we made an error in our calculations. We appreciate your patience."
    shylock_guard "Patience? I have none for incompetence. It's clear that you are unworthy of proceeding. Leave this place immediately."
    menu:
        "bribe":
            jump bribe_guard
        "leave":
            pass
    scene bg game_over
    "Game over"
    return
    
                
