import {UserModel} from '../mapView/user.model'

export class FriendshipRequestModel {
  constructor(
    public user: UserModel,
    public date: string
  ) {  }
}