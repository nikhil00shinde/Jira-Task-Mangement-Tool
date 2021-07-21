### Psuedo-selector
* construct -> css element state 
* A pseudo-class is used to define a special state of an element.
* For example, it can be used to:
    * Style an element when a user mouses over it
    * Style visited and unvisited links differently
    * Style an element when it gets focus
* *selector:pseudo-class {property: value;}*
* ex: *.filter:hover{background-color:gray}*

### There is another way of flex it that we can arrange the children of flex in center,by using *justify-content* and *align-item*
* By default, flex direction is horizontal so justify-content move along direction of flex and align-item move in direction of opposite of flex that is vertical.
* We can change the direction of flex
* Flex hone se element block ho jata hain
* *border-radius: 10px;*  with this property we can define the curvy nature of border.
* *border-collapse:;* border ko merge krdo (parent ko bhi bolna padtha hain)
* *border-right: none;* 


## To force to overide the font-size value:
* ***font-size:3rem!important;***
* for reponsiveness we mostly use rem,vh rather than px.

## Position
* It give position to a element WRT body
    * It has 4 property: top,bottom,left,right
    * We have used position *fixed* that mean it has nothing to with other element. It live in his world.
    * left:50%; -> it will toward the right the left edge will on center
    * but we want the ticket to on center, we specify that move your width 50% backward to get ticket in center *tranform:translate(-50%);*