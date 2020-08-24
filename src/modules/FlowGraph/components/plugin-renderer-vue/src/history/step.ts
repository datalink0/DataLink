import { IEditor } from "../../../core/types";

export interface IStep {
    type: string;
    undo(editor: IEditor): void;
    redo(editor: IEditor): void;
}
