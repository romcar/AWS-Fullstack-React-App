import { defineFunction } from "@aws-amplify/backend";

export const preSignUp = defineFunction({
    // NOTE: pre-sign-up trigger to filter out unwanted email domains
    name: "pre-sign-up",
    // NOTE: optionally define an environment variable for your filter
    environment: {
        DISALLOWED_DOMAIN: "invalid.com",
    },
});
