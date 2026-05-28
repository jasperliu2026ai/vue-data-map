#!/usr/bin/env bash
# release.sh — push code and tag v0.1.0 to GitHub.
#
# Prerequisites (do these once in the browser):
#   1. Create repo: https://github.com/new  (Owner=jasperliu2026ai, Name=vue-data-map, Public, NO README/.gitignore/license)
#   2. Add Secret:   https://github.com/jasperliu2026ai/vue-data-map/settings/secrets/actions/new
#                    Name=NPM_TOKEN  Value=<your npm Automation token>
#
# Then run from the repo root:   bash scripts/release.sh

set -euo pipefail

REPO_URL="https://github.com/jasperliu2026ai/vue-data-map.git"
REPO_PAGE="https://github.com/jasperliu2026ai/vue-data-map"
TAG="v0.1.0"

echo "==> Verifying GitHub repo exists..."
HTTP=$(curl -fsS -o /dev/null -w "%{http_code}" "$REPO_PAGE" || true)
if [[ "$HTTP" != "200" ]]; then
  echo "❌ Repo not found at $REPO_PAGE  (HTTP $HTTP)"
  echo "   Please create it first: https://github.com/new"
  exit 1
fi
echo "✓ repo reachable"

echo "==> Configuring git remote..."
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi
git remote -v

echo "==> Pushing main branch..."
git push -u origin main

echo "==> Tagging $TAG and pushing tag..."
if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "tag $TAG already exists locally — skipping create"
else
  git tag "$TAG"
fi
git push origin "$TAG"

echo
echo "✅ Done. Watch the publish workflow:"
echo "   $REPO_PAGE/actions"
echo "After it finishes, your package will be live at:"
echo "   https://www.npmjs.com/package/vue-data-map"
