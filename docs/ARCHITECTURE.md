# Proposed architecture

This is a design proposal, not implemented software.

## Local components

- **Workspace UI:** repository picker, task list, approval prompts, activity stream, and diff review.
- **Local coordinator:** a loopback-only service responsible for task state, provider calls, and cancellation.
- **Agent adapter:** one provider integration first, behind a small interface for text events and tool requests.
- **Tool broker:** validates file paths, gates shell commands, and records actual tool outcomes.
- **Git layer:** creates worktrees, captures base commits, and calculates diffs.
- **Task storage:** local SQLite database for task metadata and event history. Provider keys remain outside task records.

Candidate implementation: TypeScript for the coordinator, React for the workspace UI, and the chosen provider's official SDK. Decide supported runtime versions when implementation begins.

## Task state machine

`draft -> queued -> running -> awaiting_approval -> running -> awaiting_review`

Any active state can transition to `failed` or `cancelled`. Successful checks do not imply accepted changes. Review is a separate developer action.

## Boundaries to implement before running an agent

- Bind only to loopback; require a session token and validate Origin on mutating requests.
- Canonicalize paths, including symlinks, before enforcing worktree restrictions.
- A Git worktree separates changes but is not a security sandbox. Shell execution requires additional restrictions and explicit approval.
- Do not automatically run repository scripts on import.
- Store local API keys using an OS credential store or local environment configuration; never send them to the static website.
- Redact sensitive output and set practical command time and output limits.
- Treat repository text and tool output as untrusted context, not permission to run commands.
- Apply resource quotas and define cancellation behavior for child processes.

## Later cloud design

Use disposable execution environments with per-task credentials, bounded egress, compute quotas, and durable task events. Reuse the task/review interface without assuming a serverless website host can safely execute arbitrary repository commands.

The static marketing website remains separate from all execution services.
