
const uri = 'http://localhost:3000/api/teams';

const addForm = document.getElementById('add-form');
const updateForm = document.getElementById('update-form');
const editForm = document.getElementById('edit-form');
const teamsTable = document.getElementById('teams');
const message = document.getElementById('message');
const counter = document.getElementById('counter');

async function getItems() {
    const response = await fetch(uri);
    const teams = await response.json();

    teamsTable.innerHTML = '';
    counter.textContent = `${teams.length} teams`;

    teams.forEach(team => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = team.id;

        const nameCell = document.createElement('td');
        nameCell.textContent = team.name;

        const conferenceCell = document.createElement('td');
        conferenceCell.textContent = team.conference;

        const winsCell = document.createElement('td');
        winsCell.textContent = team.wins;

        const actionsCell = document.createElement('td');

        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';

        viewButton.addEventListener('click', () => {
            document.getElementById('team-details').hidden = false;
            document.getElementById('details-text').textContent =
                `${team.name} plays in the ${team.conference} and has ${team.wins} wins.`;
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';

        editButton.addEventListener('click', () => {
            document.getElementById('edit-id').value = team.id;
            document.getElementById('edit-name').value = team.name;
            document.getElementById('edit-conference').value = team.conference;
            document.getElementById('edit-wins').value = team.wins;

            editForm.hidden = false;
            editForm.scrollIntoView({ behavior: 'smooth' });
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', async () => {
            await fetch(`${uri}/${team.id}`, {
                method: 'DELETE'
            });

            message.textContent = `${team.name} deleted.`;
            getItems();
        });

        actionsCell.appendChild(viewButton);
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(conferenceCell);
        row.appendChild(winsCell);
        row.appendChild(actionsCell);

        teamsTable.appendChild(row);
    });
}

// Add a team.
addForm.addEventListener('submit', async event => {
    event.preventDefault();

    const team = {
        name: document.getElementById('add-name').value,
        conference: document.getElementById('add-conference').value,
        wins: Number(document.getElementById('add-wins').value)
    };

    await fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(team)
    });

    addForm.reset();
    message.textContent = 'Team added.';
    getItems();
});

// Update a team.
updateForm.addEventListener('submit', async event => {
    event.preventDefault();

    const id = document.getElementById('edit-id').value;

    const team = {
        name: document.getElementById('edit-name').value,
        conference: document.getElementById('edit-conference').value,
        wins: Number(document.getElementById('edit-wins').value)
    };

    await fetch(`${uri}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(team)
    });

    editForm.hidden = true;
    message.textContent = 'Team updated.';
    getItems();
});

// Cancel editing.
document.getElementById('cancel-edit').addEventListener('click', () => {
    editForm.hidden = true;
});

// Close team details.
document.getElementById('close-details').addEventListener('click', () => {
    document.getElementById('team-details').hidden = true;
});

// Load teams when the page opens.
getItems();
