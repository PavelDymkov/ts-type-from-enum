import { EnumMap, EnumTemplate, UnionFrom } from "../../package";

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

export type TestCase1 = UnionFrom<XMap>;

export type TestCase2 = UnionFrom<
    EnumTemplate<
        X,
        {
            type: X;
            map: XMap;
            foo: string;
        }
    >
>;
