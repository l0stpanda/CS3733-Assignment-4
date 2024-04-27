import { test, expect } from "vitest";
import {arabic2bumblor, bumblor2arabic} from "./BumblorArabicConverter.ts";

//arabic2bumblor

//range testing first
test("negative out of range", () => {
    expect((() => arabic2bumblor(-5000))).toThrowError('Out of Range')
})

test("positive out of range", () => {
    expect((() => arabic2bumblor(5000))).toThrowError('Out of Range')
})

test('-4999', () : void => {
    expect(arabic2bumblor(-4999)).toBe('-MMMMDCCCCLXXXXVIIII')
})

test('4999', () : void => {
    expect(arabic2bumblor(4999)).toBe('MMMMDCCCCLXXXXVIIII')
})

//single letters + one negative to ensure functionality
test('O', () : void => {
    expect(arabic2bumblor(0)).toBe('O')
})

test('negative O', () : void => {
    expect(arabic2bumblor(-0)).toBe('O')
})

test('I', () : void => {
    expect(arabic2bumblor(1)).toBe('I')
})

test('V', () : void => {
    expect(arabic2bumblor(5)).toBe('V')
})

test('X', () : void => {
    expect(arabic2bumblor(10)).toBe('X')
})

test('L', () : void => {
    expect(arabic2bumblor(50)).toBe('L')
})

test('C', () : void => {
    expect(arabic2bumblor(100)).toBe('C')
})

test('D', () : void => {
    expect(arabic2bumblor(500)).toBe('D')
})

test('M', () : void => {
    expect(arabic2bumblor(1000)).toBe('M')
})

//truncated
test('truncated positive O', () : void => {
    expect(arabic2bumblor(0.76533)).toBe('O')
})

test('truncated negative O', () : void => {
    expect(arabic2bumblor(-0.56733)).toBe('O')
})

test('truncated positive int', () : void => {
    expect(arabic2bumblor(3.33)).toBe('III')
})

test('truncated negative int', () : void => {
    expect(arabic2bumblor(-3.33)).toBe('-III')
})

test('truncated regular number', () : void => {
    expect(arabic2bumblor(213.57)).toBe('CCXIII')
})

//regular numbers
test('negative 2150', () : void => {
    expect(arabic2bumblor(-2150)).toBe('-MMCL')
})

test('2150', () : void => {
    expect(arabic2bumblor(2150)).toBe('MMCL')
})


//bumblor2arabic

//range tests
test('-4999 test', () : void => {
    expect(bumblor2arabic('-MMMMDCCCCLXXXXVIIII')).toBe(-4999)
})

test('4999 test', () : void => {
    expect(bumblor2arabic('MMMMDCCCCLXXXXVIIII')).toBe(4999)
})

//errors
test('lower case', () => {
    expect(() => bumblor2arabic("mxi")).toThrow(new Error ("Malformed Number"));
})

test('lower case + some upper case', () : void => {
    expect(() => {bumblor2arabic('MmMCcC');}).toThrowError("Malformed Number");
})

test('M > 4', () : void => {
    expect(() => {bumblor2arabic('MMMMM');}).toThrowError("Malformed Number");
})

test('D > 1', () : void => {
    expect(() => {bumblor2arabic('MDD');}).toThrowError("Malformed Number");
})

test('beginning spacing', () : void => {
    expect(() => {bumblor2arabic('    M');}).toThrowError("Malformed Number");
})

test('middle spacing', () : void => {
    expect(() => {bumblor2arabic('M  C');}).toThrowError("Malformed Number");
})

test('end spacing', () : void => {
    expect(() => {bumblor2arabic('M     ');}).toThrowError("Malformed Number");
})

//multiple negatives
test('multiple negative', () : void => {
    expect(() => {bumblor2arabic('-DCC-C');}).toThrowError("Malformed Number");
})

test('middle negative', () : void => {
    expect(() => {bumblor2arabic('DCC-C');}).toThrowError("Malformed Number");
})

//O tests
test('O test', () : void => {
    expect(bumblor2arabic('O')).toBe(0)
})

test('negative O', () : void => {
    expect(() => {bumblor2arabic('-O');}).toThrowError("Malformed Number");
})

test('multiple 0', () : void => {
    expect(() => {bumblor2arabic('OO');}).toThrowError("Malformed Number");
})

test('multiple 0 + other letters', () : void => {
    expect(() => {bumblor2arabic('OCO');}).toThrowError("Malformed Number");
})

//regular numbers
test('positive 2150', () : void => {
    expect(bumblor2arabic('MMCL')).toBe(2150)
})

test('negative 2150', () : void => {
    expect(bumblor2arabic('-MMCL')).toBe(-2150)
})