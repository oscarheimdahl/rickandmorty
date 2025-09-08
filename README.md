# RICK AND MORTY FRONT END 🥒

This is a frontend to display data from the [Rick and Morty API](https://rickandmortyapi.com/)

You can visit the deployed site [here!](https://oscarheimdahl.github.io/rickandmorty)

## Development

### Prerequisites

- `Node >18`
- `pnpm >9`

### Setup

- Install dependencies with `pnpm install`.
- Run the dev server with `pnpm dev`.
  - Visit the dev site at [localhost:5731](http://localhost:5173/).

### Design decisions

- **Hash routing** is being used to keep the application singlepage and not tricker a reroute. While still maintaining state in the URL, for easy sharing or persistance on refresh.
- **Component based** the application is being split into components, with rerendering with different state being done by removing the component completely and rerendering it with new state.

### Misc

- The word entity is being used in the code base to collectively refer to the three different data types being returned from the api:
  _characters_, _locations_, and _episodes_
