window.onload = ()=> {
    /*Gerando as datas */
    const dateBox = document.querySelector('.date');
    const date = new Date();
    const day = date.getDate();
    console.log(day);
    const month = date.getMonth();
    console.log(month);
    const year = date.getFullYear();
    console.log(year);

    dateBox.innerHTML = 'Date:<span>'+day+ '-' + month + '-' + year + '</span>'
    /*Envio do formulário*/ 
    const formTodo = document.querySelector('.formTodo');
    let list = document.querySelector('.list');

    //Adicionando itens a lista
    if(JSON.parse(localStorage.getItem('todoItemsTut')) != null){
        JSON.parse(localStorage.getItem('todoItemsTut')).map(todo=>{
            const div = document.createElement('div');
                div.className = 'item';
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = 'itemCheck';
                input.id = todo.id;
                const p = document.createElement('p');
                p.innerHTML = todo.name;
                div.append(input);
                div.append(p);
                list.append(div);
            });

    }
    //Removendo item da lista e do localStorage
    const inputs = document.querySelectorAll('input[name="itemCheck"]');
    for(let i=0; i<inputs.length; i++){
        inputs[i].addEventListener("click",function(e){
            if(JSON.parse(localStorage.getItem('todoItemsTut')) != null){
                let itemsLocal = [];
                JSON.parse(localStorage.getItem('todoItemsTut')).map(todo=>{
                    if(todo.id != e.target.id){
                        itemsLocal.push(todo);
                    }
                });
                localStorage.setItem('todoItemsTut',JSON.stringify(itemsLocal));
                window.location.reload();
                alert('Tarefa cumprida!!')
            }
        });
    };


    formTodo.onsubmit = function (e){
        e.preventDefault();
        const value = e.target.name.value;
        let items = [];
        let id = Id();
            function Id(){
                if(JSON.parse(localStorage.getItem('todoItemsTut')) == null || JSON.parse(localStorage.getItem('todoItemsTut')).length == 0)
                {
                    return 1;
                } else {
                    return JSON.parse(localStorage.getItem('todoItemsTut'))[JSON.parse(localStorage.getItem('todoItemsTut')).length - 1].id + 1;
                }
            };
        let item = {
                    id: id,
                    name: value,
                    date: day + '-' + month+ '-' + year
                };
                console.log(item);
        if(value == ''){
            alert('Por favor, digite um texto!');
        } else {
            if(JSON.parse(localStorage.getItem('todoItemsTut')) == null){
                items.push(item);
                localStorage.setItem('todoItemsTut',JSON.stringify(items));
                window.location.reload();
                alert('Item adicionado com sucesso. ')
            }else {
                JSON.parse(localStorage.getItem('todoItemsTut')).map(todo=>{
                    items.push(todo);
                });
                items.push(item);
                localStorage.setItem('todoItemsTut',JSON.stringify(items));
                window.location.reload();
                alert('Item adicionado com sucesso.')
            }
            
        }


    }


}