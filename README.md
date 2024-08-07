# VS Live Share Extension API

Enables other VS Code extensions to access Live Share capabilities.

## API Overview

### Loading the Live Share API

Import the `vsls` module and call the `getApi()` function first to get the main API.

```JavaScript
import * as vsls from 'vsls';

const liveshare = await vsls.getApi();
```
This function tries to get a version of the API that is compatible with the version of the referenced npm pakage. It returns `null` if the Live Share extension or requested API version is not available. Otherwise the returned object provides all the following APIs:

### Session control
 - `share()` - Starts a new session, sharing the currenly opened workspace.
 - `join()` - Joins a shared session using a link acquired from the host.
 - `end()` - Ends or disconnects from the current sharing session.

### Session state
 - `session` property - Gets the current session ID, role (Host, Guest, or None), access level (Owner, ReadWrite, ReadOnly), and peer (unique among session participants), and Live Share user profile information.
 - `onDidChangeSession` event - Notifies when the session state changes.

### Peers
 - `peers` property - Lists other participants in the session, including their role, access level, peer number, and user profile information.
 - `onDidChangePeers` event - Notifies when peers join/leave the session.

### Messaging (RPC)
Messaging is built around the concept of named RPC services that can be shared by a host. Guests can then use proxies to invoke requests on the services and send/receive notifications to/from the services. When requesting a proxy, the service name can be optionally prefixed with a package name (separated by a dot) to reference a service provided by another extension package. A name with no prefix (the most typical usage) refers to a service provided by the same extension, possibly remote.

 - `shareService()` - Provides a named RPC service to guests. The service is made available only while a Live Share session is active in the Host role. The returned `SharedService` object has the following methods:
   - `onRequest()` - Registers a callback to be invoked when a request is sent to the service.
   - `onNotify()` - Registers a callback to be invoked when a notification is sent to the service.
   - `notify()` - Sends (broadcasts) a notification from the service to all listeners. Does not wait for a response.
 - `getSharedService()` -  Gets a proxy for a named RPC service provided by a host. The proxy is available only while a live share session is active in the Guest role. The returned `SharedServiceProxy` instance has the following methods:
   - `isServiceAvailable` property, `onDidChangeIsServiceAvailable` event - A service proxy instance is created even if the service is not currently available (either because there is no active sharing session or because no peer has provided the service.) Listen to the event on the proxy to be notified when the service becomes available or unavailable.
   - `onNotify()` - Registers a callback to be invoked when a notification is received from the service.
   - `request()` - Sends a request to the service and waits for a response. Any errors thrown by the service request handler are propagated back to the proxy and rethrown.
   - `notify()` - Sends a notification to the service. Does not wait for a response.

### URI conversion
On the guest side, the file system is virtualized. Guest-opened files in VS Code use the `vsls:` URI scheme, with a path relative to the workspace root. On the host side, VS Code extensions that work with file buffers may use these methods to convert between these virtual URIs and local file URIs.

 - `convertLocalUriToShared()` - Converts a local `file:` URI to a `vsls:` URI.
 - `convertSharedUriToLocal()` - Converts a `vsls:` URI to a local `file:` URI.

## More Information

- [VS Live Share Documentation](https://aka.ms/vsls-docs)
- [VS Live Share Site](https://aka.ms/vsls)
- [VS Live Share FAQ](https://aka.ms/vsls-faq)
- [Report a Problem](https://aka.ms/vsls-problem)
- [Contact Us](https://aka.ms/vsls-support)
- [License](https://aka.ms/vsls-license)
