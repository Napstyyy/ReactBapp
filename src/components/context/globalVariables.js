// src/config/globalVariables.js
import mockData from "../../data/mockData.json";
import users from "../../data/mockMessagesData.json";

export let hasAnyMessage = false;

export const updateHasAnyMessage = () => {
  hasAnyMessage = mockData.projects.some(project => project.HasMessages);
};

export let CurrenUser = ""

export function getUserNameById(id) {
  const user = users.find(user => user.id === id);
  return user ? user.name : 'User not found';
}
export default getUserNameById;