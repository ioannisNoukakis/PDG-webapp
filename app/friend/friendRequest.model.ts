import {UserModel} from '../user/user.model'

export class FriendshipRequestModel {
  constructor(
    public user: UserModel,
    public date: string
  ) {  }
}