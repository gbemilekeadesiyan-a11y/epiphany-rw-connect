#!/usr/bin/env bash
# Cleans Lovable out of the git history of epiphany-rw-connect.
#
# It does three things:
#   1. Changes the author of the 62 bot commits to you
#   2. Deletes the hidden "X-Lovable-Edit-ID:" lines
#   3. Fixes the two messages that say "Lovable" out loud
#
# It does NOT touch the "Co-authored-by: oteniyatobi" lines.
# It does NOT push anything. You do that yourself, later, when you're ready.

set -euo pipefail

BOT_EMAIL="159125892+gpt-engineer-app[bot]@users.noreply.github.com"
YOUR_NAME="Oluwagbemileke Adesiyan"
YOUR_EMAIL="gbemilekeadesiyan@gmail.com"

# --- Safety check: stop if you have edits to files git is already tracking.
# New files that git doesn't know about yet (like this script) are fine.
if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "You have unsaved edits to existing files. Commit them first, then re-run."
  exit 1
fi

# --- Safety net: remember exactly where we are right now.
# We create the backup branch AFTER the rewrite. If we made it first, the
# rewrite would rewrite the backup too, which defeats the point.
ORIGINAL=$(git rev-parse HEAD)
echo "Original history saved at commit $ORIGINAL"

export FILTER_BRANCH_SQUELCH_WARNING=1

git filter-branch -f \
  --env-filter "
    if [ \"\$GIT_AUTHOR_EMAIL\" = \"$BOT_EMAIL\" ]; then
      export GIT_AUTHOR_NAME=\"$YOUR_NAME\"
      export GIT_AUTHOR_EMAIL=\"$YOUR_EMAIL\"
    fi
    if [ \"\$GIT_COMMITTER_EMAIL\" = \"$BOT_EMAIL\" ]; then
      export GIT_COMMITTER_NAME=\"$YOUR_NAME\"
      export GIT_COMMITTER_EMAIL=\"$YOUR_EMAIL\"
    fi" \
  --msg-filter '
    sed -e "/^X-Lovable-Edit-ID:/d" \
        -e "s/^\[skip lovable\] //" \
        -e "s/Connected to Lovable Cloud/Connected to Supabase backend/"' \
  --tag-name-filter cat -- --branches --tags

git branch -f backup-before-rewrite "$ORIGINAL"

echo
echo "================ DONE (locally only) ================"
echo "Authors are now:"
git log --format='%an' | sort | uniq -c
echo
echo "Lovable mentions left in messages:"
git log --format='%B' | grep -ci "lovable" || echo "  0 - clean"
echo
echo "Nothing has been sent to GitHub yet."
echo
echo "  To undo:    git reset --hard backup-before-rewrite"
echo "  To publish: git push --force-with-lease origin main"
