$(document).ready(function () {
    const $ft_list = $('#ft_list');

    function addTodo(text) {
        const $div = $('<div></div>')
            .text(text)
            .addClass('todo-item');

        $div.on('click', function () {
            if (confirm("Do you really want to delete this todo?")) {
                $(this).remove();
                saveCookies();
            }
        });

        $ft_list.prepend($div);
    }

    $('#new_btn').on('click', function () {
        const msg = prompt("What you gonna do?");
        if (msg && msg.trim() !== "") {
            addTodo(msg);
            saveCookies();
        }
    });

    function saveCookies() {
        const list = [];
        $('.todo-item').each(function () {
            list.push($(this).text());
        });
        document.cookie = "todo_data=" + encodeURIComponent(JSON.stringify(list)) + "; path=/; max-age=86400;";
    }

    function loadCookies() {
        const name = "todo_data=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                try {
                    const cookieVal = decodeURIComponent(c.substring(name.length));
                    const data = JSON.parse(cookieVal);
                    data.reverse().forEach(text => addTodo(text));
                } catch (e) {
                    console.error("Cookie parsing error", e);
                }
            }
        }
    }

    loadCookies();
});