# Double entry accounting demo

## References

- <https://stackoverflow.com/questions/59432964/relational-data-model-for-double-entry-accounting>

## Configure VSCode debugger for jest

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Current File",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": [
    "--runTestsByPath",
    "${relativeFile}",
    "--config",
    "jest.config.ts"
  ],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "windows": {
    "program": "${workspaceFolder}/node_modules/jest/bin/jest",
  }
}
```
