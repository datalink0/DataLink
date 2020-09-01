let counter = 0;

// TODO: Create a better idGenerator

export default function generateId() {
    return Date.now().toString() + (counter++).toString();
}
