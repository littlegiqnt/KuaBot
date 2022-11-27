type PartiallyRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export default PartiallyRequired;
