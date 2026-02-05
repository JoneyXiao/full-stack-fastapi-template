# Data Model: Resources View Redesign

**Feature**: `010-resources-view-redesign`
**Date**: 2026-02-04

## Overview

This feature adds optional image support to resources (uploaded image or external image URL, mutually exclusive) and ensures list responses include `likes_count` to support the redesigned Grid/List views.

## Entities

### Resource (existing, extended)

Represents a curated resource item.

**Existing key attributes (already present)**
- `id`
- `title`
- `description`
- `destination_url`
- `category_id` (optional)
- `is_published`
- `created_at`, `updated_at`

**Existing derived/public attributes (already present)**
- `category_name` (denormalized for convenience)
- `likes_count` (currently available on detail responses)

**New attributes (this feature)**

1) External image URL (stored in DB)
- `image_external_url` (optional)
  - Validation: must be an `http`/`https` URL; max length 2048.

2) Uploaded image metadata (stored in DB; bytes stored on filesystem)
- `image_key` (optional)
- `image_version` (integer, starts at 0)
- `image_content_type` (optional)
- `image_updated_at` (optional)

3) Public/computed image attribute (returned via API)
- `image_url` (optional)
  - If `image_external_url` is set, `image_url` equals that external URL.
  - If uploaded metadata is present, `image_url` is the versioned API URL.

**Invariants / business rules**
- Mutual exclusivity: a resource must not have both `image_external_url` and an uploaded image (`image_key`/`image_content_type`) set at the same time.
- Replacement semantics: setting one image source clears the other.

## Relationships

- Resource ↔ Category: many resources to one category (optional).
- Resource ↔ Like: one-to-many (existing).

## API-facing model changes

- List responses must include:
  - `likes_count` for each resource
  - `image_url` (optional)

## Migration impact

- Add new nullable columns to the `resource` table for image fields.
- Backfill: none required (all new fields nullable).
