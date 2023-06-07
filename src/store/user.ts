// a simple example
import { makeObservable, observable, action } from 'mobx'
export declare interface userInfo {
  id: number
  email: string
  lastname: string
  firstname: string
}
export class UserStore {
  userinfo = {} as userInfo
  constructor() {
    makeObservable(this, {
      userinfo: observable,
      updateUserInfo: action
    })
  }
  updateUserInfo(info: Partial<userInfo>) {
    this.userinfo = Object.assign(this.userinfo, info)
  }
}
