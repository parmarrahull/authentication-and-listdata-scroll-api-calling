/* eslint-disable no-undef */
import React from 'react';

const UserDetails = ({ user, setSelectedUser }) => {
    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{user.first_name} {user.last_name}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedUser(null)}></button>
                    </div>
                    <div className="modal-body">
                        <img src={user.avatar} className="img-fluid" alt={`${user.first_name} ${user.last_name}`} />
                        <p>Email: {user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
