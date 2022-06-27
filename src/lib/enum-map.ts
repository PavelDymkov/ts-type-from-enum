import { EnumType, OnlyEnumKeys } from "./tools";

export type EnumMap<
    Enum extends EnumType,
    Map extends Exclude<keyof Map, Enum> extends never
        ? { [_ in Enum]: any }
        : OnlyEnumKeys,
> = Map;
