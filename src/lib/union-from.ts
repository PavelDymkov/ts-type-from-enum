import { EnumType } from "./tools/enum-type";

export type UnionFrom<Enum extends EnumType, Source> = Values<{
    [Item in Enum]: {
        [Key in keyof Source]: Source[Key] extends Enum
            ? Item
            : Source[Key] extends Record<Enum, any>
            ? Source[Key][Item]
            : Source[Key];
    };
}>;

type Values<Map> = Map[keyof Map];
