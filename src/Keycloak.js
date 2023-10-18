
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
     realm: "wbc",
     url: "https://lemur-10.cloud-iam.com/auth",
    sslRequired:"external",
     resource: "wbc-client",
     clientId: "wbc-client",
    publicClient: true,
    confidentialPort: 0
});


export default keycloak;