# OpenClaw

Welcome to the OpenClaw project!

## AI Coding Assistant Configuration

This repository is configured for optimal use with AI coding assistants. The following configuration files have been set up:

### Configuration Files

| File | Purpose | AI Assistant |
|------|---------|--------------|
| `.claude/settings.json` | Main Claude Code configuration with permissions and context settings | Claude Code |
| `CLAUDE.md` | Project-level instructions for Claude Code | Claude Code |
| `.claudeignore` | Files to exclude from Claude Code context | Claude Code |
| `.github/copilot-instructions.md` | Repository-wide instructions for GitHub Copilot | GitHub Copilot |
| `.cursorrules` | Rules and guidelines for Cursor AI | Cursor AI |
| `.editorconfig` | Editor configuration for consistent code formatting | All editors/IDEs |
| `CONTRIBUTING.md` | Contribution guidelines including AI assistant usage | All contributors |

### How These Files Help

#### `.claude/settings.json`
- Defines permissions for file access and command execution
- Protects sensitive files (`.env`, keys, credentials)
- Specifies which commands can run automatically vs requiring confirmation
- Sets context ignore patterns to improve performance

#### `CLAUDE.md`
- Provides project-specific guidance to Claude Code
- Defines development workflow and standards
- Sets expectations for code quality and testing
- Establishes security requirements

#### `.github/copilot-instructions.md`
- Instructs GitHub Copilot on code generation standards
- Defines boundaries to prevent unwanted changes
- Sets security and testing requirements
- Provides project context for better suggestions

#### `.cursorrules`
- Establishes coding principles for Cursor AI
- Defines style guidelines
- Sets security and performance expectations
- Guides refactoring and testing practices

#### `.editorconfig`
- Ensures consistent formatting across all editors
- Defines indentation, line endings, and character encoding
- Works with all major IDEs and text editors

## Getting Started

1. Clone the repository
2. Your AI coding assistant will automatically detect the configuration files
3. The assistant will follow the defined guidelines when helping you code

## Security

The AI assistant configuration includes protections for:
- Environment variables and secrets (`.env*` files)
- Private keys and certificates (`*.pem`, `*.key`)
- Credentials directories
- Sensitive commands (`rm -rf`, `sudo`)

## Development

When working on this project with AI assistants:
- They will ask before installing new dependencies
- They will avoid modifying sensitive files
- They will follow the project's coding standards
- They will prioritize minimal, focused changes

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this project.

## License

[Add your license information here]

---

**Note**: The configuration files in this repository are designed to work with Claude Code, GitHub Copilot, Cursor AI, and other AI coding assistants. They help ensure consistent, secure, and high-quality code generation.
