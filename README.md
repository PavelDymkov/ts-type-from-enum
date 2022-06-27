# ts-type-from-enum

![test: passed](https://raw.githubusercontent.com/PavelDymkov/ts-type-from-enum/main/badges/test.svg)

## Usage

```ts
import { EnumMap, UnionFrom } from "ts-type-from-enum";

enum ShapeKind {
    Rect,
    Circle,
}

interface ShapeBaseType {
    kind: ShapeKind;
}

interface Rect extends ShapeBaseType {
    kind: ShapeKind.Rect;
    width: number;
    height: number;
}

interface Circle extends ShapeBaseType {
    kind: ShapeKind.Circle;
    radius: number;
}

type Shape = UnionFrom<
    EnumMap<
        ShapeKind,
        {
            [ShapeKind.Rect]: Rect;
            [ShapeKind.Circle]: Circle;
            // if add a new kind to ShapeKind but
            // forget to add an interface here, an error will be emitted
        },
        ShapeBaseType
    >
>;

// The same as
type Shape = Rect | Circle;

const shape: Shape = {
    kind: ShapeKind.Circle,
    radius: 1,
};

if (shape.kind === ShapeKind.Circle) {
    console.log(shape.radius); // ok
    console.log(shape.width); // error
}
```

```ts
import { EnumMap, EnumTemplate, UnionFrom } from "ts-type-from-enum";

enum Input {
    Init = "init",
    Change = "change",
    Destroy = "destroy",
}

type Params = EnumMap<
    Input,
    {
        [Input.Init]: [boolean];
        [Input.Change]: [string];
        [Input.Destroy]: [number, string];
    }
>;

type Variants = UnionFrom<
    EnumTemplate<
        Input,
        {
            type: Input;
            params: Params;
            foo: string;
        }
    >
>;

// The same as
type Variants =
    | {
          type: Input.Init;
          params: [boolean];
          foo: string;
      }
    | {
          type: Input.Change;
          params: [string];
          foo: string;
      }
    | {
          type: Input.Destroy;
          params: [number, string];
          foo: string;
      };
```
