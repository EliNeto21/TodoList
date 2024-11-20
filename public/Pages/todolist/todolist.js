void async function () {

  const response = await fetch('/tasks', {
    headers: {
      'Accept': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    }
  })

  if (response.status == 401) {
    return
  }

  const tasks = await response.json()

  const mainForm = document.querySelector('div[id="root"]')
    
  tasks.forEach(newtask => {
    const newForm = mainForm.cloneNode(true)
    const label = newForm.querySelector('label[for="task"]');
    label.textContent = newtask.name;
    const input = newForm.querySelector('input')
    input.checked = newtask.done;
    newForm.classList.add('containerListVisible');
    mainForm.before(newForm)
  });
  
}()

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('content');
  sidebar.classList.toggle('open');
  content.classList.toggle('open');
}