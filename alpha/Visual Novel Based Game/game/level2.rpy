# LEVEL 2 part 1
    
# Character definitions
define launcelot = Character("Launcelot")
define gobbo = Character("Gobbo")

define jessica = Character("Jessica")
define gratiano = Character("Gratiano")
define lorenzo = Character("Lorenzo")

image bassanio_large_inverted:
    "bassanio_inverted.png"
    zoom 1.3

image jessica_large_inverted:
    "jessica_inverted.png"
    zoom 1.4

image salerio_lvl2:
    "salerio.png"
    zoom 1.3

image solanio_lvl2:
    "solanio_right.png"
    zoom 1.5

image gratiano_left:
    "gratiano_left.png"
    zoom 1.3

image lorenzo_right:
    "lorenzo_right.png"
    zoom 1.3

image masquerade_gratiano:
    "masquerade_gratiano.png"
    zoom 1.4

image masquerade_salerio:
    "masquerade_salerio.png"
    zoom 1.4

image masquerade_jessica:
    "masquerade_jessica.png"
    zoom 1.4

image masquerade_lorenzo:
    "masquerade_lorenzo.png"
    zoom 1.4

label level2:
    stop music
    # INT. PATHWAY BETWEEN BUILDINGS IN THE STREETS OF VENICE - DAY
    scene bg meeting_place

    #play music "audio/bustling_city.opus"
    

    # Launcelot enters alone
    show launcelot at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100

    "Here we see Launcelot Gobbo, Bassanio’s servant. A comical, clownish figure who is especially adept at making puns."

    "And his father Gobbo, also a servant in Venice, quite frail and old."

    # Dialogues
    launcelot "Part of me wants to flee from my master, this Jew. My conscience advises me to stay, but the devil is more friendly in urging me to run away."

    "Gobbo, Launcelot's father enters with a basket"

    show gobbo_inverted at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
            yoffset 100
    gobbo "Excuse me, young man, where is the Jew's house? A man named Launcelot lives with him, he is the servant of this Jew."

    # Launcelot's choices
    menu:
        "Play tricks": 
            "(To himself) Oh God, this is my father. He is as blind as a bat and doesn't recognise me. I'll play some tricks on him."
            jump level2_part1_choice1
        "Help his father": 
            "(To himself) This is my father, the old man is as blind as a bat and doesn't recognise me. Let me help him."
            jump level2_part2_choice2

# LEVEL 2 part 1 - CHOICE 1
label level2_part1_choice1:

    # Dialogues for Choice 1

    # Continue the conversation with Launcelot tricking Gobbo

    gobbo "Are you talking about young Master Launcelot?"
    launcelot "Not a 'master,' sir, but a poor man's son. His father, though, is an honest, if very poor, man and— thank God—in good health."
    launcelot "Well, whatever his father is like, we are talking about young Master Launcelot."
    gobbo "Master, I am speaking of someone simply called Launcelot."
    launcelot "Ergo, Master Launcelot. Don't talk about Master Launcelot, father. That young gentleman, according to his fate and destiny and so forth, the Three sisters and so on, is deceased. Or, to say it plainly, he has gone to heaven."
    gobbo "God forbid! In my old age I relied on that boy, like a crutch!"

    # Choices continuation or beginning
    menu:
        "Continue the conversation":
            jump level2_part2_choice1
        "Skip to section after the trickery":
            jump level2_part2_choice2

# LEVEL 2 part 2 - CHOICE 1
label level2_part2_choice1:

    # Dialogues for Choice 1 continuation
    launcelot "Do I look like a crutch or a prop? Do you recognize me, father?"
    gobbo "Alas, sir, I am completely blind. I don't know you."
    # puzzle here maybe
    jump level2_part2_common

label level2_part2_choice2:
    launcelot "Father, it is your son, your own flesh and blood standing before you."
    gobbo "No sir, I don't believe you. Besides, he is a very poor man's son, and I'm completely blind."
    jump level2_part2_common

# Common part for both choices
label level2_part2_common:

    # Continue with the story...
    play music "audio/bustling_city.opus"
    # LEVEL 2 part 3
    
    # Dialogues for LEVEL 2 part 3
    # launcelot "Do I look like a crutch or a prop? Do you recognize me, father?"
    # gobbo "Alas, sir, I am completely blind. I don't know you."
    launcelot "Please, enough fooling around. Give me your blessing. I am Launcelot, who was, is, and will continue to be your son. I am the Jew's servant, and I am sure your wife Margery is my mother."
    gobbo "My wife's name is Margery, indeed. If you're Launcelot, I'll swear you are my own flesh and blood. (He feels the back of LAUNCELOT's head) Good lord, what a beard you have! You have more hair on your chin than my horse Dobbin has on his tail."
    launcelot "It would seem that Dobbin's tail is shrinking, then. I am sure that he had more hair on his tail the last time I saw him than I have on my face."
    gobbo "Lord, you have changed! How are you and your master getting along? I have bought him a present. Are you getting along with him?"
    launcelot "I've decided to escape from my Jewish master who mistreats me and barely feeds me. I hope to run far away and give a present to Master Bassanio instead. If I continue serving the Jew, I'll become like him."

    "Bassanio enters with Leonardo"

    launcelot "Go talk to him, father."
    gobbo "(To BASSANIO) God bless you!"

    # LEVEL 2 part 4."
    hide launcelot
    hide gobbo_inverted

    show launcelot_inverted at Position(xpos=0.4,xanchor=0.4,ypos=0.1,yanchor=0.1):
        yoffset 100

    show gobbo_inverted at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1):
            yoffset 100

    show bassanio_large_inverted at Position(xpos=0.9,xanchor=0.9,ypos=0.3,yanchor=0.3) with moveinright:
        yoffset 100

    bassanio "Thanks! Do you want something?"
    launcelot "Not a poor boy, sir, but a servant of the rich Jew. And I would like, sir, as my father will tell you—"
    gobbo "He has a great desire, sir, as they say, to serve—"
    launcelot "Yes, to make a long story short, I currently serve under the Jew and, as my father will tell you, I have a desire—"
    gobbo "He and his master, your reverence, are not the closest of friends—"
    launcelot "To be brief, the truth is that the Jew, having wronged me, now makes it so that I, as my father, being an old man, will provide you with GOBBO I have a gift of a plate of doves here that I would give to you, and all I ask is—"
    bassanio "One of you speak for both of you. What do you want?"
    launcelot "To be your servant, sir."
    bassanio "I know you well. You will get what you ask for. Your master Shylock spoke with me today and spoke well of you, if you really want to leave the service of a rich Jew to become a servant of such a poor gentleman."
    launcelot "The old proverb says, 'the grace of God is enough.' It could be split up between you and my master Shylock, sir. You have the grace of God, and he has enough."
    bassanio "Well said. Go along with your son, father. Go leave your old master and come inquire at my house. (To his attendants) Give him a outfit more frilled than his fellow servants. Make sure this is done."
    launcelot "Examining my own palm, I see a promising future. Multiple marriages, surviving close calls, and encounters with fortune. Join me, father, as leave the Jew behind in the blink of an eye."

    "THE CLOWN LAUNCELOT EXITS WITH OLD GOBBO."
    hide launcelot_inverted with dissolve
    hide gobbo_inverted with dissolve
    hide bassanio_large_inverted with dissolve
    
    # LEVEL 2 part 7
    "Jessica and Launcelot the clown enter."

    "Jessica is Shylock’s daughter, although she hates life in her father’s house and under his shadow."

    show launcelot at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100
    show jessica_large_inverted at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
            yoffset 100

    jessica "I regret your departure from my father's service in such a manner. Our home is a chaotic place, and your humor brought some relief. Nevertheless, I sincerely wish you the best. Here's a ducat as a token, and please deliver this letter to Lorenzo when you meet him at dinner."
    launcelot "Goodbye! I am speaking through my tears. You most beautiful pagan, you sweet Jew! I'll bet some Christian will figure out a way to get you. But goodbye. These silly tears aren't very manly. Goodbye."
    jessica "Farewell, good Launcelot."

    "LAUNCELOT exits."

    hide launcelot with dissolve

    # LEVEL 2 part 7
    jessica "Alas, what a heinous sin it is for me to be ashamed to be my father's child! I am his daughter by blood, but I have not inherited his manners. Oh, Lorenzo, if you keep your promise I will end this pain by becoming a Christian and your loving wife."
    
    "JESSICA EXITS."
    hide jessica_large_inverted with dissolve

    "Gratiano, Lorenzo, Salerio, and Solanio enter."

    "Gratiano is a friend of Bassanio’s; a coarse and garrulous young man."

    "Salaerio and Solanio are Venetian gentlemen and friends of Antonio, Lorenzo and Bassanio."

    "Lorenzo is similarly a friend of Bassanio and Antonio and is in love with Shylock’s daughter, Jessica."

    show gratiano_left at Position(xpos=0.7,xanchor=0.7,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100
    show lorenzo_right at Position(xpos=0.3,xanchor=0.3,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100
    
    show salerio_lvl2 at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100

    show solanio_lvl2 at Position(xpos=0.1,xanchor=0.1,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100
    
    gratiano "We haven't prepared well enough for this."
    salerio "We haven't got ourselves torchbearers yet."
    solanio "Unless we plan carefully, this will turn out badly, and it will be better not to try this."
    lorenzo "It's only four o'clock now. We have two hours to get ready."
    launcelot "LAUNCELOT ENTERS WITH A LETTER."
    show launcelot_inverted at Position(xpos=0.4,xanchor=0.4,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100
    lorenzo "(Examines the letter) My friend Launcelot, what's the news?"
    launcelot "(Hands the letter to LORENZO) If you would open this up, it will tell you."


    # LEVEL 2 part 8

    # Dialogues for LEVEL 2 part 8
    lorenzo "(Opens the letter, recognizing the handwriting) I know this handwriting. Truly written by a beautiful hand, one whiter than the paper it wrote on."
    gratiano "Something about love, is it?"
    launcelot "(To LORENZO) May I leave, sir?"
    lorenzo "Where are you going?"
    launcelot "Sir, I am going to tell my old master the Jew to dine tonight with my new master the Christian."
    lorenzo "(Gives LAUNCELOT money) Hold on. Take this. Tell gentle Jessica that I won't fail her. Tell her this privately. And you gentlemen, go and prepare for this masquerade party tonight. I have a torchbearer."
    
    "LAUNCELOT THE CLOWN EXITS."
    hide launcelot_inverted with dissolve

    salerio "Yes, sure thing, I'll go see to it right away."
    solanio "And so will I."

    hide solanio with dissolve

    # LEVEL 2 part 9
    lorenzo "Meet Gratiano and me at Gratiano's house a few hours from now."
    salerio "That's a good plan."
    gratiano "(Reads the letter) Wasn't that letter from the beautiful Jessica?"
    lorenzo "I must disclose everything. She has guided me in her escape plan, revealing her wealth and a servant's outfit. Her kind and gentle nature is a credit to her father."
    lorenzo "May misfortune only strike if it's due to her connection to a faithless Jew. Now, come with me. (He gives GRATIANO the letter) Read this as you go. Beautiful Jessica will be my torchbearer."

    "LORENZO GRATIANO,SALERIO AND SOLANIO EXIT"
    hide lorenzo_right 
    hide gratiano_left 
    hide salerio_lvl2 
    hide solanio_lvl2 
    with dissolve

    # LEVEL 2 part 10
    scene bg pure_black
    "The scene shifts to Shylock's house"
    scene bg shylocks_office_day
    

    show shylock at Position(xpos=0.9,xanchor=0.9,ypos=0.4,yanchor=0.4) with moveinright:
        yoffset 100

    show launcelot_inverted at Position(xpos=0.1,xanchor=0.1,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 150
    stop music

    #play music "audio/calmtune.opus"

    stop music
    shylock "You will witness the difference between old Shylock and Bassanio. (To JESSICA) Jessica!"
    shylock "(To LAUNCELOT) You won't gorge on food like with me. (To JESSICA) Jessica! (To LAUNCELOT) No more sleep, snoring, or ruining clothes. (To JESSICA) Jessica, I'm calling you!"
    
    
    launcelot "Yes, Jessica!"
    shylock "Who told you to call her? I didn't order it."
    launcelot "You often told me not to act without your command."

    show jessica_large_inverted at Position(xpos=0.4,xanchor=0.4,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 150

    jessica "You called? What do you want?"
    

    # Branching Scenario - Option A: Jessica's Escape
    shylock "I received a dinner invitation, Jessica. Here are my keys. Yet, why should I go? They don't invite me out of affection but to flatter. Still, out of spite, I'll eat that Christian's food. Take care of the house, my girl. I'm hesitant to leave, as trouble brews from my dream of money bags."
    shylock "Listen, Jessica. Lock the doors. When you hear the drum and vile flute, don't look out, shut the windows, and keep their foolish celebration away. I won't feast, but I'll go to the dinner. Launcelot, inform them I'm coming."
    launcelot "I will go ahead, sir."

    # LEVEL 2 part 11
    launcelot "(To Jessica) Mistress, despite your father's warnings, look out of a window. You'll see a Christian come by who's worth your Jewish eye."
    
    hide launcelot_inverted with dissolve
    "LAUNCELOT EXITS"
    
    stop music
    shylock "What did that foolish Christian tell you?"
    #play music "audio/tense_music.opus"

    menu:
        "(As Jessica) Lie to shylock about what Launcelot told you":
            stop music
            jump level2_part10_choice1
        "(As Jessica) Tell shylock the truth about what Launcelot told you":
            stop music
            jump level2_part10_choice2     

label level2_part10_choice1:
    jessica "He said, 'Farewell, mistress.' Nothing else."
    shylock "He's friendly but eats a lot, moves slowly, and sleeps excessively. I'll replace him with hardworking individuals for my team. I'll release him and have him repay the money he borrowed. Jessica, go inside and secure everything."
    jessica "Farewell, and if I have any good luck, soon I will have lost a father and you will have lost a daughter."
    jump level2_part13


label level2_part10_choice2:
    # Branching Scenario 2 - Option B: Jessica's Loyalty
    jessica "Father, I confess my intentions to elope with Lorenzo for marriage. However, as I stand here, I can't leave you. Despite our differences, let's bridge the gap, mend our relationship. I'll stay, seek understanding and acceptance. Please, give us a chance."
    # LEVEL 2 part 12

    # Dialogues for LEVEL 2 part 12
    shylock "Jessica, your plans to elope and the money don't concern me. What truly matters is repairing our relationship. Let's bridge the gap, seek understanding, and give ourselves a chance to reconcile."
    jessica "Thank you for your understanding father. What was it you and Launcelot were discussing?"
    shylock "I received a dinner invitation, Jessica. Here are my keys. Yet, why should I go? They don't invite me out of affection but to flatter. Still, out of spite, I'll eat that Christian's food. Take care of the house, my girl. I'm hesitant to leave, as trouble brews from my dream of money bags."

    "Exit JESSICA."
    hide jessica_large_inverted with dissolve

    jump level2_part13

label level2_part13:
    scene bg masquerade_party

    "Gratiano and salerio, dressed for masquerade, enter."

    "The masquerade party is huge bash where all the gentlemen, lords and ladies of Venice are invited to celebrate."

    "All the guests of the masquerade party wear exquisite masks, so that no one recognizes them easily."

    show masquerade_gratiano at Position(xpos=0.8,xanchor=0.8,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100
    show masquerade_salerio at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    # LEVEL 2 part 13
    gratiano "This is the house Lorenzo wanted us to wait at."
    salerio "He's almost late."
    gratiano "Surprising, as lovers are usually early."
    salerio "Venus' doves fly faster for new love than to keep faith."
    gratiano "True, who leaves a feast as hungry as they arrived? What horse retraces its steps with the same enthusiasm? Chasing is more thrilling. Ships return weathered, torn by the wind!"
    salerio "Here comes Lorenzo. We'll discuss this later."

    show masquerade_lorenzo at Position(xpos=0.5,xanchor=0.4,ypos=0.1,yanchor=0.1) with dissolve:
        yoffset 100
    lorenzo "Forgive my lateness. When you steal your wives, I'll wait too. This is my father-in-law's house. Who's there?"
    jessica "Who are you? I recognize your voice."
    hide masquerade_salerio 
    hide masquerade_gratiano
    show masquerade_lorenzo at Position(xpos=0.7,xanchor=0.7,ypos=0.1,yanchor=0.1) with move:
        yoffset 100
    show masquerade_jessica at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with dissolve:
        yoffset 100
    lorenzo "It's Lorenzo, your love."

    #play music "audio/love_tune.opus"
    # LEVEL 2 part 14
    jessica "You're Lorenzo, my love. Who else knows I'm yours?"
    lorenzo "Heaven and your thoughts know you're mine."
    jessica "Catch this box. It's worth it. I'm glad it's dark. Love is blind. Cupid would blush to see me disguised as a boy."
    lorenzo "Come down. You'll be my torchbearer."
    jessica "Hold a candle to my shame? It's too light. Love's discovery blinds. I should stay hidden."
    lorenzo "You're hidden, even as a boy. Let's go. They're waiting at Bassanio's feast."

    # LEVEL 2 part 15
    jessica "I'll secure the doors and get more money. I'll join you soon."
    gratiano "She's too gentle to be a Jew."

    # LEVEL 2 part 16
    lorenzo "I love her wholeheartedly. She's wise, beautiful, and loyal."
    jessica "I'm here. Let's go! They're waiting at the masquerade."
    hide masquerade_lorenzo
    hide masquerade_jessica
    with dissolve

    stop music
    #play music "audio/puzzling_tune.opus"

    antonio "Who's there?"
    show antonio at Position(xpos=0.7,xanchor=0.7,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100

    gratiano "Antonio?"

    show masquerade_gratiano at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    # LEVEL 2 part 17
    antonio "Gratiano, where's everyone? No masquerade. Bassanio boards soon. I sent twenty to find you."
    gratiano "Good! I want to set sail tonight."

    stop music

    hide antonio 
    hide masquerade_gratiano
    with dissolve

    "THE END OF LEVEL 2"

    jump level3
