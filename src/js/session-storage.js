export {addToSessionStorage,getFromSessionStorage,removeFromSessionStorage};

function addToSessionStorage (key, value) {
    try {
        const serializedState = JSON.stringify(value);
        sessionStorage.setItem(key, serializedState);
      } catch (error) {
        console.error("Set state error: ", error.message);
      }
}

function getFromSessionStorage (key) {
    try {
        const serializedState = sessionStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
      } catch (error) {
        console.error("Get state error: ", error.message);
      }
}

function removeFromSessionStorage (key) {
    try {
        sessionStorage.removeItem(key);       
      } catch (error) {
        console.error("Remove state error: ", error.message);
      }
}
  
