// get logged in user's info 

export const getMe = (token) => {
    return fetch('/api/user/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const createUser = (userData) => {
    return fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  };
  
  export const loginUser = (userData) => {
    return fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  };
  
  export const createCardio = (cardioData, token) => {
    return fetch("/api/exercise/cardio", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cardioData)
    })
  }
  
  export const createPhysical = (physicalData, token) => {
    return fetch("/api/exercise/physical", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(physicalData)
    })
  }
  
  export const getCardioById = (cardioId, token) => {
    return fetch(`/api/exercise/cardio/${cardioId}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    })
  }
  
  export const getPhysicalById = (physicalId, token) => {
    return fetch(`/api/exercise/physical/${physicalId}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    })
  }
  
  export const deleteCardio = (cardioId, token) => {
    return fetch(`/api/exercise/cardio/${cardioId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
  }
  
  export const deletePhysical = (physicalId, token) => {
    return fetch(`/api/exercise/physical/${physicalId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
  }