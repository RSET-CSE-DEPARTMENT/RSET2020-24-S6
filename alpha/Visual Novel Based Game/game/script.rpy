
# THIS FILE CONTAINS THE CONFIG, DEFINITIONS, DECLARATIONS OF GLOBALLY USED ENTITIES AND THEIR DEFAULT STYLING

define antonio = Character(_("Antonio"), color="#c8c8ff")
define bassanio = Character(_("Bassanio"), color="#c8ffc8")

define shylock = Character(_("Shylock"), color="#c8c8ff")
define shylock_guard = Character(_("Guard"), color="#2500ca")

define valentino = Character(_("Valentino"), color="#cb150f")

define nerissa = Character(_("Nerissa"), color="#8646ac")
define portia = Character(_("Portia"), color="#a3297b")

define moroccan_prince= Character(_("Prince of Morocco"), color="#b16610a4")

define arragon_prince= Character(_("Prince of Arragon"), color="#1612e9a4")

image portia:
    "portia.png"
    zoom 0.5

image portia_inverted:
    "portia_inverted.png"
    zoom 0.5

label start:
    $ _skipping=False
    $wallet= 2000
    scene bg streets_of_venice
    menu:
        "Level 1":
            scene bg level1
            "Level 1"
            jump level1
        "Level 2":
            scene bg level2
            "Level 2"
            jump level2
        "Level 3":
            scene bg level3
            "Level 3"
            jump level3
        "Level 4":
            scene bg level4
            "Level 4"
            jump level4
        "Level 5":
            scene bg level5
            "Level 5"
            jump level5
    
    return

