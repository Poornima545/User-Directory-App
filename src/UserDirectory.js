import React, { useEffect, useState } from "react";

const UserDirectory = () => {
    const [users, setUsers] = useState([])
    const [searchName, setSearchName] = useState('')


    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/users")
            const data = await res.json()
            setUsers(data)
        }

        fetchUsers()
    }, [])

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchName.toLowerCase()))

    return (
        <>
            <header>
                <h1>User Directory</h1>
            </header>
            <main>
                <form>
                    <input type="text"
                        placeholder="search by name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </form>
                <ul>
                    {
                        filteredUsers.map(user => (
                            <li key={user.id}>
                                {user.name | user.email | user.company.name}
                            </li>
                        ))
                    }
                </ul>
            </main>
        </>
    )
}

export default UserDirectory