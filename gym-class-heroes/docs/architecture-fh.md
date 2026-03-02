# Architecture Overview

This document describes the architectural components I contributed to iteration 3 of the project. It explains the custom hook, service and repository; what they do, why the logic belongs there and where it is used in the app.

## Hooks

### _*useGroupData Hook*_

- This manages group related state and loads groups
- Provides addToGroup and removeFromGroup for updating arrays for resources such as athletesById
- Handles errors related to group operations.
- Group membership is affected by multiple pages so it centralizes state and updates logic.
- AthletesPage uses it to access groups and updates athlete membership.
- Used and shared across multiple pages

## Service

### _*athleteService*_

- Contains the business logic for athlete operations
- Provides fetch, create and delete athletes.
- Validates before sending data to repository
- Business logic belongs here as repository should not handle it
- Used in athletePage for loading, creating and deleting athletes
- Used in athleteForm for validation before form submission

## Repository

### _*athleteRepository*_

- Handles direct data access only for athletes
- Performs CRUD requests, such as GET, POST and DELETE
- This keeps service layer clean and focused solely to business logic.
- Used in athleteService.
