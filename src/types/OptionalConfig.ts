export type OptionalConfig<T> = {[P in keyof T]?: T[P]};
