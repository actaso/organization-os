export interface Role {
  id: string
  ownerId: string // Clerk user ID
  title: string
  purpose: string
  accountabilities: string[]
  assignee: string
  position: {
    x: number
    y: number
  }
  createdAt: Date
  updatedAt: Date
}

export interface CreateRoleInput {
  title: string
  purpose: string
  accountabilities: string[]
  assignee: string
  position: {
    x: number
    y: number
  }
}

export interface UpdateRoleInput {
  id: string
  title?: string
  purpose?: string
  accountabilities?: string[]
  assignee?: string
  position?: {
    x: number
    y: number
  }
}

export interface ShareToken {
  id: string
  ownerId: string
  token: string
  createdAt: Date
} 