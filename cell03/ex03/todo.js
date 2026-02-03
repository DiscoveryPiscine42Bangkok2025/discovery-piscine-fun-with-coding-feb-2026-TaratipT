const ft_list = document.getElementById('ft_list');
const btn = document.getElementById('new_btn');

function addTodo(text) {
    const div = document.createElement('div');
    div.textContent = text;
    div.className = 'todo-item';

    div.onclick = function() {
        if (confirm("Delete?")) {
            div.remove();
            saveCookies();
        }
    };
    ft_list.prepend(div);
}

btn.onclick = function() {
    const msg = prompt("What you gonna do?");
    if (msg && msg.trim() !== "") {
        addTodo(msg);
        saveCookies();
    }
};

function saveCookies() {
    const list = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        list.push(item.textContent);
    });
    document.cookie = "todo_data=" + JSON.stringify(list) + "; path=/;";
}

window.onload = function() {
    const name = "todo_data=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            const data = JSON.parse(c.substring(name.length, c.length));
            data.reverse().forEach(text => addTodo(text));
        }
    }
};