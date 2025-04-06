export class ApiClient {
  private _baseUrl = import.meta.env.VITE_API_URL;

  get = async (subRoute: string) => {
    try {
      const res = await fetch(`${this._baseUrl}/${subRoute}`);
      if (!res.ok) throw new Error("Error fetching data");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  post = async (subRoute: string, body: Record<any, any>) => {
    try {
      const res = await fetch(`${this._baseUrl}/${subRoute}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Error creating data");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  delete = async (subRoute: string, id: number) => {
    try {
      const res = await fetch(`${this._baseUrl}/${subRoute}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error deleting data");
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  put = async (subRoute: string, id: string, body: Record<any, any>) => {
    try {
      const res = await fetch(`${this._baseUrl}/${subRoute}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Error updating data");
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
}
