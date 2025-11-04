import type { ApiEndpoint } from './types';

export const API_DOCUMENTATION_DATA: ApiEndpoint[] = [
  {
    title: 'Query: Get All Projects',
    description: 'Fetches a list of all projects, including their ID, name, and status. Useful for populating a main project dashboard.',
    query: `
query GetAllProjects {
  projects {
    id
    name
    status
  }
}
    `,
    response: `
{
  "data": {
    "projects": [
      {
        "id": "proj-123",
        "name": "Lausitz Rockt Festival 2025",
        "status": "In Progress"
      },
      {
        "id": "proj-456",
        "name": "Corporate Gala Event",
        "status": "Completed"
      }
    ]
  }
}
    `
  },
  {
    title: 'Query: Get Project Details',
    description: 'Retrieves detailed information for a single project by its ID, including assigned materials and personnel.',
    query: `
query GetProjectDetails($projectId: ID!) {
  project(id: $projectId) {
    id
    name
    description
    status
    budget
    materials {
      id
      name
      quantity
    }
    personnel {
      id
      name
      role
    }
  }
}
    `,
    response: `
{
  "data": {
    "project": {
      "id": "proj-123",
      "name": "Lausitz Rockt Festival 2025",
      "description": "Annual rock festival...",
      "status": "In Progress",
      "budget": 50000.00,
      "materials": [
        { "id": "mat-001", "name": "Stage Truss", "quantity": 50 },
        { "id": "mat-002", "name": "LED Wall P3", "quantity": 100 }
      ],
      "personnel": [
        { "id": "user-abc", "name": "Sandra Schulz", "role": "Lead Technician" }
      ]
    }
  }
}
    `
  },
  {
    title: 'Mutation: Create Project',
    description: 'Creates a new project with the provided input data. All inputs are validated on the server. Returns the newly created project object.',
    query: `
mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    name
    status
    createdAt
  }
}

// Example Variables:
// {
//   "input": {
//     "name": "New Tech Conference",
//     "description": "Annual conference for tech enthusiasts.",
//     "budget": 75000,
//     "startDate": "2026-05-10"
//   }
// }
    `,
    response: `
{
  "data": {
    "createProject": {
      "id": "proj-789",
      "name": "New Tech Conference",
      "status": "Planning",
      "createdAt": "2024-10-27T10:00:00Z"
    }
  }
}
    `
  },
  {
    title: 'Mutation: Create Project (Validation Error)',
    description: 'Demonstrates the server-side validation for mutations. If input data fails validation (e.g., a required field is missing or invalid), the API will return a standard GraphQL error response.',
    query: `
mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    name
  }
}

// Example Variables (with invalid data):
// {
//   "input": {
//     "name": "",
//     "description": "A project with an invalid name.",
//     "budget": -100
//   }
// }
    `,
    response: `
{
  "errors": [
    {
      "message": "Input validation failed",
      "extensions": {
        "code": "BAD_USER_INPUT",
        "validationErrors": [
          "name should not be empty",
          "budget must be a positive number"
        ]
      }
    }
  ],
  "data": null
}
    `
  }
];