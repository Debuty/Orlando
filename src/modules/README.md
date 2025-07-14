# Orlando Project - Modular Architecture

This project follows a modular architecture pattern with Arabic UI support and RTL layout. Each module represents a distinct feature domain.

## Module Structure

```
modules/
  ├── auth/                    # Authentication module
  │   ├── components/         # Login and Signup components
  │   ├── store/             # Auth state management
  │   ├── services/          # Auth API services
  │   ├── types/             # Auth related types
  │   └── utils/             # Auth helper functions
  │
  ├── chalets/                # Chalets module
  │   ├── components/         # Chalet listing and detail components
  │   ├── store/             # Chalets state and filters
  │   ├── services/          # Chalet data services
  │   ├── types/             # Chalet related types
  │   └── utils/             # Chalet helper functions
  │
  ├── services/               # Services module
  │   ├── components/         # Service listing components
  │   ├── store/             # Services state
  │   ├── services/          # Services API integration
  │   └── types/             # Service related types
  │
  ├── contact/                # Contact module
  │   ├── components/         # Contact form and info components
  │   ├── services/          # Contact form submission
  │   └── types/             # Contact related types
  │
  ├── faq/                    # FAQ module
  │   ├── components/         # FAQ components
  │   ├── store/             # FAQ state if needed
  │   └── types/             # FAQ related types
  │
  ├── about/                  # About module
  │   └── components/         # About page components
  │
  ├── layout/                 # Layout module
  │   ├── components/         # Common layout components
  │   │   ├── Header/        # Site header
  │   │   ├── Footer/        # Site footer
  │   │   ├── Sidebar/       # If needed
  │   │   └── Navigation/    # Navigation components
  │   └── types/             # Layout related types
  │
  └── shared/                 # Shared module
      ├── components/         # Common UI components
      │   ├── Button/        
      │   ├── Card/          
      │   ├── Input/         
      │   └── Typography/     # Text components with RTL support
      ├── hooks/             # Common hooks
      ├── utils/             # Shared utilities
      │   ├── rtl/           # RTL related utilities
      │   ├── api/           # API utilities
      │   └── validation/    # Form validation
      ├── styles/            # Shared styles
      │   ├── rtl/           # RTL specific styles
      │   └── themes/        # Theme configurations
      └── types/             # Shared type definitions
```

## Module Guidelines

1. Each module should be independent and encapsulated
2. Modules can only import from their own directory or the shared module
3. All UI components must support RTL layout
4. Follow the UI designs from the public folder images
5. Use Tailwind CSS for styling [[memory:3194476]]
6. Implement Redux state management where needed [[memory:2553822]]

## Feature-specific Guidelines

1. Auth Module:
   - Handle both login and signup flows
   - Manage user session state
   - Support form validation in Arabic

2. Chalets Module:
   - Implement listing and filtering
   - Support detailed view of each chalet
   - Handle booking/reservation flow if required

3. Services Module:
   - Display service categories
   - Support service details and booking

4. Layout Module:
   - Maintain consistent RTL layout
   - Handle responsive design
   - Manage navigation state

5. Shared Module:
   - Provide RTL-aware components
   - Handle common functionality
   - Maintain consistent styling 