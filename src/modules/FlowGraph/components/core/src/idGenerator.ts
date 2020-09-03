import shortid from "shortid";

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-');

export default function generateId() {
    return shortid.generate().replace("-","W");
}
