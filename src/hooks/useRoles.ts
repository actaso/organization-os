import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Role, CreateRoleInput, UpdateRoleInput } from '@/lib/types'

// Fetch all roles for the authenticated user
export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: async (): Promise<Role[]> => {
      const response = await fetch('/api/roles')
      if (!response.ok) {
        throw new Error('Failed to fetch roles')
      }
      const data = await response.json()
      return data.roles
    },
  })
}

// Create a new role
export function useCreateRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (roleData: CreateRoleInput): Promise<Role> => {
      const response = await fetch('/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create role')
      }

      const data = await response.json()
      return data.role
    },
    onSuccess: () => {
      // Invalidate and refetch roles
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })
}

// Update an existing role
export function useUpdateRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (roleData: UpdateRoleInput): Promise<Role> => {
      const { id, ...updateData } = roleData
      const response = await fetch(`/api/roles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update role')
      }

      const data = await response.json()
      return data.role
    },
    onSuccess: () => {
      // Invalidate and refetch roles
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })
}

// Delete a role
export function useDeleteRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (roleId: string): Promise<void> => {
      const response = await fetch(`/api/roles/${roleId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete role')
      }
    },
    onSuccess: () => {
      // Invalidate and refetch roles
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })
} 