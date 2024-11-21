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

    const containerTable = document.getElementById('containerTable');
    containerTable.innerHTML = '';

    users.forEach(user => {
        const table = document.createElement('table');
        table.id = user.id;
        table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Senha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input id="name" type="text" value="${user.name}"></td>
                            <td><input id="email" type="email" value="${user.email}"></td>
                            <td><input id="password" type="password" value=""></td>
                        </tr>
                        <tr>
                            <td>
                                <button class="btn-editar" onclick="updateUser(${user.id})">Editar</button>
                                <button class="btn-deletar" onclick="deleteUser(${user.id})">Deletar</button>
                            </td>
                        </tr>
                    </tbody>
        `;

        containerTable.appendChild(table);
    });
}()

// Função para renderizar a lista de usuários
async function renderUserList() {

    try {

        const containerTable = document.getElementById('containerTable');
        containerTable.innerHTML = '';

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
            const table = document.createElement('table');
            table.id = user.id;
            table.innerHTML = `
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Senha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input id="name" type="text" value="${user.name}"></td>
                                <td><input id="email" type="email" value="${user.email}"></td>
                                <td><input id="password" type="password" value=""></td>
                            </tr>
                            <tr>
                                <td>
                                    <button class="btn-editar" onclick="updateUser(${user.id})">Editar</button>
                                    <button class="btn-deletar" onclick="deleteUser(${user.id})">Deletar</button>
                                </td>
                            </tr>
                        </tbody>
            `;
            containerTable.appendChild(table);
        });
    }
    catch (error) {

    }
}

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

async function deleteUser(userId) {

    try {
        const response = await fetch('/users/' + userId, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
    
        if (response.status == 401) {
            alert('Vc não tem permissão para deletar este usuário!')
            return
        }
    
        const users = await response.json()

        alert('Usuário deleltado com sucesso!')
        renderUserList()

    }
    catch (error) {
        
    }

}

async function updateUser(userId) {

    try {

        const containerTable = document.getElementById(userId);
        const inputs = containerTable.querySelectorAll('tbody tr td input');

        let { name, email, password } = '';

        inputs.forEach(input => {

            if (input.id === 'name') {
                name = input.value
            }

            if (input.id === 'email') {
                email = input.value
            }

            if (input.id === 'password') {
                password = input.value
            }
        });

        if (password === '') {
            alert('Necessário informar a senha do usuário!')
            return
        }

        const token = localStorage.getItem('token');

        const response = await fetch('/users/' + userId, {
            method: 'PUT',
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
    
        if (response.status == 401) {
            alert('Vc não tem permissão para alterar este usuário!')
            return
        }
    
        const users = await response.json()

        alert('Usuário alterado com sucesso!')
        renderUserList()

    }
    catch (error) {
        
    }

}