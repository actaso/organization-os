## Scope Document for Organization OS

### 1. Project Overview

**Organization OS** is a Next.js + React application deployed on Vercel that enables founders to visually map and manage company roles, purposes, accountabilities, and assignments on a canvas interface. The MVP is a single-user product without real-time collaboration, versioning, or external integrations.

### 2. Objectives

* Enable founders to create, edit, delete, and arrange *Roles* on a zoomable/pannable canvas.
* Roles consist of:

  * **Title** (string)
  * **Purpose** (string)
  * **Accountabilities** (array of strings)
  * **Assignee** (simple text input for MVP)
* Provide a set of 5–10 starter role templates for quick onboarding.
* Allow generation of a read-only "view link" for stakeholders.
* Persist data in Firestore; secure via NextAuth.
* Follow best practices: Next.js (App Router), TanStack Query for data fetching, React Flow for canvas, Tailwind + shadcn/ui for styling.

### 3. Features & User Stories

| Feature             | User Story                                                 | Acceptance Criteria                                                 |
| ------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------- |
| Role CRUD           | As a founder, I can add/edit/delete roles on my canvas.    | Roles appear/disappear; edits persist after reload.                 |
| Canvas Navigation   | As a founder, I can pan and zoom the canvas.               | Canvas supports smooth pan & zoom; roles maintain positions.        |
| Starter Templates   | As a founder, I can select from predefined role templates. | Template picker lists 5–10 roles; clicking imports a new role node. |
| Read-Only View Link | As a founder, I can share a link with stakeholders.        | Visiting `/view/[token]` shows canvas in read-only mode.            |
| Persisted Storage   | As a founder, my data is saved and reloaded.               | Roles persist in Firestore under my user account.                   |

### 4. Non-Functional Requirements

* **Performance**: Canvas operations remain smooth up to 50 roles.
* **Scalability**: Firestore schema optimized for quick fetch/update.
* **Maintainability**: Clean code structure, well-documented, unit/E2E tests.
* **Security**: User data protected by Google OAuth; view links use simple public tokens.
* **Deployment**: Automated CI pipeline on Vercel for preview & prod.

### 5. Data Model (Firestore)

```js
// users collection
users/{userId} {
  email: string,
  name?: string,
  createdAt: timestamp
}

// roles collection
oles/{roleId} {
  ownerId: string,        // FK → users/userId
  title: string,
  purpose: string,
  accountabilities: string[],
  assignee: string,
  position: { x: number, y: number },
  createdAt: timestamp,
  updatedAt: timestamp
}

// shares collection
shares/{shareId} {
  ownerId: string,
  token: string,
  createdAt: timestamp
}
```

### 6. Architecture & Tech Stack

* **Framework**: Next.js (App Router) on Vercel
* **UI**: React + Tailwind CSS + shadcn/ui
* **Canvas**: React Flow
* **Data Fetching**: TanStack Query
* **Auth**: Google OAuth (via NextAuth.js or Clerk)
* **Database**: Firestore
* **State**: Local canvas state + React Context for selection, React Flow handles layout
* **API**: Next.js API Routes with CRUD for roles & share tokens
* **Testing**: Jest + React Testing Library, Playwright for E2E
* **CI/CD**: GitHub Actions → Vercel previews & production

### 7. Deliverables & Acceptance Criteria

1. **Auth Setup**: Google OAuth configured; protected dashboard route.
2. **Firestore Integration**: Role data CRUD endpoints; TanStack Query hooks.
3. **Canvas UI**: React Flow with custom `RoleNode`; pan/zoom; drag-&-drop.
4. **Role Form**: Modal for create/edit; binds to API via React Query.
5. **Template Picker**: Sidebar importing starter roles.
6. **Share Link**: API for token gen + `/view/[token]` read-only canvas.
7. **Testing**: Unit tests ≥80% coverage on core components; basic E2E flows.
8. **Deployment**: Automated deploys; environment variable docs.