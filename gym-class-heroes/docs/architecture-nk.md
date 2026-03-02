# Architecture Overview

This document describes the architectural components I contributed to iteration 3 of the project. It explains the custom hook, service and repository; what they do, why the logic belongs there and where it is used in the app.

## Hooks

### _*useFormInput Hook*_

- This manages form related state and change handlers.
- Provides value, onChange and reset functions.
- Handles errors related to form operations.
- Prevents repeated useState logic in every form.
- Ensures consistent validation behaviour across the project. 
- Used and shared across multiple pages.


## Service

### _*groupService*_

- Contains the business logic for group operations
- Provides fetch, create and delete group.
- Validates before sending data to repository
- Business logic belongs here as repository should not handle it
- Used in group hook for loading, creating and deleting groups

### _*coachesService*_

- Contains the business logic for coach operations
- Provides fetch, create and delete coaches.
- Validates before sending data to repository
- Business logic belongs here as repository should not handle it
- Used in coachesPage for loading, creating and deleting coaches
- Used in coachesForm for validation before form submission

## Repository

### _*groupRepository*_

- Handles direct data access only for groups
- Performs CRUD requests, such as GET, POST and DELETE
- This keeps service layer clean and focused solely to business logic.
- Used in groupService.

### _*coachesRepository*_

- Handles direct data access only for coaches
- Performs CRUD requests, such as GET, POST and DELETE
- This keeps service layer clean and focused solely to business logic.
- Used in coachesService.