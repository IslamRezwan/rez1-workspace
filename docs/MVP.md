# First release specification

## User and outcome

A developer with an existing local Git repository can delegate one small coding task and inspect the resulting changes and check output before keeping the work.

## Core journey

1. Select an existing Git repository.
2. Create a task with an objective and optional validation command.
3. Create a separate Git worktree and task branch from a selected base commit.
4. Start one agent session using a locally configured provider credential.
5. Stream file reads, proposed edits, tool requests, and command output.
6. Pause for approval before executing shell commands.
7. Present a diff and real validation results; never invent successful checks.
8. Let the developer inspect and retain or discard the task worktree. Do not merge or push automatically.

## Release acceptance criteria

- A fixture task can run from repository selection through a reviewable diff.
- The developer's original working tree and uncommitted changes are preserved.
- Cancellation stops further tool execution and reports remaining child processes.
- Failed checks, denied approvals, and provider errors remain visible.
- Secrets are excluded from logs and persisted task context.
- A task cannot silently write outside its allowed working directory.
- Approvals bind to the exact command, arguments, and working directory.
- Stale changes and interrupted tasks can be inspected without restarting an agent.

## Out of scope

Cloud workers, shared accounts, multiple simultaneous agents, automatic merging, marketplace integrations, remote repository credentials, and billing are not part of the first release.

## Product language

Until the criteria pass, describe the project as in development. Screenshots and illustrative task data are concepts, not evidence of a working runtime. Claude integration is planned; it is not currently implemented.
