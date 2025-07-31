import React, { useEffect, useState } from "react";

const UserDirectory = () => {
    const [users, setUsers] = useState([])
    const [searchName, setSearchName] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users")
                if (!res.ok) {
                    throw new Error("Failed to fetch users.")
                }
                const data = await res.json()
                setUsers(data)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchName.toLowerCase()))

    return (
        <>
            <header>
                <h1 className="header">User Directory</h1>
            </header>
            <main>
                <form>
                    <input type="text"
                        className="user-name"
                        placeholder="search by name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </form>

                {
                    loading && <p className="loading">Loading Users...</p>
                }
                {
                    error && <p className="error">{error}</p>
                }

                {
                    !loading && !error && (
                        <ul className="user-list">
                            {
                                filteredUsers.map(user => (
                                    <li key={user.id} className="user-data">
                                        <p className="para name"><strong>Name:</strong> {user.name}</p>
                                        <p className="para"><strong>Email:</strong> {user.email}</p>
                                        <p className="para company-name"><strong>company Name:</strong> {user.company.name}</p>
                                    </li>
                                ))}
                        </ul>
                    )
                }
            </main>
        </>
    )
}

export default UserDirectory;