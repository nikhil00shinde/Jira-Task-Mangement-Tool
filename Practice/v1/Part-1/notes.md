# In the 1 first hours sir ne bola ki

* Ki hum jira app ke kaise  divide karenge aur banaeya uska frontend
* Ye ek acchi practice nhi ki Hum BODY par css lagaye
* *div tag* -> ek empty container hota
***

### Hum ye dono kyu add karte hain
* Ki hamara jo box height hain voh padding + border + content-heigth se mil kar heigth banaya
      * *{ box-sizing: border-size;}*

* By default hamare body ki margin 8px hoti hain esliye
     *  *body {margin:0;}* 


***
* Jo box hota hain uske pass margin , border,padding and content-height hoti hain
* height define hum content-height ke liye karte hain
* Jab hum height define karte hain sirf, toh border chipka hota hain content-height ke sath
* Agar padding ko define karte hain toh padding hamare content-box aur border ke beech mei hoti. Without disturbing the content box height unless hum mention karte hain ki box-sizing
* margin outside par hoti hain and border mota hota hain agar hum usey define kare toh
***
* Usually, **1rem = 16px**
* *vh and vw* -> viewport hota hain(ki area of wepbage on screen. 100vh -> 100% heigth on the screen)
