import { ICreateUserTokenDto } from "@modules/accounts/dtos/ICreateUserTokenDto";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens)
  }

  async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDto): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id
    })

    await this.repository.save(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const userToken = await this.repository.findOne({
      user_id,
      refresh_token
    })

    return userToken
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export { UsersTokensRepository }