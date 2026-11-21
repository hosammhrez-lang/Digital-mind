# Security Specification & Hardening Audit — Digital Minds CMS

## Phase 0: Data Invariants

1. **Homepage Settings (`/site_settings/homepage`)**:
   - Only verified administrators (`isAdmin()`) may create or update homepage configuration.
   - Public visitors may only `get` `/site_settings/homepage` when `isPublished == true`.
   - `ownerId`, `createdAt`, `updatedAt`, and `updatedBy` must match authenticated actor and server timestamp `request.time`.
2. **Magazine Articles (`/articles/{articleId}`)**:
   - Document IDs must match `^[a-zA-Z0-9_\-]+$` (<= 128 chars).
   - Only verified admins can create, edit, publish/unpublish, or delete articles.
   - Public `list` queries are strictly constrained to `existing().isPublished == true` unless executed by the verified bootstrapped admin.
3. **School News Dispatches (`/school_news/{newsId}`)**:
   - Only verified admins can create, edit, or delete dispatches; `publishedDate` must follow `YYYY-MM-DD`.
   - Public `list`/`get` access only reads documents where `isPublished == true`.
4. **Student Showcase Submissions (`/submissions/{submissionId}`)**:
   - Any signed-in user with a verified email (`email_verified == true`) may create a submission with `ownerId == request.auth.uid`, `votes == 1`, and `isFeatured == false`.
   - Non-admin users can only increment `votes` by `+1` on published submissions (`affectedKeys().hasOnly(['votes', 'updatedAt'])`).
   - Only admins can toggle `isFeatured`, `isPublished`, edit other fields, or delete entries.
5. **Admins (`/admins/{adminUid}`)**:
   - Contains admin email PII — blanket reads are forbidden. Only the document owner (`uid == adminUid`) or an existing verified admin can read; only admins can create/delete.

## Phase 0: The "Dirty Dozen" Adversarial Payloads

1. Unauthenticated write to `/site_settings/homepage` -> **PERMISSION_DENIED**
2. Non-admin verified user attempts to modify `/site_settings/homepage` -> **PERMISSION_DENIED**
3. Email spoofing attack where `token.email == 'hosammhrez@gmail.com'` but `email_verified == false` -> **PERMISSION_DENIED**
4. Shadow field injection (`isSuperAdmin: true`) inside `/articles/new-art` create -> **PERMISSION_DENIED** (`hasOnly` check)
5. Document ID poisoning (`../evil` or 500-char string) in `/articles/{articleId}` -> **PERMISSION_DENIED** (`isValidId`)
6. Client-forged timestamp (`createdAt != request.time`) on `/school_news/{id}` create -> **PERMISSION_DENIED**
7. Student creating `/submissions/{id}` with forged `ownerId` belonging to another user -> **PERMISSION_DENIED**
8. Student creating `/submissions/{id}` with pre-boosted `votes: 9999` or `isFeatured: true` -> **PERMISSION_DENIED**
9. Student tampering with `title` during an upvote action -> **PERMISSION_DENIED** (`affectedKeys().hasOnly(['votes', 'updatedAt'])`)
10. Attacker mutating immutable `ownerId` or `createdAt` on update -> **PERMISSION_DENIED**
11. Unauthenticated or non-admin user reading `/admins` collection (PII leak test) -> **PERMISSION_DENIED**
12. Oversized array (`goalsAr.size() > 10`) or oversized string (`summary.size() > 1200`) payload -> **PERMISSION_DENIED**

## Phase 5: Red Team Conflict Report

- **Identity Spoofing**: Closed via `request.auth.uid == incoming().ownerId` on submission creation and `isBootstrappedAdmin()` requiring `request.auth.token.email_verified == true`.
- **State Shortcutting**: Closed via enforcing initial state (`votes == 1`, `isFeatured == false`) for non-admin creators and action-scoped `affectedKeys().hasOnly(['votes', 'updatedAt'])` + `incoming().votes == existing().votes + 1` on upvote updates.
- **Resource Poisoning**: Closed via `isValidId()` on all document paths and `.size()` caps on every string and array property.
- **PII Isolation**: Closed on `/admins/{adminUid}` by restricting `get` to owner or admin and `list` to verified admins only.
