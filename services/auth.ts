import axios from "axios";

interface User {
  username: string;
  password: string;
}

class AuthService {
  http = axios.create({
    baseURL: "/api/auth",
  });

  async signup({ username, password }: User) {
    const response = await this.http.post<User>("signup", {
      username,
      password,
    });
    return response.data;
  }
}

export default new AuthService();
