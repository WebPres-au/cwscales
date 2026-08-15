#!/usr/bin/env bash
set -euo pipefail

umask 077

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP_DIRECTORY="$PROJECT_ROOT/local-backups/supabase/$BACKUP_TIMESTAMP"
STORAGE_DIRECTORY="$BACKUP_DIRECTORY/storage"
STORAGE_JOBS="${SUPABASE_STORAGE_BACKUP_JOBS:-4}"
BACKUP_ATTEMPTS="${SUPABASE_BACKUP_ATTEMPTS:-3}"

mkdir -p "$BACKUP_DIRECTORY" "$STORAGE_DIRECTORY"
printf 'Backup did not complete.\n' > "$BACKUP_DIRECTORY/INCOMPLETE"

retry_command() {
  local attempt=1
  local delay_seconds=3

  while true; do
    if "$@"; then
      return 0
    fi

    if [ "$attempt" -ge "$BACKUP_ATTEMPTS" ]; then
      echo "Command failed after $attempt attempts." >&2
      return 1
    fi

    echo "Command interrupted; retrying in $delay_seconds seconds ($attempt/$BACKUP_ATTEMPTS)..." >&2
    sleep "$delay_seconds"
    attempt=$((attempt + 1))
    delay_seconds=$((delay_seconds * 2))
  done
}

dump_to_file() {
  local target_file="$1"
  shift
  local attempt=1
  local delay_seconds=3

  while true; do
    rm -f "$target_file"

    if "$PROJECT_ROOT/supa" db dump \
      --linked \
      "$@" \
      --file "$target_file"; then
      return 0
    fi

    if [ "$attempt" -ge "$BACKUP_ATTEMPTS" ]; then
      echo "Database dump failed after $attempt attempts: $target_file" >&2
      return 1
    fi

    echo "Database connection interrupted; retrying in $delay_seconds seconds ($attempt/$BACKUP_ATTEMPTS)..." >&2
    sleep "$delay_seconds"
    attempt=$((attempt + 1))
    delay_seconds=$((delay_seconds * 2))
  done
}

capture_bucket_list() {
  local target_file="$1"
  local temporary_file="${target_file}.tmp"
  local attempt=1
  local delay_seconds=3

  while true; do
    rm -f "$temporary_file"

    if "$PROJECT_ROOT/supa" storage ls \
      ss:/// \
      --linked \
      --experimental \
      > "$temporary_file"; then
      mv "$temporary_file" "$target_file"
      return 0
    fi

    if [ "$attempt" -ge "$BACKUP_ATTEMPTS" ]; then
      rm -f "$temporary_file"
      echo "Storage bucket discovery failed after $attempt attempts." >&2
      return 1
    fi

    echo "Storage connection interrupted; retrying in $delay_seconds seconds ($attempt/$BACKUP_ATTEMPTS)..." >&2
    sleep "$delay_seconds"
    attempt=$((attempt + 1))
    delay_seconds=$((delay_seconds * 2))
  done
}

echo "Creating local Supabase backup in: $BACKUP_DIRECTORY"

dump_to_file "$BACKUP_DIRECTORY/roles.sql" --role-only

dump_to_file "$BACKUP_DIRECTORY/schema.sql"

dump_to_file "$BACKUP_DIRECTORY/data.sql" \
  --data-only \
  --use-copy

echo "Discovering Storage buckets..."

capture_bucket_list "$BACKUP_DIRECTORY/storage-buckets.txt"

while IFS= read -r bucket_path; do
  bucket_name="${bucket_path%/}"

  if [ -z "$bucket_name" ]; then
    continue
  fi

  if [[ ! "$bucket_name" =~ ^[A-Za-z0-9][A-Za-z0-9._-]*$ ]]; then
    echo "Refusing unexpected Storage bucket name: $bucket_path" >&2
    exit 1
  fi

  echo "Downloading Storage bucket: $bucket_name"

  retry_command "$PROJECT_ROOT/supa" storage cp \
    --recursive \
    "ss:///$bucket_name" \
    "$STORAGE_DIRECTORY/$bucket_name" \
    --linked \
    --experimental \
    --jobs "$STORAGE_JOBS"
done < "$BACKUP_DIRECTORY/storage-buckets.txt"

(
  cd "$BACKUP_DIRECTORY"
  find . -type f ! -name SHA256SUMS ! -name INCOMPLETE ! -name BACKUP_COMPLETE \
    -exec shasum -a 256 {} + \
    | LC_ALL=C sort > SHA256SUMS
)

rm "$BACKUP_DIRECTORY/INCOMPLETE"
printf 'Backup completed at %s.\n' "$BACKUP_TIMESTAMP" > "$BACKUP_DIRECTORY/BACKUP_COMPLETE"
chmod -R go-rwx "$BACKUP_DIRECTORY"

echo "Backup complete."
echo "Files: roles.sql, schema.sql, data.sql, storage/, SHA256SUMS"
echo "This directory is excluded from Git by /local-backups/."
