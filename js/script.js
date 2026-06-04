    function changeText(){
        const el = document.getElementById("clickMessage");

        if (el.textContent === "ボタンを押してみてください👇"){
            el.textContent = "クリックありがとう✨";
        } else {
            el.textContent = "ボタンを押してみてください👇";
        }
    }

    function changeColor() {
        document.body.classList.toggle("dark");

        const button = document.getElementById("themeBtn");

        if (document.body.classList.contains("dark")) {
            button.textContent = "ライトモードにする";
        } else {
            button.textContent = "ダークモードにする";
        }
    }

    const images = [
        "images/baseball-field.jpg",
        "images/study.jpg",
        "images/baseball.jpg",
        "images/cafe.jpg"
        ];

    let currentImage = 0;

    function changeImage() {

        const img = document.getElementById("mainImage");

        img.classList.remove("fade-in");
        img.classList.add("fade-out");

        currentImage++;

        if (currentImage >= images.length) {
            currentImage = 0;
        }

        setTimeout (() => {

            img.src = images[currentImage];

            img.classList.remove("fade-out");
            img.classList.add("fade-in");

        }, 300);
    }

    function toggleCard() {
        const card = document.getElementById("card");
        card.classList.toggle("show");
    }


    let count = 0;

    function updateCount() {
        const el = document.getElementById("count");
        el.textContent = count;

        if (count >= 10) {
            el.classList.add("big");
        } else {
            el.classList.remove("big");
        }
        }

    function plus() {
        count++;
        updateCount();
    }

    function minus() {
        if (count > 0) {
        count--;
        updateCount();
    }
    }

    function reset() {
        if (confirm("リセットしていい？")) {
            count = 0;
            updateCount();
        }
    }

    function addTodo() {
        const input = document.getElementById("todoInput");
        const text = input.value;

        if (text.trim() === "") return;

        createTodo(text);

        input.value = "";

        updateCountLeft();
        saveTodos();

    };

    window.onload = function() {
        loadTodos();
        updateCountLeft();
    };

    function saveTodos() {
        const items = document.querySelectorAll("#todoList li");

        const todos = [];

        items.forEach(li => {
            const text = li.querySelector("span").textContent;
            const checked = li.querySelector("input").checked;

            todos.push({ text: text, checked: checked });
        });
        
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function createTodo(text, checked = false, isLoad = false) {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = checked;

        const span = document.createElement("span");
        span.textContent = text;

        if (checked) {
            span.classList.add("done");
        }

        checkbox.addEventListener("change", function() {
            span.classList.toggle("done");

            const list = document.getElementById("todoList");

            if (checkbox.checked) {
                list.appendChild(li);
            } else {
                list.prepend(li);
            }

            updateCountLeft();
            saveTodos();
        });

        const btn = document.createElement("button");
        btn.textContent = "削除";
        btn.classList.add("delete-btn");

        btn.addEventListener("click", function() {
            li.remove();
            updateCountLeft();
            saveTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btn);

        const list = document.getElementById("todoList");

    if (isLoad) {
        list.appendChild(li);
    } else {
        list.prepend(li);
    }

}

    function loadTodos() {
        const data = localStorage.getItem("todos");

        if (!data) return;

        const todos = JSON.parse(data);

        todos.forEach(todo => {
            createTodo(todo.text, todo.checked, true);
        });
    }

    document.getElementById("todoInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

    function updateCountLeft() {
        const items = document.querySelectorAll("#todoList li");
        let remaining =0;

        items.forEach(li => {
        const checkbox = li.querySelector("input");
        if (!checkbox.checked) {
            remaining++;
        }
    });

    document.getElementById("todoCount").textContent = "残り: " + remaining + "件";
}
