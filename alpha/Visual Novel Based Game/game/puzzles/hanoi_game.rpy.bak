image pole = "pole.png"

define texture1 = "texture1.png"
define texture2 = "texture2.png"
define texture3 = "texture3.png"
define texture4 = "texture4.png"

screen hanoi_game_screen(towers):
    textbutton "Show No of Moves Required" action Show("moves_count_scr") align (0.95, 0.05)
    
    vbox:
        align (0.05, 0.05)
        #textbutton "autosolve" action [ToggleVariable("autosolve", False, True), SetVariable("create_movements_list", True), Return("start_autosolving")]
        textbutton "give up" action Jump("give_up")
    
    text "Moves made: [player_moves]" size 35 align (0.5, 0.05)
    
    for i, each_tower in enumerate(towers):
        
        ####
        # pole and mark
        vbox:
            pos each_tower["tower_pos"] anchor(0.5, 1.0)
            xalign 0.5
            
            if each_tower["mark"] == "start":
                text "Start" size 25 xalign 0.5
                null height (block_size*1)
                
            elif each_tower["mark"] == "finish":
                text "Goal" size 25 xalign 0.5
                null height (block_size*1)
                
            else:
                text "" size 25 xalign 0.5
                null height (block_size*1)
                
            add "pole"
            
        ####
        # blocks
        vbox:
            pos each_tower["tower_pos"] anchor(0.5, 1.0)
            xalign 0.5 yoffset -20
            
            for each_block in each_tower["blocks"]:
                frame:
                    xpadding 0 ypadding 0
                    xmargin 0 ymargin 0
                    background Frame(each_block["color"], 10, 10) # color
                    xminimum (block_size*(each_block["size"]+2)) xmaximum (block_size*(each_block["size"]+2)) # the width of block
                    yminimum block_size ymaximum block_size
                    xalign 0.5
                        
        ####
        # buttons to operate the game
        if can_click:
            ####
            # if player haven't decided yet what block to move
            # and there is some blocks on the pole
            if start_from_tower < 0 and len(each_tower["blocks"])>0:
                button:
                    xminimum 125 xmaximum 125
                    pos each_tower["tower_pos"] anchor(0.5, 0.0) yoffset 10
                    text "↑" size 35 xalign 0.5
                    action SetVariable("start_from_tower", i)
            
            ####
            # if player decided to move block from this pole
            elif start_from_tower == i:
                button:
                    xminimum 125 xmaximum 125
                    pos each_tower["tower_pos"] anchor(0.5, 0.0) yoffset 10
                    text "undo" size 35 xalign 0.5
                    action SetVariable("start_from_tower", -1)
            
            ####
            # if block that player decided to move is smaller
            # than top block on this pole
            elif (start_from_tower >= 0) and (towers[i]["blocks"] == [] or towers[start_from_tower]["blocks"][0]["size"]<towers[i]["blocks"][0]["size"]):
                button:
                    xminimum 125 xmaximum 125
                    pos each_tower["tower_pos"] anchor(0.5, 0.0) yoffset 10
                    text "[i] ↓" size 35 xalign 0.5
                    action [SetVariable("finish_to_tower", i), Return("move_done")]
            
            ####
            # if block can't be moved on this pole
            else:
                button:
                    xminimum 125 xmaximum 125
                    pos each_tower["tower_pos"] anchor(0.5, 0.0) yoffset 10
                    text " " size 35 xalign 0.5
                    action [[]]
        
        ####
        # if interactions disabled
        else:
            button:
                xminimum 125 xmaximum 125
                pos each_tower["tower_pos"] anchor(0.5, 0.0) yoffset 10
                text " " size 35 xalign 0.5
                action [[]]
            

screen moves_count_scr():
    modal True
    
    default i = 0
    $ n = hanoi_moves_count(i)
    
    frame:
        align (0.5,0.5)
        vbox:
            text"Minimal number of moves to solve [i] blocks tower:"
            text "[n]" size 35 xalign 0.5
            null height 20
            hbox:
                xalign 0.5
                textbutton "<" action SetScreenVariable("i", max(0, i-1))
                null width 20
                textbutton ">" action SetScreenVariable("i", i+1)
            null height 20
            textbutton "close" action Hide("moves_count_scr") xalign 0.5
        

init python:
    def check_game_state():
        '''
        This function checks if all the blocks are in one
        tower at the finish pole and return True or False.
        '''
                
        global towers, finish_tower, blocks_number
        if len(towers[finish_tower]["blocks"]) == blocks_number:
            return True
        return False


    def hanoi_moves_count(x):
        '''
        This function counts the number of moves one must proceed
        to move the whole tower from start pole to finish one.
        x - number of blocks in tower
        '''
        
        if x == 1:
            return 1
        elif x > 1:
            return 1 + hanoi_moves_count(x-1) * 2
        else:
            return 0
            
        
    
    def make_path_2(t, x, f):
        '''
        Use this function to get result of "hanoi_func_2"
        t - towers description that should be a list
            of 3 lists which  contents the blocks numbers
        x - number of the biggest block
        f - number of the pole where tower should be moved to
        
        This function will work even if some blocks was already moved
        from start tower to another pole.
        Note that this function will work correct only if blocks
        in each tower placed correct (the small one over the large, like
        [ [3], [1, 2, 4], [] ]), in case you will try to randomly
        generate the game state.
        '''
        
        ####
        # the general list of moves
        global res_2
        res_2 = []
        
        return hanoi_func_2(t, x, f)
        
        


    def hanoi_func_2(t, x, f):
        '''
        t - towers description that should be a list
            of 3 lists which  contents the blocks numbers
        x - number of the biggest block
        f - number of the pole where tower should be moved to
        
        The function returns the list of tuples that are
        (start_pole, finish_pole) that describes moves that
        should be made from last to first to win the game.
        
        So when function will return that list, one should pop
        tuples out of it one after another and move blocks
        from "start_pole" position to "finish_pole" position.
        '''
        
        global res_2
        
        ####
        # s - is the pole where the biggest block is located
        if x in t[0]:
            s = 0
        elif x in t[1]:
            s = 1
        else:
            s = 2
            
        ####
        # if the biggest block is already on finish pole
        # and this block's number is 1
        # then we got nothing else to do
        if (s == f) and (x == 1):
            pass
        
        ####
        # if the biggest block is already on finish pole
        # and this block's number is not 1
        # then we should move the tower of (x-1) blocks upon it
        elif (s == f) and (x != 1):
            hanoi_func_2(t, x-1, f)
            
        ####
        # if the biggest block is not in finish pole
        # and this block's number is 1
        # then move it to finish pole
        elif (s != f) and (x == 1):
            res_2.append((s, f))
            
        ####
        # otherwise we need to create a list of moves
        # [to move (x-1) tower from free pole to finish one,
        #  to move x-block to the finish pole,
        #  to set (x-1) tower on the free pole from blocks on different poles]
        # then we should make the moves from this list
        # from last one to first.
        #
        # So to move (x-1) tower to finish pole
        # we should use make_path_1 function,
        # and to set all the blocks to (x-1) tower on the free pole
        # we should use make_path_2 function
        else:
            ####
            # ss is the free pole that neither start nor finish one
            # for current tower
            ss = [0,1,2]
            ss.remove(s)
            ss.remove(f)
            ss = ss[0]
            make_path_1(x-1, ss, f)
            res_2.append((s, f))
            ####
            # ff is the free pole that neither start nor finish one
            # for current tower
            ff = [0,1,2]
            ff.remove(s)
            ff.remove(f)
            ff = ff[0]
            hanoi_func_2(t, x-1, ff)
        return res_2
    
    
    def make_path_1(x, s, f):
        '''
        Use this function to get result of "hanoi_func_1"
        x - number of blocks in tower
        s - number of pole where tower is located
        f - number of pole where tower should be moved to
        
        This function is used when all the blocks are in one tower.
        '''
        
        global res_1, res_2
        res_1 = []
        hanoi_func_1(x, s, f)
        
        ####
        # adds all the moves to the general list of moves
        #
        for i in res_1:
            res_2.append(i)

        
    def hanoi_func_1(x, s, f):
        '''
        x - number of blocks in tower
        s - number of pole where tower is located
        f - number of pole where tower should be moved to
        
        The function returns the list of tuples that are
        (start_pole, finish_pole) that describes moves that
        should be made from last to first to win the game.
        
        So when function will return that list, one should pop
        tuples out of it one after another and move blocks
        from "start_pole" position to "finish_pole" position.
        
        In general, to move n-block tower from start pole to finish pole,
        one must move (n-1)-block tower to the pole
        that is neither start nor finish one,
        then move the n-block to the finish pole
        and move (n-1)-block tower to the finish pole
        '''
        
        global res_1
        if x == 1:
            res_1.append((s, f))
        else:
            ####
            # ff is the free pole that neither start nor finish one
            # for current tower
            ff = [0,1,2]
            ff.remove(s)
            ff.remove(f)
            ff = ff[0]
            hanoi_func_1(x-1, ff, f)
            res_1.append((s, f))
            hanoi_func_1(x-1, s, ff)
        return res_1

label hanoi_game(blocks_number): # sets the default number of blocks
    
    ####
    # a list of colors for maximum number of blocks
    # this can be colors or images,
    # if you need all the blocks to be the same color
    # just add this color to the list several times
    $ block_colors = ["#c00", "#0c0", "#00c", "#cc0", "#c0c", "#0cc", "#930", "#ccc"]

    $ block_colors = [texture1, texture2, texture3, texture4, texture1, texture2, texture3, texture4]
    
    ####
    # number of blocks in tower shouldn't be greater
    # then the number of colors in block_colors list
    if blocks_number > len(block_colors):
        $ blocks_number = len(block_colors)
        
    ####
    # creates the blocks description
    $ blocks_set = []
    python:
        for b in range(1, blocks_number+1):
            blocks_set.append({"size": b, "color":block_colors[b-1]} )
    
    ####
    # randomly sets the start and finish poles
    $ a = [0,1,2]
    $ start_tower = renpy.random.choice(a)
    $ a.remove(start_tower)
    $ finish_tower = renpy.random.choice(a)
    
    ####
    # the height of the block in pixels
    $ block_size = 20
    
    ####
    # the positions for all 3 towers
    $ towers_pos = [(0.25, 0.65), (0.5, 0.65), (0.75, 0.65)]
    
    ####
    # main game variable - description of towers
    $ towers = [ {"tower_pos":towers_pos[0],"blocks":[], "mark":None},
        {"tower_pos":towers_pos[1],"blocks":[], "mark":None},
        {"tower_pos":towers_pos[2],"blocks":[], "mark":None}
        ]
    
    ####
    # put the blocks, start and finish marks on their places
    $ towers[start_tower]["blocks"] = blocks_set
    $ towers[start_tower]["mark"] = "start"
    $ towers[finish_tower]["mark"] = "finish"
    
    ####
    # flags that are used for autosolve function
    $ autosolve = False
    $ create_movements_list = False
    
    ####
    # game variables
    $ delay_time = 0.2
    $ player_moves = 0
    $ minimal_moves = hanoi_moves_count(blocks_number)
    
    ####
    # let's show the game screen
    show screen hanoi_game_screen(towers=towers)
    
    
    ####
    # main game loop
    label hanoi_loop:
        
        ####
        # default values that shows that player haven't decided yet
        # what move to do
        $ start_from_tower = -1
        $ finish_to_tower = -1
        
        ####
        # wait for user interact
        if not autosolve:
            $ can_click = True
            $ ui.interact()
        
        ####
        # to prevent farther interactions
        $ can_click = False
        
        ####
        # autosolve function
        if autosolve:
            
            ####
            # create list of moves
            if create_movements_list:
                ####
                # we need to make this list only once
                $ create_movements_list = False
                
                ####
                # make_path_2 function needs "t" - that is list of 3 list
                # that contains only blocks numbers
                # so create it from main game variable "towers"
                $ t = []
                python:
                    for i in towers:
                        tt = []
                        for j in i["blocks"]:
                            tt.append(j["size"])
                            
                        t.append(tt)
                
                ####
                # and now, let's make the list of moves
                $ movements_list = make_path_2(t, blocks_number, finish_tower)
                
            ####
            # move to make (the last one in movements_list)
            $ start_from_tower, finish_to_tower = movements_list.pop()
            
        
        ####
        # move the block
        $ block_to_move = towers[start_from_tower]["blocks"][0]
        
        $ towers[start_from_tower]["blocks"] = towers[start_from_tower]["blocks"][1:]
        $ towers[finish_to_tower]["blocks"].insert(0, block_to_move)
        
        ####
        # add one "move" to counter
        $ player_moves += 1
        
        ####
        # check the game state
        if check_game_state():
            jump win
            
        ####
        # make pause between moves if autosolve is enable
        if autosolve:
            $ renpy.pause(delay_time)
            
        ####
        # next move
        jump hanoi_loop
        
        
label win:
    ####
    # to prevent farther interactions
    $ can_click = False
    
    if player_moves > minimal_moves:
        "You Lost\nYou took [player_moves] moves.You needed 15 moves"
        hide screen hanoi_game_screen
        jump failed_hanoi
    else:
        "Perfect Win!\nYou took [player_moves] moves."
        hide screen hanoi_game_screen
        scene bg shylock_house_outside
        show antonio_invert at Position(xpos=0.4,xanchor=0.4,ypos=0.1,yanchor=0.1) 
        show bassanio at Position(xpos=0.2,xanchor=0.2,ypos=0.1,yanchor=0.1) 
        show shylock_guard at Position(xpos=0.9,xanchor=0.9,ypos=0.9,yanchor=0.9)
        shylock_guard "Impressive, you got it right."
        shylock_guard "Hmph, I suppose you have proven yourselves to some extent. Very well, you may enter. 
        But remember, the real challenges lie ahead."
        jump see_shylock
    return
    
label give_up:
    ####
    # to prevent farther interactions
    $ can_click = False
    
    ####
    # to stop autosolve
    $ autosolve = False
    
    "You gave up..."
    
    hide screen hanoi_game_screen
    
    jump failed_hanoi
    
# The game starts here.
label start_hanoi:
    "The guard reveals 3 pegs and 5 disks"
    shylock_guard "This is a Tower of Hanoi game.The goal is to move all the disks from one peg to another while following the rules of the puzzle. 
    If you can solve it in the minimum number of moves, I will grant you access to see Shylock"

    scene black
    "..."
    call hanoi_game(blocks_number=5) # pass the desirable number of blocks

    return

    