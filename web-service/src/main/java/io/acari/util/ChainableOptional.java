package io.acari.util;

import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

@SuppressWarnings("unchecked")
public class ChainableOptional<T> {
  private static final ChainableOptional<?> EMPTY = new ChainableOptional();

  private T value;

  private ChainableOptional() {
    value = null;
  }

  private ChainableOptional(T var1) {
    this.value = Objects.requireNonNull(var1);
  }

  public static <T> ChainableOptional<T> empty() {
    ChainableOptional var0 = EMPTY;
    return var0;
  }

  public static <T> ChainableOptional<T> of(T var0) {
    return new ChainableOptional(var0);
  }

  public static <T> ChainableOptional<T> ofNullable(T var0) {
    return var0 == null ? empty() : of(var0);
  }

  public T get() {
    if (this.value == null) {
      throw new NoSuchElementException("No value present");
    } else {
      return this.value;
    }
  }

  public boolean isPresent() {
    return this.value != null;
  }

  public ChainableOptional<T> ifPresent(Consumer<? super T> consumer) {
    if (this.value != null) {
      consumer.accept(this.value);
    }
    return this;
  }

  public ChainableOptional<T> orElseDo(Runnable runnable) {
    if (this.value == null) {
      runnable.run();
    }
    return this;
  }

  public ChainableOptional<T> filter(Predicate<? super T> var1) {
    Objects.requireNonNull(var1);
    return !this.isPresent() ? this : (var1.test(this.value) ? this : empty());
  }

  public <U> ChainableOptional<U> map(Function<? super T, ? extends U> var1) {
    Objects.requireNonNull(var1);
    return !this.isPresent() ? empty() : ofNullable(var1.apply(this.value));
  }

  public <U> ChainableOptional<U> flatMap(Function<? super T, ChainableOptional<U>> var1) {
    Objects.requireNonNull(var1);
    return !this.isPresent() ? empty() : Objects.requireNonNull(var1.apply(this.value));
  }

  public T orElse(T var1) {
    return this.value != null ? this.value : var1;
  }

  public T orElseGet(Supplier<? extends T> var1) {
    return this.value != null ? this.value : var1.get();
  }

  public <X extends Throwable> T orElseThrow(Supplier<? extends X> var1) throws X {
    if (this.value != null) {
      return this.value;
    } else {
      throw var1.get();
    }
  }

  public boolean equals(Object var1) {
    if (this == var1) {
      return true;
    } else if (!(var1 instanceof ChainableOptional)) {
      return false;
    } else {
      ChainableOptional var2 = (ChainableOptional) var1;
      return Objects.equals(this.value, var2.value);
    }
  }

  public int hashCode() {
    return Objects.hashCode(this.value);
  }

  public String toString() {
    return this.value != null ? String.format("Optional[%s]", this.value) : "Optional.empty";
  }
}
