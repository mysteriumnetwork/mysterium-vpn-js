# mysterium-vpn-js

[![npm version](https://badge.fury.io/js/mysterium-vpn-js.svg)](https://badge.fury.io/js/mysterium-vpn-js)
[![pipeline status](https://gitlab.com/mysteriumnetwork/mysterium-vpn-js/badges/master/pipeline.svg)](https://gitlab.com/mysteriumnetwork/mysterium-vpn-js/pipelines)

Javascript SDK for [mysteriumnetwork/node](https://github.com/mysteriumnetwork/node)  

## Installation

NPM:
```bash
npm i mysterium-vpn-js
```

Yarn:
```bash
yarn add mysterium-vpn-js
```


## Usage

### ES6 module

```js
import { TequilapiClientFactory, TEQUILAPI_URL } from 'mysterium-vpn-js'
const factory = new TequilapiClientFactory(TEQUILAPI_URL)
const client = factory.build(factory.buildAdapter())
client.identityList().then((identities) => {
  console.log(identities)
})
```

Output:

```json
{"identities":[{"id":"0xf2732f2100d19d74b1b5484037ebf6c13736d1bc"}]}
```

### Node.js require syntax

```javascript
const Tequilapi = require("mysterium-vpn-js")
const factory = new Tequilapi.default(Tequilapi.TEQUILAPI_URL)
const client = factory.build(factory.buildAdapter())

client.healthCheck().then((res) => {
  console.log(res)
})
```

Output:

```json
{ "uptime":"75h23m14.658120675s",
  "process":19857,
  "version":"0.2.3",
  "buildInfo": {
    "commit":"91840225277923a61de2bf5683a24532ee638559",
    "branch":"0.2.3",
    "buildNumber":"1389"
  }
}
```

## Tequilapi Client API

See [src/tequilapi-client.ts](https://github.com/mysteriumnetwork/mysterium-vpn-js/blob/master/src/tequilapi-client.ts) for all available Tequilapi operations.

You may also check out Tequilapi [REST API documentation](http://tequilapi.mysterium.network).

## Contributing

* Run CI build: `yarn ci`
