import { EnumMap, EnumTemplate } from "../../package";

enum X {
    A = "a",
    B = "b",
}

type XMap = EnumMap<
    X,
    {
        [X.A]: boolean;
        [X.B]: number;
    }
>;

export type Test = EnumTemplate<
    X,
    {
        type: X;
        map: XMap;
        foo: string;
    }
>;
