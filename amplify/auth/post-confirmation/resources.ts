import { defineFunction } from "@aws-amplify/backend";

export const postConfirmation = defineFunction({
    // NOTE: post-confirmation trigger to send welcome email or perform other actions
    name: "post-confirmation",
    environment: {
        GROUP_NAME: "EVERYONE",
    },
    resourceGroupName: "auth",
});
