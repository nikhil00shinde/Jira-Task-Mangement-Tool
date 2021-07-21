# In the second part we have filter and action button

* In this we learn about inline,block,inline-block and flex
   * *block element* -> element which can have a heigth and width. And irrespective of their width occupy complete horizontal space
   * *inline elemnent* -> cannot specify height & width (voh apne aap decide karta hain height and width) & horizontal space nhi leta hain
   * *inline-block element* -> We can specify height and width & it does not take horizontal space
   * **syntax:** -> display: inline-block;

* We can take height and width in percentage(%) of element with respect to(wrt) their parent.
* But *margin* does not take margin wrt their parent. So we have to perform calculation in *calc()* function.(calc() function have spacing issue)
   * exple: margin-top: calc( ( 25 / 100 ) * 15vh ;

### Flex-box
* CSS property *1 direction* element ko layout karne mei help karta  hain
* we apply this property on parent.
* When inline-block element children want to arrange in horizontal without any space.
* So we use flex box(it act as block) after arranging the element. 
