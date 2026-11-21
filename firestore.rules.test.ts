import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Phase 0 Security Rules Contract & Invariant Verification Suite
 * Verifies that every collection in firebase-blueprint.json is protected in DRAFT_firestore.rules / firestore.rules
 * and validates the Dirty Dozen security assertions against our rules structure.
 */
const rootDir = path.resolve(process.cwd());
const blueprint = JSON.parse(fs.readFileSync(path.join(rootDir, 'firebase-blueprint.json'), 'utf-8'));
const rulesPath = fs.existsSync(path.join(rootDir, 'firestore.rules'))
  ? path.join(rootDir, 'firestore.rules')
  : path.join(rootDir, 'DRAFT_firestore.rules');
const rulesText = fs.readFileSync(rulesPath, 'utf-8');

test('All blueprint collections have matching hardened rule blocks', () => {
  const collections = Object.keys(blueprint.firestore);
  assert.ok(collections.length >= 5);
  for (const colPath of collections) {
    const baseName = colPath.split('/')[1];
    assert.ok(
      rulesText.includes(`match /${baseName}/`),
      `Missing match block for collection /${baseName}`
    );
  }
});

test('Rules enforce Eight Pillars invariants (catch-all deny, email_verified, size bounds, request.time)', () => {
  assert.ok(rulesText.includes("rules_version = '2';"));
  assert.ok(rulesText.includes('match /{document=**} {\n      allow read, write: if false;\n    }'));
  assert.ok(rulesText.includes('request.auth.token.email_verified == true'));
  assert.ok(rulesText.includes("request.auth.token.email == 'hosammhrez@gmail.com'"));
  assert.ok(rulesText.includes('isValidId('));
  assert.ok(rulesText.includes('request.time'));
  assert.ok(rulesText.includes('affectedKeys().hasOnly('));
  assert.ok(!rulesText.includes('allow read: if isSignedIn()'));
  assert.ok(!rulesText.includes('allow list: if isSignedIn()'));
});
