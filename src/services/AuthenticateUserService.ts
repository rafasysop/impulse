import axios from 'axios';

interface AccessTokenResponse {
  access_token: string;
}

interface UserInfoResponse {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const urlAccessToken = 'https://github.com/login/oauth/access_token';
    const urlUser = 'https://api.github.com/user';

    try {
      const { data: accessTokenResponse } = await axios.post<AccessTokenResponse>(urlAccessToken,null, {
        params: {
          client_id: process.env.GITHUB_ID,
          client_secret: process.env.GITHUB_SECRET,
          code
        },
        headers: {
          "Accept": "application/json"
        }
      })
  
      const { data: userInfo } = await axios.get<UserInfoResponse>(urlUser, {
        headers: {
          authorization: 'Bearer ' + accessTokenResponse.access_token
        }
      })
      return userInfo
    } catch (error) {
      return error.message
    }
  }
}

export { AuthenticateUserService }
