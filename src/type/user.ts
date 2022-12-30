interface Role{
  role: number
  roleName: string
}
export interface UserList{
  id: number
  nickName: string
  role: Role[]
  userName: string
}
interface selectData{
  role: number
  nickName: string
}
interface RoleList{
  authority: number[]
  roleId: number
  roleName: string
}
interface activeInt{
  id: number
  nickName: string
  role: number[]
  userName: string
}
export class UserData {
  selectData: selectData = {
    nickName: '',
    role: 0
  }

  userList: UserList[] = []
  roleList: RoleList[] = []
  isShow = false
  active: activeInt = {
    id: 0,
    nickName: '',
    role: [],
    userName: ''
  }
}
