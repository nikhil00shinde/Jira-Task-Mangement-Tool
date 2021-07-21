let addBtn = document.querySelector(".add");
let body = document.querySelector("body");
let grid = document.querySelector(".grid");

let colors = ["pink", "blue", "green", "black"];

//if we have to check whether the object exist in localStorage or not
if (localStorage.getItem("AllTickets") == undefined) {
  let allTickets = {};
  allTickets = JSON.stringify(allTickets);
  localStorage.setItem("AllTickets", allTickets);
}

let deleteMode = false;
//select the delete button
let deleteBtn = document.querySelector(".delete");

deleteBtn.addEventListener("click", function (e) {
  if (e.currentTarget.classList.contains("delete-selected")) {
    e.currentTarget.classList.remove("delete-selected");
    deleteMode = false;
  } else {
    e.currentTarget.classList.add("delete-selected");
    deleteMode = true;
  }
});

addBtn.addEventListener("click", function () {
  // delete mode ko band krna h
  deleteBtn.classList.remove("delete-selected");
  deleteMode = false;

  let modal = body.querySelector(".modal");
  if (modal != null) return;

  let div = document.createElement("div"); //<div> </div>

  div.classList.add("modal"); //<div class = "modal"> </div>

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
    </div>`; //we use ` `

  let ticketColor = "black";
  let allModalPriority = div.querySelectorAll(".modal-priority");

  for (let i = 0; i < allModalPriority.length; i++) {
    allModalPriority[i].addEventListener("click", function (e) {
      for (let j = 0; j < allModalPriority.length; j++) {
        allModalPriority[j].classList.remove("selected");
      }

      e.currentTarget.classList.add("selected");
      ticketColor = e.currentTarget.classList[1];
    });
  }

  let taskInnerContent = div.querySelector(".task-inner-container");
  taskInnerContent.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
      let id = uid();
      let task = e.currentTarget.innerHTML;
      // step-1 -> jobhi data hain localStorage use lekr aao
      let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

      // step-2 -> usko update kro
      let ticketObj = {};
      ticketObj.color = ticketColor;
      ticketObj.taskValue = task;

      allTickets[id] = ticketObj;

      //ANOTHER WAY TO DO IT
      // let ticketObj = {
      //     color:ticketColor,
      //     taskValue:task,
      // }

      // step-3 -> wapis updated object ko local storage mei save kardo
      localStorage.setItem("AllTickets", JSON.stringify(allTickets));

      let ticketDiv = document.createElement("div");
      ticketDiv.classList.add("ticket");
      ticketDiv.setAttribute("data-id",id);
      ticketDiv.innerHTML = `<div class="ticket-color ${ticketColor}"></div>
               <div class="ticket-id">#${id}</div>
               <div data-id ="${id}" class="actual-task" contenteditable="true">
               ${task}
               </div>`;

      let ticketColorDiv = ticketDiv.querySelector(".ticket-color");
      let actualTaskDiv = ticketDiv.querySelector(".actual-task");

      actualTaskDiv.addEventListener("input", function (e) {
        let updatedTask = e.currentTarget.innerText;

        let currTicketId = e.currentTarget.getAttribute("data-id");
        let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

        allTickets[currTicketId].taskValue = updatedTask;
        localStorage.setItem("AllTickets", JSON.stringify(allTickets));
      });

      //Now we have add the attribute to the color tag
      ticketDiv.querySelector(".ticket-color").setAttribute("data-id", id);
      ticketColorDiv.addEventListener("click", function (e) {
        let currColor = e.currentTarget.classList[1];
        let index = -1;
        for (let i = 0; i < colors.length; i++) {
          if (colors[i] == currColor) index = i;
        }
        index++;
        index = index % 4;
        let newColor = colors[index];

        // we get the id from color tag
        let currTicketId = e.currentTarget.getAttribute("data-id");

        // 1- all tickets lana ; 2- update krna ; 3- wapis save krna
        let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

        allTickets[currTicketId].color = newColor;

        //update the AllTickets in localStorage
        localStorage.setItem("AllTickets", JSON.stringify(allTickets));

        e.currentTarget.classList.remove(currColor);
        e.currentTarget.classList.add(newColor);
      });
      ticketDiv.addEventListener("click", function (e) {
        if (deleteMode) {
          let currTicketId = e.currentTarget.getAttribute("data-id");
          
          let allTickets = JSON.parse(localStorage.getItem("AllTickets"));
          delete allTickets[currTicketId];
          localStorage.setItem("AllTickets",JSON.stringify(allTickets));
          e.currentTarget.remove();
        }
      });
      grid.append(ticketDiv);
      div.remove();

      //(e.currentTarget.innerText) both will work same e.currentTarget.innerHTML
    } else if (e.key == "Escape") {
      div.remove();
    }
  });
  body.append(div);
});
