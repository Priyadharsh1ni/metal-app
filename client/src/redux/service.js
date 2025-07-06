async function login(body){
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
}

async function register(body){
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
}

async function purityData(){
    const response = await fetch('/api/purities/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    return data;
}

async function updatePurityData(id, body){
    const response = await fetch(`/api/purities/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
}

async function deletePurityData(id){
    const response = await fetch(`/api/purities/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    return data;
}

async function createdPurityData(body) {
    const response = await fetch(`/api/purities/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
}


async function listMetalRate() {
    const response = await fetch(`/api/metal-rates`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });
    const data = await response.json();
    return data;
}


async function updateMetalRate (body){
     const response = await fetch(`/api/metal-rates/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
}


async function runHistory() {
    const response = await fetch(`/api/metal-rates/history`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });
    const data = await response.json();
    return data;
}


export const service = {
    login,
    register,
    purityData,
    updatePurityData,
    deletePurityData,
    createdPurityData,
    listMetalRate,
    updateMetalRate,
    runHistory
}