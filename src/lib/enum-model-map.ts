import { OnlyEnumKeys } from "./tools/only-enum-keys";
import { EnumType } from "./tools/enum-type";
import { Model as ModelType } from "./model";

export type EnumModelMap<
    Model extends ModelType<EnumType, any>,
    Map extends Model extends ModelType<infer Enum, infer BaseType>
        ? Exclude<keyof Map, Enum> extends never
            ? { [_ in Enum]: BaseType }
            : OnlyEnumKeys
        : never,
> = Map;
