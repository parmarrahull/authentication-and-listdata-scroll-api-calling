import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserDetails from './UserDetails';
import { AuthContext } from '../context/AuthContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TailSpin } from 'react-loader-spinner';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { logout } = useContext(AuthContext);
    const pageSize = 6;

    useEffect(() => {
        const loadUsers = async () => {
            if (loading) return;
            setLoading(true);
            try {
                const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${pageSize}`);
                const newUsers = response.data.data;
                if (newUsers.length === 0) {
                    setHasMore(false); // No more users to load
                } else {
                    setUsers(prevUsers => [...prevUsers, ...newUsers]);
                }
            } catch (error) {
                console.error("Error loading users:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, [page, pageSize]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h1>Users List</h1>
                <button className="btn btn-danger" onClick={logout}>Logout</button>
            </div>
            <InfiniteScroll
                dataLength={users.length}
                next={loadMore}
                hasMore={hasMore}
                loader={
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TailSpin color="#00BFFF" height={80} width={80} />
                    </div>
                }
                endMessage={<p className="text-center mt-3">No more users to load</p>}
            >
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {users.map((user, index) => (
                        <div key={`${user.id}-${index}`} className="col">
                            <div className="card h-100" onClick={() => setSelectedUser(user)}>
                                <img src={user.avatar} className="card-img-top" alt={`${user.first_name} ${user.last_name}`} />
                                <div className="card-body">
                                    <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
            {selectedUser && <UserDetails user={selectedUser} setSelectedUser={setSelectedUser} />}
        </div>
    );
};

export default UsersList;
