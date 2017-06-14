/**
 * Created by alex on 6/13/17.
 */
export class Message {
    private message: String;
    private success: Boolean = false;

    constructor(private msg: String){
        this.message = msg;
        this.success = Message.didSucced(this.message);
    }

    private static didSucced(msg: String): Boolean {
        return msg.indexOf('Succeeded') >=0;
    }

    public getMessage(): String {
        return this.message;
    }

    public isSuccess(): Boolean {
        return this.success;
    }
}