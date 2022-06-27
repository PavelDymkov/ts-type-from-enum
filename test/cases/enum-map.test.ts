import { EnumMap } from "../../package";

enum X {
    A,
    B,
}

export type TestCase1 = EnumMap<
    X,
    {
        [X.A]: string;
        [X.B]: number;
    }
>;

export type TestCase2 = EnumMap<
    X,
    {
        [X.A]: string;
        [X.B]: "a" | "b";
    },
    string
>;
