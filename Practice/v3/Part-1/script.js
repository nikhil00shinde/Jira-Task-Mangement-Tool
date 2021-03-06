let addBtn = document.querySelector(".add");
let body = document.querySelector("body");
let grid = document.querySelector(".grid");

let colors = ["pink","blue","green","black"];


let deleteMode = false;
//select the delete button
let deleteBtn = document.querySelector(".delete");

deleteBtn.addEventListener("click",function(e)
{
     if(e.currentTarget.classList.contains("delete-selected"))
     {
         e.currentTarget.classList.remove("delete-selected")
         deleteMode = false;
     }
     else
     {
        e.currentTarget.classList.add("delete-selected")
        deleteMode = true;
     }
})

addBtn.addEventListener("click",function()
{
     // delete mode ko band krna h
     deleteBtn.classList.remove("delete-selected");
     deleteMode = false;

    let modal = body.querySelector(".modal");
    if(modal != null)   return;

    let div = document.createElement("div") //<div> </div>
    
    div.classList.add("modal"); //<div class = "modal"> </div>

    div.innerHTML =  `<div class="task-section">
    <div class="task-inner-container" contenteditable="true">
    </div>
    </div>
    <div class="modal-priority-section">
    <div class="priority-inner-section">
        <div class="modal-priority pink"></div>
        <div class="modal-priority blue"></div>
        <div class="modal-priority green"></div>
        <div class="modal-priority black selected"></div>
    </div>
    </div>`;  //we use ` ` 

  let ticketColor = "black";
    let allModalPriority = div.querySelectorAll(".modal-priority");

    for(let i=0;i<allModalPriority.length;i++)
    {
        allModalPriority[i].addEventListener("click",function(e)
        {
            for(let j=0;j<allModalPriority.length;j++)
            {
                allModalPriority[j].classList.remove("selected");
            }
            
            e.currentTarget.classList.add("selected");
             ticketColor = e.currentTarget.classList[1];
        });
    }

    let taskInnerContent = div.querySelector(".task-inner-container");
    taskInnerContent.addEventListener("keydown",function(e)
    {
           if(e.key == "Enter")
           {
                 let id = uid();
               let ticketDiv = document.createElement("div");
               ticketDiv.classList.add("ticket");
               ticketDiv.innerHTML = `<div class="ticket-color ${ticketColor}"></div>
               <div class="ticket-id">#${id}</div>
               <div class="actual-task">
               ${e.currentTarget.innerHTML}
               </div>`;
                
               let ticketColorDiv = ticketDiv.querySelector(".ticket-color");
               ticketColorDiv.addEventListener("click",function(e)
               {
                  let currColor = e.currentTarget.classList[1];
                  let index  = -1;
                  for(let i=0;i<colors.length;i++)
                  {
                        if(colors[i] == currColor)   index = i;
                  }
                   index++;
                   index = index%4;
                   let newColor = colors[index];
                  e.currentTarget.classList.remove(currColor);
                  e.currentTarget.classList.add(newColor);
               });
               ticketDiv.addEventListener("click",function(e)
               {
                   if(deleteMode)
                   {
                       e.currentTarget.remove();
                   }
               })
               grid.append(ticketDiv);
               div.remove();
               
               //(e.currentTarget.innerText) both will work same e.currentTarget.innerHTML
           }
           else if(e.key == "Escape")
           {
               div.remove();
           }
    })
    body.append(div);
})