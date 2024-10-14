const BASE_URL = 'http://localhost:8080/api/users';  // Replace with your actual backend URL

//function to handle login
export async function loginUser(userName, password){
    try{
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            }),
        });
        if(!response.ok){
            throw new Error(await response.text()); //throw error if login fails
        }

        return await response.json();
    } catch(error){
        throw error;
    }
}

export async function createUser(emailAddr, userName, firstName, lastName, password){
    try{
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailAddr: emailAddr,
                userName: userName,
                firstName: firstName,
                lastName: lastName, 
                password: password
            }),
        });
        if(!response.ok){
            throw new Error(await response.text());
        }

        return await response.json();
    } catch(error){
        throw error;
    }
}