import { Slots } from "./constants";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: { [key: string]: any }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(Slots.State, serializedState);
  } catch (error) {
    console.log(`Error while saving to localStorage: ${error}`);
    // ignore write errors
  }
};

export function clearLocalStorage() {
  console.log("Clearing localStorage");
  localStorage.removeItem(Slots.State);
}
