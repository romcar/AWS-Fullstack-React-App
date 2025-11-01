import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
    auth,
    data,
});

const { cfnUserPool } = backend.auth.resources.cfnResources;

// Customize the User Pool configuration
cfnUserPool.usernameAttributes = []; // NOTE: Disable email sign-in by clearing usernameAttributes
