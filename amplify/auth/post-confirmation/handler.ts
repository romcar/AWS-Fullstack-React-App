import { env } from "$amplify/env/post-confirmation";
import {
    AdminAddUserToGroupCommand,
    CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import type { PostConfirmationTriggerHandler } from "aws-lambda";

const client = new CognitoIdentityProviderClient({});
export const handler: PostConfirmationTriggerHandler = async (event) => {
    const command = new AdminAddUserToGroupCommand({
        UserPoolId: event.userPoolId,
        Username: event.userName,
        GroupName: env.GROUP_NAME,
    });

    const response = await client.send(command);
    console.log(
        "Processed post confirmation for user:",
        response.$metadata.requestId
    );
    return event;
};
