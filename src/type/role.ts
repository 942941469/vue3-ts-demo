export interface RoleList{
  authority: number[]
  roleId: number
  roleName: string
}
export class RoleData {
  list: RoleList[] = []
}
