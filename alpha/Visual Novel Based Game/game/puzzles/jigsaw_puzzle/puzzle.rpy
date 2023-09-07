
# THIS FILE IS FOR THE RANDOMIZATION, CONTROL LOGIC OF THE JIGSAW PUZZLE GAME

init python:

    class Puzzle(object):

        
        def __init__(self):

            # Constants that let us easily change where the game is
            # located.
            LEFT=100
            TOP=100
            COL_SPACING = 200
            ROW_SPACING = 200
            self.COL_NUM = 4
            self.ROW_NUM = 3
            
            # Create the table, stock, and waste.
            self.table = t = Table(base="card/base.png", back="card/base.png")
            
            rotate_random = [0,0,0,90,180,270]
            deck = []
            # Create the stock and shuffle it.
            for i in range(0, self.COL_NUM):
                for j in range(0, self.ROW_NUM):
                    value = (i, j)
                    t.card(value, "card/room-%d-%d.jpg" % (i,j))
                    t.set_faceup(value, True)
                    t.set_rotate(value, renpy.random.choice(rotate_random))
                    deck.append(value)
            renpy.random.shuffle(deck)        

            # The 12 card spots.
            self.foundations = [ ]
            for i in range(0, self.COL_NUM):
                for j in range(0, self.ROW_NUM):
                    s = t.stack(LEFT + COL_SPACING * i, TOP + ROW_SPACING * j, xoff=0, yoff=0, drag=DRAG_TOP, drop=True, click=True)
                    self.foundations.append(s)
                    s.append(deck.pop())
     
        def show(self):
            self.table.show()

        def hide(self):
            self.table.hide()

                    
        def foundation_drag(self, evt):

            # We can only drag one card at a time to a foundation.
            if len(evt.drag_cards) != 1:
                return False

            orig_s = evt.stack
            target_s = evt.drop_stack
            
            # Get the "top" card
            orig_c = evt.drag_cards[0]
            target_c = evt.drop_stack[-1]
            
            # swtich places
            target_s.append(orig_c)
            orig_s.append(target_c)
            
            return "foundation_drag"
                
        def card_click(self, evt):
            orig_s = evt.stack
            
            # If they clicked on a stack, then rotate the "top" card
            # (There should only be one card)
            if orig_s:
                orig_c = orig_s[-1]
                self.table.set_rotate(orig_c, self.table.get_rotate(orig_c) + 90)
            return "card_click %d" % self.table.get_rotate(orig_c)
            


                    
        def interact(self):

            evt = ui.interact()
            rv = False
            
            # Check the various events, and dispatch them to the methods
            # that handle them.
            if evt.type == "drag":
                if evt.drop_stack in self.foundations:
                    rv = self.foundation_drag(evt)
                    
            elif evt.type == "click":
                rv = self.card_click(evt)
                    
            # Check to see that the correct peice is in the correct spot
            # if I had of been clever, I would have made the foundations
            # a two dimentional array
            
            for i in range(0, self.COL_NUM):
                for j in range(0, self.ROW_NUM):
                    f = self.foundations[j + (i*self.ROW_NUM)]
                    ii, jj =  f[0] # the value of the card 
                    # is it upright?
                    if (self.table.get_rotate(f[0]) % 360 != 0):
                        return rv
                    # is it in the right place?
                    if ii != i or jj != j:
                        return rv

            # if it makes it to here all the peices were upright and in the correct place
            return "win"

        # Sets things as sensitive (or not).
        def set_sensitive(self, value):
            self.table.set_sensitive(value)
        


                     
                    
