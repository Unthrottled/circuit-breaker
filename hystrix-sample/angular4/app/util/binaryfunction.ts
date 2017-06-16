/**
 * Created by alex on 6/15/17.
 */
export interface BinaryFunction<T, U, R> {
    (t: T, u: U): R;
}
