
# THIS FILE IS FOR THE CONTROL LOGIC OF THE JIGSAW PUZZLE GAME

label jigsaw_game:
    window hide
    scene bg pure_black
    python:
            k = Puzzle()
            k.set_sensitive(False)
            k.show()

    while True:

            python:
            
                ui.textbutton("Give Up", ui.jumps("giveup"), xalign=.98, yalign=.02)
                k.set_sensitive(True)
                event = k.interact()

                if event:
                    renpy.checkpoint()
                
                k.set_sensitive(False)
            # e "[event]"
            if event == "win":
                jump jigsaw_complete


label giveup:

    $ k.set_sensitive(False)
    
    return
