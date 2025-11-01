import { env } from "$amplify/env/post-confirmation";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import {
    AdminAddUserToGroupCommand,
    CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { PostConfirmationTriggerHandler } from "aws-lambda";
import type { Schema } from "../../data/resource";

const { resourceConfig, libraryOptions } =
    await getAmplifyDataClientConfig(env);
Amplify.configure(resourceConfig, libraryOptions);

const dataClient = generateClient<Schema>();
const client = new CognitoIdentityProviderClient({});

export const handler: PostConfirmationTriggerHandler = async (event) => {
    // NOTE: Add user profile to the UserProfile table
    const user = await dataClient.models.UserProfile.create({
        username: event.userName,
        email: event.request.userAttributes?.email,
        profileOwner: `${event.request.userAttributes.sub}::${event.userName}`,
    });
    console.log("Created user profile:", user);

    // NOTE: Add user to a specific group after confirmation
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
