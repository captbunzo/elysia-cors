# Publishing @captbunzo/elysia-cors

This guide will help you publish your fork of elysia-cors with async origin support.

## Prerequisites

1. You need an npm account. If you don't have one, create it at https://www.npmjs.com/signup
2. Make sure you have publishing permissions for the `@captbunzo` scope

## Publishing Steps

### 1. Login to npm
```bash
npm login
```
Enter your npm credentials when prompted.

### 2. Verify your login
```bash
npm whoami
```
This should return your npm username.

### 3. Publish the package
From the root of this repository, run:
```bash
npm publish --access public
```

The `--access public` flag is required for scoped packages to be publicly available.

### 4. Verify the publication
After publishing, you can verify it worked by:
- Checking https://www.npmjs.com/package/@captbunzo/elysia-cors
- Installing it in a test project: `bun add @captbunzo/elysia-cors`

## Alternative: Using the built-in release script

The package.json includes a release script that will build, test, and publish:
```bash
npm run release
```

## Package Information

- **Name**: `@captbunzo/elysia-cors`
- **Version**: `1.4.1`
- **Description**: Plugin for Elysia that for Cross Origin Requests (CORs) with async origin support
- **New Feature**: Async origin functions supporting `Promise<boolean | void>` returns

## Usage in Your Projects

After publishing, you can use it in your projects:

```bash
bun add @captbunzo/elysia-cors
```

```typescript
import { Elysia } from 'elysia'
import { cors } from '@captbunzo/elysia-cors'

const app = new Elysia()
    .use(cors({
        origin: async (request) => {
            const origin = request.headers.get('origin')
            // Perform async validation
            const isAllowed = await validateOriginAsync(origin)
            return isAllowed
        }
    }))
    .listen(3000)
```

## Switching Back to Official Package

Once the upstream PR #73 is merged and released by the maintainers, you can switch back:

```bash
bun remove @captbunzo/elysia-cors
bun add @elysiajs/cors
```

And update your import statements back to:
```typescript
import { cors } from '@elysiajs/cors'
```