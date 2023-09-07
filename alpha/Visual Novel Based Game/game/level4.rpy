
define salerio= Character(_("Salerio"), color="#72f506")
define solanio= Character(_("Solanio"), color="#0fcb4a")
define tubal= Character(_("Tubal"), color="#f60101")
define man= Character(_("Man"), color="#8a4501")

define lorenzo= Character(_("Lorenzo"), color="#8f00f5")
define jessica= Character(_("Jessica"), color="#d60093")
define balthazar= Character(_("Balthazar"), color="#00b6d6")

image balthazar_inverted:
    "balthazar_inverted.png"
    zoom 0.8

image solanio_right:
    "solanio_right.png"
    zoom 1.3

image solanio_left:
    "solanio_left.png"
    zoom 1.3

image solanio:
    "solanio.png"
    zoom 1.2

image salerio:
    "salerio.png"
    zoom 1.2
image man:
    "man.png"
    zoom 0.8
image lorenzo_left:
    "lorenzo_left.png"
    zoom 1.3

image jessica_large:
    "jessica.png"
    zoom 1.4

label level4:
    scene bg pure_black
    "3 months pass"
    "Things remain calm for a while"
    "The scene shifts to the Venice Market where Antonio's friends Salerio and Solanio are engaging in a discussion"
    scene bg streets_of_venice
    show salerio at Position(xpos=0.9,xanchor=0.9,ypos=0.4,yanchor=0.4) with moveinright:
        yoffset 100
    show solanio_right at Position(xpos=0.1,xanchor=0.1,ypos=0.4,yanchor=0.4) with moveinleft:
        yoffset 100
    solanio "What's the latest news from the Rialto?"

    salerio "Well, there's a rumor going around that Antonio lost a ship with valuable cargo on the dangerous sandbar called The Goodwins in the English Channel. If the gossip is true, it's a significant loss."
    
    "Would you like to continue the conversation"
    menu:
        "Yes":
            solanio" I hope that gossip is just as untrue as a woman pretending to cry over her third husbands death. But if it is true, I wish I had a fitting title to honor antonio's name."

            salerio "Get to the point, please."

            solanio"Ah, what are you trying to say?  antonio has indeed lost a ship"
        "No":
            pass

    salerio "I hope this is the end of his losses."

    solanio "Let me say Amen before the devil interrupts my prayer, as here comes Shylock,"

    "Shylock enters"

    show shylock at center with fade
    with dissolve

    solanio "How are you, Shylock? What's the news among the merchants?"

    shylock" I am sad. " 

    "do you want to hear what is the reason"
    menu:
        "yes":
            shylock "You knew—no one knew better than you—that my daughter ran away."

            salerio "That's for sure. I even knew the tailor who made the wings she used to escape."

            solanio "And Shylock himself knew that his daughter had wings and was likely to leave."

            shylock "She is damned for it."

            solanio" That's for sure, if you, the devil, are her judge."
        "No":
            pass
    shylock "My own flesh and blood rebelling against me!"

    solanio" Unbelievable! Your own flesh rebels even at your age?"

    shylock "I mean my daughter is my own flesh and blood."

    salerio "There's a stark difference between my flesh and my daughter's. antonio did suffer losses at sea."

    shylock" antonio, the bankrupt and spendthrift who can barely show his face on the Rialto, used to call me a usurer. Well, let him fulfill his obligations. He used to lend money as a Christian gesture; well, let him fulfill his obligations."


    salerio "Well, I'm sure that if he doesn't pay you back you won't actually take his flesh. What would that be good for?"

    shylock "This is time seeks revenge for the  insults, losses, and discrimination that i have faced. "
    hide salerio
    hide solanio_right
    hide shylock
    "Salerio,Solanio and Shylock are interrupted by a man sent by Antonio to deliver a message to his friends Salerio and Solanio"
    show man at Position(xpos=0.1,xanchor=0.1,ypos=0.4,yanchor=0.4) with moveinleft:
        yoffset 100
    man "Gentlemen, my master antonio is at his house and would like to speak with both of you."


    show salerio at Position(xpos=0.9,xanchor=0.9,ypos=0.4,yanchor=0.4) with moveinright:
        yoffset 100

    salerio "We have been searching everywhere for him."

    hide salerio

    show solanio_left at Position(xpos=0.9,xanchor=0.9,ypos=0.4,yanchor=0.4) with moveinright:
        yoffset 100

    solanio "He was at his house all this time? Come quickly we must meet him"
    
    hide man
    hide solanio_left
    "Solanio, Salerio, and the Man exit."
    

    "Tubal enters."
    show tubal at Position(xpos=0.1,xanchor=0.1,ypos=0.2,yanchor=0.2) with moveinleft:
        yoffset 200

    show shylock at Position(xpos=0.9,xanchor=0.9,ypos=0.4,yanchor=0.4) with moveinright:
                yoffset 100
    shylock "How are things, tubal? What news do you have from Genoa? Have you found my daughter?"
    "do you want to know about more about shylock daughter "
    menu:
        "Yes":
            tubal "I've been to many places where I heard about her, but I couldn't find her."

            tubal "Your daughter spent eighty ducats in Genoa in just one night."

            shylock "You're stabbing me with a dagger. I will never see my gold again. Eighty ducats in one go! Eighty ducats!"
        "No":
            
            pass
    tubal "Let's keep that aside"

    tubal "I have some other news to tell you"
    
    shylock "What? What? What do you mean? Bad news, bad news?"

    tubal "Antonio's ship was wrecked coming from Tripoli."

    shylock "Thank God! Thank God! Is it true? Is it true?"

    tubal "I spoke with some of the sailors who survived the wreck."

    shylock "Thank you, tubal. Good news, good news! Ha ha, news heard in Genoa."


    tubal "Some of antonio's creditors who came with me to Venice claim that he will definitely default on his loan."

    shylock "I am very glad to hear that. I'll torment him. I'll torture him. I'm glad."

    tubal "One of them showed me a ring that your daughter gave him in exchange for a monkey."

    shylock "Curse her! You're tormenting me, tubal. That ring was my turquoise. I received it from Leah when I was a bachelor. I wouldn't have given it away even for a whole forest full of monkeys."

    tubal "But antonio is certainly ruined."

    shylock "Yes, that's true, very true. tubal, go and hire an officer for me. Make arrangements with him two weeks in advance. I will have his heart if he fails to pay, because even if he leaves Venice, I will pursue him to the ends of the earth."
    
    scene bg pure_black
    "Shylock registers a complaint with the Venetian Duke against antonio for being unable to pay back his debt"
    "Antonio is soon arrested and imprisoned"
     
    "The scene shifts to a jail where Antonio is imprisoned" 
    "Shylock comes to pay a visit to Antonio"
    scene bg jail

    show shylock at Position(xpos=0.9,xanchor=0.9,ypos=0.4,yanchor=0.4) with moveinright:
        yoffset 100
    shylock "Jailer, keep an eye on him. Don't say anything about mercy. That's the fool that lent out money with no interest. Keep an eye on him, jailer."
    
    show antonio_invert at Position(xpos=0.1,xanchor=0.1,ypos=0.1,yanchor=0.1) with dissolve:
        yoffset 150
    antonio "Just listen to me, good Shylock."

    shylock "I'll have what you owe. Don't argue. I've sworn an oath for it. You called me a dog, so beware my bite. The Duke will grant justice. Jailer, why did you come with him?"

    antonio "I beg you, listen to what I have to say."

    shylock "I'll collect my debt. No more words. I won't be lenient or swayed by Christian pleas. Don't follow me. I won't listen. I will have what you owe."
    hide shylock
    hide antonio_invert

    "Antonio is then later visited by his friend Solanio"
    show solanio_right at Position(xpos=0.1,xanchor=0.1,ypos=0.4,yanchor=0.4) with moveinleft:
        yoffset 150
    solanio "(Referring Shylock) He is the most stubborn beast that ever kept company with men."

    show antonio at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with dissolve:
        yoffset 100
    antonio "Let him be. I won't continue my futile appeals. He seeks my life, and I understand why. I've often assisted those who owed him, only when they begged me at the last moment. That's why he harbors hatred towards me."
    solanio "I am sure the Duke will never allow him to take the pound of flesh."

    antonio "The Duke must uphold the law. If he doesn't, foreign merchants will lose trust in Venice's justice, affecting our profits."
    
    antonio "I've been too anxious to eat, unsure if I have any flesh to spare for my cruel creditor tomorrow. Jailer, let's go. I hope Bassanio witnesses the debt's repayment; that's my sole concern."
    
    "The scene shifts to portia's house"

    scene bg portia_house_belmont_day

    show lorenzo_left at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
            yoffset 150

    lorenzo "Madam, your kindness and support for your husband's friend reflect your noble and genuine goodwill."

    show portia1 at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) with moveinleft:
        yoffset 100
    portia "I have no regrets in doing good. antonio resembles my husband. lorenzo, manage my household. I retreat to a nearby monastery with nerissa until our husbands return."

    lorenzo "Madam, I will obey you with all my heart in your fair commands."
    lorenzo "May you have pleasant thoughts and happy times!"

    hide lorenzo_left
    "Lorenzo exits"
    "Jessica enters"

    show jessica_large at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 120

    jessica "I wish you contentment, my lady."

    portia "Thank you for your wish, and I am pleased to wish you the same. Farewell, jessica."

    "Jessica exits"

    hide jessica_large
    "She gives balthazar a letter"
    portia "Balthazar, I trust your honesty. Take this letter to my cousin, Doctor Bellario, in Padua. Bring back his notes and clothes and swiftly travel to Venice. Avoid unnecessary conversations and make haste. I will reach Venice before you."

    show balthazar_inverted at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 120

    balthazar "Madam, I will go as quickly as I can."
    hide balthazar_inverted
    "Balthazar exits."

    portia "Come on, nerissa, I have a plan you don't know about yet. We'll see our husbands before they even think of us."

    show nerissa at Position(xpos=0.9,xanchor=0.9,ypos=0.1,yanchor=0.1) with moveinright:
        yoffset 100

    nerissa "Will they see us?"

    portia "Nerissa, when we dress as men, I'll be the more handsome one, carrying my dagger bravely."


    nerissa "Are we going to turn to men?"


    portia "What a question! Seeking intimacy with men? Your mind is in the wrong place. But let's go, I'll explain my plan in the carriage at the gate. Hurry, we have twenty miles to cover today."

    # jump shortest_path_portia

    scene bg pure_black
    "Antonio and Bassanio must now visit Shylock through the shortest available path"

    scene venice_map_graph

    "Guide Portia and Nerissa through the forests and countrysides of Rome."
    $path=renpy.input("What is the shortest path in the given graph from A to J ??")
    
    $path=lowercase(path)
    
    if(path=="abdecfghj"):
        pass
    else:
        scene bg game_over
        "Game over"
        return
    
    scene bg pure_black
    "Portia, finding no other way to help her lover and his friend, disguises herself as the lawyer Balthazar and proceeds to go to Court of Justice in Venice."

    "Will she succeed ??"

    "END OF LEVEL 4"
    jump level5

    



    
