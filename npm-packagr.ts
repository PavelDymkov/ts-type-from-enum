import { npmPackagr } from "npm-packagr";
import {
    assets,
    badge,
    BadgeType,
    git,
    npx,
    packageJSON,
    Pipe,
    publish,
    test,
    version,
} from "npm-packagr/pipes";

npmPackagr({
    pipeline: [
        npx("tsc"),

        test(),
        testExpectedFailure(),

        badge(BadgeType.Test),

        version("patch", {
            commitHooks: true,
            message: "ts-type-from-enum",
            gitTagVersion: false,
        }),

        git("push"),

        packageJSON((packageJson) => {
            delete packageJson.scripts;
            delete packageJson.devDependencies;
        }),

        assets("LICENSE", "README.md"),

        publish({
            login: { account: "paveldymkov", email: "dymkov86@gmail.com" },
        }),
    ],
});

function testExpectedFailure(): Pipe {
    const tsConfig = require("./test/tsconfig.json") as {
        compilerOptions: Record<string, any>;
    };
    const optionItems: string[] = [];

    Object.entries(tsConfig.compilerOptions).forEach(([name, value]) =>
        optionItems.push("--" + name, value),
    );

    const options = optionItems.join(" ");

    const Reset = "\x1b[0m";
    const FgGreen = "\x1b[32m";
    const FgRed = "\x1b[31m";

    const ok = `${FgGreen}✓${Reset} `;
    const fail = `${FgRed}✗${Reset} `;

    return ({ exec, exit, ls, path }) => {
        console.log("Expect failure test");

        const directory = path`test/expect-failure/`;
        const files = [...ls(directory)];
        const command = `npx tsc --noEmit ${options} ${directory}`;

        let allWithErrors = true;

        files.forEach((file) => {
            const compiled = exec(command + file, { silent: true });
            const preffix = compiled ? fail : ok;

            console.log(preffix + file);

            if (allWithErrors) allWithErrors = !compiled;
        });

        if (!allWithErrors) exit(1);
    };
}
