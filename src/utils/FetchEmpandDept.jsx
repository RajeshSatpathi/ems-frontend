// fetch employee  api call
export const fetchEmpAPICall = async (id) => {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch(`https://ems-backend-xjj3.vercel.app/api/employee/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        if (data) {
           return data
        }
    } catch (error) {
        console.error("Error fetching departments:", error);
    }
}
//fetch dept data api call
export const fetchDeptData = async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch("https://ems-backend-xjj3.vercel.app/department", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        if (data) {
             return data
        }
    } catch (error) {
        console.error("Error fetching departments:", error);
    }
}


