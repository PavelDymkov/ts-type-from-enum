import { EnumType } from "./tools/enum-type";

export type Model<Enum extends EnumType, BaseType = any> = {
    [Key in Enum]: BaseType;
};
