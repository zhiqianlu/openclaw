# GitHub Copilot Instructions

## Project Context
This is the OpenClaw project. Follow these instructions for all code suggestions and completions.

## Boundaries & Constraints
- Only make changes explicitly requested by the developer
- Do not auto-refactor or optimize code unless asked
- Do not introduce new dependencies without explicit approval
- Preserve existing code style and patterns

## Code Quality
- Follow the project's existing code conventions
- Write self-documenting code with clear variable names
- Add comments only when explaining complex logic
- Keep functions small and focused

## Testing Requirements
- Include tests for all new functionality
- Follow the project's existing test patterns
- Ensure tests are maintainable and readable

## Security Requirements
- Never suggest hard-coded credentials or API keys
- Always validate and sanitize user inputs
- Follow OWASP security best practices
- Use parameterized queries for database operations

## Documentation
- Update relevant documentation when adding features
- Keep README.md current with setup instructions
- Document API changes in appropriate files

## Git Practices
- Write clear, descriptive commit messages
- Reference issue numbers when applicable
- Keep commits focused and atomic

## Error Handling
- Always handle errors gracefully
- Provide meaningful error messages
- Log errors appropriately for debugging
