# A Better Migration Framework (a.k.a. ABMF)

An agnostic framework to handle database maintainability needs, such as executing schema migrations, data seeding, and other type of time-based versioning operations.

## Table of Contents

- [A Better Migration Framework (a.k.a. ABMF)](#a-better-migration-framework-aka-abmf)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Features](#features)
  - [Architecture](#architecture)
  - [Usage](#usage)
    - [CLI](#cli)
    - [Programmatic](#programmatic)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

Explain how to install the project and any dependencies it may have. Provide step-by-step instructions or commands that users need to follow.

## Features

- ✅ CLI to execute migrations without requiring changes in your project's code-base
- ✅ Programmatic API to execute migrations by incluing the Migrator in your project's code-base
- Supports multiple ORMs / Datastores:
  - ✅ Mongoose / MongoDB

## Architecture

ABMF is designed to support multiple ORMs that could be added in the future. The core can be injected with the following dependencies: migrations provider, storage provider and context provider.

- Migrations Provider - this is responsible, as the name states, for providing migrations. This repository already contains a migrations provider for the File System (getting migrations from a folder) and in Memory (specially relevant if you wish to run your migrations within a test-suite for example). Other providers might arise later such as reading from an S3 bucket or an FTP server.
- Storage Provider - this is responsible for storing and retrieve the state of your project's environment executed migrations. On projects with a single datastore, the migrations state is saved within the same datastore, although, for distributed systems you might need to move data in between datastores, and the migrations storage might need to be place on a different datastore than the ones used by the service(s). ABMF allows you to define which datastore you want to use, as long as it supports it.
- Context Provider - this is responsible for determining the context which the migrations execute. This is highly relevant for decreasing the amount of imports each migration has, as for example, providing a connection to the datastore/orm being used. The context is highly customizable and separated from the Storage Provider so it could be composed to cover for the use cases commonly found on distributed projects.

If your project requires something unusual, you can extend ABMF to support it. If you decide to add a new piece heck the [Contributing](#contributing) so you can help ABMF frow.

## Usage

### CLI

The CLI allows you to interact with the migrations without requiring any written code aside from the migrations themselves.


### Programmatic

## Contributing

## License

Please read the [LICENSE file](./LICENSE)
