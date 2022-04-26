import axios from 'axios';
import { sign } from 'jsonwebtoken';
import prismaClient from '../prisma';

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

    const { login, avatar_url, id, name } = userInfo

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      }
    })

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          name,
          login,
          github_id: id,
          avatar_url
        }
      })
    }

    const token = sign({
      user: {
        name: user.name,
        avatar_url: user.avatar_url,
        id: user.id,
      }
    },
    process.env.JWT_SECRET,
    {
      subject: user.id,
      expiresIn: '1d'
    })

    return { token, user }
  }
}

export { AuthenticateUserService }
