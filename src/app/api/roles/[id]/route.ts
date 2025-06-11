import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  Timestamp 
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { UpdateRoleInput } from '@/lib/types'

// PUT /api/roles/[id] - Update a role
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    const { id } = await params
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: UpdateRoleInput = await request.json()

    // Get the role to check ownership
    const roleRef = doc(db, 'roles', id)
    const roleDoc = await getDoc(roleRef)

    if (!roleDoc.exists()) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }

    const roleData = roleDoc.data()
    if (roleData.ownerId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: Timestamp.now()
    }

    if (body.title !== undefined) updateData.title = body.title
    if (body.purpose !== undefined) updateData.purpose = body.purpose
    if (body.accountabilities !== undefined) updateData.accountabilities = body.accountabilities
    if (body.assignee !== undefined) updateData.assignee = body.assignee
    if (body.position !== undefined) updateData.position = body.position

    await updateDoc(roleRef, updateData)

    // Get updated document
    const updatedDoc = await getDoc(roleRef)
    const updatedData = updatedDoc.data()!

    const updatedRole = {
      id: updatedDoc.id,
      ownerId: updatedData.ownerId,
      title: updatedData.title,
      purpose: updatedData.purpose,
      accountabilities: updatedData.accountabilities,
      assignee: updatedData.assignee,
      position: updatedData.position,
      createdAt: updatedData.createdAt.toDate(),
      updatedAt: updatedData.updatedAt.toDate(),
    }

    return NextResponse.json({ role: updatedRole })
  } catch (error) {
    console.error('Error updating role:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/roles/[id] - Delete a role
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    const { id } = await params
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the role to check ownership
    const roleRef = doc(db, 'roles', id)
    const roleDoc = await getDoc(roleRef)

    if (!roleDoc.exists()) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }

    const roleData = roleDoc.data()
    if (roleData.ownerId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await deleteDoc(roleRef)

    return NextResponse.json({ message: 'Role deleted successfully' })
  } catch (error) {
    console.error('Error deleting role:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 