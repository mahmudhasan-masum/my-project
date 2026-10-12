
let mainForm = document.getElementById("main-form");
let inputForm = document.getElementById("input-form");
let taskList = document.getElementById("task-list");
let eroormsgs = document.getElementById("eroormsg");
let counts = document.getElementById("count");
let clearBtn = document.getElementById("clear-btn");
let submitBtn = document.getElementById("submit-btn");

let tasks = [];
let editId = null;


// Add Task এবং Update Task
mainForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let inputValue = inputForm.value.trim();

    //  Error 
    if (inputValue === "") {
        eroormsgs.classList.remove("hidden");
        return;
    } else {
        eroormsgs.classList.add("hidden");
    }

    // Edit করার সময়
    if (editId !== null) {
        let task = tasks.find((item) => item.id === editId);

        if (task) {
            task.title = inputValue;
        }

        editId = null;
        submitBtn.textContent = "Add Task";

    } else {
        // নতুন Task তৈরি
        let newTask = {
            id: crypto.randomUUID(),
            title: inputValue,
            isCompleted: false,
        };

        tasks.push(newTask);
    }

    renderTasks();
});



function renderTasks() {
    taskList.innerHTML = tasks
        .map((task) => {
            return `
                <div class="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">

                    <div class="flex min-w-0 items-center gap-3">

                        <input
                            type="checkbox"
                            class="h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
                            data-id="${task.id}"
                            ${task.isCompleted ? "checked" : ""}
                        >

                        <p class="break-words text-slate-700 ${task.isCompleted ? "line-through" : ""}">
                            ${task.title}
                        </p>

                    </div>

                    <div class="flex shrink-0 gap-2">

                        <button
                            data-id="${task.id}"
                            type="button"
                            class="rounded-lg editbtn bg-amber-400 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-500"
                        >
                            Edit
                        </button>

                        <button
                            data-id="${task.id}"
                            type="button"
                            class="rounded-lg delete-btn bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600"
                        >
                            Delete
                        </button>

                    </div>

                </div>
            `;
        })
        .join("");

    totalCount();

    inputForm.value = "";
}


// Task Count
function totalCount() {
    counts.textContent = tasks.length;
}

totalCount();


// Edit  Delete Button
taskList.addEventListener("click", (e) => {

    // Delete Task
    if (e.target.classList.contains("delete-btn")) {
        let id = e.target.dataset.id;

        tasks = tasks.filter((task) => task.id !== id);

        // যে Task Edit হচ্ছিল, সেটি Delete করলে
        if (editId === id) {
            editId = null;
            inputForm.value = "";
            submitBtn.textContent = "Add Task";
        }

        renderTasks();
    }


    // Edit Task
    if (e.target.classList.contains("editbtn")) {
        editId = e.target.dataset.id;

        let task = tasks.find((item) => item.id === editId);

        if (task) {
            inputForm.value = task.title;
            submitBtn.textContent = "Update";
            inputForm.focus();
        }
    }

});


// // Checkbox দিয়ে Task Complete করা
// taskList.addEventListener("change", (e) => {

//     if (e.target.type === "checkbox") {
//         let id = e.target.dataset.id;

//         let task = tasks.find((item) => item.id === id);

//         if (task) {
//             task.isCompleted = e.target.checked;
//         }

//         renderTasks();
//     }

// });


// Clear All Button
clearBtn.addEventListener("click", () => {

    tasks = [];
    editId = null;

    inputForm.value = "";
    submitBtn.textContent = "Add Task";
    eroormsgs.classList.add("hidden");

    renderTasks();

});

