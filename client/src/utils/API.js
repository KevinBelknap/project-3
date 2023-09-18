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

  export const createYoga = (yogaData, token) => {
    return fetch("/api/exercise/yoga", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(yogaData)
    })
  }

  export const createSwimming = (swimmingData, token) => {
    return fetch("/api/exercise/swimming", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(swimmingData)
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

  export const getYogaById = (yogaId, token) => {
    return fetch(`/api/exercise/yoga/${yogaId}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    })
  }

  export const getSwimmingById = (swimmingId, token) => {
    return fetch(`/api/exercise/swimming/${swimmingId}`, {
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

  export const deleteYoga = (yogaId, token) => {
    return fetch(`/api/exercise/yoga/${yogaId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
  }

  export const deleteSwimming = (swimmingId, token) => {
    return fetch(`/api/exercise/swimming/${swimmingId}`, {
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