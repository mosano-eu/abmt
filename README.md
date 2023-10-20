# A Better Migration Tool (a.k.a. ABMF)

framework-agnostic migration to handle database maintainability needs, such as executing schema migrations, data seeding, and other type of time-based versioning operations.

> Notice: This project is in ALPHA stage. We're improving and keep releasing release candidates up until it's ready to be used in production.

## Table of Contents

- [A Better Migration Tool (a.k.a. ABMF)](#a-better-migration-tool-aka-abmf)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
    - [CLI](#cli)
    - [Programmatic](#programmatic)
  - [Architecture](#architecture)
  - [Packages](#packages)
  - [Usage](#usage)
    - [CLI](#cli-1)
    - [Programmatic](#programmatic-1)
  - [Contributing](#contributing)
  - [Alternatives](#alternatives)
  - [License](#license)

## Features

- 💻 Bult-in CLI to execute migrations
- 👨‍💻 Programmatic API to execute migrations
- 🗄 Database-agnostic. Supports multiple ORMs / Datastores:
  - Mongoose / MongoDB
- ✅ Written in Typescript
- ✅ Supports multiple storages for the migration data
- ✅ Supports multiple migration providers
- ✅ Supports custom contexts, so migrations can occur across multiple datastores
- 🧐 [Usage examples](./packages/cli/examples/)

## Installation

### CLI

```bash
cd ./path/to/your/project;

yarn add @abmf/cli @abmf/orm-mongoose;
yarn exec abmf --help;
```

### Programmatic

```bash
cd ./path/to/your/project;

yarn add @abmf/core @abmf/orm-mongoose @abmf/migrations-in-memory;
```

```typescript
// src/migrator.ts
import { Migrator } from '@abmf/core'
import { MongooseORM } from '@abmf/orm-mongoose'

///
// ORM - Storage and Context provider
//
const connection = createConnection('mongodb://127.0.0.1:27017/your-database-name');
// or
// import { connection } from '../mongoose-connection'
const orm = new MongooseORM({ connection })


///
// Migrations - migrations provider
//
import * as migrations from './migrations'
const migrationsProvider = new InMemoryMigrationsProvider({ migrations })
// or
// import { FSMigrationsProvider } from '@abmf/migrations-fs'
// const migrationsProvider = new FSMigrationsProvider({ migrationsPath: `./migrations` })

const migrator = new Migrator({
  migrationsProvider,
  storageProvider: orm,
  getContext: () => orm.getContext(),
});

export async function applyAll() {
  await migrator.checkout();
}
```


## Architecture

ABMF is designed to support multiple ORMs that could be added in the future. The core can be injected with the following dependencies: migrations provider, storage provider and context provider.

- Migrations Provider - this is responsible, as the name states, for providing migrations. This repository already contains a migrations provider for the File System (getting migrations from a folder) and in Memory (specially relevant if you wish to run your migrations within a test-suite for example). Other providers might arise later such as reading from an S3 bucket or an FTP server.
- Storage Provider - this is responsible for storing and retrieve the state of your project's environment executed migrations. On projects with a single datastore, the migrations state is saved within the same datastore, although, for distributed systems you might need to move data in between datastores, and the migrations storage might need to be place on a different datastore than the ones used by the service(s). ABMF allows you to define which datastore you want to use, as long as it supports it.
- Context Provider - this is responsible for determining the context which the migrations execute. This is highly relevant for decreasing the amount of imports each migration has, as for example, providing a connection to the datastore/orm being used. The context is highly customizable and separated from the Storage Provider so it could be composed to cover for the use cases commonly found on distributed projects.

If your project requires something unusual, you can extend ABMF to support it. If you decide to add a new piece heck the [Contributing](#contributing) so you can help ABMF frow.

## Packages

| Package Name        | Category           | Description                                                                           | Stability  |
|---------------------|--------------------|---------------------------------------------------------------------------------------|---|
| [@abmf/core](./packages/core/)          | Core               | Provides the core functionality and interfaces for other packages to implement/extend | Alpha  |
| [@abmf/cli](./packages/cli/)  | CLI                | Provides a CLI for integrating ABMF in a project without requiring changes to the code-base       | Alpha  |
| [@abmf/orm-mongoose](./packages/orm-mongoose/)  | ORM                | Provides a Storage Provider and a Context Provider tied with Mongoose / MongoDB       | Alpha  |
| [@abmf/migrations-fs](./packages/migrations-fs) | Migration Provider | Provides a Migration Provider that reads migrations from the FS                       | Alpha  |
| [@abmf/migrations-in-memory](./packages/migrations-in-memory/) | Migration Provider | Provides a Migration Provider that takes Migrations directly from its constructor, allowing the injection of Migrations In-Memory. Ideal for programmatic approaches that already include a bundler for migrations                       | Alpha  |

## Usage

### CLI

### Programmatic

## Contributing

## Alternatives

- [migrate-mongoose](https://github.com/balmasi/migrate-mongoose)
- [ts-migrate-mongoose](https://github.com/ilovepixelart/ts-migrate-mongoose)
- [umzug](https://github.com/sequelize/umzug)

## License

Please read the [LICENSE file](./LICENSE)
