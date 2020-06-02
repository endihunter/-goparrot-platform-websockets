export class Rooms {
    static user(userId: string): string {
        return `user:${userId}`;
    }

    static merchant(merchantId: string): string {
        return `merchant:${merchantId}`;
    }
}
