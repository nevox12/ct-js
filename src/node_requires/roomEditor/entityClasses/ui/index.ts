import {RoomEditor} from '../..';

// I love TypeScript for letting me do what I want to do.
// @see https://stackoverflow.com/a/64493510

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GConstructor= new (...args: any[]) => any;
type GetProps<TBase> = TBase extends new (props: infer P) => any ? P : never;
type GetInstance<TBase> = TBase extends new (...args: any[]) => infer I ? I : never;
type MergeCtor<A, B> = new (props: GetProps<A> & GetProps<B>) => GetInstance<A> & GetInstance<B>;

export const uiElementMixin = <TBase extends GConstructor> (
    Base: TBase
): TBase => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Derived = class UIElement extends (Base as any) {
        originPoint: [number, number];
        positionShift: [number, number];
        editor: RoomEditor;
        room: RoomEditor['ctRoom'];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(serialized: IUIElement, editor: RoomEditor, ...args: any[]) {
            super(...args);
            this.originPoint = [...serialized.originPoint];
            this.positionShift = [...serialized.position];
            this.editor = editor;
            this.room = editor.ctRoom;
        }
        reposition() {
            this.x = this.originPoint[0] * this.room.width + this.positionShift[0];
            this.y = this.originPoint[1] * this.room.height + this.positionShift[1];
        }
    };
    return Derived as MergeCtor<typeof Derived, TBase>;
};
