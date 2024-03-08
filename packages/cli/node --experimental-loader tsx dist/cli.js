#!/usr/bin/env -S node --experimental-loader tsx
'use strict';

var commander = require('commander');
var dotenv = require('dotenv');
var core = require('@abmt/core');
var node_events = require('node:events');
var chalk = require('chalk');
var migrationsFs = require('@abmt/migrations-fs');
var Table = require('cli-table');
var kebabCase = require('lodash/kebabCase');
var node_path = require('node:path');
var promises = require('node:fs/promises');

function asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator$7(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator$7(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function notifyOnTerminal(cmd, msg, fn) {
    return _notifyOnTerminal.apply(this, arguments);
}
function _notifyOnTerminal() {
    _notifyOnTerminal = _async_to_generator$7(function(cmd, msg, fn) {
        var errored, err;
        return _ts_generator$7(this, function(_state) {
            switch(_state.label){
                case 0:
                    // TODO: check cmd verbosity level
                    process.stdout.write(chalk.gray("> ".concat(msg, "... ")));
                    errored = false;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        4,
                        5
                    ]);
                    return [
                        4,
                        fn()
                    ];
                case 2:
                    return [
                        2,
                        _state.sent()
                    ];
                case 3:
                    err = _state.sent();
                    process.nextTick(function() {
                        return error(err);
                    });
                    return [
                        3,
                        5
                    ];
                case 4:
                    process.stdout.write(errored ? chalk.red("FAILED") : chalk.green("OK"));
                    process.stdout.write("\n");
                    return [
                        7
                    ];
                case 5:
                    return [
                        2
                    ];
            }
        });
    });
    return _notifyOnTerminal.apply(this, arguments);
}
function log(cmd, msg) {
    // TODO: check cmd verbosity level
    console.log(chalk.gray(msg));
}
function error(err) {
    console.log("\n".concat(chalk.redBright(err.name || "Error"), ": ").concat(chalk.white(err.message), "\n").concat(chalk.gray(err.stack.split("\n").slice(1).join("\n")), "\n"));
}

function asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator$6(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator$6(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var PlatformKey;
(function(PlatformKey) {
    PlatformKey["Mongoose"] = "mongoose";
    PlatformKey["Sequelize"] = "sequelize";
})(PlatformKey || (PlatformKey = {}));
var emitter = new node_events.EventEmitter();
function setupCmdToOwnORM(cmd) {
    ///
    // Handle options
    var options = [
        commander.createOption("-o, --orm <orm>").choices(Object.values(PlatformKey)).default("mongoose").makeOptionMandatory(true),
        // PlatformKey.Sequelize
        commander.createOption("--sequelize-uri <sequelizeUri>").default("sqlite::memory:").implies({
            orm: "mongoose"
        }).env("SEQUELIZE_URI"),
        // PlatformKey.Mongoose
        commander.createOption("--mongoose-uri <mongooseUri>").default("mongodb://127.0.0.1:27017/abmt").implies({
            orm: "mongoose"
        }).env("MONGOOSE_URI"),
        commander.createOption("--mongoose-migrations-collection <mongooseMigrationsCollection>").implies({
            orm: "mongoose"
        }).default("abmt_migrations").env("MONGOOSE_MIGRATIONS_COLLECTION")
    ];
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var option = _step.value;
            cmd.addOption(option);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    cmd.hook("preAction", function() {
        emitter.emit("pre-action");
    });
    cmd.hook("postAction", function() {
        emitter.emit("post-action");
    });
}
function getORMProviders(cmd) {
    return _getORMProviders.apply(this, arguments);
}
function _getORMProviders() {
    _getORMProviders = _async_to_generator$6(function(cmd) {
        var options, _, SequelizeORM, Sequelize, sequelize, orm, MongooseORM, createConnection, connection, orm1;
        return _ts_generator$6(this, function(_state) {
            switch(_state.label){
                case 0:
                    options = cmd.optsWithGlobals();
                    _ = options.orm;
                    switch(_){
                        case "sequelize":
                            return [
                                3,
                                1
                            ];
                        case "mongoose":
                            return [
                                3,
                                3
                            ];
                    }
                    return [
                        3,
                        5
                    ];
                case 1:
                    SequelizeORM = require("@abmt/orm-sequelize").SequelizeORM;
                    Sequelize = require("sequelize").Sequelize;
                    sequelize = new Sequelize(options.sequelizeUri);
                    orm = new SequelizeORM({
                        sequelize: sequelize,
                        collection: options.mongooseMigrationsCollection
                    });
                    // handle hooks
                    // wait for the connection to be established
                    return [
                        4,
                        notifyOnTerminal(cmd, "Connecting to orm", function() {
                            return sequelize.sync();
                        })
                    ];
                case 2:
                    _state.sent();
                    emitter.once("post-action", function() {
                        sequelize.close();
                    });
                    return [
                        2,
                        {
                            storageProvider: orm,
                            contextProvider: orm
                        }
                    ];
                case 3:
                    MongooseORM = require("@abmt/orm-mongoose").MongooseORM;
                    createConnection = require("mongoose").createConnection;
                    connection = createConnection(options.mongooseUri);
                    orm1 = new MongooseORM({
                        connection: connection,
                        collection: options.mongooseMigrationsCollection
                    });
                    // handle hooks
                    // wait for the connection to be established
                    return [
                        4,
                        notifyOnTerminal(cmd, "Connecting to MongoDB", function() {
                            return connection.asPromise();
                        })
                    ];
                case 4:
                    _state.sent();
                    emitter.once("post-action", function() {
                        connection.close();
                    });
                    return [
                        2,
                        {
                            storageProvider: orm1,
                            contextProvider: orm1
                        }
                    ];
                case 5:
                    throw new Error("ORM adapter not found");
                case 6:
                    return [
                        2
                    ];
            }
        });
    });
    return _getORMProviders.apply(this, arguments);
}

function setupCmdToOwnMigrations(cmd) {
    ///
    // Handle options
    var migrationsPath = commander.createOption("-p,--migrations-path <migrationsPath>", "relative or absolute path to the target migrations directory").default("./migrations");
    var migrationsPattern = commander.createOption("--migrations-match-pattern <migrationsPattern>", "relative or absolute path to the target migrations directory").default(/\.(js|ts)/);
    cmd.addOption(migrationsPath);
    cmd.addOption(migrationsPattern);
}
function getMigrationsProvider(cmd) {
    var options = cmd.optsWithGlobals();
    return new migrationsFs.FSMigrationsProvider({
        migrationsPath: options.migrationsPath,
        migrationsPattern: options.migrationsPattern
    });
}

function asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator$5(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator$5(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function setupCmdToOwnMigrator(cmd) {
    ///
    // Handle options
    var customMigratorPath = commander.createOption("--custom-migrator-path <customMigratorPath>", "relative or absolute path to a JS or TS file that exposes a migrator builder, either as `getMigrator` or as `default`").default("");
    cmd.addOption(customMigratorPath);
}
function getMigrator(cmd) {
    return _getMigrator.apply(this, arguments);
}
function _getMigrator() {
    _getMigrator = _async_to_generator$5(function(cmd) {
        var options, migratorModulePath, migratorModule, getMigrator, migrator, err;
        return _ts_generator$5(this, function(_state) {
            switch(_state.label){
                case 0:
                    options = cmd.optsWithGlobals();
                    if (!options.customMigratorPath) return [
                        3,
                        4
                    ];
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    // attempt to load the file
                    migratorModulePath = require.resolve(options.customMigratorPath, {
                        paths: [
                            process.cwd()
                        ]
                    });
                    migratorModule = require(migratorModulePath);
                    getMigrator = typeof migratorModule == "function" && migratorModule || typeof migratorModule.getMigrator == "function" && migratorModule.getMigrator || undefined;
                    if (!getMigrator) {
                        throw new Error("Custom Migrator: Unable to find the 'getMigrator' function");
                    }
                    return [
                        4,
                        getMigrator()
                    ];
                case 2:
                    migrator = _state.sent();
                    // if (!(migrator instanceof Migrator)) {
                    //   throw new Error(
                    //     "'getMigrator' function didn't return a valid Migrator instance",
                    //   );
                    // }
                    // valid, lets use it
                    return [
                        2,
                        migrator
                    ];
                case 3:
                    err = _state.sent();
                    throw new Error('Custom Migrator: Unable to load migrator at "'.concat(options.migratorPath, '". Please make sure the file exists and a "getMigrator" function is exported either as is or as the default exports.'), {
                        cause: err
                    });
                case 4:
                    {
                        return [
                            2,
                            buildMigrator(cmd)
                        ];
                    }
            }
        });
    });
    return _getMigrator.apply(this, arguments);
}
function buildMigrator(cmd) {
    return _buildMigrator.apply(this, arguments);
}
function _buildMigrator() {
    _buildMigrator = _async_to_generator$5(function(cmd) {
        var _ref, contextProvider, storageProvider, migrationsProvider, migrator;
        return _ts_generator$5(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        getORMProviders(cmd)
                    ];
                case 1:
                    _ref = _state.sent(), contextProvider = _ref.contextProvider, storageProvider = _ref.storageProvider;
                    migrationsProvider = getMigrationsProvider(cmd);
                    migrator = new core.Migrator({
                        migrationsProvider: migrationsProvider,
                        storageProvider: storageProvider,
                        getContext: function() {
                            return contextProvider.getContext();
                        }
                    });
                    return [
                        4,
                        migrator.list()
                    ];
                case 2:
                    _state.sent();
                    return [
                        2,
                        migrator
                    ];
            }
        });
    });
    return _buildMigrator.apply(this, arguments);
}

function _array_like_to_array$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$1(arr);
}
function asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator$4(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array$1(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$1(o, minLen);
}
function _ts_generator$4(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function captureErrors(fn) {
    return /*#__PURE__*/ _async_to_generator$4(function() {
        var _len, args, _key, ret, err;
        var _arguments = arguments;
        return _ts_generator$4(this, function(_state) {
            switch(_state.label){
                case 0:
                    for(_len = _arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                        args[_key] = _arguments[_key];
                    }
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        fn.apply(void 0, _to_consumable_array(args))
                    ];
                case 2:
                    ret = _state.sent();
                    return [
                        2,
                        ret
                    ];
                case 3:
                    err = _state.sent();
                    // display error in the CLI
                    error(err);
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
}

function asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator$3(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator$3(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var listCmd = commander.createCommand("list").description("lists all the migrations").action(captureErrors(/*#__PURE__*/ _async_to_generator$3(function() {
    var migrator, migrations, table;
    return _ts_generator$3(this, function(_state) {
        switch(_state.label){
            case 0:
                return [
                    4,
                    getMigrator(listCmd)
                ];
            case 1:
                migrator = _state.sent();
                return [
                    4,
                    migrator.list()
                ];
            case 2:
                migrations = _state.sent();
                table = new Table({
                    head: [
                        "ID",
                        "Type",
                        "Status",
                        "Applied At"
                    ],
                    rows: migrations.map(function(param) {
                        var metadata = param.metadata, status = param.status, applied_at = param.applied_at;
                        return [
                            // ID
                            chalk.bold(metadata.id),
                            // TYPE
                            metadata.type,
                            // STATUS
                            status === "new" && chalk.whiteBright.bold("NEW") || status === "up" && chalk.greenBright.bold("UP") || status === "down" && chalk.red("DOWN"),
                            // APPLIED AT
                            applied_at && chalk.gray(applied_at.toDateString()) || ""
                        ];
                    })
                });
                // wrap values with Chalk
                process.stdout.write(table.toString());
                return [
                    2
                ];
        }
    });
})));

function asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator$2(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator$2(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return(g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g);
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var checkoutCmd = commander.createCommand("checkout").description("migrates the database to a certain version").argument("[migration-id]", "ID to the target migration").action(captureErrors(function() {
    var _ref = _async_to_generator$2(function(migrationId) {
        var migrator;
        return _ts_generator$2(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        getMigrator(checkoutCmd)
                    ];
                case 1:
                    migrator = _state.sent();
                    migrator.on(core.EventType.Error, function(err) {
                        error(err);
                    });
                    migrator.on(core.EventType.MigrationDirectionGoingToExecute, function(param) {
                        var migration = param.migration, direction = param.direction;
                        log(checkoutCmd, "> Attempting to execute migration ".concat(chalk.white(migration.id), " - ").concat(chalk.yellowBright(direction)));
                    });
                    migrator.on(core.EventType.MigrationDirectionExecuted, function(param) {
                        var migration = param.migration, direction = param.direction, successful = param.successful;
                        log(checkoutCmd, successful ? "> Migration ".concat(chalk.white(migration.id), " - ").concat(chalk.yellowBright(direction), " was ").concat(chalk.green("SUCCESSFULLY EXECUTED")) : "> Migration ".concat(chalk.white(migration.id), " - ").concat(chalk.yellowBright(direction), " has ").concat(chalk.red("FAILED TO EXECUTE")));
                    });
                    return [
                        4,
                        migrator.checkout(migrationId)
                    ];
                case 2:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return function(migrationId) {
        return _ref.apply(this, arguments);
    };
}()));

function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator$1(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator$1(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return(g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g);
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var MigrationFormat;
(function(MigrationFormat) {
    MigrationFormat["Typescript"] = "ts";
    MigrationFormat["CommonJS"] = "cjs";
})(MigrationFormat || (MigrationFormat = {}));
var createCmd = commander.createCommand("create").description("creates a new migration").argument("[name]", "Migration name").addOption(commander.createOption("-t, --migration-type", "migration type").choices(Object.values(core.MigrationType)).default(core.MigrationType.Schema)).addOption(commander.createOption("-f, --migration-format", "migration format").choices(Object.values(MigrationFormat)).default("ts")).action(captureErrors(function() {
    var _ref = _async_to_generator$1(function(optionalName, options) {
        var migrator, timestamp, name, migrationFormat, migrationType, migrationPath, content;
        return _ts_generator$1(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        getMigrator(createCmd)
                    ];
                case 1:
                    migrator = _state.sent();
                    timestamp = Date.now();
                    name = kebabCase(optionalName || "new migration");
                    migrationFormat = options.migrationFormat;
                    migrationType = options.migrationType;
                    migrationPath = node_path.join(migrator.migrationsProvider.migrationsPath, "".concat(timestamp, "-").concat(name, ".").concat(migrationFormat));
                    ///
                    // create migration
                    content = migrationFormat === "ts" && createTypescriptMigration(name, timestamp, migrationType) || migrationFormat === "cjs" && createCommonJSMigration(name, timestamp, migrationType) || "";
                    if (!content) {
                        throw new Error("Unable to create a template for the given migration");
                    }
                    // save migration file
                    return [
                        4,
                        promises.writeFile(migrationPath, content)
                    ];
                case 2:
                    _state.sent();
                    log(createCmd, "Migration ".concat(name, ' was created successfully. Please edit it at "').concat(migrationPath, '"'));
                    return [
                        2
                    ];
            }
        });
    });
    return function(optionalName, options) {
        return _ref.apply(this, arguments);
    };
}()));
function createTypescriptMigration(name, timestamp, type) {
    var migrationType = Object.entries(core.MigrationType).find(function(param) {
        var _param = _sliced_to_array(param, 2), v = _param[1];
        return v === type;
    });
    return "\nimport { Migration, MigrationType } from '@abmt/core';\n\nexport default new Migration({\n  metadata: {\n    name: '".concat(name.replace(/'/g, "\\'"), "',\n    created_at: new Date(").concat(timestamp, "),\n    type: MigrationType.").concat(migrationType[0], ",\n  },\n\n  async up() {\n    // @TODO: Migration code goes here\n  },\n\n  async down() {\n    // @TODO: Migration code goes here\n  }\n})\n");
}
function createCommonJSMigration(name, timestamp, type) {
    var migrationType = Object.entries(core.MigrationType).find(function(param) {
        var _param = _sliced_to_array(param, 2), v = _param[1];
        return v === type;
    });
    return "\nconst core = require('@abmt/core');\n\nmodule.exports = new core.Migration({\n  metadata: {\n    name: '".concat(name.replace(/'/g, "\\'"), "',\n    created_at: new Date(").concat(timestamp, "),\n    type: core.MigrationType.").concat(migrationType[0], ",\n  },\n\n  up() {\n    // @TODO: Migration code goes here\n  },\n\n  down() {\n    // @TODO: Migration code goes here\n  },\n});\n");
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
(function() {
    var _main = // import register from '@swc/register';
    // register();
    // register({
    //   module: {
    //     type: 'commonjs',
    //   },
    //   jsc: {
    //     target: 'es5',
    //     keepClassNames: true,
    //     loose: true,
    //     parser: {
    //       syntax: 'typescript',
    //       decorators: true,
    //       dynamicImport: true,
    //     },
    //   },
    // });
    _async_to_generator(function() {
        var program;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    dotenv.config({
                        path: ".env.local"
                    });
                    program = new commander.Command("abmt").version("0.0.5").addCommand(listCmd).addCommand(createCmd).addCommand(checkoutCmd);
                    setupCmdToOwnMigrator(program);
                    setupCmdToOwnORM(program);
                    setupCmdToOwnMigrations(program);
                    return [
                        4,
                        program.parseAsync(process.argv)
                    ];
                case 1:
                    _state.sent();
                    process.exit();
                    return [
                        2
                    ];
            }
        });
    });
    function main() {
        return _main.apply(this, arguments);
    }
    return main;
})()();
//# sourceMappingURL=cli.js.map
