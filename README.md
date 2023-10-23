# A Better Migration Tool (a.k.a. ABMT)

framework-agnostic migration to handle database maintainability needs, such as executing schema migrations, data seeding, and other type of time-based versioning operations.

> Notice: This project is in ALPHA stage. We're improving and keep releasing release candidates up until it's ready to be used in production.

## Table of Contents

- [A Better Migration Tool (a.k.a. ABMT)](#a-better-migration-tool-aka-abmt)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Motivation](#motivation)
  - [Installation](#installation)
    - [CLI](#cli)
    - [Programmatic](#programmatic)
  - [Architecture](#architecture)
  - [Packages](#packages)
  - [Usage](#usage)
    - [CLI usage](#cli-usage)
    - [Programmatic usage](#programmatic-usage)
  - [Contributing](#contributing)
  - [Alternatives](#alternatives)
  - [License](#license)

## Features

- 💻 Bult-in CLI to execute migrations
- 👨‍💻 Programmatic API to execute migrations
- 🗄 Database-agnostic. Supports multiple ORMs / Datastores:
  - Mongoose: MongoDB / DynamoDB
  - Sequelize: SQLite / Postgres / Mysql / Mariadb / MSsql / Oracle SQL
- ✅ Written in Typescript
- ✅ Test Suite to assert all supported functionalities
- ✅ Supports multiple storages for the migration data
- ✅ Supports multiple migration providers
- ✅ Supports custom contexts, so migrations can occur across multiple datastores
- 🧐 [Usage examples](./packages/cli/examples/)

## Motivation

As part of our job at [MOSANO.eu](https://mosano.eu), we've used a lot of different systems to manage database schema versioning/migrations, although, we have had too many issues handling data-migrations with MongoDB/Mongoose, one migration tool didn't support typescript (we had to first compile, point to dists files and then run migrations), and others were not capable of become embeddable due to the fact they integrated @swc/register within it, which would mess with other transpilers that we could be using.

So we decided to dedicate a bit of our time to build something that could be reused across projects, and that could possibly support multiple databases by separating the concerns in this particular task.

We're hoping it could help other projects within the community somehow, and we'll gladly accept your contributions if you want to help.

## Installation

### CLI

```bash
cd ./path/to/your/project;

yarn add @abmt/cli @abmt/orm-mongoose;
yarn exec abmt --help;
```

### Programmatic

```bash
cd ./path/to/your/project;

yarn add @abmt/core @abmt/orm-mongoose @abmt/migrations-in-memory;
```

```typescript
// src/migrator.ts
import { Migrator } from '@abmt/core'
import { MongooseORM } from '@abmt/orm-mongoose'

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
// import { FSMigrationsProvider } from '@abmt/migrations-fs'
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

ABMT is designed to support multiple ORMs that could be added in the future. The core can be injected with the following dependencies: migrations provider, storage provider and context provider.

- Migrations Provider - this is responsible, as the name states, for providing migrations. This repository already contains a migrations provider for the File System (getting migrations from a folder) and in Memory (specially relevant if you wish to run your migrations within a test-suite for example). Other providers might arise later such as reading from an S3 bucket or an FTP server.
- Storage Provider - this is responsible for storing and retrieve the state of your project's environment executed migrations. On projects with a single datastore, the migrations state is saved within the same datastore, although, for distributed systems you might need to move data in between datastores, and the migrations storage might need to be place on a different datastore than the ones used by the service(s). ABMT allows you to define which datastore you want to use, as long as it supports it.
- Context Provider - this is responsible for determining the context which the migrations execute. This is highly relevant for decreasing the amount of imports each migration has, as for example, providing a connection to the datastore/orm being used. The context is highly customizable and separated from the Storage Provider so it could be composed to cover for the use cases commonly found on distributed projects.

If your project requires something unusual, you can extend ABMT to support it. If you decide to add a new piece heck the [Contributing](#contributing) so you can help ABMT frow.

## Packages

| Package Name        | Category           | Description                                                                           | Stability  |
|---------------------|--------------------|---------------------------------------------------------------------------------------|---|
| [@abmt/core](./packages/core/)          | Core               | Provides the core functionality and interfaces for other packages to implement/extend | Alpha  |
| [@abmt/cli](./packages/cli/)  | CLI                | Provides a CLI for integrating ABMT in a project without requiring changes to the code-base       | Alpha  |
| [@abmt/orm-mongoose](./packages/orm-mongoose/)  | ORM                | Provides a Storage Provider and a Context Provider tied with Mongoose / NoSQL MongoDB-based dialects      | Alpha  |
| [@abmt/orm-sequelize](./packages/orm-sequelize/)  | ORM                | Provides a Storage Provider and a Context Provider tied with Sequelize / SQL dialects       | Alpha  |
| [@abmt/migrations-fs](./packages/migrations-fs) | Migration Provider | Provides a Migration Provider that reads migrations from the FS                       | Alpha  |
| [@abmt/migrations-in-memory](./packages/migrations-in-memory/) | Migration Provider | Provides a Migration Provider that takes Migrations directly from its constructor, allowing the injection of Migrations In-Memory. Ideal for programmatic approaches that already include a bundler for migrations                       | Alpha  |

## Usage

### CLI usage

> TBD: help us and suggest a contribution for this section

### Programmatic usage

> TBD: help us and suggest a contribution for this section

## Contributing

> TBD: help us and suggest a contribution for this section

## Alternatives

- [migrate-mongoose](https://github.com/balmasi/migrate-mongoose)
- [ts-migrate-mongoose](https://github.com/ilovepixelart/ts-migrate-mongoose)
- [umzug](https://github.com/sequelize/umzug)

## License

Please read the [LICENSE file](./LICENSE)
