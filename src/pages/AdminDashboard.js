import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      isApproved: true,
    });

    // Update the local state to reflect the change
    setUsers(users.map(user =>
      user.id === userId ? { ...user, isApproved: true } : user
    ));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>User List:</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.email} - Approved: {user.isApproved ? 'Yes' : 'No'}
            {!user.isApproved && (
              <button onClick={() => handleApprove(user.id)}>Approve</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;