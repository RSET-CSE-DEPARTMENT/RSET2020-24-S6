image bassanio_large:
    "bassanio.png"
    zoom 1.3

image portia1:
    "portia.png"
    zoom 1.3

image portia_inverted1:
    "portia_inverted.png"
    zoom 1.3

label level3:
    stop music
    scene bg pure_black
    "The scene shifts to Belmont,where the heiress Portia and her waiting woman and friend
    Nerissa discuss the intriguing 'lottery' that Portia's father devised
    before his death."

    "Portia is a wealthy heiress from Belmont. Portia’s beauty is matched only by her intelligence. Bound by a clause in her father’s will that forces her to marry whichever suitor chooses correctly in a contest."

    "Nerissa is Portia’s lady-in-waiting, friend and confidante."

    scene bg portia_house_belmont_day

    show nerissa at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100
    nerissa "Portia,your father has set up a lottery where your suitors will have to
    choose between chests of gold, silver, and lead, and whoever chooses
    the right one will win you as a wife."
    
    nerissa "I am sure whoever chooses correctly will be a man who will love you well. But what are your
    feelings toward the princely suitors who have already paid you visits?"

    show portia1 at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    portia "The prince of naples talkes about his horses all the time and I'm
    worried his mother had an affair with a blacksmith."
    portia "Then there is Count Palatine, he does nothing but frown."
    portia "I'd rather be married to a skull with a bone in its mouth than to either of these men!"
    nerissa "Do you remember, lady, from your father's time in Venice, a scholar
    and soldier who came here along with the Marquess of Montferrat?"
    portia "Yes, yes, it was Bassanio — I think that was his name."
    nerissa "That's right, madam. Of any man my foolish eyes have ever seen, he
    was the one most deserving of a beautiful lady."
    hide portia1
    hide nerissa
    scene bg portia_house_belmont_day
    "Portia and Nerissa are interrupted by the sound of trumpets "
    "The contest for the hand of Portia in marriage has started, and prospective suitors have started arriving."
    "The Prince of Morocco, a dark-skinned African dressed in white, and
    three or four followers enter portia's house to take part in the lottery"

    show moroccan_prince at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    moroccan_prince "My lady,I have come all the way from morocco to take part in the trial"
    moroccan_prince "I beseech you not to judge me based on my skin's shadowy
    hue, a result of the African sun. Brave men have been intimidated by it,
    but esteemed beauties of my land love me. I treasure my dark skin,
    except for desiring your kind opinion of me."

    show portia_inverted1 at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100

    portia "When it comes to selecting a husband, I value qualities beyond mere
    appearance."
    portia "Moreover, my fate is determined by a lottery, depriving
    me of the ability to choose for myself."
    portia "However, if my father hadn't denied me that right, you, esteemed Prince, would be considered as
    worthy a husband in my eyes as anyone else."

    moroccan_prince "Dear Portia, your words are a testament to your wisdom and beauty that transcends mere appearances. 
    I am deeply honored by your kind sentiments."

    moroccan_prince"It is true that the lottery places both of us in a position where our fates are determined by chance rather than choice. 
    However, your recognition of my worth as a potential husband fills my heart with joy and admiration."

    moroccan_prince "Now, may I request your assistance in leading me to the caskets, as I wish to test
    my luck. With this sword, I have achieved victories over Persia's leader
    and a prince, as well as conquered Sultan Solyman in three battles."

    
    moroccan_prince"Yet, there remains a fear that blind luck could allow a less deserving
    man to win your hand, causing me immense grief."

    portia "You must try your luck. Either don't attempt it at all, or promise before
    you choose a casket that if you choose the wrong one you will never
    speak to a lady about marriage again. Be warned."

    moroccan_prince "I promise. Come on, bring me to the caskets."

    hide moroccan_prince
    hide portia_inverted1

    "Trumpets play. The Prince of Arragon and his attendants enter interrupting Portia and the Moroccan prince"

    show portia_inverted1 at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100

    portia "Ah, the Prince of Arragon has arrived. Welcome to my house, noble prince. You have come to participate in the lottery, I presume?"

    show arragon_prince at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    arragon_prince "Indeed, fair Portia. I have graced this occasion with my presence, fully confident in my ability to choose wisely."

    hide portia_inverted1

    show moroccan_prince_inverted at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100

    moroccan_prince "Greetings, Prince of Arragon. It seems we have another contender for the prize. May the best man win."

    arragon_prince "The best man? That title belongs to me, Moroccan prince. I assure you, I have already bested many in my endeavors."

    hide moroccan_prince_inverted

    hide arragon_prince

    "As the Moroccan prince and the Prince of Arragon are engaged in conversation, 
    they are interrupted by the sudden arrival of Bassanio at Portia's house to participate in her father's lottery."


    show portia_inverted1 at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100

    portia "Gentlemen, it seems we have another guest. Bassanio, welcome! Are you here to partake in the lottery as well?"

    show bassanio_large at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100
    
    bassanio "Indeed, fair Portia. I have come to take my chance, hoping to win not only your hand 
    but also the honor and privilege of being your husband."
    
    hide portia_inverted1

    show moroccan_prince_inverted at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100

    moroccan_prince "Ah, another competitor joins the fray. Bassanio, may I extend my greetings and wish you luck in your endeavor."

    hide moroccan_prince_inverted
    
    show arragon_prince_inverted at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100

    arragon_prince "Bassanio, is it? I trust you are aware of the caliber of competition present here. Your chances of success appear quite slim."

    bassanio "Thank you for your kind words, Prince of Arragon. I am fully aware of the challenges that lie ahead, but I am here with confidence and determination"

    hide arragon_prince_inverted

    hide bassanio_large

    show portia_inverted1 at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100

    portia  "Gentlemen, to ensure fairness and transparency, I invite all three of you to accompany me to 
    the temple where the caskets are kept. It is there that you shall make your choices."

    show moroccan_prince at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    moroccan_prince "An excellent suggestion, Portia. Let us proceed to the temple and put an end to this suspense."

    hide moroccan_prince

    show arragon_prince at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    arragon_prince "Very well, Portia. I am eager to see the caskets and make my choice. Lead the way."

    hide arragon_prince

    show bassanio_large at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
            yoffset 100

    bassanio "I am ready to accompany you to the temple, Portia. May the truth be revealed and fate guide us in our decisions."


    scene bg pure_black

    "Portia accompanies the Moroccan prince,the prince of Arragon and Bassanio to the temple where the caskets are located."

    scene bg caskets

    "The servant opens a curtain revealing three caskets: a gold one, a silver
    one, and a lead one"

    portia "Now choose one of the caskets."

    portia "To determine the correct casket, consider their inscriptions: The
    golden one offers what many desire, the silver one grants what is
    deserved, and the lead one demands sacrifice and risk. Trust your
    judgment and intuition to uncover the right choice."

    portia "One of them has my picture inside, Prince. If you choose that one then
    I am yours"

    show moroccan_prince at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    moroccan_prince "This inscription speaks to me. It shall guide my choice."

    hide moroccan_prince

    show arragon_prince at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    arragon_prince "I have studied the inscriptions thoroughly. I am confident in my selection."

    hide arragon_prince

    "The prince of Arragon and the Moroccan prince have both made their choices."

    show bassanio_large at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    bassanio "The moment of truth has arrived. I trust my heart's instincts to lead me to the right casket."

    "Now choose one among the caskets as Bassanio"

    hide bassanio_large
    
    call screen caskets

label gold_bassanio:
    "Bassanio chooses the Golden casket"

    show bassanio_large at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    bassanio "Portia's beauty and grace shine like a golden sun, and my heart tells me to follow this path. I must trust my instincts and believe that true love lies within this golden casket."

    "Bassanio opens the golden casket to find a jigsaw puzzle"

    show portia_inverted1 at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100

    portia "Bassanio you have chosen the Golden casket"
    portia "Now you must prove your worthiness by solving this jigsaw puzzle"

    jump jigsaw_game
    return

label silver_bassanio:
    "Bassanio chooses the Silver casket"

    show bassanio_large at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    bassanio "The silver casket, a symbol of dignity and grace. Surely, within this choice lies the reward that matches my worth. 
    Let us unveil the truth that awaits me."

    "Bassanio opens the silver casket to find a jigsaw puzzle"

    show portia_inverted1 at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100

    portia "Bassanio you have chosen the Silver casket"
    portia "Now you must prove your worthiness by solving this jigsaw puzzle"

    jump jigsaw_game

    return

label lead_bassanio:
    "Bassanio chooses the Lead casket"

    show bassanio_large at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100

    bassanio "The humble lead casket, often overlooked in favor of its more opulent counterparts. 
    Yet, there is an allure to its unassuming presence, as if it holds a hidden treasure of its own. Let me unlock its secrets."

    "Bassanio opens the lead casket to find a portrait of portia"

    show portia_inverted1 at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100

    portia "Bassanio,you have proven your worthiness by choosing the right casket"
    
    portia "I aspire to surpass myself for you. Twentyfold worth, a
    thousandfold beauty, ten thousandfold riches. Seeking virtue, wealth,
    and friends for your admiration. Inexperienced but willing to learn. My
    devoted spirit is yours. My possessions, mansion, servants, and ring,
    all yours. Preserve our love with the ring."
    hide portia_inverted1
    "Bassanio successfully completes the lottery and proceeds to marry Portia"
    "END OF LEVEL 3"
    jump level4

    return

label jigsaw_complete:
    scene bg caskets
    "The jigsaw puzzle turned out to be a portrait of Portia"
    show portia_inverted1 at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100
    portia "Bassanio,you have proven your worthiness"
    portia "I aspire to surpass myself for you. Twentyfold worth, a
    thousandfold beauty, ten thousandfold riches. Seeking virtue, wealth,
    and friends for your admiration. Inexperienced but willing to learn. My
    devoted spirit is yours. My possessions, mansion, servants, and ring,
    all yours. Preserve our love with the ring."
    hide portia_inverted1
    "Bassanio successfully completes the jigsaw puzzle and proceeds to win the hand of Portia in marriage."
    "END OF LEVEL 3"
    jump level4


    
