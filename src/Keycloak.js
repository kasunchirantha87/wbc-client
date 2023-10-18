
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
     realm: "keycloak-react-auth",
     url: "http://localhost:8080/auth",
    sslRequired:"external",
     resource: "kasun-client",
     clientId: "kasun-client",
    publicClient: true,
    confidentialPort: 0
});


export default keycloak;