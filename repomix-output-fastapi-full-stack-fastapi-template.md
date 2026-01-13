This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where security check has been disabled.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.copier/
  .copier-answers.yml.jinja
  update_dotenv.py
.github/
  DISCUSSION_TEMPLATE/
    questions.yml
  ISSUE_TEMPLATE/
    config.yml
    privileged.yml
  workflows/
    add-to-project.yml
    deploy-production.yml
    deploy-staging.yml
    detect-conflicts.yml
    generate-client.yml
    issue-manager.yml
    labeler.yml
    latest-changes.yml
    playwright.yml
    pre-commit.yml
    smokeshow.yml
    test-backend.yml
    test-docker-compose.yml
  dependabot.yml
  FUNDING.yml
  labeler.yml
backend/
  app/
    alembic/
      versions/
        .keep
        1a31ce608336_add_cascade_delete_relationships.py
        9c0a54914c78_add_max_length_for_string_varchar_.py
        d98dd8ec85a3_edit_replace_id_integers_in_all_models_.py
        e2412789c190_initialize_models.py
      env.py
      README
      script.py.mako
    api/
      routes/
        __init__.py
        items.py
        login.py
        private.py
        users.py
        utils.py
      __init__.py
      deps.py
      main.py
    core/
      __init__.py
      config.py
      db.py
      security.py
    email-templates/
      build/
        new_account.html
        reset_password.html
        test_email.html
      src/
        new_account.mjml
        reset_password.mjml
        test_email.mjml
    __init__.py
    backend_pre_start.py
    crud.py
    initial_data.py
    main.py
    models.py
    tests_pre_start.py
    utils.py
  scripts/
    format.sh
    lint.sh
    prestart.sh
    test.sh
    tests-start.sh
  tests/
    api/
      routes/
        __init__.py
        test_items.py
        test_login.py
        test_private.py
        test_users.py
      __init__.py
    crud/
      __init__.py
      test_user.py
    scripts/
      __init__.py
      test_backend_pre_start.py
      test_test_pre_start.py
    utils/
      __init__.py
      item.py
      user.py
      utils.py
    __init__.py
    conftest.py
  .dockerignore
  .gitignore
  alembic.ini
  Dockerfile
  pyproject.toml
  README.md
frontend/
  public/
    assets/
      images/
        fastapi-icon-light.svg
        fastapi-icon.svg
        fastapi-logo-light.svg
        fastapi-logo.svg
        favicon.png
  src/
    client/
      core/
        ApiError.ts
        ApiRequestOptions.ts
        ApiResult.ts
        CancelablePromise.ts
        OpenAPI.ts
        request.ts
      index.ts
      schemas.gen.ts
      sdk.gen.ts
      types.gen.ts
    components/
      Admin/
        AddUser.tsx
        columns.tsx
        DeleteUser.tsx
        EditUser.tsx
        UserActionsMenu.tsx
      Common/
        Appearance.tsx
        AuthLayout.tsx
        DataTable.tsx
        ErrorComponent.tsx
        Footer.tsx
        Logo.tsx
        NotFound.tsx
      Items/
        AddItem.tsx
        columns.tsx
        DeleteItem.tsx
        EditItem.tsx
        ItemActionsMenu.tsx
      Pending/
        PendingItems.tsx
        PendingUsers.tsx
      Sidebar/
        AppSidebar.tsx
        Main.tsx
        User.tsx
      ui/
        alert.tsx
        avatar.tsx
        badge.tsx
        button-group.tsx
        button.tsx
        card.tsx
        checkbox.tsx
        dialog.tsx
        dropdown-menu.tsx
        form.tsx
        input.tsx
        label.tsx
        loading-button.tsx
        pagination.tsx
        password-input.tsx
        select.tsx
        separator.tsx
        sheet.tsx
        sidebar.tsx
        skeleton.tsx
        sonner.tsx
        table.tsx
        tabs.tsx
        tooltip.tsx
      UserSettings/
        ChangePassword.tsx
        DeleteAccount.tsx
        DeleteConfirmation.tsx
        UserInformation.tsx
      theme-provider.tsx
    hooks/
      useAuth.ts
      useCopyToClipboard.ts
      useCustomToast.ts
      useMobile.ts
    lib/
      utils.ts
    routes/
      _layout/
        admin.tsx
        index.tsx
        items.tsx
        settings.tsx
      __root.tsx
      _layout.tsx
      login.tsx
      recover-password.tsx
      reset-password.tsx
      signup.tsx
    index.css
    main.tsx
    routeTree.gen.ts
    utils.ts
    vite-env.d.ts
  tests/
    utils/
      mailcatcher.ts
      privateApi.ts
      random.ts
      user.ts
    auth.setup.ts
    config.ts
    login.spec.ts
    reset-password.spec.ts
    sign-up.spec.ts
    user-settings.spec.ts
  .dockerignore
  .env
  .gitignore
  .nvmrc
  biome.json
  components.json
  Dockerfile
  Dockerfile.playwright
  index.html
  nginx-backend-not-found.conf
  nginx.conf
  openapi-ts.config.ts
  package.json
  playwright.config.ts
  README.md
  tsconfig.build.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
hooks/
  post_gen_project.py
img/
  dashboard-dark.png
  dashboard-items.png
  dashboard.png
  docs.png
  github-social-preview.png
  github-social-preview.svg
  login.png
scripts/
  build-push.sh
  build.sh
  deploy.sh
  generate-client.sh
  test-local.sh
  test.sh
.gitattributes
.gitignore
.pre-commit-config.yaml
copier.yml
deployment.md
development.md
docker-compose.override.yml
docker-compose.traefik.yml
docker-compose.yml
LICENSE
README.md
release-notes.md
SECURITY.md
```

# Files

## File: .copier/.copier-answers.yml.jinja
````jinja
{{ _copier_answers|to_json -}}
````

## File: .copier/update_dotenv.py
````python
from pathlib import Path
import json

# Update the .env file with the answers from the .copier-answers.yml file
# without using Jinja2 templates in the .env file, this way the code works as is
# without needing Copier, but if Copier is used, the .env file will be updated
root_path = Path(__file__).parent.parent
answers_path = Path(__file__).parent / ".copier-answers.yml"
answers = json.loads(answers_path.read_text())
env_path = root_path / ".env"
env_content = env_path.read_text()
lines = []
for line in env_content.splitlines():
    for key, value in answers.items():
        upper_key = key.upper()
        if line.startswith(f"{upper_key}="):
            if " " in value:
                content = f"{upper_key}={value!r}"
            else:
                content = f"{upper_key}={value}"
            new_line = line.replace(line, content)
            lines.append(new_line)
            break
    else:
        lines.append(line)
env_path.write_text("\n".join(lines))
````

## File: .github/DISCUSSION_TEMPLATE/questions.yml
````yaml
labels: [question]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for your interest in this project! 🚀

        Please follow these instructions, fill every question, and do every step. 🙏

        I'm asking this because answering questions and solving problems in GitHub is what consumes most of the time.

        I end up not being able to add new features, fix bugs, review pull requests, etc. as fast as I wish because I have to spend too much time handling questions.

        All that, on top of all the incredible help provided by a bunch of community members, that give a lot of their time to come here and help others.

        That's a lot of work, but if more users came to help others like them just a little bit more, it would be much less effort for them (and you and me 😅).

        By asking questions in a structured way (following this) it will be much easier to help you.

        And there's a high chance that you will find the solution along the way and you won't even have to submit it and wait for an answer. 😎

        As there are too many questions, I'll have to discard and close the incomplete ones. That will allow me (and others) to focus on helping people like you that follow the whole process and help us help you. 🤓
  - type: checkboxes
    id: checks
    attributes:
      label: First Check
      description: Please confirm and check all the following options.
      options:
        - label: I added a very descriptive title here.
          required: true
        - label: I used the GitHub search to find a similar question and didn't find it.
          required: true
        - label: I searched in the documentation/README.
          required: true
        - label: I already searched in Google "How to do X" and didn't find any information.
          required: true
        - label: I already read and followed all the tutorial in the docs/README and didn't find an answer.
          required: true
  - type: checkboxes
    id: help
    attributes:
      label: Commit to Help
      description: |
        After submitting this, I commit to one of:

          * Read open questions until I find 2 where I can help someone and add a comment to help there.
          * I already hit the "watch" button in this repository to receive notifications and I commit to help at least 2 people that ask questions in the future.

      options:
        - label: I commit to help with one of those options 👆
          required: true
  - type: textarea
    id: example
    attributes:
      label: Example Code
      description: |
        Please add a self-contained, [minimal, reproducible, example](https://stackoverflow.com/help/minimal-reproducible-example) with your use case.

        If I (or someone) can copy it, run it, and see it right away, there's a much higher chance I (or someone) will be able to help you.

      placeholder: |
        Write your example code here.
      render: Text
    validations:
      required: true
  - type: textarea
    id: description
    attributes:
      label: Description
      description: |
        What is the problem, question, or error?

        Write a short description telling me what you are doing, what you expect to happen, and what is currently happening.
      placeholder: |
        * Open the browser and call the endpoint `/`.
        * It returns a JSON with `{"message": "Hello World"}`.
        * But I expected it to return `{"message": "Hello Morty"}`.
    validations:
      required: true
  - type: dropdown
    id: os
    attributes:
      label: Operating System
      description: What operating system are you on?
      multiple: true
      options:
        - Linux
        - Windows
        - macOS
        - Other
    validations:
      required: true
  - type: textarea
    id: os-details
    attributes:
      label: Operating System Details
      description: You can add more details about your operating system here, in particular if you chose "Other".
    validations:
      required: true
  - type: input
    id: python-version
    attributes:
      label: Python Version
      description: |
        What Python version are you using?

        You can find the Python version with:

        ```bash
        python --version
        ```
    validations:
      required: true
  - type: textarea
    id: context
    attributes:
      label: Additional Context
      description: Add any additional context information or screenshots you think are useful.
````

## File: .github/ISSUE_TEMPLATE/config.yml
````yaml
blank_issues_enabled: false
contact_links:
  - name: Security Contact
    about: Please report security vulnerabilities to security@tiangolo.com
  - name: Question or Problem
    about: Ask a question or ask about a problem in GitHub Discussions.
    url: https://github.com/fastapi/full-stack-fastapi-template/discussions/categories/questions
  - name: Feature Request
    about: To suggest an idea or ask about a feature, please start with a question saying what you would like to achieve. There might be a way to do it already.
    url: https://github.com/fastapi/full-stack-fastapi-template/discussions/categories/questions
````

## File: .github/ISSUE_TEMPLATE/privileged.yml
````yaml
name: Privileged
description: You are @tiangolo or he asked you directly to create an issue here. If not, check the other options. 👇
body:
  - type: markdown
    attributes:
      value: |
        Thanks for your interest in this project! 🚀

        If you are not @tiangolo or he didn't ask you directly to create an issue here, please start the conversation in a [Question in GitHub Discussions](https://github.com/tiangolo/full-stack-fastapi-template/discussions/categories/questions) instead.
  - type: checkboxes
    id: privileged
    attributes:
      label: Privileged issue
      description: Confirm that you are allowed to create an issue here.
      options:
        - label: I'm @tiangolo or he asked me directly to create an issue here.
          required: true
  - type: textarea
    id: content
    attributes:
      label: Issue Content
      description: Add the content of the issue here.
````

## File: .github/workflows/add-to-project.yml
````yaml
name: Add to Project

on:
  pull_request_target:
  issues:
    types:
      - opened
      - reopened

jobs:
  add-to-project:
    name: Add to project
    runs-on: ubuntu-latest
    steps:
      - uses: actions/add-to-project@v1.0.2
        with:
          project-url: https://github.com/orgs/fastapi/projects/2
          github-token: ${{ secrets.PROJECTS_TOKEN }}
````

## File: .github/workflows/deploy-production.yml
````yaml
name: Deploy to Production

on:
  release:
    types:
      - published

jobs:
  deploy:
    # Do not deploy in the main repository, only in user projects
    if: github.repository_owner != 'fastapi'
    runs-on:
      - self-hosted
      - production
    env:
      ENVIRONMENT: production
      DOMAIN: ${{ secrets.DOMAIN_PRODUCTION }}
      STACK_NAME: ${{ secrets.STACK_NAME_PRODUCTION }}
      SECRET_KEY: ${{ secrets.SECRET_KEY }}
      FIRST_SUPERUSER: ${{ secrets.FIRST_SUPERUSER }}
      FIRST_SUPERUSER_PASSWORD: ${{ secrets.FIRST_SUPERUSER_PASSWORD }}
      SMTP_HOST: ${{ secrets.SMTP_HOST }}
      SMTP_USER: ${{ secrets.SMTP_USER }}
      SMTP_PASSWORD: ${{ secrets.SMTP_PASSWORD }}
      EMAILS_FROM_EMAIL: ${{ secrets.EMAILS_FROM_EMAIL }}
      POSTGRES_PASSWORD: ${{ secrets.POSTGRES_PASSWORD }}
      SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - run: docker compose -f docker-compose.yml --project-name ${{ secrets.STACK_NAME_PRODUCTION }} build
      - run: docker compose -f docker-compose.yml --project-name ${{ secrets.STACK_NAME_PRODUCTION }} up -d
````

## File: .github/workflows/deploy-staging.yml
````yaml
name: Deploy to Staging

on:
  push:
    branches:
      - master

jobs:
  deploy:
    # Do not deploy in the main repository, only in user projects
    if: github.repository_owner != 'fastapi'
    runs-on:
      - self-hosted
      - staging
    env:
      ENVIRONMENT: staging
      DOMAIN: ${{ secrets.DOMAIN_STAGING }}
      STACK_NAME: ${{ secrets.STACK_NAME_STAGING }}
      SECRET_KEY: ${{ secrets.SECRET_KEY }}
      FIRST_SUPERUSER: ${{ secrets.FIRST_SUPERUSER }}
      FIRST_SUPERUSER_PASSWORD: ${{ secrets.FIRST_SUPERUSER_PASSWORD }}
      SMTP_HOST: ${{ secrets.SMTP_HOST }}
      SMTP_USER: ${{ secrets.SMTP_USER }}
      SMTP_PASSWORD: ${{ secrets.SMTP_PASSWORD }}
      EMAILS_FROM_EMAIL: ${{ secrets.EMAILS_FROM_EMAIL }}
      POSTGRES_PASSWORD: ${{ secrets.POSTGRES_PASSWORD }}
      SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - run: docker compose -f docker-compose.yml --project-name ${{ secrets.STACK_NAME_STAGING }} build
      - run: docker compose -f docker-compose.yml --project-name ${{ secrets.STACK_NAME_STAGING }} up -d
````

## File: .github/workflows/detect-conflicts.yml
````yaml
name: "Conflict detector"
on:
  push:
  pull_request_target:
    types: [synchronize]

jobs:
  main:
    permissions:
      contents: read
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - name: Check if PRs have merge conflicts
        uses: eps1lon/actions-label-merge-conflict@v3
        with:
          dirtyLabel: "conflicts"
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          commentOnDirty: "This pull request has a merge conflict that needs to be resolved."
````

## File: .github/workflows/generate-client.yml
````yaml
name: Generate Client

on:
  pull_request:
    types:
    - opened
    - synchronize

jobs:
  generate-client:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    steps:
    # For PRs from forks
    - uses: actions/checkout@v6
    # For PRs from the same repo
    - uses: actions/checkout@v6
      if: ( github.event_name != 'pull_request' || github.secret_source == 'Actions' )
      with:
        ref: ${{ github.head_ref }}
        token: ${{ secrets.FULL_STACK_FASTAPI_TEMPLATE_REPO_TOKEN }}
    - uses: actions/setup-node@v6
      with:
        node-version: lts/*
    - uses: actions/setup-python@v6
      with:
        python-version: "3.10"
    - name: Install uv
      uses: astral-sh/setup-uv@v7
      with:
        version: "0.4.15"
        enable-cache: true
    - name: Install dependencies
      run: npm ci
      working-directory: frontend
    - run: uv sync
      working-directory: backend
    - run: uv run bash scripts/generate-client.sh
      env:
        VIRTUAL_ENV: backend/.venv
        SECRET_KEY: just-for-generating-client
        POSTGRES_PASSWORD: just-for-generating-client
        FIRST_SUPERUSER_PASSWORD: just-for-generating-client
    - name: Add changes to git
      run: |
        git config --local user.email "github-actions@github.com"
        git config --local user.name "github-actions"
        git add frontend/src/client
    # Same repo PRs
    - name: Push changes
      if: ( github.event_name != 'pull_request' || github.secret_source == 'Actions' )
      run: |
        git diff --staged --quiet || git commit -m "✨ Autogenerate frontend client"
        git push
    # Fork PRs
    - name: Check changes
      if: ( github.event_name == 'pull_request' && github.secret_source != 'Actions' )
      run: |
        git diff --staged --quiet || (echo "Changes detected in generated client, run scripts/generate-client.sh and commit the changes" && exit 1)
````

## File: .github/workflows/issue-manager.yml
````yaml
name: Issue Manager

on:
  schedule:
    - cron: "21 17 * * *"
  issue_comment:
    types:
      - created
  issues:
    types:
      - labeled
  pull_request_target:
    types:
      - labeled
  workflow_dispatch:

permissions:
  issues: write
  pull-requests: write

jobs:
  issue-manager:
    if: github.repository_owner == 'fastapi'
    runs-on: ubuntu-latest
    steps:
      - name: Dump GitHub context
        env:
          GITHUB_CONTEXT: ${{ toJson(github) }}
        run: echo "$GITHUB_CONTEXT"
      - uses: tiangolo/issue-manager@0.6.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          config: >
            {
              "answered": {
                "delay": 864000,
                "message": "Assuming the original need was handled, this will be automatically closed now. But feel free to add more comments or create new issues or PRs."
              },
              "waiting": {
                "delay": 2628000,
                "message": "As this PR has been waiting for the original user for a while but seems to be inactive, it's now going to be closed. But if there's anyone interested, feel free to create a new PR.",
                "reminder": {
                  "before": "P3D",
                  "message": "Heads-up: this will be closed in 3 days unless there's new activity."
                }
              },
              "invalid": {
                "delay": 0,
                "message": "This was marked as invalid and will be closed now. If this is an error, please provide additional details."
              }
            }
````

## File: .github/workflows/labeler.yml
````yaml
name: Labels
on:
  pull_request_target:
    types:
      - opened
      - synchronize
      - reopened
      # For label-checker
      - labeled
      - unlabeled

jobs:
  labeler:
    permissions:
      contents: read
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
    - uses: actions/labeler@v6
      if: ${{ github.event.action != 'labeled' && github.event.action != 'unlabeled' }}
    - run: echo "Done adding labels"
  # Run this after labeler applied labels
  check-labels:
    needs:
      - labeler
    permissions:
      pull-requests: read
    runs-on: ubuntu-latest
    steps:
      - uses: docker://agilepathway/pull-request-label-checker:latest
        with:
          one_of: breaking,security,feature,bug,refactor,upgrade,docs,lang-all,internal
          repo_token: ${{ secrets.GITHUB_TOKEN }}
````

## File: .github/workflows/latest-changes.yml
````yaml
name: Latest Changes

on:
  pull_request_target:
    branches:
      - master
    types:
      - closed
  workflow_dispatch:
    inputs:
      number:
        description: PR number
        required: true
      debug_enabled:
        description: "Run the build with tmate debugging enabled (https://github.com/marketplace/actions/debugging-with-tmate)"
        required: false
        default: "false"

jobs:
  latest-changes:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: read
    steps:
      - name: Dump GitHub context
        env:
          GITHUB_CONTEXT: ${{ toJson(github) }}
        run: echo "$GITHUB_CONTEXT"
      - uses: actions/checkout@v6
        with:
          # To allow latest-changes to commit to the main branch
          token: ${{ secrets.LATEST_CHANGES }}
      - uses: tiangolo/latest-changes@0.4.1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          latest_changes_file: ./release-notes.md
          latest_changes_header: "## Latest Changes"
          end_regex: "^## "
          debug_logs: true
          label_header_prefix: "### "
````

## File: .github/workflows/playwright.yml
````yaml
name: Playwright Tests

on:
  push:
    branches:
    - master
  pull_request:
    types:
    - opened
    - synchronize
  workflow_dispatch:
    inputs:
      debug_enabled:
        description: 'Run the build with tmate debugging enabled (https://github.com/marketplace/actions/debugging-with-tmate)'
        required: false
        default: 'false'

jobs:
  changes:
    runs-on: ubuntu-latest
    # Set job outputs to values from filter step
    outputs:
      changed: ${{ steps.filter.outputs.changed }}
    steps:
    - uses: actions/checkout@v6
    # For pull requests it's not necessary to checkout the code but for the main branch it is
    - uses: dorny/paths-filter@v3
      id: filter
      with:
        filters: |
          changed:
            - backend/**
            - frontend/**
            - .env
            - docker-compose*.yml
            - .github/workflows/playwright.yml

  test-playwright:
    needs:
      - changes
    if: ${{ needs.changes.outputs.changed == 'true' }}
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]
      fail-fast: false
    steps:
    - uses: actions/checkout@v6
    - uses: actions/setup-node@v6
      with:
        node-version: lts/*
    - uses: actions/setup-python@v6
      with:
        python-version: '3.10'
    - name: Setup tmate session
      uses: mxschmitt/action-tmate@v3
      if: ${{ github.event_name == 'workflow_dispatch' && github.event.inputs.debug_enabled == 'true' }}
      with:
        limit-access-to-actor: true
    - name: Install uv
      uses: astral-sh/setup-uv@v7
      with:
        version: "0.4.15"
        enable-cache: true
    - run: uv sync
      working-directory: backend
    - run: npm ci
      working-directory: frontend
    - run: uv run bash scripts/generate-client.sh
      env:
        VIRTUAL_ENV: backend/.venv
    - run: docker compose build
    - run: docker compose down -v --remove-orphans
    - name: Run Playwright tests
      run: docker compose run --rm playwright npx playwright test --fail-on-flaky-tests --trace=retain-on-failure --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
    - run: docker compose down -v --remove-orphans
    - name: Upload blob report to GitHub Actions Artifacts
      if: ${{ !cancelled() }}
      uses: actions/upload-artifact@v6
      with:
        name: blob-report-${{ matrix.shardIndex }}
        path: frontend/blob-report
        include-hidden-files: true
        retention-days: 1

  merge-playwright-reports:
    needs:
      - test-playwright
      - changes
    # Merge reports after playwright-tests, even if some shards have failed
    if: ${{ !cancelled() && needs.changes.outputs.changed == 'true' }}
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v6
    - uses: actions/setup-node@v6
      with:
        node-version: 20
    - name: Install dependencies
      run: npm ci
      working-directory: frontend
    - name: Download blob reports from GitHub Actions Artifacts
      uses: actions/download-artifact@v7
      with:
        path: frontend/all-blob-reports
        pattern: blob-report-*
        merge-multiple: true
    - name: Merge into HTML Report
      run: npx playwright merge-reports --reporter html ./all-blob-reports
      working-directory: frontend
    - name: Upload HTML report
      uses: actions/upload-artifact@v6
      with:
        name: html-report--attempt-${{ github.run_attempt }}
        path: frontend/playwright-report
        retention-days: 30
        include-hidden-files: true

  # https://github.com/marketplace/actions/alls-green#why
  alls-green-playwright:  # This job does nothing and is only used for the branch protection
    if: always()
    needs:
      - test-playwright
    runs-on: ubuntu-latest
    steps:
      - name: Decide whether the needed jobs succeeded or failed
        uses: re-actors/alls-green@release/v1
        with:
          jobs: ${{ toJSON(needs) }}
          allowed-skips: test-playwright
````

## File: .github/workflows/pre-commit.yml
````yaml
name: pre-commit

on:
  pull_request:
    types:
      - opened
      - synchronize

env:
  # Forks and Dependabot don't have access to secrets
  HAS_SECRETS: ${{ secrets.PRE_COMMIT != '' }}

jobs:
  pre-commit:
    runs-on: ubuntu-latest
    steps:
      - name: Dump GitHub context
        env:
          GITHUB_CONTEXT: ${{ toJson(github) }}
        run: echo "$GITHUB_CONTEXT"
      - uses: actions/checkout@v5
        name: Checkout PR for own repo
        if: env.HAS_SECRETS == 'true'
        with:
          # To be able to commit it needs to fetch the head of the branch, not the
          # merge commit
          ref: ${{ github.head_ref }}
          # And it needs the full history to be able to compute diffs
          fetch-depth: 0
          # A token other than the default GITHUB_TOKEN is needed to be able to trigger CI
          token: ${{ secrets.PRE_COMMIT }}
      # pre-commit lite ci needs the default checkout configs to work
      - uses: actions/checkout@v5
        name: Checkout PR for fork
        if: env.HAS_SECRETS == 'false'
        with:
        # To be able to commit it needs the head branch of the PR, the remote one
          ref: ${{ github.event.pull_request.head.sha }}
          fetch-depth: 0
      - name: Set up Python
        uses: actions/setup-python@v6
        with:
          python-version: "3.11"
      - name: Setup uv
        uses: astral-sh/setup-uv@v7
        with:
          cache-dependency-glob: |
            requirements**.txt
            pyproject.toml
            uv.lock
      - name: Install Dependencies
        run: uv sync
        working-directory: backend
      - name: Run prek - pre-commit
        id: precommit
        run: uvx prek run --from-ref origin/${GITHUB_BASE_REF} --to-ref HEAD --show-diff-on-failure
        continue-on-error: true
        working-directory: backend
      - name: Commit and push changes
        if: env.HAS_SECRETS == 'true'
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add -A
          if git diff --staged --quiet; then
            echo "No changes to commit"
          else
            git commit -m "🎨 Auto format"
            git push
          fi
      - uses: pre-commit-ci/lite-action@v1.1.0
        if: env.HAS_SECRETS == 'false'
        with:
          msg: 🎨 Auto format
      - name: Error out on pre-commit errors
        if: steps.precommit.outcome == 'failure'
        run: exit 1

  # https://github.com/marketplace/actions/alls-green#why
  pre-commit-alls-green:  # This job does nothing and is only used for the branch protection
    if: always()
    needs:
      - pre-commit
    runs-on: ubuntu-latest
    steps:
      - name: Dump GitHub context
        env:
          GITHUB_CONTEXT: ${{ toJson(github) }}
        run: echo "$GITHUB_CONTEXT"
      - name: Decide whether the needed jobs succeeded or failed
        uses: re-actors/alls-green@release/v1
        with:
          jobs: ${{ toJSON(needs) }}
````

## File: .github/workflows/smokeshow.yml
````yaml
name: Smokeshow

on:
  workflow_run:
    workflows: [Test Backend]
    types: [completed]

jobs:
  smokeshow:
    runs-on: ubuntu-latest
    permissions:
      actions: read
      statuses: write

    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-python@v6
        with:
          python-version: "3.13"
      - run: pip install smokeshow
      - uses: actions/download-artifact@v7
        with:
          name: coverage-html
          path: backend/htmlcov
          github-token: ${{ secrets.GITHUB_TOKEN }}
          run-id: ${{ github.event.workflow_run.id }}
      - run: smokeshow upload backend/htmlcov
        env:
          SMOKESHOW_GITHUB_STATUS_DESCRIPTION: Coverage {coverage-percentage}
          SMOKESHOW_GITHUB_COVERAGE_THRESHOLD: 90
          SMOKESHOW_GITHUB_CONTEXT: coverage
          SMOKESHOW_GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SMOKESHOW_GITHUB_PR_HEAD_SHA: ${{ github.event.workflow_run.head_sha }}
          SMOKESHOW_AUTH_KEY: ${{ secrets.SMOKESHOW_AUTH_KEY }}
````

## File: .github/workflows/test-backend.yml
````yaml
name: Test Backend

on:
  push:
    branches:
      - master
  pull_request:
    types:
      - opened
      - synchronize

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - name: Set up Python
        uses: actions/setup-python@v6
        with:
          python-version: "3.10"
      - name: Install uv
        uses: astral-sh/setup-uv@v7
        with:
          version: "0.4.15"
          enable-cache: true
      - run: docker compose down -v --remove-orphans
      - run: docker compose up -d db mailcatcher
      - name: Migrate DB
        run: uv run bash scripts/prestart.sh
        working-directory: backend
      - name: Run tests
        run: uv run bash scripts/tests-start.sh "Coverage for ${{ github.sha }}"
        working-directory: backend
      - run: docker compose down -v --remove-orphans
      - name: Store coverage files
        uses: actions/upload-artifact@v6
        with:
          name: coverage-html
          path: backend/htmlcov
          include-hidden-files: true
      - name: Coverage report
        run: uv run coverage report --fail-under=90
        working-directory: backend
````

## File: .github/workflows/test-docker-compose.yml
````yaml
name: Test Docker Compose

on:
  push:
    branches:
      - master
  pull_request:
    types:
      - opened
      - synchronize

jobs:

  test-docker-compose:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - run: docker compose build
      - run: docker compose down -v --remove-orphans
      - run: docker compose up -d --wait backend frontend adminer
      - name: Test backend is up
        run: curl http://localhost:8000/api/v1/utils/health-check
      - name: Test frontend is up
        run: curl http://localhost:5173
      - run: docker compose down -v --remove-orphans
````

## File: .github/dependabot.yml
````yaml
version: 2
updates:
  # GitHub Actions
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: daily
    commit-message:
      prefix: ⬆
    labels: [dependencies, internal]
  # Python uv
  - package-ecosystem: uv
    directory: /backend
    schedule:
      interval: weekly
    commit-message:
      prefix: ⬆
    labels: [dependencies, internal]
  # npm
  - package-ecosystem: npm
    directory: /frontend
    schedule:
      interval: weekly
    commit-message:
      prefix: ⬆
    labels: [dependencies, internal]
    ignore:
      - dependency-name: "@hey-api/openapi-ts"
  # Docker
  - package-ecosystem: docker
    directories:
      - /backend
      - /frontend
    schedule:
      interval: weekly
    commit-message:
      prefix: ⬆
    labels: [dependencies, internal]
  # Docker Compose
  - package-ecosystem: docker-compose
    directory: /
    schedule:
      interval: weekly
    commit-message:
      prefix: ⬆
    labels: [dependencies, internal]
````

## File: .github/FUNDING.yml
````yaml
github: [tiangolo]
````

## File: .github/labeler.yml
````yaml
docs:
  - all:
    - changed-files:
      - any-glob-to-any-file:
        - '**/*.md'
      - all-globs-to-all-files:
        - '!frontend/**'
        - '!backend/**'
        - '!.github/**'
        - '!scripts/**'
        - '!.gitignore'
        - '!.pre-commit-config.yaml'

internal:
  - all:
    - changed-files:
      - any-glob-to-any-file:
        - .github/**
        - scripts/**
        - .gitignore
        - .pre-commit-config.yaml
      - all-globs-to-all-files:
        - '!./**/*.md'
        - '!frontend/**'
        - '!backend/**'
````

## File: backend/app/alembic/versions/.keep
````

````

## File: backend/app/alembic/versions/1a31ce608336_add_cascade_delete_relationships.py
````python
"""Add cascade delete relationships

Revision ID: 1a31ce608336
Revises: d98dd8ec85a3
Create Date: 2024-07-31 22:24:34.447891

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '1a31ce608336'
down_revision = 'd98dd8ec85a3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('item', 'owner_id',
               existing_type=sa.UUID(),
               nullable=False)
    op.drop_constraint('item_owner_id_fkey', 'item', type_='foreignkey')
    op.create_foreign_key(None, 'item', 'user', ['owner_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'item', type_='foreignkey')
    op.create_foreign_key('item_owner_id_fkey', 'item', 'user', ['owner_id'], ['id'])
    op.alter_column('item', 'owner_id',
               existing_type=sa.UUID(),
               nullable=True)
    # ### end Alembic commands ###
````

## File: backend/app/alembic/versions/9c0a54914c78_add_max_length_for_string_varchar_.py
````python
"""Add max length for string(varchar) fields in User and Items models

Revision ID: 9c0a54914c78
Revises: e2412789c190
Create Date: 2024-06-17 14:42:44.639457

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '9c0a54914c78'
down_revision = 'e2412789c190'
branch_labels = None
depends_on = None


def upgrade():
    # Adjust the length of the email field in the User table
    op.alter_column('user', 'email',
               existing_type=sa.String(),
               type_=sa.String(length=255),
               existing_nullable=False)

    # Adjust the length of the full_name field in the User table
    op.alter_column('user', 'full_name',
               existing_type=sa.String(),
               type_=sa.String(length=255),
               existing_nullable=True)

    # Adjust the length of the title field in the Item table
    op.alter_column('item', 'title',
               existing_type=sa.String(),
               type_=sa.String(length=255),
               existing_nullable=False)

    # Adjust the length of the description field in the Item table
    op.alter_column('item', 'description',
               existing_type=sa.String(),
               type_=sa.String(length=255),
               existing_nullable=True)


def downgrade():
    # Revert the length of the email field in the User table
    op.alter_column('user', 'email',
               existing_type=sa.String(length=255),
               type_=sa.String(),
               existing_nullable=False)

    # Revert the length of the full_name field in the User table
    op.alter_column('user', 'full_name',
               existing_type=sa.String(length=255),
               type_=sa.String(),
               existing_nullable=True)

    # Revert the length of the title field in the Item table
    op.alter_column('item', 'title',
               existing_type=sa.String(length=255),
               type_=sa.String(),
               existing_nullable=False)

    # Revert the length of the description field in the Item table
    op.alter_column('item', 'description',
               existing_type=sa.String(length=255),
               type_=sa.String(),
               existing_nullable=True)
````

## File: backend/app/alembic/versions/d98dd8ec85a3_edit_replace_id_integers_in_all_models_.py
````python
"""Edit replace id integers in all models to use UUID instead

Revision ID: d98dd8ec85a3
Revises: 9c0a54914c78
Create Date: 2024-07-19 04:08:04.000976

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision = 'd98dd8ec85a3'
down_revision = '9c0a54914c78'
branch_labels = None
depends_on = None


def upgrade():
    # Ensure uuid-ossp extension is available
    op.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    # Create a new UUID column with a default UUID value
    op.add_column('user', sa.Column('new_id', postgresql.UUID(as_uuid=True), default=sa.text('uuid_generate_v4()')))
    op.add_column('item', sa.Column('new_id', postgresql.UUID(as_uuid=True), default=sa.text('uuid_generate_v4()')))
    op.add_column('item', sa.Column('new_owner_id', postgresql.UUID(as_uuid=True), nullable=True))

    # Populate the new columns with UUIDs
    op.execute('UPDATE "user" SET new_id = uuid_generate_v4()')
    op.execute('UPDATE item SET new_id = uuid_generate_v4()')
    op.execute('UPDATE item SET new_owner_id = (SELECT new_id FROM "user" WHERE "user".id = item.owner_id)')

    # Set the new_id as not nullable
    op.alter_column('user', 'new_id', nullable=False)
    op.alter_column('item', 'new_id', nullable=False)

    # Drop old columns and rename new columns
    op.drop_constraint('item_owner_id_fkey', 'item', type_='foreignkey')
    op.drop_column('item', 'owner_id')
    op.alter_column('item', 'new_owner_id', new_column_name='owner_id')

    op.drop_column('user', 'id')
    op.alter_column('user', 'new_id', new_column_name='id')

    op.drop_column('item', 'id')
    op.alter_column('item', 'new_id', new_column_name='id')

    # Create primary key constraint
    op.create_primary_key('user_pkey', 'user', ['id'])
    op.create_primary_key('item_pkey', 'item', ['id'])

    # Recreate foreign key constraint
    op.create_foreign_key('item_owner_id_fkey', 'item', 'user', ['owner_id'], ['id'])

def downgrade():
    # Reverse the upgrade process
    op.add_column('user', sa.Column('old_id', sa.Integer, autoincrement=True))
    op.add_column('item', sa.Column('old_id', sa.Integer, autoincrement=True))
    op.add_column('item', sa.Column('old_owner_id', sa.Integer, nullable=True))

    # Populate the old columns with default values
    # Generate sequences for the integer IDs if not exist
    op.execute('CREATE SEQUENCE IF NOT EXISTS user_id_seq AS INTEGER OWNED BY "user".old_id')
    op.execute('CREATE SEQUENCE IF NOT EXISTS item_id_seq AS INTEGER OWNED BY item.old_id')

    op.execute('SELECT setval(\'user_id_seq\', COALESCE((SELECT MAX(old_id) + 1 FROM "user"), 1), false)')
    op.execute('SELECT setval(\'item_id_seq\', COALESCE((SELECT MAX(old_id) + 1 FROM item), 1), false)')

    op.execute('UPDATE "user" SET old_id = nextval(\'user_id_seq\')')
    op.execute('UPDATE item SET old_id = nextval(\'item_id_seq\'), old_owner_id = (SELECT old_id FROM "user" WHERE "user".id = item.owner_id)')

    # Drop new columns and rename old columns back
    op.drop_constraint('item_owner_id_fkey', 'item', type_='foreignkey')
    op.drop_column('item', 'owner_id')
    op.alter_column('item', 'old_owner_id', new_column_name='owner_id')

    op.drop_column('user', 'id')
    op.alter_column('user', 'old_id', new_column_name='id')

    op.drop_column('item', 'id')
    op.alter_column('item', 'old_id', new_column_name='id')

    # Create primary key constraint
    op.create_primary_key('user_pkey', 'user', ['id'])
    op.create_primary_key('item_pkey', 'item', ['id'])

    # Recreate foreign key constraint
    op.create_foreign_key('item_owner_id_fkey', 'item', 'user', ['owner_id'], ['id'])
````

## File: backend/app/alembic/versions/e2412789c190_initialize_models.py
````python
"""Initialize models

Revision ID: e2412789c190
Revises:
Create Date: 2023-11-24 22:55:43.195942

"""
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from alembic import op

# revision identifiers, used by Alembic.
revision = "e2412789c190"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "user",
        sa.Column("email", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("is_superuser", sa.Boolean(), nullable=False),
        sa.Column("full_name", sqlmodel.sql.sqltypes.AutoString(), nullable=True),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column(
            "hashed_password", sqlmodel.sql.sqltypes.AutoString(), nullable=False
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_user_email"), "user", ["email"], unique=True)
    op.create_table(
        "item",
        sa.Column("description", sqlmodel.sql.sqltypes.AutoString(), nullable=True),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column("owner_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["owner_id"],
            ["user.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("item")
    op.drop_index(op.f("ix_user_email"), table_name="user")
    op.drop_table("user")
    # ### end Alembic commands ###
````

## File: backend/app/alembic/env.py
````python
import os
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
# target_metadata = None

from app.models import SQLModel  # noqa
from app.core.config import settings # noqa

target_metadata = SQLModel.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def get_url():
    return str(settings.SQLALCHEMY_DATABASE_URI)


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = get_url()
    context.configure(
        url=url, target_metadata=target_metadata, literal_binds=True, compare_type=True
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    configuration = config.get_section(config.config_ini_section)
    configuration["sqlalchemy.url"] = get_url()
    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata, compare_type=True
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
````

## File: backend/app/alembic/README
````
Generic single-database configuration.
````

## File: backend/app/alembic/script.py.mako
````
"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
${imports if imports else ""}

# revision identifiers, used by Alembic.
revision = ${repr(up_revision)}
down_revision = ${repr(down_revision)}
branch_labels = ${repr(branch_labels)}
depends_on = ${repr(depends_on)}


def upgrade():
    ${upgrades if upgrades else "pass"}


def downgrade():
    ${downgrades if downgrades else "pass"}
````

## File: backend/app/api/routes/__init__.py
````python

````

## File: backend/app/api/routes/items.py
````python
import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Item, ItemCreate, ItemPublic, ItemsPublic, ItemUpdate, Message

router = APIRouter(prefix="/items", tags=["items"])


@router.get("/", response_model=ItemsPublic)
def read_items(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve items.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(Item)
        count = session.exec(count_statement).one()
        statement = select(Item).offset(skip).limit(limit)
        items = session.exec(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(Item)
            .where(Item.owner_id == current_user.id)
        )
        count = session.exec(count_statement).one()
        statement = (
            select(Item)
            .where(Item.owner_id == current_user.id)
            .offset(skip)
            .limit(limit)
        )
        items = session.exec(statement).all()

    return ItemsPublic(data=items, count=count)


@router.get("/{id}", response_model=ItemPublic)
def read_item(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Get item by ID.
    """
    item = session.get(Item, id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not current_user.is_superuser and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return item


@router.post("/", response_model=ItemPublic)
def create_item(
    *, session: SessionDep, current_user: CurrentUser, item_in: ItemCreate
) -> Any:
    """
    Create new item.
    """
    item = Item.model_validate(item_in, update={"owner_id": current_user.id})
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


@router.put("/{id}", response_model=ItemPublic)
def update_item(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    item_in: ItemUpdate,
) -> Any:
    """
    Update an item.
    """
    item = session.get(Item, id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not current_user.is_superuser and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = item_in.model_dump(exclude_unset=True)
    item.sqlmodel_update(update_dict)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


@router.delete("/{id}")
def delete_item(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete an item.
    """
    item = session.get(Item, id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not current_user.is_superuser and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(item)
    session.commit()
    return Message(message="Item deleted successfully")
````

## File: backend/app/api/routes/login.py
````python
from datetime import timedelta
from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm

from app import crud
from app.api.deps import CurrentUser, SessionDep, get_current_active_superuser
from app.core import security
from app.core.config import settings
from app.core.security import get_password_hash
from app.models import Message, NewPassword, Token, UserPublic
from app.utils import (
    generate_password_reset_token,
    generate_reset_password_email,
    send_email,
    verify_password_reset_token,
)

router = APIRouter(tags=["login"])


@router.post("/login/access-token")
def login_access_token(
    session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = crud.authenticate(
        session=session, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=security.create_access_token(
            user.id, expires_delta=access_token_expires
        )
    )


@router.post("/login/test-token", response_model=UserPublic)
def test_token(current_user: CurrentUser) -> Any:
    """
    Test access token
    """
    return current_user


@router.post("/password-recovery/{email}")
def recover_password(email: str, session: SessionDep) -> Message:
    """
    Password Recovery
    """
    user = crud.get_user_by_email(session=session, email=email)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this email does not exist in the system.",
        )
    password_reset_token = generate_password_reset_token(email=email)
    email_data = generate_reset_password_email(
        email_to=user.email, email=email, token=password_reset_token
    )
    send_email(
        email_to=user.email,
        subject=email_data.subject,
        html_content=email_data.html_content,
    )
    return Message(message="Password recovery email sent")


@router.post("/reset-password/")
def reset_password(session: SessionDep, body: NewPassword) -> Message:
    """
    Reset password
    """
    email = verify_password_reset_token(token=body.token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid token")
    user = crud.get_user_by_email(session=session, email=email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this email does not exist in the system.",
        )
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    hashed_password = get_password_hash(password=body.new_password)
    user.hashed_password = hashed_password
    session.add(user)
    session.commit()
    return Message(message="Password updated successfully")


@router.post(
    "/password-recovery-html-content/{email}",
    dependencies=[Depends(get_current_active_superuser)],
    response_class=HTMLResponse,
)
def recover_password_html_content(email: str, session: SessionDep) -> Any:
    """
    HTML Content for Password Recovery
    """
    user = crud.get_user_by_email(session=session, email=email)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system.",
        )
    password_reset_token = generate_password_reset_token(email=email)
    email_data = generate_reset_password_email(
        email_to=user.email, email=email, token=password_reset_token
    )

    return HTMLResponse(
        content=email_data.html_content, headers={"subject:": email_data.subject}
    )
````

## File: backend/app/api/routes/private.py
````python
from typing import Any

from fastapi import APIRouter
from pydantic import BaseModel

from app.api.deps import SessionDep
from app.core.security import get_password_hash
from app.models import (
    User,
    UserPublic,
)

router = APIRouter(tags=["private"], prefix="/private")


class PrivateUserCreate(BaseModel):
    email: str
    password: str
    full_name: str
    is_verified: bool = False


@router.post("/users/", response_model=UserPublic)
def create_user(user_in: PrivateUserCreate, session: SessionDep) -> Any:
    """
    Create a new user.
    """

    user = User(
        email=user_in.email,
        full_name=user_in.full_name,
        hashed_password=get_password_hash(user_in.password),
    )

    session.add(user)
    session.commit()

    return user
````

## File: backend/app/api/routes/users.py
````python
import uuid
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import col, delete, func, select

from app import crud
from app.api.deps import (
    CurrentUser,
    SessionDep,
    get_current_active_superuser,
)
from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.models import (
    Item,
    Message,
    UpdatePassword,
    User,
    UserCreate,
    UserPublic,
    UserRegister,
    UsersPublic,
    UserUpdate,
    UserUpdateMe,
)
from app.utils import generate_new_account_email, send_email

router = APIRouter(prefix="/users", tags=["users"])


@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=UsersPublic,
)
def read_users(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve users.
    """

    count_statement = select(func.count()).select_from(User)
    count = session.exec(count_statement).one()

    statement = select(User).offset(skip).limit(limit)
    users = session.exec(statement).all()

    return UsersPublic(data=users, count=count)


@router.post(
    "/", dependencies=[Depends(get_current_active_superuser)], response_model=UserPublic
)
def create_user(*, session: SessionDep, user_in: UserCreate) -> Any:
    """
    Create new user.
    """
    user = crud.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )

    user = crud.create_user(session=session, user_create=user_in)
    if settings.emails_enabled and user_in.email:
        email_data = generate_new_account_email(
            email_to=user_in.email, username=user_in.email, password=user_in.password
        )
        send_email(
            email_to=user_in.email,
            subject=email_data.subject,
            html_content=email_data.html_content,
        )
    return user


@router.patch("/me", response_model=UserPublic)
def update_user_me(
    *, session: SessionDep, user_in: UserUpdateMe, current_user: CurrentUser
) -> Any:
    """
    Update own user.
    """

    if user_in.email:
        existing_user = crud.get_user_by_email(session=session, email=user_in.email)
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(
                status_code=409, detail="User with this email already exists"
            )
    user_data = user_in.model_dump(exclude_unset=True)
    current_user.sqlmodel_update(user_data)
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user


@router.patch("/me/password", response_model=Message)
def update_password_me(
    *, session: SessionDep, body: UpdatePassword, current_user: CurrentUser
) -> Any:
    """
    Update own password.
    """
    if not verify_password(body.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    if body.current_password == body.new_password:
        raise HTTPException(
            status_code=400, detail="New password cannot be the same as the current one"
        )
    hashed_password = get_password_hash(body.new_password)
    current_user.hashed_password = hashed_password
    session.add(current_user)
    session.commit()
    return Message(message="Password updated successfully")


@router.get("/me", response_model=UserPublic)
def read_user_me(current_user: CurrentUser) -> Any:
    """
    Get current user.
    """
    return current_user


@router.delete("/me", response_model=Message)
def delete_user_me(session: SessionDep, current_user: CurrentUser) -> Any:
    """
    Delete own user.
    """
    if current_user.is_superuser:
        raise HTTPException(
            status_code=403, detail="Super users are not allowed to delete themselves"
        )
    session.delete(current_user)
    session.commit()
    return Message(message="User deleted successfully")


@router.post("/signup", response_model=UserPublic)
def register_user(session: SessionDep, user_in: UserRegister) -> Any:
    """
    Create new user without the need to be logged in.
    """
    user = crud.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system",
        )
    user_create = UserCreate.model_validate(user_in)
    user = crud.create_user(session=session, user_create=user_create)
    return user


@router.get("/{user_id}", response_model=UserPublic)
def read_user_by_id(
    user_id: uuid.UUID, session: SessionDep, current_user: CurrentUser
) -> Any:
    """
    Get a specific user by id.
    """
    user = session.get(User, user_id)
    if user == current_user:
        return user
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=403,
            detail="The user doesn't have enough privileges",
        )
    return user


@router.patch(
    "/{user_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=UserPublic,
)
def update_user(
    *,
    session: SessionDep,
    user_id: uuid.UUID,
    user_in: UserUpdate,
) -> Any:
    """
    Update a user.
    """

    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="The user with this id does not exist in the system",
        )
    if user_in.email:
        existing_user = crud.get_user_by_email(session=session, email=user_in.email)
        if existing_user and existing_user.id != user_id:
            raise HTTPException(
                status_code=409, detail="User with this email already exists"
            )

    db_user = crud.update_user(session=session, db_user=db_user, user_in=user_in)
    return db_user


@router.delete("/{user_id}", dependencies=[Depends(get_current_active_superuser)])
def delete_user(
    session: SessionDep, current_user: CurrentUser, user_id: uuid.UUID
) -> Message:
    """
    Delete a user.
    """
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user == current_user:
        raise HTTPException(
            status_code=403, detail="Super users are not allowed to delete themselves"
        )
    statement = delete(Item).where(col(Item.owner_id) == user_id)
    session.exec(statement)  # type: ignore
    session.delete(user)
    session.commit()
    return Message(message="User deleted successfully")
````

## File: backend/app/api/routes/utils.py
````python
from fastapi import APIRouter, Depends
from pydantic.networks import EmailStr

from app.api.deps import get_current_active_superuser
from app.models import Message
from app.utils import generate_test_email, send_email

router = APIRouter(prefix="/utils", tags=["utils"])


@router.post(
    "/test-email/",
    dependencies=[Depends(get_current_active_superuser)],
    status_code=201,
)
def test_email(email_to: EmailStr) -> Message:
    """
    Test emails.
    """
    email_data = generate_test_email(email_to=email_to)
    send_email(
        email_to=email_to,
        subject=email_data.subject,
        html_content=email_data.html_content,
    )
    return Message(message="Test email sent")


@router.get("/health-check/")
async def health_check() -> bool:
    return True
````

## File: backend/app/api/__init__.py
````python

````

## File: backend/app/api/deps.py
````python
from collections.abc import Generator
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from sqlmodel import Session

from app.core import security
from app.core.config import settings
from app.core.db import engine
from app.models import TokenPayload, User

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/access-token"
)


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]
TokenDep = Annotated[str, Depends(reusable_oauth2)]


def get_current_user(session: SessionDep, token: TokenDep) -> User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = session.get(User, token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]


def get_current_active_superuser(current_user: CurrentUser) -> User:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges"
        )
    return current_user
````

## File: backend/app/api/main.py
````python
from fastapi import APIRouter

from app.api.routes import items, login, private, users, utils
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(users.router)
api_router.include_router(utils.router)
api_router.include_router(items.router)


if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)
````

## File: backend/app/core/__init__.py
````python

````

## File: backend/app/core/config.py
````python
import secrets
import warnings
from typing import Annotated, Any, Literal

from pydantic import (
    AnyUrl,
    BeforeValidator,
    EmailStr,
    HttpUrl,
    PostgresDsn,
    computed_field,
    model_validator,
)
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing_extensions import Self


def parse_cors(v: Any) -> list[str] | str:
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",") if i.strip()]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        # Use top level .env file (one level above ./backend/)
        env_file="../.env",
        env_ignore_empty=True,
        extra="ignore",
    )
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    FRONTEND_HOST: str = "http://localhost:5173"
    ENVIRONMENT: Literal["local", "staging", "production"] = "local"

    BACKEND_CORS_ORIGINS: Annotated[
        list[AnyUrl] | str, BeforeValidator(parse_cors)
    ] = []

    @computed_field  # type: ignore[prop-decorator]
    @property
    def all_cors_origins(self) -> list[str]:
        return [str(origin).rstrip("/") for origin in self.BACKEND_CORS_ORIGINS] + [
            self.FRONTEND_HOST
        ]

    PROJECT_NAME: str
    SENTRY_DSN: HttpUrl | None = None
    POSTGRES_SERVER: str
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str = ""
    POSTGRES_DB: str = ""

    @computed_field  # type: ignore[prop-decorator]
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        return PostgresDsn.build(
            scheme="postgresql+psycopg",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_SERVER,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
        )

    SMTP_TLS: bool = True
    SMTP_SSL: bool = False
    SMTP_PORT: int = 587
    SMTP_HOST: str | None = None
    SMTP_USER: str | None = None
    SMTP_PASSWORD: str | None = None
    EMAILS_FROM_EMAIL: EmailStr | None = None
    EMAILS_FROM_NAME: str | None = None

    @model_validator(mode="after")
    def _set_default_emails_from(self) -> Self:
        if not self.EMAILS_FROM_NAME:
            self.EMAILS_FROM_NAME = self.PROJECT_NAME
        return self

    EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = 48

    @computed_field  # type: ignore[prop-decorator]
    @property
    def emails_enabled(self) -> bool:
        return bool(self.SMTP_HOST and self.EMAILS_FROM_EMAIL)

    EMAIL_TEST_USER: EmailStr = "test@example.com"
    FIRST_SUPERUSER: EmailStr
    FIRST_SUPERUSER_PASSWORD: str

    def _check_default_secret(self, var_name: str, value: str | None) -> None:
        if value == "changethis":
            message = (
                f'The value of {var_name} is "changethis", '
                "for security, please change it, at least for deployments."
            )
            if self.ENVIRONMENT == "local":
                warnings.warn(message, stacklevel=1)
            else:
                raise ValueError(message)

    @model_validator(mode="after")
    def _enforce_non_default_secrets(self) -> Self:
        self._check_default_secret("SECRET_KEY", self.SECRET_KEY)
        self._check_default_secret("POSTGRES_PASSWORD", self.POSTGRES_PASSWORD)
        self._check_default_secret(
            "FIRST_SUPERUSER_PASSWORD", self.FIRST_SUPERUSER_PASSWORD
        )

        return self


settings = Settings()  # type: ignore
````

## File: backend/app/core/db.py
````python
from sqlmodel import Session, create_engine, select

from app import crud
from app.core.config import settings
from app.models import User, UserCreate

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


# make sure all SQLModel models are imported (app.models) before initializing DB
# otherwise, SQLModel might fail to initialize relationships properly
# for more details: https://github.com/fastapi/full-stack-fastapi-template/issues/28


def init_db(session: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next lines
    # from sqlmodel import SQLModel

    # This works because the models are already imported and registered from app.models
    # SQLModel.metadata.create_all(engine)

    user = session.exec(
        select(User).where(User.email == settings.FIRST_SUPERUSER)
    ).first()
    if not user:
        user_in = UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = crud.create_user(session=session, user_create=user_in)
````

## File: backend/app/core/security.py
````python
from datetime import datetime, timedelta, timezone
from typing import Any

import jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


ALGORITHM = "HS256"


def create_access_token(subject: str | Any, expires_delta: timedelta) -> str:
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
````

## File: backend/app/email-templates/build/new_account.html
````html
<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!-- --><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
          .ReadMsgBody { width:100%; }
          .ExternalClass { width:100%; }
          .ExternalClass * { line-height:100%; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px) {
            @-ms-viewport { width:320px; }
            @viewport { width:320px; }
          }</style><!--<![endif]--><!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]--><!--[if lte mso 11]>
        <style type="text/css">
          .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }</style><style type="text/css"></style></head><body style="background-color:#fafbfc;"><div style="background-color:#fafbfc;"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:40px 20px;text-align:center;vertical-align:top;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:560px;" ><![endif]--><div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%"><tr><td align="center" style="font-size:0px;padding:35px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:20px;line-height:1;text-align:center;color:#333333;">{{ project_name }} - New Account</div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:Arial, Helvetica, sans-serif;font-size:16px;line-height:1;text-align:center;color:#555555;"><span>Welcome to your new account!</span></div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:Arial, Helvetica, sans-serif;font-size:16px;line-height:1;text-align:center;color:#555555;">Here are your account details:</div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:Arial, Helvetica, sans-serif;font-size:16px;line-height:1;text-align:center;color:#555555;">Username: {{ username }}</div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:Arial, Helvetica, sans-serif;font-size:16px;line-height:1;text-align:center;color:#555555;">Password: {{ password }}</div></td></tr><tr><td align="center" vertical-align="middle" style="font-size:0px;padding:15px 30px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"><tr><td align="center" bgcolor="#009688" role="presentation" style="border:none;border-radius:8px;cursor:auto;padding:10px 25px;background:#009688;" valign="middle"><a href="{{ link }}" style="background:#009688;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:18px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;" target="_blank">Go to Dashboard</a></td></tr></table></td></tr><tr><td style="font-size:0px;padding:10px 25px;word-break:break-word;"><p style="border-top:solid 2px #cccccc;font-size:1;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 2px #cccccc;font-size:1;margin:0px auto;width:510px;" role="presentation" width="510px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>
````

## File: backend/app/email-templates/build/reset_password.html
````html
<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!-- --><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
          .ReadMsgBody { width:100%; }
          .ExternalClass { width:100%; }
          .ExternalClass * { line-height:100%; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px) {
            @-ms-viewport { width:320px; }
            @viewport { width:320px; }
          }</style><!--<![endif]--><!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]--><!--[if lte mso 11]>
        <style type="text/css">
          .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }</style><style type="text/css"></style></head><body style="background-color:#fafbfc;"><div style="background-color:#fafbfc;"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:40px 20px;text-align:center;vertical-align:top;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:560px;" ><![endif]--><div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%"><tr><td align="center" style="font-size:0px;padding:35px;word-break:break-word;"><div style="font-family:Arial, Helvetica, sans-serif;font-size:20px;line-height:1;text-align:center;color:#333333;">{{ project_name }} - Password Recovery</div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:Arial, Helvetica, sans-serif;font-size:16px;line-height:1;text-align:center;color:#555555;"><span>Hello {{ username }}</span></div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:Arial, Helvetica, sans-serif;font-size:16px;line-height:1;text-align:center;color:#555555;">We've received a request to reset your password. You can do it by clicking the button below:</div></td></tr><tr><td align="center" vertical-align="middle" style="font-size:0px;padding:15px 30px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"><tr><td align="center" bgcolor="#009688" role="presentation" style="border:none;border-radius:8px;cursor:auto;padding:10px 25px;background:#009688;" valign="middle"><a href="{{ link }}" style="background:#009688;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:18px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;" target="_blank">Reset password</a></td></tr></table></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:Arial, Helvetica, sans-serif;font-size:16px;line-height:1;text-align:center;color:#555555;">Or copy and paste the following link into your browser:</div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:Arial, Helvetica, sans-serif;font-size:16px;line-height:1;text-align:center;color:#555555;"><a href="{{ link }}">{{ link }}</a></div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:Arial, Helvetica, sans-serif;font-size:16px;line-height:1;text-align:center;color:#555555;">This password will expire in {{ valid_hours }} hours.</div></td></tr><tr><td style="font-size:0px;padding:10px 25px;word-break:break-word;"><p style="border-top:solid 2px #cccccc;font-size:1;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 2px #cccccc;font-size:1;margin:0px auto;width:510px;" role="presentation" width="510px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:1;text-align:center;color:#555555;">If you didn't request a password recovery you can disregard this email.</div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>
````

## File: backend/app/email-templates/build/test_email.html
````html
<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!-- --><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
          .ReadMsgBody { width:100%; }
          .ExternalClass { width:100%; }
          .ExternalClass * { line-height:100%; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px) {
            @-ms-viewport { width:320px; }
            @viewport { width:320px; }
          }</style><!--<![endif]--><!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]--><!--[if lte mso 11]>
        <style type="text/css">
          .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }</style><style type="text/css"></style></head><body style="background-color:#fafbfc;"><div style="background-color:#fafbfc;"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:40px 20px;text-align:center;vertical-align:top;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:560px;" ><![endif]--><div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%"><tr><td align="center" style="font-size:0px;padding:35px;word-break:break-word;"><div style="font-family:Arial, Helvetica, sans-serif;font-size:20px;line-height:1;text-align:center;color:#333333;">{{ project_name }}</div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:, sans-serif;font-size:16px;line-height:1;text-align:center;color:#555555;"><span>Test email for: {{ email }}</span></div></td></tr><tr><td style="font-size:0px;padding:10px 25px;word-break:break-word;"><p style="border-top:solid 2px #cccccc;font-size:1;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 2px #cccccc;font-size:1;margin:0px auto;width:510px;" role="presentation" width="510px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>
````

## File: backend/app/email-templates/src/new_account.mjml
````
<mjml>
  <mj-body background-color="#fafbfc">
    <mj-section background-color="#fff" padding="40px 20px">
      <mj-column vertical-align="middle" width="100%">
        <mj-text align="center" padding="35px" font-size="20px" color="#333">{{ project_name }} - New Account</mj-text>
        <mj-text align="center" font-size="16px" padding-left="25px" padding-right="25px" font-family="Arial, Helvetica, sans-serif" color="#555"><span>Welcome to your new account!</span></mj-text>
        <mj-text align="center" font-size="16px" padding-left="25px" padding-right="25px" font-family="Arial, Helvetica, sans-serif" color="#555">Here are your account details:</mj-text>
        <mj-text align="center" font-size="16px" padding-left="25px" padding-right="25px" font-family="Arial, Helvetica, sans-serif" color="#555">Username: {{ username }}</mj-text>
        <mj-text align="center" font-size="16px" padding-left="25px" padding-right="25px" font-family="Arial, Helvetica, sans-serif" color="#555">Password: {{ password }}</mj-text>
        <mj-button align="center" font-size="18px" background-color="#009688" border-radius="8px" color="#fff" href="{{ link }}" padding="15px 30px">Go to Dashboard</mj-button>
        <mj-divider border-color="#ccc" border-width="2px"></mj-divider>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
````

## File: backend/app/email-templates/src/reset_password.mjml
````
<mjml>
  <mj-body background-color="#fafbfc">
    <mj-section background-color="#fff" padding="40px 20px">
      <mj-column vertical-align="middle" width="100%">
        <mj-text align="center" padding="35px" font-size="20px" font-family="Arial, Helvetica, sans-serif" color="#333">{{ project_name }} - Password Recovery</mj-text>
        <mj-text align="center" font-size="16px" padding-left="25px" padding-right="25px" font-family="Arial, Helvetica, sans-serif" color="#555"><span>Hello {{ username }}</span></mj-text>
        <mj-text align="center" font-size="16px" padding-left="25px" padding-right="25px" font-family="Arial, Helvetica, sans-serif" color="#555">We've received a request to reset your password. You can do it by clicking the button below:</mj-text>
        <mj-button align="center" font-size="18px" background-color="#009688" border-radius="8px" color="#fff" href="{{ link }}" padding="15px 30px">Reset password</mj-button>
        <mj-text align="center" font-size="16px" padding-left="25px" padding-right="25px" font-family="Arial, Helvetica, sans-serif" color="#555">Or copy and paste the following link into your browser:</mj-text>
        <mj-text align="center" font-size="16px" padding-left="25px" padding-right="25px" font-family="Arial, Helvetica, sans-serif" color="#555"><a href="{{ link }}">{{ link }}</a></mj-text>
        <mj-text align="center" font-size="16px" padding-left="25px" padding-right="25px" font-family="Arial, Helvetica, sans-serif" color="#555">This password will expire in {{ valid_hours }} hours.</mj-text>
        <mj-divider border-color="#ccc" border-width="2px"></mj-divider>
        <mj-text align="center" font-size="14px" padding-left="25px" padding-right="25px" font-family="Arial, Helvetica, sans-serif" color="#555">If you didn't request a password recovery you can disregard this email.</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
````

## File: backend/app/email-templates/src/test_email.mjml
````
<mjml>
  <mj-body background-color="#fafbfc">
    <mj-section background-color="#fff" padding="40px 20px">
      <mj-column vertical-align="middle" width="100%">
        <mj-text align="center" padding="35px" font-size="20px" font-family="Arial, Helvetica, sans-serif" color="#333">{{ project_name }}</mj-text>
        <mj-text align="center" font-size="16px" padding-left="25px" padding-right="25px" font-family=", sans-serif" color="#555"><span>Test email for: {{ email }}</span></mj-text>
        <mj-divider border-color="#ccc" border-width="2px"></mj-divider>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
````

## File: backend/app/__init__.py
````python

````

## File: backend/app/backend_pre_start.py
````python
import logging

from sqlalchemy import Engine
from sqlmodel import Session, select
from tenacity import after_log, before_log, retry, stop_after_attempt, wait_fixed

from app.core.db import engine

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

max_tries = 60 * 5  # 5 minutes
wait_seconds = 1


@retry(
    stop=stop_after_attempt(max_tries),
    wait=wait_fixed(wait_seconds),
    before=before_log(logger, logging.INFO),
    after=after_log(logger, logging.WARN),
)
def init(db_engine: Engine) -> None:
    try:
        with Session(db_engine) as session:
            # Try to create session to check if DB is awake
            session.exec(select(1))
    except Exception as e:
        logger.error(e)
        raise e


def main() -> None:
    logger.info("Initializing service")
    init(engine)
    logger.info("Service finished initializing")


if __name__ == "__main__":
    main()
````

## File: backend/app/crud.py
````python
import uuid
from typing import Any

from sqlmodel import Session, select

from app.core.security import get_password_hash, verify_password
from app.models import Item, ItemCreate, User, UserCreate, UserUpdate


def create_user(*, session: Session, user_create: UserCreate) -> User:
    db_obj = User.model_validate(
        user_create, update={"hashed_password": get_password_hash(user_create.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def update_user(*, session: Session, db_user: User, user_in: UserUpdate) -> Any:
    user_data = user_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["hashed_password"] = hashed_password
    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user


def create_item(*, session: Session, item_in: ItemCreate, owner_id: uuid.UUID) -> Item:
    db_item = Item.model_validate(item_in, update={"owner_id": owner_id})
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item
````

## File: backend/app/initial_data.py
````python
import logging

from sqlmodel import Session

from app.core.db import engine, init_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init() -> None:
    with Session(engine) as session:
        init_db(session)


def main() -> None:
    logger.info("Creating initial data")
    init()
    logger.info("Initial data created")


if __name__ == "__main__":
    main()
````

## File: backend/app/main.py
````python
import sentry_sdk
from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware

from app.api.main import api_router
from app.core.config import settings


def custom_generate_unique_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"


if settings.SENTRY_DSN and settings.ENVIRONMENT != "local":
    sentry_sdk.init(dsn=str(settings.SENTRY_DSN), enable_tracing=True)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
)

# Set all CORS enabled origins
if settings.all_cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.all_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)
````

## File: backend/app/models.py
````python
import uuid

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel


# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=128)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=128)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=128)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=128)
    new_password: str = Field(min_length=8, max_length=128)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    items: list["Item"] = Relationship(back_populates="owner", cascade_delete=True)


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


# Shared properties
class ItemBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)


# Properties to receive on item creation
class ItemCreate(ItemBase):
    pass


# Properties to receive on item update
class ItemUpdate(ItemBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore


# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="items")


# Properties to return via API, id is always required
class ItemPublic(ItemBase):
    id: uuid.UUID
    owner_id: uuid.UUID


class ItemsPublic(SQLModel):
    data: list[ItemPublic]
    count: int


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=128)
````

## File: backend/app/tests_pre_start.py
````python
import logging

from sqlalchemy import Engine
from sqlmodel import Session, select
from tenacity import after_log, before_log, retry, stop_after_attempt, wait_fixed

from app.core.db import engine

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

max_tries = 60 * 5  # 5 minutes
wait_seconds = 1


@retry(
    stop=stop_after_attempt(max_tries),
    wait=wait_fixed(wait_seconds),
    before=before_log(logger, logging.INFO),
    after=after_log(logger, logging.WARN),
)
def init(db_engine: Engine) -> None:
    try:
        # Try to create session to check if DB is awake
        with Session(db_engine) as session:
            session.exec(select(1))
    except Exception as e:
        logger.error(e)
        raise e


def main() -> None:
    logger.info("Initializing service")
    init(engine)
    logger.info("Service finished initializing")


if __name__ == "__main__":
    main()
````

## File: backend/app/utils.py
````python
import logging
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import emails  # type: ignore
import jwt
from jinja2 import Template
from jwt.exceptions import InvalidTokenError

from app.core import security
from app.core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class EmailData:
    html_content: str
    subject: str


def render_email_template(*, template_name: str, context: dict[str, Any]) -> str:
    template_str = (
        Path(__file__).parent / "email-templates" / "build" / template_name
    ).read_text()
    html_content = Template(template_str).render(context)
    return html_content


def send_email(
    *,
    email_to: str,
    subject: str = "",
    html_content: str = "",
) -> None:
    assert settings.emails_enabled, "no provided configuration for email variables"
    message = emails.Message(
        subject=subject,
        html=html_content,
        mail_from=(settings.EMAILS_FROM_NAME, settings.EMAILS_FROM_EMAIL),
    )
    smtp_options = {"host": settings.SMTP_HOST, "port": settings.SMTP_PORT}
    if settings.SMTP_TLS:
        smtp_options["tls"] = True
    elif settings.SMTP_SSL:
        smtp_options["ssl"] = True
    if settings.SMTP_USER:
        smtp_options["user"] = settings.SMTP_USER
    if settings.SMTP_PASSWORD:
        smtp_options["password"] = settings.SMTP_PASSWORD
    response = message.send(to=email_to, smtp=smtp_options)
    logger.info(f"send email result: {response}")


def generate_test_email(email_to: str) -> EmailData:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - Test email"
    html_content = render_email_template(
        template_name="test_email.html",
        context={"project_name": settings.PROJECT_NAME, "email": email_to},
    )
    return EmailData(html_content=html_content, subject=subject)


def generate_reset_password_email(email_to: str, email: str, token: str) -> EmailData:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - Password recovery for user {email}"
    link = f"{settings.FRONTEND_HOST}/reset-password?token={token}"
    html_content = render_email_template(
        template_name="reset_password.html",
        context={
            "project_name": settings.PROJECT_NAME,
            "username": email,
            "email": email_to,
            "valid_hours": settings.EMAIL_RESET_TOKEN_EXPIRE_HOURS,
            "link": link,
        },
    )
    return EmailData(html_content=html_content, subject=subject)


def generate_new_account_email(
    email_to: str, username: str, password: str
) -> EmailData:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - New account for user {username}"
    html_content = render_email_template(
        template_name="new_account.html",
        context={
            "project_name": settings.PROJECT_NAME,
            "username": username,
            "password": password,
            "email": email_to,
            "link": settings.FRONTEND_HOST,
        },
    )
    return EmailData(html_content=html_content, subject=subject)


def generate_password_reset_token(email: str) -> str:
    delta = timedelta(hours=settings.EMAIL_RESET_TOKEN_EXPIRE_HOURS)
    now = datetime.now(timezone.utc)
    expires = now + delta
    exp = expires.timestamp()
    encoded_jwt = jwt.encode(
        {"exp": exp, "nbf": now, "sub": email},
        settings.SECRET_KEY,
        algorithm=security.ALGORITHM,
    )
    return encoded_jwt


def verify_password_reset_token(token: str) -> str | None:
    try:
        decoded_token = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        return str(decoded_token["sub"])
    except InvalidTokenError:
        return None
````

## File: backend/scripts/format.sh
````bash
#!/bin/sh -e
set -x

ruff check app scripts --fix
ruff format app scripts
````

## File: backend/scripts/lint.sh
````bash
#!/usr/bin/env bash

set -e
set -x

mypy app
ruff check app
ruff format app --check
````

## File: backend/scripts/prestart.sh
````bash
#! /usr/bin/env bash

set -e
set -x

# Let the DB start
python app/backend_pre_start.py

# Run migrations
alembic upgrade head

# Create initial data in DB
python app/initial_data.py
````

## File: backend/scripts/test.sh
````bash
#!/usr/bin/env bash

set -e
set -x

coverage run -m pytest tests/
coverage report
coverage html --title "${@-coverage}"
````

## File: backend/scripts/tests-start.sh
````bash
#! /usr/bin/env bash
set -e
set -x

python app/tests_pre_start.py

bash scripts/test.sh "$@"
````

## File: backend/tests/api/routes/__init__.py
````python

````

## File: backend/tests/api/routes/test_items.py
````python
import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from tests.utils.item import create_random_item


def test_create_item(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"title": "Foo", "description": "Fighters"}
    response = client.post(
        f"{settings.API_V1_STR}/items/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == data["title"]
    assert content["description"] == data["description"]
    assert "id" in content
    assert "owner_id" in content


def test_read_item(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    item = create_random_item(db)
    response = client.get(
        f"{settings.API_V1_STR}/items/{item.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == item.title
    assert content["description"] == item.description
    assert content["id"] == str(item.id)
    assert content["owner_id"] == str(item.owner_id)


def test_read_item_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/items/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Item not found"


def test_read_item_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    item = create_random_item(db)
    response = client.get(
        f"{settings.API_V1_STR}/items/{item.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_read_items(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    create_random_item(db)
    create_random_item(db)
    response = client.get(
        f"{settings.API_V1_STR}/items/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 2


def test_update_item(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    item = create_random_item(db)
    data = {"title": "Updated title", "description": "Updated description"}
    response = client.put(
        f"{settings.API_V1_STR}/items/{item.id}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == data["title"]
    assert content["description"] == data["description"]
    assert content["id"] == str(item.id)
    assert content["owner_id"] == str(item.owner_id)


def test_update_item_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"title": "Updated title", "description": "Updated description"}
    response = client.put(
        f"{settings.API_V1_STR}/items/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Item not found"


def test_update_item_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    item = create_random_item(db)
    data = {"title": "Updated title", "description": "Updated description"}
    response = client.put(
        f"{settings.API_V1_STR}/items/{item.id}",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_delete_item(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    item = create_random_item(db)
    response = client.delete(
        f"{settings.API_V1_STR}/items/{item.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "Item deleted successfully"


def test_delete_item_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/items/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Item not found"


def test_delete_item_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    item = create_random_item(db)
    response = client.delete(
        f"{settings.API_V1_STR}/items/{item.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"
````

## File: backend/tests/api/routes/test_login.py
````python
from unittest.mock import patch

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.core.security import verify_password
from app.crud import create_user
from app.models import UserCreate
from app.utils import generate_password_reset_token
from tests.utils.user import user_authentication_headers
from tests.utils.utils import random_email, random_lower_string


def test_get_access_token(client: TestClient) -> None:
    login_data = {
        "username": settings.FIRST_SUPERUSER,
        "password": settings.FIRST_SUPERUSER_PASSWORD,
    }
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
    tokens = r.json()
    assert r.status_code == 200
    assert "access_token" in tokens
    assert tokens["access_token"]


def test_get_access_token_incorrect_password(client: TestClient) -> None:
    login_data = {
        "username": settings.FIRST_SUPERUSER,
        "password": "incorrect",
    }
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
    assert r.status_code == 400


def test_use_access_token(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    r = client.post(
        f"{settings.API_V1_STR}/login/test-token",
        headers=superuser_token_headers,
    )
    result = r.json()
    assert r.status_code == 200
    assert "email" in result


def test_recovery_password(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    with (
        patch("app.core.config.settings.SMTP_HOST", "smtp.example.com"),
        patch("app.core.config.settings.SMTP_USER", "admin@example.com"),
    ):
        email = "test@example.com"
        r = client.post(
            f"{settings.API_V1_STR}/password-recovery/{email}",
            headers=normal_user_token_headers,
        )
        assert r.status_code == 200
        assert r.json() == {"message": "Password recovery email sent"}


def test_recovery_password_user_not_exits(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    email = "jVgQr@example.com"
    r = client.post(
        f"{settings.API_V1_STR}/password-recovery/{email}",
        headers=normal_user_token_headers,
    )
    assert r.status_code == 404


def test_reset_password(client: TestClient, db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    new_password = random_lower_string()

    user_create = UserCreate(
        email=email,
        full_name="Test User",
        password=password,
        is_active=True,
        is_superuser=False,
    )
    user = create_user(session=db, user_create=user_create)
    token = generate_password_reset_token(email=email)
    headers = user_authentication_headers(client=client, email=email, password=password)
    data = {"new_password": new_password, "token": token}

    r = client.post(
        f"{settings.API_V1_STR}/reset-password/",
        headers=headers,
        json=data,
    )

    assert r.status_code == 200
    assert r.json() == {"message": "Password updated successfully"}

    db.refresh(user)
    assert verify_password(new_password, user.hashed_password)


def test_reset_password_invalid_token(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"new_password": "changethis", "token": "invalid"}
    r = client.post(
        f"{settings.API_V1_STR}/reset-password/",
        headers=superuser_token_headers,
        json=data,
    )
    response = r.json()

    assert "detail" in response
    assert r.status_code == 400
    assert response["detail"] == "Invalid token"
````

## File: backend/tests/api/routes/test_private.py
````python
from fastapi.testclient import TestClient
from sqlmodel import Session, select

from app.core.config import settings
from app.models import User


def test_create_user(client: TestClient, db: Session) -> None:
    r = client.post(
        f"{settings.API_V1_STR}/private/users/",
        json={
            "email": "pollo@listo.com",
            "password": "password123",
            "full_name": "Pollo Listo",
        },
    )

    assert r.status_code == 200

    data = r.json()

    user = db.exec(select(User).where(User.id == data["id"])).first()

    assert user
    assert user.email == "pollo@listo.com"
    assert user.full_name == "Pollo Listo"
````

## File: backend/tests/api/routes/test_users.py
````python
import uuid
from unittest.mock import patch

from fastapi.testclient import TestClient
from sqlmodel import Session, select

from app import crud
from app.core.config import settings
from app.core.security import verify_password
from app.models import User, UserCreate
from tests.utils.utils import random_email, random_lower_string


def test_get_users_superuser_me(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    r = client.get(f"{settings.API_V1_STR}/users/me", headers=superuser_token_headers)
    current_user = r.json()
    assert current_user
    assert current_user["is_active"] is True
    assert current_user["is_superuser"]
    assert current_user["email"] == settings.FIRST_SUPERUSER


def test_get_users_normal_user_me(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    r = client.get(f"{settings.API_V1_STR}/users/me", headers=normal_user_token_headers)
    current_user = r.json()
    assert current_user
    assert current_user["is_active"] is True
    assert current_user["is_superuser"] is False
    assert current_user["email"] == settings.EMAIL_TEST_USER


def test_create_user_new_email(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    with (
        patch("app.utils.send_email", return_value=None),
        patch("app.core.config.settings.SMTP_HOST", "smtp.example.com"),
        patch("app.core.config.settings.SMTP_USER", "admin@example.com"),
    ):
        username = random_email()
        password = random_lower_string()
        data = {"email": username, "password": password}
        r = client.post(
            f"{settings.API_V1_STR}/users/",
            headers=superuser_token_headers,
            json=data,
        )
        assert 200 <= r.status_code < 300
        created_user = r.json()
        user = crud.get_user_by_email(session=db, email=username)
        assert user
        assert user.email == created_user["email"]


def test_get_existing_user(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    username = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=username, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    r = client.get(
        f"{settings.API_V1_STR}/users/{user_id}",
        headers=superuser_token_headers,
    )
    assert 200 <= r.status_code < 300
    api_user = r.json()
    existing_user = crud.get_user_by_email(session=db, email=username)
    assert existing_user
    assert existing_user.email == api_user["email"]


def test_get_existing_user_current_user(client: TestClient, db: Session) -> None:
    username = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=username, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id

    login_data = {
        "username": username,
        "password": password,
    }
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
    tokens = r.json()
    a_token = tokens["access_token"]
    headers = {"Authorization": f"Bearer {a_token}"}

    r = client.get(
        f"{settings.API_V1_STR}/users/{user_id}",
        headers=headers,
    )
    assert 200 <= r.status_code < 300
    api_user = r.json()
    existing_user = crud.get_user_by_email(session=db, email=username)
    assert existing_user
    assert existing_user.email == api_user["email"]


def test_get_existing_user_permissions_error(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    r = client.get(
        f"{settings.API_V1_STR}/users/{uuid.uuid4()}",
        headers=normal_user_token_headers,
    )
    assert r.status_code == 403
    assert r.json() == {"detail": "The user doesn't have enough privileges"}


def test_create_user_existing_username(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    username = random_email()
    # username = email
    password = random_lower_string()
    user_in = UserCreate(email=username, password=password)
    crud.create_user(session=db, user_create=user_in)
    data = {"email": username, "password": password}
    r = client.post(
        f"{settings.API_V1_STR}/users/",
        headers=superuser_token_headers,
        json=data,
    )
    created_user = r.json()
    assert r.status_code == 400
    assert "_id" not in created_user


def test_create_user_by_normal_user(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    username = random_email()
    password = random_lower_string()
    data = {"email": username, "password": password}
    r = client.post(
        f"{settings.API_V1_STR}/users/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert r.status_code == 403


def test_retrieve_users(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    username = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=username, password=password)
    crud.create_user(session=db, user_create=user_in)

    username2 = random_email()
    password2 = random_lower_string()
    user_in2 = UserCreate(email=username2, password=password2)
    crud.create_user(session=db, user_create=user_in2)

    r = client.get(f"{settings.API_V1_STR}/users/", headers=superuser_token_headers)
    all_users = r.json()

    assert len(all_users["data"]) > 1
    assert "count" in all_users
    for item in all_users["data"]:
        assert "email" in item


def test_update_user_me(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    full_name = "Updated Name"
    email = random_email()
    data = {"full_name": full_name, "email": email}
    r = client.patch(
        f"{settings.API_V1_STR}/users/me",
        headers=normal_user_token_headers,
        json=data,
    )
    assert r.status_code == 200
    updated_user = r.json()
    assert updated_user["email"] == email
    assert updated_user["full_name"] == full_name

    user_query = select(User).where(User.email == email)
    user_db = db.exec(user_query).first()
    assert user_db
    assert user_db.email == email
    assert user_db.full_name == full_name


def test_update_password_me(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    new_password = random_lower_string()
    data = {
        "current_password": settings.FIRST_SUPERUSER_PASSWORD,
        "new_password": new_password,
    }
    r = client.patch(
        f"{settings.API_V1_STR}/users/me/password",
        headers=superuser_token_headers,
        json=data,
    )
    assert r.status_code == 200
    updated_user = r.json()
    assert updated_user["message"] == "Password updated successfully"

    user_query = select(User).where(User.email == settings.FIRST_SUPERUSER)
    user_db = db.exec(user_query).first()
    assert user_db
    assert user_db.email == settings.FIRST_SUPERUSER
    assert verify_password(new_password, user_db.hashed_password)

    # Revert to the old password to keep consistency in test
    old_data = {
        "current_password": new_password,
        "new_password": settings.FIRST_SUPERUSER_PASSWORD,
    }
    r = client.patch(
        f"{settings.API_V1_STR}/users/me/password",
        headers=superuser_token_headers,
        json=old_data,
    )
    db.refresh(user_db)

    assert r.status_code == 200
    assert verify_password(settings.FIRST_SUPERUSER_PASSWORD, user_db.hashed_password)


def test_update_password_me_incorrect_password(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    new_password = random_lower_string()
    data = {"current_password": new_password, "new_password": new_password}
    r = client.patch(
        f"{settings.API_V1_STR}/users/me/password",
        headers=superuser_token_headers,
        json=data,
    )
    assert r.status_code == 400
    updated_user = r.json()
    assert updated_user["detail"] == "Incorrect password"


def test_update_user_me_email_exists(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    username = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=username, password=password)
    user = crud.create_user(session=db, user_create=user_in)

    data = {"email": user.email}
    r = client.patch(
        f"{settings.API_V1_STR}/users/me",
        headers=normal_user_token_headers,
        json=data,
    )
    assert r.status_code == 409
    assert r.json()["detail"] == "User with this email already exists"


def test_update_password_me_same_password_error(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {
        "current_password": settings.FIRST_SUPERUSER_PASSWORD,
        "new_password": settings.FIRST_SUPERUSER_PASSWORD,
    }
    r = client.patch(
        f"{settings.API_V1_STR}/users/me/password",
        headers=superuser_token_headers,
        json=data,
    )
    assert r.status_code == 400
    updated_user = r.json()
    assert (
        updated_user["detail"] == "New password cannot be the same as the current one"
    )


def test_register_user(client: TestClient, db: Session) -> None:
    username = random_email()
    password = random_lower_string()
    full_name = random_lower_string()
    data = {"email": username, "password": password, "full_name": full_name}
    r = client.post(
        f"{settings.API_V1_STR}/users/signup",
        json=data,
    )
    assert r.status_code == 200
    created_user = r.json()
    assert created_user["email"] == username
    assert created_user["full_name"] == full_name

    user_query = select(User).where(User.email == username)
    user_db = db.exec(user_query).first()
    assert user_db
    assert user_db.email == username
    assert user_db.full_name == full_name
    assert verify_password(password, user_db.hashed_password)


def test_register_user_already_exists_error(client: TestClient) -> None:
    password = random_lower_string()
    full_name = random_lower_string()
    data = {
        "email": settings.FIRST_SUPERUSER,
        "password": password,
        "full_name": full_name,
    }
    r = client.post(
        f"{settings.API_V1_STR}/users/signup",
        json=data,
    )
    assert r.status_code == 400
    assert r.json()["detail"] == "The user with this email already exists in the system"


def test_update_user(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    username = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=username, password=password)
    user = crud.create_user(session=db, user_create=user_in)

    data = {"full_name": "Updated_full_name"}
    r = client.patch(
        f"{settings.API_V1_STR}/users/{user.id}",
        headers=superuser_token_headers,
        json=data,
    )
    assert r.status_code == 200
    updated_user = r.json()

    assert updated_user["full_name"] == "Updated_full_name"

    user_query = select(User).where(User.email == username)
    user_db = db.exec(user_query).first()
    db.refresh(user_db)
    assert user_db
    assert user_db.full_name == "Updated_full_name"


def test_update_user_not_exists(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"full_name": "Updated_full_name"}
    r = client.patch(
        f"{settings.API_V1_STR}/users/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json=data,
    )
    assert r.status_code == 404
    assert r.json()["detail"] == "The user with this id does not exist in the system"


def test_update_user_email_exists(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    username = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=username, password=password)
    user = crud.create_user(session=db, user_create=user_in)

    username2 = random_email()
    password2 = random_lower_string()
    user_in2 = UserCreate(email=username2, password=password2)
    user2 = crud.create_user(session=db, user_create=user_in2)

    data = {"email": user2.email}
    r = client.patch(
        f"{settings.API_V1_STR}/users/{user.id}",
        headers=superuser_token_headers,
        json=data,
    )
    assert r.status_code == 409
    assert r.json()["detail"] == "User with this email already exists"


def test_delete_user_me(client: TestClient, db: Session) -> None:
    username = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=username, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id

    login_data = {
        "username": username,
        "password": password,
    }
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
    tokens = r.json()
    a_token = tokens["access_token"]
    headers = {"Authorization": f"Bearer {a_token}"}

    r = client.delete(
        f"{settings.API_V1_STR}/users/me",
        headers=headers,
    )
    assert r.status_code == 200
    deleted_user = r.json()
    assert deleted_user["message"] == "User deleted successfully"
    result = db.exec(select(User).where(User.id == user_id)).first()
    assert result is None

    user_query = select(User).where(User.id == user_id)
    user_db = db.execute(user_query).first()
    assert user_db is None


def test_delete_user_me_as_superuser(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    r = client.delete(
        f"{settings.API_V1_STR}/users/me",
        headers=superuser_token_headers,
    )
    assert r.status_code == 403
    response = r.json()
    assert response["detail"] == "Super users are not allowed to delete themselves"


def test_delete_user_super_user(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    username = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=username, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    r = client.delete(
        f"{settings.API_V1_STR}/users/{user_id}",
        headers=superuser_token_headers,
    )
    assert r.status_code == 200
    deleted_user = r.json()
    assert deleted_user["message"] == "User deleted successfully"
    result = db.exec(select(User).where(User.id == user_id)).first()
    assert result is None


def test_delete_user_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    r = client.delete(
        f"{settings.API_V1_STR}/users/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert r.status_code == 404
    assert r.json()["detail"] == "User not found"


def test_delete_user_current_super_user_error(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    super_user = crud.get_user_by_email(session=db, email=settings.FIRST_SUPERUSER)
    assert super_user
    user_id = super_user.id

    r = client.delete(
        f"{settings.API_V1_STR}/users/{user_id}",
        headers=superuser_token_headers,
    )
    assert r.status_code == 403
    assert r.json()["detail"] == "Super users are not allowed to delete themselves"


def test_delete_user_without_privileges(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    username = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=username, password=password)
    user = crud.create_user(session=db, user_create=user_in)

    r = client.delete(
        f"{settings.API_V1_STR}/users/{user.id}",
        headers=normal_user_token_headers,
    )
    assert r.status_code == 403
    assert r.json()["detail"] == "The user doesn't have enough privileges"
````

## File: backend/tests/api/__init__.py
````python

````

## File: backend/tests/crud/__init__.py
````python

````

## File: backend/tests/crud/test_user.py
````python
from fastapi.encoders import jsonable_encoder
from sqlmodel import Session

from app import crud
from app.core.security import verify_password
from app.models import User, UserCreate, UserUpdate
from tests.utils.utils import random_email, random_lower_string


def test_create_user(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    assert user.email == email
    assert hasattr(user, "hashed_password")


def test_authenticate_user(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    authenticated_user = crud.authenticate(session=db, email=email, password=password)
    assert authenticated_user
    assert user.email == authenticated_user.email


def test_not_authenticate_user(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user = crud.authenticate(session=db, email=email, password=password)
    assert user is None


def test_check_if_user_is_active(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    assert user.is_active is True


def test_check_if_user_is_active_inactive(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password, disabled=True)
    user = crud.create_user(session=db, user_create=user_in)
    assert user.is_active


def test_check_if_user_is_superuser(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password, is_superuser=True)
    user = crud.create_user(session=db, user_create=user_in)
    assert user.is_superuser is True


def test_check_if_user_is_superuser_normal_user(db: Session) -> None:
    username = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=username, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    assert user.is_superuser is False


def test_get_user(db: Session) -> None:
    password = random_lower_string()
    username = random_email()
    user_in = UserCreate(email=username, password=password, is_superuser=True)
    user = crud.create_user(session=db, user_create=user_in)
    user_2 = db.get(User, user.id)
    assert user_2
    assert user.email == user_2.email
    assert jsonable_encoder(user) == jsonable_encoder(user_2)


def test_update_user(db: Session) -> None:
    password = random_lower_string()
    email = random_email()
    user_in = UserCreate(email=email, password=password, is_superuser=True)
    user = crud.create_user(session=db, user_create=user_in)
    new_password = random_lower_string()
    user_in_update = UserUpdate(password=new_password, is_superuser=True)
    if user.id is not None:
        crud.update_user(session=db, db_user=user, user_in=user_in_update)
    user_2 = db.get(User, user.id)
    assert user_2
    assert user.email == user_2.email
    assert verify_password(new_password, user_2.hashed_password)
````

## File: backend/tests/scripts/__init__.py
````python

````

## File: backend/tests/scripts/test_backend_pre_start.py
````python
from unittest.mock import MagicMock, patch

from sqlmodel import select

from app.backend_pre_start import init, logger


def test_init_successful_connection() -> None:
    engine_mock = MagicMock()

    session_mock = MagicMock()
    exec_mock = MagicMock(return_value=True)
    session_mock.configure_mock(**{"exec.return_value": exec_mock})

    with (
        patch("sqlmodel.Session", return_value=session_mock),
        patch.object(logger, "info"),
        patch.object(logger, "error"),
        patch.object(logger, "warn"),
    ):
        try:
            init(engine_mock)
            connection_successful = True
        except Exception:
            connection_successful = False

        assert (
            connection_successful
        ), "The database connection should be successful and not raise an exception."

        assert session_mock.exec.called_once_with(
            select(1)
        ), "The session should execute a select statement once."
````

## File: backend/tests/scripts/test_test_pre_start.py
````python
from unittest.mock import MagicMock, patch

from sqlmodel import select

from app.tests_pre_start import init, logger


def test_init_successful_connection() -> None:
    engine_mock = MagicMock()

    session_mock = MagicMock()
    exec_mock = MagicMock(return_value=True)
    session_mock.configure_mock(**{"exec.return_value": exec_mock})

    with (
        patch("sqlmodel.Session", return_value=session_mock),
        patch.object(logger, "info"),
        patch.object(logger, "error"),
        patch.object(logger, "warn"),
    ):
        try:
            init(engine_mock)
            connection_successful = True
        except Exception:
            connection_successful = False

        assert (
            connection_successful
        ), "The database connection should be successful and not raise an exception."

        assert session_mock.exec.called_once_with(
            select(1)
        ), "The session should execute a select statement once."
````

## File: backend/tests/utils/__init__.py
````python

````

## File: backend/tests/utils/item.py
````python
from sqlmodel import Session

from app import crud
from app.models import Item, ItemCreate
from tests.utils.user import create_random_user
from tests.utils.utils import random_lower_string


def create_random_item(db: Session) -> Item:
    user = create_random_user(db)
    owner_id = user.id
    assert owner_id is not None
    title = random_lower_string()
    description = random_lower_string()
    item_in = ItemCreate(title=title, description=description)
    return crud.create_item(session=db, item_in=item_in, owner_id=owner_id)
````

## File: backend/tests/utils/user.py
````python
from fastapi.testclient import TestClient
from sqlmodel import Session

from app import crud
from app.core.config import settings
from app.models import User, UserCreate, UserUpdate
from tests.utils.utils import random_email, random_lower_string


def user_authentication_headers(
    *, client: TestClient, email: str, password: str
) -> dict[str, str]:
    data = {"username": email, "password": password}

    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=data)
    response = r.json()
    auth_token = response["access_token"]
    headers = {"Authorization": f"Bearer {auth_token}"}
    return headers


def create_random_user(db: Session) -> User:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    return user


def authentication_token_from_email(
    *, client: TestClient, email: str, db: Session
) -> dict[str, str]:
    """
    Return a valid token for the user with given email.

    If the user doesn't exist it is created first.
    """
    password = random_lower_string()
    user = crud.get_user_by_email(session=db, email=email)
    if not user:
        user_in_create = UserCreate(email=email, password=password)
        user = crud.create_user(session=db, user_create=user_in_create)
    else:
        user_in_update = UserUpdate(password=password)
        if not user.id:
            raise Exception("User id not set")
        user = crud.update_user(session=db, db_user=user, user_in=user_in_update)

    return user_authentication_headers(client=client, email=email, password=password)
````

## File: backend/tests/utils/utils.py
````python
import random
import string

from fastapi.testclient import TestClient

from app.core.config import settings


def random_lower_string() -> str:
    return "".join(random.choices(string.ascii_lowercase, k=32))


def random_email() -> str:
    return f"{random_lower_string()}@{random_lower_string()}.com"


def get_superuser_token_headers(client: TestClient) -> dict[str, str]:
    login_data = {
        "username": settings.FIRST_SUPERUSER,
        "password": settings.FIRST_SUPERUSER_PASSWORD,
    }
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
    tokens = r.json()
    a_token = tokens["access_token"]
    headers = {"Authorization": f"Bearer {a_token}"}
    return headers
````

## File: backend/tests/__init__.py
````python

````

## File: backend/tests/conftest.py
````python
from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, delete

from app.core.config import settings
from app.core.db import engine, init_db
from app.main import app
from app.models import Item, User
from tests.utils.user import authentication_token_from_email
from tests.utils.utils import get_superuser_token_headers


@pytest.fixture(scope="session", autouse=True)
def db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        init_db(session)
        yield session
        statement = delete(Item)
        session.execute(statement)
        statement = delete(User)
        session.execute(statement)
        session.commit()


@pytest.fixture(scope="module")
def client() -> Generator[TestClient, None, None]:
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="module")
def superuser_token_headers(client: TestClient) -> dict[str, str]:
    return get_superuser_token_headers(client)


@pytest.fixture(scope="module")
def normal_user_token_headers(client: TestClient, db: Session) -> dict[str, str]:
    return authentication_token_from_email(
        client=client, email=settings.EMAIL_TEST_USER, db=db
    )
````

## File: backend/.dockerignore
````
# Python
__pycache__
app.egg-info
*.pyc
.mypy_cache
.coverage
htmlcov
.venv
````

## File: backend/.gitignore
````
__pycache__
app.egg-info
*.pyc
.mypy_cache
.coverage
htmlcov
.cache
.venv
````

## File: backend/alembic.ini
````ini
# A generic, single database configuration.

[alembic]
# path to migration scripts
script_location = app/alembic

# template used to generate migration files
# file_template = %%(rev)s_%%(slug)s

# timezone to use when rendering the date
# within the migration file as well as the filename.
# string value is passed to dateutil.tz.gettz()
# leave blank for localtime
# timezone =

# max length of characters to apply to the
# "slug" field
#truncate_slug_length = 40

# set to 'true' to run the environment during
# the 'revision' command, regardless of autogenerate
# revision_environment = false

# set to 'true' to allow .pyc and .pyo files without
# a source .py file to be detected as revisions in the
# versions/ directory
# sourceless = false

# version location specification; this defaults
# to alembic/versions.  When using multiple version
# directories, initial revisions must be specified with --version-path
# version_locations = %(here)s/bar %(here)s/bat alembic/versions

# the output encoding used when revision files
# are written from script.py.mako
# output_encoding = utf-8

# Logging configuration
[loggers]
keys = root,sqlalchemy,alembic

[handlers]
keys = console

[formatters]
keys = generic

[logger_root]
level = WARN
handlers = console
qualname =

[logger_sqlalchemy]
level = WARN
handlers =
qualname = sqlalchemy.engine

[logger_alembic]
level = INFO
handlers =
qualname = alembic

[handler_console]
class = StreamHandler
args = (sys.stderr,)
level = NOTSET
formatter = generic

[formatter_generic]
format = %(levelname)-5.5s [%(name)s] %(message)s
datefmt = %H:%M:%S
````

## File: backend/Dockerfile
````
FROM python:3.10

ENV PYTHONUNBUFFERED=1

WORKDIR /app/

# Install uv
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#installing-uv
COPY --from=ghcr.io/astral-sh/uv:0.5.11 /uv /uvx /bin/

# Place executables in the environment at the front of the path
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#using-the-environment
ENV PATH="/app/.venv/bin:$PATH"

# Compile bytecode
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#compiling-bytecode
ENV UV_COMPILE_BYTECODE=1

# uv Cache
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#caching
ENV UV_LINK_MODE=copy

# Install dependencies
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#intermediate-layers
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project

ENV PYTHONPATH=/app

COPY ./scripts /app/scripts

COPY ./pyproject.toml ./uv.lock ./alembic.ini /app/

COPY ./app /app/app
COPY ./tests /app/tests

# Sync the project
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#intermediate-layers
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync

CMD ["fastapi", "run", "--workers", "4", "app/main.py"]
````

## File: backend/pyproject.toml
````toml
[project]
name = "app"
version = "0.1.0"
description = ""
requires-python = ">=3.10,<4.0"
dependencies = [
    "fastapi[standard]<1.0.0,>=0.114.2",
    "python-multipart<1.0.0,>=0.0.7",
    "email-validator<3.0.0.0,>=2.1.0.post1",
    "passlib[bcrypt]<2.0.0,>=1.7.4",
    "tenacity<9.0.0,>=8.2.3",
    "pydantic>2.0",
    "emails<1.0,>=0.6",
    "jinja2<4.0.0,>=3.1.4",
    "alembic<2.0.0,>=1.12.1",
    "httpx<1.0.0,>=0.25.1",
    "psycopg[binary]<4.0.0,>=3.1.13",
    "sqlmodel<1.0.0,>=0.0.21",
    # Pin bcrypt until passlib supports the latest
    "bcrypt==4.3.0",
    "pydantic-settings<3.0.0,>=2.2.1",
    "sentry-sdk[fastapi]<2.0.0,>=1.40.6",
    "pyjwt<3.0.0,>=2.8.0",
]

[tool.uv]
dev-dependencies = [
    "pytest<8.0.0,>=7.4.3",
    "mypy<2.0.0,>=1.8.0",
    "ruff<1.0.0,>=0.2.2",
    "prek>=0.2.24,<1.0.0",
    "types-passlib<2.0.0.0,>=1.7.7.20240106",
    "coverage<8.0.0,>=7.4.3",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.mypy]
strict = true
exclude = ["venv", ".venv", "alembic"]

[tool.ruff]
target-version = "py310"
exclude = ["alembic"]

[tool.ruff.lint]
select = [
    "E",  # pycodestyle errors
    "W",  # pycodestyle warnings
    "F",  # pyflakes
    "I",  # isort
    "B",  # flake8-bugbear
    "C4",  # flake8-comprehensions
    "UP",  # pyupgrade
    "ARG001", # unused arguments in functions
    "T201",   # print statements are not allowed
]
ignore = [
    "E501",  # line too long, handled by black
    "B008",  # do not perform function calls in argument defaults
    "W191",  # indentation contains tabs
    "B904",  # Allow raising exceptions without from e, for HTTPException
]

[tool.ruff.lint.pyupgrade]
# Preserve types, even if a file imports `from __future__ import annotations`.
keep-runtime-typing = true

[tool.coverage.run]
source = ["app"]
dynamic_context = "test_function"

[tool.coverage.report]
show_missing = true
sort = "-Cover"

[tool.coverage.html]
show_contexts = true
````

## File: backend/README.md
````markdown
# FastAPI Project - Backend

## Requirements

* [Docker](https://www.docker.com/).
* [uv](https://docs.astral.sh/uv/) for Python package and environment management.

## Docker Compose

Start the local development environment with Docker Compose following the guide in [../development.md](../development.md).

## General Workflow

By default, the dependencies are managed with [uv](https://docs.astral.sh/uv/), go there and install it.

From `./backend/` you can install all the dependencies with:

```console
$ uv sync
```

Then you can activate the virtual environment with:

```console
$ source .venv/bin/activate
```

Make sure your editor is using the correct Python virtual environment, with the interpreter at `backend/.venv/bin/python`.

Modify or add SQLModel models for data and SQL tables in `./backend/app/models.py`, API endpoints in `./backend/app/api/`, CRUD (Create, Read, Update, Delete) utils in `./backend/app/crud.py`.

## VS Code

There are already configurations in place to run the backend through the VS Code debugger, so that you can use breakpoints, pause and explore variables, etc.

The setup is also already configured so you can run the tests through the VS Code Python tests tab.

## Docker Compose Override

During development, you can change Docker Compose settings that will only affect the local development environment in the file `docker-compose.override.yml`.

The changes to that file only affect the local development environment, not the production environment. So, you can add "temporary" changes that help the development workflow.

For example, the directory with the backend code is synchronized in the Docker container, copying the code you change live to the directory inside the container. That allows you to test your changes right away, without having to build the Docker image again. It should only be done during development, for production, you should build the Docker image with a recent version of the backend code. But during development, it allows you to iterate very fast.

There is also a command override that runs `fastapi run --reload` instead of the default `fastapi run`. It starts a single server process (instead of multiple, as would be for production) and reloads the process whenever the code changes. Have in mind that if you have a syntax error and save the Python file, it will break and exit, and the container will stop. After that, you can restart the container by fixing the error and running again:

```console
$ docker compose watch
```

There is also a commented out `command` override, you can uncomment it and comment the default one. It makes the backend container run a process that does "nothing", but keeps the container alive. That allows you to get inside your running container and execute commands inside, for example a Python interpreter to test installed dependencies, or start the development server that reloads when it detects changes.

To get inside the container with a `bash` session you can start the stack with:

```console
$ docker compose watch
```

and then in another terminal, `exec` inside the running container:

```console
$ docker compose exec backend bash
```

You should see an output like:

```console
root@7f2607af31c3:/app#
```

that means that you are in a `bash` session inside your container, as a `root` user, under the `/app` directory, this directory has another directory called "app" inside, that's where your code lives inside the container: `/app/app`.

There you can use the `fastapi run --reload` command to run the debug live reloading server.

```console
$ fastapi run --reload app/main.py
```

...it will look like:

```console
root@7f2607af31c3:/app# fastapi run --reload app/main.py
```

and then hit enter. That runs the live reloading server that auto reloads when it detects code changes.

Nevertheless, if it doesn't detect a change but a syntax error, it will just stop with an error. But as the container is still alive and you are in a Bash session, you can quickly restart it after fixing the error, running the same command ("up arrow" and "Enter").

...this previous detail is what makes it useful to have the container alive doing nothing and then, in a Bash session, make it run the live reload server.

## Backend tests

To test the backend run:

```console
$ bash ./scripts/test.sh
```

The tests run with Pytest, modify and add tests to `./backend/tests/`.

If you use GitHub Actions the tests will run automatically.

### Test running stack

If your stack is already up and you just want to run the tests, you can use:

```bash
docker compose exec backend bash scripts/tests-start.sh
```

That `/app/scripts/tests-start.sh` script just calls `pytest` after making sure that the rest of the stack is running. If you need to pass extra arguments to `pytest`, you can pass them to that command and they will be forwarded.

For example, to stop on first error:

```bash
docker compose exec backend bash scripts/tests-start.sh -x
```

### Test Coverage

When the tests are run, a file `htmlcov/index.html` is generated, you can open it in your browser to see the coverage of the tests.

## Migrations

As during local development your app directory is mounted as a volume inside the container, you can also run the migrations with `alembic` commands inside the container and the migration code will be in your app directory (instead of being only inside the container). So you can add it to your git repository.

Make sure you create a "revision" of your models and that you "upgrade" your database with that revision every time you change them. As this is what will update the tables in your database. Otherwise, your application will have errors.

* Start an interactive session in the backend container:

```console
$ docker compose exec backend bash
```

* Alembic is already configured to import your SQLModel models from `./backend/app/models.py`.

* After changing a model (for example, adding a column), inside the container, create a revision, e.g.:

```console
$ alembic revision --autogenerate -m "Add column last_name to User model"
```

* Commit to the git repository the files generated in the alembic directory.

* After creating the revision, run the migration in the database (this is what will actually change the database):

```console
$ alembic upgrade head
```

If you don't want to use migrations at all, uncomment the lines in the file at `./backend/app/core/db.py` that end in:

```python
SQLModel.metadata.create_all(engine)
```

and comment the line in the file `scripts/prestart.sh` that contains:

```console
$ alembic upgrade head
```

If you don't want to start with the default models and want to remove them / modify them, from the beginning, without having any previous revision, you can remove the revision files (`.py` Python files) under `./backend/app/alembic/versions/`. And then create a first migration as described above.

## Email Templates

The email templates are in `./backend/app/email-templates/`. Here, there are two directories: `build` and `src`. The `src` directory contains the source files that are used to build the final email templates. The `build` directory contains the final email templates that are used by the application.

Before continuing, ensure you have the [MJML extension](https://marketplace.visualstudio.com/items?itemName=attilabuti.vscode-mjml) installed in your VS Code.

Once you have the MJML extension installed, you can create a new email template in the `src` directory. After creating the new email template and with the `.mjml` file open in your editor, open the command palette with `Ctrl+Shift+P` and search for `MJML: Export to HTML`. This will convert the `.mjml` file to a `.html` file and now you can save it in the build directory.
````

## File: frontend/public/assets/images/fastapi-icon-light.svg
````xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="500"
   height="500"
   viewBox="0 0 132.29167 132.29166"
   version="1.1"
   id="svg8"
   sodipodi:docname="icon-white-nomargin-transparent.svg"
   inkscape:version="1.3.2 (091e20e, 2023-11-25)"
   inkscape:export-filename="icon-teal-nomargin-transparent-500.png"
   inkscape:export-xdpi="96"
   inkscape:export-ydpi="96"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:dc="http://purl.org/dc/elements/1.1/">
  <sodipodi:namedview
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1"
     objecttolerance="10"
     gridtolerance="10"
     guidetolerance="10"
     inkscape:pageopacity="0"
     inkscape:pageshadow="2"
     inkscape:window-width="1720"
     inkscape:window-height="1371"
     id="namedview10"
     showgrid="false"
     inkscape:zoom="0.73657628"
     inkscape:cx="448.01877"
     inkscape:cy="-91.640203"
     inkscape:window-x="1720"
     inkscape:window-y="32"
     inkscape:window-maximized="0"
     inkscape:current-layer="g1"
     inkscape:showpageshadow="2"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm" />
  <defs
     id="defs2" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     id="g2149">
    <g
       id="g2141">
      <g
         id="g1">
        <path
           id="path875-5-9-7-3-2-3-9-9-8-0-0-5-87-7"
           style="fill:#ffffff;fill-opacity:0.980392;stroke:none;stroke-width:0.28098;stop-color:#000000"
           d="M 66.145833 0 A 66.145836 65.931923 0 0 0 0 65.931893 A 66.145836 65.931923 0 0 0 66.145833 131.86379 A 66.145836 65.931923 0 0 0 132.29167 65.931893 A 66.145836 65.931923 0 0 0 66.145833 0 z M 61.581771 29.853992 L 103.20042 29.853992 L 61.410205 59.222742 L 89.976937 59.222742 L 29.091248 102.00979 L 42.315763 72.641044 L 48.358289 59.222742 L 61.581771 29.853992 z " />
      </g>
    </g>
  </g>
  <rect
     y="-49.422424"
     x="-51.908718"
     height="162.82199"
     width="451.52316"
     id="rect824"
     style="opacity:0.98;fill:none;fill-opacity:1;stroke-width:0.311037" />
</svg>
````

## File: frontend/public/assets/images/fastapi-icon.svg
````xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="500"
   height="500"
   viewBox="0 0 132.29167 132.29166"
   version="1.1"
   id="svg8"
   sodipodi:docname="icon-teal-nomargin-transparent.svg"
   inkscape:version="1.3.2 (091e20e, 2023-11-25)"
   inkscape:export-filename="icon-teal-nomargin-192.png"
   inkscape:export-xdpi="36.863998"
   inkscape:export-ydpi="36.863998"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:dc="http://purl.org/dc/elements/1.1/">
  <sodipodi:namedview
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1"
     objecttolerance="10"
     gridtolerance="10"
     guidetolerance="10"
     inkscape:pageopacity="0"
     inkscape:pageshadow="2"
     inkscape:window-width="1720"
     inkscape:window-height="1371"
     id="namedview10"
     showgrid="false"
     inkscape:zoom="0.73657628"
     inkscape:cx="448.01877"
     inkscape:cy="-91.640203"
     inkscape:window-x="1720"
     inkscape:window-y="32"
     inkscape:window-maximized="0"
     inkscape:current-layer="g1"
     inkscape:showpageshadow="2"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm" />
  <defs
     id="defs2" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     id="g2149">
    <g
       id="g2141">
      <g
         id="g1">
        <path
           id="path875-5-9-7-3-2-3-9-9-8-0-0-5-87-7"
           style="fill:#009688;fill-opacity:0.980392;stroke:none;stroke-width:0.28098;stop-color:#000000"
           d="M 66.145833 0 A 66.145836 65.931923 0 0 0 0 65.931893 A 66.145836 65.931923 0 0 0 66.145833 131.86379 A 66.145836 65.931923 0 0 0 132.29167 65.931893 A 66.145836 65.931923 0 0 0 66.145833 0 z M 61.581771 29.853992 L 103.20042 29.853992 L 61.410205 59.222742 L 89.976937 59.222742 L 29.091248 102.00979 L 42.315763 72.641044 L 48.358289 59.222742 L 61.581771 29.853992 z " />
      </g>
    </g>
  </g>
  <rect
     y="-49.422424"
     x="-51.908718"
     height="162.82199"
     width="451.52316"
     id="rect824"
     style="opacity:0.98;fill:none;fill-opacity:1;stroke-width:0.311037" />
</svg>
````

## File: frontend/public/assets/images/fastapi-logo-light.svg
````xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="341.26324mm"
   height="63.977489mm"
   viewBox="0 0 341.26324 63.977485"
   version="1.1"
   id="svg8"
   sodipodi:docname="logo-white-nomargin-vector.svg"
   inkscape:version="1.3.2 (091e20e, 2023-11-25)"
   inkscape:export-filename="logo-white-margin-vector.png"
   inkscape:export-xdpi="57.604134"
   inkscape:export-ydpi="57.604134"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:dc="http://purl.org/dc/elements/1.1/">
  <sodipodi:namedview
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1"
     objecttolerance="10"
     gridtolerance="10"
     guidetolerance="10"
     inkscape:pageopacity="0"
     inkscape:pageshadow="2"
     inkscape:window-width="1720"
     inkscape:window-height="1371"
     id="namedview10"
     showgrid="false"
     inkscape:zoom="0.73657628"
     inkscape:cx="644.8755"
     inkscape:cy="95.713101"
     inkscape:window-x="1720"
     inkscape:window-y="32"
     inkscape:window-maximized="0"
     inkscape:current-layer="g2141"
     inkscape:showpageshadow="2"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm" />
  <defs
     id="defs2" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     id="g2149"
     transform="translate(2.5752783e-4,1.1668595e-4)">
    <g
       id="g2141">
      <g
         id="g1">
        <path
           id="path875-5-9-7-3-2-3-9-9-8-0-0-5-87-7"
           style="fill:#ffffff;fill-opacity:0.980392;stroke:none;stroke-width:0.136325;stop-color:#000000"
           d="M 32.092357,-1.166849e-4 A 32.092354,31.988569 0 0 0 -2.5752734e-4,31.988628 32.092354,31.988569 0 0 0 32.092357,63.977374 32.092354,31.988569 0 0 0 64.184455,31.988628 32.092354,31.988569 0 0 0 32.092357,-1.166849e-4 Z M 29.878022,14.484271 H 50.070588 L 29.794823,28.73353 H 43.654442 L 14.114126,49.49247 20.530789,35.243727 23.462393,28.73353 Z" />
        <path
           style="font-size:79.7151px;line-height:1.25;font-family:Ubuntu;-inkscape-font-specification:Ubuntu;letter-spacing:0px;word-spacing:0px;fill:#ffffff;stroke-width:1.99288"
           d="M 89.762163,59.410606 V 4.1680399 H 121.88735 V 9.5089518 H 95.979941 V 28.082571 h 22.957949 v 5.340912 H 95.979941 v 25.987123 z m 51.017587,0.876867 q -4.46405,0 -7.97152,-1.275442 -3.50746,-1.275442 -5.50034,-4.145185 -1.99288,-2.869744 -1.99288,-7.572935 0,-4.543761 2.23203,-7.33379 2.23202,-2.869743 6.13806,-4.145185 3.98576,-1.275442 8.92809,-1.275442 2.23203,0 4.70319,0.398576 2.47117,0.398575 3.10889,0.717436 v -2.391453 q 0,-2.710314 -0.71743,-5.181482 -0.63772,-2.550883 -2.71032,-4.145186 -2.07259,-1.594302 -6.29749,-1.594302 -4.38433,0 -6.69607,0.637721 -2.31174,0.637721 -3.42775,1.036297 l -0.79715,-5.101767 q 1.43487,-0.637721 4.38433,-1.195727 2.94946,-0.558005 6.93522,-0.558005 5.65977,0 8.92809,1.992877 3.34803,1.992878 4.7829,5.500342 1.51459,3.42775 1.51459,7.891796 v 25.907408 q -1.67402,0.398576 -5.97863,1.116012 -4.30462,0.717436 -9.56581,0.717436 z m 0.87686,-5.101767 q 2.79003,0 5.02205,-0.15943 2.23203,-0.239146 3.74661,-0.558006 V 40.597842 q -0.79715,-0.398575 -2.71031,-0.797151 -1.91316,-0.398576 -4.94234,-0.398576 -2.55088,0 -5.18148,0.558006 -2.6306,0.558006 -4.46404,2.232023 -1.75374,1.674017 -1.75374,5.022052 0,4.464045 2.79003,6.217778 2.79003,1.753732 7.49322,1.753732 z m 36.4298,5.181482 q -5.34092,0 -8.37009,-0.956582 -2.94946,-0.876866 -3.98575,-1.355156 l 1.43487,-5.261197 q 0.87686,0.31886 3.58718,1.355157 2.71031,1.036296 7.33379,1.036296 4.38433,0 7.09464,-1.355157 2.71031,-1.355157 2.71031,-4.703191 0,-2.152308 -0.95658,-3.427749 -0.95658,-1.355157 -3.10889,-2.471169 -2.07259,-1.116011 -5.73948,-2.550883 -3.10889,-1.275442 -5.73949,-2.710313 -2.6306,-1.434872 -4.30462,-3.666895 -1.5943,-2.232023 -1.5943,-5.739488 0,-3.427749 1.75373,-5.978632 1.75374,-2.550884 4.94234,-3.985755 3.26832,-1.434872 7.73237,-1.434872 4.14518,0 7.01492,0.717436 2.86975,0.717436 4.06547,1.275441 l -1.35515,5.181482 q -1.0363,-0.558006 -3.34804,-1.275442 -2.31173,-0.797151 -6.53663,-0.797151 -3.34804,0 -5.81921,1.434872 -2.47117,1.355157 -2.47117,4.384331 0,2.152308 1.0363,3.507464 1.0363,1.275442 3.10889,2.311738 2.07259,1.036297 5.10177,2.232023 3.42775,1.355157 6.13806,2.869744 2.79003,1.434872 4.46405,3.74661 1.67401,2.311738 1.67401,6.138063 0,3.74661 -1.91316,6.377208 -1.91316,2.550883 -5.50034,3.826325 -3.50747,1.275442 -8.4498,1.275442 z m 39.21967,-0.07972 q -5.2612,0 -8.29037,-1.833448 -3.02917,-1.833447 -4.30461,-5.500342 -1.19573,-3.666895 -1.19573,-9.167237 V 6.1609175 L 209.494,5.1246211 V 18.118183 h 16.18217 v 5.022051 H 209.494 v 21.124503 q 0,4.38433 0.95658,6.696068 1.0363,2.311738 2.86975,3.188605 1.91316,0.797151 4.46404,0.797151 3.02918,0 5.02205,-0.717436 2.0726,-0.717436 3.26832,-1.275442 l 1.27544,4.862621 q -1.19572,0.717436 -3.98575,1.594302 -2.71031,0.876867 -6.05835,0.876867 z m 11.95723,-0.876867 q 4.30462,-11.55869 7.8918,-21.044787 3.58718,-9.486097 7.01493,-17.776468 3.50746,-8.370086 7.4135,-16.4213111 h 5.58006 q 2.86974,6.0583481 5.50034,12.2761261 2.71032,6.138063 5.34091,12.754416 2.6306,6.616354 5.42063,14.109574 2.86975,7.413504 6.05835,16.10245 h -6.77578 q -1.43488,-3.985755 -2.79003,-7.572934 -1.35516,-3.666895 -2.55089,-7.17436 h -26.30598 q -1.27544,3.507465 -2.6306,7.17436 -1.35516,3.587179 -2.71031,7.572934 z M 242.8946,39.402115 h 22.63909 q -1.51459,-3.985755 -2.94946,-7.732365 -1.43487,-3.746609 -2.86975,-7.254074 -1.35515,-3.507464 -2.79002,-6.775784 -1.35516,-3.348034 -2.79003,-6.536638 -1.35516,3.188604 -2.79003,6.536638 -1.35516,3.26832 -2.79003,6.775784 -1.35516,3.507465 -2.79003,7.254074 -1.43487,3.74661 -2.86974,7.732365 z m 44.481,20.008491 V 5.2043362 q 3.02917,-0.797151 6.93521,-1.1160114 3.98576,-0.3985755 7.33379,-0.3985755 11.71812,0 17.53732,4.5437609 5.89892,4.4640458 5.89892,12.7544168 0,6.297493 -2.94946,10.123818 -2.86974,3.826325 -8.37008,5.580057 -5.42063,1.674017 -13.07328,1.674017 h -7.09465 v 21.044787 z m 6.21777,-26.385699 h 6.53664 q 5.65978,0 9.80496,-0.956581 4.14519,-1.036296 6.37721,-3.666895 2.31174,-2.630598 2.31174,-7.493219 0,-4.703192 -2.39146,-7.254075 -2.39145,-2.550883 -6.21777,-3.587179 -3.82633,-1.0362968 -8.13094,-1.0362968 -2.79003,0 -4.86263,0.2391453 -1.99287,0.1594302 -3.42775,0.3188604 z M 335.0452,59.410606 V 4.1680399 h 6.21778 V 59.410606 Z"
           id="text979-3"
           aria-label="FastAPI" />
      </g>
    </g>
  </g>
  <rect
     y="-49.422306"
     x="-51.908459"
     height="162.82199"
     width="451.52316"
     id="rect824"
     style="opacity:0.98;fill:none;fill-opacity:1;stroke-width:0.311037" />
</svg>
````

## File: frontend/public/assets/images/fastapi-logo.svg
````xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="341.26297mm"
   height="63.977139mm"
   viewBox="0 0 341.26297 63.977134"
   version="1.1"
   id="svg8"
   sodipodi:docname="logo-teal-nomargin-vector.svg"
   inkscape:version="1.3.2 (091e20e, 2023-11-25)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:dc="http://purl.org/dc/elements/1.1/">
  <sodipodi:namedview
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1"
     objecttolerance="10"
     gridtolerance="10"
     guidetolerance="10"
     inkscape:pageopacity="0"
     inkscape:pageshadow="2"
     inkscape:window-width="1720"
     inkscape:window-height="1371"
     id="namedview10"
     showgrid="false"
     inkscape:zoom="0.73657628"
     inkscape:cx="448.01877"
     inkscape:cy="-91.640203"
     inkscape:window-x="1720"
     inkscape:window-y="32"
     inkscape:window-maximized="0"
     inkscape:current-layer="g1"
     inkscape:showpageshadow="2"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm" />
  <defs
     id="defs2" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     id="g2149">
    <g
       id="g2141">
      <g
         id="g1">
        <g
           id="g2106"
           transform="matrix(0.96564264,0,0,0.96251987,-899.3295,194.86874)">
          <circle
             style="fill:#009688;fill-opacity:0.980392;stroke:none;stroke-width:0.141404;stop-color:#000000"
             id="path875-5-9-7-3-2-3-9-9-8-0-0-5-87-7"
             cx="964.56165"
             cy="-169.22266"
             r="33.234192"
             inkscape:export-xdpi="1543.8315"
             inkscape:export-ydpi="1543.8315" />
          <path
             id="rect1249-6-3-4-4-3-6-6-1-2"
             style="fill:#ffffff;fill-opacity:0.980392;stroke:none;stroke-width:0.146895;stop-color:#000000"
             d="m 962.2685,-187.40837 -6.64403,14.80375 -3.03599,6.76393 -6.64456,14.80375 30.59142,-21.56768 h -14.35312 l 20.99715,-14.80375 z" />
        </g>
        <path
           style="font-size:79.7151px;line-height:1.25;font-family:Ubuntu;-inkscape-font-specification:Ubuntu;letter-spacing:0px;word-spacing:0px;fill:#009688;stroke-width:1.99288"
           d="M 89.762163,59.410606 V 4.1680399 H 121.88735 V 9.5089518 H 95.979941 V 28.082571 h 22.957949 v 5.340912 H 95.979941 v 25.987123 z m 51.017587,0.876867 q -4.46405,0 -7.97152,-1.275442 -3.50746,-1.275442 -5.50034,-4.145185 -1.99288,-2.869744 -1.99288,-7.572935 0,-4.543761 2.23203,-7.33379 2.23202,-2.869743 6.13806,-4.145185 3.98576,-1.275442 8.92809,-1.275442 2.23203,0 4.70319,0.398576 2.47117,0.398575 3.10889,0.717436 v -2.391453 q 0,-2.710314 -0.71743,-5.181482 -0.63772,-2.550883 -2.71032,-4.145186 -2.07259,-1.594302 -6.29749,-1.594302 -4.38433,0 -6.69607,0.637721 -2.31174,0.637721 -3.42775,1.036297 l -0.79715,-5.101767 q 1.43487,-0.637721 4.38433,-1.195727 2.94946,-0.558005 6.93522,-0.558005 5.65977,0 8.92809,1.992877 3.34803,1.992878 4.7829,5.500342 1.51459,3.42775 1.51459,7.891796 v 25.907408 q -1.67402,0.398576 -5.97863,1.116012 -4.30462,0.717436 -9.56581,0.717436 z m 0.87686,-5.101767 q 2.79003,0 5.02205,-0.15943 2.23203,-0.239146 3.74661,-0.558006 V 40.597842 q -0.79715,-0.398575 -2.71031,-0.797151 -1.91316,-0.398576 -4.94234,-0.398576 -2.55088,0 -5.18148,0.558006 -2.6306,0.558006 -4.46404,2.232023 -1.75374,1.674017 -1.75374,5.022052 0,4.464045 2.79003,6.217778 2.79003,1.753732 7.49322,1.753732 z m 36.4298,5.181482 q -5.34092,0 -8.37009,-0.956582 -2.94946,-0.876866 -3.98575,-1.355156 l 1.43487,-5.261197 q 0.87686,0.31886 3.58718,1.355157 2.71031,1.036296 7.33379,1.036296 4.38433,0 7.09464,-1.355157 2.71031,-1.355157 2.71031,-4.703191 0,-2.152308 -0.95658,-3.427749 -0.95658,-1.355157 -3.10889,-2.471169 -2.07259,-1.116011 -5.73948,-2.550883 -3.10889,-1.275442 -5.73949,-2.710313 -2.6306,-1.434872 -4.30462,-3.666895 -1.5943,-2.232023 -1.5943,-5.739488 0,-3.427749 1.75373,-5.978632 1.75374,-2.550884 4.94234,-3.985755 3.26832,-1.434872 7.73237,-1.434872 4.14518,0 7.01492,0.717436 2.86975,0.717436 4.06547,1.275441 l -1.35515,5.181482 q -1.0363,-0.558006 -3.34804,-1.275442 -2.31173,-0.797151 -6.53663,-0.797151 -3.34804,0 -5.81921,1.434872 -2.47117,1.355157 -2.47117,4.384331 0,2.152308 1.0363,3.507464 1.0363,1.275442 3.10889,2.311738 2.07259,1.036297 5.10177,2.232023 3.42775,1.355157 6.13806,2.869744 2.79003,1.434872 4.46405,3.74661 1.67401,2.311738 1.67401,6.138063 0,3.74661 -1.91316,6.377208 -1.91316,2.550883 -5.50034,3.826325 -3.50747,1.275442 -8.4498,1.275442 z m 39.21967,-0.07972 q -5.2612,0 -8.29037,-1.833448 -3.02917,-1.833447 -4.30461,-5.500342 -1.19573,-3.666895 -1.19573,-9.167237 V 6.1609175 L 209.494,5.1246211 V 18.118183 h 16.18217 v 5.022051 H 209.494 v 21.124503 q 0,4.38433 0.95658,6.696068 1.0363,2.311738 2.86975,3.188605 1.91316,0.797151 4.46404,0.797151 3.02918,0 5.02205,-0.717436 2.0726,-0.717436 3.26832,-1.275442 l 1.27544,4.862621 q -1.19572,0.717436 -3.98575,1.594302 -2.71031,0.876867 -6.05835,0.876867 z m 11.95723,-0.876867 q 4.30462,-11.55869 7.8918,-21.044787 3.58718,-9.486097 7.01493,-17.776468 3.50746,-8.370086 7.4135,-16.4213111 h 5.58006 q 2.86974,6.0583481 5.50034,12.2761261 2.71032,6.138063 5.34091,12.754416 2.6306,6.616354 5.42063,14.109574 2.86975,7.413504 6.05835,16.10245 h -6.77578 q -1.43488,-3.985755 -2.79003,-7.572934 -1.35516,-3.666895 -2.55089,-7.17436 h -26.30598 q -1.27544,3.507465 -2.6306,7.17436 -1.35516,3.587179 -2.71031,7.572934 z M 242.8946,39.402115 h 22.63909 q -1.51459,-3.985755 -2.94946,-7.732365 -1.43487,-3.746609 -2.86975,-7.254074 -1.35515,-3.507464 -2.79002,-6.775784 -1.35516,-3.348034 -2.79003,-6.536638 -1.35516,3.188604 -2.79003,6.536638 -1.35516,3.26832 -2.79003,6.775784 -1.35516,3.507465 -2.79003,7.254074 -1.43487,3.74661 -2.86974,7.732365 z m 44.481,20.008491 V 5.2043362 q 3.02917,-0.797151 6.93521,-1.1160114 3.98576,-0.3985755 7.33379,-0.3985755 11.71812,0 17.53732,4.5437609 5.89892,4.4640458 5.89892,12.7544168 0,6.297493 -2.94946,10.123818 -2.86974,3.826325 -8.37008,5.580057 -5.42063,1.674017 -13.07328,1.674017 h -7.09465 v 21.044787 z m 6.21777,-26.385699 h 6.53664 q 5.65978,0 9.80496,-0.956581 4.14519,-1.036296 6.37721,-3.666895 2.31174,-2.630598 2.31174,-7.493219 0,-4.703192 -2.39146,-7.254075 -2.39145,-2.550883 -6.21777,-3.587179 -3.82633,-1.0362968 -8.13094,-1.0362968 -2.79003,0 -4.86263,0.2391453 -1.99287,0.1594302 -3.42775,0.3188604 z M 335.0452,59.410606 V 4.1680399 h 6.21778 V 59.410606 Z"
           id="text979-3"
           aria-label="FastAPI" />
      </g>
    </g>
  </g>
  <rect
     y="-49.422424"
     x="-51.908718"
     height="162.82199"
     width="451.52316"
     id="rect824"
     style="opacity:0.98;fill:none;fill-opacity:1;stroke-width:0.311037" />
</svg>
````

## File: frontend/src/client/core/ApiError.ts
````typescript
import type { ApiRequestOptions } from './ApiRequestOptions';
import type { ApiResult } from './ApiResult';

export class ApiError extends Error {
	public readonly url: string;
	public readonly status: number;
	public readonly statusText: string;
	public readonly body: unknown;
	public readonly request: ApiRequestOptions;

	constructor(request: ApiRequestOptions, response: ApiResult, message: string) {
		super(message);

		this.name = 'ApiError';
		this.url = response.url;
		this.status = response.status;
		this.statusText = response.statusText;
		this.body = response.body;
		this.request = request;
	}
}
````

## File: frontend/src/client/core/ApiRequestOptions.ts
````typescript
export type ApiRequestOptions<T = unknown> = {
	readonly body?: any;
	readonly cookies?: Record<string, unknown>;
	readonly errors?: Record<number | string, string>;
	readonly formData?: Record<string, unknown> | any[] | Blob | File;
	readonly headers?: Record<string, unknown>;
	readonly mediaType?: string;
	readonly method:
		| 'DELETE'
		| 'GET'
		| 'HEAD'
		| 'OPTIONS'
		| 'PATCH'
		| 'POST'
		| 'PUT';
	readonly path?: Record<string, unknown>;
	readonly query?: Record<string, unknown>;
	readonly responseHeader?: string;
	readonly responseTransformer?: (data: unknown) => Promise<T>;
	readonly url: string;
};
````

## File: frontend/src/client/core/ApiResult.ts
````typescript
export type ApiResult<TData = any> = {
	readonly body: TData;
	readonly ok: boolean;
	readonly status: number;
	readonly statusText: string;
	readonly url: string;
};
````

## File: frontend/src/client/core/CancelablePromise.ts
````typescript
export class CancelError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'CancelError';
	}

	public get isCancelled(): boolean {
		return true;
	}
}

export interface OnCancel {
	readonly isResolved: boolean;
	readonly isRejected: boolean;
	readonly isCancelled: boolean;

	(cancelHandler: () => void): void;
}

export class CancelablePromise<T> implements Promise<T> {
	private _isResolved: boolean;
	private _isRejected: boolean;
	private _isCancelled: boolean;
	readonly cancelHandlers: (() => void)[];
	readonly promise: Promise<T>;
	private _resolve?: (value: T | PromiseLike<T>) => void;
	private _reject?: (reason?: unknown) => void;

	constructor(
		executor: (
			resolve: (value: T | PromiseLike<T>) => void,
			reject: (reason?: unknown) => void,
			onCancel: OnCancel
		) => void
	) {
		this._isResolved = false;
		this._isRejected = false;
		this._isCancelled = false;
		this.cancelHandlers = [];
		this.promise = new Promise<T>((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;

			const onResolve = (value: T | PromiseLike<T>): void => {
				if (this._isResolved || this._isRejected || this._isCancelled) {
					return;
				}
				this._isResolved = true;
				if (this._resolve) this._resolve(value);
			};

			const onReject = (reason?: unknown): void => {
				if (this._isResolved || this._isRejected || this._isCancelled) {
					return;
				}
				this._isRejected = true;
				if (this._reject) this._reject(reason);
			};

			const onCancel = (cancelHandler: () => void): void => {
				if (this._isResolved || this._isRejected || this._isCancelled) {
					return;
				}
				this.cancelHandlers.push(cancelHandler);
			};

			Object.defineProperty(onCancel, 'isResolved', {
				get: (): boolean => this._isResolved,
			});

			Object.defineProperty(onCancel, 'isRejected', {
				get: (): boolean => this._isRejected,
			});

			Object.defineProperty(onCancel, 'isCancelled', {
				get: (): boolean => this._isCancelled,
			});

			return executor(onResolve, onReject, onCancel as OnCancel);
		});
	}

	get [Symbol.toStringTag]() {
		return "Cancellable Promise";
	}

	public then<TResult1 = T, TResult2 = never>(
		onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
		onRejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
	): Promise<TResult1 | TResult2> {
		return this.promise.then(onFulfilled, onRejected);
	}

	public catch<TResult = never>(
		onRejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null
	): Promise<T | TResult> {
		return this.promise.catch(onRejected);
	}

	public finally(onFinally?: (() => void) | null): Promise<T> {
		return this.promise.finally(onFinally);
	}

	public cancel(): void {
		if (this._isResolved || this._isRejected || this._isCancelled) {
			return;
		}
		this._isCancelled = true;
		if (this.cancelHandlers.length) {
			try {
				for (const cancelHandler of this.cancelHandlers) {
					cancelHandler();
				}
			} catch (error) {
				console.warn('Cancellation threw an error', error);
				return;
			}
		}
		this.cancelHandlers.length = 0;
		if (this._reject) this._reject(new CancelError('Request aborted'));
	}

	public get isCancelled(): boolean {
		return this._isCancelled;
	}
}
````

## File: frontend/src/client/core/OpenAPI.ts
````typescript
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiRequestOptions } from './ApiRequestOptions';

type Headers = Record<string, string>;
type Middleware<T> = (value: T) => T | Promise<T>;
type Resolver<T> = (options: ApiRequestOptions<T>) => Promise<T>;

export class Interceptors<T> {
  _fns: Middleware<T>[];

  constructor() {
    this._fns = [];
  }

  eject(fn: Middleware<T>): void {
    const index = this._fns.indexOf(fn);
    if (index !== -1) {
      this._fns = [...this._fns.slice(0, index), ...this._fns.slice(index + 1)];
    }
  }

  use(fn: Middleware<T>): void {
    this._fns = [...this._fns, fn];
  }
}

export type OpenAPIConfig = {
	BASE: string;
	CREDENTIALS: 'include' | 'omit' | 'same-origin';
	ENCODE_PATH?: ((path: string) => string) | undefined;
	HEADERS?: Headers | Resolver<Headers> | undefined;
	PASSWORD?: string | Resolver<string> | undefined;
	TOKEN?: string | Resolver<string> | undefined;
	USERNAME?: string | Resolver<string> | undefined;
	VERSION: string;
	WITH_CREDENTIALS: boolean;
	interceptors: {
		request: Interceptors<AxiosRequestConfig>;
		response: Interceptors<AxiosResponse>;
	};
};

export const OpenAPI: OpenAPIConfig = {
	BASE: '',
	CREDENTIALS: 'include',
	ENCODE_PATH: undefined,
	HEADERS: undefined,
	PASSWORD: undefined,
	TOKEN: undefined,
	USERNAME: undefined,
	VERSION: '0.1.0',
	WITH_CREDENTIALS: false,
	interceptors: {
		request: new Interceptors(),
		response: new Interceptors(),
	},
};
````

## File: frontend/src/client/core/request.ts
````typescript
import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

import { ApiError } from './ApiError';
import type { ApiRequestOptions } from './ApiRequestOptions';
import type { ApiResult } from './ApiResult';
import { CancelablePromise } from './CancelablePromise';
import type { OnCancel } from './CancelablePromise';
import type { OpenAPIConfig } from './OpenAPI';

export const isString = (value: unknown): value is string => {
	return typeof value === 'string';
};

export const isStringWithValue = (value: unknown): value is string => {
	return isString(value) && value !== '';
};

export const isBlob = (value: any): value is Blob => {
	return value instanceof Blob;
};

export const isFormData = (value: unknown): value is FormData => {
	return value instanceof FormData;
};

export const isSuccess = (status: number): boolean => {
	return status >= 200 && status < 300;
};

export const base64 = (str: string): string => {
	try {
		return btoa(str);
	} catch (err) {
		// @ts-ignore
		return Buffer.from(str).toString('base64');
	}
};

export const getQueryString = (params: Record<string, unknown>): string => {
	const qs: string[] = [];

	const append = (key: string, value: unknown) => {
		qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
	};

	const encodePair = (key: string, value: unknown) => {
		if (value === undefined || value === null) {
			return;
		}

		if (value instanceof Date) {
			append(key, value.toISOString());
		} else if (Array.isArray(value)) {
			value.forEach(v => encodePair(key, v));
		} else if (typeof value === 'object') {
			Object.entries(value).forEach(([k, v]) => encodePair(`${key}[${k}]`, v));
		} else {
			append(key, value);
		}
	};

	Object.entries(params).forEach(([key, value]) => encodePair(key, value));

	return qs.length ? `?${qs.join('&')}` : '';
};

const getUrl = (config: OpenAPIConfig, options: ApiRequestOptions): string => {
	const encoder = config.ENCODE_PATH || encodeURI;

	const path = options.url
		.replace('{api-version}', config.VERSION)
		.replace(/{(.*?)}/g, (substring: string, group: string) => {
			if (options.path?.hasOwnProperty(group)) {
				return encoder(String(options.path[group]));
			}
			return substring;
		});

	const url = config.BASE + path;
	return options.query ? url + getQueryString(options.query) : url;
};

export const getFormData = (options: ApiRequestOptions): FormData | undefined => {
	if (options.formData) {
		const formData = new FormData();

		const process = (key: string, value: unknown) => {
			if (isString(value) || isBlob(value)) {
				formData.append(key, value);
			} else {
				formData.append(key, JSON.stringify(value));
			}
		};

		Object.entries(options.formData)
			.filter(([, value]) => value !== undefined && value !== null)
			.forEach(([key, value]) => {
				if (Array.isArray(value)) {
					value.forEach(v => process(key, v));
				} else {
					process(key, value);
				}
			});

		return formData;
	}
	return undefined;
};

type Resolver<T> = (options: ApiRequestOptions<T>) => Promise<T>;

export const resolve = async <T>(options: ApiRequestOptions<T>, resolver?: T | Resolver<T>): Promise<T | undefined> => {
	if (typeof resolver === 'function') {
		return (resolver as Resolver<T>)(options);
	}
	return resolver;
};

export const getHeaders = async <T>(config: OpenAPIConfig, options: ApiRequestOptions<T>): Promise<Record<string, string>> => {
	const [token, username, password, additionalHeaders] = await Promise.all([
		// @ts-ignore
		resolve(options, config.TOKEN),
		// @ts-ignore
		resolve(options, config.USERNAME),
		// @ts-ignore
		resolve(options, config.PASSWORD),
		// @ts-ignore
		resolve(options, config.HEADERS),
	]);

	const headers = Object.entries({
		Accept: 'application/json',
		...additionalHeaders,
		...options.headers,
	})
	.filter(([, value]) => value !== undefined && value !== null)
	.reduce((headers, [key, value]) => ({
		...headers,
		[key]: String(value),
	}), {} as Record<string, string>);

	if (isStringWithValue(token)) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	if (isStringWithValue(username) && isStringWithValue(password)) {
		const credentials = base64(`${username}:${password}`);
		headers['Authorization'] = `Basic ${credentials}`;
	}

	if (options.body !== undefined) {
		if (options.mediaType) {
			headers['Content-Type'] = options.mediaType;
		} else if (isBlob(options.body)) {
			headers['Content-Type'] = options.body.type || 'application/octet-stream';
		} else if (isString(options.body)) {
			headers['Content-Type'] = 'text/plain';
		} else if (!isFormData(options.body)) {
			headers['Content-Type'] = 'application/json';
		}
	} else if (options.formData !== undefined) {
		if (options.mediaType) {
			headers['Content-Type'] = options.mediaType;
		}
	}

	return headers;
};

export const getRequestBody = (options: ApiRequestOptions): unknown => {
	if (options.body) {
		return options.body;
	}
	return undefined;
};

export const sendRequest = async <T>(
	config: OpenAPIConfig,
	options: ApiRequestOptions<T>,
	url: string,
	body: unknown,
	formData: FormData | undefined,
	headers: Record<string, string>,
	onCancel: OnCancel,
	axiosClient: AxiosInstance
): Promise<AxiosResponse<T>> => {
	const controller = new AbortController();

	let requestConfig: AxiosRequestConfig = {
		data: body ?? formData,
		headers,
		method: options.method,
		signal: controller.signal,
		url,
		withCredentials: config.WITH_CREDENTIALS,
	};

	onCancel(() => controller.abort());

	for (const fn of config.interceptors.request._fns) {
		requestConfig = await fn(requestConfig);
	}

	try {
		return await axiosClient.request(requestConfig);
	} catch (error) {
		const axiosError = error as AxiosError<T>;
		if (axiosError.response) {
			return axiosError.response;
		}
		throw error;
	}
};

export const getResponseHeader = (response: AxiosResponse<unknown>, responseHeader?: string): string | undefined => {
	if (responseHeader) {
		const content = response.headers[responseHeader];
		if (isString(content)) {
			return content;
		}
	}
	return undefined;
};

export const getResponseBody = (response: AxiosResponse<unknown>): unknown => {
	if (response.status !== 204) {
		return response.data;
	}
	return undefined;
};

export const catchErrorCodes = (options: ApiRequestOptions, result: ApiResult): void => {
	const errors: Record<number, string> = {
		400: 'Bad Request',
		401: 'Unauthorized',
		402: 'Payment Required',
		403: 'Forbidden',
		404: 'Not Found',
		405: 'Method Not Allowed',
		406: 'Not Acceptable',
		407: 'Proxy Authentication Required',
		408: 'Request Timeout',
		409: 'Conflict',
		410: 'Gone',
		411: 'Length Required',
		412: 'Precondition Failed',
		413: 'Payload Too Large',
		414: 'URI Too Long',
		415: 'Unsupported Media Type',
		416: 'Range Not Satisfiable',
		417: 'Expectation Failed',
		418: 'Im a teapot',
		421: 'Misdirected Request',
		422: 'Unprocessable Content',
		423: 'Locked',
		424: 'Failed Dependency',
		425: 'Too Early',
		426: 'Upgrade Required',
		428: 'Precondition Required',
		429: 'Too Many Requests',
		431: 'Request Header Fields Too Large',
		451: 'Unavailable For Legal Reasons',
		500: 'Internal Server Error',
		501: 'Not Implemented',
		502: 'Bad Gateway',
		503: 'Service Unavailable',
		504: 'Gateway Timeout',
		505: 'HTTP Version Not Supported',
		506: 'Variant Also Negotiates',
		507: 'Insufficient Storage',
		508: 'Loop Detected',
		510: 'Not Extended',
		511: 'Network Authentication Required',
		...options.errors,
	}

	const error = errors[result.status];
	if (error) {
		throw new ApiError(options, result, error);
	}

	if (!result.ok) {
		const errorStatus = result.status ?? 'unknown';
		const errorStatusText = result.statusText ?? 'unknown';
		const errorBody = (() => {
			try {
				return JSON.stringify(result.body, null, 2);
			} catch (e) {
				return undefined;
			}
		})();

		throw new ApiError(options, result,
			`Generic Error: status: ${errorStatus}; status text: ${errorStatusText}; body: ${errorBody}`
		);
	}
};

/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param options The request options from the service
 * @param axiosClient The axios client instance to use
 * @returns CancelablePromise<T>
 * @throws ApiError
 */
export const request = <T>(config: OpenAPIConfig, options: ApiRequestOptions<T>, axiosClient: AxiosInstance = axios): CancelablePromise<T> => {
	return new CancelablePromise(async (resolve, reject, onCancel) => {
		try {
			const url = getUrl(config, options);
			const formData = getFormData(options);
			const body = getRequestBody(options);
			const headers = await getHeaders(config, options);

			if (!onCancel.isCancelled) {
				let response = await sendRequest<T>(config, options, url, body, formData, headers, onCancel, axiosClient);

				for (const fn of config.interceptors.response._fns) {
					response = await fn(response);
				}

				const responseBody = getResponseBody(response);
				const responseHeader = getResponseHeader(response, options.responseHeader);

				let transformedBody = responseBody;
				if (options.responseTransformer && isSuccess(response.status)) {
					transformedBody = await options.responseTransformer(responseBody)
				}

				const result: ApiResult = {
					url,
					ok: isSuccess(response.status),
					status: response.status,
					statusText: response.statusText,
					body: responseHeader ?? transformedBody,
				};

				catchErrorCodes(options, result);

				resolve(result.body);
			}
		} catch (error) {
			reject(error);
		}
	});
};
````

## File: frontend/src/client/index.ts
````typescript
// This file is auto-generated by @hey-api/openapi-ts
export { ApiError } from './core/ApiError';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI, type OpenAPIConfig } from './core/OpenAPI';
export * from './sdk.gen';
export * from './types.gen';
````

## File: frontend/src/client/schemas.gen.ts
````typescript
// This file is auto-generated by @hey-api/openapi-ts

export const Body_login_login_access_tokenSchema = {
    properties: {
        grant_type: {
            anyOf: [
                {
                    type: 'string',
                    pattern: 'password'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Grant Type'
        },
        username: {
            type: 'string',
            title: 'Username'
        },
        password: {
            type: 'string',
            title: 'Password'
        },
        scope: {
            type: 'string',
            title: 'Scope',
            default: ''
        },
        client_id: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Client Id'
        },
        client_secret: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Client Secret'
        }
    },
    type: 'object',
    required: ['username', 'password'],
    title: 'Body_login-login_access_token'
} as const;

export const HTTPValidationErrorSchema = {
    properties: {
        detail: {
            items: {
                '$ref': '#/components/schemas/ValidationError'
            },
            type: 'array',
            title: 'Detail'
        }
    },
    type: 'object',
    title: 'HTTPValidationError'
} as const;

export const ItemCreateSchema = {
    properties: {
        title: {
            type: 'string',
            maxLength: 255,
            minLength: 1,
            title: 'Title'
        },
        description: {
            anyOf: [
                {
                    type: 'string',
                    maxLength: 255
                },
                {
                    type: 'null'
                }
            ],
            title: 'Description'
        }
    },
    type: 'object',
    required: ['title'],
    title: 'ItemCreate'
} as const;

export const ItemPublicSchema = {
    properties: {
        title: {
            type: 'string',
            maxLength: 255,
            minLength: 1,
            title: 'Title'
        },
        description: {
            anyOf: [
                {
                    type: 'string',
                    maxLength: 255
                },
                {
                    type: 'null'
                }
            ],
            title: 'Description'
        },
        id: {
            type: 'string',
            format: 'uuid',
            title: 'Id'
        },
        owner_id: {
            type: 'string',
            format: 'uuid',
            title: 'Owner Id'
        }
    },
    type: 'object',
    required: ['title', 'id', 'owner_id'],
    title: 'ItemPublic'
} as const;

export const ItemUpdateSchema = {
    properties: {
        title: {
            anyOf: [
                {
                    type: 'string',
                    maxLength: 255,
                    minLength: 1
                },
                {
                    type: 'null'
                }
            ],
            title: 'Title'
        },
        description: {
            anyOf: [
                {
                    type: 'string',
                    maxLength: 255
                },
                {
                    type: 'null'
                }
            ],
            title: 'Description'
        }
    },
    type: 'object',
    title: 'ItemUpdate'
} as const;

export const ItemsPublicSchema = {
    properties: {
        data: {
            items: {
                '$ref': '#/components/schemas/ItemPublic'
            },
            type: 'array',
            title: 'Data'
        },
        count: {
            type: 'integer',
            title: 'Count'
        }
    },
    type: 'object',
    required: ['data', 'count'],
    title: 'ItemsPublic'
} as const;

export const MessageSchema = {
    properties: {
        message: {
            type: 'string',
            title: 'Message'
        }
    },
    type: 'object',
    required: ['message'],
    title: 'Message'
} as const;

export const NewPasswordSchema = {
    properties: {
        token: {
            type: 'string',
            title: 'Token'
        },
        new_password: {
            type: 'string',
            maxLength: 128,
            minLength: 8,
            title: 'New Password'
        }
    },
    type: 'object',
    required: ['token', 'new_password'],
    title: 'NewPassword'
} as const;

export const PrivateUserCreateSchema = {
    properties: {
        email: {
            type: 'string',
            title: 'Email'
        },
        password: {
            type: 'string',
            title: 'Password'
        },
        full_name: {
            type: 'string',
            title: 'Full Name'
        },
        is_verified: {
            type: 'boolean',
            title: 'Is Verified',
            default: false
        }
    },
    type: 'object',
    required: ['email', 'password', 'full_name'],
    title: 'PrivateUserCreate'
} as const;

export const TokenSchema = {
    properties: {
        access_token: {
            type: 'string',
            title: 'Access Token'
        },
        token_type: {
            type: 'string',
            title: 'Token Type',
            default: 'bearer'
        }
    },
    type: 'object',
    required: ['access_token'],
    title: 'Token'
} as const;

export const UpdatePasswordSchema = {
    properties: {
        current_password: {
            type: 'string',
            maxLength: 128,
            minLength: 8,
            title: 'Current Password'
        },
        new_password: {
            type: 'string',
            maxLength: 128,
            minLength: 8,
            title: 'New Password'
        }
    },
    type: 'object',
    required: ['current_password', 'new_password'],
    title: 'UpdatePassword'
} as const;

export const UserCreateSchema = {
    properties: {
        email: {
            type: 'string',
            maxLength: 255,
            format: 'email',
            title: 'Email'
        },
        is_active: {
            type: 'boolean',
            title: 'Is Active',
            default: true
        },
        is_superuser: {
            type: 'boolean',
            title: 'Is Superuser',
            default: false
        },
        full_name: {
            anyOf: [
                {
                    type: 'string',
                    maxLength: 255
                },
                {
                    type: 'null'
                }
            ],
            title: 'Full Name'
        },
        password: {
            type: 'string',
            maxLength: 128,
            minLength: 8,
            title: 'Password'
        }
    },
    type: 'object',
    required: ['email', 'password'],
    title: 'UserCreate'
} as const;

export const UserPublicSchema = {
    properties: {
        email: {
            type: 'string',
            maxLength: 255,
            format: 'email',
            title: 'Email'
        },
        is_active: {
            type: 'boolean',
            title: 'Is Active',
            default: true
        },
        is_superuser: {
            type: 'boolean',
            title: 'Is Superuser',
            default: false
        },
        full_name: {
            anyOf: [
                {
                    type: 'string',
                    maxLength: 255
                },
                {
                    type: 'null'
                }
            ],
            title: 'Full Name'
        },
        id: {
            type: 'string',
            format: 'uuid',
            title: 'Id'
        }
    },
    type: 'object',
    required: ['email', 'id'],
    title: 'UserPublic'
} as const;

export const UserRegisterSchema = {
    properties: {
        email: {
            type: 'string',
            maxLength: 255,
            format: 'email',
            title: 'Email'
        },
        password: {
            type: 'string',
            maxLength: 128,
            minLength: 8,
            title: 'Password'
        },
        full_name: {
            anyOf: [
                {
                    type: 'string',
                    maxLength: 255
                },
                {
                    type: 'null'
                }
            ],
            title: 'Full Name'
        }
    },
    type: 'object',
    required: ['email', 'password'],
    title: 'UserRegister'
} as const;

export const UserUpdateSchema = {
    properties: {
        email: {
            anyOf: [
                {
                    type: 'string',
                    maxLength: 255,
                    format: 'email'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Email'
        },
        is_active: {
            type: 'boolean',
            title: 'Is Active',
            default: true
        },
        is_superuser: {
            type: 'boolean',
            title: 'Is Superuser',
            default: false
        },
        full_name: {
            anyOf: [
                {
                    type: 'string',
                    maxLength: 255
                },
                {
                    type: 'null'
                }
            ],
            title: 'Full Name'
        },
        password: {
            anyOf: [
                {
                    type: 'string',
                    maxLength: 128,
                    minLength: 8
                },
                {
                    type: 'null'
                }
            ],
            title: 'Password'
        }
    },
    type: 'object',
    title: 'UserUpdate'
} as const;

export const UserUpdateMeSchema = {
    properties: {
        full_name: {
            anyOf: [
                {
                    type: 'string',
                    maxLength: 255
                },
                {
                    type: 'null'
                }
            ],
            title: 'Full Name'
        },
        email: {
            anyOf: [
                {
                    type: 'string',
                    maxLength: 255,
                    format: 'email'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Email'
        }
    },
    type: 'object',
    title: 'UserUpdateMe'
} as const;

export const UsersPublicSchema = {
    properties: {
        data: {
            items: {
                '$ref': '#/components/schemas/UserPublic'
            },
            type: 'array',
            title: 'Data'
        },
        count: {
            type: 'integer',
            title: 'Count'
        }
    },
    type: 'object',
    required: ['data', 'count'],
    title: 'UsersPublic'
} as const;

export const ValidationErrorSchema = {
    properties: {
        loc: {
            items: {
                anyOf: [
                    {
                        type: 'string'
                    },
                    {
                        type: 'integer'
                    }
                ]
            },
            type: 'array',
            title: 'Location'
        },
        msg: {
            type: 'string',
            title: 'Message'
        },
        type: {
            type: 'string',
            title: 'Error Type'
        }
    },
    type: 'object',
    required: ['loc', 'msg', 'type'],
    title: 'ValidationError'
} as const;
````

## File: frontend/src/client/sdk.gen.ts
````typescript
// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { ItemsReadItemsData, ItemsReadItemsResponse, ItemsCreateItemData, ItemsCreateItemResponse, ItemsReadItemData, ItemsReadItemResponse, ItemsUpdateItemData, ItemsUpdateItemResponse, ItemsDeleteItemData, ItemsDeleteItemResponse, LoginLoginAccessTokenData, LoginLoginAccessTokenResponse, LoginTestTokenResponse, LoginRecoverPasswordData, LoginRecoverPasswordResponse, LoginResetPasswordData, LoginResetPasswordResponse, LoginRecoverPasswordHtmlContentData, LoginRecoverPasswordHtmlContentResponse, PrivateCreateUserData, PrivateCreateUserResponse, UsersReadUsersData, UsersReadUsersResponse, UsersCreateUserData, UsersCreateUserResponse, UsersReadUserMeResponse, UsersDeleteUserMeResponse, UsersUpdateUserMeData, UsersUpdateUserMeResponse, UsersUpdatePasswordMeData, UsersUpdatePasswordMeResponse, UsersRegisterUserData, UsersRegisterUserResponse, UsersReadUserByIdData, UsersReadUserByIdResponse, UsersUpdateUserData, UsersUpdateUserResponse, UsersDeleteUserData, UsersDeleteUserResponse, UtilsTestEmailData, UtilsTestEmailResponse, UtilsHealthCheckResponse } from './types.gen';

export class ItemsService {
    /**
     * Read Items
     * Retrieve items.
     * @param data The data for the request.
     * @param data.skip
     * @param data.limit
     * @returns ItemsPublic Successful Response
     * @throws ApiError
     */
    public static readItems(data: ItemsReadItemsData = {}): CancelablePromise<ItemsReadItemsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/items/',
            query: {
                skip: data.skip,
                limit: data.limit
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Create Item
     * Create new item.
     * @param data The data for the request.
     * @param data.requestBody
     * @returns ItemPublic Successful Response
     * @throws ApiError
     */
    public static createItem(data: ItemsCreateItemData): CancelablePromise<ItemsCreateItemResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/items/',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Read Item
     * Get item by ID.
     * @param data The data for the request.
     * @param data.id
     * @returns ItemPublic Successful Response
     * @throws ApiError
     */
    public static readItem(data: ItemsReadItemData): CancelablePromise<ItemsReadItemResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/items/{id}',
            path: {
                id: data.id
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Update Item
     * Update an item.
     * @param data The data for the request.
     * @param data.id
     * @param data.requestBody
     * @returns ItemPublic Successful Response
     * @throws ApiError
     */
    public static updateItem(data: ItemsUpdateItemData): CancelablePromise<ItemsUpdateItemResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/items/{id}',
            path: {
                id: data.id
            },
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Delete Item
     * Delete an item.
     * @param data The data for the request.
     * @param data.id
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static deleteItem(data: ItemsDeleteItemData): CancelablePromise<ItemsDeleteItemResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/items/{id}',
            path: {
                id: data.id
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }
}

export class LoginService {
    /**
     * Login Access Token
     * OAuth2 compatible token login, get an access token for future requests
     * @param data The data for the request.
     * @param data.formData
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static loginAccessToken(data: LoginLoginAccessTokenData): CancelablePromise<LoginLoginAccessTokenResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/login/access-token',
            formData: data.formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Test Token
     * Test access token
     * @returns UserPublic Successful Response
     * @throws ApiError
     */
    public static testToken(): CancelablePromise<LoginTestTokenResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/login/test-token'
        });
    }

    /**
     * Recover Password
     * Password Recovery
     * @param data The data for the request.
     * @param data.email
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static recoverPassword(data: LoginRecoverPasswordData): CancelablePromise<LoginRecoverPasswordResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/password-recovery/{email}',
            path: {
                email: data.email
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Reset Password
     * Reset password
     * @param data The data for the request.
     * @param data.requestBody
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static resetPassword(data: LoginResetPasswordData): CancelablePromise<LoginResetPasswordResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/reset-password/',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Recover Password Html Content
     * HTML Content for Password Recovery
     * @param data The data for the request.
     * @param data.email
     * @returns string Successful Response
     * @throws ApiError
     */
    public static recoverPasswordHtmlContent(data: LoginRecoverPasswordHtmlContentData): CancelablePromise<LoginRecoverPasswordHtmlContentResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/password-recovery-html-content/{email}',
            path: {
                email: data.email
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }
}

export class PrivateService {
    /**
     * Create User
     * Create a new user.
     * @param data The data for the request.
     * @param data.requestBody
     * @returns UserPublic Successful Response
     * @throws ApiError
     */
    public static createUser(data: PrivateCreateUserData): CancelablePromise<PrivateCreateUserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/private/users/',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        });
    }
}

export class UsersService {
    /**
     * Read Users
     * Retrieve users.
     * @param data The data for the request.
     * @param data.skip
     * @param data.limit
     * @returns UsersPublic Successful Response
     * @throws ApiError
     */
    public static readUsers(data: UsersReadUsersData = {}): CancelablePromise<UsersReadUsersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/',
            query: {
                skip: data.skip,
                limit: data.limit
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Create User
     * Create new user.
     * @param data The data for the request.
     * @param data.requestBody
     * @returns UserPublic Successful Response
     * @throws ApiError
     */
    public static createUser(data: UsersCreateUserData): CancelablePromise<UsersCreateUserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users/',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Read User Me
     * Get current user.
     * @returns UserPublic Successful Response
     * @throws ApiError
     */
    public static readUserMe(): CancelablePromise<UsersReadUserMeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/me'
        });
    }

    /**
     * Delete User Me
     * Delete own user.
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static deleteUserMe(): CancelablePromise<UsersDeleteUserMeResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/users/me'
        });
    }

    /**
     * Update User Me
     * Update own user.
     * @param data The data for the request.
     * @param data.requestBody
     * @returns UserPublic Successful Response
     * @throws ApiError
     */
    public static updateUserMe(data: UsersUpdateUserMeData): CancelablePromise<UsersUpdateUserMeResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/users/me',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Update Password Me
     * Update own password.
     * @param data The data for the request.
     * @param data.requestBody
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static updatePasswordMe(data: UsersUpdatePasswordMeData): CancelablePromise<UsersUpdatePasswordMeResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/users/me/password',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Register User
     * Create new user without the need to be logged in.
     * @param data The data for the request.
     * @param data.requestBody
     * @returns UserPublic Successful Response
     * @throws ApiError
     */
    public static registerUser(data: UsersRegisterUserData): CancelablePromise<UsersRegisterUserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users/signup',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Read User By Id
     * Get a specific user by id.
     * @param data The data for the request.
     * @param data.userId
     * @returns UserPublic Successful Response
     * @throws ApiError
     */
    public static readUserById(data: UsersReadUserByIdData): CancelablePromise<UsersReadUserByIdResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/{user_id}',
            path: {
                user_id: data.userId
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Update User
     * Update a user.
     * @param data The data for the request.
     * @param data.userId
     * @param data.requestBody
     * @returns UserPublic Successful Response
     * @throws ApiError
     */
    public static updateUser(data: UsersUpdateUserData): CancelablePromise<UsersUpdateUserResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/users/{user_id}',
            path: {
                user_id: data.userId
            },
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Delete User
     * Delete a user.
     * @param data The data for the request.
     * @param data.userId
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static deleteUser(data: UsersDeleteUserData): CancelablePromise<UsersDeleteUserResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/users/{user_id}',
            path: {
                user_id: data.userId
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }
}

export class UtilsService {
    /**
     * Test Email
     * Test emails.
     * @param data The data for the request.
     * @param data.emailTo
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static testEmail(data: UtilsTestEmailData): CancelablePromise<UtilsTestEmailResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/utils/test-email/',
            query: {
                email_to: data.emailTo
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }

    /**
     * Health Check
     * @returns boolean Successful Response
     * @throws ApiError
     */
    public static healthCheck(): CancelablePromise<UtilsHealthCheckResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utils/health-check/'
        });
    }
}
````

## File: frontend/src/client/types.gen.ts
````typescript
// This file is auto-generated by @hey-api/openapi-ts

export type Body_login_login_access_token = {
    grant_type?: (string | null);
    username: string;
    password: string;
    scope?: string;
    client_id?: (string | null);
    client_secret?: (string | null);
};

export type HTTPValidationError = {
    detail?: Array<ValidationError>;
};

export type ItemCreate = {
    title: string;
    description?: (string | null);
};

export type ItemPublic = {
    title: string;
    description?: (string | null);
    id: string;
    owner_id: string;
};

export type ItemsPublic = {
    data: Array<ItemPublic>;
    count: number;
};

export type ItemUpdate = {
    title?: (string | null);
    description?: (string | null);
};

export type Message = {
    message: string;
};

export type NewPassword = {
    token: string;
    new_password: string;
};

export type PrivateUserCreate = {
    email: string;
    password: string;
    full_name: string;
    is_verified?: boolean;
};

export type Token = {
    access_token: string;
    token_type?: string;
};

export type UpdatePassword = {
    current_password: string;
    new_password: string;
};

export type UserCreate = {
    email: string;
    is_active?: boolean;
    is_superuser?: boolean;
    full_name?: (string | null);
    password: string;
};

export type UserPublic = {
    email: string;
    is_active?: boolean;
    is_superuser?: boolean;
    full_name?: (string | null);
    id: string;
};

export type UserRegister = {
    email: string;
    password: string;
    full_name?: (string | null);
};

export type UsersPublic = {
    data: Array<UserPublic>;
    count: number;
};

export type UserUpdate = {
    email?: (string | null);
    is_active?: boolean;
    is_superuser?: boolean;
    full_name?: (string | null);
    password?: (string | null);
};

export type UserUpdateMe = {
    full_name?: (string | null);
    email?: (string | null);
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type ItemsReadItemsData = {
    limit?: number;
    skip?: number;
};

export type ItemsReadItemsResponse = (ItemsPublic);

export type ItemsCreateItemData = {
    requestBody: ItemCreate;
};

export type ItemsCreateItemResponse = (ItemPublic);

export type ItemsReadItemData = {
    id: string;
};

export type ItemsReadItemResponse = (ItemPublic);

export type ItemsUpdateItemData = {
    id: string;
    requestBody: ItemUpdate;
};

export type ItemsUpdateItemResponse = (ItemPublic);

export type ItemsDeleteItemData = {
    id: string;
};

export type ItemsDeleteItemResponse = (Message);

export type LoginLoginAccessTokenData = {
    formData: Body_login_login_access_token;
};

export type LoginLoginAccessTokenResponse = (Token);

export type LoginTestTokenResponse = (UserPublic);

export type LoginRecoverPasswordData = {
    email: string;
};

export type LoginRecoverPasswordResponse = (Message);

export type LoginResetPasswordData = {
    requestBody: NewPassword;
};

export type LoginResetPasswordResponse = (Message);

export type LoginRecoverPasswordHtmlContentData = {
    email: string;
};

export type LoginRecoverPasswordHtmlContentResponse = (string);

export type PrivateCreateUserData = {
    requestBody: PrivateUserCreate;
};

export type PrivateCreateUserResponse = (UserPublic);

export type UsersReadUsersData = {
    limit?: number;
    skip?: number;
};

export type UsersReadUsersResponse = (UsersPublic);

export type UsersCreateUserData = {
    requestBody: UserCreate;
};

export type UsersCreateUserResponse = (UserPublic);

export type UsersReadUserMeResponse = (UserPublic);

export type UsersDeleteUserMeResponse = (Message);

export type UsersUpdateUserMeData = {
    requestBody: UserUpdateMe;
};

export type UsersUpdateUserMeResponse = (UserPublic);

export type UsersUpdatePasswordMeData = {
    requestBody: UpdatePassword;
};

export type UsersUpdatePasswordMeResponse = (Message);

export type UsersRegisterUserData = {
    requestBody: UserRegister;
};

export type UsersRegisterUserResponse = (UserPublic);

export type UsersReadUserByIdData = {
    userId: string;
};

export type UsersReadUserByIdResponse = (UserPublic);

export type UsersUpdateUserData = {
    requestBody: UserUpdate;
    userId: string;
};

export type UsersUpdateUserResponse = (UserPublic);

export type UsersDeleteUserData = {
    userId: string;
};

export type UsersDeleteUserResponse = (Message);

export type UtilsTestEmailData = {
    emailTo: string;
};

export type UtilsTestEmailResponse = (Message);

export type UtilsHealthCheckResponse = (boolean);
````

## File: frontend/src/components/Admin/AddUser.tsx
````typescript
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { type UserCreate, UsersService } from "@/client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

const formSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }),
    full_name: z.string().optional(),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z
      .string()
      .min(1, { message: "Please confirm your password" }),
    is_superuser: z.boolean(),
    is_active: z.boolean(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "The passwords don't match",
    path: ["confirm_password"],
  })

type FormData = z.infer<typeof formSchema>

const AddUser = () => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      confirm_password: "",
      is_superuser: false,
      is_active: false,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: UserCreate) =>
      UsersService.createUser({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast("User created successfully")
      form.reset()
      setIsOpen(false)
    },
    onError: handleError.bind(showErrorToast),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="my-4">
          <Plus className="mr-2" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new user to the system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Set Password <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_superuser"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Is superuser?</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Is active?</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={mutation.isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <LoadingButton type="submit" loading={mutation.isPending}>
                Save
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddUser
````

## File: frontend/src/components/Admin/columns.tsx
````typescript
import type { ColumnDef } from "@tanstack/react-table"

import type { UserPublic } from "@/client"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { UserActionsMenu } from "./UserActionsMenu"

export type UserTableData = UserPublic & {
  isCurrentUser: boolean
}

export const columns: ColumnDef<UserTableData>[] = [
  {
    accessorKey: "full_name",
    header: "Full Name",
    cell: ({ row }) => {
      const fullName = row.original.full_name
      return (
        <div className="flex items-center gap-2">
          <span
            className={cn("font-medium", !fullName && "text-muted-foreground")}
          >
            {fullName || "N/A"}
          </span>
          {row.original.isCurrentUser && (
            <Badge variant="outline" className="text-xs">
              You
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "is_superuser",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant={row.original.is_superuser ? "default" : "secondary"}>
        {row.original.is_superuser ? "Superuser" : "User"}
      </Badge>
    ),
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "size-2 rounded-full",
            row.original.is_active ? "bg-green-500" : "bg-gray-400",
          )}
        />
        <span className={row.original.is_active ? "" : "text-muted-foreground"}>
          {row.original.is_active ? "Active" : "Inactive"}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <UserActionsMenu user={row.original} />
      </div>
    ),
  },
]
````

## File: frontend/src/components/Admin/DeleteUser.tsx
````typescript
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { UsersService } from "@/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LoadingButton } from "@/components/ui/loading-button"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

interface DeleteUserProps {
  id: string
  onSuccess: () => void
}

const DeleteUser = ({ id, onSuccess }: DeleteUserProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { handleSubmit } = useForm()

  const deleteUser = async (id: string) => {
    await UsersService.deleteUser({ userId: id })
  }

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      showSuccessToast("The user was deleted successfully")
      setIsOpen(false)
      onSuccess()
    },
    onError: handleError.bind(showErrorToast),
    onSettled: () => {
      queryClient.invalidateQueries()
    },
  })

  const onSubmit = async () => {
    mutation.mutate(id)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuItem
        variant="destructive"
        onSelect={(e) => e.preventDefault()}
        onClick={() => setIsOpen(true)}
      >
        <Trash2 />
        Delete User
      </DropdownMenuItem>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              All items associated with this user will also be{" "}
              <strong>permanently deleted.</strong> Are you sure? You will not
              be able to undo this action.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={mutation.isPending}>
                Cancel
              </Button>
            </DialogClose>
            <LoadingButton
              variant="destructive"
              type="submit"
              loading={mutation.isPending}
            >
              Delete
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteUser
````

## File: frontend/src/components/Admin/EditUser.tsx
````typescript
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { type UserPublic, UsersService } from "@/client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

const formSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }),
    full_name: z.string().optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .optional()
      .or(z.literal("")),
    confirm_password: z.string().optional(),
    is_superuser: z.boolean().optional(),
    is_active: z.boolean().optional(),
  })
  .refine((data) => !data.password || data.password === data.confirm_password, {
    message: "The passwords don't match",
    path: ["confirm_password"],
  })

type FormData = z.infer<typeof formSchema>

interface EditUserProps {
  user: UserPublic
  onSuccess: () => void
}

const EditUser = ({ user, onSuccess }: EditUserProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: user.email,
      full_name: user.full_name ?? undefined,
      is_superuser: user.is_superuser,
      is_active: user.is_active,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      UsersService.updateUser({ userId: user.id, requestBody: data }),
    onSuccess: () => {
      showSuccessToast("User updated successfully")
      setIsOpen(false)
      onSuccess()
    },
    onError: handleError.bind(showErrorToast),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const onSubmit = (data: FormData) => {
    // exclude confirm_password from submission data and remove password if empty
    const { confirm_password: _, ...submitData } = data
    if (!submitData.password) {
      delete submitData.password
    }
    mutation.mutate(submitData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuItem
        onSelect={(e) => e.preventDefault()}
        onClick={() => setIsOpen(true)}
      >
        <Pencil />
        Edit User
      </DropdownMenuItem>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update the user details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Set Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_superuser"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Is superuser?</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Is active?</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={mutation.isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <LoadingButton type="submit" loading={mutation.isPending}>
                Save
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditUser
````

## File: frontend/src/components/Admin/UserActionsMenu.tsx
````typescript
import { EllipsisVertical } from "lucide-react"
import { useState } from "react"

import type { UserPublic } from "@/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuth from "@/hooks/useAuth"
import DeleteUser from "./DeleteUser"
import EditUser from "./EditUser"

interface UserActionsMenuProps {
  user: UserPublic
}

export const UserActionsMenu = ({ user }: UserActionsMenuProps) => {
  const [open, setOpen] = useState(false)
  const { user: currentUser } = useAuth()

  if (user.id === currentUser?.id) {
    return null
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <EditUser user={user} onSuccess={() => setOpen(false)} />
        <DeleteUser id={user.id} onSuccess={() => setOpen(false)} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
````

## File: frontend/src/components/Common/Appearance.tsx
````typescript
import { Monitor, Moon, Sun } from "lucide-react"

import { type Theme, useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

type LucideIcon = React.FC<React.SVGProps<SVGSVGElement>>

const ICON_MAP: Record<Theme, LucideIcon> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
}

export const SidebarAppearance = () => {
  const { isMobile } = useSidebar()
  const { setTheme, theme } = useTheme()
  const Icon = ICON_MAP[theme]

  return (
    <SidebarMenuItem>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton tooltip="Appearance" data-testid="theme-button">
            <Icon className="size-4 text-muted-foreground" />
            <span>Appearance</span>
            <span className="sr-only">Toggle theme</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={isMobile ? "top" : "right"}
          align="end"
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
        >
          <DropdownMenuItem
            data-testid="light-mode"
            onClick={() => setTheme("light")}
          >
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            data-testid="dark-mode"
            onClick={() => setTheme("dark")}
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Monitor className="mr-2 h-4 w-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

export const Appearance = () => {
  const { setTheme } = useTheme()

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button data-testid="theme-button" variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            data-testid="light-mode"
            onClick={() => setTheme("light")}
          >
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            data-testid="dark-mode"
            onClick={() => setTheme("dark")}
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Monitor className="mr-2 h-4 w-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
````

## File: frontend/src/components/Common/AuthLayout.tsx
````typescript
import { Appearance } from "@/components/Common/Appearance"
import { Logo } from "@/components/Common/Logo"
import { Footer } from "./Footer"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted dark:bg-zinc-900 relative hidden lg:flex lg:items-center lg:justify-center">
        <Logo variant="full" className="h-16" asLink={false} />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-end">
          <Appearance />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
````

## File: frontend/src/components/Common/DataTable.tsx
````typescript
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center text-muted-foreground"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {table.getPageCount() > 1 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-t bg-muted/20">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}{" "}
              to{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                data.length,
              )}{" "}
              of{" "}
              <span className="font-medium text-foreground">{data.length}</span>{" "}
              entries
            </div>
            <div className="flex items-center gap-x-2">
              <p className="text-sm text-muted-foreground">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 25, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-x-6">
            <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
              <span>Page</span>
              <span className="font-medium text-foreground">
                {table.getState().pagination.pageIndex + 1}
              </span>
              <span>of</span>
              <span className="font-medium text-foreground">
                {table.getPageCount()}
              </span>
            </div>

            <div className="flex items-center gap-x-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
````

## File: frontend/src/components/Common/ErrorComponent.tsx
````typescript
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

const ErrorComponent = () => {
  return (
    <div
      className="flex min-h-screen items-center justify-center flex-col p-4"
      data-testid="error-component"
    >
      <div className="flex items-center z-10">
        <div className="flex flex-col ml-4 items-center justify-center p-4">
          <span className="text-6xl md:text-8xl font-bold leading-none mb-4">
            Error
          </span>
          <span className="text-2xl font-bold mb-2">Oops!</span>
        </div>
      </div>

      <p className="text-lg text-muted-foreground mb-4 text-center z-10">
        Something went wrong. Please try again.
      </p>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  )
}

export default ErrorComponent
````

## File: frontend/src/components/Common/Footer.tsx
````typescript
import { FaGithub, FaLinkedinIn } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/fastapi/fastapi", label: "GitHub" },
  { icon: FaXTwitter, href: "https://x.com/fastapi", label: "X" },
  { icon: FaLinkedinIn, href: "https://linkedin.com/company/fastapi", label: "LinkedIn" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-4 px-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-muted-foreground text-sm">
          Full Stack FastAPI Template - {currentYear}
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
````

## File: frontend/src/components/Common/Logo.tsx
````typescript
import { Link } from "@tanstack/react-router"

import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import icon from "/assets/images/fastapi-icon.svg"
import iconLight from "/assets/images/fastapi-icon-light.svg"
import logo from "/assets/images/fastapi-logo.svg"
import logoLight from "/assets/images/fastapi-logo-light.svg"

interface LogoProps {
  variant?: "full" | "icon" | "responsive"
  className?: string
  asLink?: boolean
}

export function Logo({
  variant = "full",
  className,
  asLink = true,
}: LogoProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const fullLogo = isDark ? logoLight : logo
  const iconLogo = isDark ? iconLight : icon

  const content =
    variant === "responsive" ? (
      <>
        <img
          src={fullLogo}
          alt="FastAPI"
          className={cn(
            "h-6 w-auto group-data-[collapsible=icon]:hidden",
            className,
          )}
        />
        <img
          src={iconLogo}
          alt="FastAPI"
          className={cn(
            "size-5 hidden group-data-[collapsible=icon]:block",
            className,
          )}
        />
      </>
    ) : (
      <img
        src={variant === "full" ? fullLogo : iconLogo}
        alt="FastAPI"
        className={cn(variant === "full" ? "h-6 w-auto" : "size-5", className)}
      />
    )

  if (!asLink) {
    return content
  }

  return <Link to="/">{content}</Link>
}
````

## File: frontend/src/components/Common/NotFound.tsx
````typescript
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

const NotFound = () => {
  return (
    <div
      className="flex min-h-screen items-center justify-center flex-col p-4"
      data-testid="not-found"
    >
      <div className="flex items-center z-10">
        <div className="flex flex-col ml-4 items-center justify-center p-4">
          <span className="text-6xl md:text-8xl font-bold leading-none mb-4">
            404
          </span>
          <span className="text-2xl font-bold mb-2">Oops!</span>
        </div>
      </div>

      <p className="text-lg text-muted-foreground mb-4 text-center z-10">
        The page you are looking for was not found.
      </p>
      <div className="z-10">
        <Link to="/">
          <Button className="mt-4">Go Back</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
````

## File: frontend/src/components/Items/AddItem.tsx
````typescript
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { type ItemCreate, ItemsService } from "@/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const AddItem = () => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: ItemCreate) =>
      ItemsService.createItem({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Item created successfully")
      form.reset()
      setIsOpen(false)
    },
    onError: handleError.bind(showErrorToast),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="my-4">
          <Plus className="mr-2" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new item.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Title"
                        type="text"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={mutation.isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <LoadingButton type="submit" loading={mutation.isPending}>
                Save
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddItem
````

## File: frontend/src/components/Items/columns.tsx
````typescript
import type { ColumnDef } from "@tanstack/react-table"
import { Check, Copy } from "lucide-react"

import type { ItemPublic } from "@/client"
import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { cn } from "@/lib/utils"
import { ItemActionsMenu } from "./ItemActionsMenu"

function CopyId({ id }: { id: string }) {
  const [copiedText, copy] = useCopyToClipboard()
  const isCopied = copiedText === id

  return (
    <div className="flex items-center gap-1.5 group">
      <span className="font-mono text-xs text-muted-foreground">{id}</span>
      <Button
        variant="ghost"
        size="icon"
        className="size-6 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => copy(id)}
      >
        {isCopied ? (
          <Check className="size-3 text-green-500" />
        ) : (
          <Copy className="size-3" />
        )}
        <span className="sr-only">Copy ID</span>
      </Button>
    </div>
  )
}

export const columns: ColumnDef<ItemPublic>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <CopyId id={row.original.id} />,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.original.description
      return (
        <span
          className={cn(
            "max-w-xs truncate block text-muted-foreground",
            !description && "italic",
          )}
        >
          {description || "No description"}
        </span>
      )
    },
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <ItemActionsMenu item={row.original} />
      </div>
    ),
  },
]
````

## File: frontend/src/components/Items/DeleteItem.tsx
````typescript
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { ItemsService } from "@/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LoadingButton } from "@/components/ui/loading-button"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

interface DeleteItemProps {
  id: string
  onSuccess: () => void
}

const DeleteItem = ({ id, onSuccess }: DeleteItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { handleSubmit } = useForm()

  const deleteItem = async (id: string) => {
    await ItemsService.deleteItem({ id: id })
  }

  const mutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      showSuccessToast("The item was deleted successfully")
      setIsOpen(false)
      onSuccess()
    },
    onError: handleError.bind(showErrorToast),
    onSettled: () => {
      queryClient.invalidateQueries()
    },
  })

  const onSubmit = async () => {
    mutation.mutate(id)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuItem
        variant="destructive"
        onSelect={(e) => e.preventDefault()}
        onClick={() => setIsOpen(true)}
      >
        <Trash2 />
        Delete Item
      </DropdownMenuItem>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              This item will be permanently deleted. Are you sure? You will not
              be able to undo this action.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={mutation.isPending}>
                Cancel
              </Button>
            </DialogClose>
            <LoadingButton
              variant="destructive"
              type="submit"
              loading={mutation.isPending}
            >
              Delete
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteItem
````

## File: frontend/src/components/Items/EditItem.tsx
````typescript
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { type ItemPublic, ItemsService } from "@/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface EditItemProps {
  item: ItemPublic
  onSuccess: () => void
}

const EditItem = ({ item, onSuccess }: EditItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: item.title,
      description: item.description ?? undefined,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      ItemsService.updateItem({ id: item.id, requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Item updated successfully")
      setIsOpen(false)
      onSuccess()
    },
    onError: handleError.bind(showErrorToast),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuItem
        onSelect={(e) => e.preventDefault()}
        onClick={() => setIsOpen(true)}
      >
        <Pencil />
        Edit Item
      </DropdownMenuItem>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Item</DialogTitle>
              <DialogDescription>
                Update the item details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Title" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={mutation.isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <LoadingButton type="submit" loading={mutation.isPending}>
                Save
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditItem
````

## File: frontend/src/components/Items/ItemActionsMenu.tsx
````typescript
import { EllipsisVertical } from "lucide-react"
import { useState } from "react"

import type { ItemPublic } from "@/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeleteItem from "../Items/DeleteItem"
import EditItem from "../Items/EditItem"

interface ItemActionsMenuProps {
  item: ItemPublic
}

export const ItemActionsMenu = ({ item }: ItemActionsMenuProps) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <EditItem item={item} onSuccess={() => setOpen(false)} />
        <DeleteItem id={item.id} onSuccess={() => setOpen(false)} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
````

## File: frontend/src/components/Pending/PendingItems.tsx
````typescript
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PendingItems = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-64 font-mono" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-48" />
          </TableCell>
          <TableCell>
            <div className="flex justify-end">
              <Skeleton className="size-8 rounded-md" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default PendingItems
````

## File: frontend/src/components/Pending/PendingUsers.tsx
````typescript
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PendingUsers = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Full Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-40" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-20 rounded-full" />
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Skeleton className="size-2 rounded-full" />
              <Skeleton className="h-4 w-12" />
            </div>
          </TableCell>
          <TableCell>
            <div className="flex justify-end">
              <Skeleton className="size-8 rounded-md" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default PendingUsers
````

## File: frontend/src/components/Sidebar/AppSidebar.tsx
````typescript
import { Briefcase, Home, Users } from "lucide-react"

import { SidebarAppearance } from "@/components/Common/Appearance"
import { Logo } from "@/components/Common/Logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import useAuth from "@/hooks/useAuth"
import { type Item, Main } from "./Main"
import { User } from "./User"

const baseItems: Item[] = [
  { icon: Home, title: "Dashboard", path: "/" },
  { icon: Briefcase, title: "Items", path: "/items" },
]

export function AppSidebar() {
  const { user: currentUser } = useAuth()

  const items = currentUser?.is_superuser
    ? [...baseItems, { icon: Users, title: "Admin", path: "/admin" }]
    : baseItems

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-4 py-6 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:items-center">
        <Logo variant="responsive" />
      </SidebarHeader>
      <SidebarContent>
        <Main items={items} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarAppearance />
        <User user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
````

## File: frontend/src/components/Sidebar/Main.tsx
````typescript
import { Link as RouterLink, useRouterState } from "@tanstack/react-router"
import type { LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export type Item = {
  icon: LucideIcon
  title: string
  path: string
}

interface MainProps {
  items: Item[]
}

export function Main({ items }: MainProps) {
  const { isMobile, setOpenMobile } = useSidebar()
  const router = useRouterState()
  const currentPath = router.location.pathname

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = currentPath === item.path

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  asChild
                >
                  <RouterLink to={item.path} onClick={handleMenuClick}>
                    <item.icon />
                    <span>{item.title}</span>
                  </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
````

## File: frontend/src/components/Sidebar/User.tsx
````typescript
import { Link as RouterLink } from "@tanstack/react-router"
import { ChevronsUpDown, LogOut, Settings } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import useAuth from "@/hooks/useAuth"
import { getInitials } from "@/utils"

interface UserInfoProps {
  fullName?: string
  email?: string
}

function UserInfo({ fullName, email }: UserInfoProps) {
  return (
    <div className="flex items-center gap-2.5 w-full min-w-0">
      <Avatar className="size-8">
        <AvatarFallback className="bg-zinc-600 text-white">
          {getInitials(fullName || "User")}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start min-w-0">
        <p className="text-sm font-medium truncate w-full">{fullName}</p>
        <p className="text-xs text-muted-foreground truncate w-full">{email}</p>
      </div>
    </div>
  )
}

export function User({ user }: { user: any }) {
  const { logout } = useAuth()
  const { isMobile, setOpenMobile } = useSidebar()

  if (!user) return null

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }
  const handleLogout = async () => {
    logout()
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              data-testid="user-menu"
            >
              <UserInfo fullName={user?.full_name} email={user?.email} />
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <UserInfo fullName={user?.full_name} email={user?.email} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <RouterLink to="/settings" onClick={handleMenuClick}>
              <DropdownMenuItem>
                <Settings />
                User Settings
              </DropdownMenuItem>
            </RouterLink>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
````

## File: frontend/src/components/ui/alert.tsx
````typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
````

## File: frontend/src/components/ui/avatar.tsx
````typescript
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
````

## File: frontend/src/components/ui/badge.tsx
````typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
````

## File: frontend/src/components/ui/button-group.tsx
````typescript
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const buttonGroupVariants = cva(
  "flex w-fit items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md has-[>[data-slot=button-group]]:gap-2",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      className={cn(
        "bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
````

## File: frontend/src/components/ui/button.tsx
````typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
````

## File: frontend/src/components/ui/card.tsx
````typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
````

## File: frontend/src/components/ui/checkbox.tsx
````typescript
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
````

## File: frontend/src/components/ui/dialog.tsx
````typescript
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
````

## File: frontend/src/components/ui/dropdown-menu.tsx
````typescript
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
````

## File: frontend/src/components/ui/form.tsx
````typescript
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
````

## File: frontend/src/components/ui/input.tsx
````typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
````

## File: frontend/src/components/ui/label.tsx
````typescript
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
````

## File: frontend/src/components/ui/loading-button.tsx
````typescript
import { Slot, Slottable } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

function LoadingButton({
  className,
  loading = false,
  children,
  disabled,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      <Slottable>{children}</Slottable>
    </Comp>
  )
}

export { buttonVariants, LoadingButton }
````

## File: frontend/src/components/ui/pagination.tsx
````typescript
import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
````

## File: frontend/src/components/ui/password-input.tsx
````typescript
import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

interface PasswordInputProps extends React.ComponentProps<"input"> {
  error?: string
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 pr-10 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
````

## File: frontend/src/components/ui/select.tsx
````typescript
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
````

## File: frontend/src/components/ui/separator.tsx
````typescript
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
````

## File: frontend/src/components/ui/sheet.tsx
````typescript
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
````

## File: frontend/src/components/ui/sidebar.tsx
````typescript
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/useMobile"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  const getInitialOpen = () => {
    if (typeof document === "undefined") return defaultOpen

    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${SIDEBAR_COOKIE_NAME}=`))

    if (!cookie) return defaultOpen

    return cookie.split("=")[1] === "true"
  }

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(getInitialOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open],
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar],
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar, open } = useSidebar()
  const sidebarCopy = open ? "Collapse Sidebar" : "Open Sidebar"

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">{sidebarCopy}</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-transparent relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className,
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2 pb-3", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-3 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col px-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 data-[state=open]:bg-sidebar-accent",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm rounded-lg",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0! rounded-xl data-[state=closed]:rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
        "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
````

## File: frontend/src/components/ui/skeleton.tsx
````typescript
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
````

## File: frontend/src/components/ui/sonner.tsx
````typescript
"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
````

## File: frontend/src/components/ui/table.tsx
````typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto rounded-lg border"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-muted/50 [&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-muted-foreground h-11 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wider whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-4 py-3 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
````

## File: frontend/src/components/ui/tabs.tsx
````typescript
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
````

## File: frontend/src/components/ui/tooltip.tsx
````typescript
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
````

## File: frontend/src/components/UserSettings/ChangePassword.tsx
````typescript
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { type UpdatePassword, UsersService } from "@/client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"
import { PasswordInput } from "@/components/ui/password-input"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

const formSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    new_password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "The passwords don't match",
    path: ["confirm_password"],
  })

type FormData = z.infer<typeof formSchema>

const ChangePassword = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: UpdatePassword) =>
      UsersService.updatePasswordMe({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Password updated successfully")
      form.reset()
    },
    onError: handleError.bind(showErrorToast),
  })

  const onSubmit = async (data: FormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="max-w-md">
      <h3 className="text-lg font-semibold py-4">Change Password</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="current_password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    data-testid="current-password-input"
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    data-testid="new-password-input"
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    data-testid="confirm-password-input"
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            type="submit"
            loading={mutation.isPending}
            className="self-start"
          >
            Update Password
          </LoadingButton>
        </form>
      </Form>
    </div>
  )
}

export default ChangePassword
````

## File: frontend/src/components/UserSettings/DeleteAccount.tsx
````typescript
import DeleteConfirmation from "./DeleteConfirmation"

const DeleteAccount = () => {
  return (
    <div className="max-w-md mt-4 rounded-lg border border-destructive/50 p-4">
      <h3 className="font-semibold text-destructive">Delete Account</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Permanently delete your account and all associated data.
      </p>
      <DeleteConfirmation />
    </div>
  )
}

export default DeleteAccount
````

## File: frontend/src/components/UserSettings/DeleteConfirmation.tsx
````typescript
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { UsersService } from "@/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LoadingButton } from "@/components/ui/loading-button"
import useAuth from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

const DeleteConfirmation = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { handleSubmit } = useForm()
  const { logout } = useAuth()

  const mutation = useMutation({
    mutationFn: () => UsersService.deleteUserMe(),
    onSuccess: () => {
      showSuccessToast("Your account has been successfully deleted")
      logout()
    },
    onError: handleError.bind(showErrorToast),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })

  const onSubmit = async () => {
    mutation.mutate()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="mt-3">
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Confirmation Required</DialogTitle>
            <DialogDescription>
              All your account data will be{" "}
              <strong>permanently deleted.</strong> If you are sure, please
              click <strong>"Confirm"</strong> to proceed. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={mutation.isPending}>
                Cancel
              </Button>
            </DialogClose>
            <LoadingButton
              variant="destructive"
              type="submit"
              loading={mutation.isPending}
            >
              Delete
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteConfirmation
````

## File: frontend/src/components/UserSettings/UserInformation.tsx
````typescript
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { UsersService, type UserUpdateMe } from "@/client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import useAuth from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import { cn } from "@/lib/utils"
import { handleError } from "@/utils"

const formSchema = z.object({
  full_name: z.string().max(30).optional(),
  email: z.email({ message: "Invalid email address" }),
})

type FormData = z.infer<typeof formSchema>

const UserInformation = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const [editMode, setEditMode] = useState(false)
  const { user: currentUser } = useAuth()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      full_name: currentUser?.full_name ?? undefined,
      email: currentUser?.email,
    },
  })

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const mutation = useMutation({
    mutationFn: (data: UserUpdateMe) =>
      UsersService.updateUserMe({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast("User updated successfully")
      toggleEditMode()
    },
    onError: handleError.bind(showErrorToast),
    onSettled: () => {
      queryClient.invalidateQueries()
    },
  })

  const onSubmit = (data: FormData) => {
    const updateData: UserUpdateMe = {}

    // only include fields that have changed
    if (data.full_name !== currentUser?.full_name) {
      updateData.full_name = data.full_name
    }
    if (data.email !== currentUser?.email) {
      updateData.email = data.email
    }

    mutation.mutate(updateData)
  }

  const onCancel = () => {
    form.reset()
    toggleEditMode()
  }

  return (
    <div className="max-w-md">
      <h3 className="text-lg font-semibold py-4">User Information</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) =>
              editMode ? (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) : (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <p
                    className={cn(
                      "py-2 truncate max-w-sm",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value || "N/A"}
                  </p>
                </FormItem>
              )
            }
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) =>
              editMode ? (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) : (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <p className="py-2 truncate max-w-sm">{field.value}</p>
                </FormItem>
              )
            }
          />

          <div className="flex gap-3">
            {editMode ? (
              <>
                <LoadingButton
                  type="submit"
                  loading={mutation.isPending}
                  disabled={!form.formState.isDirty}
                >
                  Save
                </LoadingButton>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={mutation.isPending}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button type="button" onClick={toggleEditMode}>
                Edit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default UserInformation
````

## File: frontend/src/components/theme-provider.tsx
````typescript
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

export type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  resolvedTheme: "dark" | "light"
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  )

  const getResolvedTheme = useCallback((theme: Theme): "dark" | "light" => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    }
    return theme
  }, [])

  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(() =>
    getResolvedTheme(theme),
  )

  const updateTheme = useCallback((newTheme: Theme) => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(newTheme)
  }, [])

  useEffect(() => {
    updateTheme(theme)
    setResolvedTheme(getResolvedTheme(theme))

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      if (theme === "system") {
        updateTheme("system")
        setResolvedTheme(getResolvedTheme("system"))
      }
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme, updateTheme, getResolvedTheme])

  const value = {
    theme,
    resolvedTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
````

## File: frontend/src/hooks/useAuth.ts
````typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

import {
  type Body_login_login_access_token as AccessToken,
  LoginService,
  type UserPublic,
  type UserRegister,
  UsersService,
} from "@/client"
import { handleError } from "@/utils"
import useCustomToast from "./useCustomToast"

const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null
}

const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { showErrorToast } = useCustomToast()

  const { data: user } = useQuery<UserPublic | null, Error>({
    queryKey: ["currentUser"],
    queryFn: UsersService.readUserMe,
    enabled: isLoggedIn(),
  })

  const signUpMutation = useMutation({
    mutationFn: (data: UserRegister) =>
      UsersService.registerUser({ requestBody: data }),
    onSuccess: () => {
      navigate({ to: "/login" })
    },
    onError: handleError.bind(showErrorToast),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const login = async (data: AccessToken) => {
    const response = await LoginService.loginAccessToken({
      formData: data,
    })
    localStorage.setItem("access_token", response.access_token)
  }

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: "/" })
    },
    onError: handleError.bind(showErrorToast),
  })

  const logout = () => {
    localStorage.removeItem("access_token")
    navigate({ to: "/login" })
  }

  return {
    signUpMutation,
    loginMutation,
    logout,
    user,
  }
}

export { isLoggedIn }
export default useAuth
````

## File: frontend/src/hooks/useCopyToClipboard.ts
````typescript
// source: https://usehooks-ts.com/react-hook/use-copy-to-clipboard
import { useCallback, useState } from "react"

type CopiedValue = string | null

type CopyFn = (text: string) => Promise<boolean>

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported")
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)

      setTimeout(() => setCopiedText(null), 2000)

      return true
    } catch (error) {
      console.warn("Copy failed", error)
      setCopiedText(null)
      return false
    }
  }, [])

  return [copiedText, copy]
}
````

## File: frontend/src/hooks/useCustomToast.ts
````typescript
import { toast } from "sonner"

const useCustomToast = () => {
  const showSuccessToast = (description: string) => {
    toast.success("Success!", {
      description,
    })
  }

  const showErrorToast = (description: string) => {
    toast.error("Something went wrong!", {
      description,
    })
  }

  return { showSuccessToast, showErrorToast }
}

export default useCustomToast
````

## File: frontend/src/hooks/useMobile.ts
````typescript
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
````

## File: frontend/src/lib/utils.ts
````typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
````

## File: frontend/src/routes/_layout/admin.tsx
````typescript
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"

import { type UserPublic, UsersService } from "@/client"
import AddUser from "@/components/Admin/AddUser"
import { columns, type UserTableData } from "@/components/Admin/columns"
import { DataTable } from "@/components/Common/DataTable"
import PendingUsers from "@/components/Pending/PendingUsers"
import useAuth from "@/hooks/useAuth"

function getUsersQueryOptions() {
  return {
    queryFn: () => UsersService.readUsers({ skip: 0, limit: 100 }),
    queryKey: ["users"],
  }
}

export const Route = createFileRoute("/_layout/admin")({
  component: Admin,
  head: () => ({
    meta: [
      {
        title: "Admin - FastAPI Cloud",
      },
    ],
  }),
})

function UsersTableContent() {
  const { user: currentUser } = useAuth()
  const { data: users } = useSuspenseQuery(getUsersQueryOptions())

  const tableData: UserTableData[] = users.data.map((user: UserPublic) => ({
    ...user,
    isCurrentUser: currentUser?.id === user.id,
  }))

  return <DataTable columns={columns} data={tableData} />
}

function UsersTable() {
  return (
    <Suspense fallback={<PendingUsers />}>
      <UsersTableContent />
    </Suspense>
  )
}

function Admin() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <AddUser />
      </div>
      <UsersTable />
    </div>
  )
}
````

## File: frontend/src/routes/_layout/index.tsx
````typescript
import { createFileRoute } from "@tanstack/react-router"

import useAuth from "@/hooks/useAuth"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
  head: () => ({
    meta: [
      {
        title: "Dashboard - FastAPI Cloud",
      },
    ],
  }),
})

function Dashboard() {
  const { user: currentUser } = useAuth()

  return (
    <div>
      <div>
        <h1 className="text-2xl truncate max-w-sm">
          Hi, {currentUser?.full_name || currentUser?.email} 👋
        </h1>
        <p className="text-muted-foreground">
          Welcome back, nice to see you again!!!
        </p>
      </div>
    </div>
  )
}
````

## File: frontend/src/routes/_layout/items.tsx
````typescript
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Search } from "lucide-react"
import { Suspense } from "react"

import { ItemsService } from "@/client"
import { DataTable } from "@/components/Common/DataTable"
import AddItem from "@/components/Items/AddItem"
import { columns } from "@/components/Items/columns"
import PendingItems from "@/components/Pending/PendingItems"

function getItemsQueryOptions() {
  return {
    queryFn: () => ItemsService.readItems({ skip: 0, limit: 100 }),
    queryKey: ["items"],
  }
}

export const Route = createFileRoute("/_layout/items")({
  component: Items,
  head: () => ({
    meta: [
      {
        title: "Items - FastAPI Cloud",
      },
    ],
  }),
})

function ItemsTableContent() {
  const { data: items } = useSuspenseQuery(getItemsQueryOptions())

  if (items.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">You don't have any items yet</h3>
        <p className="text-muted-foreground">Add a new item to get started</p>
      </div>
    )
  }

  return <DataTable columns={columns} data={items.data} />
}

function ItemsTable() {
  return (
    <Suspense fallback={<PendingItems />}>
      <ItemsTableContent />
    </Suspense>
  )
}

function Items() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Items</h1>
          <p className="text-muted-foreground">Create and manage your items</p>
        </div>
        <AddItem />
      </div>
      <ItemsTable />
    </div>
  )
}
````

## File: frontend/src/routes/_layout/settings.tsx
````typescript
import { createFileRoute } from "@tanstack/react-router"

import ChangePassword from "@/components/UserSettings/ChangePassword"
import DeleteAccount from "@/components/UserSettings/DeleteAccount"
import UserInformation from "@/components/UserSettings/UserInformation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useAuth from "@/hooks/useAuth"

const tabsConfig = [
  { value: "my-profile", title: "My profile", component: UserInformation },
  { value: "password", title: "Password", component: ChangePassword },
  { value: "danger-zone", title: "Danger zone", component: DeleteAccount },
]

export const Route = createFileRoute("/_layout/settings")({
  component: UserSettings,
  head: () => ({
    meta: [
      {
        title: "Settings - FastAPI Cloud",
      },
    ],
  }),
})

function UserSettings() {
  const { user: currentUser } = useAuth()
  const finalTabs = currentUser?.is_superuser
    ? tabsConfig.slice(0, 3)
    : tabsConfig

  if (!currentUser) {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="my-profile">
        <TabsList>
          {finalTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {finalTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <tab.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
````

## File: frontend/src/routes/__root.tsx
````typescript
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import ErrorComponent from "@/components/Common/ErrorComponent"
import NotFound from "@/components/Common/NotFound"

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ),
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <ErrorComponent />,
})
````

## File: frontend/src/routes/_layout.tsx
````typescript
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

import { Footer } from "@/components/Common/Footer"
import AppSidebar from "@/components/Sidebar/AppSidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { isLoggedIn } from "@/hooks/useAuth"

export const Route = createFileRoute("/_layout")({
  component: Layout,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: "/login",
      })
    }
  },
})

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 text-muted-foreground" />
        </header>
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
````

## File: frontend/src/routes/login.tsx
````typescript
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createFileRoute,
  Link as RouterLink,
  redirect,
} from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"

import type { Body_login_login_access_token as AccessToken } from "@/client"
import { AuthLayout } from "@/components/Common/AuthLayout"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import { PasswordInput } from "@/components/ui/password-input"
import useAuth, { isLoggedIn } from "@/hooks/useAuth"

const formSchema = z.object({
  username: z.email(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
}) satisfies z.ZodType<AccessToken>

type FormData = z.infer<typeof formSchema>

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
  head: () => ({
    meta: [
      {
        title: "Log In - FastAPI Cloud",
      },
    ],
  }),
})

function Login() {
  const { loginMutation } = useAuth()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = (data: FormData) => {
    if (loginMutation.isPending) return
    loginMutation.mutate(data)
  }


  return (
    <AuthLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
          </div>

          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="email-input"
                      placeholder="user@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <RouterLink
                      to="/recover-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </RouterLink>
                  </div>
                  <FormControl>
                    <PasswordInput
                      data-testid="password-input"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <LoadingButton type="submit" loading={loginMutation.isPending}>
              Log In
            </LoadingButton>
          </div>

          <div className="text-center text-sm">
            Don't have an account yet?{" "}
            <RouterLink to="/signup" className="underline underline-offset-4">
              Sign up
            </RouterLink>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}
````

## File: frontend/src/routes/recover-password.tsx
````typescript
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import {
  createFileRoute,
  Link as RouterLink,
  redirect,
} from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { LoginService } from "@/client"
import { AuthLayout } from "@/components/Common/AuthLayout"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import { isLoggedIn } from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

const formSchema = z.object({
  email: z.email(),
})

type FormData = z.infer<typeof formSchema>

export const Route = createFileRoute("/recover-password")({
  component: RecoverPassword,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
  head: () => ({
    meta: [
      {
        title: "Recover Password - FastAPI Cloud",
      },
    ],
  }),
})

function RecoverPassword() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const recoverPassword = async (data: FormData) => {
    await LoginService.recoverPassword({
      email: data.email,
    })
  }

  const mutation = useMutation({
    mutationFn: recoverPassword,
    onSuccess: () => {
      showSuccessToast("Password recovery email sent successfully")
      form.reset()
    },
    onError: handleError.bind(showErrorToast),
  })

  const onSubmit = async (data: FormData) => {
    if (mutation.isPending) return
    mutation.mutate(data)
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Password Recovery</h1>
          </div>

          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="email-input"
                      placeholder="user@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              type="submit"
              className="w-full"
              loading={mutation.isPending}
            >
              Continue
            </LoadingButton>
          </div>

          <div className="text-center text-sm">
            Remember your password?{" "}
            <RouterLink to="/login" className="underline underline-offset-4">
              Log in
            </RouterLink>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}
````

## File: frontend/src/routes/reset-password.tsx
````typescript
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import {
  createFileRoute,
  Link as RouterLink,
  redirect,
  useNavigate,
} from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { LoginService } from "@/client"
import { AuthLayout } from "@/components/Common/AuthLayout"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"
import { PasswordInput } from "@/components/ui/password-input"
import { isLoggedIn } from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

const searchSchema = z.object({
  token: z.string().catch(""),
})

const formSchema = z
  .object({
    new_password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "The passwords don't match",
    path: ["confirm_password"],
  })

type FormData = z.infer<typeof formSchema>

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
  validateSearch: searchSchema,
  beforeLoad: async ({ search }) => {
    if (isLoggedIn()) {
      throw redirect({ to: "/" })
    }
    if (!search.token) {
      throw redirect({ to: "/login" })
    }
  },
  head: () => ({
    meta: [
      {
        title: "Reset Password - FastAPI Cloud",
      },
    ],
  }),
})

function ResetPassword() {
  const { token } = Route.useSearch()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const navigate = useNavigate()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: { new_password: string; token: string }) =>
      LoginService.resetPassword({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Password updated successfully")
      form.reset()
      navigate({ to: "/login" })
    },
    onError: handleError.bind(showErrorToast),
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate({ new_password: data.new_password, token })
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Reset Password</h1>
          </div>

          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      data-testid="new-password-input"
                      placeholder="New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      data-testid="confirm-password-input"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              type="submit"
              className="w-full"
              loading={mutation.isPending}
            >
              Reset Password
            </LoadingButton>
          </div>

          <div className="text-center text-sm">
            Remember your password?{" "}
            <RouterLink to="/login" className="underline underline-offset-4">
              Log in
            </RouterLink>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}
````

## File: frontend/src/routes/signup.tsx
````typescript
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createFileRoute,
  Link as RouterLink,
  redirect,
} from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AuthLayout } from "@/components/Common/AuthLayout"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import { PasswordInput } from "@/components/ui/password-input"
import useAuth, { isLoggedIn } from "@/hooks/useAuth"

const formSchema = z
  .object({
    email: z.email(),
    full_name: z.string().min(1, { message: "Full Name is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "The passwords don't match",
    path: ["confirm_password"],
  })

type FormData = z.infer<typeof formSchema>

export const Route = createFileRoute("/signup")({
  component: SignUp,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
  head: () => ({
    meta: [
      {
        title: "Sign Up - FastAPI Cloud",
      },
    ],
  }),
})

function SignUp() {
  const { signUpMutation } = useAuth()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      confirm_password: "",
    },
  })

  const onSubmit = (data: FormData) => {
    if (signUpMutation.isPending) return

    // exclude confirm_password from submission data
    const { confirm_password: _confirm_password, ...submitData } = data
    signUpMutation.mutate(submitData)
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Create an account</h1>
          </div>

          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="full-name-input"
                      placeholder="User"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="email-input"
                      placeholder="user@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      data-testid="password-input"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      data-testid="confirm-password-input"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              type="submit"
              className="w-full"
              loading={signUpMutation.isPending}
            >
              Sign Up
            </LoadingButton>
          </div>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <RouterLink to="/login" className="underline underline-offset-4">
              Log in
            </RouterLink>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}

export default SignUp
````

## File: frontend/src/index.css
````css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.5982 0.10687 182.4689);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.5982 0.10687 182.4689);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.65 0.10687 182.4689);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.65 0.10687 182.4689);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  button,
  [role="button"] {
    cursor: pointer;
  }
}
````

## File: frontend/src/main.tsx
````typescript
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { ApiError, OpenAPI } from "./client"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/sonner"
import "./index.css"
import { routeTree } from "./routeTree.gen"

OpenAPI.BASE = import.meta.env.VITE_API_URL
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || ""
}

const handleApiError = (error: Error) => {
  if (error instanceof ApiError && [401, 403].includes(error.status)) {
    localStorage.removeItem("access_token")
    window.location.href = "/login"
  }
}
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleApiError,
  }),
  mutationCache: new MutationCache({
    onError: handleApiError,
  }),
})

const router = createRouter({ routeTree })
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster richColors closeButton />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
````

## File: frontend/src/routeTree.gen.ts
````typescript
/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as SignupRouteImport } from './routes/signup'
import { Route as ResetPasswordRouteImport } from './routes/reset-password'
import { Route as RecoverPasswordRouteImport } from './routes/recover-password'
import { Route as LoginRouteImport } from './routes/login'
import { Route as LayoutRouteImport } from './routes/_layout'
import { Route as LayoutIndexRouteImport } from './routes/_layout/index'
import { Route as LayoutSettingsRouteImport } from './routes/_layout/settings'
import { Route as LayoutItemsRouteImport } from './routes/_layout/items'
import { Route as LayoutAdminRouteImport } from './routes/_layout/admin'

const SignupRoute = SignupRouteImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRouteImport,
} as any)
const ResetPasswordRoute = ResetPasswordRouteImport.update({
  id: '/reset-password',
  path: '/reset-password',
  getParentRoute: () => rootRouteImport,
} as any)
const RecoverPasswordRoute = RecoverPasswordRouteImport.update({
  id: '/recover-password',
  path: '/recover-password',
  getParentRoute: () => rootRouteImport,
} as any)
const LoginRoute = LoginRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRouteImport,
} as any)
const LayoutRoute = LayoutRouteImport.update({
  id: '/_layout',
  getParentRoute: () => rootRouteImport,
} as any)
const LayoutIndexRoute = LayoutIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)
const LayoutSettingsRoute = LayoutSettingsRouteImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => LayoutRoute,
} as any)
const LayoutItemsRoute = LayoutItemsRouteImport.update({
  id: '/items',
  path: '/items',
  getParentRoute: () => LayoutRoute,
} as any)
const LayoutAdminRoute = LayoutAdminRouteImport.update({
  id: '/admin',
  path: '/admin',
  getParentRoute: () => LayoutRoute,
} as any)

export interface FileRoutesByFullPath {
  '/login': typeof LoginRoute
  '/recover-password': typeof RecoverPasswordRoute
  '/reset-password': typeof ResetPasswordRoute
  '/signup': typeof SignupRoute
  '/admin': typeof LayoutAdminRoute
  '/items': typeof LayoutItemsRoute
  '/settings': typeof LayoutSettingsRoute
  '/': typeof LayoutIndexRoute
}
export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/recover-password': typeof RecoverPasswordRoute
  '/reset-password': typeof ResetPasswordRoute
  '/signup': typeof SignupRoute
  '/admin': typeof LayoutAdminRoute
  '/items': typeof LayoutItemsRoute
  '/settings': typeof LayoutSettingsRoute
  '/': typeof LayoutIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/_layout': typeof LayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/recover-password': typeof RecoverPasswordRoute
  '/reset-password': typeof ResetPasswordRoute
  '/signup': typeof SignupRoute
  '/_layout/admin': typeof LayoutAdminRoute
  '/_layout/items': typeof LayoutItemsRoute
  '/_layout/settings': typeof LayoutSettingsRoute
  '/_layout/': typeof LayoutIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/login'
    | '/recover-password'
    | '/reset-password'
    | '/signup'
    | '/admin'
    | '/items'
    | '/settings'
    | '/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/login'
    | '/recover-password'
    | '/reset-password'
    | '/signup'
    | '/admin'
    | '/items'
    | '/settings'
    | '/'
  id:
    | '__root__'
    | '/_layout'
    | '/login'
    | '/recover-password'
    | '/reset-password'
    | '/signup'
    | '/_layout/admin'
    | '/_layout/items'
    | '/_layout/settings'
    | '/_layout/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
  LoginRoute: typeof LoginRoute
  RecoverPasswordRoute: typeof RecoverPasswordRoute
  ResetPasswordRoute: typeof ResetPasswordRoute
  SignupRoute: typeof SignupRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/reset-password': {
      id: '/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof ResetPasswordRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/recover-password': {
      id: '/recover-password'
      path: '/recover-password'
      fullPath: '/recover-password'
      preLoaderRoute: typeof RecoverPasswordRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexRouteImport
      parentRoute: typeof LayoutRoute
    }
    '/_layout/settings': {
      id: '/_layout/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof LayoutSettingsRouteImport
      parentRoute: typeof LayoutRoute
    }
    '/_layout/items': {
      id: '/_layout/items'
      path: '/items'
      fullPath: '/items'
      preLoaderRoute: typeof LayoutItemsRouteImport
      parentRoute: typeof LayoutRoute
    }
    '/_layout/admin': {
      id: '/_layout/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof LayoutAdminRouteImport
      parentRoute: typeof LayoutRoute
    }
  }
}

interface LayoutRouteChildren {
  LayoutAdminRoute: typeof LayoutAdminRoute
  LayoutItemsRoute: typeof LayoutItemsRoute
  LayoutSettingsRoute: typeof LayoutSettingsRoute
  LayoutIndexRoute: typeof LayoutIndexRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutAdminRoute: LayoutAdminRoute,
  LayoutItemsRoute: LayoutItemsRoute,
  LayoutSettingsRoute: LayoutSettingsRoute,
  LayoutIndexRoute: LayoutIndexRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
  LoginRoute: LoginRoute,
  RecoverPasswordRoute: RecoverPasswordRoute,
  ResetPasswordRoute: ResetPasswordRoute,
  SignupRoute: SignupRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
````

## File: frontend/src/utils.ts
````typescript
import { AxiosError } from "axios"
import type { ApiError } from "./client"

function extractErrorMessage(err: ApiError): string {
  if (err instanceof AxiosError) {
    return err.message
  }

  const errDetail = (err.body as any)?.detail
  if (Array.isArray(errDetail) && errDetail.length > 0) {
    return errDetail[0].msg
  }
  return errDetail || "Something went wrong."
}

export const handleError = function (
  this: (msg: string) => void,
  err: ApiError,
) {
  const errorMessage = extractErrorMessage(err)
  this(errorMessage)
}

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}
````

## File: frontend/src/vite-env.d.ts
````typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
````

## File: frontend/tests/utils/mailcatcher.ts
````typescript
import type { APIRequestContext } from "@playwright/test"

type Email = {
  id: number
  recipients: string[]
  subject: string
}

async function findEmail({
  request,
  filter,
}: {
  request: APIRequestContext
  filter?: (email: Email) => boolean
}) {
  const response = await request.get(`${process.env.MAILCATCHER_HOST}/messages`)

  let emails = await response.json()

  if (filter) {
    emails = emails.filter(filter)
  }

  const email = emails[emails.length - 1]

  if (email) {
    return email as Email
  }

  return null
}

export function findLastEmail({
  request,
  filter,
  timeout = 5000,
}: {
  request: APIRequestContext
  filter?: (email: Email) => boolean
  timeout?: number
}) {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error("Timeout while trying to get latest email")),
      timeout,
    ),
  )

  const checkEmails = async () => {
    while (true) {
      const emailData = await findEmail({ request, filter })

      if (emailData) {
        return emailData
      }
      // Wait for 100ms before checking again
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }

  return Promise.race([timeoutPromise, checkEmails()])
}
````

## File: frontend/tests/utils/privateApi.ts
````typescript
// Note: the `PrivateService` is only available when generating the client
// for local environments
import { OpenAPI, PrivateService } from "../../src/client"

OpenAPI.BASE = `${process.env.VITE_API_URL}`

export const createUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  return await PrivateService.createUser({
    requestBody: {
      email,
      password,
      is_verified: true,
      full_name: "Test User",
    },
  })
}
````

## File: frontend/tests/utils/random.ts
````typescript
export const randomEmail = () =>
  `test_${Math.random().toString(36).substring(7)}@example.com`

export const randomTeamName = () =>
  `Team ${Math.random().toString(36).substring(7)}`

export const randomPassword = () => `${Math.random().toString(36).substring(2)}`

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
````

## File: frontend/tests/utils/user.ts
````typescript
import { expect, type Page } from "@playwright/test"

export async function signUpNewUser(
  page: Page,
  name: string,
  email: string,
  password: string,
) {
  await page.goto("/signup")

  await page.getByTestId("full-name-input").fill(name)
  await page.getByTestId("email-input").fill(email)
  await page.getByTestId("password-input").fill(password)
  await page.getByTestId("confirm-password-input").fill(password)
  await page.getByRole("button", { name: "Sign Up" }).click()
  await page.goto("/login")
}

export async function logInUser(page: Page, email: string, password: string) {
  await page.goto("/login")

  await page.getByTestId("email-input").fill(email)
  await page.getByTestId("password-input").fill(password)
  await page.getByRole("button", { name: "Log In" }).click()
  await page.waitForURL("/")
  await expect(
    page.getByText("Welcome back, nice to see you again!"),
  ).toBeVisible()
}

export async function logOutUser(page: Page) {
  await page.getByTestId("user-menu").click()
  await page.getByRole("menuitem", { name: "Log out" }).click()
  await page.goto("/login")
}
````

## File: frontend/tests/auth.setup.ts
````typescript
import { test as setup } from "@playwright/test"
import { firstSuperuser, firstSuperuserPassword } from "./config.ts"

const authFile = "playwright/.auth/user.json"

setup("authenticate", async ({ page }) => {
  await page.goto("/login")
  await page.getByTestId("email-input").fill(firstSuperuser)
  await page.getByTestId("password-input").fill(firstSuperuserPassword)
  await page.getByRole("button", { name: "Log In" }).click()
  await page.waitForURL("/")
  await page.context().storageState({ path: authFile })
})
````

## File: frontend/tests/config.ts
````typescript
import path from "node:path"
import { fileURLToPath } from "node:url"
import dotenv from "dotenv"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, "../../.env") })

function getEnvVar(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Environment variable ${name} is undefined`)
  }
  return value
}

export const firstSuperuser = getEnvVar("FIRST_SUPERUSER")
export const firstSuperuserPassword = getEnvVar("FIRST_SUPERUSER_PASSWORD")
````

## File: frontend/tests/login.spec.ts
````typescript
import { expect, type Page, test } from "@playwright/test"
import { firstSuperuser, firstSuperuserPassword } from "./config.ts"
import { randomPassword } from "./utils/random.ts"

test.use({ storageState: { cookies: [], origins: [] } })

const fillForm = async (page: Page, email: string, password: string) => {
  await page.getByTestId("email-input").fill(email)
  await page.getByTestId("password-input").fill(password)
}

const verifyInput = async (page: Page, testId: string) => {
  const input = page.getByTestId(testId)
  await expect(input).toBeVisible()
  await expect(input).toHaveText("")
  await expect(input).toBeEditable()
}

test("Inputs are visible, empty and editable", async ({ page }) => {
  await page.goto("/login")

  await verifyInput(page, "email-input")
  await verifyInput(page, "password-input")
})

test("Log In button is visible", async ({ page }) => {
  await page.goto("/login")

  await expect(page.getByRole("button", { name: "Log In" })).toBeVisible()
})

test("Forgot Password link is visible", async ({ page }) => {
  await page.goto("/login")

  await expect(
    page.getByRole("link", { name: "Forgot your password?" }),
  ).toBeVisible()
})

test("Log in with valid email and password ", async ({ page }) => {
  await page.goto("/login")

  await fillForm(page, firstSuperuser, firstSuperuserPassword)
  await page.getByRole("button", { name: "Log In" }).click()

  await page.waitForURL("/")

  await expect(
    page.getByText("Welcome back, nice to see you again!"),
  ).toBeVisible()
})

test("Log in with invalid email", async ({ page }) => {
  await page.goto("/login")

  await fillForm(page, "invalidemail", firstSuperuserPassword)
  await page.getByRole("button", { name: "Log In" }).click()

  await expect(page.getByText("Invalid email address")).toBeVisible()
})

test("Log in with invalid password", async ({ page }) => {
  const password = randomPassword()

  await page.goto("/login")
  await fillForm(page, firstSuperuser, password)
  await page.getByRole("button", { name: "Log In" }).click()

  await expect(page.getByText("Incorrect email or password")).toBeVisible()
})

// Log out

test("Successful log out", async ({ page }) => {
  await page.goto("/login")

  await fillForm(page, firstSuperuser, firstSuperuserPassword)
  await page.getByRole("button", { name: "Log In" }).click()

  await page.waitForURL("/")

  await expect(
    page.getByText("Welcome back, nice to see you again!"),
  ).toBeVisible()

  await page.getByTestId("user-menu").click()
  await page.getByRole("menuitem", { name: "Log out" }).click()
  await page.waitForURL("/login")
})

test("Logged-out user cannot access protected routes", async ({ page }) => {
  await page.goto("/login")

  await fillForm(page, firstSuperuser, firstSuperuserPassword)
  await page.getByRole("button", { name: "Log In" }).click()

  await page.waitForURL("/")

  await expect(
    page.getByText("Welcome back, nice to see you again!"),
  ).toBeVisible()

  await page.getByTestId("user-menu").click()
  await page.getByRole("menuitem", { name: "Log out" }).click()
  await page.waitForURL("/login")

  await page.goto("/settings")
  await page.waitForURL("/login")
})

test("Redirects to /login when token is wrong", async ({ page }) => {
  await page.goto("/settings")
  await page.evaluate(() => {
    localStorage.setItem("access_token", "invalid_token")
  })
  await page.goto("/settings")
  await page.waitForURL("/login")
  await expect(page).toHaveURL("/login")
})
````

## File: frontend/tests/reset-password.spec.ts
````typescript
import { expect, test } from "@playwright/test"
import { findLastEmail } from "./utils/mailcatcher"
import { randomEmail, randomPassword } from "./utils/random"
import { logInUser, signUpNewUser } from "./utils/user"

test.use({ storageState: { cookies: [], origins: [] } })

test("Password Recovery title is visible", async ({ page }) => {
  await page.goto("/recover-password")

  await expect(
    page.getByRole("heading", { name: "Password Recovery" }),
  ).toBeVisible()
})

test("Input is visible, empty and editable", async ({ page }) => {
  await page.goto("/recover-password")

  await expect(page.getByTestId("email-input")).toBeVisible()
  await expect(page.getByTestId("email-input")).toHaveText("")
  await expect(page.getByTestId("email-input")).toBeEditable()
})

test("Continue button is visible", async ({ page }) => {
  await page.goto("/recover-password")

  await expect(page.getByRole("button", { name: "Continue" })).toBeVisible()
})

test("User can reset password successfully using the link", async ({
  page,
  request,
}) => {
  const fullName = "Test User"
  const email = randomEmail()
  const password = randomPassword()
  const newPassword = randomPassword()

  // Sign up a new user
  await signUpNewUser(page, fullName, email, password)

  await page.goto("/recover-password")
  await page.getByTestId("email-input").fill(email)

  await page.getByRole("button", { name: "Continue" }).click()

  const emailData = await findLastEmail({
    request,
    filter: (e) => e.recipients.includes(`<${email}>`),
    timeout: 5000,
  })

  await page.goto(
    `${process.env.MAILCATCHER_HOST}/messages/${emailData.id}.html`,
  )

  const selector = 'a[href*="/reset-password?token="]'

  let url = await page.getAttribute(selector, "href")

  // TODO: update var instead of doing a replace
  url = url!.replace("http://localhost/", "http://localhost:5173/")

  // Set the new password and confirm it
  await page.goto(url)

  await page.getByTestId("new-password-input").fill(newPassword)
  await page.getByTestId("confirm-password-input").fill(newPassword)
  await page.getByRole("button", { name: "Reset Password" }).click()
  await expect(page.getByText("Password updated successfully")).toBeVisible()

  // Check if the user is able to login with the new password
  await logInUser(page, email, newPassword)
})

test("Expired or invalid reset link", async ({ page }) => {
  const password = randomPassword()
  const invalidUrl = "/reset-password?token=invalidtoken"

  await page.goto(invalidUrl)

  await page.getByTestId("new-password-input").fill(password)
  await page.getByTestId("confirm-password-input").fill(password)
  await page.getByRole("button", { name: "Reset Password" }).click()

  await expect(page.getByText("Invalid token")).toBeVisible()
})

test("Weak new password validation", async ({ page, request }) => {
  const fullName = "Test User"
  const email = randomEmail()
  const password = randomPassword()
  const weakPassword = "123"

  // Sign up a new user
  await signUpNewUser(page, fullName, email, password)

  await page.goto("/recover-password")
  await page.getByTestId("email-input").fill(email)
  await page.getByRole("button", { name: "Continue" }).click()

  const emailData = await findLastEmail({
    request,
    filter: (e) => e.recipients.includes(`<${email}>`),
    timeout: 5000,
  })

  await page.goto(
    `${process.env.MAILCATCHER_HOST}/messages/${emailData.id}.html`,
  )

  const selector = 'a[href*="/reset-password?token="]'
  let url = await page.getAttribute(selector, "href")
  url = url!.replace("http://localhost/", "http://localhost:5173/")

  // Set a weak new password
  await page.goto(url)
  await page.getByTestId("new-password-input").fill(weakPassword)
  await page.getByTestId("confirm-password-input").fill(weakPassword)
  await page.getByRole("button", { name: "Reset Password" }).click()

  await expect(
    page.getByText("Password must be at least 8 characters"),
  ).toBeVisible()
})
````

## File: frontend/tests/sign-up.spec.ts
````typescript
import { expect, type Page, test } from "@playwright/test"

import { randomEmail, randomPassword } from "./utils/random"

test.use({ storageState: { cookies: [], origins: [] } })

const fillForm = async (
  page: Page,
  full_name: string,
  email: string,
  password: string,
  confirm_password: string,
) => {
  await page.getByTestId("full-name-input").fill(full_name)
  await page.getByTestId("email-input").fill(email)
  await page.getByTestId("password-input").fill(password)
  await page.getByTestId("confirm-password-input").fill(confirm_password)
}

const verifyInput = async (page: Page, testId: string) => {
  const input = page.getByTestId(testId)
  await expect(input).toBeVisible()
  await expect(input).toHaveText("")
  await expect(input).toBeEditable()
}

test("Inputs are visible, empty and editable", async ({ page }) => {
  await page.goto("/signup")

  await verifyInput(page, "full-name-input")
  await verifyInput(page, "email-input")
  await verifyInput(page, "password-input")
  await verifyInput(page, "confirm-password-input")
})

test("Sign Up button is visible", async ({ page }) => {
  await page.goto("/signup")

  await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible()
})

test("Log In link is visible", async ({ page }) => {
  await page.goto("/signup")

  await expect(page.getByRole("link", { name: "Log In" })).toBeVisible()
})

test("Sign up with valid name, email, and password", async ({ page }) => {
  const full_name = "Test User"
  const email = randomEmail()
  const password = randomPassword()

  await page.goto("/signup")
  await fillForm(page, full_name, email, password, password)
  await page.getByRole("button", { name: "Sign Up" }).click()
})

test("Sign up with invalid email", async ({ page }) => {
  await page.goto("/signup")

  await fillForm(
    page,
    "Playwright Test",
    "invalid-email",
    "changethis",
    "changethis",
  )
  await page.getByRole("button", { name: "Sign Up" }).click()

  await expect(page.getByText("Invalid email address")).toBeVisible()
})

test("Sign up with existing email", async ({ page }) => {
  const fullName = "Test User"
  const email = randomEmail()
  const password = randomPassword()

  // Sign up with an email
  await page.goto("/signup")

  await fillForm(page, fullName, email, password, password)
  await page.getByRole("button", { name: "Sign Up" }).click()

  // Sign up again with the same email
  await page.goto("/signup")

  await fillForm(page, fullName, email, password, password)
  await page.getByRole("button", { name: "Sign Up" }).click()

  await page
    .getByText("The user with this email already exists in the system")
    .click()
})

test("Sign up with weak password", async ({ page }) => {
  const fullName = "Test User"
  const email = randomEmail()
  const password = "weak"

  await page.goto("/signup")

  await fillForm(page, fullName, email, password, password)
  await page.getByRole("button", { name: "Sign Up" }).click()

  await expect(
    page.getByText("Password must be at least 8 characters"),
  ).toBeVisible()
})

test("Sign up with mismatched passwords", async ({ page }) => {
  const fullName = "Test User"
  const email = randomEmail()
  const password = randomPassword()
  const password2 = randomPassword()

  await page.goto("/signup")

  await fillForm(page, fullName, email, password, password2)
  await page.getByRole("button", { name: "Sign Up" }).click()

  await expect(page.getByText("The passwords don't match")).toBeVisible()
})

test("Sign up with missing full name", async ({ page }) => {
  const fullName = ""
  const email = randomEmail()
  const password = randomPassword()

  await page.goto("/signup")

  await fillForm(page, fullName, email, password, password)
  await page.getByRole("button", { name: "Sign Up" }).click()

  await expect(page.getByText("Full Name is required")).toBeVisible()
})

test("Sign up with missing email", async ({ page }) => {
  const fullName = "Test User"
  const email = ""
  const password = randomPassword()

  await page.goto("/signup")

  await fillForm(page, fullName, email, password, password)
  await page.getByRole("button", { name: "Sign Up" }).click()

  await expect(page.getByText("Invalid email address")).toBeVisible()
})

test("Sign up with missing password", async ({ page }) => {
  const fullName = ""
  const email = randomEmail()
  const password = ""

  await page.goto("/signup")

  await fillForm(page, fullName, email, password, password)
  await page.getByRole("button", { name: "Sign Up" }).click()

  await expect(page.getByText("Password is required")).toBeVisible()
})
````

## File: frontend/tests/user-settings.spec.ts
````typescript
import { expect, test } from "@playwright/test"
import { firstSuperuser, firstSuperuserPassword } from "./config.ts"
import { createUser } from "./utils/privateApi.ts"
import { randomEmail, randomPassword } from "./utils/random"
import { logInUser, logOutUser } from "./utils/user"

const tabs = ["My profile", "Password", "Danger zone"]

// User Information

test("My profile tab is active by default", async ({ page }) => {
  await page.goto("/settings")
  await expect(page.getByRole("tab", { name: "My profile" })).toHaveAttribute(
    "aria-selected",
    "true",
  )
})

test("All tabs are visible", async ({ page }) => {
  await page.goto("/settings")
  for (const tab of tabs) {
    await expect(page.getByRole("tab", { name: tab })).toBeVisible()
  }
})

test.describe("Edit user full name and email successfully", () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test("Edit user name with a valid name", async ({ page }) => {
    const email = randomEmail()
    const updatedName = "Test User 2"
    const password = randomPassword()

    await createUser({ email, password })

    // Log in the user
    await logInUser(page, email, password)

    await page.goto("/settings")
    await page.getByRole("tab", { name: "My profile" }).click()
    await page.getByRole("button", { name: "Edit" }).click()
    await page.getByLabel("Full name").fill(updatedName)
    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("User updated successfully")).toBeVisible()
    // Check if the new name is displayed on the page
    await expect(
      page.locator("form").getByText(updatedName, { exact: true }),
    ).toBeVisible()
  })

  test("Edit user email with a valid email", async ({ page }) => {
    const email = randomEmail()
    const updatedEmail = randomEmail()
    const password = randomPassword()

    await createUser({ email, password })

    // Log in the user
    await logInUser(page, email, password)

    await page.goto("/settings")
    await page.getByRole("tab", { name: "My profile" }).click()
    await page.getByRole("button", { name: "Edit" }).click()
    await page.getByLabel("Email").fill(updatedEmail)
    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("User updated successfully")).toBeVisible()
    await expect(
      page.locator("form").getByText(updatedEmail, { exact: true }),
    ).toBeVisible()
  })
})

test.describe("Edit user with invalid data", () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test("Edit user email with an invalid email", async ({ page }) => {
    const email = randomEmail()
    const password = randomPassword()
    const invalidEmail = ""

    await createUser({ email, password })

    // Log in the user
    await logInUser(page, email, password)

    await page.goto("/settings")
    await page.getByRole("tab", { name: "My profile" }).click()
    await page.getByRole("button", { name: "Edit" }).click()
    await page.getByLabel("Email").fill(invalidEmail)
    await page.locator("body").click()
    await expect(page.getByText("Invalid email address")).toBeVisible()
  })

  test("Cancel edit action restores original name", async ({ page }) => {
    const email = randomEmail()
    const password = randomPassword()
    const updatedName = "Test User"

    const user = await createUser({ email, password })

    // Log in the user
    await logInUser(page, email, password)

    await page.goto("/settings")
    await page.getByRole("tab", { name: "My profile" }).click()
    await page.getByRole("button", { name: "Edit" }).click()
    await page.getByLabel("Full name").fill(updatedName)
    await page.getByRole("button", { name: "Cancel" }).first().click()
    await expect(
      page.locator("form").getByText(user.full_name as string, { exact: true }),
    ).toBeVisible()
  })

  test("Cancel edit action restores original email", async ({ page }) => {
    const email = randomEmail()
    const password = randomPassword()
    const updatedEmail = randomEmail()

    await createUser({ email, password })

    // Log in the user
    await logInUser(page, email, password)

    await page.goto("/settings")
    await page.getByRole("tab", { name: "My profile" }).click()
    await page.getByRole("button", { name: "Edit" }).click()
    await page.getByLabel("Email").fill(updatedEmail)
    await page.getByRole("button", { name: "Cancel" }).first().click()
    await expect(
      page.locator("form").getByText(email, { exact: true }),
    ).toBeVisible()
  })
})

// Change Password

test.describe("Change password successfully", () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test("Update password successfully", async ({ page }) => {
    const email = randomEmail()
    const password = randomPassword()
    const NewPassword = randomPassword()

    await createUser({ email, password })

    // Log in the user
    await logInUser(page, email, password)

    await page.goto("/settings")
    await page.getByRole("tab", { name: "Password" }).click()
    await page.getByTestId("current-password-input").fill(password)
    await page.getByTestId("new-password-input").fill(NewPassword)
    await page.getByTestId("confirm-password-input").fill(NewPassword)
    await page.getByRole("button", { name: "Update Password" }).click()
    await expect(page.getByText("Password updated successfully")).toBeVisible()

    await logOutUser(page)

    // Check if the user can log in with the new password
    await logInUser(page, email, NewPassword)
  })
})

test.describe("Change password with invalid data", () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test("Update password with weak passwords", async ({ page }) => {
    const email = randomEmail()
    const password = randomPassword()
    const weakPassword = "weak"

    await createUser({ email, password })

    // Log in the user
    await logInUser(page, email, password)

    await page.goto("/settings")
    await page.getByRole("tab", { name: "Password" }).click()
    await page.getByTestId("current-password-input").fill(password)
    await page.getByTestId("new-password-input").fill(weakPassword)
    await page.getByTestId("confirm-password-input").fill(weakPassword)
    await page.getByRole("button", { name: "Update Password" }).click()
    await expect(
      page.getByText("Password must be at least 8 characters"),
    ).toBeVisible()
  })

  test("New password and confirmation password do not match", async ({
    page,
  }) => {
    const email = randomEmail()
    const password = randomPassword()
    const newPassword = randomPassword()
    const confirmPassword = randomPassword()

    await createUser({ email, password })

    // Log in the user
    await logInUser(page, email, password)

    await page.goto("/settings")
    await page.getByRole("tab", { name: "Password" }).click()
    await page.getByTestId("current-password-input").fill(password)
    await page.getByTestId("new-password-input").fill(newPassword)
    await page.getByTestId("confirm-password-input").fill(confirmPassword)
    await page.getByRole("button", { name: "Update Password" }).click()
    await expect(page.getByText("The passwords don't match")).toBeVisible()
  })

  test("Current password and new password are the same", async ({ page }) => {
    const email = randomEmail()
    const password = randomPassword()

    await createUser({ email, password })

    // Log in the user
    await logInUser(page, email, password)

    await page.goto("/settings")
    await page.getByRole("tab", { name: "Password" }).click()
    await page.getByTestId("current-password-input").fill(password)
    await page.getByTestId("new-password-input").fill(password)
    await page.getByTestId("confirm-password-input").fill(password)
    await page.getByRole("button", { name: "Update Password" }).click()
    await expect(
      page.getByText("New password cannot be the same as the current one"),
    ).toBeVisible()
  })
})

// Appearance

test("Appearance button is visible in sidebar", async ({ page }) => {
  await page.goto("/settings")
  await expect(page.getByTestId("theme-button")).toBeVisible()
})

test("User can switch between theme modes", async ({
  page,
}) => {
  await page.goto("/settings")

  await page.getByTestId("theme-button").click()
  await page.getByTestId("dark-mode").click()
  await expect(page.locator("html")).toHaveClass(/dark/)

  // wait for dropdown to close before reopening
  await expect(page.getByTestId("dark-mode")).not.toBeVisible()

  await page.getByTestId("theme-button").click()
  await page.getByTestId("light-mode").click()
  await expect(page.locator("html")).toHaveClass(/light/)
})

test("Selected mode is preserved across sessions", async ({ page }) => {
  await page.goto("/settings")

  await page.getByTestId("theme-button").click()
  if (
    await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    )
  ) {
    await page.getByTestId("light-mode").click()
    await page.getByTestId("theme-button").click()
  }

  const isLightMode = await page.evaluate(() =>
    document.documentElement.classList.contains("light"),
  )
  expect(isLightMode).toBe(true)

  await page.getByTestId("theme-button").click()
  await page.getByTestId("dark-mode").click()
  let isDarkMode = await page.evaluate(() =>
    document.documentElement.classList.contains("dark"),
  )
  expect(isDarkMode).toBe(true)

  await logOutUser(page)
  await logInUser(page, firstSuperuser, firstSuperuserPassword)

  isDarkMode = await page.evaluate(() =>
    document.documentElement.classList.contains("dark"),
  )
  expect(isDarkMode).toBe(true)
})
````

## File: frontend/.dockerignore
````
node_modules
dist
````

## File: frontend/.env
````
VITE_API_URL=http://localhost:8000
MAILCATCHER_HOST=http://localhost:1080
````

## File: frontend/.gitignore
````
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local
openapi.json

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/
/playwright/.auth/
````

## File: frontend/.nvmrc
````
24
````

## File: frontend/biome.json
````json
{
  "$schema": "https://biomejs.dev/schemas/2.3.8/schema.json",
  "assist": { "actions": { "source": { "organizeImports": "on" } } },
  "files": {
    "includes": [
      "**",
      "!**/dist/**/*",
      "!**/node_modules/**/*",
      "!**/src/routeTree.gen.ts",
      "!**/src/client/**/*",
      "!**/src/components/ui/**/*",
      "!**/playwright-report",
      "!**/playwright.config.ts"
    ]
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "off",
        "noArrayIndexKey": "off"
      },
      "style": {
        "noNonNullAssertion": "off",
        "noParameterAssign": "error",
        "useSelfClosingElements": "error",
        "noUselessElse": "error"
      }
    }
  },
  "formatter": {
    "indentStyle": "space"
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double",
      "semicolons": "asNeeded"
    }
  },
  "css": {
    "parser": {
      "tailwindDirectives": true
    }
  }
}
````

## File: frontend/components.json
````json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}
````

## File: frontend/Dockerfile
````
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:24 AS build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

ARG VITE_API_URL=${VITE_API_URL}

RUN npm run build


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf
````

## File: frontend/Dockerfile.playwright
````
FROM mcr.microsoft.com/playwright:v1.57.0-noble

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

ARG VITE_API_URL=${VITE_API_URL}
````

## File: frontend/index.html
````html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Full Stack FastAPI Project</title>
    <link rel="icon" type="image/x-icon" href="/assets/images/favicon.png" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/main.tsx"></script>
  </body>
</html>
````

## File: frontend/nginx-backend-not-found.conf
````ini
location /api {
    return 404;
}
location /docs {
    return 404;
}
location /redoc {
    return 404;
}
````

## File: frontend/nginx.conf
````ini
server {
  listen 80;

  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri /index.html =404;
  }

  include /etc/nginx/extra-conf.d/*.conf;
}
````

## File: frontend/openapi-ts.config.ts
````typescript
import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  input: "./openapi.json",
  output: "./src/client",

  plugins: [
    "legacy/axios",
    {
      name: "@hey-api/sdk",
      // NOTE: this doesn't allow tree-shaking
      asClass: true,
      operationId: true,
      classNameBuilder: "{{name}}Service",
      methodNameBuilder: (operation) => {
        // @ts-expect-error
        let name: string = operation.name
        // @ts-expect-error
        const service: string = operation.service

        if (service && name.toLowerCase().startsWith(service.toLowerCase())) {
          name = name.slice(service.length)
        }

        return name.charAt(0).toLowerCase() + name.slice(1)
      },
    },
    {
      name: "@hey-api/schemas",
      type: "json",
    },
  ],
})
````

## File: frontend/package.json
````json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -p tsconfig.build.json && vite build",
    "lint": "biome check --write --unsafe --no-errors-on-unmatched --files-ignore-unknown=true ./",
    "preview": "vite preview",
    "generate-client": "openapi-ts"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@tailwindcss/vite": "^4.1.18",
    "@tanstack/react-query": "^5.90.12",
    "@tanstack/react-query-devtools": "^5.91.1",
    "@tanstack/react-router": "^1.142.11",
    "@tanstack/react-router-devtools": "^1.142.8",
    "@tanstack/react-table": "^8.21.3",
    "axios": "1.13.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "form-data": "4.0.5",
    "lucide-react": "^0.556.0",
    "next-themes": "^0.4.6",
    "react": "^19.1.1",
    "react-dom": "^19.2.3",
    "react-error-boundary": "^6.0.0",
    "react-hook-form": "^7.68.0",
    "react-icons": "^5.5.0",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0",
    "tailwindcss": "^4.1.17",
    "zod": "^4.2.1"
  },
  "devDependencies": {
    "@biomejs/biome": "^2.3.10",
    "@hey-api/openapi-ts": "0.73.0",
    "@playwright/test": "1.57.0",
    "@tanstack/router-devtools": "^1.142.11",
    "@tanstack/router-plugin": "^1.140.0",
    "@types/node": "^25.0.2",
    "@types/react": "^19.2.7",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react-swc": "^4.2.2",
    "dotenv": "^17.2.3",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5.9.3",
    "vite": "^7.3.0"
  }
}
````

## File: frontend/playwright.config.ts
````typescript
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'blob' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5173',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
````

## File: frontend/README.md
````markdown
# FastAPI Project - Frontend

The frontend is built with [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [TanStack Query](https://tanstack.com/query), [TanStack Router](https://tanstack.com/router) and [Tailwind CSS](https://tailwindcss.com/).

## Frontend development

Before you begin, ensure that you have either the Node Version Manager (nvm) or Fast Node Manager (fnm) installed on your system.

* To install fnm follow the [official fnm guide](https://github.com/Schniz/fnm#installation). If you prefer nvm, you can install it using the [official nvm guide](https://github.com/nvm-sh/nvm#installing-and-updating).

* After installing either nvm or fnm, proceed to the `frontend` directory:

```bash
cd frontend
```
* If the Node.js version specified in the `.nvmrc` file isn't installed on your system, you can install it using the appropriate command:

```bash
# If using fnm
fnm install

# If using nvm
nvm install
```

* Once the installation is complete, switch to the installed version:

```bash
# If using fnm
fnm use

# If using nvm
nvm use
```

* Within the `frontend` directory, install the necessary NPM packages:

```bash
npm install
```

* And start the live server with the following `npm` script:

```bash
npm run dev
```

* Then open your browser at http://localhost:5173/.

Notice that this live server is not running inside Docker, it's for local development, and that is the recommended workflow. Once you are happy with your frontend, you can build the frontend Docker image and start it, to test it in a production-like environment. But building the image at every change will not be as productive as running the local development server with live reload.

Check the file `package.json` to see other available options.

### Removing the frontend

If you are developing an API-only app and want to remove the frontend, you can do it easily:

* Remove the `./frontend` directory.

* In the `docker-compose.yml` file, remove the whole service / section `frontend`.

* In the `docker-compose.override.yml` file, remove the whole service / section `frontend` and `playwright`.

Done, you have a frontend-less (api-only) app. 🤓

---

If you want, you can also remove the `FRONTEND` environment variables from:

* `.env`
* `./scripts/*.sh`

But it would be only to clean them up, leaving them won't really have any effect either way.

## Generate Client

### Automatically

* Activate the backend virtual environment.
* From the top level project directory, run the script:

```bash
./scripts/generate-client.sh
```

* Commit the changes.

### Manually

* Start the Docker Compose stack.

* Download the OpenAPI JSON file from `http://localhost/api/v1/openapi.json` and copy it to a new file `openapi.json` at the root of the `frontend` directory.

* To generate the frontend client, run:

```bash
npm run generate-client
```

* Commit the changes.

Notice that everytime the backend changes (changing the OpenAPI schema), you should follow these steps again to update the frontend client.

## Using a Remote API

If you want to use a remote API, you can set the environment variable `VITE_API_URL` to the URL of the remote API. For example, you can set it in the `frontend/.env` file:

```env
VITE_API_URL=https://api.my-domain.example.com
```

Then, when you run the frontend, it will use that URL as the base URL for the API.

## Code Structure

The frontend code is structured as follows:

* `frontend/src` - The main frontend code.
* `frontend/src/assets` - Static assets.
* `frontend/src/client` - The generated OpenAPI client.
* `frontend/src/components` -  The different components of the frontend.
* `frontend/src/hooks` - Custom hooks.
* `frontend/src/routes` - The different routes of the frontend which include the pages.

## End-to-End Testing with Playwright

The frontend includes initial end-to-end tests using Playwright. To run the tests, you need to have the Docker Compose stack running. Start the stack with the following command:

```bash
docker compose up -d --wait backend
```

Then, you can run the tests with the following command:

```bash
npx playwright test
```

You can also run your tests in UI mode to see the browser and interact with it running:

```bash
npx playwright test --ui
```

To stop and remove the Docker Compose stack and clean the data created in tests, use the following command:

```bash
docker compose down -v
```

To update the tests, navigate to the tests directory and modify the existing test files or add new ones as needed.

For more information on writing and running Playwright tests, refer to the official [Playwright documentation](https://playwright.dev/docs/intro).
````

## File: frontend/tsconfig.build.json
````json
{
  "extends": "./tsconfig.json",
  "exclude": ["tests/**/*.ts"]
}
````

## File: frontend/tsconfig.json
````json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "tests", "playwright.config.ts"],
  "references": [
    {
      "path": "./tsconfig.node.json"
    }
  ]
}
````

## File: frontend/tsconfig.node.json
````json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
````

## File: frontend/vite.config.ts
````typescript
import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
})
````

## File: hooks/post_gen_project.py
````python
from pathlib import Path


path: Path
for path in Path(".").glob("**/*.sh"):
    data = path.read_bytes()
    lf_data = data.replace(b"\r\n", b"\n")
    path.write_bytes(lf_data)
````

## File: img/github-social-preview.svg
````xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   id="svg8"
   version="1.1"
   viewBox="0 0 338.66665 169.33332"
   height="169.33333mm"
   width="338.66666mm"
   sodipodi:docname="github-social-preview.svg"
   inkscape:version="1.3.2 (091e20e, 2023-11-25)"
   inkscape:export-filename="github-social-preview.png"
   inkscape:export-xdpi="96"
   inkscape:export-ydpi="96"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:dc="http://purl.org/dc/elements/1.1/">
  <sodipodi:namedview
     id="namedview1"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm"
     inkscape:zoom="0.90703128"
     inkscape:cx="761.82599"
     inkscape:cy="378.708"
     inkscape:window-width="3440"
     inkscape:window-height="1403"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1"
     inkscape:current-layer="svg8"
     inkscape:export-bgcolor="#ffffffff" />
  <defs
     id="defs2" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     id="g1">
    <g
       id="g2106"
       transform="matrix(0.70774989,0,0,0.70546111,-616.80273,204.04667)">
      <circle
         style="fill:#009688;fill-opacity:0.980392;stroke:none;stroke-width:0.141404;stop-color:#000000"
         id="path875-5-9-7-3-2-3-9-9-8-0-0-5-87-7"
         cx="964.56165"
         cy="-169.22266"
         r="33.234192" />
      <path
         id="rect1249-6-3-4-4-3-6-6-1-2"
         style="fill:#ffffff;fill-opacity:0.980392;stroke:none;stroke-width:0.146895;stop-color:#000000"
         d="m 962.2685,-187.40837 -6.64403,14.80375 -3.03599,6.76393 -6.64456,14.80375 30.59142,-21.56768 h -14.35312 l 20.99715,-14.80375 z" />
    </g>
    <text
       id="text979-3"
       y="104.76513"
       x="102.9338"
       style="font-style:normal;font-weight:normal;font-size:58.4257px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#009688;fill-opacity:1;stroke:none;stroke-width:1.46064"
       xml:space="preserve"><tspan
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-family:Ubuntu;-inkscape-font-specification:Ubuntu;fill:#009688;fill-opacity:1;stroke-width:1.46064"
         y="104.76513"
         x="102.9338"
         id="tspan977-7">FastAPI</tspan></text>
  </g>
  <text
     id="text979-3-9"
     y="41.659103"
     x="111.77306"
     style="font-style:normal;font-weight:normal;font-size:26.2953px;line-height:1.05;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#009688;fill-opacity:1;stroke:none;stroke-width:0.657384"
     xml:space="preserve"><tspan
       style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:1.05;font-family:Ubuntu;-inkscape-font-specification:Ubuntu;fill:#009688;fill-opacity:1;stroke-width:0.657384"
       y="41.659103"
       x="111.77306"
       id="tspan977-7-6">Full Stack</tspan></text>
  <text
     id="text979-3-9-3"
     y="141.81412"
     x="113.75835"
     style="font-style:normal;font-weight:normal;font-size:26.2953px;line-height:1.05;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#009688;fill-opacity:1;stroke:none;stroke-width:0.657384"
     xml:space="preserve"><tspan
       style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:1.05;font-family:Ubuntu;-inkscape-font-specification:Ubuntu;fill:#009688;fill-opacity:1;stroke-width:0.657384"
       y="141.81412"
       x="113.75835"
       id="tspan977-7-6-2">Template</tspan></text>
</svg>
````

## File: scripts/build-push.sh
````bash
#! /usr/bin/env sh

# Exit in case of error
set -e

TAG=${TAG?Variable not set} \
FRONTEND_ENV=${FRONTEND_ENV-production} \
sh ./scripts/build.sh

docker-compose -f docker-compose.yml push
````

## File: scripts/build.sh
````bash
#! /usr/bin/env sh

# Exit in case of error
set -e

TAG=${TAG?Variable not set} \
FRONTEND_ENV=${FRONTEND_ENV-production} \
docker-compose \
-f docker-compose.yml \
build
````

## File: scripts/deploy.sh
````bash
#! /usr/bin/env sh

# Exit in case of error
set -e

DOMAIN=${DOMAIN?Variable not set} \
STACK_NAME=${STACK_NAME?Variable not set} \
TAG=${TAG?Variable not set} \
docker-compose \
-f docker-compose.yml \
config > docker-stack.yml

docker-auto-labels docker-stack.yml

docker stack deploy -c docker-stack.yml --with-registry-auth "${STACK_NAME?Variable not set}"
````

## File: scripts/generate-client.sh
````bash
#! /usr/bin/env bash

set -e
set -x

cd backend
python -c "import app.main; import json; print(json.dumps(app.main.app.openapi()))" > ../openapi.json
cd ..
mv openapi.json frontend/
cd frontend
npm run generate-client
````

## File: scripts/test-local.sh
````bash
#! /usr/bin/env bash

# Exit in case of error
set -e

docker-compose down -v --remove-orphans # Remove possibly previous broken stacks left hanging after an error

if [ $(uname -s) = "Linux" ]; then
    echo "Remove __pycache__ files"
    sudo find . -type d -name __pycache__ -exec rm -r {} \+
fi

docker-compose build
docker-compose up -d
docker-compose exec -T backend bash scripts/tests-start.sh "$@"
````

## File: scripts/test.sh
````bash
#! /usr/bin/env sh

# Exit in case of error
set -e
set -x

docker compose build
docker compose down -v --remove-orphans # Remove possibly previous broken stacks left hanging after an error
docker compose up -d
docker compose exec -T backend bash scripts/tests-start.sh "$@"
docker compose down -v --remove-orphans
````

## File: .gitattributes
````
* text=auto
*.sh text eol=lf
````

## File: .gitignore
````
.vscode
node_modules/
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/
````

## File: .pre-commit-config.yaml
````yaml
# See https://pre-commit.com for more information
# See https://pre-commit.com/hooks.html for more hooks
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: check-added-large-files
      - id: check-toml
      - id: check-yaml
        args:
          - --unsafe
      - id: end-of-file-fixer
        exclude: |
            (?x)^(
                frontend/src/client/.*|
                backend/app/email-templates/build/.*
            )$
      - id: trailing-whitespace
        exclude: ^frontend/src/client/.*
  - repo: local
    hooks:
      - id: local-biome-check
        name: biome check
        entry: bash -c 'cd frontend && npm run lint'
        language: system
        types: [text]
        files: ^frontend/

      - id: local-ruff-check
        name: ruff check
        entry: uv run ruff check --force-exclude --fix --exit-non-zero-on-fix
        require_serial: true
        language: unsupported
        types: [python]

      - id: local-ruff-format
        name: ruff format
        entry: uv run ruff format --force-exclude --exit-non-zero-on-format
        require_serial: true
        language: unsupported
        types: [python]
````

## File: copier.yml
````yaml
project_name:
  type: str
  help: The name of the project, shown to API users (in .env)
  default: FastAPI Project

stack_name:
  type: str
  help: The name of the stack used for Docker Compose labels (no spaces) (in .env)
  default: fastapi-project

secret_key:
  type: str
  help: |
    'The secret key for the project, used for security,
    stored in .env, you can generate one with:
    python -c "import secrets; print(secrets.token_urlsafe(32))"'
  default: changethis

first_superuser:
  type: str
  help: The email of the first superuser (in .env)
  default: admin@example.com

first_superuser_password:
  type: str
  help: The password of the first superuser (in .env)
  default: changethis

smtp_host:
  type: str
  help: The SMTP server host to send emails, you can set it later in .env
  default: ""

smtp_user:
  type: str
  help: The SMTP server user to send emails, you can set it later in .env
  default: ""

smtp_password:
  type: str
  help: The SMTP server password to send emails, you can set it later in .env
  default: ""

emails_from_email:
  type: str
  help: The email account to send emails from, you can set it later in .env
  default: info@example.com

postgres_password:
  type: str
  help: |
    'The password for the PostgreSQL database, stored in .env,
    you can generate one with:
    python -c "import secrets; print(secrets.token_urlsafe(32))"'
  default: changethis

sentry_dsn:
  type: str
  help: The DSN for Sentry, if you are using it, you can set it later in .env
  default: ""

_exclude:
  # Global
  - .vscode
  - .mypy_cache
  # Python
  - __pycache__
  - app.egg-info
  - "*.pyc"
  - .mypy_cache
  - .coverage
  - htmlcov
  - .cache
  - .venv
  # Frontend
  # Logs
  - logs
  - "*.log"
  - npm-debug.log*
  - yarn-debug.log*
  - yarn-error.log*
  - pnpm-debug.log*
  - lerna-debug.log*
  - node_modules
  - dist
  - dist-ssr
  - "*.local"
  # Editor directories and files
  - .idea
  - .DS_Store
  - "*.suo"
  - "*.ntvs*"
  - "*.njsproj"
  - "*.sln"
  - "*.sw?"

_answers_file: .copier/.copier-answers.yml

_tasks:
  - ["{{ _copier_python }}", .copier/update_dotenv.py]
````

## File: deployment.md
````markdown
# FastAPI Project - Deployment

You can deploy the project using Docker Compose to a remote server.

This project expects you to have a Traefik proxy handling communication to the outside world and HTTPS certificates.

You can use CI/CD (continuous integration and continuous deployment) systems to deploy automatically, there are already configurations to do it with GitHub Actions.

But you have to configure a couple things first. 🤓

## Preparation

* Have a remote server ready and available.
* Configure the DNS records of your domain to point to the IP of the server you just created.
* Configure a wildcard subdomain for your domain, so that you can have multiple subdomains for different services, e.g. `*.fastapi-project.example.com`. This will be useful for accessing different components, like `dashboard.fastapi-project.example.com`, `api.fastapi-project.example.com`, `traefik.fastapi-project.example.com`, `adminer.fastapi-project.example.com`, etc. And also for `staging`, like `dashboard.staging.fastapi-project.example.com`, `adminer.staging.fastapi-project.example.com`, etc.
* Install and configure [Docker](https://docs.docker.com/engine/install/) on the remote server (Docker Engine, not Docker Desktop).

## Public Traefik

We need a Traefik proxy to handle incoming connections and HTTPS certificates.

You need to do these next steps only once.

### Traefik Docker Compose

* Create a remote directory to store your Traefik Docker Compose file:

```bash
mkdir -p /root/code/traefik-public/
```

Copy the Traefik Docker Compose file to your server. You could do it by running the command `rsync` in your local terminal:

```bash
rsync -a docker-compose.traefik.yml root@your-server.example.com:/root/code/traefik-public/
```

### Traefik Public Network

This Traefik will expect a Docker "public network" named `traefik-public` to communicate with your stack(s).

This way, there will be a single public Traefik proxy that handles the communication (HTTP and HTTPS) with the outside world, and then behind that, you could have one or more stacks with different domains, even if they are on the same single server.

To create a Docker "public network" named `traefik-public` run the following command in your remote server:

```bash
docker network create traefik-public
```

### Traefik Environment Variables

The Traefik Docker Compose file expects some environment variables to be set in your terminal before starting it. You can do it by running the following commands in your remote server.

* Create the username for HTTP Basic Auth, e.g.:

```bash
export USERNAME=admin
```

* Create an environment variable with the password for HTTP Basic Auth, e.g.:

```bash
export PASSWORD=changethis
```

* Use openssl to generate the "hashed" version of the password for HTTP Basic Auth and store it in an environment variable:

```bash
export HASHED_PASSWORD=$(openssl passwd -apr1 $PASSWORD)
```

To verify that the hashed password is correct, you can print it:

```bash
echo $HASHED_PASSWORD
```

* Create an environment variable with the domain name for your server, e.g.:

```bash
export DOMAIN=fastapi-project.example.com
```

* Create an environment variable with the email for Let's Encrypt, e.g.:

```bash
export EMAIL=admin@example.com
```

**Note**: you need to set a different email, an email `@example.com` won't work.

### Start the Traefik Docker Compose

Go to the directory where you copied the Traefik Docker Compose file in your remote server:

```bash
cd /root/code/traefik-public/
```

Now with the environment variables set and the `docker-compose.traefik.yml` in place, you can start the Traefik Docker Compose running the following command:

```bash
docker compose -f docker-compose.traefik.yml up -d
```

## Deploy the FastAPI Project

Now that you have Traefik in place you can deploy your FastAPI project with Docker Compose.

**Note**: You might want to jump ahead to the section about Continuous Deployment with GitHub Actions.

## Environment Variables

You need to set some environment variables first.

Set the `ENVIRONMENT`, by default `local` (for development), but when deploying to a server you would put something like `staging` or `production`:

```bash
export ENVIRONMENT=production
```

Set the `DOMAIN`, by default `localhost` (for development), but when deploying you would use your own domain, for example:

```bash
export DOMAIN=fastapi-project.example.com
```

You can set several variables, like:

* `PROJECT_NAME`: The name of the project, used in the API for the docs and emails.
* `STACK_NAME`: The name of the stack used for Docker Compose labels and project name, this should be different for `staging`, `production`, etc. You could use the same domain replacing dots with dashes, e.g. `fastapi-project-example-com` and `staging-fastapi-project-example-com`.
* `BACKEND_CORS_ORIGINS`: A list of allowed CORS origins separated by commas.
* `SECRET_KEY`: The secret key for the FastAPI project, used to sign tokens.
* `FIRST_SUPERUSER`: The email of the first superuser, this superuser will be the one that can create new users.
* `FIRST_SUPERUSER_PASSWORD`: The password of the first superuser.
* `SMTP_HOST`: The SMTP server host to send emails, this would come from your email provider (E.g. Mailgun, Sparkpost, Sendgrid, etc).
* `SMTP_USER`: The SMTP server user to send emails.
* `SMTP_PASSWORD`: The SMTP server password to send emails.
* `EMAILS_FROM_EMAIL`: The email account to send emails from.
* `POSTGRES_SERVER`: The hostname of the PostgreSQL server. You can leave the default of `db`, provided by the same Docker Compose. You normally wouldn't need to change this unless you are using a third-party provider.
* `POSTGRES_PORT`: The port of the PostgreSQL server. You can leave the default. You normally wouldn't need to change this unless you are using a third-party provider.
* `POSTGRES_PASSWORD`: The Postgres password.
* `POSTGRES_USER`: The Postgres user, you can leave the default.
* `POSTGRES_DB`: The database name to use for this application. You can leave the default of `app`.
* `SENTRY_DSN`: The DSN for Sentry, if you are using it.

## GitHub Actions Environment Variables

There are some environment variables only used by GitHub Actions that you can configure:

* `LATEST_CHANGES`: Used by the GitHub Action [latest-changes](https://github.com/tiangolo/latest-changes) to automatically add release notes based on the PRs merged. It's a personal access token, read the docs for details.
* `SMOKESHOW_AUTH_KEY`: Used to handle and publish the code coverage using [Smokeshow](https://github.com/samuelcolvin/smokeshow), follow their instructions to create a (free) Smokeshow key.

### Generate secret keys

Some environment variables in the `.env` file have a default value of `changethis`.

You have to change them with a secret key, to generate secret keys you can run the following command:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Copy the content and use that as password / secret key. And run that again to generate another secure key.

### Deploy with Docker Compose

With the environment variables in place, you can deploy with Docker Compose:

```bash
docker compose -f docker-compose.yml up -d
```

For production you wouldn't want to have the overrides in `docker-compose.override.yml`, that's why we explicitly specify `docker-compose.yml` as the file to use.

## Continuous Deployment (CD)

You can use GitHub Actions to deploy your project automatically. 😎

You can have multiple environment deployments.

There are already two environments configured, `staging` and `production`. 🚀

### Install GitHub Actions Runner

* On your remote server, create a user for your GitHub Actions:

```bash
sudo adduser github
```

* Add Docker permissions to the `github` user:

```bash
sudo usermod -aG docker github
```

* Temporarily switch to the `github` user:

```bash
sudo su - github
```

* Go to the `github` user's home directory:

```bash
cd
```

* [Install a GitHub Action self-hosted runner following the official guide](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/adding-self-hosted-runners#adding-a-self-hosted-runner-to-a-repository).

* When asked about labels, add a label for the environment, e.g. `production`. You can also add labels later.

After installing, the guide would tell you to run a command to start the runner. Nevertheless, it would stop once you terminate that process or if your local connection to your server is lost.

To make sure it runs on startup and continues running, you can install it as a service. To do that, exit the `github` user and go back to the `root` user:

```bash
exit
```

After you do it, you will be on the previous user again. And you will be on the previous directory, belonging to that user.

Before being able to go the `github` user directory, you need to become the `root` user (you might already be):

```bash
sudo su
```

* As the `root` user, go to the `actions-runner` directory inside of the `github` user's home directory:

```bash
cd /home/github/actions-runner
```

* Install the self-hosted runner as a service with the user `github`:

```bash
./svc.sh install github
```

* Start the service:

```bash
./svc.sh start
```

* Check the status of the service:

```bash
./svc.sh status
```

You can read more about it in the official guide: [Configuring the self-hosted runner application as a service](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/configuring-the-self-hosted-runner-application-as-a-service).

### Set Secrets

On your repository, configure secrets for the environment variables you need, the same ones described above, including `SECRET_KEY`, etc. Follow the [official GitHub guide for setting repository secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository).

The current Github Actions workflows expect these secrets:

* `DOMAIN_PRODUCTION`
* `DOMAIN_STAGING`
* `STACK_NAME_PRODUCTION`
* `STACK_NAME_STAGING`
* `EMAILS_FROM_EMAIL`
* `FIRST_SUPERUSER`
* `FIRST_SUPERUSER_PASSWORD`
* `POSTGRES_PASSWORD`
* `SECRET_KEY`
* `LATEST_CHANGES`
* `SMOKESHOW_AUTH_KEY`

## GitHub Action Deployment Workflows

There are GitHub Action workflows in the `.github/workflows` directory already configured for deploying to the environments (GitHub Actions runners with the labels):

* `staging`: after pushing (or merging) to the branch `master`.
* `production`: after publishing a release.

If you need to add extra environments you could use those as a starting point.

## URLs

Replace `fastapi-project.example.com` with your domain.

### Main Traefik Dashboard

Traefik UI: `https://traefik.fastapi-project.example.com`

### Production

Frontend: `https://dashboard.fastapi-project.example.com`

Backend API docs: `https://api.fastapi-project.example.com/docs`

Backend API base URL: `https://api.fastapi-project.example.com`

Adminer: `https://adminer.fastapi-project.example.com`

### Staging

Frontend: `https://dashboard.staging.fastapi-project.example.com`

Backend API docs: `https://api.staging.fastapi-project.example.com/docs`

Backend API base URL: `https://api.staging.fastapi-project.example.com`

Adminer: `https://adminer.staging.fastapi-project.example.com`
````

## File: development.md
````markdown
# FastAPI Project - Development

## Docker Compose

* Start the local stack with Docker Compose:

```bash
docker compose watch
```

* Now you can open your browser and interact with these URLs:

Frontend, built with Docker, with routes handled based on the path: <http://localhost:5173>

Backend, JSON based web API based on OpenAPI: <http://localhost:8000>

Automatic interactive documentation with Swagger UI (from the OpenAPI backend): <http://localhost:8000/docs>

Adminer, database web administration: <http://localhost:8080>

Traefik UI, to see how the routes are being handled by the proxy: <http://localhost:8090>

**Note**: The first time you start your stack, it might take a minute for it to be ready. While the backend waits for the database to be ready and configures everything. You can check the logs to monitor it.

To check the logs, run (in another terminal):

```bash
docker compose logs
```

To check the logs of a specific service, add the name of the service, e.g.:

```bash
docker compose logs backend
```

## Mailcatcher

Mailcatcher is a simple SMTP server that catches all emails sent by the backend during local development. Instead of sending real emails, they are captured and displayed in a web interface.

This is useful for:

* Testing email functionality during development
* Verifying email content and formatting
* Debugging email-related functionality without sending real emails

The backend is automatically configured to use Mailcatcher when running with Docker Compose locally (SMTP on port 1025). All captured emails can be viewed at <http://localhost:1080>.

## Local Development

The Docker Compose files are configured so that each of the services is available in a different port in `localhost`.

For the backend and frontend, they use the same port that would be used by their local development server, so, the backend is at `http://localhost:8000` and the frontend at `http://localhost:5173`.

This way, you could turn off a Docker Compose service and start its local development service, and everything would keep working, because it all uses the same ports.

For example, you can stop that `frontend` service in the Docker Compose, in another terminal, run:

```bash
docker compose stop frontend
```

And then start the local frontend development server:

```bash
cd frontend
npm run dev
```

Or you could stop the `backend` Docker Compose service:

```bash
docker compose stop backend
```

And then you can run the local development server for the backend:

```bash
cd backend
fastapi dev app/main.py
```

## Docker Compose in `localhost.tiangolo.com`

When you start the Docker Compose stack, it uses `localhost` by default, with different ports for each service (backend, frontend, adminer, etc).

When you deploy it to production (or staging), it will deploy each service in a different subdomain, like `api.example.com` for the backend and `dashboard.example.com` for the frontend.

In the guide about [deployment](deployment.md) you can read about Traefik, the configured proxy. That's the component in charge of transmitting traffic to each service based on the subdomain.

If you want to test that it's all working locally, you can edit the local `.env` file, and change:

```dotenv
DOMAIN=localhost.tiangolo.com
```

That will be used by the Docker Compose files to configure the base domain for the services.

Traefik will use this to transmit traffic at `api.localhost.tiangolo.com` to the backend, and traffic at `dashboard.localhost.tiangolo.com` to the frontend.

The domain `localhost.tiangolo.com` is a special domain that is configured (with all its subdomains) to point to `127.0.0.1`. This way you can use that for your local development.

After you update it, run again:

```bash
docker compose watch
```

When deploying, for example in production, the main Traefik is configured outside of the Docker Compose files. For local development, there's an included Traefik in `docker-compose.override.yml`, just to let you test that the domains work as expected, for example with `api.localhost.tiangolo.com` and `dashboard.localhost.tiangolo.com`.

## Docker Compose files and env vars

There is a main `docker-compose.yml` file with all the configurations that apply to the whole stack, it is used automatically by `docker compose`.

And there's also a `docker-compose.override.yml` with overrides for development, for example to mount the source code as a volume. It is used automatically by `docker compose` to apply overrides on top of `docker-compose.yml`.

These Docker Compose files use the `.env` file containing configurations to be injected as environment variables in the containers.

They also use some additional configurations taken from environment variables set in the scripts before calling the `docker compose` command.

After changing variables, make sure you restart the stack:

```bash
docker compose watch
```

## The .env file

The `.env` file is the one that contains all your configurations, generated keys and passwords, etc.

Depending on your workflow, you could want to exclude it from Git, for example if your project is public. In that case, you would have to make sure to set up a way for your CI tools to obtain it while building or deploying your project.

One way to do it could be to add each environment variable to your CI/CD system, and updating the `docker-compose.yml` file to read that specific env var instead of reading the `.env` file.

## Pre-commits and code linting

we are using a tool called [prek](https://prek.j178.dev/) (modern alternative to [Pre-commit](https://pre-commit.com/)) for code linting and formatting.

When you install it, it runs right before making a commit in git. This way it ensures that the code is consistent and formatted even before it is committed.

You can find a file `.pre-commit-config.yaml` with configurations at the root of the project.

#### Install prek to run automatically

`prek` is already part of the dependencies of the project.

After having the `prek` tool installed and available, you need to "install" it in the local repository, so that it runs automatically before each commit.

Using `uv`, you could do it with (make sure you are inside `backend` folder):

```bash
❯ uv run prek install -f
prek installed at `../.git/hooks/pre-commit`
```

The `-f` flag forces the installation, in case there was already a `pre-commit` hook previously installed.

Now whenever you try to commit, e.g. with:

```bash
git commit
```

...prek will run and check and format the code you are about to commit, and will ask you to add that code (stage it) with git again before committing.

Then you can `git add` the modified/fixed files again and now you can commit.

#### Running prek hooks manually

you can also run `prek` manually on all the files, you can do it using `uv` with:

```bash
❯ uv run prek run --all-files
check for added large files..............................................Passed
check toml...............................................................Passed
check yaml...............................................................Passed
fix end of files.........................................................Passed
trim trailing whitespace.................................................Passed
ruff.....................................................................Passed
ruff-format..............................................................Passed
biome check..............................................................Passed
```

## URLs

The production or staging URLs would use these same paths, but with your own domain.

### Development URLs

Development URLs, for local development.

Frontend: <http://localhost:5173>

Backend: <http://localhost:8000>

Automatic Interactive Docs (Swagger UI): <http://localhost:8000/docs>

Automatic Alternative Docs (ReDoc): <http://localhost:8000/redoc>

Adminer: <http://localhost:8080>

Traefik UI: <http://localhost:8090>

MailCatcher: <http://localhost:1080>

### Development URLs with `localhost.tiangolo.com` Configured

Development URLs, for local development.

Frontend: <http://dashboard.localhost.tiangolo.com>

Backend: <http://api.localhost.tiangolo.com>

Automatic Interactive Docs (Swagger UI): <http://api.localhost.tiangolo.com/docs>

Automatic Alternative Docs (ReDoc): <http://api.localhost.tiangolo.com/redoc>

Adminer: <http://localhost.tiangolo.com:8080>

Traefik UI: <http://localhost.tiangolo.com:8090>

MailCatcher: <http://localhost.tiangolo.com:1080>
````

## File: docker-compose.override.yml
````yaml
services:

  # Local services are available on their ports, but also available on:
  # http://api.localhost.tiangolo.com: backend
  # http://dashboard.localhost.tiangolo.com: frontend
  # etc. To enable it, update .env, set:
  # DOMAIN=localhost.tiangolo.com
  proxy:
    image: traefik:3.0
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    ports:
      - "80:80"
      - "8090:8080"
    # Duplicate the command from docker-compose.yml to add --api.insecure=true
    command:
      # Enable Docker in Traefik, so that it reads labels from Docker services
      - --providers.docker
      # Add a constraint to only use services with the label for this stack
      - --providers.docker.constraints=Label(`traefik.constraint-label`, `traefik-public`)
      # Do not expose all Docker services, only the ones explicitly exposed
      - --providers.docker.exposedbydefault=false
      # Create an entrypoint "http" listening on port 80
      - --entrypoints.http.address=:80
      # Create an entrypoint "https" listening on port 443
      - --entrypoints.https.address=:443
      # Enable the access log, with HTTP requests
      - --accesslog
      # Enable the Traefik log, for configurations and errors
      - --log
      # Enable debug logging for local development
      - --log.level=DEBUG
      # Enable the Dashboard and API
      - --api
      # Enable the Dashboard and API in insecure mode for local development
      - --api.insecure=true
    labels:
      # Enable Traefik for this service, to make it available in the public network
      - traefik.enable=true
      - traefik.constraint-label=traefik-public
      # Dummy https-redirect middleware that doesn't really redirect, only to
      # allow running it locally
      - traefik.http.middlewares.https-redirect.contenttype.autodetect=false
    networks:
      - traefik-public
      - default

  db:
    restart: "no"
    ports:
      - "5432:5432"

  adminer:
    restart: "no"
    ports:
      - "8080:8080"

  backend:
    restart: "no"
    ports:
      - "8000:8000"
    build:
      context: ./backend
    # command: sleep infinity  # Infinite loop to keep container alive doing nothing
    command:
      - fastapi
      - run
      - --reload
      - "app/main.py"
    develop:
      watch:
        - path: ./backend
          action: sync
          target: /app
          ignore:
            - ./backend/.venv
            - .venv
        - path: ./backend/pyproject.toml
          action: rebuild
    # TODO: remove once coverage is done locally
    volumes:
      - ./backend/htmlcov:/app/htmlcov
    environment:
      SMTP_HOST: "mailcatcher"
      SMTP_PORT: "1025"
      SMTP_TLS: "false"
      EMAILS_FROM_EMAIL: "noreply@example.com"

  mailcatcher:
    image: schickling/mailcatcher
    ports:
      - "1080:1080"
      - "1025:1025"

  frontend:
    restart: "no"
    ports:
      - "5173:80"
    build:
      context: ./frontend
      args:
        - VITE_API_URL=http://localhost:8000
        - NODE_ENV=development

  playwright:
    build:
      context: ./frontend
      dockerfile: Dockerfile.playwright
      args:
        - VITE_API_URL=http://backend:8000
        - NODE_ENV=production
    ipc: host
    depends_on:
      - backend
      - mailcatcher
    env_file:
      - .env
    environment:
      - VITE_API_URL=http://backend:8000
      - MAILCATCHER_HOST=http://mailcatcher:1080
      # For the reports when run locally
      - PLAYWRIGHT_HTML_HOST=0.0.0.0
      - CI=${CI}
    volumes:
      - ./frontend/blob-report:/app/blob-report
      - ./frontend/test-results:/app/test-results
    ports:
      - 9323:9323

networks:
  traefik-public:
    # For local dev, don't expect an external Traefik network
    external: false
````

## File: docker-compose.traefik.yml
````yaml
services:
  traefik:
    image: traefik:3.0
    ports:
      # Listen on port 80, default for HTTP, necessary to redirect to HTTPS
      - 80:80
      # Listen on port 443, default for HTTPS
      - 443:443
    restart: always
    labels:
      # Enable Traefik for this service, to make it available in the public network
      - traefik.enable=true
      # Use the traefik-public network (declared below)
      - traefik.docker.network=traefik-public
      # Define the port inside of the Docker service to use
      - traefik.http.services.traefik-dashboard.loadbalancer.server.port=8080
      # Make Traefik use this domain (from an environment variable) in HTTP
      - traefik.http.routers.traefik-dashboard-http.entrypoints=http
      - traefik.http.routers.traefik-dashboard-http.rule=Host(`traefik.${DOMAIN?Variable not set}`)
      # traefik-https the actual router using HTTPS
      - traefik.http.routers.traefik-dashboard-https.entrypoints=https
      - traefik.http.routers.traefik-dashboard-https.rule=Host(`traefik.${DOMAIN?Variable not set}`)
      - traefik.http.routers.traefik-dashboard-https.tls=true
      # Use the "le" (Let's Encrypt) resolver created below
      - traefik.http.routers.traefik-dashboard-https.tls.certresolver=le
      # Use the special Traefik service api@internal with the web UI/Dashboard
      - traefik.http.routers.traefik-dashboard-https.service=api@internal
      # https-redirect middleware to redirect HTTP to HTTPS
      - traefik.http.middlewares.https-redirect.redirectscheme.scheme=https
      - traefik.http.middlewares.https-redirect.redirectscheme.permanent=true
      # traefik-http set up only to use the middleware to redirect to https
      - traefik.http.routers.traefik-dashboard-http.middlewares=https-redirect
      # admin-auth middleware with HTTP Basic auth
      # Using the environment variables USERNAME and HASHED_PASSWORD
      - traefik.http.middlewares.admin-auth.basicauth.users=${USERNAME?Variable not set}:${HASHED_PASSWORD?Variable not set}
      # Enable HTTP Basic auth, using the middleware created above
      - traefik.http.routers.traefik-dashboard-https.middlewares=admin-auth
    volumes:
      # Add Docker as a mounted volume, so that Traefik can read the labels of other services
      - /var/run/docker.sock:/var/run/docker.sock:ro
      # Mount the volume to store the certificates
      - traefik-public-certificates:/certificates
    command:
      # Enable Docker in Traefik, so that it reads labels from Docker services
      - --providers.docker
      # Do not expose all Docker services, only the ones explicitly exposed
      - --providers.docker.exposedbydefault=false
      # Create an entrypoint "http" listening on port 80
      - --entrypoints.http.address=:80
      # Create an entrypoint "https" listening on port 443
      - --entrypoints.https.address=:443
      # Create the certificate resolver "le" for Let's Encrypt, uses the environment variable EMAIL
      - --certificatesresolvers.le.acme.email=${EMAIL?Variable not set}
      # Store the Let's Encrypt certificates in the mounted volume
      - --certificatesresolvers.le.acme.storage=/certificates/acme.json
      # Use the TLS Challenge for Let's Encrypt
      - --certificatesresolvers.le.acme.tlschallenge=true
      # Enable the access log, with HTTP requests
      - --accesslog
      # Enable the Traefik log, for configurations and errors
      - --log
      # Enable the Dashboard and API
      - --api
    networks:
      # Use the public network created to be shared between Traefik and
      # any other service that needs to be publicly available with HTTPS
      - traefik-public

volumes:
  # Create a volume to store the certificates, even if the container is recreated
  traefik-public-certificates:

networks:
  # Use the previously created public network "traefik-public", shared with other
  # services that need to be publicly available via this Traefik
  traefik-public:
    external: true
````

## File: docker-compose.yml
````yaml
services:

  db:
    image: postgres:17
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      retries: 5
      start_period: 30s
      timeout: 10s
    volumes:
      - app-db-data:/var/lib/postgresql/data/pgdata
    env_file:
      - .env
    environment:
      - PGDATA=/var/lib/postgresql/data/pgdata
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD?Variable not set}
      - POSTGRES_USER=${POSTGRES_USER?Variable not set}
      - POSTGRES_DB=${POSTGRES_DB?Variable not set}

  adminer:
    image: adminer
    restart: always
    networks:
      - traefik-public
      - default
    depends_on:
      - db
    environment:
      - ADMINER_DESIGN=pepa-linha-dark
    labels:
      - traefik.enable=true
      - traefik.docker.network=traefik-public
      - traefik.constraint-label=traefik-public
      - traefik.http.routers.${STACK_NAME?Variable not set}-adminer-http.rule=Host(`adminer.${DOMAIN?Variable not set}`)
      - traefik.http.routers.${STACK_NAME?Variable not set}-adminer-http.entrypoints=http
      - traefik.http.routers.${STACK_NAME?Variable not set}-adminer-http.middlewares=https-redirect
      - traefik.http.routers.${STACK_NAME?Variable not set}-adminer-https.rule=Host(`adminer.${DOMAIN?Variable not set}`)
      - traefik.http.routers.${STACK_NAME?Variable not set}-adminer-https.entrypoints=https
      - traefik.http.routers.${STACK_NAME?Variable not set}-adminer-https.tls=true
      - traefik.http.routers.${STACK_NAME?Variable not set}-adminer-https.tls.certresolver=le
      - traefik.http.services.${STACK_NAME?Variable not set}-adminer.loadbalancer.server.port=8080

  prestart:
    image: '${DOCKER_IMAGE_BACKEND?Variable not set}:${TAG-latest}'
    build:
      context: ./backend
    networks:
      - traefik-public
      - default
    depends_on:
      db:
        condition: service_healthy
        restart: true
    command: bash scripts/prestart.sh
    env_file:
      - .env
    environment:
      - DOMAIN=${DOMAIN}
      - FRONTEND_HOST=${FRONTEND_HOST?Variable not set}
      - ENVIRONMENT=${ENVIRONMENT}
      - BACKEND_CORS_ORIGINS=${BACKEND_CORS_ORIGINS}
      - SECRET_KEY=${SECRET_KEY?Variable not set}
      - FIRST_SUPERUSER=${FIRST_SUPERUSER?Variable not set}
      - FIRST_SUPERUSER_PASSWORD=${FIRST_SUPERUSER_PASSWORD?Variable not set}
      - SMTP_HOST=${SMTP_HOST}
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASSWORD=${SMTP_PASSWORD}
      - EMAILS_FROM_EMAIL=${EMAILS_FROM_EMAIL}
      - POSTGRES_SERVER=db
      - POSTGRES_PORT=${POSTGRES_PORT}
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER?Variable not set}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD?Variable not set}
      - SENTRY_DSN=${SENTRY_DSN}

  backend:
    image: '${DOCKER_IMAGE_BACKEND?Variable not set}:${TAG-latest}'
    restart: always
    networks:
      - traefik-public
      - default
    depends_on:
      db:
        condition: service_healthy
        restart: true
      prestart:
        condition: service_completed_successfully
    env_file:
      - .env
    environment:
      - DOMAIN=${DOMAIN}
      - FRONTEND_HOST=${FRONTEND_HOST?Variable not set}
      - ENVIRONMENT=${ENVIRONMENT}
      - BACKEND_CORS_ORIGINS=${BACKEND_CORS_ORIGINS}
      - SECRET_KEY=${SECRET_KEY?Variable not set}
      - FIRST_SUPERUSER=${FIRST_SUPERUSER?Variable not set}
      - FIRST_SUPERUSER_PASSWORD=${FIRST_SUPERUSER_PASSWORD?Variable not set}
      - SMTP_HOST=${SMTP_HOST}
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASSWORD=${SMTP_PASSWORD}
      - EMAILS_FROM_EMAIL=${EMAILS_FROM_EMAIL}
      - POSTGRES_SERVER=db
      - POSTGRES_PORT=${POSTGRES_PORT}
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER?Variable not set}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD?Variable not set}
      - SENTRY_DSN=${SENTRY_DSN}

    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/api/v1/utils/health-check/"]
      interval: 10s
      timeout: 5s
      retries: 5

    build:
      context: ./backend
    labels:
      - traefik.enable=true
      - traefik.docker.network=traefik-public
      - traefik.constraint-label=traefik-public

      - traefik.http.services.${STACK_NAME?Variable not set}-backend.loadbalancer.server.port=8000

      - traefik.http.routers.${STACK_NAME?Variable not set}-backend-http.rule=Host(`api.${DOMAIN?Variable not set}`)
      - traefik.http.routers.${STACK_NAME?Variable not set}-backend-http.entrypoints=http

      - traefik.http.routers.${STACK_NAME?Variable not set}-backend-https.rule=Host(`api.${DOMAIN?Variable not set}`)
      - traefik.http.routers.${STACK_NAME?Variable not set}-backend-https.entrypoints=https
      - traefik.http.routers.${STACK_NAME?Variable not set}-backend-https.tls=true
      - traefik.http.routers.${STACK_NAME?Variable not set}-backend-https.tls.certresolver=le

      # Enable redirection for HTTP and HTTPS
      - traefik.http.routers.${STACK_NAME?Variable not set}-backend-http.middlewares=https-redirect

  frontend:
    image: '${DOCKER_IMAGE_FRONTEND?Variable not set}:${TAG-latest}'
    restart: always
    networks:
      - traefik-public
      - default
    build:
      context: ./frontend
      args:
        - VITE_API_URL=https://api.${DOMAIN?Variable not set}
        - NODE_ENV=production
    labels:
      - traefik.enable=true
      - traefik.docker.network=traefik-public
      - traefik.constraint-label=traefik-public

      - traefik.http.services.${STACK_NAME?Variable not set}-frontend.loadbalancer.server.port=80

      - traefik.http.routers.${STACK_NAME?Variable not set}-frontend-http.rule=Host(`dashboard.${DOMAIN?Variable not set}`)
      - traefik.http.routers.${STACK_NAME?Variable not set}-frontend-http.entrypoints=http

      - traefik.http.routers.${STACK_NAME?Variable not set}-frontend-https.rule=Host(`dashboard.${DOMAIN?Variable not set}`)
      - traefik.http.routers.${STACK_NAME?Variable not set}-frontend-https.entrypoints=https
      - traefik.http.routers.${STACK_NAME?Variable not set}-frontend-https.tls=true
      - traefik.http.routers.${STACK_NAME?Variable not set}-frontend-https.tls.certresolver=le

      # Enable redirection for HTTP and HTTPS
      - traefik.http.routers.${STACK_NAME?Variable not set}-frontend-http.middlewares=https-redirect
volumes:
  app-db-data:

networks:
  traefik-public:
    # Allow setting it to false for testing
    external: true
````

## File: LICENSE
````
MIT License

Copyright (c) 2019 Sebastián Ramírez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
````

## File: README.md
````markdown
# Full Stack FastAPI Template

<a href="https://github.com/fastapi/full-stack-fastapi-template/actions?query=workflow%3A%22Test+Docker+Compose%22" target="_blank"><img src="https://github.com/fastapi/full-stack-fastapi-template/workflows/Test%20Docker%20Compose/badge.svg" alt="Test Docker Compose"></a>
<a href="https://github.com/fastapi/full-stack-fastapi-template/actions?query=workflow%3A%22Test+Backend%22" target="_blank"><img src="https://github.com/fastapi/full-stack-fastapi-template/workflows/Test%20Backend/badge.svg" alt="Test Backend"></a>
<a href="https://coverage-badge.samuelcolvin.workers.dev/redirect/fastapi/full-stack-fastapi-template" target="_blank"><img src="https://coverage-badge.samuelcolvin.workers.dev/fastapi/full-stack-fastapi-template.svg" alt="Coverage"></a>

## Technology Stack and Features

- ⚡ [**FastAPI**](https://fastapi.tiangolo.com) for the Python backend API.
  - 🧰 [SQLModel](https://sqlmodel.tiangolo.com) for the Python SQL database interactions (ORM).
  - 🔍 [Pydantic](https://docs.pydantic.dev), used by FastAPI, for the data validation and settings management.
  - 💾 [PostgreSQL](https://www.postgresql.org) as the SQL database.
- 🚀 [React](https://react.dev) for the frontend.
  - 💃 Using TypeScript, hooks, [Vite](https://vitejs.dev), and other parts of a modern frontend stack.
  - 🎨 [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com) for the frontend components.
  - 🤖 An automatically generated frontend client.
  - 🧪 [Playwright](https://playwright.dev) for End-to-End testing.
  - 🦇 Dark mode support.
- 🐋 [Docker Compose](https://www.docker.com) for development and production.
- 🔒 Secure password hashing by default.
- 🔑 JWT (JSON Web Token) authentication.
- 📫 Email based password recovery.
- 📬 [Mailcatcher](https://mailcatcher.me) for local email testing during development.
- ✅ Tests with [Pytest](https://pytest.org).
- 📞 [Traefik](https://traefik.io) as a reverse proxy / load balancer.
- 🚢 Deployment instructions using Docker Compose, including how to set up a frontend Traefik proxy to handle automatic HTTPS certificates.
- 🏭 CI (continuous integration) and CD (continuous deployment) based on GitHub Actions.

### Dashboard Login

[![API docs](img/login.png)](https://github.com/fastapi/full-stack-fastapi-template)

### Dashboard - Admin

[![API docs](img/dashboard.png)](https://github.com/fastapi/full-stack-fastapi-template)

### Dashboard - Items

[![API docs](img/dashboard-items.png)](https://github.com/fastapi/full-stack-fastapi-template)

### Dashboard - Dark Mode

[![API docs](img/dashboard-dark.png)](https://github.com/fastapi/full-stack-fastapi-template)

### Interactive API Documentation

[![API docs](img/docs.png)](https://github.com/fastapi/full-stack-fastapi-template)

## How To Use It

You can **just fork or clone** this repository and use it as is.

✨ It just works. ✨

### How to Use a Private Repository

If you want to have a private repository, GitHub won't allow you to simply fork it as it doesn't allow changing the visibility of forks.

But you can do the following:

- Create a new GitHub repo, for example `my-full-stack`.
- Clone this repository manually, set the name with the name of the project you want to use, for example `my-full-stack`:

```bash
git clone git@github.com:fastapi/full-stack-fastapi-template.git my-full-stack
```

- Enter into the new directory:

```bash
cd my-full-stack
```

- Set the new origin to your new repository, copy it from the GitHub interface, for example:

```bash
git remote set-url origin git@github.com:octocat/my-full-stack.git
```

- Add this repo as another "remote" to allow you to get updates later:

```bash
git remote add upstream git@github.com:fastapi/full-stack-fastapi-template.git
```

- Push the code to your new repository:

```bash
git push -u origin master
```

### Update From the Original Template

After cloning the repository, and after doing changes, you might want to get the latest changes from this original template.

- Make sure you added the original repository as a remote, you can check it with:

```bash
git remote -v

origin    git@github.com:octocat/my-full-stack.git (fetch)
origin    git@github.com:octocat/my-full-stack.git (push)
upstream    git@github.com:fastapi/full-stack-fastapi-template.git (fetch)
upstream    git@github.com:fastapi/full-stack-fastapi-template.git (push)
```

- Pull the latest changes without merging:

```bash
git pull --no-commit upstream master
```

This will download the latest changes from this template without committing them, that way you can check everything is right before committing.

- If there are conflicts, solve them in your editor.

- Once you are done, commit the changes:

```bash
git merge --continue
```

### Configure

You can then update configs in the `.env` files to customize your configurations.

Before deploying it, make sure you change at least the values for:

- `SECRET_KEY`
- `FIRST_SUPERUSER_PASSWORD`
- `POSTGRES_PASSWORD`

You can (and should) pass these as environment variables from secrets.

Read the [deployment.md](./deployment.md) docs for more details.

### Generate Secret Keys

Some environment variables in the `.env` file have a default value of `changethis`.

You have to change them with a secret key, to generate secret keys you can run the following command:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Copy the content and use that as password / secret key. And run that again to generate another secure key.

## How To Use It - Alternative With Copier

This repository also supports generating a new project using [Copier](https://copier.readthedocs.io).

It will copy all the files, ask you configuration questions, and update the `.env` files with your answers.

### Install Copier

You can install Copier with:

```bash
pip install copier
```

Or better, if you have [`pipx`](https://pipx.pypa.io/), you can run it with:

```bash
pipx install copier
```

**Note**: If you have `pipx`, installing copier is optional, you could run it directly.

### Generate a Project With Copier

Decide a name for your new project's directory, you will use it below. For example, `my-awesome-project`.

Go to the directory that will be the parent of your project, and run the command with your project's name:

```bash
copier copy https://github.com/fastapi/full-stack-fastapi-template my-awesome-project --trust
```

If you have `pipx` and you didn't install `copier`, you can run it directly:

```bash
pipx run copier copy https://github.com/fastapi/full-stack-fastapi-template my-awesome-project --trust
```

**Note** the `--trust` option is necessary to be able to execute a [post-creation script](https://github.com/fastapi/full-stack-fastapi-template/blob/master/.copier/update_dotenv.py) that updates your `.env` files.

### Input Variables

Copier will ask you for some data, you might want to have at hand before generating the project.

But don't worry, you can just update any of that in the `.env` files afterwards.

The input variables, with their default values (some auto generated) are:

- `project_name`: (default: `"FastAPI Project"`) The name of the project, shown to API users (in .env).
- `stack_name`: (default: `"fastapi-project"`) The name of the stack used for Docker Compose labels and project name (no spaces, no periods) (in .env).
- `secret_key`: (default: `"changethis"`) The secret key for the project, used for security, stored in .env, you can generate one with the method above.
- `first_superuser`: (default: `"admin@example.com"`) The email of the first superuser (in .env).
- `first_superuser_password`: (default: `"changethis"`) The password of the first superuser (in .env).
- `smtp_host`: (default: "") The SMTP server host to send emails, you can set it later in .env.
- `smtp_user`: (default: "") The SMTP server user to send emails, you can set it later in .env.
- `smtp_password`: (default: "") The SMTP server password to send emails, you can set it later in .env.
- `emails_from_email`: (default: `"info@example.com"`) The email account to send emails from, you can set it later in .env.
- `postgres_password`: (default: `"changethis"`) The password for the PostgreSQL database, stored in .env, you can generate one with the method above.
- `sentry_dsn`: (default: "") The DSN for Sentry, if you are using it, you can set it later in .env.

## Backend Development

Backend docs: [backend/README.md](./backend/README.md).

## Frontend Development

Frontend docs: [frontend/README.md](./frontend/README.md).

## Deployment

Deployment docs: [deployment.md](./deployment.md).

## Development

General development docs: [development.md](./development.md).

This includes using Docker Compose, custom local domains, `.env` configurations, etc.

## Release Notes

Check the file [release-notes.md](./release-notes.md).

## License

The Full Stack FastAPI Template is licensed under the terms of the MIT license.
````

## File: release-notes.md
````markdown
# Release Notes

## Latest Changes

### Internal

* 👷 Add pre-commit workflow. PR [#2056](https://github.com/fastapi/full-stack-fastapi-template/pull/2056) by [@YuriiMotov](https://github.com/YuriiMotov).
* ⬆ Bump @tanstack/router-devtools from 1.140.0 to 1.142.8 in /frontend. PR [#2060](https://github.com/fastapi/full-stack-fastapi-template/pull/2060) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-router from 1.141.2 to 1.142.8 in /frontend. PR [#2062](https://github.com/fastapi/full-stack-fastapi-template/pull/2062) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @biomejs/biome from 2.3.8 to 2.3.10 in /frontend. PR [#2061](https://github.com/fastapi/full-stack-fastapi-template/pull/2061) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-router-devtools from 1.139.12 to 1.142.8 in /frontend. PR [#2063](https://github.com/fastapi/full-stack-fastapi-template/pull/2063) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump zod from 4.1.13 to 4.2.1 in /frontend. PR [#2064](https://github.com/fastapi/full-stack-fastapi-template/pull/2064) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 👷 Configure coverage, error on main tests, don't wait for Smokeshow. PR [#2054](https://github.com/fastapi/full-stack-fastapi-template/pull/2054) by [@YuriiMotov](https://github.com/YuriiMotov).
* 👷 Run Smokeshow always, even on test failures. PR [#2053](https://github.com/fastapi/full-stack-fastapi-template/pull/2053) by [@YuriiMotov](https://github.com/YuriiMotov).
* ⬆ Bump @tanstack/react-router from 1.140.0 to 1.141.2 in /frontend. PR [#2045](https://github.com/fastapi/full-stack-fastapi-template/pull/2045) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump actions/download-artifact from 6 to 7. PR [#2051](https://github.com/fastapi/full-stack-fastapi-template/pull/2051) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump actions/upload-artifact from 5 to 6. PR [#2050](https://github.com/fastapi/full-stack-fastapi-template/pull/2050) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @types/node from 24.10.1 to 25.0.2 in /frontend. PR [#2048](https://github.com/fastapi/full-stack-fastapi-template/pull/2048) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tailwindcss/vite from 4.1.17 to 4.1.18 in /frontend. PR [#2049](https://github.com/fastapi/full-stack-fastapi-template/pull/2049) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump vite from 7.2.7 to 7.3.0 in /frontend. PR [#2047](https://github.com/fastapi/full-stack-fastapi-template/pull/2047) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump react-dom from 19.2.1 to 19.2.3 in /frontend. PR [#2046](https://github.com/fastapi/full-stack-fastapi-template/pull/2046) by [@dependabot[bot]](https://github.com/apps/dependabot).

## 0.9.0

### Features

* ✨ Add meta title support to all pages. PR [#2039](https://github.com/fastapi/full-stack-fastapi-template/pull/2039) by [@alejsdev](https://github.com/alejsdev).
* 🛂 Migrate frontend to Shadcn. PR [#2010](https://github.com/fastapi/full-stack-fastapi-template/pull/2010) by [@alejsdev](https://github.com/alejsdev).

### Fixes

* 🐛 Fix `EMAILS_FROM_NAME` type to be `str` instead of `EmailStr`. PR [#1940](https://github.com/fastapi/full-stack-fastapi-template/pull/1940) by [@martin0258](https://github.com/martin0258).
* 🐛 Fix `parse_cors` function to be consistent for both empty string and empty list. PR [#1672](https://github.com/fastapi/full-stack-fastapi-template/pull/1672) by [@rolkotaki](https://github.com/rolkotaki).
* 🐛 Close sidebar drawer on user selection. PR [#1515](https://github.com/fastapi/full-stack-fastapi-template/pull/1515) by [@dtellz](https://github.com/dtellz).
* 🐛 Fix required password validation when editing user fields. PR [#1508](https://github.com/fastapi/full-stack-fastapi-template/pull/1508) by [@jpizquierdo](https://github.com/jpizquierdo).

### Refactors

* ♻️ Update password max length. PR [#1447](https://github.com/fastapi/full-stack-fastapi-template/pull/1447) by [@michaelAlvarino](https://github.com/michaelAlvarino).
* 🚚 Move backend tests outside the `app` directory. PR [#1862](https://github.com/fastapi/full-stack-fastapi-template/pull/1862) by [@YuriiMotov](https://github.com/YuriiMotov).
* ✨ Add ImportMetaEnv and ImportMeta interfaces for Vite environment variables. PR [#1860](https://github.com/fastapi/full-stack-fastapi-template/pull/1860) by [@alejsdev](https://github.com/alejsdev).
* 🔧 Update `tsconfig.json` and fix errors. PR [#1859](https://github.com/fastapi/full-stack-fastapi-template/pull/1859) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Remove disabled attribute from Save button in ChangePassword component. PR [#1844](https://github.com/fastapi/full-stack-fastapi-template/pull/1844) by [@alejsdev](https://github.com/alejsdev).
* 👷🏻‍♀️  Update CI for client generation. PR [#1573](https://github.com/fastapi/full-stack-fastapi-template/pull/1573) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Remove redundant field in inherited class. PR [#1520](https://github.com/fastapi/full-stack-fastapi-template/pull/1520) by [@tzway](https://github.com/tzway).
* 🎨 Add minor UI tweaks in Skeletons and other components. PR [#1507](https://github.com/fastapi/full-stack-fastapi-template/pull/1507) by [@alejsdev](https://github.com/alejsdev).
* 🎨 Add minor UI tweaks. PR [#1506](https://github.com/fastapi/full-stack-fastapi-template/pull/1506) by [@alejsdev](https://github.com/alejsdev).

### Upgrades

* ⬆ Bump @types/react from 19.1.12 to 19.1.13 in /frontend. PR [#1888](https://github.com/fastapi/full-stack-fastapi-template/pull/1888) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/router-plugin from 1.131.41 to 1.131.43 in /frontend. PR [#1887](https://github.com/fastapi/full-stack-fastapi-template/pull/1887) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump pydantic from 2.11.7 to 2.11.9 in /backend. PR [#1891](https://github.com/fastapi/full-stack-fastapi-template/pull/1891) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @chakra-ui/react from 3.26.0 to 3.27.0 in /frontend. PR [#1890](https://github.com/fastapi/full-stack-fastapi-template/pull/1890) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump axios from 1.12.0 to 1.12.2 in /frontend. PR [#1889](https://github.com/fastapi/full-stack-fastapi-template/pull/1889) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @types/node from 24.3.1 to 24.4.0 in /frontend. PR [#1886](https://github.com/fastapi/full-stack-fastapi-template/pull/1886) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/router-devtools from 1.131.41 to 1.131.42 in /frontend. PR [#1881](https://github.com/fastapi/full-stack-fastapi-template/pull/1881) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/router-plugin from 1.131.39 to 1.131.41 in /frontend. PR [#1879](https://github.com/fastapi/full-stack-fastapi-template/pull/1879) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-query-devtools from 5.87.3 to 5.87.4 in /frontend. PR [#1876](https://github.com/fastapi/full-stack-fastapi-template/pull/1876) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump axios from 1.11.0 to 1.12.0 in /frontend. PR [#1878](https://github.com/fastapi/full-stack-fastapi-template/pull/1878) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/router-devtools from 1.131.40 to 1.131.41 in /frontend. PR [#1877](https://github.com/fastapi/full-stack-fastapi-template/pull/1877) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-router from 1.131.40 to 1.131.41 in /frontend. PR [#1875](https://github.com/fastapi/full-stack-fastapi-template/pull/1875) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/router-devtools from 1.131.36 to 1.131.37 in /frontend. PR [#1871](https://github.com/fastapi/full-stack-fastapi-template/pull/1871) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/router-plugin from 1.131.36 to 1.131.37 in /frontend. PR [#1870](https://github.com/fastapi/full-stack-fastapi-template/pull/1870) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-query from 5.87.1 to 5.87.4 in /frontend. PR [#1868](https://github.com/fastapi/full-stack-fastapi-template/pull/1868) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @biomejs/biome from 2.2.3 to 2.2.4 in /frontend. PR [#1869](https://github.com/fastapi/full-stack-fastapi-template/pull/1869) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-router from 1.131.36 to 1.131.37 in /frontend. PR [#1872](https://github.com/fastapi/full-stack-fastapi-template/pull/1872) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆️ Upgrade Biome to the latest version. PR [#1861](https://github.com/fastapi/full-stack-fastapi-template/pull/1861) by [@alejsdev](https://github.com/alejsdev).
* ⬆️ Update TansTack Router dependencies. PR [#1853](https://github.com/fastapi/full-stack-fastapi-template/pull/1853) by [@alejsdev](https://github.com/alejsdev).
* ⬆️ Bump @tanstack/react-query from 5.28.14 to 5.87.1. PR [#1852](https://github.com/fastapi/full-stack-fastapi-template/pull/1852) by [@alejsdev](https://github.com/alejsdev).
* ⬆ Bump @chakra-ui/react from 3.8.0 to 3.26.0 in /frontend. PR [#1796](https://github.com/fastapi/full-stack-fastapi-template/pull/1796) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆️ Update @hey-api/openapi-ts dependency version and update dependabot config. PR [#1845](https://github.com/fastapi/full-stack-fastapi-template/pull/1845) by [@alejsdev](https://github.com/alejsdev).
* ⬆️ Update Playwright. PR [#1793](https://github.com/fastapi/full-stack-fastapi-template/pull/1793) by [@alejsdev](https://github.com/alejsdev).
* ⬆️ Upgrade React and related dependencies. PR [#1843](https://github.com/fastapi/full-stack-fastapi-template/pull/1843) by [@alejsdev](https://github.com/alejsdev).

### Docs

* 📝 Add Mailcatcher setup instructions for local email testing. PR [#2038](https://github.com/fastapi/full-stack-fastapi-template/pull/2038) by [@alejsdev](https://github.com/alejsdev).
* 📝 Update `README` to include link for Vite. PR [#2037](https://github.com/fastapi/full-stack-fastapi-template/pull/2037) by [@alejsdev](https://github.com/alejsdev).
* 📝 Fix outdated workflow badge. PR [#2028](https://github.com/fastapi/full-stack-fastapi-template/pull/2028) by [@AymanAlSuleihi](https://github.com/AymanAlSuleihi).
* 📝 Update docs. PR [#2036](https://github.com/fastapi/full-stack-fastapi-template/pull/2036) by [@alejsdev](https://github.com/alejsdev).
* ✏️ Fix small typo in `deployment.md`. PR [#1679](https://github.com/fastapi/full-stack-fastapi-template/pull/1679) by [@cassmtnr](https://github.com/cassmtnr).

### Internal

* 🔥 Remove unused dependencies. PR [#2035](https://github.com/fastapi/full-stack-fastapi-template/pull/2035) by [@alejsdev](https://github.com/alejsdev).
* ⬆ Bump react-dom from 19.2.0 to 19.2.1 in /frontend. PR [#2032](https://github.com/fastapi/full-stack-fastapi-template/pull/2032) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump vite from 7.2.6 to 7.2.7 in /frontend. PR [#2033](https://github.com/fastapi/full-stack-fastapi-template/pull/2033) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/router-plugin from 1.139.12 to 1.140.0 in /frontend. PR [#2034](https://github.com/fastapi/full-stack-fastapi-template/pull/2034) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump lucide-react from 0.555.0 to 0.556.0 in /frontend. PR [#2031](https://github.com/fastapi/full-stack-fastapi-template/pull/2031) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 🔧 Add Tailwind CSS directives support in biome config. PR [#2029](https://github.com/fastapi/full-stack-fastapi-template/pull/2029) by [@alejsdev](https://github.com/alejsdev).
* ⬆ Bump react-hook-form from 7.66.1 to 7.67.0 in /frontend. PR [#2018](https://github.com/fastapi/full-stack-fastapi-template/pull/2018) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-query from 5.90.10 to 5.90.11 in /frontend. PR [#2019](https://github.com/fastapi/full-stack-fastapi-template/pull/2019) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump axios from 1.12.2 to 1.13.2 in /frontend. PR [#2020](https://github.com/fastapi/full-stack-fastapi-template/pull/2020) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/router-devtools from 1.139.3 to 1.139.12 in /frontend. PR [#2021](https://github.com/fastapi/full-stack-fastapi-template/pull/2021) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump playwright from v1.56.1-noble to v1.57.0-noble in /frontend. PR [#2016](https://github.com/fastapi/full-stack-fastapi-template/pull/2016) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆️ Update schema version in `biome.json`. PR [#2017](https://github.com/fastapi/full-stack-fastapi-template/pull/2017) by [@alejsdev](https://github.com/alejsdev).
* ⬆ Bump vite from 7.2.2 to 7.2.6 in /frontend. PR [#2015](https://github.com/fastapi/full-stack-fastapi-template/pull/2015) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @biomejs/biome from 2.3.7 to 2.3.8 in /frontend. PR [#2014](https://github.com/fastapi/full-stack-fastapi-template/pull/2014) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-query-devtools from 5.91.0 to 5.91.1 in /frontend. PR [#2013](https://github.com/fastapi/full-stack-fastapi-template/pull/2013) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/router-plugin from 1.133.15 to 1.139.12 in /frontend. PR [#2012](https://github.com/fastapi/full-stack-fastapi-template/pull/2012) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump form-data from 4.0.4 to 4.0.5 in /frontend. PR [#2011](https://github.com/fastapi/full-stack-fastapi-template/pull/2011) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump actions/checkout from 5 to 6. PR [#2007](https://github.com/fastapi/full-stack-fastapi-template/pull/2007) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @types/react from 19.2.2 to 19.2.7 in /frontend. PR [#2003](https://github.com/fastapi/full-stack-fastapi-template/pull/2003) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/router-devtools from 1.131.42 to 1.139.3 in /frontend. PR [#2001](https://github.com/fastapi/full-stack-fastapi-template/pull/2001) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump typescript from 5.9.2 to 5.9.3 in /frontend. PR [#2002](https://github.com/fastapi/full-stack-fastapi-template/pull/2002) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @types/react-dom from 19.2.2 to 19.2.3 in /frontend. PR [#2004](https://github.com/fastapi/full-stack-fastapi-template/pull/2004) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @types/node from 24.10.0 to 24.10.1 in /frontend. PR [#2005](https://github.com/fastapi/full-stack-fastapi-template/pull/2005) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump pydantic-settings from 2.11.0 to 2.12.0 in /backend. PR [#2000](https://github.com/fastapi/full-stack-fastapi-template/pull/2000) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump alembic from 1.17.1 to 1.17.2 in /backend. PR [#1999](https://github.com/fastapi/full-stack-fastapi-template/pull/1999) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @biomejs/biome from 2.2.4 to 2.3.7 in /frontend. PR [#1998](https://github.com/fastapi/full-stack-fastapi-template/pull/1998) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump react-hook-form from 7.66.0 to 7.66.1 in /frontend. PR [#1997](https://github.com/fastapi/full-stack-fastapi-template/pull/1997) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @vitejs/plugin-react-swc from 4.2.1 to 4.2.2 in /frontend. PR [#1996](https://github.com/fastapi/full-stack-fastapi-template/pull/1996) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @chakra-ui/react from 3.29.0 to 3.30.0 in /frontend. PR [#1995](https://github.com/fastapi/full-stack-fastapi-template/pull/1995) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-query-devtools from 5.90.2 to 5.91.0 in /frontend. PR [#1994](https://github.com/fastapi/full-stack-fastapi-template/pull/1994) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 🔧 Add labels to Dependabot updates. PR [#1992](https://github.com/fastapi/full-stack-fastapi-template/pull/1992) by [@alejsdev](https://github.com/alejsdev).
* ⬆ Bump dotenv from 17.2.2 to 17.2.3 in /frontend. PR [#1957](https://github.com/fastapi/full-stack-fastapi-template/pull/1957) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @chakra-ui/react from 3.27.0 to 3.29.0 in /frontend. PR [#1974](https://github.com/fastapi/full-stack-fastapi-template/pull/1974) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @types/react-dom from 19.2.1 to 19.2.2 in /frontend. PR [#1975](https://github.com/fastapi/full-stack-fastapi-template/pull/1975) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-query from 5.90.2 to 5.90.7 in /frontend. PR [#1976](https://github.com/fastapi/full-stack-fastapi-template/pull/1976) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump vite from 7.1.11 to 7.2.2 in /frontend. PR [#1977](https://github.com/fastapi/full-stack-fastapi-template/pull/1977) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump pydantic from 2.12.3 to 2.12.4 in /backend. PR [#1978](https://github.com/fastapi/full-stack-fastapi-template/pull/1978) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump js-yaml from 4.1.0 to 4.1.1 in /frontend. PR [#1983](https://github.com/fastapi/full-stack-fastapi-template/pull/1983) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump actions/checkout from 5 to 6. PR [#1988](https://github.com/fastapi/full-stack-fastapi-template/pull/1988) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 👷 Upgrade `latest-changes` GitHub Action and pin `actions/checkout@v5`. PR [#2006](https://github.com/fastapi/full-stack-fastapi-template/pull/2006) by [@svlandeg](https://github.com/svlandeg).
* ⬆ Bump @vitejs/plugin-react-swc from 4.1.0 to 4.2.0 in /frontend. PR [#1958](https://github.com/fastapi/full-stack-fastapi-template/pull/1958) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump actions/download-artifact from 5 to 6. PR [#1959](https://github.com/fastapi/full-stack-fastapi-template/pull/1959) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @types/node from 24.5.2 to 24.9.1 in /frontend. PR [#1961](https://github.com/fastapi/full-stack-fastapi-template/pull/1961) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump actions/upload-artifact from 4 to 5. PR [#1962](https://github.com/fastapi/full-stack-fastapi-template/pull/1962) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump react-hook-form from 7.62.0 to 7.65.0 in /frontend. PR [#1964](https://github.com/fastapi/full-stack-fastapi-template/pull/1964) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump alembic from 1.17.0 to 1.17.1 in /backend. PR [#1970](https://github.com/fastapi/full-stack-fastapi-template/pull/1970) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 🔧 Fix issue-manager config for reminder. PR [#1972](https://github.com/fastapi/full-stack-fastapi-template/pull/1972) by [@tiangolo](https://github.com/tiangolo).
* ⬆ Bump @vitejs/plugin-react-swc from 4.0.1 to 4.1.0 in /frontend. PR [#1897](https://github.com/fastapi/full-stack-fastapi-template/pull/1897) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump playwright from v1.55.0-noble to v1.56.1-noble in /frontend. PR [#1943](https://github.com/fastapi/full-stack-fastapi-template/pull/1943) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 🔧 Configure reminder for `waiting` label in `issue-manager`. PR [#1939](https://github.com/fastapi/full-stack-fastapi-template/pull/1939) by [@YuriiMotov](https://github.com/YuriiMotov).
* ⬆ Bump vite from 7.1.9 to 7.1.11 in /frontend. PR [#1949](https://github.com/fastapi/full-stack-fastapi-template/pull/1949) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump pydantic from 2.11.10 to 2.12.3 in /backend. PR [#1947](https://github.com/fastapi/full-stack-fastapi-template/pull/1947) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump react-dom and @types/react-dom in /frontend. PR [#1934](https://github.com/fastapi/full-stack-fastapi-template/pull/1934) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump alembic from 1.16.5 to 1.17.0 in /backend. PR [#1935](https://github.com/fastapi/full-stack-fastapi-template/pull/1935) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump actions/setup-node from 5 to 6. PR [#1937](https://github.com/fastapi/full-stack-fastapi-template/pull/1937) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/router-plugin from 1.132.41 to 1.133.15 in /frontend. PR [#1946](https://github.com/fastapi/full-stack-fastapi-template/pull/1946) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump astral-sh/setup-uv from 6 to 7. PR [#1925](https://github.com/fastapi/full-stack-fastapi-template/pull/1925) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump vite from 7.1.7 to 7.1.9 in /frontend. PR [#1919](https://github.com/fastapi/full-stack-fastapi-template/pull/1919) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/router-plugin from 1.131.44 to 1.132.41 in /frontend. PR [#1920](https://github.com/fastapi/full-stack-fastapi-template/pull/1920) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-query-devtools from 5.87.4 to 5.90.2 in /frontend. PR [#1921](https://github.com/fastapi/full-stack-fastapi-template/pull/1921) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump pydantic from 2.11.9 to 2.11.10 in /backend. PR [#1922](https://github.com/fastapi/full-stack-fastapi-template/pull/1922) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump tiangolo/issue-manager from 0.5.1 to 0.6.0. PR [#1912](https://github.com/fastapi/full-stack-fastapi-template/pull/1912) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @types/react from 19.1.13 to 19.1.15 in /frontend. PR [#1906](https://github.com/fastapi/full-stack-fastapi-template/pull/1906) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump pydantic-settings from 2.10.1 to 2.11.0 in /backend. PR [#1907](https://github.com/fastapi/full-stack-fastapi-template/pull/1907) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-query from 5.90.1 to 5.90.2 in /frontend. PR [#1905](https://github.com/fastapi/full-stack-fastapi-template/pull/1905) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @types/node from 24.4.0 to 24.5.2 in /frontend. PR [#1903](https://github.com/fastapi/full-stack-fastapi-template/pull/1903) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump vite from 7.1.5 to 7.1.7 in /frontend. PR [#1893](https://github.com/fastapi/full-stack-fastapi-template/pull/1893) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-query from 5.87.4 to 5.90.1 in /frontend. PR [#1896](https://github.com/fastapi/full-stack-fastapi-template/pull/1896) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-router from 1.131.44 to 1.131.50 in /frontend. PR [#1894](https://github.com/fastapi/full-stack-fastapi-template/pull/1894) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 🔧 Update dependabot intervals for uv and npm dependencies to weekly. PR [#1880](https://github.com/fastapi/full-stack-fastapi-template/pull/1880) by [@alejsdev](https://github.com/alejsdev).
* ⬆ Bump pydantic from 2.9.2 to 2.11.7 in /backend. PR [#1864](https://github.com/fastapi/full-stack-fastapi-template/pull/1864) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 🔧 Update coverage configuration and simplify test script. PR [#1867](https://github.com/fastapi/full-stack-fastapi-template/pull/1867) by [@alejsdev](https://github.com/alejsdev).
* 🔧 Add T201 rule to ruff linting configuration to disallow print statements. PR [#1865](https://github.com/fastapi/full-stack-fastapi-template/pull/1865) by [@alejsdev](https://github.com/alejsdev).
* ⬆ Bump @tanstack/react-query-devtools from 5.87.1 to 5.87.3 in /frontend. PR [#1863](https://github.com/fastapi/full-stack-fastapi-template/pull/1863) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump vite from 6.3.4 to 7.1.5 in /frontend. PR [#1857](https://github.com/fastapi/full-stack-fastapi-template/pull/1857) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @types/node from 22.15.3 to 24.3.1 in /frontend. PR [#1854](https://github.com/fastapi/full-stack-fastapi-template/pull/1854) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @vitejs/plugin-react-swc from 3.9.0 to 4.0.1 in /frontend. PR [#1856](https://github.com/fastapi/full-stack-fastapi-template/pull/1856) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump axios from 1.9.0 to 1.11.0 in /frontend. PR [#1855](https://github.com/fastapi/full-stack-fastapi-template/pull/1855) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump alembic from 1.15.2 to 1.16.5 in /backend. PR [#1847](https://github.com/fastapi/full-stack-fastapi-template/pull/1847) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump email-validator from 2.2.0 to 2.3.0 in /backend. PR [#1850](https://github.com/fastapi/full-stack-fastapi-template/pull/1850) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump pydantic-settings from 2.9.1 to 2.10.1 in /backend. PR [#1851](https://github.com/fastapi/full-stack-fastapi-template/pull/1851) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump react-error-boundary from 5.0.0 to 6.0.0 in /frontend. PR [#1849](https://github.com/fastapi/full-stack-fastapi-template/pull/1849) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-query-devtools from 5.74.9 to 5.87.1 in /frontend. PR [#1848](https://github.com/fastapi/full-stack-fastapi-template/pull/1848) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump dotenv from 16.4.5 to 17.2.2 in /frontend. PR [#1846](https://github.com/fastapi/full-stack-fastapi-template/pull/1846) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump node from 20 to 24 in /frontend. PR [#1621](https://github.com/fastapi/full-stack-fastapi-template/pull/1621) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump actions/labeler from 5 to 6. PR [#1839](https://github.com/fastapi/full-stack-fastapi-template/pull/1839) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump actions/setup-python from 5 to 6. PR [#1835](https://github.com/fastapi/full-stack-fastapi-template/pull/1835) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump actions/setup-node from 4 to 5. PR [#1836](https://github.com/fastapi/full-stack-fastapi-template/pull/1836) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 👷 Detect and label merge conflicts on PRs automatically. PR [#1838](https://github.com/fastapi/full-stack-fastapi-template/pull/1838) by [@svlandeg](https://github.com/svlandeg).
* 🔧 Add frontend linter pre-commit hook. PR [#1791](https://github.com/fastapi/full-stack-fastapi-template/pull/1791) by [@alexrockhill](https://github.com/alexrockhill).
* ⬆ Bump form-data from 4.0.2 to 4.0.4 in /frontend. PR [#1725](https://github.com/fastapi/full-stack-fastapi-template/pull/1725) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump actions/checkout from 4 to 5. PR [#1768](https://github.com/fastapi/full-stack-fastapi-template/pull/1768) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump actions/download-artifact from 4 to 5. PR [#1754](https://github.com/fastapi/full-stack-fastapi-template/pull/1754) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump tiangolo/latest-changes from 0.3.2 to 0.4.0. PR [#1744](https://github.com/fastapi/full-stack-fastapi-template/pull/1744) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump bcrypt from 4.0.1 to 4.3.0 in /backend. PR [#1601](https://github.com/fastapi/full-stack-fastapi-template/pull/1601) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump react-error-boundary from 4.0.13 to 5.0.0 in /frontend. PR [#1602](https://github.com/fastapi/full-stack-fastapi-template/pull/1602) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump vite from 6.3.3 to 6.3.4 in /frontend. PR [#1608](https://github.com/fastapi/full-stack-fastapi-template/pull/1608) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @playwright/test from 1.45.2 to 1.52.0 in /frontend. PR [#1586](https://github.com/fastapi/full-stack-fastapi-template/pull/1586) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump pydantic-settings from 2.5.2 to 2.9.1 in /backend. PR [#1589](https://github.com/fastapi/full-stack-fastapi-template/pull/1589) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump next-themes from 0.4.4 to 0.4.6 in /frontend. PR [#1598](https://github.com/fastapi/full-stack-fastapi-template/pull/1598) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @types/node from 20.10.5 to 22.15.3 in /frontend. PR [#1599](https://github.com/fastapi/full-stack-fastapi-template/pull/1599) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @tanstack/react-query-devtools from 5.28.14 to 5.74.9 in /frontend. PR [#1597](https://github.com/fastapi/full-stack-fastapi-template/pull/1597) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump sqlmodel from 0.0.22 to 0.0.24 in /backend. PR [#1596](https://github.com/fastapi/full-stack-fastapi-template/pull/1596) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump python-multipart from 0.0.10 to 0.0.20 in /backend. PR [#1595](https://github.com/fastapi/full-stack-fastapi-template/pull/1595) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump alembic from 1.13.2 to 1.15.2 in /backend. PR [#1594](https://github.com/fastapi/full-stack-fastapi-template/pull/1594) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump postgres from 12 to 17. PR [#1580](https://github.com/fastapi/full-stack-fastapi-template/pull/1580) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump axios from 1.8.2 to 1.9.0 in /frontend. PR [#1592](https://github.com/fastapi/full-stack-fastapi-template/pull/1592) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump react-icons from 5.4.0 to 5.5.0 in /frontend. PR [#1581](https://github.com/fastapi/full-stack-fastapi-template/pull/1581) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump jinja2 from 3.1.4 to 3.1.6 in /backend. PR [#1591](https://github.com/fastapi/full-stack-fastapi-template/pull/1591) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump pyjwt from 2.9.0 to 2.10.1 in /backend. PR [#1588](https://github.com/fastapi/full-stack-fastapi-template/pull/1588) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump httpx from 0.27.2 to 0.28.1 in /backend. PR [#1587](https://github.com/fastapi/full-stack-fastapi-template/pull/1587) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump form-data from 4.0.0 to 4.0.2 in /frontend. PR [#1578](https://github.com/fastapi/full-stack-fastapi-template/pull/1578) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump @biomejs/biome from 1.6.1 to 1.9.4 in /frontend. PR [#1582](https://github.com/fastapi/full-stack-fastapi-template/pull/1582) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆️ Update Dependabot configuration to target the backend directory for Python uv updates. PR [#1577](https://github.com/fastapi/full-stack-fastapi-template/pull/1577) by [@alejsdev](https://github.com/alejsdev).
* 🔧 Update Dependabot config. PR [#1576](https://github.com/fastapi/full-stack-fastapi-template/pull/1576) by [@alejsdev](https://github.com/alejsdev).
* Bump @babel/runtime from 7.23.9 to 7.27.0 in /frontend. PR [#1570](https://github.com/fastapi/full-stack-fastapi-template/pull/1570) by [@dependabot[bot]](https://github.com/apps/dependabot).
* Bump esbuild, @vitejs/plugin-react-swc and vite in /frontend. PR [#1571](https://github.com/fastapi/full-stack-fastapi-template/pull/1571) by [@dependabot[bot]](https://github.com/apps/dependabot).
* Bump axios from 1.7.4 to 1.8.2 in /frontend. PR [#1568](https://github.com/fastapi/full-stack-fastapi-template/pull/1568) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump astral-sh/setup-uv from 5 to 6. PR [#1566](https://github.com/fastapi/full-stack-fastapi-template/pull/1566) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 🔧  Add npm and docker package ecosystems to Dependabot configuration. PR [#1535](https://github.com/fastapi/full-stack-fastapi-template/pull/1535) by [@alejsdev](https://github.com/alejsdev).

## 0.8.0

### Features

* 🛂 Migrate to Chakra UI v3 . PR [#1496](https://github.com/fastapi/full-stack-fastapi-template/pull/1496) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add private, local only, API for usage in E2E tests. PR [#1429](https://github.com/fastapi/full-stack-fastapi-template/pull/1429) by [@patrick91](https://github.com/patrick91).
* ✨ Migrate to latest openapi-ts. PR [#1430](https://github.com/fastapi/full-stack-fastapi-template/pull/1430) by [@patrick91](https://github.com/patrick91).

### Fixes

* 🧑‍🔧 Replace correct value for 'htmlFor'. PR [#1456](https://github.com/fastapi/full-stack-fastapi-template/pull/1456) by [@wesenbergg](https://github.com/wesenbergg).

### Refactors

* ♻️ Redirect the user to `login` if we get 401/403. PR [#1501](https://github.com/fastapi/full-stack-fastapi-template/pull/1501) by [@alejsdev](https://github.com/alejsdev).
* 🐛 Refactor reset password test to create normal user instead of using super user. PR [#1499](https://github.com/fastapi/full-stack-fastapi-template/pull/1499) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Replace email types from `str` to `EmailStr` in `config.py`. PR [#1492](https://github.com/fastapi/full-stack-fastapi-template/pull/1492) by [@jpizquierdo](https://github.com/jpizquierdo).
* 🔧 Remove unused context from router creation. PR [#1498](https://github.com/fastapi/full-stack-fastapi-template/pull/1498) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Remove redundant item deletion code leveraging cascade delete. PR [#1481](https://github.com/fastapi/full-stack-fastapi-template/pull/1481) by [@nauanbek](https://github.com/nauanbek).
* ✏️ Fix a couple of spelling mistakes. PR [#1485](https://github.com/fastapi/full-stack-fastapi-template/pull/1485) by [@rjmunro](https://github.com/rjmunro).
* 🎨 Move `prefix` and `tags` to routers. PR [#1439](https://github.com/fastapi/full-stack-fastapi-template/pull/1439) by [@patrick91](https://github.com/patrick91).
* ♻️ Remove modify id script in favor of openapi-ts config. PR [#1434](https://github.com/fastapi/full-stack-fastapi-template/pull/1434) by [@patrick91](https://github.com/patrick91).
* 👷 Improve Playwright CI speed: sharding (parallel runs), run in Docker to use cache, use env vars. PR [#1405](https://github.com/fastapi/full-stack-fastapi-template/pull/1405) by [@tiangolo](https://github.com/tiangolo).
* ♻️ Add PaginationFooter component. PR [#1381](https://github.com/fastapi/full-stack-fastapi-template/pull/1381) by [@saltie2193](https://github.com/saltie2193).
* ♻️ Refactored code to use encryption algorithm name from settings for consistency. PR [#1160](https://github.com/fastapi/full-stack-fastapi-template/pull/1160) by [@sameeramin](https://github.com/sameeramin).
* 🔊 Enable logging for email utils by default. PR [#1374](https://github.com/fastapi/full-stack-fastapi-template/pull/1374) by [@ihmily](https://github.com/ihmily).
* 🔧 Add `ENV PYTHONUNBUFFERED=1` to log output directly to Docker. PR [#1378](https://github.com/fastapi/full-stack-fastapi-template/pull/1378) by [@tiangolo](https://github.com/tiangolo).
* 💡 Remove unnecessary comment. PR [#1260](https://github.com/fastapi/full-stack-fastapi-template/pull/1260) by [@sebhani](https://github.com/sebhani).

### Upgrades

* ⬆️ Update Dockerfile to use uv version 0.5.11. PR [#1454](https://github.com/fastapi/full-stack-fastapi-template/pull/1454) by [@alejsdev](https://github.com/alejsdev).

### Docs

* 📝 Removing deprecated manual client SDK step. PR [#1494](https://github.com/fastapi/full-stack-fastapi-template/pull/1494) by [@chandy](https://github.com/chandy).
* 📝 Update Frontend README.md. PR [#1462](https://github.com/fastapi/full-stack-fastapi-template/pull/1462) by [@getmarkus](https://github.com/getmarkus).
* 📝 Update `frontend/README.md` to also remove Playwright when removing Frontend. PR [#1452](https://github.com/fastapi/full-stack-fastapi-template/pull/1452) by [@youben11](https://github.com/youben11).
* 📝 Update `deployment.md`, instructions to install GitHub Runner in non-root VMs. PR [#1412](https://github.com/fastapi/full-stack-fastapi-template/pull/1412) by [@tiangolo](https://github.com/tiangolo).
* 📝 Add MailCatcher to `development.md`. PR [#1387](https://github.com/fastapi/full-stack-fastapi-template/pull/1387) by [@tobiase](https://github.com/tobiase).

### Internal

* 🔧 Configure path alias for cleaner imports. PR [#1497](https://github.com/fastapi/full-stack-fastapi-template/pull/1497) by [@alejsdev](https://github.com/alejsdev).
* Bump vite from 5.0.13 to 5.4.14 in /frontend. PR [#1469](https://github.com/fastapi/full-stack-fastapi-template/pull/1469) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump astral-sh/setup-uv from 4 to 5. PR [#1453](https://github.com/fastapi/full-stack-fastapi-template/pull/1453) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump astral-sh/setup-uv from 3 to 4. PR [#1433](https://github.com/fastapi/full-stack-fastapi-template/pull/1433) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump tiangolo/latest-changes from 0.3.1 to 0.3.2. PR [#1418](https://github.com/fastapi/full-stack-fastapi-template/pull/1418) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 👷 Update issue manager workflow. PR [#1398](https://github.com/fastapi/full-stack-fastapi-template/pull/1398) by [@alejsdev](https://github.com/alejsdev).
* 👷 Fix smokeshow, checkout files on CI. PR [#1395](https://github.com/fastapi/full-stack-fastapi-template/pull/1395) by [@tiangolo](https://github.com/tiangolo).
* 👷 Update `labeler.yml`. PR [#1388](https://github.com/fastapi/full-stack-fastapi-template/pull/1388) by [@tiangolo](https://github.com/tiangolo).
* 🔧 Add .auth playwright folder to `.gitignore`. PR [#1383](https://github.com/fastapi/full-stack-fastapi-template/pull/1383) by [@justin-p](https://github.com/justin-p).
* ⬆️ Bump rollup from 4.6.1 to 4.22.5 in /frontend. PR [#1379](https://github.com/fastapi/full-stack-fastapi-template/pull/1379) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump astral-sh/setup-uv from 2 to 3. PR [#1364](https://github.com/fastapi/full-stack-fastapi-template/pull/1364) by [@dependabot[bot]](https://github.com/apps/dependabot).
*  👷 Update pre-commit end-of-file-fixer hook to exclude email-templates. PR [#1296](https://github.com/fastapi/full-stack-fastapi-template/pull/1296) by [@goabonga](https://github.com/goabonga).
* ⬆ Bump tiangolo/issue-manager from 0.5.0 to 0.5.1. PR [#1332](https://github.com/fastapi/full-stack-fastapi-template/pull/1332) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 🔧 Run task by the same Python environment used to run Copier. PR [#1157](https://github.com/fastapi/full-stack-fastapi-template/pull/1157) by [@waketzheng](https://github.com/waketzheng).
* 👷 Tweak generate client to error out if there are errors. PR [#1377](https://github.com/fastapi/full-stack-fastapi-template/pull/1377) by [@tiangolo](https://github.com/tiangolo).
* 👷 Generate and commit client only on same repo PRs, on forks, show the error. PR [#1376](https://github.com/fastapi/full-stack-fastapi-template/pull/1376) by [@tiangolo](https://github.com/tiangolo).

## 0.7.1

### Highlights

* Migrate from Poetry to [`uv`](https://github.com/astral-sh/uv).
* Simplifications and improvements for Docker Compose files, Traefik Dockerfiles.
* Make the API use its own domain `api.example.com` and the frontend use `dashboard.example.com`. This would make it easier to deploy them separately if you needed that.
* The backend and frontend on Docker Compose now listen on the same port as the local development servers, this way you can stop the Docker Compose services and run the local development servers without changing the frontend configuration.

### Features

* 🩺 Add DB healthcheck. PR [#1342](https://github.com/fastapi/full-stack-fastapi-template/pull/1342) by [@tiangolo](https://github.com/tiangolo).

### Refactors

* ♻️ Update settings to use top level `.env` file. PR [#1359](https://github.com/fastapi/full-stack-fastapi-template/pull/1359) by [@tiangolo](https://github.com/tiangolo).
* ⬆️ Migrate from Poetry to uv. PR [#1356](https://github.com/fastapi/full-stack-fastapi-template/pull/1356) by [@tiangolo](https://github.com/tiangolo).
* 🔥 Remove logic for development dependencies and Jupyter, it was never documented, and I no longer use that trick. PR [#1355](https://github.com/fastapi/full-stack-fastapi-template/pull/1355) by [@tiangolo](https://github.com/tiangolo).
* ♻️ Use Docker Compose `watch`. PR [#1354](https://github.com/fastapi/full-stack-fastapi-template/pull/1354) by [@tiangolo](https://github.com/tiangolo).
* 🔧 Use plain base official Python Docker image. PR [#1351](https://github.com/fastapi/full-stack-fastapi-template/pull/1351) by [@tiangolo](https://github.com/tiangolo).
* 🚚 Move location of scripts to simplify file structure. PR [#1352](https://github.com/fastapi/full-stack-fastapi-template/pull/1352) by [@tiangolo](https://github.com/tiangolo).
* ♻️ Refactor prestart (migrations), move that to its own container. PR [#1350](https://github.com/fastapi/full-stack-fastapi-template/pull/1350) by [@tiangolo](https://github.com/tiangolo).
* ♻️ Include `FRONTEND_HOST` in CORS origins by default. PR [#1348](https://github.com/fastapi/full-stack-fastapi-template/pull/1348) by [@tiangolo](https://github.com/tiangolo).
* ♻️ Simplify domains with `api.example.com` for API and `dashboard.example.com` for frontend, improve local development with `localhost`. PR [#1344](https://github.com/fastapi/full-stack-fastapi-template/pull/1344) by [@tiangolo](https://github.com/tiangolo).
* 🔥 Simplify Traefik, remove www-redirects that add complexity. PR [#1343](https://github.com/fastapi/full-stack-fastapi-template/pull/1343) by [@tiangolo](https://github.com/tiangolo).
* 🔥 Enable support for Arm Docker images in Mac, remove old patch. PR [#1341](https://github.com/fastapi/full-stack-fastapi-template/pull/1341) by [@tiangolo](https://github.com/tiangolo).
* ♻️ Remove duplicate information in the ItemCreate model. PR [#1287](https://github.com/fastapi/full-stack-fastapi-template/pull/1287) by [@jjaakko](https://github.com/jjaakko).

### Upgrades

* ⬆️ Upgrade FastAPI. PR [#1349](https://github.com/fastapi/full-stack-fastapi-template/pull/1349) by [@tiangolo](https://github.com/tiangolo).

### Docs

* 💡 Add comments to Dockerfile with uv references. PR [#1357](https://github.com/fastapi/full-stack-fastapi-template/pull/1357) by [@tiangolo](https://github.com/tiangolo).
* 📝 Add Email Templates to `backend/README.md`. PR [#1311](https://github.com/fastapi/full-stack-fastapi-template/pull/1311) by [@alejsdev](https://github.com/alejsdev).

### Internal

* 👷 Do not sync labels as it overrides manually added labels. PR [#1307](https://github.com/fastapi/full-stack-fastapi-template/pull/1307) by [@tiangolo](https://github.com/tiangolo).
* 👷 Use uv cache on GitHub Actions. PR [#1366](https://github.com/fastapi/full-stack-fastapi-template/pull/1366) by [@tiangolo](https://github.com/tiangolo).
* 👷 Update GitHub Actions format. PR [#1363](https://github.com/fastapi/full-stack-fastapi-template/pull/1363) by [@tiangolo](https://github.com/tiangolo).
* 👷 Use `uv` for Python env to generate client. PR [#1362](https://github.com/fastapi/full-stack-fastapi-template/pull/1362) by [@tiangolo](https://github.com/tiangolo).
* 👷 Run tests from Python environment (with `uv`), not from Docker container. PR [#1361](https://github.com/fastapi/full-stack-fastapi-template/pull/1361) by [@tiangolo](https://github.com/tiangolo).
* 🔨 Update `generate-client.sh` script, make it fail on errors, fix generation. PR [#1360](https://github.com/fastapi/full-stack-fastapi-template/pull/1360) by [@tiangolo](https://github.com/tiangolo).
* 👷 Add GitHub Actions workflow to lint backend apart from tests. PR [#1358](https://github.com/fastapi/full-stack-fastapi-template/pull/1358) by [@tiangolo](https://github.com/tiangolo).
* 👷 Improve playwright CI job. PR [#1335](https://github.com/fastapi/full-stack-fastapi-template/pull/1335) by [@patrick91](https://github.com/patrick91).
* 👷 Update `issue-manager.yml`. PR [#1329](https://github.com/fastapi/full-stack-fastapi-template/pull/1329) by [@tiangolo](https://github.com/tiangolo).
* 💚 Set `include-hidden-files` to `True` when using the `upload-artifact` GH action. PR [#1327](https://github.com/fastapi/full-stack-fastapi-template/pull/1327) by [@svlandeg](https://github.com/svlandeg).
* 👷🏻 Auto-generate frontend client . PR [#1320](https://github.com/fastapi/full-stack-fastapi-template/pull/1320) by [@alejsdev](https://github.com/alejsdev).
* 🐛 Fix in `.github/labeler.yml`. PR [#1322](https://github.com/fastapi/full-stack-fastapi-template/pull/1322) by [@alejsdev](https://github.com/alejsdev).
* 👷 Update `.github/labeler.yml`. PR [#1321](https://github.com/fastapi/full-stack-fastapi-template/pull/1321) by [@alejsdev](https://github.com/alejsdev).
* 👷 Update `latest-changes` GitHub Action. PR [#1315](https://github.com/fastapi/full-stack-fastapi-template/pull/1315) by [@tiangolo](https://github.com/tiangolo).
* 👷 Update configs for labeler. PR [#1308](https://github.com/fastapi/full-stack-fastapi-template/pull/1308) by [@tiangolo](https://github.com/tiangolo).
* 👷 Update GitHub Action labeler to add only one label. PR [#1304](https://github.com/fastapi/full-stack-fastapi-template/pull/1304) by [@tiangolo](https://github.com/tiangolo).
* ⬆️ Bump axios from 1.6.2 to 1.7.4 in /frontend. PR [#1301](https://github.com/fastapi/full-stack-fastapi-template/pull/1301) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 👷 Update GitHub Action labeler dependencies. PR [#1302](https://github.com/fastapi/full-stack-fastapi-template/pull/1302) by [@tiangolo](https://github.com/tiangolo).
* 👷 Update GitHub Action labeler permissions. PR [#1300](https://github.com/fastapi/full-stack-fastapi-template/pull/1300) by [@tiangolo](https://github.com/tiangolo).
* 👷 Add GitHub Action label-checker. PR [#1299](https://github.com/fastapi/full-stack-fastapi-template/pull/1299) by [@tiangolo](https://github.com/tiangolo).
* 👷 Add GitHub Action labeler. PR [#1298](https://github.com/fastapi/full-stack-fastapi-template/pull/1298) by [@tiangolo](https://github.com/tiangolo).
* 👷 Add GitHub Action add-to-project. PR [#1297](https://github.com/fastapi/full-stack-fastapi-template/pull/1297) by [@tiangolo](https://github.com/tiangolo).
* 👷 Update issue-manager. PR [#1288](https://github.com/fastapi/full-stack-fastapi-template/pull/1288) by [@tiangolo](https://github.com/tiangolo).

## 0.7.0

Lots of new things! 🎁

* E2E tests with Playwright.
* Mailcatcher configuration, to develop and test email handling.
* Pagination.
* UUIDs for database keys.
* New user sign up.
* Support for deploying to multiple environments (staging, prod).
* Many refactors and improvements.
* Several dependency upgrades.

### Features

* ✨ Add User Settings e2e tests. PR [#1271](https://github.com/tiangolo/full-stack-fastapi-template/pull/1271) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add Reset Password e2e tests. PR [#1270](https://github.com/tiangolo/full-stack-fastapi-template/pull/1270) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add Sign Up e2e tests. PR [#1268](https://github.com/tiangolo/full-stack-fastapi-template/pull/1268) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add Sign Up and make `OPEN_USER_REGISTRATION=True` by default. PR [#1265](https://github.com/tiangolo/full-stack-fastapi-template/pull/1265) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add Login e2e tests. PR [#1264](https://github.com/tiangolo/full-stack-fastapi-template/pull/1264) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add initial setup for frontend / end-to-end tests with Playwright. PR [#1261](https://github.com/tiangolo/full-stack-fastapi-template/pull/1261) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add mailcatcher configuration. PR [#1244](https://github.com/tiangolo/full-stack-fastapi-template/pull/1244) by [@patrick91](https://github.com/patrick91).
* ✨ Introduce pagination in items. PR [#1239](https://github.com/tiangolo/full-stack-fastapi-template/pull/1239) by [@patrick91](https://github.com/patrick91).
* 🗃️ Add max_length validation for database models and input data. PR [#1233](https://github.com/tiangolo/full-stack-fastapi-template/pull/1233) by [@estebanx64](https://github.com/estebanx64).
* ✨ Add TanStack React Query devtools in dev build. PR [#1217](https://github.com/tiangolo/full-stack-fastapi-template/pull/1217) by [@tomerb](https://github.com/tomerb).
* ✨ Add support for deploying multiple environments (staging, production) to the same server. PR [#1128](https://github.com/tiangolo/full-stack-fastapi-template/pull/1128) by [@tiangolo](https://github.com/tiangolo).
* 👷 Update CI GitHub Actions to allow running in private repos. PR [#1125](https://github.com/tiangolo/full-stack-fastapi-template/pull/1125) by [@tiangolo](https://github.com/tiangolo).

### Fixes

* 🐛 Fix welcome page to show logged-in user. PR [#1218](https://github.com/tiangolo/full-stack-fastapi-template/pull/1218) by [@tomerb](https://github.com/tomerb).
* 🐛 Fix local Traefik proxy network config to fix Gateway Timeouts. PR [#1184](https://github.com/tiangolo/full-stack-fastapi-template/pull/1184) by [@JoelGotsch](https://github.com/JoelGotsch).
* ♻️ Fix tests when first superuser password is changed in .env. PR [#1165](https://github.com/tiangolo/full-stack-fastapi-template/pull/1165) by [@billzhong](https://github.com/billzhong).
* 🐛 Fix bug when resetting password. PR [#1171](https://github.com/tiangolo/full-stack-fastapi-template/pull/1171) by [@alejsdev](https://github.com/alejsdev).
* 🐛 Fix 403 when the frontend has a directory without an index.html. PR [#1094](https://github.com/tiangolo/full-stack-fastapi-template/pull/1094) by [@tiangolo](https://github.com/tiangolo).

### Refactors

* 🚨 Fix Docker build warning. PR [#1283](https://github.com/tiangolo/full-stack-fastapi-template/pull/1283) by [@erip](https://github.com/erip).
* ♻️ Regenerate client to use UUID instead of id integers and update frontend. PR [#1281](https://github.com/tiangolo/full-stack-fastapi-template/pull/1281) by [@rehanabdul](https://github.com/rehanabdul).
* ♻️ Tweaks in frontend. PR [#1273](https://github.com/tiangolo/full-stack-fastapi-template/pull/1273) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Add random password util and refactor tests. PR [#1277](https://github.com/tiangolo/full-stack-fastapi-template/pull/1277) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Refactor models to use cascade delete relationships . PR [#1276](https://github.com/tiangolo/full-stack-fastapi-template/pull/1276) by [@alejsdev](https://github.com/alejsdev).
* 🔥 Remove `USERS_OPEN_REGISTRATION` config, make registration enabled by default. PR [#1274](https://github.com/tiangolo/full-stack-fastapi-template/pull/1274) by [@alejsdev](https://github.com/alejsdev).
* 🔧 Reuse database url from config in alembic setup. PR [#1229](https://github.com/tiangolo/full-stack-fastapi-template/pull/1229) by [@patrick91](https://github.com/patrick91).
* 🔧 Update Playwright config and tests to use env variables. PR [#1266](https://github.com/tiangolo/full-stack-fastapi-template/pull/1266) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Edit refactor db models to use UUID's instead of integer ID's. PR [#1259](https://github.com/tiangolo/full-stack-fastapi-template/pull/1259) by [@estebanx64](https://github.com/estebanx64).
* ♻️ Update form inputs width. PR [#1263](https://github.com/tiangolo/full-stack-fastapi-template/pull/1263) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Replace deprecated utcnow() with now(timezone.utc) in utils module. PR [#1247](https://github.com/tiangolo/full-stack-fastapi-template/pull/1247) by [@jalvarezz13](https://github.com/jalvarezz13).
* 🎨 Format frontend. PR [#1262](https://github.com/tiangolo/full-stack-fastapi-template/pull/1262) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Abstraction of specific AddModal component out of the Navbar. PR [#1246](https://github.com/tiangolo/full-stack-fastapi-template/pull/1246) by [@ajbloureiro](https://github.com/ajbloureiro).
* ♻️ Update `login.tsx` to prevent error if username or password are empty. PR [#1257](https://github.com/tiangolo/full-stack-fastapi-template/pull/1257) by [@jmondaud](https://github.com/jmondaud).
* ♻️ Refactor recover password. PR [#1242](https://github.com/tiangolo/full-stack-fastapi-template/pull/1242) by [@alejsdev](https://github.com/alejsdev).
* 🎨 Format and lint . PR [#1243](https://github.com/tiangolo/full-stack-fastapi-template/pull/1243) by [@alejsdev](https://github.com/alejsdev).
* 🎨 Run biome after OpenAPI client generation. PR [#1226](https://github.com/tiangolo/full-stack-fastapi-template/pull/1226) by [@tomerb](https://github.com/tomerb).
* ♻️ Update DeleteConfirmation component to use new service. PR [#1224](https://github.com/tiangolo/full-stack-fastapi-template/pull/1224) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Update client services. PR [#1223](https://github.com/tiangolo/full-stack-fastapi-template/pull/1223) by [@alejsdev](https://github.com/alejsdev).
* ⚒️ Add minor frontend tweaks. PR [#1210](https://github.com/tiangolo/full-stack-fastapi-template/pull/1210) by [@alejsdev](https://github.com/alejsdev).
* 🚚 Move assets to public folder. PR [#1206](https://github.com/tiangolo/full-stack-fastapi-template/pull/1206) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Refactor redirect labels to simplify removing the frontend. PR [#1208](https://github.com/tiangolo/full-stack-fastapi-template/pull/1208) by [@tiangolo](https://github.com/tiangolo).
* 🔒️ Refactor migrate from python-jose to PyJWT. PR [#1203](https://github.com/tiangolo/full-stack-fastapi-template/pull/1203) by [@estebanx64](https://github.com/estebanx64).
* 🔥 Remove duplicated code. PR [#1185](https://github.com/tiangolo/full-stack-fastapi-template/pull/1185) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Add delete_user_me endpoint and corresponding test cases. PR [#1179](https://github.com/tiangolo/full-stack-fastapi-template/pull/1179) by [@alejsdev](https://github.com/alejsdev).
* ✅ Update test to add verification database records. PR [#1178](https://github.com/tiangolo/full-stack-fastapi-template/pull/1178) by [@estebanx64](https://github.com/estebanx64).
* 🚸 Use `useSuspenseQuery` to fetch members and show skeleton. PR [#1174](https://github.com/tiangolo/full-stack-fastapi-template/pull/1174) by [@patrick91](https://github.com/patrick91).
* 🎨 Format Utils. PR [#1173](https://github.com/tiangolo/full-stack-fastapi-template/pull/1173) by [@alejsdev](https://github.com/alejsdev).
* ✨ Use suspense for items page. PR [#1167](https://github.com/tiangolo/full-stack-fastapi-template/pull/1167) by [@patrick91](https://github.com/patrick91).
* 🚸 Mark login field as required. PR [#1166](https://github.com/tiangolo/full-stack-fastapi-template/pull/1166) by [@patrick91](https://github.com/patrick91).
* 🚸 Improve login. PR [#1163](https://github.com/tiangolo/full-stack-fastapi-template/pull/1163) by [@patrick91](https://github.com/patrick91).
* 🥅 Handle AxiosErrors in Login page. PR [#1162](https://github.com/tiangolo/full-stack-fastapi-template/pull/1162) by [@patrick91](https://github.com/patrick91).
* 🎨 Format frontend. PR [#1161](https://github.com/tiangolo/full-stack-fastapi-template/pull/1161) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Regenerate frontend client. PR [#1156](https://github.com/tiangolo/full-stack-fastapi-template/pull/1156) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Refactor rename ModelsOut to ModelsPublic. PR [#1154](https://github.com/tiangolo/full-stack-fastapi-template/pull/1154) by [@estebanx64](https://github.com/estebanx64).
* ♻️ Migrate frontend client generation from `openapi-typescript-codegen` to `@hey-api/openapi-ts`. PR [#1151](https://github.com/tiangolo/full-stack-fastapi-template/pull/1151) by [@alejsdev](https://github.com/alejsdev).
* 🔥 Remove unused exports and update dependencies. PR [#1146](https://github.com/tiangolo/full-stack-fastapi-template/pull/1146) by [@alejsdev](https://github.com/alejsdev).
* 🔧 Update sentry dns initialization following the environment settings. PR [#1145](https://github.com/tiangolo/full-stack-fastapi-template/pull/1145) by [@estebanx64](https://github.com/estebanx64).
* ♻️ Refactor and tweaks, rename `UserCreateOpen` to `UserRegister` and others. PR [#1143](https://github.com/tiangolo/full-stack-fastapi-template/pull/1143) by [@alejsdev](https://github.com/alejsdev).
* 🎨 Format imports. PR [#1140](https://github.com/tiangolo/full-stack-fastapi-template/pull/1140) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Refactor and remove `React.FC`. PR [#1139](https://github.com/tiangolo/full-stack-fastapi-template/pull/1139) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Add email pattern and refactor in frontend. PR [#1138](https://github.com/tiangolo/full-stack-fastapi-template/pull/1138) by [@alejsdev](https://github.com/alejsdev).
* 🥅 Set up Sentry for FastAPI applications. PR [#1136](https://github.com/tiangolo/full-stack-fastapi-template/pull/1136) by [@estebanx64](https://github.com/estebanx64).
* 🔥 Remove deprecated Docker Compose version key. PR [#1129](https://github.com/tiangolo/full-stack-fastapi-template/pull/1129) by [@tiangolo](https://github.com/tiangolo).
* 🎨 Format with Biome . PR [#1097](https://github.com/tiangolo/full-stack-fastapi-template/pull/1097) by [@alejsdev](https://github.com/alejsdev).
* 🎨 Update quote style in biome formatter. PR [#1095](https://github.com/tiangolo/full-stack-fastapi-template/pull/1095) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Replace ESLint and Prettier with Biome to format and lint frontend. PR [#719](https://github.com/tiangolo/full-stack-fastapi-template/pull/719) by [@santigandolfo](https://github.com/santigandolfo).
* 🎨 Replace buttons styling for variants for consistency. PR [#722](https://github.com/tiangolo/full-stack-fastapi-template/pull/722) by [@alejsdev](https://github.com/alejsdev).
* 🛠️ Improve `modify-openapi-operationids.js`. PR [#720](https://github.com/tiangolo/full-stack-fastapi-template/pull/720) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Replace pytest-mock with unittest.mock and remove pytest-cov. PR [#717](https://github.com/tiangolo/full-stack-fastapi-template/pull/717) by [@estebanx64](https://github.com/estebanx64).
* 🛠️ Minor changes in frontend. PR [#715](https://github.com/tiangolo/full-stack-fastapi-template/pull/715) by [@alejsdev](https://github.com/alejsdev).
* ♻ Update Docker image to prevent errors in M1 Macs. PR [#710](https://github.com/tiangolo/full-stack-fastapi-template/pull/710) by [@dudil](https://github.com/dudil).
* ✏ Fix typo in variable names in `backend/app/api/routes/items.py` and `backend/app/api/routes/users.py`. PR [#711](https://github.com/tiangolo/full-stack-fastapi-template/pull/711) by [@disrupted](https://github.com/disrupted).

### Upgrades

* ⬆️ Update SQLModel to version `>=0.0.21`. PR [#1275](https://github.com/tiangolo/full-stack-fastapi-template/pull/1275) by [@alejsdev](https://github.com/alejsdev).
* ⬆️ Upgrade Traefik. PR [#1241](https://github.com/tiangolo/full-stack-fastapi-template/pull/1241) by [@tiangolo](https://github.com/tiangolo).
* ⬆️ Bump requests from 2.31.0 to 2.32.0 in /backend. PR [#1211](https://github.com/tiangolo/full-stack-fastapi-template/pull/1211) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆️ Bump jinja2 from 3.1.3 to 3.1.4 in /backend. PR [#1196](https://github.com/tiangolo/full-stack-fastapi-template/pull/1196) by [@dependabot[bot]](https://github.com/apps/dependabot).
* Bump gunicorn from 21.2.0 to 22.0.0 in /backend. PR [#1176](https://github.com/tiangolo/full-stack-fastapi-template/pull/1176) by [@dependabot[bot]](https://github.com/apps/dependabot).
* Bump idna from 3.6 to 3.7 in /backend. PR [#1168](https://github.com/tiangolo/full-stack-fastapi-template/pull/1168) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 🆙 Update React Query to TanStack Query. PR [#1153](https://github.com/tiangolo/full-stack-fastapi-template/pull/1153) by [@patrick91](https://github.com/patrick91).
* Bump vite from 5.0.12 to 5.0.13 in /frontend. PR [#1149](https://github.com/tiangolo/full-stack-fastapi-template/pull/1149) by [@dependabot[bot]](https://github.com/apps/dependabot).
* Bump follow-redirects from 1.15.5 to 1.15.6 in /frontend. PR [#734](https://github.com/tiangolo/full-stack-fastapi-template/pull/734) by [@dependabot[bot]](https://github.com/apps/dependabot).

### Docs

* 📝 Update links from tiangolo repo to fastapi org repo. PR [#1285](https://github.com/fastapi/full-stack-fastapi-template/pull/1285) by [@tiangolo](https://github.com/tiangolo).
* 📝 Add End-to-End Testing with Playwright to frontend `README.md`. PR [#1279](https://github.com/tiangolo/full-stack-fastapi-template/pull/1279) by [@alejsdev](https://github.com/alejsdev).
* 📝 Update release-notes.md. PR [#1220](https://github.com/tiangolo/full-stack-fastapi-template/pull/1220) by [@alejsdev](https://github.com/alejsdev).
* ✏️ Update `README.md`. PR [#1205](https://github.com/tiangolo/full-stack-fastapi-template/pull/1205) by [@Craz1k0ek](https://github.com/Craz1k0ek).
* ✏️ Fix Adminer URL in `deployment.md`. PR [#1194](https://github.com/tiangolo/full-stack-fastapi-template/pull/1194) by [@PhilippWu](https://github.com/PhilippWu).
* 📝 Add `Enabling Open User Registration` to backend docs. PR [#1191](https://github.com/tiangolo/full-stack-fastapi-template/pull/1191) by [@alejsdev](https://github.com/alejsdev).
* 📝 Update release-notes.md. PR [#1164](https://github.com/tiangolo/full-stack-fastapi-template/pull/1164) by [@alejsdev](https://github.com/alejsdev).
* 📝 Update `README.md`. PR [#716](https://github.com/tiangolo/full-stack-fastapi-template/pull/716) by [@alejsdev](https://github.com/alejsdev).
* 📝 Update instructions to clone for a private repo, including updates. PR [#1127](https://github.com/tiangolo/full-stack-fastapi-template/pull/1127) by [@tiangolo](https://github.com/tiangolo).
* 📝 Add docs about CI keys, LATEST_CHANGES and SMOKESHOW_AUTH_KEY. PR [#1126](https://github.com/tiangolo/full-stack-fastapi-template/pull/1126) by [@tiangolo](https://github.com/tiangolo).
* ✏️ Fix file path in `backend/README.md` when not wanting to use migrations. PR [#1116](https://github.com/tiangolo/full-stack-fastapi-template/pull/1116) by [@leonlowitzki](https://github.com/leonlowitzki).
* 📝 Add documentation for pre-commit and code linting. PR [#718](https://github.com/tiangolo/full-stack-fastapi-template/pull/718) by [@estebanx64](https://github.com/estebanx64).
* 📝 Fix localhost URLs in `development.md`. PR [#1099](https://github.com/tiangolo/full-stack-fastapi-template/pull/1099) by [@efonte](https://github.com/efonte).
* ✏ Update header titles for consistency. PR [#708](https://github.com/tiangolo/full-stack-fastapi-template/pull/708) by [@codesmith-emmy](https://github.com/codesmith-emmy).
* 📝 Update `README.md`, dark mode screenshot position. PR [#706](https://github.com/tiangolo/full-stack-fastapi-template/pull/706) by [@alejsdev](https://github.com/alejsdev).

### Internal

* 🔧 Update deploy workflows to exclude the main repository. PR [#1284](https://github.com/tiangolo/full-stack-fastapi-template/pull/1284) by [@alejsdev](https://github.com/alejsdev).
* 👷 Update issue-manager.yml GitHub Action permissions. PR [#1278](https://github.com/tiangolo/full-stack-fastapi-template/pull/1278) by [@tiangolo](https://github.com/tiangolo).
* ⬆️ Bump setuptools from 69.1.1 to 70.0.0 in /backend. PR [#1255](https://github.com/tiangolo/full-stack-fastapi-template/pull/1255) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆️ Bump certifi from 2024.2.2 to 2024.7.4 in /backend. PR [#1250](https://github.com/tiangolo/full-stack-fastapi-template/pull/1250) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆️ Bump urllib3 from 2.2.1 to 2.2.2 in /backend. PR [#1235](https://github.com/tiangolo/full-stack-fastapi-template/pull/1235) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 🔧 Ignore `src/routeTree.gen.ts` in biome. PR [#1175](https://github.com/tiangolo/full-stack-fastapi-template/pull/1175) by [@patrick91](https://github.com/patrick91).
* 👷 Update Smokeshow download artifact GitHub Action. PR [#1198](https://github.com/tiangolo/full-stack-fastapi-template/pull/1198) by [@tiangolo](https://github.com/tiangolo).
* 🔧 Update Node.js version in `.nvmrc`. PR [#1192](https://github.com/tiangolo/full-stack-fastapi-template/pull/1192) by [@alejsdev](https://github.com/alejsdev).
* 🔥 Remove ESLint and Prettier from pre-commit config. PR [#1096](https://github.com/tiangolo/full-stack-fastapi-template/pull/1096) by [@alejsdev](https://github.com/alejsdev).
* 🔧 Update mypy config to ignore .venv directories. PR [#1155](https://github.com/tiangolo/full-stack-fastapi-template/pull/1155) by [@tiangolo](https://github.com/tiangolo).
* 🚨 Enable `ARG001` to prevent unused arguments. PR [#1152](https://github.com/tiangolo/full-stack-fastapi-template/pull/1152) by [@patrick91](https://github.com/patrick91).
* 🔥 Remove isort configuration, since we use Ruff now. PR [#1144](https://github.com/tiangolo/full-stack-fastapi-template/pull/1144) by [@patrick91](https://github.com/patrick91).
* 🔧 Update pre-commit config to exclude generated client folder. PR [#1150](https://github.com/tiangolo/full-stack-fastapi-template/pull/1150) by [@alejsdev](https://github.com/alejsdev).
* 🔧 Change `.nvmrc` format. PR [#1148](https://github.com/tiangolo/full-stack-fastapi-template/pull/1148) by [@patrick91](https://github.com/patrick91).
* 🎨 Ignore alembic from ruff lint and format. PR [#1131](https://github.com/tiangolo/full-stack-fastapi-template/pull/1131) by [@estebanx64](https://github.com/estebanx64).
* 🔧 Add GitHub templates for discussions and issues, and security policy. PR [#1105](https://github.com/tiangolo/full-stack-fastapi-template/pull/1105) by [@alejsdev](https://github.com/alejsdev).
* ⬆ Bump dawidd6/action-download-artifact from 3.1.2 to 3.1.4. PR [#1103](https://github.com/tiangolo/full-stack-fastapi-template/pull/1103) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 🔧 Add Biome to pre-commit config. PR [#1098](https://github.com/tiangolo/full-stack-fastapi-template/pull/1098) by [@alejsdev](https://github.com/alejsdev).
* 🔥 Delete leftover celery file. PR [#727](https://github.com/tiangolo/full-stack-fastapi-template/pull/727) by [@dr-neptune](https://github.com/dr-neptune).
* ⚙️ Update pre-commit config with Prettier and ESLint. PR [#714](https://github.com/tiangolo/full-stack-fastapi-template/pull/714) by [@alejsdev](https://github.com/alejsdev).

## 0.6.0

Latest FastAPI, Pydantic, SQLModel 🚀

Brand new frontend with React, TS, Vite, Chakra UI, TanStack Query/Router, generated client/SDK 🎨

CI/CD - GitHub Actions 🤖

Test cov > 90% ✅

### Features

* ✨ Adopt SQLModel, create models, start using it. PR [#559](https://github.com/tiangolo/full-stack-fastapi-template/pull/559) by [@tiangolo](https://github.com/tiangolo).
* ✨ Upgrade items router with new SQLModel models, simplified logic, and new FastAPI Annotated dependencies. PR [#560](https://github.com/tiangolo/full-stack-fastapi-template/pull/560) by [@tiangolo](https://github.com/tiangolo).
* ✨ Migrate from pgAdmin to Adminer. PR [#692](https://github.com/tiangolo/full-stack-fastapi-template/pull/692) by [@tiangolo](https://github.com/tiangolo).
* ✨ Add support for setting `POSTGRES_PORT`. PR [#333](https://github.com/tiangolo/full-stack-fastapi-template/pull/333) by [@uepoch](https://github.com/uepoch).
* ⬆ Upgrade Flower version and command. PR [#447](https://github.com/tiangolo/full-stack-fastapi-template/pull/447) by [@maurob](https://github.com/maurob).
* 🎨 Improve styles. PR [#673](https://github.com/tiangolo/full-stack-fastapi-template/pull/673) by [@alejsdev](https://github.com/alejsdev).
* 🎨 Update theme. PR [#666](https://github.com/tiangolo/full-stack-fastapi-template/pull/666) by [@alejsdev](https://github.com/alejsdev).
* 👷 Add continuous deployment and refactors needed for it. PR [#667](https://github.com/tiangolo/full-stack-fastapi-template/pull/667) by [@tiangolo](https://github.com/tiangolo).
* ✨ Create endpoint to show password recovery email content and update email template. PR [#664](https://github.com/tiangolo/full-stack-fastapi-template/pull/664) by [@alejsdev](https://github.com/alejsdev).
* 🎨 Format with Prettier. PR [#646](https://github.com/tiangolo/full-stack-fastapi-template/pull/646) by [@alejsdev](https://github.com/alejsdev).
* ✅ Add tests to raise coverage to at least 90% and fix recover password logic. PR [#632](https://github.com/tiangolo/full-stack-fastapi-template/pull/632) by [@estebanx64](https://github.com/estebanx64).
* ⚙️ Add Prettier and ESLint config with pre-commit. PR [#640](https://github.com/tiangolo/full-stack-fastapi-template/pull/640) by [@alejsdev](https://github.com/alejsdev).
* 👷 Add coverage with Smokeshow to CI and badge. PR [#638](https://github.com/tiangolo/full-stack-fastapi-template/pull/638) by [@estebanx64](https://github.com/estebanx64).
* ✨ Migrate to TanStack Query (React Query) and TanStack Router. PR [#637](https://github.com/tiangolo/full-stack-fastapi-template/pull/637) by [@alejsdev](https://github.com/alejsdev).
* ✅ Add setup and teardown database for tests. PR [#626](https://github.com/tiangolo/full-stack-fastapi-template/pull/626) by [@estebanx64](https://github.com/estebanx64).
* ✨ Update new-frontend client. PR [#625](https://github.com/tiangolo/full-stack-fastapi-template/pull/625) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add password reset functionality. PR [#624](https://github.com/tiangolo/full-stack-fastapi-template/pull/624) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add private/public routing. PR [#621](https://github.com/tiangolo/full-stack-fastapi-template/pull/621) by [@alejsdev](https://github.com/alejsdev).
* 🔧 Add VS Code debug configs. PR [#620](https://github.com/tiangolo/full-stack-fastapi-template/pull/620) by [@tiangolo](https://github.com/tiangolo).
* ✨ Add `Not Found` page. PR [#595](https://github.com/tiangolo/full-stack-fastapi-template/pull/595) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add new pages, components, panels, modals, and theme; refactor and improvements in existing components. PR [#593](https://github.com/tiangolo/full-stack-fastapi-template/pull/593) by [@alejsdev](https://github.com/alejsdev).
* ✨ Support delete own account and other tweaks. PR [#614](https://github.com/tiangolo/full-stack-fastapi-template/pull/614) by [@alejsdev](https://github.com/alejsdev).
* ✨ Restructure folders, allow editing of users/items, and implement other refactors and improvements. PR [#603](https://github.com/tiangolo/full-stack-fastapi-template/pull/603) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add Copier, migrate from Cookiecutter, in a way that supports using the project as is, forking or cloning it. PR [#612](https://github.com/tiangolo/full-stack-fastapi-template/pull/612) by [@tiangolo](https://github.com/tiangolo).
* ➕ Replace black, isort, flake8, autoflake with ruff and upgrade mypy. PR [#610](https://github.com/tiangolo/full-stack-fastapi-template/pull/610) by [@tiangolo](https://github.com/tiangolo).
* ♻ Refactor items and services endpoints to return count and data, and add CI tests. PR [#599](https://github.com/tiangolo/full-stack-fastapi-template/pull/599) by [@estebanx64](https://github.com/estebanx64).
* ✨ Add support for updating items and upgrade SQLModel to 0.0.16 (which supports model object updates). PR [#601](https://github.com/tiangolo/full-stack-fastapi-template/pull/601) by [@tiangolo](https://github.com/tiangolo).
* ✨ Add dark mode to new-frontend and conditional sidebar items. PR [#600](https://github.com/tiangolo/full-stack-fastapi-template/pull/600) by [@alejsdev](https://github.com/alejsdev).
* ✨ Migrate to RouterProvider and other refactors . PR [#598](https://github.com/tiangolo/full-stack-fastapi-template/pull/598) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add delete_user; refactor delete_item. PR [#594](https://github.com/tiangolo/full-stack-fastapi-template/pull/594) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add state store to new frontend. PR [#592](https://github.com/tiangolo/full-stack-fastapi-template/pull/592) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add form validation to Admin, Items and Login. PR [#616](https://github.com/tiangolo/full-stack-fastapi-template/pull/616) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add Sidebar to new frontend. PR [#587](https://github.com/tiangolo/full-stack-fastapi-template/pull/587) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add Login to new frontend. PR [#585](https://github.com/tiangolo/full-stack-fastapi-template/pull/585) by [@alejsdev](https://github.com/alejsdev).
* ✨ Include schemas in generated frontend client. PR [#584](https://github.com/tiangolo/full-stack-fastapi-template/pull/584) by [@alejsdev](https://github.com/alejsdev).
* ✨ Regenerate frontend client with recent changes. PR [#575](https://github.com/tiangolo/full-stack-fastapi-template/pull/575) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Refactor API in `utils.py`. PR [#573](https://github.com/tiangolo/full-stack-fastapi-template/pull/573) by [@alejsdev](https://github.com/alejsdev).
* ✨ Update code for login API. PR [#571](https://github.com/tiangolo/full-stack-fastapi-template/pull/571) by [@tiangolo](https://github.com/tiangolo).
* ✨ Add client in frontend and client generation. PR [#569](https://github.com/tiangolo/full-stack-fastapi-template/pull/569) by [@alejsdev](https://github.com/alejsdev).
* 🐳 Set up Docker config for new-frontend. PR [#564](https://github.com/tiangolo/full-stack-fastapi-template/pull/564) by [@alejsdev](https://github.com/alejsdev).
* ✨ Set up new frontend with Vite, TypeScript and React. PR [#563](https://github.com/tiangolo/full-stack-fastapi-template/pull/563) by [@alejsdev](https://github.com/alejsdev).
* 📌 Add NodeJS version management and instructions. PR [#551](https://github.com/tiangolo/full-stack-fastapi-template/pull/551) by [@alejsdev](https://github.com/alejsdev).
* Add consistent errors for env vars not set. PR [#200](https://github.com/tiangolo/full-stack-fastapi-template/pull/200).
* Upgrade Traefik to version 2, keeping in sync with DockerSwarm.rocks. PR [#199](https://github.com/tiangolo/full-stack-fastapi-template/pull/199).
* Run tests with `TestClient`. PR [#160](https://github.com/tiangolo/full-stack-fastapi-template/pull/160).

### Fixes

* 🐛 Fix copier to handle string vars with spaces in quotes. PR [#631](https://github.com/tiangolo/full-stack-fastapi-template/pull/631) by [@estebanx64](https://github.com/estebanx64).
* 🐛 Fix allowing a user to update the email to the same email they already have. PR [#696](https://github.com/tiangolo/full-stack-fastapi-template/pull/696) by [@alejsdev](https://github.com/alejsdev).
* 🐛 Set up Sentry only when used. PR [#671](https://github.com/tiangolo/full-stack-fastapi-template/pull/671) by [@tiangolo](https://github.com/tiangolo).
* 🔥 Remove unnecessary validation. PR [#662](https://github.com/tiangolo/full-stack-fastapi-template/pull/662) by [@alejsdev](https://github.com/alejsdev).
* 🐛 Fix bug when editing own user. PR [#651](https://github.com/tiangolo/full-stack-fastapi-template/pull/651) by [@alejsdev](https://github.com/alejsdev).
* 🐛  Add `onClose` to `SidebarItems`. PR [#589](https://github.com/tiangolo/full-stack-fastapi-template/pull/589) by [@alejsdev](https://github.com/alejsdev).
* 🐛 Fix positional argument bug in `init_db.py`. PR [#562](https://github.com/tiangolo/full-stack-fastapi-template/pull/562) by [@alejsdev](https://github.com/alejsdev).
* 📌 Fix flower Docker image, pin version. PR [#396](https://github.com/tiangolo/full-stack-fastapi-template/pull/396) by [@sanggusti](https://github.com/sanggusti).
* 🐛 Fix Celery worker command. PR [#443](https://github.com/tiangolo/full-stack-fastapi-template/pull/443) by [@bechtold](https://github.com/bechtold).
* 🐛 Fix Poetry installation in Dockerfile and upgrade Python version and packages to fix Docker build. PR [#480](https://github.com/tiangolo/full-stack-fastapi-template/pull/480) by [@little7Li](https://github.com/little7Li).

### Refactors

* 🔧 Add missing dotenv variables. PR [#554](https://github.com/tiangolo/full-stack-fastapi-template/pull/554) by [@tiangolo](https://github.com/tiangolo).
* ⏪ Revert "⚙️ Add Prettier and ESLint config with pre-commit". PR [#644](https://github.com/tiangolo/full-stack-fastapi-template/pull/644) by [@alejsdev](https://github.com/alejsdev).
* 🙈 Add .prettierignore and include client folder. PR [#648](https://github.com/tiangolo/full-stack-fastapi-template/pull/648) by [@alejsdev](https://github.com/alejsdev).
* 🏷️ Add mypy to the GitHub Action for tests and fixed types in the whole project. PR [#655](https://github.com/tiangolo/full-stack-fastapi-template/pull/655) by [@estebanx64](https://github.com/estebanx64).
* 🔒️ Ensure the default values of "changethis" are not deployed. PR [#698](https://github.com/tiangolo/full-stack-fastapi-template/pull/698) by [@tiangolo](https://github.com/tiangolo).
* ◀ Revert "📸 Rename Dashboard to Home and update screenshots". PR [#697](https://github.com/tiangolo/full-stack-fastapi-template/pull/697) by [@alejsdev](https://github.com/alejsdev).
* 📸 Rename Dashboard to Home and update screenshots. PR [#693](https://github.com/tiangolo/full-stack-fastapi-template/pull/693) by [@alejsdev](https://github.com/alejsdev).
* 🐛 Fixed items count when retrieving data for all items by user. PR [#695](https://github.com/tiangolo/full-stack-fastapi-template/pull/695) by [@estebanx64](https://github.com/estebanx64).
* 🔥 Remove Celery and Flower, they are currently not used nor recommended. PR [#694](https://github.com/tiangolo/full-stack-fastapi-template/pull/694) by [@tiangolo](https://github.com/tiangolo).
* ✅ Add test for deleting user without privileges. PR [#690](https://github.com/tiangolo/full-stack-fastapi-template/pull/690) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Refactor user update. PR [#689](https://github.com/tiangolo/full-stack-fastapi-template/pull/689) by [@alejsdev](https://github.com/alejsdev).
* 📌 Add Poetry lock to git. PR [#685](https://github.com/tiangolo/full-stack-fastapi-template/pull/685) by [@tiangolo](https://github.com/tiangolo).
* 🎨 Adjust color and spacing. PR [#684](https://github.com/tiangolo/full-stack-fastapi-template/pull/684) by [@alejsdev](https://github.com/alejsdev).
* 👷 Avoid creating unnecessary *.pyc files with PYTHONDONTWRITEBYTECODE=1. PR [#677](https://github.com/tiangolo/full-stack-fastapi-template/pull/677) by [@estebanx64](https://github.com/estebanx64).
* 🔧 Add `SMTP_SSL` option for older SMTP servers. PR [#365](https://github.com/tiangolo/full-stack-fastapi-template/pull/365) by [@Metrea](https://github.com/Metrea).
* ♻️ Refactor logic to allow running pytest tests locally. PR [#683](https://github.com/tiangolo/full-stack-fastapi-template/pull/683) by [@tiangolo](https://github.com/tiangolo).
* ♻ Update error messages. PR [#417](https://github.com/tiangolo/full-stack-fastapi-template/pull/417) by [@qu3vipon](https://github.com/qu3vipon).
* 🔧 Add a default Flower password. PR [#682](https://github.com/tiangolo/full-stack-fastapi-template/pull/682) by [@tiangolo](https://github.com/tiangolo).
* 🔧 Update VS Code debug config. PR [#676](https://github.com/tiangolo/full-stack-fastapi-template/pull/676) by [@tiangolo](https://github.com/tiangolo).
* ♻️ Refactor code structure for tests. PR [#674](https://github.com/tiangolo/full-stack-fastapi-template/pull/674) by [@tiangolo](https://github.com/tiangolo).
* 🔧 Set TanStack Router devtools only in dev mode. PR [#668](https://github.com/tiangolo/full-stack-fastapi-template/pull/668) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Refactor email logic to allow re-using util functions for testing and development. PR [#663](https://github.com/tiangolo/full-stack-fastapi-template/pull/663) by [@tiangolo](https://github.com/tiangolo).
* 💬 Improve Delete Account description and confirmation. PR [#661](https://github.com/tiangolo/full-stack-fastapi-template/pull/661) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Refactor email templates. PR [#659](https://github.com/tiangolo/full-stack-fastapi-template/pull/659) by [@alejsdev](https://github.com/alejsdev).
* 📝 Update deployment files and docs. PR [#660](https://github.com/tiangolo/full-stack-fastapi-template/pull/660) by [@tiangolo](https://github.com/tiangolo).
* 🔥 Remove unused schemas. PR [#656](https://github.com/tiangolo/full-stack-fastapi-template/pull/656) by [@alejsdev](https://github.com/alejsdev).
* 🔥 Remove old frontend. PR [#649](https://github.com/tiangolo/full-stack-fastapi-template/pull/649) by [@tiangolo](https://github.com/tiangolo).
* ♻ Move project source files to top level from src, update Sentry dependency. PR [#630](https://github.com/tiangolo/full-stack-fastapi-template/pull/630) by [@estebanx64](https://github.com/estebanx64).
* ♻ Refactor Python folder tree. PR [#629](https://github.com/tiangolo/full-stack-fastapi-template/pull/629) by [@estebanx64](https://github.com/estebanx64).
* ♻️ Refactor old CRUD utils and tests. PR [#622](https://github.com/tiangolo/full-stack-fastapi-template/pull/622) by [@alejsdev](https://github.com/alejsdev).
* 🔧 Update .env to allow local debug for the backend. PR [#618](https://github.com/tiangolo/full-stack-fastapi-template/pull/618) by [@tiangolo](https://github.com/tiangolo).
* ♻️ Refactor and update CORS, remove trailing slash from new Pydantic v2. PR [#617](https://github.com/tiangolo/full-stack-fastapi-template/pull/617) by [@tiangolo](https://github.com/tiangolo).
* 🎨 Format files with pre-commit and Ruff. PR [#611](https://github.com/tiangolo/full-stack-fastapi-template/pull/611) by [@tiangolo](https://github.com/tiangolo).
* 🚚 Refactor and simplify backend file structure. PR [#609](https://github.com/tiangolo/full-stack-fastapi-template/pull/609) by [@tiangolo](https://github.com/tiangolo).
* 🔥 Clean up old files no longer relevant. PR [#608](https://github.com/tiangolo/full-stack-fastapi-template/pull/608) by [@tiangolo](https://github.com/tiangolo).
* ♻ Re-structure Docker Compose files, discard Docker Swarm specific logic. PR [#607](https://github.com/tiangolo/full-stack-fastapi-template/pull/607) by [@tiangolo](https://github.com/tiangolo).
* ♻️ Refactor update endpoints and regenerate client for new-frontend. PR [#602](https://github.com/tiangolo/full-stack-fastapi-template/pull/602) by [@alejsdev](https://github.com/alejsdev).
* ✨ Add Layout to App. PR [#588](https://github.com/tiangolo/full-stack-fastapi-template/pull/588) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Re-enable user update path operations for frontend client generation. PR [#574](https://github.com/tiangolo/full-stack-fastapi-template/pull/574) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Remove type ignores and add `response_model`. PR [#572](https://github.com/tiangolo/full-stack-fastapi-template/pull/572) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Refactor Users API and dependencies. PR [#561](https://github.com/tiangolo/full-stack-fastapi-template/pull/561) by [@alejsdev](https://github.com/alejsdev).
* ♻️ Refactor frontend Docker build setup, use plain NodeJS, use custom Nginx config, fix build for old Vue. PR [#555](https://github.com/tiangolo/full-stack-fastapi-template/pull/555) by [@tiangolo](https://github.com/tiangolo).
* ♻️ Refactor project generation, discard cookiecutter, use plain git/clone/fork. PR [#553](https://github.com/tiangolo/full-stack-fastapi-template/pull/553) by [@tiangolo](https://github.com/tiangolo).
* Refactor backend:
    * Simplify configs for tools and format to better support editor integration.
    * Add mypy configurations and plugins.
    * Add types to all the codebase.
    * Update types for SQLAlchemy models with plugin.
    * Update and refactor CRUD utils.
    * Refactor DB sessions to use dependencies with `yield`.
    * Refactor dependencies, security, CRUD, models, schemas, etc. To simplify code and improve autocompletion.
    * Change from PyJWT to Python-JOSE as it supports additional use cases.
    * Fix JWT tokens using user email/ID as the subject in `sub`.
    * PR [#158](https://github.com/tiangolo/full-stack-fastapi-template/pull/158).
* Simplify `docker-compose.*.yml` files, refactor deployment to reduce config files. PR [#153](https://github.com/tiangolo/full-stack-fastapi-template/pull/153).
* Simplify env var files, merge to a single `.env` file. PR [#151](https://github.com/tiangolo/full-stack-fastapi-template/pull/151).

### Upgrades

* 📌 Upgrade Poetry lock dependencies. PR [#702](https://github.com/tiangolo/full-stack-fastapi-template/pull/702) by [@tiangolo](https://github.com/tiangolo).
* ⬆️ Upgrade Python version and dependencies. PR [#558](https://github.com/tiangolo/full-stack-fastapi-template/pull/558) by [@tiangolo](https://github.com/tiangolo).
* ⬆ Bump tiangolo/issue-manager from 0.2.0 to 0.5.0. PR [#591](https://github.com/tiangolo/full-stack-fastapi-template/pull/591) by [@dependabot[bot]](https://github.com/apps/dependabot).
* Bump follow-redirects from 1.15.3 to 1.15.5 in /frontend. PR [#654](https://github.com/tiangolo/full-stack-fastapi-template/pull/654) by [@dependabot[bot]](https://github.com/apps/dependabot).
* Bump vite from 5.0.4 to 5.0.12 in /frontend. PR [#653](https://github.com/tiangolo/full-stack-fastapi-template/pull/653) by [@dependabot[bot]](https://github.com/apps/dependabot).
* Bump fastapi from 0.104.1 to 0.109.1 in /backend. PR [#687](https://github.com/tiangolo/full-stack-fastapi-template/pull/687) by [@dependabot[bot]](https://github.com/apps/dependabot).
* Bump python-multipart from 0.0.6 to 0.0.7 in /backend. PR [#686](https://github.com/tiangolo/full-stack-fastapi-template/pull/686) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Add `uvicorn[standard]` to include `watchgod` and `uvloop`. PR [#438](https://github.com/tiangolo/full-stack-fastapi-template/pull/438) by [@alonme](https://github.com/alonme).
* ⬆ Upgrade code to support pydantic V2. PR [#615](https://github.com/tiangolo/full-stack-fastapi-template/pull/615) by [@estebanx64](https://github.com/estebanx64).

### Docs

* 🦇 Add dark mode to `README.md`. PR [#703](https://github.com/tiangolo/full-stack-fastapi-template/pull/703) by [@alejsdev](https://github.com/alejsdev).
* 🍱 Update GitHub image. PR [#701](https://github.com/tiangolo/full-stack-fastapi-template/pull/701) by [@tiangolo](https://github.com/tiangolo).
* 🍱 Add GitHub image. PR [#700](https://github.com/tiangolo/full-stack-fastapi-template/pull/700) by [@tiangolo](https://github.com/tiangolo).
* 🚚 Rename project to Full Stack FastAPI Template. PR [#699](https://github.com/tiangolo/full-stack-fastapi-template/pull/699) by [@tiangolo](https://github.com/tiangolo).
* 📝 Update `README.md`. PR [#691](https://github.com/tiangolo/full-stack-fastapi-template/pull/691) by [@alejsdev](https://github.com/alejsdev).
* ✏ Fix typo in `development.md`. PR [#309](https://github.com/tiangolo/full-stack-fastapi-template/pull/309) by [@graue70](https://github.com/graue70).
* 📝 Add docs for wildcard domains. PR [#681](https://github.com/tiangolo/full-stack-fastapi-template/pull/681) by [@tiangolo](https://github.com/tiangolo).
* 📝 Add the required GitHub Actions secrets to docs. PR [#679](https://github.com/tiangolo/full-stack-fastapi-template/pull/679) by [@tiangolo](https://github.com/tiangolo).
* 📝 Update `README.md` and `deployment.md`. PR [#678](https://github.com/tiangolo/full-stack-fastapi-template/pull/678) by [@alejsdev](https://github.com/alejsdev).
* 📝 Update frontend `README.md`. PR [#675](https://github.com/tiangolo/full-stack-fastapi-template/pull/675) by [@alejsdev](https://github.com/alejsdev).
* 📝 Update deployment docs to use a different directory for traefik-public. PR [#670](https://github.com/tiangolo/full-stack-fastapi-template/pull/670) by [@tiangolo](https://github.com/tiangolo).
* 📸 Add new screenshots . PR [#657](https://github.com/tiangolo/full-stack-fastapi-template/pull/657) by [@alejsdev](https://github.com/alejsdev).
* 📝 Refactor README into separate README.md files for backend, frontend, deployment, development. PR [#639](https://github.com/tiangolo/full-stack-fastapi-template/pull/639) by [@tiangolo](https://github.com/tiangolo).
* 📝 Update README. PR [#628](https://github.com/tiangolo/full-stack-fastapi-template/pull/628) by [@tiangolo](https://github.com/tiangolo).
* 👷 Update GitHub Action latest-changes and move release notes to independent file. PR [#619](https://github.com/tiangolo/full-stack-fastapi-template/pull/619) by [@tiangolo](https://github.com/tiangolo).
* 📝 Update internal README and referred files. PR [#613](https://github.com/tiangolo/full-stack-fastapi-template/pull/613) by [@tiangolo](https://github.com/tiangolo).
* 📝 Update README with in construction notice. PR [#552](https://github.com/tiangolo/full-stack-fastapi-template/pull/552) by [@tiangolo](https://github.com/tiangolo).
* Add docs about reporting test coverage in HTML. PR [#161](https://github.com/tiangolo/full-stack-fastapi-template/pull/161).
* Add docs about removing the frontend, for an API-only app. PR [#156](https://github.com/tiangolo/full-stack-fastapi-template/pull/156).

### Internal

* 👷 Add Lint to GitHub Actions outside of tests. PR [#688](https://github.com/tiangolo/full-stack-fastapi-template/pull/688) by [@tiangolo](https://github.com/tiangolo).
* ⬆ Bump dawidd6/action-download-artifact from 2.28.0 to 3.1.2. PR [#643](https://github.com/tiangolo/full-stack-fastapi-template/pull/643) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump actions/upload-artifact from 3 to 4. PR [#642](https://github.com/tiangolo/full-stack-fastapi-template/pull/642) by [@dependabot[bot]](https://github.com/apps/dependabot).
* ⬆ Bump actions/setup-python from 4 to 5. PR [#641](https://github.com/tiangolo/full-stack-fastapi-template/pull/641) by [@dependabot[bot]](https://github.com/apps/dependabot).
* 👷 Tweak test GitHub Action names. PR [#672](https://github.com/tiangolo/full-stack-fastapi-template/pull/672) by [@tiangolo](https://github.com/tiangolo).
* 🔧 Add `.gitattributes` file to ensure LF endings for `.sh` files. PR [#658](https://github.com/tiangolo/full-stack-fastapi-template/pull/658) by [@estebanx64](https://github.com/estebanx64).
* 🚚 Move new-frontend to frontend. PR [#652](https://github.com/tiangolo/full-stack-fastapi-template/pull/652) by [@alejsdev](https://github.com/alejsdev).
* 🔧 Add script for ESLint. PR [#650](https://github.com/tiangolo/full-stack-fastapi-template/pull/650) by [@alejsdev](https://github.com/alejsdev).
* ⚙️ Add Prettier config. PR [#647](https://github.com/tiangolo/full-stack-fastapi-template/pull/647) by [@alejsdev](https://github.com/alejsdev).
* 🔧 Update pre-commit config. PR [#645](https://github.com/tiangolo/full-stack-fastapi-template/pull/645) by [@alejsdev](https://github.com/alejsdev).
* 👷 Add dependabot. PR [#547](https://github.com/tiangolo/full-stack-fastapi-template/pull/547) by [@tiangolo](https://github.com/tiangolo).
* 👷 Fix latest-changes GitHub Action token, strike 2. PR [#546](https://github.com/tiangolo/full-stack-fastapi-template/pull/546) by [@tiangolo](https://github.com/tiangolo).
* 👷 Fix latest-changes GitHub Action token config. PR [#545](https://github.com/tiangolo/full-stack-fastapi-template/pull/545) by [@tiangolo](https://github.com/tiangolo).
* 👷 Add latest-changes GitHub Action. PR [#544](https://github.com/tiangolo/full-stack-fastapi-template/pull/544) by [@tiangolo](https://github.com/tiangolo).
* Update issue-manager. PR [#211](https://github.com/tiangolo/full-stack-fastapi-template/pull/211).
* Add [GitHub Sponsors](https://github.com/sponsors/tiangolo) button. PR [#201](https://github.com/tiangolo/full-stack-fastapi-template/pull/201).
* Simplify scripts and development, update docs and configs. PR [#155](https://github.com/tiangolo/full-stack-fastapi-template/pull/155).

## 0.5.0

* Make the Traefik public network a fixed default of `traefik-public` as done in DockerSwarm.rocks, to simplify development and iteration of the project generator. PR [#150](https://github.com/tiangolo/full-stack-fastapi-template/pull/150).
* Update to PostgreSQL 12. PR [#148](https://github.com/tiangolo/full-stack-fastapi-template/pull/148). by [@RCheese](https://github.com/RCheese).
* Use Poetry for package management. Initial PR [#144](https://github.com/tiangolo/full-stack-fastapi-template/pull/144) by [@RCheese](https://github.com/RCheese).
* Fix Windows line endings for shell scripts after project generation with Cookiecutter hooks. PR [#149](https://github.com/tiangolo/full-stack-fastapi-template/pull/149).
* Upgrade Vue CLI to version 4. PR [#120](https://github.com/tiangolo/full-stack-fastapi-template/pull/120) by [@br3ndonland](https://github.com/br3ndonland).
* Remove duplicate `login` tag. PR [#135](https://github.com/tiangolo/full-stack-fastapi-template/pull/135) by [@Nonameentered](https://github.com/Nonameentered).
* Fix showing email in dashboard when there's no user's full name. PR [#129](https://github.com/tiangolo/full-stack-fastapi-template/pull/129) by [@rlonka](https://github.com/rlonka).
* Format code with Black and Flake8. PR [#121](https://github.com/tiangolo/full-stack-fastapi-template/pull/121) by [@br3ndonland](https://github.com/br3ndonland).
* Simplify SQLAlchemy Base class. PR [#117](https://github.com/tiangolo/full-stack-fastapi-template/pull/117) by [@airibarne](https://github.com/airibarne).
* Update CRUD utils for users, handling password hashing. PR [#106](https://github.com/tiangolo/full-stack-fastapi-template/pull/106) by [@mocsar](https://github.com/mocsar).
* Use `.` instead of `source` for interoperability. PR [#98](https://github.com/tiangolo/full-stack-fastapi-template/pull/98) by [@gucharbon](https://github.com/gucharbon).
* Use Pydantic's `BaseSettings` for settings/configs and env vars. PR [#87](https://github.com/tiangolo/full-stack-fastapi-template/pull/87) by [@StephenBrown2](https://github.com/StephenBrown2).
* Remove `package-lock.json` to let everyone lock their own versions (depending on OS, etc).
* Simplify Traefik service labels PR [#139](https://github.com/tiangolo/full-stack-fastapi-template/pull/139).
* Add email validation. PR [#40](https://github.com/tiangolo/full-stack-fastapi-template/pull/40) by [@kedod](https://github.com/kedod).
* Fix typo in README. PR [#83](https://github.com/tiangolo/full-stack-fastapi-template/pull/83) by [@ashears](https://github.com/ashears).
* Fix typo in README. PR [#80](https://github.com/tiangolo/full-stack-fastapi-template/pull/80) by [@abjoker](https://github.com/abjoker).
* Fix function name `read_item` and response code. PR [#74](https://github.com/tiangolo/full-stack-fastapi-template/pull/74) by [@jcaguirre89](https://github.com/jcaguirre89).
* Fix typo in comment. PR [#70](https://github.com/tiangolo/full-stack-fastapi-template/pull/70) by [@daniel-butler](https://github.com/daniel-butler).
* Fix Flower Docker configuration. PR [#37](https://github.com/tiangolo/full-stack-fastapi-template/pull/37) by [@dmontagu](https://github.com/dmontagu).
* Add new CRUD utils based on DB and Pydantic models. Initial PR [#23](https://github.com/tiangolo/full-stack-fastapi-template/pull/23) by [@ebreton](https://github.com/ebreton).
* Add normal user testing Pytest fixture. PR [#20](https://github.com/tiangolo/full-stack-fastapi-template/pull/20) by [@ebreton](https://github.com/ebreton).

## 0.4.0

* Fix security on resetting a password. Receive token as body, not query. PR [#34](https://github.com/tiangolo/full-stack-fastapi-template/pull/34).

* Fix security on resetting a password. Receive it as body, not query. PR [#33](https://github.com/tiangolo/full-stack-fastapi-template/pull/33) by [@dmontagu](https://github.com/dmontagu).

* Fix SQLAlchemy class lookup on initialization. PR [#29](https://github.com/tiangolo/full-stack-fastapi-template/pull/29) by [@ebreton](https://github.com/ebreton).

* Fix SQLAlchemy operation errors on database restart. PR [#32](https://github.com/tiangolo/full-stack-fastapi-template/pull/32) by [@ebreton](https://github.com/ebreton).

* Fix locations of scripts in generated README. PR [#19](https://github.com/tiangolo/full-stack-fastapi-template/pull/19) by [@ebreton](https://github.com/ebreton).

* Forward arguments from script to `pytest` inside container. PR [#17](https://github.com/tiangolo/full-stack-fastapi-template/pull/17) by [@ebreton](https://github.com/ebreton).

* Update development scripts.

* Read Alembic configs from env vars. PR <a href="https://github.com/tiangolo/full-stack-fastapi-template/pull/9" target="_blank">#9</a> by <a href="https://github.com/ebreton" target="_blank">@ebreton</a>.

* Create DB Item objects from all Pydantic model's fields.

* Update Jupyter Lab installation and util script/environment variable for local development.

## 0.3.0

* PR <a href="https://github.com/tiangolo/full-stack-fastapi-template/pull/14" target="_blank">#14</a>:
    * Update CRUD utils to use types better.
    * Simplify Pydantic model names, from `UserInCreate` to `UserCreate`, etc.
    * Upgrade packages.
    * Add new generic "Items" models, crud utils, endpoints, and tests. To facilitate re-using them to create new functionality. As they are simple and generic (not like Users), it's easier to copy-paste and adapt them to each use case.
    * Update endpoints/*path operations* to simplify code and use new utilities, prefix and tags in `include_router`.
    * Update testing utils.
    * Update linting rules, relax vulture to reduce false positives.
    * Update migrations to include new Items.
    * Update project README.md with tips about how to start with backend.

* Upgrade Python to 3.7 as Celery is now compatible too. PR <a href="https://github.com/tiangolo/full-stack-fastapi-template/pull/10" target="_blank">#10</a> by <a href="https://github.com/ebreton" target="_blank">@ebreton</a>.

## 0.2.2

* Fix frontend hijacking /docs in development. Using latest https://github.com/tiangolo/node-frontend with custom Nginx configs in frontend. <a href="https://github.com/tiangolo/full-stack-fastapi-template/pull/6" target="_blank">PR #6</a>.

## 0.2.1

* Fix documentation for *path operation* to get user by ID. <a href="https://github.com/tiangolo/full-stack-fastapi-template/pull/4" target="_blank">PR #4</a> by <a href="https://github.com/mpclarkson" target="_blank">@mpclarkson</a> in FastAPI.

* Set `/start-reload.sh` as a command override for development by default.

* Update generated README.

## 0.2.0

**<a href="https://github.com/tiangolo/full-stack-fastapi-template/pull/2" target="_blank">PR #2</a>**:

* Simplify and update backend `Dockerfile`s.
* Refactor and simplify backend code, improve naming, imports, modules and "namespaces".
* Improve and simplify Vuex integration with TypeScript accessors.
* Standardize frontend components layout, buttons order, etc.
* Add local development scripts (to develop this project generator itself).
* Add logs to startup modules to detect errors early.
* Improve FastAPI dependency utilities, to simplify and reduce code (to require a superuser).

## 0.1.2

* Fix path operation to update self-user, set parameters as body payload.

## 0.1.1

Several bug fixes since initial publication, including:

* Order of path operations for users.
* Frontend sending login data in the correct format.
* Add https://localhost variants to CORS.
````

## File: SECURITY.md
````markdown
# Security Policy

Security is very important for this project and its community. 🔒

Learn more about it below. 👇

## Versions

The latest version or release is supported.

You are encouraged to write tests for your application and update your versions frequently after ensuring that your tests are passing. This way you will benefit from the latest features, bug fixes, and **security fixes**.

## Reporting a Vulnerability

If you think you found a vulnerability, and even if you are not sure about it, please report it right away by sending an email to: security@tiangolo.com. Please try to be as explicit as possible, describing all the steps and example code to reproduce the security issue.

I (the author, [@tiangolo](https://twitter.com/tiangolo)) will review it thoroughly and get back to you.

## Public Discussions

Please restrain from publicly discussing a potential security vulnerability. 🙊

It's better to discuss privately and try to find a solution first, to limit the potential impact as much as possible.

---

Thanks for your help!

The community and I thank you for that. 🙇
````
