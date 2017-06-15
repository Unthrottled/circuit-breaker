/**
 * Created by alex on 6/15/17.
 */
export interface UnaryOperator<T>{
    apply(t: T): T;
}
