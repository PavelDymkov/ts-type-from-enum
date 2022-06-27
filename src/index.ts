// EnumMap

export type EnumMap<
    Enum extends string | number,
    Map extends Exclude<keyof Map, Enum> extends never
        ? { [_ in Enum]: BaseType }
        : OnlyEnumKeys,
    BaseType = any,
> = Map;

const onlyEnumKeys = Symbol();

type OnlyEnumKeys = {
    [onlyEnumKeys]: never;
};

// EnumTemplate

export type EnumTemplate<Enum extends string, Source> = {
    [Item in Enum]: {
        [Key in keyof Source]: Source[Key] extends Enum
            ? Item
            : Source[Key] extends Record<Enum, any>
            ? Source[Key][Item]
            : Source[Key];
    };
};

// UnionFrom

export type UnionFrom<Map> = Map[keyof Map];
