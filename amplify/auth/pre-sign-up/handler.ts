import { env } from "$amplify/env/pre-sign-up";
import type { PreSignUpTriggerHandler } from "aws-lambda";

export const handler: PreSignUpTriggerHandler = async (event) => {
    console.log(event.request);
    const email = event.request.userAttributes?.email;

    if (email.endsWith(env.DISALLOWED_DOMAIN)) {
        throw new Error(
            `Registration using email domain ${env.DISALLOWED_DOMAIN} is not allowed.`
        );
    }

    return event;
};
