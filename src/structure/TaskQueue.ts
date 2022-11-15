type Task = (...args: any[]) => Promise<void>

export default class TaskQueue {
    private storage: Task[] = [];

    private execute() {
        const task = this.dequeue();
        if (task == null) return;
        task().then(() => this.execute());
    }

    public enqueue(item: Task) {
        this.storage.push(item);
        if (this.storage.length === 1) {
            this.execute();
        }
    }

    public dequeue(): Task | undefined {
        return this.storage.shift();
    }
}
