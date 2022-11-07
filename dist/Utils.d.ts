import { Serializer } from './Serializer';
export declare class Utils {
    static bufferToBigInt(array: Uint8Array): bigint;
    static readUint32At(bytes: Uint8Array, index: number): number;
    static uintToBuffer(uintValue: number, bufferSize: number): Uint8Array;
    static uint8ToBuffer(uintValue: number): Uint8Array;
    static uint16ToBuffer(uintValue: number): Uint8Array;
    static uint32ToBuffer(uintValue: number): Uint8Array;
    static notNull(value: any, message: string): void;
    static bufferToUint(buffer: Uint8Array, size: number): number;
    static bufferToUint8(buffer: Uint8Array): number;
    static bufferToUint16(buffer: Uint8Array): number;
    static bufferToUint32(buffer: Uint8Array): number;
    static bigIntToBuffer(uintValue: bigint | number): Uint8Array;
    static concatTypedArrays(array1: Uint8Array, array2: Uint8Array): Uint8Array;
    static uint8ToInt8: (input: number) => number;
    static getBytes(binary: Uint8Array, size: number): Uint8Array;
    static getPaddingSize(size: number, alignment: number): number;
    static getSizeWithPadding(size: number, alignment: number): number;
    static compact(bigInt: bigint | number): number;
    static fromUint(number: number | bigint): bigint;
    static deserialize<T extends Serializer>(deserialize: (payload: Uint8Array) => T, payload: Uint8Array, count: number | bigint): T[];
    static deserializeEnums(payload: Uint8Array, count: number | bigint, itemSize: number): number[];
    static deserializeRemaining<T extends Serializer>(deserialize: (payload: Uint8Array) => T, payload: Uint8Array, payloadSize: number, alignment: number): T[];
    static writeList(elements: Serializer[], alignment: number): Uint8Array;
    static writeListEnum(elements: number[], alignment: number): Uint8Array;
    static toFlags(enumClass: any, bitMaskValue: number): number[];
    static fromFlags(enumClass: any, flags: number[]): number;
}
