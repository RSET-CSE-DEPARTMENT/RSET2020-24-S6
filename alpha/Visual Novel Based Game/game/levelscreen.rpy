
# THIS FILE IS FOR THE LEVELS GUI CONTROL LOGIC AND CASKET SELECTION LOGIC

screen levels():
    tag menu

    use game_menu(_("Levels"), scroll="viewport"):
        style_prefix "levels"

screen caskets():

    add "bg caskets.png"
    imagebutton:
        xpos 402
        ypos 140
        idle "idle.png"
        hover "bg caskets_gold_singular.png"

        action Jump("gold_bassanio")

    imagebutton:
        xpos 0
        ypos 110
        idle "idle.png"
        hover "bg caskets_silver_singular.png"

        action Jump("silver_bassanio")

    imagebutton:
        xpos 880
        ypos 153
        idle "idle.png"
        hover "bg caskets_lead_singular.png"

        action Jump("lead_bassanio")


    

    

