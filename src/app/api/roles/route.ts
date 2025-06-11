import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy,
  Timestamp 
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { CreateRoleInput, Role } from '@/lib/types'

// GET /api/roles - Fetch all roles for the authenticated user
export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rolesQuery = query(
      collection(db, 'roles'),
      where('ownerId', '==', userId),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(rolesQuery)
    const roles: Role[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      roles.push({
        id: doc.id,
        ownerId: data.ownerId,
        title: data.title,
        purpose: data.purpose,
        accountabilities: data.accountabilities,
        assignee: data.assignee,
        position: data.position,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      })
    })

    return NextResponse.json({ roles })
  } catch (error) {
    console.error('Error fetching roles:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/roles - Create a new role
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: CreateRoleInput = await request.json()

    // Validate required fields
    if (!body.title || !body.purpose) {
      return NextResponse.json(
        { error: 'Title and purpose are required' },
        { status: 400 }
      )
    }

    const now = Timestamp.now()
    const roleData = {
      ownerId: userId,
      title: body.title,
      purpose: body.purpose,
      accountabilities: body.accountabilities || [],
      assignee: body.assignee || '',
      position: body.position || { x: 0, y: 0 },
      createdAt: now,
      updatedAt: now,
    }

    const docRef = await addDoc(collection(db, 'roles'), roleData)

    const newRole: Role = {
      id: docRef.id,
      ownerId: userId,
      title: body.title,
      purpose: body.purpose,
      accountabilities: body.accountabilities || [],
      assignee: body.assignee || '',
      position: body.position || { x: 0, y: 0 },
      createdAt: now.toDate(),
      updatedAt: now.toDate(),
    }

    return NextResponse.json({ role: newRole }, { status: 201 })
  } catch (error) {
    console.error('Error creating role:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 