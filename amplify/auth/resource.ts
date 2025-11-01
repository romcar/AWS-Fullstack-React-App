import { defineAuth } from "@aws-amplify/backend";
import { preSignUp } from "./pre-sign-up/resources";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
    loginWith: {
        email: {
            // NOTE: Instead of using a boolean to enable email sign-in, we explicitly
            // set a configuration object to customize email settings. Such as the verification
            // email that is sent to users when they sign up.
            verificationEmailStyle: "CODE",
            verificationEmailSubject:
                "Use this code to verify your email address",
            verificationEmailBody: (code) =>
                `Your verification code is ${code()}`,
            // NOTE: There are times where an admin might make a user account for them.
            // In this case, we can customize the invitation email that is sent to users.
            userInvitation: {
                emailSubject: "Your temporary password",
                emailBody: (username, password) =>
                    `Ready to kick some ass?! Your username is ${username()} and your temporary password is ${password()}`,
            },
        },
    },
    // NOTE: Enable the ability to sign in with a username
    userAttributes: {
        preferredUsername: {
            mutable: true,
            required: false,
        },
    },
    triggers: {
        // NOTE In order to generate the env files for triggers you need to define them here. If
        // not present here you will get an error that the env files in .amplify were not found.
        preSignUp,
    },
});
