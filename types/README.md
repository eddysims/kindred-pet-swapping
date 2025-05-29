# Shared Types

This directory contains shared TypeScript type definitions used across the project.

## Usage

Import types in your components like this:

```typescript
// In web components
import { Pet } from "@types";

// In mobile components
import { Pet } from "@types";
```

## Available Types

- `Pet`: The main pet data structure
- `PetStatus`: Union type for pet availability status ('available' | 'booked')
