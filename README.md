# Twinkl React Tech Test


## Task description
You are tasked with creating a React application that interacts with a Posts management API (https://jsonplaceholder.typicode.com/posts) to perform CRUD operations (Create, Read, Update, Delete). The application should be implemented using TypeScript and designed to be production-ready.

Refer to the guide on how to use the jsonplaceholder API:
https://jsonplaceholder.typicode.com/guide/

#### Time Limit: We don't expect you to spend longer than 3 hours on this task. If you'd like to capture any decisions, thoughts, or next steps you would take, feel free to do so.

#### Requirements
##### Fetch and display posts
- Implement a component that fetches the list of posts from https://jsonplaceholder.typicode.com/posts - [x]
- Display all fetched posts in a list format. - [x]

##### Search mechanism
- Implement a filtering field to search posts by  using the API request. The search should be triggered on change. - [x]

##### Delete post
- For each post in the list, provide a "Remove" button. - [x]
- Implement the functionality to delete a post when the "Remove" button is clicked, using the appropriate server-side REST API DELETE. - [x]

##### Testing
- Write sufficient tests to satisfy a production-ready application. - [x]

##### Documentation
- Add appropriate documentation for your application. - [ ]

#### Wireframes

##### Mobile
![mobile_view](src/assets/mobile_view.png?raw=true)
##### Desktop
![pc_view](src/assets/pc_view.png?raw=true)

## Getting Started
### Prerequisites
- Node.js: Ensure you have Node.js version 20 or higher installed.

### Installation

```
cd twinkl-react-tech-test
```

#### Install dependencies:
``` 
yarn
```

### Scripts
#### Development Server: Start the development server.
```
yarn dev
```

#### Lint: Lint the codebase.
```
yarn lint
```

#### Lint & Fix: Lint and automatically fix issues in the codebase.
```
yarn lint:fix
```

#### Format: Format the codebase using Prettier.
```
yarn format
```

#### Test: Run the test suite.
```
yarn test
```