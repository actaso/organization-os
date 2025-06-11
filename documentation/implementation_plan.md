## Implementation Plan & Timeline

### Phase 1: Foundation (Weeks 1–2)

* **Week 1**:

  * Scaffold Next.js project with App Router
  * Integrate Tailwind + shadcn/ui
  * Configure Google OAuth authentication and Firestore SDK
  * Create authentication wrapper and protected routes
* **Week 2**:

  * Define Firestore schema
  * Implement API Routes `/api/roles` (GET, POST)
  * Set up TanStack Query hooks (`useRoles`, `useCreateRole`)
  * Write unit tests for API handlers

### Phase 2: Core Canvas (Weeks 3–4)

* **Week 3**:

  * Integrate React Flow; configure default layout
  * Develop `RoleNode` component (display fields)
  * Enable create/delete with dummy data
* **Week 4**:

  * Connect `RoleNode` to real data via React Query
  * Implement drag-&-drop → update position API
  * Add pan/zoom controls; toolbar UI

### Phase 3: Role Management (Weeks 5–6)

* **Week 5**:

  * Build `RoleFormModal` for create/edit
  * Integrate Template Picker sidebar
  * API hooks: `useUpdateRole`, `useDeleteRole`
* **Week 6**:

  * Wire up template import
  * Add loading/error states
  * Write unit tests for form & template components

### Phase 4: Sharing & Polishing (Weeks 7–8)

* **Week 7**:

  * Implement `/api/share` and token logic
  * Create `/view/[token]` page (read-only React Flow)
  * E2E tests for share flow (Playwright)
* **Week 8**:

  * Final UI polish (responsive design)
  * Setup GitHub Actions for CI; Vercel integration
  * Write project documentation & README

### Branch & Release Strategy

* **Branches**: `main` for prod, `develop` for integration, feature branches per ticket
* **PR Reviews**: Mandatory reviews; automated lint/tests
* **Releases**: Tag `v0.x` on main; auto-deploy via Vercel

> This detailed scope and plan should guide the AI engineer through MVP delivery while ensuring best practices, maintainability, and a clear path for future enhancements.
