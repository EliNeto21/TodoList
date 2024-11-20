let users = [];

void async function () {
    const response = await fetch('/users', {
        headers: {
        'Accept': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
        }
    })

    if (response.status == 401) {
        return
    }

    const users = await response.json()

    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${user.name} - ${user.email}</span>
            <div>
                <button class="edit" onclick="editUser(${user.id})">Editar</button>
                <button class="delete" onclick="deleteUser(${user.id})">Excluir</button>
            </div>
        `;
        userList.appendChild(li);
    });
}()

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    sidebar.classList.toggle('open');
    content.classList.toggle('open');
}

async function cadastraNovoUsuario(event) {

    try {
        event.preventDefault(); // Evita o envio padrão do formulário

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/users', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })

        const resposeData = await response.json()
                
        if (!response.ok) {
            alert("Atencao: " + resposeData.message)
            return
        }

        // Limpa o formulário
        document.getElementById('userForm').reset();

        // Atualiza a lista de usuários
        renderUserList();
    }
    catch (error) {

    }
}


// Função para renderizar a lista de usuários
async function renderUserList() {

    try {
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; // Limpa a lista antes de renderizar novamente

        const response = await fetch('/users', {
            headers: {
            'Accept': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
            }
        })

        if (response.status == 401) {
            return
        }

        users = [];
        const users = await response.json()

        users.push(resposeData);

        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${user.name} - ${user.email}</span>
                <div>
                    <button class="edit" onclick="editUser(${user.id})">Editar</button>
                    <button class="delete" onclick="deleteUser(${user.id})">Excluir</button>
                </div>
            `;
            userList.appendChild(li);
        });
    }
    catch (error) {

    }
}