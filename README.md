# Mysterium Tequilapi
a library to control mysterium_client and myst from [nysteriumnetwork/node](https://github.com/MysteriumNetwork/node)

## Installation
```bash
npm i mysterium-tequilapi
```

## Usage
```javascript
import TequilapiClientFactory, { TEQUILAPI_URL } from 'mysterium-tequilapi'
const factory = new TequilapiClientFactory(TEQUILAPI_URL)
const client = factory.build()
const identities = await client.identitiesList()
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

  findProposals (filter: ?ProposalsFilter): Promise<Array<ProposalDTO>>,

  connectionCreate (request: ConnectionRequestDTO, timeout: ?number): Promise<ConnectionStatusDTO>,
  connectionStatus (): Promise<ConnectionStatusDTO>,
  connectionCancel (): Promise<void>,
  connectionIP (timeout: ?number): Promise<ConnectionIPDTO>,
  connectionStatistics (): Promise<ConnectionStatisticsDTO>,
  location (timeout: ?number): Promise<ConsumerLocationDTO>
}
```

API docs are available [tequilapi.mysterium.network](http://tequilapi.mysterium.network)

## Authors
* **Andrej Novikov** - [shroomist](https://github.com/shroomist)
* **Donatas Kučinskas** - [donce](https://github.com/donce)
* **Ignas Bernotas** - [ignasbernotas](https://github.com/ignasbernotas)
* **Valdas Petrulis** - [Waldz](https://github.com/Waldz)
* **Miroslav Popugajev** - [mipo47](https://github.com/mipo47)
* **Paulius Mozuras** - [interro](https://github.com/interro)
