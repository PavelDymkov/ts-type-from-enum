import { EnumMap } from "../../package";

enum X {
    A,
    B,
}

export type Type = EnumMap<
    X,
    {
        [X.A]: string;
        [X.B]: string;
        foo: string;
    }
>;
