# Library "mysterium-vpn-js"

[![npm version](https://badge.fury.io/js/mysterium-vpn-js.svg)](https://badge.fury.io/js/mysterium-vpn-js)

Javascript SDK for  [mysteriumnetwork/node](https://github.com/mysteriumnetwork/node)  

* [API documentation](http://tequilapi.mysterium.network)

## Installation

```bash
npm i mysterium-tequilapi
```

## Usage

### ES6 module

```js
import TequilapiClientFactory, { TEQUILAPI_URL } from 'mysterium-vpn-js'
const factory = new TequilapiClientFactory(TEQUILAPI_URL)
const client = factory.build(factory.buildAdapter())
client.identitiesList().then((identities) => {
  console.log(identities)
})
```

Output:

```js
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

```js
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

Client object fulfills the following interface:
```javascript
interface TequilapiClient {
  healthCheck (timeout: ?number): Promise<NodeHealthcheckDTO>,
  stop (): Promise<void>,

  identitiesList (): Promise<Array<IdentityDTO>>,
  identityCreate (passphrase: string): Promise<IdentityDTO>,
  identityUnlock (id: string, passphrase: string): Promise<void>,
  identityRegistration (id: string): Promise<IdentityRegistrationDTO>,

  findProposals (query: ?ProposalsQuery): Promise<Array<ProposalDTO>>,

  connectionCreate (request: ConnectionRequest, timeout: ?number): Promise<ConnectionStatusDTO>,
  connectionStatus (): Promise<ConnectionStatusDTO>,
  connectionCancel (): Promise<void>,
  connectionIP (timeout: ?number): Promise<ConnectionIPDTO>,
  connectionStatistics (): Promise<ConnectionStatisticsDTO>,
  location (timeout: ?number): Promise<ConsumerLocationDTO>
}
```

## Contributing

* Run CI build: `npm run ci`
* Check in updated/new typescript and flow definitions in `lib/`

## Authors
* **Andrej Novikov** - [shroomist](https://github.com/shroomist)
* **Donatas Kučinskas** - [donce](https://github.com/donce)
* **Ignas Bernotas** - [ignasbernotas](https://github.com/ignasbernotas)
* **Valdas Petrulis** - [Waldz](https://github.com/Waldz)
* **Miroslav Popugajev** - [mipo47](https://github.com/mipo47)
* **Paulius Mozuras** - [interro](https://github.com/interro)
