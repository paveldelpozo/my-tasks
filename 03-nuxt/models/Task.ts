export default class Task {
    status: boolean
    description: string

    constructor(description: string) {
        this.status = false;
        this.description = description;
    }
}
