let addBtn = document.querySelector(".add");
let body = document.querySelector("body");
let grid = document.querySelector(".grid")
let colors = ["pink","blue","green","black"];





if(localStorage.getItem("AllTickets") == null)
{
    let allTickets = {};
    allTickets = JSON.stringify(allTickets);
   localStorage.setItem("AllTickets",allTickets)
}

loadTask();


let filterTag = document.querySelectorAll(".filter div");

for(let i=0;i<filterTag.length;i++)
{
    filterTag[i].addEventListener("click",function(e)
    {
        let currColor = e.currentTarget.classList[0];
        let index  = colors.indexOf(currColor);
        let filter = document.querySelectorAll(".filter");
        if(filter[index].classList.contains("filter-selected"))
        {
            filter[index].classList.remove("filter-selected");
            loadTask();
        }
        else
        {
            for(let j=0;j<filter.length;j++)
            {
                if(filter[j].classList.contains("filter-selected"))
                {
                    filter[j].classList.remove("filter-selected");
                }
            }
            filter[index].classList.add("filter-selected");
            loadTask(currColor);
        }
         
    })
}











let deletes = false;
let delBtn = document.querySelector(".delete");
delBtn.addEventListener("click",function(e)
{
    if(e.currentTarget.classList.contains("filter-selected"))
    {
        e.currentTarget.classList.remove("filter-selected");
        deletes = false;
    }
    else
    {
        e.currentTarget.classList.add("filter-selected")
        deletes = true;
    }

})


addBtn.addEventListener("click",function()
{

  let modal = body.querySelector(".modal");

  if(modal != null)   return;


    let div = document.createElement("div");
    div.classList.add("modal");
    div.innerHTML = `<div class="task-section">
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
</div>`;


     let ticketColor = "black";    
    let modalPriority =  div.querySelectorAll(".modal-priority");
     for(let i=0;i<modalPriority.length;i++)
     {
         modalPriority[i].addEventListener("click",function(e)
         {
             for(let j=0;j<modalPriority.length;j++)
             {
                modalPriority[j].classList.remove("selected");
             }

             e.currentTarget.classList.add("selected");
             ticketColor = e.currentTarget.classList[1];
         })
     }
     
     let taskInnerContainer = div.querySelector(".task-inner-container");
     taskInnerContainer.addEventListener("keydown",function(e)
     {
         if(e.key == "Enter")
         {
             let id = uid();
             let task = e.currentTarget.innerText;

             let allTickets = JSON.parse(localStorage.getItem("AllTickets"));
             let ticketObj = {};
             ticketObj.color = ticketColor,
             ticketObj.taskData = task,
             allTickets[id] = ticketObj;
             localStorage.setItem("AllTickets",JSON.stringify(allTickets));

             createsTicketAddEvent(id,task,ticketColor);
             div.remove();
             
         }
         else if(e.key == "Escape")
         {
             div.remove();
         }
     })

    body.append(div);
})

function createsTicketAddEvent(id,task,ticketColor)
{
    let ticketDiv = document.createElement("div")
    ticketDiv.classList.add("ticket");
    ticketDiv.setAttribute("data-id",id);
    ticketDiv.innerHTML = `<div data-id = "${id}"class="ticket-color ${ticketColor}"></div>
    <div class="ticket-id">#${id}</div>
    <div data-id = "${id}" class="actual-task" contenteditable = "true">${task}</div>`;
  
    let actualTask = ticketDiv.querySelector(".actual-task");
    actualTask.addEventListener("input",function(e)
    {
        let allTickets = JSON.parse(localStorage.getItem("AllTickets"));
        let currId = e.currentTarget.getAttribute("data-id");

        allTickets[currId].taskData = e.currentTarget.innerText;
        localStorage.setItem("AllTickets",JSON.stringify(allTickets));
    })
    let divColor = ticketDiv.querySelector(".ticket-color");
    divColor.addEventListener("click",function(e)
    {
       let currColor = e.currentTarget.classList[1];
       let index = -1;

       for(let i=0;i<colors.length;i++)
       {
           if(currColor == colors[i])
           {
               index = i;
           }
       }

       index++;
       index = index % 4;

       e.currentTarget.classList.remove(currColor);
       e.currentTarget.classList.add(colors[index]);
       let allTickets = JSON.parse(localStorage.getItem("AllTickets"));
       let currId = e.currentTarget.getAttribute("data-id");
       allTickets[currId].color = colors[index];
        localStorage.setItem("AllTickets",JSON.stringify(allTickets));
    })
    grid.append(ticketDiv);
    ticketDiv.addEventListener("click",function(e)
    {
        if(deletes)
        {
            let allTickets = JSON.parse(localStorage.getItem("AllTickets"));
            let currId = e.currentTarget.getAttribute("data-id");
            delete allTickets[currId];
            localStorage.setItem("AllTickets",JSON.stringify(allTickets));
            e.currentTarget.remove();
        } 
            
    })
}

function loadTask(color)
{
    let allTicketsOnUi = document.querySelectorAll(".ticket");

    for(let i=0;i<allTicketsOnUi.length;i++)
    {
        allTicketsOnUi[i].remove();
    }
    
    let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

    for(x in allTickets)
    {
        let currId = x;
        let currColor = allTickets[x].color;
        let task = allTickets[x].taskData;
        if(color && color != currColor)
        {
            continue;
        }
        createsTicketAddEvent(currId,task,currColor)
    }

    
}