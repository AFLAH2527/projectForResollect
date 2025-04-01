import React, { useEffect, useState } from "react";
import { getMembers } from "../services/api";

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers().then(setMembers);
  }, []);

  return (
    <div>
      <h2>Members</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id}>{member.name} - {member.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
