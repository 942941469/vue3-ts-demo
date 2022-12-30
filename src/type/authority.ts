export interface RoleListInt{
  name:string
  roleId: number
  roleList?:RoleListInt[]
  viewRole?:string
}
export class Authority {
  id: number
  authority: number[]
  list: RoleListInt[] = []
  constructor (id: number, authority: number[]) {
    this.id = id
    this.authority = authority
  }
}
