/**
 * @template {abstract new (...args: any) => any} T Class
 * @template {Object} P
 * @typedef { Omit<T, 'prototype'> &
 * {
 *  new (...args:ConstructorParameters<T>): InstanceType<T> & P
 * } & {
 *  prototype: InstanceType<T> & P
 * } } DefinedPropertiesOf
 */

/**
 * @template {new (...args: any) => any} T Class
 * @template {Object} P
 * @param {T} Class
 * @param {P} props
 * @return {DefinedPropertiesOf<T,P>}
 */
export const CastDefinedPropertiesOf = (Class, props) => Class;
