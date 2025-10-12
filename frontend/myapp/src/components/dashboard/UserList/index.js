import React from 'react';
import './index.css';
const UserList = ({ users }) => {
  if (!users || users.length === 0) return <p>No users found.</p>;
  return (
    <div className="user-list-container">
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td data-label="Name">{user.name}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Address">{user.address || 'N/A'}</td>
              <td data-label="Role">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserList;